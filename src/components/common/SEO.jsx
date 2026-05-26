export const SEO = ({ title, description, canonical, ogTitle, ogDescription, ogImage, structuredData }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="og:image" content={ogImage || 'https://victorblancoweb.com/og-image.jpg'} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonical} />
    <meta property="twitter:title" content={ogTitle || title} />
    <meta property="twitter:description" content={ogDescription || description} />
    <meta property="twitter:image" content={ogImage || 'https://victorblancoweb.com/og-image.jpg'} />
    {structuredData && (
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    )}
  </Helmet>
);