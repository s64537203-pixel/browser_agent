from ultralytics import YOLO

# Lightweight pretrained model
model = YOLO("yolo11n.pt")

# Screenshot/image
results = model("demo/screenshot.png")

# Detection results
for result in results:
    for box in result.boxes:
        class_id = int(box.cls[0])
        confidence = float(box.conf[0])
        class_name = model.names[class_id]

        print(
            f"Detected: {class_name} | "
            f"Confidence: {confidence:.2f}"
        )