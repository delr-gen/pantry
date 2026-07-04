import io
from inference_sdk import InferenceHTTPClient
from fastapi import FastAPI, File, Request, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
from PIL import Image
from dotenv import load_dotenv

# Load variables from .env file into the environment
load_dotenv() 

app = FastAPI()
origins = ["http://localhost:5173", "https://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # List of allowed origins
    allow_credentials=True,          # Allow cookies and auth headers
    allow_methods=["*"],             # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],             # Allow all HTTP headers
)

@app.post("/ingredients")
async def root(file: UploadFile):
    #return {'inference_id': 'c286c581-b26f-4788-abfa-577e76baeabb', 'time': 0.3189168903045356, 'image': {'width': 5712, 'height': 4284}, 'predictions': [{'x': 3028.0, 'y': 1379.5, 'width': 734.0, 'height': 853.0, 'confidence': 0.8889818787574768, 'class': 'yellow onion', 'class_id': 13, 'detection_id': 'c8a1e9db-5f0c-4b46-988b-2bb710ef3e4c'}, {'x': 4062.0, 'y': 2695.0, 'width': 464.0, 'height': 438.0, 'confidence': 0.8878828287124634, 'class': 'garlic', 'class_id': 5, 'detection_id': 'a51c360b-d891-4eae-b83c-0ae1297367a5'}, {'x': 3841.5, 'y': 2469.5, 'width': 415.0, 'height': 299.0, 'confidence': 0.8853735327720642, 'class': 'garlic', 'class_id': 5, 'detection_id': 'fdeef2c7-50a1-42f0-93de-ab1e0b837d2d'}, {'x': 3595.5, 'y': 2333.5, 'width': 405.0, 'height': 337.0, 'confidence': 0.8076992630958557, 'class': 'garlic', 'class_id': 5, 'detection_id': '92c3e015-db01-481e-87e0-27dbd12edbff'}, {'x': 2226.0, 'y': 2845.0, 'width': 574.0, 'height': 814.0, 'confidence': 0.5335069894790649, 'class': 'pork chop', 'class_id': 11, 'detection_id': 'ebc09df7-6e04-47ac-91fc-9d1faf36c372'}]}
    image_bytes = await file.read()
    
    # Write the uploaded bytes to the local file
    img = Image.open(io.BytesIO(image_bytes))

    CLIENT = InferenceHTTPClient(
        api_url="https://serverless.roboflow.com",
        api_key=os.getenv("ROBOFLOW_API_KEY")
    )

    workspace_id = os.getenv("ROBOFLOW_WORKSPACE_ID")
    model_id = os.getenv("ROBOFLOW_MODEL_ID")

    result = CLIENT.infer(img, model_id=f"{workspace_id}/{model_id}")
    print(result)

    return result
