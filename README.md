# DRC Fitness - Content Management Guide

This document explains how to update the photos, videos, and text content for the DRC Fitness website.

## 1. Updating Photos & Images
All static images should be placed in the `/public` folder. 
When the site is built, these files are served from the root URL.

- **Trainer Photo**: 
  - File: `/public/trainer.png`
  - Note: This should be a cut-out image with a transparent background. It will automatically sit on top of the orange background block in the Trainer section.

- **Logo**:
  - File: `/public/logo.png` (or `.svg` if you change the file extension in `src/components/Nav.jsx`).
  - Note: Save your logo image with a transparent background so it looks perfect against the dark navigation bar. If no image is provided, the site gracefully falls back to displaying the text "DRC.Fitness".

## 2. Updating Videos
All videos should be placed in the `/public/video/` directory. The site uses a robust fallback system, meaning if a video isn't there, it simply won't break the layout.

### File Naming Conventions:
- **Showcase Section (Below Hero)**
  - `showcase.mp4` - Main vertical video for desktop/tablets (1080x1920)
  - `showcase-mobile.mp4` - Lower resolution vertical video for phones (720x1280)
  - `showcase-poster.jpg` - Still image shown while the video is loading

- **Equipment Section (Scrolling Tiles)**
  - `equipment-01.mp4` through `equipment-06.mp4` (Vertical, 9:16 aspect ratio)
  - `equipment-01-poster.jpg` through `equipment-06-poster.jpg`

### Video Compression Guidelines
**CRITICAL: Videos MUST be compressed before uploading to avoid extremely slow load times.**
We strongly recommend using **Handbrake** (https://handbrake.fr/):
1. **Codec:** H.264 (MP4 container)
2. **Dimensions:** Ensure the longest edge is 1080px (e.g., 1080x1920 for vertical).
3. **Bitrate:** Set Average Bitrate to `2000` kbps.
4. **Audio:** Remove the audio track entirely (videos are muted anyway).
5. **Web Optimized:** Check the "Web Optimized" box on the Summary tab.
*Target File Size: 1MB - 4MB per clip.*

## 3. Updating Text, Links, and Testimonials
All major text content, links, and data arrays are stored in a single file to make editing easy.

- File to edit: `/src/lib/constants.js`

In this file, you can easily change:
- `WHATSAPP_URL` and `INSTAGRAM_LINK`
- Studio Phone number and Address
- The `testimonials` list (simply add or edit the quotes and authors)
- The `equipment` list (you can add new items or link them to new video files)

## Running the Site Locally
To preview your changes:
1. Open your terminal in this folder
2. Run `npm run dev`
3. Open `http://localhost:5173` in your browser

To build for production:
Run `npm run build`
