/**
 * Minimal ZIP builder using built-in Node.js zlib (no extra deps).
 * Produces a valid ZIP/pkpass file from an object of filename → Buffer.
 */
import { deflateRawSync } from "zlib";

function u32le(n: number): Buffer {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n >>> 0);
  return b;
}
function u16le(n: number): Buffer {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n & 0xffff);
  return b;
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (const b of buf) crc = CRC_TABLE[(crc ^ b) & 0xff]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

export async function createZip(files: Record<string, Buffer>): Promise<Buffer> {
  const localHeaders: Buffer[] = [];
  const centralDirs: Buffer[]  = [];
  let offset = 0;

  for (const [name, data] of Object.entries(files)) {
    const nameBuf   = Buffer.from(name, "utf8");
    const crc       = crc32(data);
    const compressed = data.length > 0 ? deflateRawSync(data, { level: 6 }) : data;
    const method    = data.length > 0 ? 8 : 0;  // deflate or store

    // Local file header
    const local = Buffer.concat([
      Buffer.from([0x50, 0x4b, 0x03, 0x04]),  // signature
      u16le(20),            // version needed
      u16le(0),             // flags
      u16le(method),        // compression method
      u16le(0),             // mod time
      u16le(0),             // mod date
      u32le(crc),           // CRC-32
      u32le(compressed.length),
      u32le(data.length),
      u16le(nameBuf.length),
      u16le(0),             // extra field length
      nameBuf,
      compressed,
    ]);

    // Central directory entry
    const central = Buffer.concat([
      Buffer.from([0x50, 0x4b, 0x01, 0x02]),  // signature
      u16le(20),            // version made by
      u16le(20),            // version needed
      u16le(0),             // flags
      u16le(method),
      u16le(0), u16le(0),   // mod time/date
      u32le(crc),
      u32le(compressed.length),
      u32le(data.length),
      u16le(nameBuf.length),
      u16le(0), u16le(0),   // extra, comment length
      u16le(0), u16le(0),   // disk start, int attribs
      u32le(0),             // ext attribs
      u32le(offset),        // local header offset
      nameBuf,
    ]);

    localHeaders.push(local);
    centralDirs.push(central);
    offset += local.length;
  }

  const centralBuf  = Buffer.concat(centralDirs);
  const eocd        = Buffer.concat([
    Buffer.from([0x50, 0x4b, 0x05, 0x06]),  // end of central dir signature
    u16le(0), u16le(0),                      // disk number, start disk
    u16le(centralDirs.length),
    u16le(centralDirs.length),
    u32le(centralBuf.length),
    u32le(offset),
    u16le(0),                                // comment length
  ]);

  return Buffer.concat([...localHeaders, centralBuf, eocd]);
}
