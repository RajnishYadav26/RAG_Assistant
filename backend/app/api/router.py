from fastapi import APIRouter

from app.api.routes import health
from app.api.routes import auth


api_router = APIRouter(
    prefix="/api"
)


api_router.include_router(
    health.router
)

api_router.include_router(
    auth.router
)