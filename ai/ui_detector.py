import cv2


def detect_ui_regions(image_path):

    image = cv2.imread(image_path)

    if image is None:
        return []

    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect edges
    edges = cv2.Canny(gray, 50, 150)

    # Find contours
    contours, _ = cv2.findContours(
        edges,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    ui_regions = []

    for contour in contours:

        x, y, w, h = cv2.boundingRect(contour)

        # Ignore very small regions
        if w < 30 or h < 15:
            continue

        # UI elements are generally rectangular
        area = w * h

        if area < 500:
            continue

        ui_regions.append({
            "x": x,
            "y": y,
            "width": w,
            "height": h
        })

    return ui_regions


if __name__ == "__main__":

    image_path = "demo/screenshot.png"

    regions = detect_ui_regions(image_path)

    print("👁️ Visual UI Regions:")

    for region in regions:
        print(region)