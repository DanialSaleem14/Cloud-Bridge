import { useState } from 'react';

/**
 * Image with a graceful fallback. If the file is missing the layout still
 * holds its shape and a neutral placeholder is shown instead of a broken icon.
 */
export default function Img({ src, alt = '', className = '', ext = 'jpg', ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={`img-fallback ${className}`} aria-label={alt} role="img" />;
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/${src}.${ext}`}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
