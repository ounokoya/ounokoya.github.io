"""Prépare la photo et les captures du portfolio (ADR-0006).

Usage : python3 scripts/images.py
Sources : specs/reference/images/ (photo du CV, captures des README des solutions).
Sorties : public/images/photo.jpg (480 × 480) et public/images/<dépôt>.jpg (704 × 440, 16:10).
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "specs" / "reference" / "images"
OUT = ROOT / "public" / "images"

# capture du README (nom du dossier local) -> nom du dépôt publié
FEATURED = {
    "rest-countries-api": "rest-countries-api",
    "multi-step-form": "multi-step-form",
    "ecommerce-product-page": "ecommerce-product-page",
    "newsletter-signup": "newsletter-signup-form",
    "recipe-page": "recipe-page",
    "front-ui-cart": "front-ui-cart",
}


def capture(source: Path, target: Path) -> None:
    """Haut de la capture, en 16:10 (centré si elle fait moins de 900 px de haut), réduit à 704 × 440."""
    image = Image.open(source).convert("RGB")
    width, height = image.size
    crop_height = min(height, round(width / 1.6))
    crop_width = round(crop_height * 1.6)
    left = (width - crop_width) // 2
    image.crop((left, 0, left + crop_width, crop_height)).resize((704, 440), Image.LANCZOS).save(target, "JPEG", quality=85, optimize=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    photo = Image.open(SOURCE / "photo.jpg").convert("RGB").resize((480, 480), Image.LANCZOS)
    photo.save(OUT / "photo.jpg", "JPEG", quality=85, optimize=True)
    for folder, repo in FEATURED.items():
        capture(SOURCE / f"capture-{folder}.jpg", OUT / f"{repo}.jpg")
    for f in sorted(OUT.iterdir()):
        print(f.name, Image.open(f).size, f.stat().st_size // 1024, "Ko")


if __name__ == "__main__":
    main()
