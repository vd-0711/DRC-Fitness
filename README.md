# DRC Fitness

A private training studio website — animated WebGL particle hero, smooth
scrolling, and an industrial-chrome design. Built with React + Vite.

## Quick start (run it locally)

**Prerequisite:** [Node.js](https://nodejs.org/) 18+ (developed on Node 24).

Open a terminal **in this folder** (the one containing `package.json`) and run:

```bash
npm install      # one-time: installs all dependencies (incl. 3D + animation libs)
npm run dev      # start the dev server
```

Then open the URL it prints — usually **http://localhost:5173**. The page
hot-reloads as you edit files. Press `Ctrl + C` in the terminal to stop it.

> Note: the app lives in the inner `drc-fitness/` folder (the one with
> `package.json` and `src/`). If you have two nested `drc-fitness` folders, `cd`
> into the inner one first.

### Other commands

```bash
npm run build    # production build into /dist  (this is what you deploy)
npm run preview  # locally preview the production build
npm run lint     # check code for problems
```

### Deploy

Run `npm run build` and upload the generated **`dist/`** folder to any static
host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.). On Netlify/Vercel
you can also point them at this repo with build command `npm run build` and
publish directory `dist`.

---

# Content & Media Guide

How to update the photos, videos, and text on the DRC Fitness website. The site
uses a **robust fallback system**: if a media file is missing, the layout never
breaks — it degrades to an elegant placeholder until you add the file.

All media lives in the `/public` folder and is served from the site root, so
`/public/trainer.jpg` is referenced in code as `/trainer.jpg`.

---

## 1. The main vertical video (Showcase section)

One portrait video, presented in a chrome frame with an ambient blurred fill.

| File | Notes |
|---|---|
| `/public/video/showcase.mp4` | Vertical 9:16, ~1080×1920 |
| `/public/video/showcase-mobile.mp4` | Lower-res 9:16 for phones, ~720×1280 |
| `/public/video/showcase-poster.jpg` | Still shown before the video plays (also used as the blurred background) |

If the video is missing, the poster image is shown instead.

---

## 2. The Trainer (wow section)

The trainer media sits in a chrome frame with an ember glow and floating stat
chips. It accepts **either a video or a photo** — the site tries them in order:

1. `/public/trainer.mp4` (+ optional `/public/trainer-poster.jpg`) — **preferred**
2. `/public/trainer.jpg` (or `/public/trainer.png`)
3. If neither exists → a "DR" monogram placeholder

- **Best format:** portrait 4:5. A short, muted, looping clip looks fantastic
  here. Video is automatically skipped for visitors who prefer reduced motion
  (they get the photo / poster instead).

---

## 3. Equipment photos

The equipment gallery is **photo-first**. Drop portrait images here:

- `/public/equipment/equip-01.jpg` … `equip-09.jpg`
- **Best format:** portrait 4:5, ~1200×1500.

Names and categories live in `src/lib/constants.js` (the `equipment` array) —
edit `name` / `cat` there, and add/remove items to match how many photos you
have. A card with a missing photo degrades to a brushed-metal panel with the
name, so it always looks intentional.

> On desktop the gallery **pins and scrolls sideways** as you scroll down. On
> phones it's a normal swipe-scroll. Both are automatic.

---

## 4. Logo

- `/public/logo.png` (transparent background recommended). Falls back to the
  text "DRC.Fitness" if missing.

---

## 5. Text, links & testimonials

All copy, links, and data arrays are in **`src/lib/constants.js`**:
WhatsApp / Instagram / Google Maps links, studio phone & address, the
`services`, `equipment`, and `testimonials` lists.

---

## Image / video compression (please read)

**Compress media before adding it** or the site will load slowly. Use
[Handbrake](https://handbrake.fr/) for video:

1. Codec **H.264** (MP4)
2. Longest edge **1080px** (e.g. 1080×1920 vertical)
3. Average bitrate **~2000 kbps**
4. **Remove the audio track** (videos are muted)
5. Tick **Web Optimized**

Target **1–4 MB per clip**. For photos, export JPGs around 1200px on the long
edge.

---

## Accessibility & performance

The animated particle hero, smooth scrolling, custom cursor, and motion all
**automatically turn off** for visitors who have "reduce motion" enabled, and
the 3D hero gracefully falls back to a static treatment on devices without
WebGL — so the site stays fast and accessible everywhere. The 3D code is also
loaded only after the page appears, so it never slows down the first paint.

(Run instructions are at the top of this file under **Quick start**.)
