import shutil
import os

source_hero = r"C:\Users\darsh\.gemini\antigravity\brain\17d63d35-9ad2-41eb-be11-7daf86bf10fa\hero_illustration_1775778346257.png"
source_footer = r"C:\Users\darsh\.gemini\antigravity\brain\17d63d35-9ad2-41eb-be11-7daf86bf10fa\footer_illustration_1775778366257.png"

dest_hero = "assets/hero_main.png"
dest_footer = "assets/footer_main.png"

try:
    shutil.copy(source_hero, dest_hero)
    print(f"Copied hero to {dest_hero}")
except Exception as e:
    print(f"Error copying hero: {e}")

try:
    shutil.copy(source_footer, dest_footer)
    print(f"Copied footer to {dest_footer}")
except Exception as e:
    print(f"Error copying footer: {e}")
