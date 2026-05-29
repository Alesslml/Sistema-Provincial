// ===== SHARED PRIMITIVES =====
const { useState, useEffect, useRef, useMemo } = React;

// Severity / status badges
function Badge({ kind, children, className = "" }) {
  const styles = {
    CRÍTICO:   "bg-wine text-white",
    MODERADO:  "bg-amber2-100 text-amber2 border border-amber2-200",
    BAJO:      "bg-cream-200 text-navy-300 border border-cream-300",
    OPORTUNIDAD: "bg-forest-100 text-forest-500 border border-forest-200",
    TENDENCIA: "bg-brand-100 text-navy border border-brand-200",
    "RIVAL EXPUESTO": "bg-wine-100 text-wine border border-wine-200",
    "FECHA CÍVICA": "bg-brand-50 text-brand-600 border border-brand-100",
    "SILENCIO TEMÁTICO": "bg-cream-200 text-navy-300 border border-cream-300",
    ALTO:      "bg-wine text-white",
    MEDIO:     "bg-amber2-100 text-amber2 border border-amber2-200",
    HIGH:      "bg-wine text-white",
    MEDIUM:    "bg-amber2-100 text-amber2 border border-amber2-200",
    LOW:       "bg-cream-200 text-navy-300",
    "MUY ACTIVO": "bg-wine text-white",
    INACTIVO:  "bg-cream-200 text-navy-300",
    "CRECIENDO RÁPIDO": "bg-wine-100 text-wine border border-wine-200",
    ESTABLE:   "bg-brand-50 text-brand-600 border border-brand-100",
    DISMINUYENDO: "bg-forest-50 text-forest-500 border border-forest-100",
    Publicado: "bg-forest-100 text-forest-500 border border-forest-200",
    Programado: "bg-brand-100 text-navy border border-brand-200",
    Borrador:  "bg-cream-200 text-navy-300",
    "ATAQUE DIRECTO": "bg-wine-100 text-wine border border-wine-200",
    POSICIONAMIENTO: "bg-brand-100 text-navy border border-brand-200",
    "CONTENIDO EMOCIONAL": "bg-amber2-50 text-amber2 border border-amber2-100",
    PROPUESTA: "bg-forest-50 text-forest-500 border border-forest-100",
  };
  return (
    <span className={`smallcaps inline-flex items-center px-2 py-0.5 rounded ${styles[kind] || "bg-cream-200 text-navy-300"} ${className}`}>
      {children || kind}
    </span>
  );
}

function PlatformBadge({ p }) {
  const map = {
    IG: { bg: "bg-cream-200", t: "text-navy" },
    FB: { bg: "bg-brand-50", t: "text-navy" },
    X:  { bg: "bg-cream-300", t: "text-navy" },
    TikTok: { bg: "bg-cream-200", t: "text-navy" },
    Instagram: { bg: "bg-cream-200", t: "text-navy" },
    Facebook: { bg: "bg-brand-50", t: "text-navy" },
    "Prensa Cusco": { bg: "bg-cream-300", t: "text-navy" },
  };
  const s = map[p] || { bg: "bg-cream-200", t: "text-navy" };
  return <span className={`smallcaps ${s.bg} ${s.t} px-1.5 py-0.5 rounded`}>{p}</span>;
}

function Panel({ title, subtitle, right, children, className = "", noPad = false }) {
  return (
    <section className={`bg-cream-50 border border-cream-200 rounded-lg shadow-panel ${className}`}>
      {(title || right) && (
        <header className="flex items-end justify-between px-5 pt-4 pb-3 border-b border-cream-200">
          <div>
            {title && <h2 className="serif text-[20px] leading-tight text-navy">{title}</h2>}
            {subtitle && <p className="text-[12px] text-navy-300 mt-0.5">{subtitle}</p>}
          </div>
          {right}
        </header>
      )}
      <div className={noPad ? "" : "p-5"}>{children}</div>
    </section>
  );
}

function Card({ children, className = "", onClick }) {
  return (
    <div onClick={onClick} className={`bg-cream-50 border border-cream-200 rounded-lg shadow-card ${onClick ? "cursor-pointer hover:shadow-pop hover:border-forest-100 transition-all" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", onClick, className = "", size = "md", icon }) {
  const variants = {
    primary: "bg-brand-300 text-navy hover:bg-brand-400",
    secondary: "bg-cream-50 text-navy border border-forest-100 hover:bg-cream-100",
    ghost: "bg-transparent text-navy hover:bg-cream-200",
    wine: "bg-wine text-white hover:bg-wine-500",
    forest: "bg-forest text-white hover:bg-forest-500",
    danger: "bg-wine-50 text-wine border border-wine-200 hover:bg-wine-100",
  };
  const sizes = { sm: "text-[11px] px-2.5 py-1.5", md: "text-[12px] px-3.5 py-2", lg: "text-[13px] px-4 py-2.5" };
  return (
    <button onClick={onClick} className={`smallcaps inline-flex items-center gap-1.5 rounded transition-colors ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon}
      {children}
    </button>
  );
}

function MiniSpark({ values, color = "#2A1810", h = 28, w = 80 }) {
  if (!values || values.length === 0) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={h - ((values[values.length-1] - min) / range) * h} r="2.5" fill={color} />
    </svg>
  );
}

function Icon({ name, size = 16, className = "" }) {
  const s = size;
  const stroke = "currentColor";
  const sw = 1.6;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", className };
  switch (name) {
    case "brief":   return <svg {...common}><path d="M4 4h12l4 4v12H4z"/><path d="M16 4v4h4"/><path d="M8 13h8M8 17h6"/></svg>;
    case "radar":   return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={stroke}/><path d="M12 3v9l6 4"/></svg>;
    case "map":     return <svg {...common}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>;
    case "sim":     return <svg {...common}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>;
    case "content": return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9h18M8 5v14"/></svg>;
    case "memory":  return <svg {...common}><path d="M6 4h12v16l-6-3-6 3z"/><path d="M9 8h6M9 12h4"/></svg>;
    case "legacy":  return <svg {...common}><path d="M6 21V9l6-5 6 5v12"/><path d="M10 21v-6h4v6"/><path d="M9 9h6"/></svg>;
    case "feels":   return <svg {...common}><path d="M21 12c0 4.5-4 8-9 8a10 10 0 0 1-3.5-.6L3 21l1.6-4.5A8.4 8.4 0 0 1 3 12c0-4.5 4-8 9-8s9 3.5 9 8z"/><circle cx="9" cy="12" r="1" fill={stroke}/><circle cx="15" cy="12" r="1" fill={stroke}/></svg>;
    case "rival":   return <svg {...common}><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5"/><path d="M11 20c0-3 2.5-5 5-5s5 2 5 5"/></svg>;
    case "plus":    return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "bell":    return <svg {...common}><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg>;
    case "search":  return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>;
    case "ext":     return <svg {...common}><path d="M14 4h6v6"/><path d="M20 4L10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>;
    case "arrow":   return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "close":   return <svg {...common}><path d="M5 5l14 14M19 5L5 19"/></svg>;
    case "clock":   return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "check":   return <svg {...common}><path d="M5 12l4 4 10-10"/></svg>;
    case "regen":   return <svg {...common}><path d="M3 12a9 9 0 0 1 15-6.7L21 7"/><path d="M21 3v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 17"/><path d="M3 21v-4h4"/></svg>;
    case "trash":   return <svg {...common}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>;
    case "save":    return <svg {...common}><path d="M5 4h12l3 3v13H5z"/><path d="M8 4v5h8V4"/></svg>;
    case "menu":    return <svg {...common}><circle cx="5" cy="12" r="1.4" fill={stroke}/><circle cx="12" cy="12" r="1.4" fill={stroke}/><circle cx="19" cy="12" r="1.4" fill={stroke}/></svg>;
    case "shield":  return <svg {...common}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>;
    case "money":   return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="1.5"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case "heart":   return <svg {...common}><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>;
    case "book":    return <svg {...common}><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M8 8h8M8 12h6"/></svg>;
    case "build":   return <svg {...common}><path d="M3 21h18"/><path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-6h6v6"/></svg>;
    default: return <span/>;
  }
}

// Sentiment color from 0-100
function sentimentColor(s) {
  if (s >= 70) return "#2D5A27";
  if (s >= 55) return "#6B9E5E";
  if (s >= 45) return "#D4A847";
  if (s >= 35) return "#C4693A";
  return "#8B1A2E";
}

function Drawer({ open, onClose, children, width = 480 }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/20 backdrop-blur-[1px]" />
      <aside
        onClick={(e) => e.stopPropagation()}
        style={{ width }}
        className="absolute top-0 right-0 h-full bg-cream-50 border-l border-cream-200 shadow-pop slide-in overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-navy">
          <Icon name="close" size={16}/>
        </button>
        {children}
      </aside>
    </div>
  );
}

function Modal({ open, onClose, children, width = 920 }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/25 backdrop-blur-[2px]" />
      <div onClick={(e) => e.stopPropagation()} style={{ width, maxHeight: '88vh' }} className="relative bg-cream-50 border border-cream-200 rounded-lg shadow-pop overflow-hidden flex flex-col fade-up">
        {children}
      </div>
    </div>
  );
}

// Simple toggle checkbox
function Check({ on, onClick }) {
  return (
    <span onClick={onClick} className={`chk ${on ? "on" : ""}`}/>
  );
}

Object.assign(window, { Badge, PlatformBadge, Panel, Card, Button, MiniSpark, Icon, sentimentColor, Drawer, Modal, Check });
