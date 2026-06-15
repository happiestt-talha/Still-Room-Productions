import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

async function generateIcons() {
  const iconSource = resolve(publicDir, 'icon-512x512.png')

  // Apple touch icon (180x180)
  await sharp(iconSource)
    .resize(180, 180)
    .png()
    .toFile(resolve(publicDir, 'apple-touch-icon.png'))
  console.log('✓ apple-touch-icon.png (180x180)')

  // Icon 192x192
  await sharp(iconSource)
    .resize(192, 192)
    .png()
    .toFile(resolve(publicDir, 'icon-192x192.png'))
  console.log('✓ icon-192x192.png (192x192)')

  // Convert OG image to JPG as well
  const ogSource = resolve(publicDir, 'og-image.png')
  await sharp(ogSource)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(resolve(publicDir, 'og-image.jpg'))
  console.log('✓ og-image.jpg (1200x630)')

  console.log('\nAll icons generated successfully!')
}

generateIcons().catch(console.error)
