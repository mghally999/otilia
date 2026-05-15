// Pure-CSS marquee. Items repeated for a seamless loop.
import styles from "./Marquee.module.css";

export default function Marquee({ items = [], speed = 60, reverse = false }) {
  // Repeat enough times to fill any width
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div
        className={`${styles.track} ${reverse ? styles.reverse : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.text}>{item}</span>
            <span className={styles.diamond} aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
