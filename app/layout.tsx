import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://capacitacion.quas.cl'),
  title: {
    template: '%s | Quas Capacitación',
    default: 'Quas Capacitación - Cursos y Certificaciones Profesionales en Chile',
  },
  description: 'Centro líder en capacitación profesional especializada en sistemas de gestión, calidad, seguridad y herramientas técnicas. Formación de excelencia en Santiago, Chile.',
  keywords: [
    'capacitación profesional',
    'cursos empresariales',
    'certificación ISO',
    'HACCP',
    'gestión de calidad',
    'auditoría interna',
    'Excel empresarial',
    'gestión de riesgos',
    'formación corporativa',
    'Santiago',
    'Chile'
  ],
  authors: [{ name: 'Quas Capacitación' }],
  creator: 'Quas Capacitación',
  publisher: 'Quas Capacitación',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Quas Capacitación - Formación Profesional de Excelencia',
    description: 'Desarrolla tus habilidades profesionales con nuestros cursos especializados en gestión, calidad, seguridad y herramientas técnicas.',
    url: 'https://capacitacion.quas.cl',
    siteName: 'Quas Capacitación',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quas Capacitación - Formación Profesional',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicon-16x16.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3b82f6',
      },
    ],
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Quas Capacitación - Formación Profesional de Excelencia',
    description: 'Desarrolla tus habilidades profesionales con nuestros cursos especializados en gestión, calidad, seguridad y herramientas técnicas.',
    images: ['/images/twitter-image.jpg'],
    creator: '@r3q.cl',
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    // Descomentar y reemplazar con el código real de Google Search Console
    // google: 'tu-codigo-de-verificacion-google',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 