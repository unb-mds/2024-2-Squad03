import json

from channels.generic.websocket import AsyncWebsocketConsumer


class UploadStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.item_id = self.scope["url_route"]["kwargs"]["item_id"]
        self.room_group_name = f"item_{self.item_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def upload_completed(self, event):
        await self.send(
            text_data=json.dumps({"status": "completed", "images": event["images"]})
        )
