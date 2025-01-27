from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.URLField(
        null=True, blank=True
    )  # Campo para salvar a URL da imagem


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Nome da categoria
    category_id = models.CharField(max_length=10, unique=True)  # ID único da categoria

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Nome do local
    location_id = models.CharField(max_length=2, unique=True)  # ID único do local

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Nome da cor
    color_id = models.CharField(max_length=2, unique=True)  # ID único da cor

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Nome da marca
    brand_id = models.CharField(max_length=2, unique=True)  # ID único da marca

    def __str__(self):
        return self.name


class Item(models.Model):
    STATUS_CHOICES = [
        ("found", "Found"),
        ("lost", "Lost"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )  # Quem registrou o item
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=250, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, blank=True)
    color = models.ForeignKey(
        Color, on_delete=models.SET_NULL, null=True, blank=True
    )  # Cor do item (opcional)
    brand = models.ForeignKey(
        Brand, on_delete=models.SET_NULL, null=True, blank=True
    )  # Marca do item (opcional)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="lost"
    )  # Diferencia entre Achado ou Perdido
    found_lost_date = models.DateTimeField(null=True, blank=True)  # Data personalizada
    created_at = models.DateTimeField(auto_now_add=True)  # Data de cadastro automático

    barcode = models.CharField(max_length=10, editable=False, blank=True)
    matches = models.ManyToManyField(
        "self", symmetrical=False, blank=True, related_name="matched_with"
    )

    # Calcula o código único (barcode) do item
    def save(self, *args, **kwargs):
        category_id = self.category.category_id if self.category else "00"
        location_id = self.location.location_id if self.location else "00"
        color_id = self.color.color_id if self.color else "00"
        brand_id = self.brand.brand_id if self.brand else "00"
        self.barcode = f"{category_id}{location_id}{color_id}{brand_id}"
        super().save(*args, **kwargs)

    def delete_with_related_chats(self):
        from chat.models import ChatRoom

        ChatRoom.objects.filter(item=self).delete()
        self.delete()

    def __str__(self):
        return f"{self.name} ({self.location})"


class ItemImage(models.Model):
    item = models.ForeignKey(Item, related_name="images", on_delete=models.CASCADE)
    image_url = models.URLField()  # URL para armazenar imagens remotamente

    def __str__(self):
        return f"Image for {self.item.name}"
