import fs from 'fs';
import zlib from 'zlib';

// High-Fidelity Diagnostic System Icon: Obsidian Blue & Glowing Ruby Blood Droplet
function createDiagnosticPNG(width, height, isMaskable = false) {
  const rowLength = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowLength);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0;
    const ny = y / height;

    for (let x = 0; x < width; x++) {
      const nx = x / width;
      // Obsidian Midnight Blue (#090d16: 9, 13, 22) to Deep Navy (#0f172a: 15, 23, 42)
      const t = (nx + ny) / 2;
      let r = Math.round(9 * (1 - t) + 15 * t);
      let g = Math.round(13 * (1 - t) + 23 * t);
      let b = Math.round(22 * (1 - t) + 42 * t);

      // Outer Crimson Ring if not maskable
      if (!isMaskable) {
        const borderDist = Math.min(nx, 1 - nx, ny, 1 - ny);
        if (borderDist > 0.035 && borderDist < 0.05) {
          // Crimson accent #e11d48
          r = 225; g = 29; b = 72;
        }
      }

      // 3D Ruby Blood Droplet in center
      const dropCx = 0.50;
      const dropCy = 0.52;
      const distFromDropCenter = Math.hypot(nx - dropCx, (ny - dropCy) * 0.9);
      // Droplet shape calculation:
      const inDropBody = distFromDropCenter < 0.28 && ny >= 0.40;
      const inDropTip = ny >= 0.22 && ny <= 0.45 && Math.abs(nx - dropCx) <= (ny - 0.22) * 1.0;
      const inDroplet = inDropBody || inDropTip;

      if (inDroplet) {
        // Ruby red gradient from bright scarlet to deep maroon
        const dropT = (ny - 0.22) / 0.55;
        r = Math.round(239 * (1 - dropT) + 120 * dropT);
        g = Math.round(68 * (1 - dropT) + 10 * dropT);
        b = Math.round(68 * (1 - dropT) + 30 * dropT);

        // Highlight glint
        if (Math.hypot(nx - 0.43, ny - 0.42) < 0.06) {
          r = 255; g = 180; b = 180;
        }
      }

      // Draw stylized "R" (left side)
      const inR_bar = nx >= 0.22 && nx <= 0.28 && ny >= 0.42 && ny <= 0.72;
      const inR_top = nx >= 0.22 && nx <= 0.42 && ny >= 0.42 && ny <= 0.48;
      const inR_mid = nx >= 0.22 && nx <= 0.42 && ny >= 0.54 && ny <= 0.60;
      const inR_curve = nx >= 0.36 && nx <= 0.43 && ny >= 0.42 && ny <= 0.60;
      const inR_leg = ny >= 0.58 && ny <= 0.72 && nx >= 0.27 + (ny - 0.58) * 0.9 && nx <= 0.34 + (ny - 0.58) * 0.9;

      // Draw stylized "T" (right side)
      const inT_top = nx >= 0.56 && nx <= 0.78 && ny >= 0.42 && ny <= 0.48;
      const inT_post = nx >= 0.64 && nx <= 0.70 && ny >= 0.42 && ny <= 0.72;

      // Medical Cross in top-right
      const crossX = 0.78;
      const crossY = 0.24;
      const inCrossV = Math.abs(nx - crossX) < 0.018 && Math.abs(ny - crossY) < 0.055;
      const inCrossH = Math.abs(nx - crossX) < 0.055 && Math.abs(ny - crossY) < 0.018;

      if (inR_bar || inR_top || inR_mid || inR_curve || inR_leg || inT_top || inT_post) {
        // Bright metallic white
        r = 255; g = 255; b = 255;
      } else if (inCrossV || inCrossH) {
        // Glowing cyan-ruby
        r = 56; g = 189; b = 248;
      }

      const pixelOffset = rowOffset + 1 + x * 3;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 2;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

fs.writeFileSync('public/pwa-192x192.png', createDiagnosticPNG(192, 192, false));
fs.writeFileSync('public/pwa-512x512.png', createDiagnosticPNG(512, 512, false));
fs.writeFileSync('public/pwa-maskable-512x512.png', createDiagnosticPNG(512, 512, true));
fs.writeFileSync('public/apple-touch-icon.png', createDiagnosticPNG(180, 180, false));

console.log('Successfully generated RT Lab DIAGNOSTIC PWA icons in public/');
