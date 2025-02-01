import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from chat.routing import websocket_urlpatterns as chat_websocket_urlpatterns
from users.routing import websocket_urlpatterns as users_websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "AcheiUnB.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                chat_websocket_urlpatterns
                + users_websocket_urlpatterns  # ✅ Adiciona múltiplas rotas WebSocket
            )
        ),
    }
)
