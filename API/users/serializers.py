import cloudinary.uploader
from rest_framework import serializers

from .models import Brand, Category, Color, Item, ItemImage, Location


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "category_id"]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "name", "location_id"]


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name", "color_id"]


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name", "brand_id"]


class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = ["id", "image_url", "item"]
        extra_kwargs = {"item": {"read_only": True}}


class ItemSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False),
        write_only=True,
        required=False,
    )
    remove_images = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )  # IDs das imagens a serem removidas
    image_urls = serializers.SerializerMethodField(read_only=True)
    image_ids = serializers.SerializerMethodField(read_only=True)
    barcode = serializers.CharField(read_only=True)  # Código único do item
    category_name = serializers.SerializerMethodField()
    location_name = serializers.SerializerMethodField()
    color_name = serializers.SerializerMethodField()
    brand_name = serializers.SerializerMethodField()
    location = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(), required=False
    )

    class Meta:
        model = Item
        fields = [
            "id",
            "barcode",
            "name",
            "description",
            "category",
            "category_name",
            "location",
            "location_name",
            "color",
            "color_name",
            "brand",
            "brand_name",
            "status",
            "found_lost_date",
            "created_at",
            "images",  # Para retornar imagens associadas ao item
            "remove_images",  # Para remover imagens associadas ao item
            "image_urls",
            "image_ids"  # Para fazer upload de imagens
        ]

    def validate_images(self, value):
        for image in value:
            if not hasattr(image, "file"):
                raise serializers.ValidationError(
                    "Cada item em 'images' deve ser um arquivo válido."
                )
        return value

    def create(self, validated_data):
        # Extrai as imagens
        images = validated_data.pop("images", [])
        MAX_IMAGES = 2

        if len(images) > MAX_IMAGES:
            raise serializers.ValidationError(
                f"Você pode adicionar no máximo {MAX_IMAGES} imagens."
            )
        item = super().create(validated_data)

        for image in images:
            if item.images.count() >= MAX_IMAGES:
                raise serializers.ValidationError(
                    f"O item já possui o número máximo de {MAX_IMAGES} imagens."
                )
            try:
                upload_result = cloudinary.uploader.upload(image)
                image_url = upload_result.get("secure_url")
                ItemImage.objects.create(item=item, image_url=image_url)
            except Exception as e:
                raise serializers.ValidationError({"images": str(e)})

        return item

    def update(self, instance, validated_data):
        # Remover imagens existentes
        remove_images = validated_data.pop("remove_images", [])
        if remove_images:
            ItemImage.objects.filter(id__in=remove_images, item=instance).delete()

        # Adicionar novas imagens
        images = validated_data.pop("images", [])
        MAX_IMAGES = 2

        if instance.images.count() + len(images) > MAX_IMAGES:
            raise serializers.ValidationError(
                f"Você pode adicionar no máximo {MAX_IMAGES} imagens."
            )

        for image in images:
            try:
                upload_result = cloudinary.uploader.upload(image)
                image_url = upload_result.get("secure_url")
                ItemImage.objects.create(item=instance, image_url=image_url)
            except Exception as e:
                raise serializers.ValidationError({"images": str(e)})

        # Atualizar outros campos
        return super().update(instance, validated_data)

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_location_name(self, obj):
        return obj.location.name if obj.location else None

    def get_color_name(self, obj):
        return obj.color.name if obj.color else None

    def get_brand_name(self, obj):
        return obj.brand.name if obj.brand else None

    def get_image_urls(self, obj):
        return [image.image_url for image in obj.images.all()]
    
    def get_image_ids(self, obj):
        return [image.id for image in obj.images.all()]
