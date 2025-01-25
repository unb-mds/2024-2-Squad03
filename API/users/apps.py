from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users"

    def ready(self):
        # Importe os sinais dentro do método ready
        import users.signals  # Certifique-se de que o arquivo signals.py existe e está configurado
