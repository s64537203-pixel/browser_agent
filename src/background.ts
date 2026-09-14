console.log("Browser Agent Background Started!");

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {

    console.log(
      "📩 Message received:",
      message.type
    );

    if (message.type !== "CAPTURE_SCREENSHOT") {
      return false;
    }

    const windowId = sender.tab?.windowId;

    if (typeof windowId !== "number") {

      console.log(
        "❌ No window ID found."
      );

      sendResponse({
        screenshot: null,
        error: "No window ID found."
      });

      return false;
    }

    chrome.tabs.captureVisibleTab(
      windowId,
      { format: "png" },

      (dataUrl) => {

        if (chrome.runtime.lastError) {

          console.log(
            "❌ Capture error:",
            chrome.runtime.lastError.message
          );

          sendResponse({
            screenshot: null,
            error:
              chrome.runtime.lastError.message
          });

          return;
        }

        console.log(
          "📸 Screenshot captured!"
        );

        sendResponse({
          screenshot: dataUrl ?? null
        });
      }
    );

    return true;
  }
);