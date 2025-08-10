import React, { useEffect, useRef, useState } from "react";

export default function RadhaJaapCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("radha_jaap_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const clickSoundRef = useRef(null);
  const gongSoundRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("radha_jaap_count", String(count));
  }, [count]);

  const within108 = count % 108;
  const bead = within108 + 1;
  const rounds = Math.floor(count / 108);

  const size = 320;
  const stroke = 20;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const dashOffset = C * (1 - within108 / 108);

  const handleIncrement = () => setCount(c => c + 1);

  return (
    <div
      onClick={handleIncrement}
      className="min-h-screen w-full select-none overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFD700, #FFB300)",
        color: "#7B3F00",
      }}
    >
      <main className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-extrabold" style={{ color: "#FF6F00" }}>राधे • RADHA</h1>
          <p className="mt-2" style={{ color: "#EEF527" }}>Tap anywhere to add 1 mantra</p>
        </div>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r} stroke="#FFF59D" strokeWidth={stroke} fill="none" />
          <circle
            cx={size/2}
            cy={size/2}
            r={r}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${size/2} ${size/2})`}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#FF6F00" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-4 text-center">
          <div className="text-5xl font-bold">{bead} / 108</div>
          <div className="mt-1">Round: {rounds}</div>
          <div>Total: {count}</div>
        </div>
      </main>
    </div>
  );
}
