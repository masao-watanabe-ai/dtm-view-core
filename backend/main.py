from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import settings
from backend.api.trace import router as trace_router
from backend.api.compare import router as compare_router
from backend.api.simulate import router as simulate_router

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trace_router)
app.include_router(compare_router)
app.include_router(simulate_router)


@app.get("/health")
def health():
    return {"status": "ok"}
