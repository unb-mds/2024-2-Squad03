import json
import os

from django import template
from django.conf import settings

register = template.Library()

# Ler o manifest ao carregar o arquivo (você pode melhorar, cachear, etc.)
MANIFEST_PATH = os.path.join(
    settings.BASE_DIR, "AcheiUnB", "static", "dist", ".vite", "manifest.json"
)
with open(MANIFEST_PATH, "r") as f:
    manifest = json.load(f)


@register.simple_tag
@register.simple_tag
def vite_asset(entry_name="index.html", asset_type="js"):
    """
    Retorna o caminho principal de JS ou de CSS.
    Exemplo:
       {% vite_asset 'index.html' 'js' %}
       {% vite_asset 'index.html' 'css' %}
    """
    if entry_name not in manifest:
        return ""
    entry_data = manifest[entry_name]

    if asset_type == "js":
        # 'file' = js principal
        return f"/static/dist/{entry_data.get('file', '')}"
    elif asset_type == "css":
        css_files = entry_data.get("css", [])
        if css_files:
            return f"/static/dist/{css_files[0]}"
        else:
            return ""
    else:
        return ""
