from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils.timezone import now
from users.models import Item

class Command(BaseCommand):
    help = "Exclui itens com mais de 2 semanas e os chats vinculados automaticamente."

    def handle(self, *args, **kwargs):
        cutoff_date = now() - timedelta(weeks=2)

        # Filtrar itens antigos
        old_items = Item.objects.filter(created_at__lt=cutoff_date)

        # Debug: listar itens filtrados
        print(f"Itens encontrados para exclusão: {[item.id for item in old_items]}")

        count = old_items.count()
        old_items.delete()

        self.stdout.write(
            self.style.SUCCESS(f"{count} itens e seus chats vinculados foram excluídos.")
        )
