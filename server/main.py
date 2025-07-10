from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from phishing_detector import simple_phishing_detector  # Make sure this module exists and is correct

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.post("/analyze")
def analyze_url(request: URLRequest):
    try:
        result, confidence = simple_phishing_detector(request.url)
        return {
            "result": result,
            "confidence": confidence,
            "details": f"Detection result: {result}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
