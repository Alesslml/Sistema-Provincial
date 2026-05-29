// ===== LAYOUT: TopBar, Sidebar, Ticker, FloatingButton =====
const { useState: lUseState, useEffect: lUseEffect } = React;

function TopBar({ section, alertsActive, pending }) {
  const [now, setNow] = lUseState(new Date());
  lUseEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const lima = new Date(now.getTime() + (now.getTimezoneOffset() - 300) * 60000);
  const hh = String(lima.getHours()).padStart(2, "0");
  const mm = String(lima.getMinutes()).padStart(2, "0");
  const ss = String(lima.getSeconds()).padStart(2, "0");
  const dateStr = lima.toLocaleDateString("es-PE", { weekday: "short", day: "numeric", month: "short" });

  return (
    <header className="sticky top-0 z-30 bg-cream-50/98 backdrop-blur border-b-[3px] border-brand-300">
      <div className="px-6 h-[64px] flex items-center justify-between">

        {/* Marca / identidad */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-forest-400 rounded flex items-center justify-center shrink-0" style={{padding:'3px'}}>
            <div className="w-full h-full bg-brand-300 rounded-sm flex items-center justify-center">
              <div className="w-[14px] h-[14px] bg-forest-400 rounded-sm"/>
            </div>
          </div>
          <div className="leading-none">
            <div className="text-[18px] font-bold tracking-[0.18em] text-navy uppercase">ARCA</div>
            <div className="text-[9px] tracking-[0.22em] text-navy-300 uppercase">Sistema de Inteligencia · Ica 2026</div>
          </div>
        </div>

        {/* Sección activa — centro */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-cream-100 border border-cream-200 rounded-full">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400 shrink-0"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          <span className="text-[13px] font-semibold text-navy tracking-tight">{section}</span>
        </div>

        {/* Indicadores de estado */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cream-100 border border-cream-200 rounded">
            <div className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse"/>
            <span className="num text-[13px] text-navy">{hh}:{mm}<span className="text-navy-200">:{ss}</span></span>
            <span className="text-[10px] text-navy-300 hidden xl:inline">{dateStr}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 border border-forest-100 rounded">
            <span className="text-forest-400 font-black text-[13px] leading-none">↑</span>
            <span className="num text-[15px] font-bold text-navy">67</span>
            <span className="smallcaps text-navy-200 text-[9px]">momentum</span>
          </div>

          {alertsActive > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-wine rounded text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>
              <span className="smallcaps text-[10px]">{alertsActive} alertas</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-300 rounded text-navy">
            <span className="num text-[15px] font-bold">{pending}</span>
            <span className="smallcaps text-[9px] text-navy-300">pendientes</span>
          </div>

          <div className="ml-1 w-9 h-9 rounded-full bg-forest-400 border-[2.5px] border-brand-300 flex items-center justify-center shrink-0">
            <span className="text-[12px] text-white font-bold">IC</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ section, setSection }) {
  const items = [
    { key: "brief",       label: "Informe del día",          icon: "brief" },
    { key: "radar",       label: "Radar de reputación",      icon: "radar" },
    { key: "mapa",        label: "Mapa distrital",           icon: "map" },
    { key: "sim",         label: "Simulador de narrativa",   icon: "sim" },
    { key: "contenido",   label: "Sala de contenido",        icon: "content" },
    { key: "memoria",     label: "Memoria estratégica",      icon: "memory" },
    { key: "territorio",  label: "Territorio distrital",     icon: "legacy" },
    { key: "sentimiento", label: "Tendencias en Ica",         icon: "feels" },
    { key: "rivales",     label: "Inteligencia competitiva", icon: "rival" },
  ];
  return (
    <nav className="w-[232px] shrink-0 sticky top-[64px] bg-cream-50 border-r border-cream-200 py-4" style={{ height: "calc(100vh - 64px - 36px)" }}>
      <div className="px-4 mb-3 flex items-center gap-2">
        <div className="w-4 h-[2px] bg-brand-400 rounded-full"/>
        <span className="smallcaps text-navy-300">Navegación</span>
      </div>
      <ul className="flex flex-col gap-0.5 px-2">
        {items.map((it) => {
          const active = section === it.key;
          return (
            <li key={it.key}>
              <button
                onClick={() => setSection(it.key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors relative ${
                  active ? "bg-brand-50 text-navy" : "text-navy-300 hover:bg-cream-100 hover:text-navy"
                }`}
              >
                {active && <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r bg-brand-400"/>}
                <Icon name={it.icon} size={17} className={active ? "text-forest-400" : ""}/>
                <span className="text-[13px] font-medium">{it.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="absolute bottom-4 left-4 right-4 p-3 bg-cream-100 border border-cream-200 rounded">
        <div className="smallcaps text-navy-300 mb-1.5">Equipo activo</div>
        <div className="flex -space-x-1.5">
          {[
            { i: "LC", b: "bg-forest-400 text-white" },
            { i: "RM", b: "bg-wine text-white" },
            { i: "JT", b: "bg-navy text-cream-50" },
            { i: "AV", b: "bg-brand text-navy" },
          ].map(({i,b}) => (
            <div key={i} className={`w-7 h-7 rounded-full border-2 border-cream-100 flex items-center justify-center ${b}`}>
              <span className="text-[10px] font-semibold">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Ticker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-[36px] bg-navy-500 text-cream-50 border-t border-navy-600 overflow-hidden flex items-center">
      <div className="shrink-0 px-4 h-full flex items-center bg-navy-600 border-r border-navy-500">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-300 mr-2 animate-pulse"/>
        <span className="smallcaps text-brand-200">En vivo</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => (
            <span key={i} className="px-6 text-[12px] inline-flex items-center gap-2 text-cream-100">
              <span className="w-1 h-1 rounded-full bg-forest-200/60"/>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[52px] right-6 z-30 group flex items-center gap-2 pl-3 pr-4 py-3 bg-forest-400 text-white rounded-full shadow-pop hover:bg-forest-500 transition-colors"
    >
      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
        <Icon name="plus" size={18}/>
      </span>
      <span className="smallcaps">Taller de narrativa</span>
    </button>
  );
}

Object.assign(window, { TopBar, Sidebar, Ticker, FloatingButton });
