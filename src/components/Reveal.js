// Pure presentational wrapper — adds the .reveal class so the global
// IntersectionObserver picks it up. SSR-friendly (server component).

export function Reveal({ as = "div", className = "", delay, children, ...rest }) {
  const Tag = as;
  const style = delay ? { transitionDelay: `${delay}ms`, ...(rest.style || {}) } : rest.style;
  return (
    <Tag {...rest} style={style} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}

export function Stagger({ as = "div", className = "", children, ...rest }) {
  const Tag = as;
  return (
    <Tag {...rest} className={`stagger ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/**
 * MaskedHeading splits a heading into per-line masked spans for an editorial reveal.
 * Pass `lines` as an array of strings, one per visual line.
 */
export function MaskedHeading({ as = "h1", className = "", lines = [], ...rest }) {
  const Tag = as;
  return (
    <Tag {...rest} className={`reveal ${className}`.trim()}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
