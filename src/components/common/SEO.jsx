import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, canonical, ogTitle, ogDescription, structuredData }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="twitter:url" content={canonical} />
    <meta property="twitter:title" content={ogTitle || title} />
    <meta property="twitter:description" content={ogDescription || description} />
    {structuredData && (
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    )}
  </Helmet>
);