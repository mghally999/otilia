// OTILÌA logo as scalable SVG. Renders the Cormorant-Garamond-style wordmark
// from the brand guidelines, with the "INTERIOR DESIGN" tagline beneath.
// Colour follows currentColor so it adapts to the theme automatically.

export default function Logo({
  variant = "full",            // "full" | "mark" | "stack"
  width,
  height,
  ariaLabel = "OTILÌA Interior Design",
  style,
  className,
  textOnly = false,
}) {
  // Mark variant — just "OTILÌA"
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 360 90"
        width={width || "100%"}
        height={height || "auto"}
        role="img"
        aria-label="OTILÌA"
        className={className}
        style={style}
      >
        <text
          x="50%"
          y="68"
          textAnchor="middle"
          fontFamily="var(--f-display), 'Cormorant Garamond', serif"
          fontWeight="300"
          fontSize="80"
          letterSpacing="6"
          fill="currentColor"
        >
          OTILÌA
        </text>
      </svg>
    );
  }

  // Stack variant — used in nav, very compact
  if (variant === "stack") {
    return (
      <svg
        viewBox="0 0 220 64"
        width={width || "100%"}
        height={height || "auto"}
        role="img"
        aria-label={ariaLabel}
        className={className}
        style={style}
      >
        <text
          x="50%"
          y="38"
          textAnchor="middle"
          fontFamily="var(--f-display), 'Cormorant Garamond', serif"
          fontWeight="300"
          fontSize="42"
          letterSpacing="3"
          fill="currentColor"
        >
          OTILÌA
        </text>
        <text
          x="50%"
          y="56"
          textAnchor="middle"
          fontFamily="var(--f-body), sans-serif"
          fontWeight="400"
          fontSize="7.5"
          letterSpacing="3"
          fill="currentColor"
          opacity="0.85"
        >
          INTERIOR DESIGN
        </text>
      </svg>
    );
  }

  // Full variant — wordmark with rule and tagline
  return (
    <svg
      viewBox="0 0 600 150"
      width={width || "100%"}
      height={height || "auto"}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="92"
        textAnchor="middle"
        fontFamily="var(--f-display), 'Cormorant Garamond', serif"
        fontWeight="300"
        fontSize="100"
        letterSpacing="6"
        fill="currentColor"
      >
        OTILÌA
      </text>
      {!textOnly && (
        <>
          <text
            x="50%"
            y="124"
            textAnchor="middle"
            fontFamily="var(--f-body), sans-serif"
            fontWeight="400"
            fontSize="11"
            letterSpacing="9"
            fill="currentColor"
            opacity="0.9"
          >
            INTERIOR DESIGN
          </text>
        </>
      )}
    </svg>
  );
}
