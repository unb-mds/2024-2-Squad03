from datetime import timedelta
from django.utils.timezone import now
from django.test import TestCase
from users.models import Item
from chat.models import ChatRoom
from django.contrib.auth.models import User
from django.core.management import call_command

class CleanOldItemsTest(TestCase):
    def setUp(self):
        """
        Configura os dados para os testes:
        - Cria usuários, itens e chats com diferentes datas de criação.
        """
        # Usuários
        self.user1 = User.objects.create_user(username="user1", password="password1")
        self.user2 = User.objects.create_user(username="user2", password="password2")

        # Itens
        self.recent_item = Item.objects.create(
            name="Recent Item",
            user=self.user1,
        )
        self.old_item = Item.objects.create(
            name="Old Item",
            user=self.user2,
        )

        # Atualizar o campo created_at
        self.recent_item.created_at = now() - timedelta(days=10)  # Menos de 2 semanas
        self.recent_item.save()

        self.old_item.created_at = now() - timedelta(days=20)  # Mais de 2 semanas
        self.old_item.save()

        # Chats vinculados aos itens
        self.chat_recent = ChatRoom.objects.create(
            participant_1=self.user1,
            participant_2=self.user2,
            item=self.recent_item,
        )
        self.chat_old = ChatRoom.objects.create(
            participant_1=self.user1,
            participant_2=self.user2,
            item=self.old_item,
        )

    def test_clean_old_items(self):
        """
        Testa se itens com mais de 2 semanas e seus chats vinculados são excluídos.
        """
        # Executa o comando
        call_command("clean_old_items")

        # Verifica se o item antigo foi excluído
        self.assertFalse(Item.objects.filter(id=self.old_item.id).exists())

        # Verifica se o chat antigo foi excluído automaticamente
        self.assertFalse(ChatRoom.objects.filter(id=self.chat_old.id).exists())

        # Verifica se o item recente ainda existe
        self.assertTrue(Item.objects.filter(id=self.recent_item.id).exists())

        # Verifica se o chat recente ainda existe
        self.assertTrue(ChatRoom.objects.filter(id=self.chat_recent.id).exists())
