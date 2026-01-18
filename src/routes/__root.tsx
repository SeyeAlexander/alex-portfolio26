import {
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

// Your deployed site URL - update this when you deploy!
const SITE_URL = 'https://www.seyealexander.dev'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      // Basic
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Seye Alexander | Fullstack Developer & React Engineer' },

      // SEO Description
      {
        name: 'description',
        content:
          'Seye Alexander (Oluwaseye Alexander) - Fullstack Developer & React Engineer at EStation. Building high-performance apps and collaborative tools at the intersection of design and engineering.',
      },

      // Keywords (helps with relevance signals)
      {
        name: 'keywords',
        content:
          'Seye Alexander, Oluwaseye Alexander, seyealexander, fullstack developer, react engineer, react developer, frontend developer, software engineer, Nigeria developer, EStation, web developer, TypeScript, Next.js, Node.js',
      },

      // Author
      { name: 'author', content: 'Seye Alexander' },

      // Robots
      { name: 'robots', content: 'index, follow' },

      // Canonical URL
      { rel: 'canonical', href: SITE_URL },

      // Open Graph (Facebook, LinkedIn)
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE_URL },
      {
        property: 'og:title',
        content: 'Seye Alexander | Fullstack Developer & React Engineer',
      },
      {
        property: 'og:description',
        content:
          'Fullstack Developer & React Engineer at EStation. Building high-performance apps and collaborative tools at the intersection of design and engineering.',
      },
      { property: 'og:image', content: `${SITE_URL}/og-image.png` },
      { property: 'og:site_name', content: 'Seye Alexander' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: SITE_URL },
      {
        name: 'twitter:title',
        content: 'Seye Alexander | Fullstack Developer & React Engineer',
      },
      {
        name: 'twitter:description',
        content:
          'Fullstack Developer & React Engineer at EStation. Building high-performance apps and collaborative tools.',
      },
      { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },

      // Theme color for mobile browsers
      { name: 'theme-color', content: '#ff5500' },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      // Canonical link
      {
        rel: 'canonical',
        href: SITE_URL,
      },
    ],
    // Structured Data (JSON-LD) for Google's Knowledge Graph
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Seye Alexander',
          alternateName: ['Oluwaseye Alexander', 'seyealexander'],
          jobTitle: 'Fullstack Developer',
          worksFor: {
            '@type': 'Organization',
            name: 'EStation',
          },
          url: SITE_URL,
          sameAs: [
            'https://x.com/seyealexander',
            'https://www.linkedin.com/in/alexander-ojubanire-438284241',
            'https://github.com/seyealexander',
          ],
          knowsAbout: [
            'React',
            'TypeScript',
            'Node.js',
            'Next.js',
            'Fullstack Development',
            'Frontend Development',
            'Web Development',
          ],
          description:
            'Fullstack Developer & React Engineer at EStation, architecting high-performance apps and collaborative tools.',
        }),
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1
          className="font-korium text-6xl md:text-[200px] text-black mb-4"
          style={{ fontWeight: 700, lineHeight: 0.9 }}
        >
          404
        </h1>
        <p className="font-geist-mono text-lg text-black/70 mb-8">
          Page not found
        </p>
        <Link
          to="/"
          className="font-geist-mono text-orange hover:text-orange/80 underline underline-offset-4 transition-colors"
        >
          Back to Alex
        </Link>
      </div>
    </div>
  )
}
