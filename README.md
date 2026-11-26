# Otium Studio — 3D Virtual Clothing Store

Interactive 3D virtual showroom and apparel store built with **React 19**, **TypeScript**, **Three.js**, and **Tailwind CSS v4**.

## Brand Palette

- **Primary**: `#26384D` (Deep Slate Navy)
- **Secondary**: `#819486` (Muted Sage Slate)
- **Accent**: `#C47B52` (Warm Terracotta Copper)

## Key Features

1. **Lobby 3D Glass Sculpture (`hero` stage)**:
   - Translucent refractive 3D `otium®` glass centerpiece floating above the studio floor with live mouse-parallax refraction and blurred background racks.
   - Editorial typography with terracotta highlight blocks (`Rare pieces`, `Heavyweight`, `2k26`).
2. **Interactive 3D Chrome Showroom (`rack` stage)**:
   - Smooth scroll or click camera fly-through from the glass lobby straight up to the metallic chrome garment rack.
   - 9 distinct procedural 3D garments (`Tee`, `Hoodie`, `Jacket`, `Crewneck`) with cotton/fleece/twill canvas textures and interactive category filtering (`All`, `Men`, `Women`, `Archive`).
3. **360° Garment Spotlight & Cart (`focus` stage)**:
   - Clicking any hanging garment glides it forward off the rack into the spotlight.
   - Drag horizontally to spin 360° (with automatic front/back print & woven edition tag texture switching), select sizes (`S–XL`), and add pieces to the slide-over `// cart` drawer.

## Swapping in Real Garment Photography

Edit `src/data/products.ts` and provide `customFrontTextureUrl` / `customBackTextureUrl` on any item—the 3D mesh will automatically load and map your product imagery.

## Local Development & Build

```bash
npm install
npm run dev
npm run build
```
