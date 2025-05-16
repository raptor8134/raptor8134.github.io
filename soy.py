#!/bin/python3
# Automated soyjackify
# example: `./soy.py "stupid shit"`
# full code: https://github.com/raptor8134/wojak-meme-bot

from PIL import Image, ImageFont, ImageDraw
import textwrap, sys, requests, io

def soyjack(text):
    file = requests.get("https://i.imgur.com/kPlA6E1.jpeg").content
    if not file:
        try:
            with open("soyjak.jpg", "rb") as f:
                file=f.read()
        except:
            print("Imgur's chimping out, download imgur.com/kPlA6E1.jpeg and save it as soyjak.jpg in this folder")
            exit()
    image = Image.open(io.BytesIO(file))
    font = ImageFont.truetype("/usr/share/fonts/TTF/DejaVuSans.ttf", 50)
    ImageDraw.Draw(image).text((680, 70),
        textwrap.fill(text, 19), (0,0,0), font=font)
    return image

text = " ".join(sys.argv[1::])
soyjack(text).save("stupidopinion.jpg")
