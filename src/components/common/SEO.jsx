import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, canonical, ogTitle, ogDescription, ogImage, structuredData }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="og:image" content={ogImage || 'https://victorblancoweb.com/og-image.jpg'} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonical} />
    <meta name="twitter:title" content={ogTitle || title} />
    <meta name="twitter:description" content={ogDescription || description} />
    <meta name="twitter:image" content={ogImage || 'https://victorblancoweb.com/og-image.jpg'} />

    {/* Structured data — accepts single object or array */}
    {structuredData && (
      Array.isArray(structuredData)
        ? structuredData.map((sd, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(sd)}
            </script>
          ))
        : (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )
    )}
  </Helmet>
);