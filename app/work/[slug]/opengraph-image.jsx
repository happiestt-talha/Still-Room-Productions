import { ImageResponse } from 'next/og'
import { client, urlFor } from '../../../lib/sanityClient'
import { getProjectBySlug } from '../../../lib/queries'

export const runtime = 'edge'
export const alt = 'Still Room Productions — Film'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { slug } = await params
  let project = null

  try {
    project = await client.fetch(getProjectBySlug, { slug })
  } catch (e) {
    // Fall through to default branding
  }

  const filmTitle = project?.title || 'Film'
  const filmType = project?.type || 'Short Film'

  return new ImageResponse(
    (
      <div style={{
        background: '#0a0a0a',
        width: '100%', height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        fontFamily: 'Georgia, serif',
        position: 'relative',
      }}>
        {/* Top border line */}
        <div style={{ position: 'absolute', top: 60, left: 60, right: 60, height: 1, background: '#333' }} />

        {/* Company name */}
        <div style={{ color: '#666', fontSize: 14, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 40 }}>
          Still Room Productions
        </div>

        {/* Film title */}
        <div style={{ color: '#ffffff', fontSize: 56, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400, textAlign: 'center', lineHeight: 1.2, maxWidth: '900px' }}>
          {filmTitle}
        </div>

        {/* Film type */}
        <div style={{ color: '#888', fontSize: 18, letterSpacing: '0.25em', marginTop: 24, textTransform: 'uppercase', textAlign: 'center' }}>
          {filmType}
        </div>

        {/* Bottom line */}
        <div style={{ position: 'absolute', bottom: 60, left: 60, right: 60, height: 1, background: '#333' }} />

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 36, color: '#444', fontSize: 13, letterSpacing: '0.1em' }}>
          stillroomproductions.com
        </div>
      </div>
    ),
    { ...size }
  )
}
