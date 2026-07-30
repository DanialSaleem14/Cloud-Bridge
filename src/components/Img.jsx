import { useEffect, useState } from 'react';

/**
 * Image with a graceful fallback. If the file is missing (or an external URL
 * fails to load) the layout still holds its shape and a neutral placeholder
 * is shown instead of a broken icon.
 */
export default function Img({ src, alt = '', className = '', ext = 'jpg', ...rest }) {
  const [failed, setFailed] = useState(false);

  // Re-arm the fallback when the src changes — otherwise a component that's
  // reused with a new src (e.g. a live preview while typing) stays stuck on
  // the placeholder from a previous failed load.
  useEffect(() => setFailed(false), [src]);

  const trimmed = (src || '').trim();
  if (!trimmed || failed) return <span className={`img-fallback ${className}`} aria-label={alt} role="img" />;

  const isAbsolute = /^(https?:)?\/\//.test(trimmed) || /^www\./i.test(trimmed);
  const resolvedSrc = isAbsolute
    ? (trimmed.startsWith('www.') ? `https://${trimmed}` : trimmed)
    : `${import.meta.env.BASE_URL}images/${trimmed}.${ext}`;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
