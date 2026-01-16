import {
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Seye Alexander | Software Engineer',
      },
      {
        name: 'description',
        content: 'Seye Alexander - Software Engineer',
      },
    ],
    links: [
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
