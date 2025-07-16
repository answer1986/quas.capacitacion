import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://capacitacion.quas.cl'
  
  const routes = [
    '',
    '/cursos',
    '/nosotros',
    '/contacto',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const cursos = [
    {
      slug: 'sistema-haccp',
      title: 'Aplicación De Técnicas Para Implementación De Un Sistema HACCP',
    },
    {
      slug: 'excel-gestion-laboral',
      title: 'Herramientas De Excel Básico Aplicadas A La Gestión Laboral',
    },
    {
      slug: 'auditores-internos-iso',
      title: 'Formación De Auditores Internos En Sistemas De Gestión Integrados',
    },
    {
      slug: 'aseguramiento-calidad-pac',
      title: 'Aplicación De Plan De Aseguramiento De La Calidad PAC',
    },
    {
      slug: 'gestion-riesgos-operacionales',
      title: 'Técnicas De Gestión De Riesgos Operacionales',
    },
  ].map((curso) => ({
    url: `${baseUrl}/cursos/${curso.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...routes, ...cursos]
} 