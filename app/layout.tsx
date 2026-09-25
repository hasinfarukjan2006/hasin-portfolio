import type { Metadata } from 'next';
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hasin-f-portfolio.vercel.app'),
  title: 'HASIN F | Computer Science & Engineering Student | Software Developer',
  description: 'Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence, Machine Learning, and Edge AI.',
  keywords: [
    'Hasin F',
    'Software Developer',
    'Computer Science Engineer',
    'AI/ML',
    'Full Stack Developer',
    'React Developer',
    'Python Developer',
    'Edge AI',
    'Software Engineering Student',
    'M. Kumarasamy College of Engineering'
  ],
  authors: [{ name: 'HASIN F' }],
  creator: 'HASIN F',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hasin-f-portfolio.vercel.app',
    title: 'HASIN F | Computer Science & Engineering Student | Software Developer',
    description: 'Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence, Machine Learning, and Edge AI.',
    siteName: 'HASIN F Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HASIN F Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HASIN F | Software Developer & AI/ML Enthusiast',
    description: 'Computer Science and Engineering student with hands-on experience in software development, Artificial Intelligence, Machine Learning, and Edge AI.',
    images: ['/og-image.png'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'HASIN F',
    jobTitle: 'Software Developer & AI/ML Enthusiast',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'M. Kumarasamy College of Engineering',
    },
    url: 'https://hasin-f-portfolio.vercel.app',
    sameAs: [
      'https://github.com/hasinfarukjan2006',
      'https://www.linkedin.com/in/hasin-f/',
    ],
    knowsAbout: [
      'Software Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Edge AI',
      'React.js',
      'Python',
      'Java',
      'TensorFlow Lite'
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <link rel="canonical" href="https://hasin-f-portfolio.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark-50 text-slate-100 antialiased min-h-screen flex flex-col selection:bg-primary-600 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50 shadow-lg font-mono text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
