# DRC Fitness - Video Assets

Drop your real video files into this directory. The site is built to handle missing files gracefully (falling back to static placeholders or gradients).

## File Naming Conventions

### Showcase Section (Below Hero)
- `showcase.mp4` - Main vertical video for desktop/tablets (1080x1920)
- `showcase-mobile.mp4` - Lower resolution vertical video for phones (720x1280)
- `showcase-poster.jpg` - Still image from the video, shown while loading

### Equipment Section (Scrolling Tiles)
- `equipment-01.mp4` through `equipment-06.mp4` (Vertical, 9:16 aspect ratio)
- `equipment-01-poster.jpg` through `equipment-06-poster.jpg`

## Compression Guidelines

**CRITICAL: Videos MUST be compressed before uploading to avoid slow load times.**

We strongly recommend using **Handbrake** (https://handbrake.fr/):

1. **Codec:** H.264 (MP4 container)
2. **Preset:** Start with "Fast 1080p30"
3. **Dimensions:** Ensure the longest edge is 1080px (e.g. 1080x1920 for vertical).
4. **Video Tab -> Bitrate:** Set Average Bitrate to `2000` kbps.
5. **Audio:** Remove audio track entirely (videos are muted anyway).
6. **Web Optimized:** Check the "Web Optimized" box on the Summary tab.

**Target File Size:** 1MB - 4MB per clip.
