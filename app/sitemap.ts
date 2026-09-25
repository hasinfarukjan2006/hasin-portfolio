import { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '@/lib/resumeData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hasin-f-portfolio.vercel.app';

  const projectUrls = PROJECTS_DATA.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
