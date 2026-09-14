console.log("🤖 Browser Agent Content Script Started!");

// =====================================================
// 1. HELPER FUNCTIONS
// =====================================================

const getElementText = (element: Element): string => {
  const htmlElement = element as HTMLElement;
  const inputElement = element as HTMLInputElement;

  return (
    htmlElement.innerText ||
    htmlElement.textContent ||
    inputElement.placeholder ||
    inputElement.value ||
    htmlElement.getAttribute("aria-label") ||
    ""
  ).trim();
};

const setDashboardStatus = (
  id: string,
  text: string
) => {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = text;
  }
};

const normalizeTargetText = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const matchesTargetText = (
  candidate: string,
  target: string
): boolean => {
  const normalizedCandidate = normalizeTargetText(candidate);
  const normalizedTarget = normalizeTargetText(target);

  return (
    normalizedCandidate === normalizedTarget ||
    normalizedCandidate === `enter${normalizedTarget}` ||
    normalizedTarget === `enter${normalizedCandidate}`
  );
};

let latestVisualRegions: Array<{
  x: number;
  y: number;
  width: number;
  height: number;
}> = [];
// =====================================================
// 2. UI PERCEPTION
// =====================================================

function createPerceptionResult() {
  const elements = document.querySelectorAll(
    "button, input, textarea, select, a"
  );

  const uiElements = Array.from(elements).map((element, index) => {
    const rect = element.getBoundingClientRect();

    let type = element.tagName.toLowerCase();

    if (
      element instanceof HTMLInputElement &&
      element.type === "password"
    ) {
      type = "sensitive_input";
    }

    return {
      id: index + 1,
      type: type,
      text: getElementText(element),
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    };
  });

  console.log("🧠 PERCEPTION RESULT");
  console.table(uiElements);

  return {
    timestamp: new Date().toISOString(),
    uiElements: uiElements
  };
}

// =====================================================
// 3. SENSITIVE DATA DETECTION
// =====================================================

function detectSensitiveElements() {
  const sensitiveElements = document.querySelectorAll(
    'input[type="password"]'
  );

  sensitiveElements.forEach((element) => {
    console.log(
      "🔒 Sensitive element detected:",
      element.tagName
    );
  });
}

// =====================================================
// 4. VISUAL PERCEPTION BOXES
// =====================================================

function showPerceptionBoxes() {
  const elements = document.querySelectorAll(
    "button, input, textarea, select, a"
  );

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    const box = document.createElement("div");

    box.style.position = "fixed";
    box.style.left = `${rect.left}px`;
    box.style.top = `${rect.top}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;

    box.style.border = "2px solid blue";
    box.style.background = "transparent";
    box.style.pointerEvents = "none";
    box.style.zIndex = "999999";

    const label = document.createElement("span");

    let type = element.tagName.toLowerCase();

    if (
      element instanceof HTMLInputElement &&
      element.type === "password"
    ) {
      type = "SENSITIVE INPUT 🔒";
      box.style.border = "2px solid red";
      box.style.background = "black";
      box.style.opacity = "0.9";
    } else if (type === "button") {
      type = "BUTTON";
    } else if (type === "input") {
      type = "INPUT";
    }

    label.innerText = type;
    label.style.position = "absolute";
    label.style.top = "-22px";
    label.style.left = "0";
    label.style.fontSize = "12px";
    label.style.fontWeight = "bold";
    label.style.background = "white";
    label.style.padding = "2px 5px";

    box.appendChild(label);
    document.body.appendChild(box);
  });
}

// =====================================================
// 5. CREATE PERCEPTION
// =====================================================

const perception = createPerceptionResult();

setDashboardStatus(
  "uiStatus",
  "✓ Active"
);

setDashboardStatus(
  "privacyStatus",
  perception.uiElements.some(
    (element) => element.type === "sensitive_input"
  )
    ? "✓ Protected"
    : "✓ Active"
);

detectSensitiveElements();

// =====================================================
// 6. PERCEPTION FUSION
// =====================================================

function fusePerception(target: string) {
  console.log("🔗 Starting perception fusion...");

  const domElements = perception.uiElements;

  const domTarget = domElements.find((element) =>
    matchesTargetText(element.text, target)
  );

  if (!domTarget) {
    console.log(
      "❌ Fusion failed: Target not found in DOM"
    );

    return false;
  }

  console.log(
    "🌐 DOM perception matched:",
    domTarget
  );

  // =================================================
// VISUAL + DOM FUSION
// =================================================

console.log(
  "👁️ Visual perception regions:",
  latestVisualRegions.length
);

if (latestVisualRegions.length === 0) {
  console.log(
    "❌ Fusion failed: No visual regions available"
  );

  return false;
}

console.log(
  "👁️ Visual perception available"
);

console.log(
  "🔗 Fusion successful:",
  target
);

return true;
}

// =====================================================
// 7. AGENT ACTION
// =====================================================

function executeAgentAction(
  action: string,
  target: string,
  value?: string
) {
  console.log("🤖 Agent Action:", action);
  console.log("🎯 Requested Target:", target);

  setDashboardStatus("agentStatus", "Executing...");

  if (action === "scroll") {
    const direction = target.trim().toLowerCase();
    const scrollAmount = direction === "down" ? 300 : -300;

    window.scrollBy({
      top: scrollAmount,
      left: 0,
      behavior: "smooth"
    });

    setDashboardStatus("agentStatus", "✓ Completed");

    return;
  }

  const perceptionMatched =
    fusePerception(target);

  if (!perceptionMatched) {
    const status =
      document.getElementById("agentStatus");

    if (status) {
      status.innerText =
        `❌ Perception failed: ${target}`;
    }

    return;
  }

  const elements = document.querySelectorAll(
    "button, input, textarea, select, a"
  );

  for (const element of elements) {

    const text = getElementText(element);

    if (matchesTargetText(text, target)) {

      console.log(
        "🧠 Agent identified:",
        text
      );

      // Privacy protection
      if (
        element instanceof HTMLInputElement &&
        element.type === "password"
      ) {
        console.log(
          "🔒 ACTION BLOCKED: Sensitive element"
        );

        setDashboardStatus("agentStatus", "🔒 Blocked");

        return;
      }

      if (action === "click") {

        (element as HTMLElement).click();

        console.log(
          "✅ Agent Action Completed:",
          action,
          target
        );

        setDashboardStatus("agentStatus", "✓ Completed");

        return;
      }

      if (action === "type") {
        const inputElement = element as HTMLInputElement | HTMLTextAreaElement;

        if (
          !(inputElement instanceof HTMLInputElement) &&
          !(inputElement instanceof HTMLTextAreaElement)
        ) {
          const status = document.getElementById("agentStatus");

          if (status) {
            status.innerText = `❌ Cannot type into ${target}`;
          }

          return;
        }

        inputElement.focus();
        inputElement.value = value ?? "";
        inputElement.dispatchEvent(new Event("input", { bubbles: true }));
        inputElement.dispatchEvent(new Event("change", { bubbles: true }));

        console.log(
          "✅ Agent Action Completed:",
          action,
          target,
          value
        );

        setDashboardStatus("agentStatus", "✓ Completed");

        return;
      }
    }
  }

  console.log(
    "❌ Target not found:",
    target
  );
}

// =====================================================
// 8. COMMAND BOX
// =====================================================

const commandInput =
  document.getElementById(
    "agentCommand"
  ) as HTMLInputElement;

const runAgentButton =
  document.getElementById(
    "runAgent"
  ) as HTMLButtonElement;

const agentStatus =
  document.getElementById(
    "agentStatus"
  ) as HTMLElement;

// =====================================================
// 9. COMMAND EXECUTION
// =====================================================

if (runAgentButton) {

  runAgentButton.addEventListener(
    "click",
    () => {

      const command =
        commandInput.value.trim();

      console.log(
        "👤 User command:",
        command
      );

      if (!command) {
        agentStatus.innerText =
          "Please enter a command.";

        return;
      }

      if (
        command
          .toLowerCase()
          .startsWith("click")
      ) {

        const target =
          command
            .substring(5)
            .trim();

        executeAgentAction(
          "click",
          target
        );

      } else if (
        command
          .toLowerCase()
          .startsWith("type ")
      ) {

        const typeMatch =
          command.match(
            /^type\s+(.+?)\s+into\s+(.+)$/i
          );

        if (typeMatch) {
          const [, value, target] =
            typeMatch;

          executeAgentAction(
            "type",
            target.trim(),
            value.trim()
          );
        } else {
          agentStatus.innerText =
            "Use: type <text> into <field>";
        }

      } else if (
        command
          .toLowerCase()
          .startsWith("scroll down")
      ) {

        executeAgentAction(
          "scroll",
          "down"
        );

      } else if (
        command
          .toLowerCase()
          .startsWith("scroll up")
      ) {

        executeAgentAction(
          "scroll",
          "up"
        );

      } else {

        agentStatus.innerText =
          "Currently supported commands: click <button>, type <text> into <field>, scroll down, scroll up";
      }
    }
  );
}

// =====================================================
// 10. SCREENSHOT → LOCAL AI
// =====================================================

async function capturePageForAgent() {

  console.log(
    "📸 Agent requesting screenshot..."
  );

  const screenshotStatus =
    document.getElementById(
      "screenshotStatus"
    );

  if (screenshotStatus) {
    screenshotStatus.innerText =
      "● Capturing...";
  }

  try {

    const response =
      await new Promise<any>((resolve) => {

        chrome.runtime.sendMessage(
          {
            type: "CAPTURE_SCREENSHOT"
          },
          (result) => {

            resolve(result);
          }
        );
      });

    console.log(
      "📩 Response from background:",
      response
    );

    if (!response?.screenshot) {

      console.log(
        "❌ Screenshot not received"
      );

      if (screenshotStatus) {
        screenshotStatus.innerText =
          "❌ Failed";
      }

      return;
    }

    console.log(
      "📸 Screenshot received by agent!"
    );

    setDashboardStatus(
      "screenshotStatus",
      "✓ Captured"
    );

    // =================================================
    // SEND TO LOCAL AI
    // =================================================

    console.log(
      "🧠 Sending screenshot to local AI..."
    );

    const aiStatus =
      document.getElementById(
        "aiStatus"
      );

    setDashboardStatus(
      "aiStatus",
      "● Processing"
    );

    const aiResponse =
      await fetch(
        "http://127.0.0.1:5000/detect",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            screenshot: response.screenshot,

            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,

            sensitiveRegions: perception.uiElements.filter(
              (element) =>
                element.type === "sensitive_input"
  )
})
          
        }
      );

    console.log(
      "📡 AI server status:",
      aiResponse.status
    );

    const result =
      await aiResponse.json();

    setDashboardStatus(
      "aiStatus",
      "✓ Ready"
    );

    console.log(
      "🤖 Local AI Response:",
      result
    );

    // =================================================
    // FUSION LAYER
    // =================================================

    console.log(
      "🔗 FUSION LAYER"
    );

    console.log(
      "🌐 DOM UI Elements:",
      perception.uiElements
    );

    console.log(
      "👁️ Visual AI Elements:",
      result.detections
    );

    console.log(
      "👁️ Visual UI Regions:",
      result.ui_regions
    );
    
    latestVisualRegions = result.ui_regions;

    setDashboardStatus(
      "privacyStatus",
      result.ui_regions?.length
        ? "✓ Protected"
        : "✓ Active"
    );

    console.log(
      "🛡️ Privacy Layer: Active"
    );

    console.log(
      "🤖 Agent Perception: Ready"
    );

  } catch (error) {

    console.log(
      "❌ Could not connect to local AI:",
      error
    );

    const aiStatus =
      document.getElementById(
        "aiStatus"
      );

    if (aiStatus) {
      aiStatus.innerText =
        "❌ AI Server Offline";
    }
  }
}

// =====================================================
// 11. STARTUP
// =====================================================

showPerceptionBoxes();

capturePageForAgent();

console.log(
  "🚀 Browser Agent ready."
);