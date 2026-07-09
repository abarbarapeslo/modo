import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Visual signature of MODO: scattered noise (dots) resolving into an
 * organized structure (grid of aligned points connected by thin lines).
 * Left half = ruído, right half = clareza.
 */
export function NoiseToClarity() {
  const noise = useMemo(() => {
    // Deterministic pseudo-random scatter so SSR/CSR match and re-renders are stable.
    const pts: { x: number; y: number; r: number; o: number }[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 90; i++) {
      pts.push({
        x: 20 + rand() * 200,
        y: 20 + rand() * 280,
        r: 1 + rand() * 2.4,
        o: 0.2 + rand() * 0.5,
      });
    }
    return pts;
  }, []);

  const grid = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 4; col++) {
        pts.push({ x: 330 + col * 36, y: 52 + row * 36 });
      }
    }
    return pts;
  }, []);

  return (
    <div className="card overflow-hidden bg-white p-2">
      <svg viewBox="0 0 500 330" className="w-full" role="img" aria-label="Ruído se organizando em estrutura">
        {/* noise side */}
        {noise.map((p, i) => (
          <motion.circle
            key={`n${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#8F8D83"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: p.o }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.01, duration: 0.6 }}
          />
        ))}

        {/* transition strokes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={`t${i}`}
            d={`M ${215 + i * 4} ${60 + i * 50} C 270 ${70 + i * 48}, 285 ${64 + i * 50}, 316 ${52 + i * 48}`}
            stroke="#E4E3DC"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
          />
        ))}

        {/* clarity side: grid */}
        {grid.map((p, i) => (
          <motion.circle
            key={`g${i}`}
            cx={p.x}
            cy={p.y}
            r={2.4}
            fill={i === 9 || i === 14 ? "#E8B83A" : "#1E1D1A"}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: i === 9 || i === 14 ? 1 : 0.75, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.02, duration: 0.4 }}
          />
        ))}
        {/* thin connecting lines on grid */}
        {grid.slice(0, -4).map((p, i) =>
          (i + 1) % 4 !== 0 ? (
            <motion.line
              key={`l${i}`}
              x1={p.x}
              y1={p.y}
              x2={p.x + 36}
              y2={p.y}
              stroke="#E4E3DC"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 + i * 0.015 }}
            />
          ) : null
        )}

        <text x="30" y="318" fontSize="10" fill="#8F8D83" letterSpacing="2">
          RUÍDO
        </text>
        <text x="418" y="318" fontSize="10" fill="#1E1D1A" letterSpacing="2">
          CLAREZA
        </text>
      </svg>
    </div>
  );
}

/** Subtle field of dispersed dots used as background texture. */
export function DotsField({ className = "" }: { className?: string }) {
  const dots = useMemo(() => {
    const pts: { x: number; y: number; r: number; o: number }[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 70; i++) {
      pts.push({
        x: rand() * 100,
        y: rand() * 100,
        r: 0.8 + rand() * 1.6,
        o: 0.06 + rand() * 0.16,
      });
    }
    return pts;
  }, []);

  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r / 4} fill="#1E1D1A" opacity={d.o} />
      ))}
    </svg>
  );
}
