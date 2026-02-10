import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Matches the sidebar profile-img-wrapper:
// - Circular shape
// - Gradient: #ff6600 → #ff3366 (135deg)
// - White bold "B" letter
// - Font: Poppins (fallback sans-serif)

const SIZE = 512;

function generateSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const fontSize = size * 0.55;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6600"/>
      <stop offset="100%" stop-color="#ff3366"/>
    </linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#grad)"/>
  <text x="${cx}" y="${cy}" dy="0.35em" text-anchor="middle" fill="white"
        font-family="Poppins, Arial, sans-serif" font-size="${fontSize}" font-weight="700">B</text>
</svg>`;
}

async function generateFavicons() {
  // Generate SVG favicon
  const svg = generateSvg(SIZE);
  writeFileSync(join(publicDir, 'favicon.svg'), svg);
  console.log('Generated: favicon.svg');

  try {
    const sharp = (await import('sharp')).default;
    const svgBuffer = Buffer.from(svg);

    // Generate favicon.ico (32x32 PNG wrapped — browsers accept PNG as .ico)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon.ico'));
    console.log('Generated: favicon.ico (32x32)');

    // Generate favicon-16x16.png
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(join(publicDir, 'favicon-16x16.png'));
    console.log('Generated: favicon-16x16.png');

    // Generate favicon-32x32.png
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon-32x32.png'));
    console.log('Generated: favicon-32x32.png');

    // Generate apple-touch-icon (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));
    console.log('Generated: apple-touch-icon.png');

    // Generate Android chrome icons
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(join(publicDir, 'android-chrome-192x192.png'));
    console.log('Generated: android-chrome-192x192.png');

    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'android-chrome-512x512.png'));
    console.log('Generated: android-chrome-512x512.png');
  } catch {
    console.log('sharp not installed — only SVG favicon generated.');
    console.log('Run "npm install -D sharp" to also generate PNG/ICO favicons.');
  }
}

generateFavicons();
