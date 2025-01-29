from .models import Item
from .tasks import send_match_notification


def hamming_distance(barcode1: str, barcode2: str) -> int:
    """calcula a Hamming Distance entre dois barcodes"""
    return sum(c1 != c2 for c1, c2 in zip(barcode1, barcode2))


def get_potential_matches(target_item: Item, opposite_status: str, max_distance: int):
    """Obtém itens com o status oposto ao do item alvo e calcula os matches."""
    potential_items = Item.objects.filter(
        status=opposite_status,
        category=target_item.category,
        location=target_item.location,
    ).prefetch_related("images")

    # Filtrar itens com distância de Hamming dentro do limite
    matches = [
        item
        for item in potential_items
        if hamming_distance(target_item.barcode, item.barcode) <= max_distance
    ]

    return matches


def generate_match_data(matches):
    """Gera dados estruturados para os itens correspondentes."""
    return [
        {
            "id": match.id,
            "name": match.name,
            "description": match.description,
            "location": (match.location.name if match.location else "Local não especificado"),
            "found_lost_date": (
                match.found_lost_date.strftime("%d/%m/%Y")
                if match.found_lost_date
                else "Data não especificada"
            ),
            "image_url": match.images.first().image_url if match.images.exists() else None,
        }
        for match in matches
    ]


def find_and_notify_matches(target_item: Item, max_distance=2):
    """Encontra possíveis matches para o item fornecido e notifica o usuário."""
    if target_item.status == "lost":
        matches = get_potential_matches(
            target_item, opposite_status="found", max_distance=max_distance
        )
        if matches:
            # Adicionar os matches ao item perdido
            target_item.matches.add(*matches)
            target_item.save()

            # Enviar notificação ao dono do item perdido
            match_data = generate_match_data(matches)
            send_match_notification.delay(
                to_email=target_item.user.email,
                item_name=target_item.name,
                matches=match_data,
            )

    elif target_item.status == "found":
        potential_items = get_potential_matches(
            target_item, opposite_status="lost", max_distance=max_distance
        )
        for lost_item in potential_items:
            # Adicionar o item encontrado como match ao item perdido
            lost_item.matches.add(target_item)
            lost_item.save()

            # Obter todos os matches atualizados e notificar o usuário
            updated_matches = lost_item.matches.all()
            match_data = generate_match_data(updated_matches)
            send_match_notification.delay(
                to_email=lost_item.user.email,
                item_name=lost_item.name,
                matches=match_data,
            )
