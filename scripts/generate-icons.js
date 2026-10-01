import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = fs.readFileSync('public/icon.svg');

async function run() {
  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/pwa-192x192.png');

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-512x512.png');

  // Apple touch icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');

  // Maskable 512x512 (with 15% safe padding as required by Android guidelines)
  const innerSize = Math.round(512 * 0.75); // 384px
  const innerBuffer = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 } // #0f172a
    }
  })
    .composite([{ input: innerBuffer, top: Math.round((512 - innerSize) / 2), left: Math.round((512 - innerSize) / 2) }])
    .png()
    .toFile('public/pwa-maskable-512x512.png');

  console.log('PWA icons generated successfully!');
}

run().catch(console.error);
