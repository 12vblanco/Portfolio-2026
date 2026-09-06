import { Helmet } from 'react-helmet-async';
import { BRAND } from '../../data/siteConfig';

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogImageAlt,
  noindex = false,
  structuredData,
}) => {
  const image = ogImage || 'https://victorblancoweb.com/og-image.jpg';
  const imageAlt = ogImageAlt || ogTitle || title;
  return (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
    {noindex && <meta name="robots" content="noindex" />}

    {/* Open Graph */}
    <meta property="og:type" content={ogType} />
    {/* Without site_name the card is attributed to nobody on Facebook,
        LinkedIn, Slack and Discord */}
    <meta property="og:site_name" content={BRAND.name} />
    <meta property="og:locale" content={BRAND.locale} />
    {canonical && <meta property="og:url" content={canonical} />}
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content={String(ogImageWidth)} />
    <meta property="og:image:height" content={String(ogImageHeight)} />
    <meta property="og:image:alt" content={imageAlt} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    {canonical && <meta name="twitter:url" content={canonical} />}
    <meta name="twitter:title" content={ogTitle || title} />
    <meta name="twitter:description" content={ogDescription || description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content={imageAlt} />

    {/* Structured data: accepts single object or array */}
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
};
