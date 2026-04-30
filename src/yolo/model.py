from ultralytics import YOLO

model = YOLO('yolov8n.pt')
model.train(data='dataset.yaml', epochs=60, imgsz=640)

results = model.val(data='dataset.yaml')
print(results)