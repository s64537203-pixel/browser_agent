import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from ui_detector import detect_ui_regions
import base64


# =====================================================
# FLASK APP
# =====================================================

app = Flask(__name__)
CORS(app)


# =====================================================
# LOCAL AI MODEL
# =====================================================

model = YOLO("yolo11n.pt")


# =====================================================
# DETECTION API
# =====================================================

@app.route("/detect", methods=["POST"])
def detect():

    data = request.json

    # =================================================
    # RECEIVE SCREENSHOT
    # =================================================

    image_data = data["screenshot"]

    # Remove "data:image/png;base64," prefix
    image_data = image_data.split(",")[1]

    # Convert Base64 → image bytes
    image_bytes = base64.b64decode(image_data)

    # Local screenshot path
    image_path = "ai/current_screenshot.png"

    # Save screenshot locally
    with open(image_path, "wb") as f:
        f.write(image_bytes)

    print("📸 Screenshot received!")


    # =================================================
    # 1. PRIVACY PROTECTION
    # =================================================

    sensitive_regions = data.get(
        "sensitiveRegions",
        []
    )

    viewport_width = data.get(
        "viewportWidth",
        1
    )

    viewport_height = data.get(
        "viewportHeight",
        1
    )

    # Read screenshot
    image = cv2.imread(image_path)

    scale_x = 1
    scale_y = 1

    if image is not None:

        image_height, image_width = image.shape[:2]

        # Browser viewport → screenshot scaling
        scale_x = image_width / viewport_width
        scale_y = image_height / viewport_height

        print(
            f"📐 Coordinate scaling: "
            f"x={scale_x:.2f}, "
            f"y={scale_y:.2f}"
        )

        # ---------------------------------------------
        # Mask sensitive regions
        # ---------------------------------------------

        for region in sensitive_regions:

            x = int(region["x"] * scale_x)
            y = int(region["y"] * scale_y)

            w = int(region["width"] * scale_x)
            h = int(region["height"] * scale_y)

            cv2.rectangle(
                image,
                (x, y),
                (x + w, y + h),
                (0, 0, 0),
                -1
            )

        # ---------------------------------------------
        # Save sanitized screenshot
        # ---------------------------------------------

        cv2.imwrite(
            image_path,
            image
        )

        if sensitive_regions:

            print(
                "🔒 Privacy Protection: "
                "Sensitive regions masked"
            )

        else:

            print(
                "🔒 Privacy Protection: "
                "No sensitive regions found"
            )

    else:

        print(
            "❌ Could not read screenshot"
        )


    # =================================================
    # 2. YOLO VISUAL PERCEPTION
    # =================================================

    results = model(image_path)

    detections = []

    for result in results:

        for box in result.boxes:

            class_id = int(
                box.cls[0]
            )

            confidence = float(
                box.conf[0]
            )

            class_name = model.names[
                class_id
            ]

            detections.append({

                "class": class_name,

                "confidence": round(
                    confidence,
                    2
                )

            })


    print(
        "🧠 YOLO detections:",
        detections
    )


    # =================================================
    # 3. WEB UI VISUAL PERCEPTION
    # =================================================

    ui_regions = detect_ui_regions(
        image_path
    )

    # ---------------------------------------------
    # Convert screenshot coordinates
    # back to browser viewport coordinates
    # ---------------------------------------------

    if image is not None:

        normalized_regions = []

        for region in ui_regions:

            normalized_regions.append({

                "x": round(
                    region["x"] / scale_x
                ),

                "y": round(
                    region["y"] / scale_y
                ),

                "width": round(
                    region["width"] / scale_x
                ),

                "height": round(
                    region["height"] / scale_y
                )

            })

        ui_regions = normalized_regions


    print(
        "👁️ Visual UI Regions:",
        ui_regions
    )


    # =================================================
    # 4. RETURN AI RESPONSE
    # =================================================

    return jsonify({

        "success": True,

        "detections": detections,

        "ui_regions": ui_regions,

        "privacy_protected":
            len(sensitive_regions) > 0

    })


# =====================================================
# START LOCAL AI SERVER
# =====================================================

if __name__ == "__main__":

    print(
        "🤖 Local AI Server Started!"
    )

    print(
        "📍 http://127.0.0.1:5000"
    )

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )