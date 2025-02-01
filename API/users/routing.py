from django.urls import re_path

from .consumers import UploadStatusConsumer

websocket_urlpatterns = [
    re_path(r"ws/upload_status/(?P<item_id>\d+)/$", UploadStatusConsumer.as_asgi())
]
