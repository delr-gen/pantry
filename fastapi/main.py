from inference_sdk import InferenceHTTPClient
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load variables from .env file into the environment
load_dotenv() 

app = FastAPI()
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # List of allowed origins
    allow_credentials=True,          # Allow cookies and auth headers
    allow_methods=["*"],             # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],             # Allow all HTTP headers
)

@app.get("/ingredients/{image_path}")
async def root(image_path):
    CLIENT = InferenceHTTPClient(
        api_url="https://serverless.roboflow.com",
        api_key=os.getenv("ROBOFLOW_API_KEY")
    )

    result = CLIENT.infer(image_path, model_id="gens-workspace-mlt3g/my-pantry-project-4-rfdetr-small-t1")
    print(result)

    return result