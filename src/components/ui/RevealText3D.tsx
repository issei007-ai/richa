"use client";
import { useEffect, useRef, useState, CSSProperties, Fragment } from "react";

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;       // base delay (s)
  stagger?: number;     // per-unit stagger (s)
  splitBy?: "word" | "char";
  once?: boolean;
}

/**
 * 3D flip-in text reveal. Each unit hinges up from rotateX(-90deg) into place.
 * Uses only transform + opacity → composited on the GPU, smooth on mobile too.
 * Triggered by IntersectionObserver (no per-frame JS). Real space text nodes
 * between words preserve natural line-wrapping on small screens.
 * Renders a <span>, so drop it inside any heading/paragraph tag.
 */
export default function RevealText3D({
  text,
  className = "",
  style,
  delay = 0,
  stagger = 0.04,
  splitBy = "word",
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const words = text.split(" ");
  let unitIndex = 0;

  const renderUnit = (content: string, key: string) => {
    const d = delay + unitIndex * stagger;
    unitIndex++;
    return (
      <span key={key} className="r3d-unit">
        <span
          className="r3d-inner"
          style={{
            transform: visible ? "rotateX(0deg)" : "rotateX(-90deg)",
            opacity: visible ? 1 : 0,
            transitionDelay: `${d}s`,
          }}
        >
          {content}
        </span>
      </span>
    );
  };

  return (
    <span ref={ref} className={`r3d ${className}`} style={style}>
      {/* Real text for screen readers / AI agents. aria-label isn't valid on a
          plain span, so the accessible copy lives here (visually hidden) while
          the animated split is marked decorative. */}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>
      <span aria-hidden>
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="r3d-word">
              {splitBy === "char"
                ? word.split("").map((ch, ci) => renderUnit(ch, `${wi}-${ci}`))
                : renderUnit(word, `w${wi}`)}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
