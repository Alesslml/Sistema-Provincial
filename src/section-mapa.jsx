// ===== SECTION 3: MAPA DISTRITAL — PROVINCIA DE ICA =====
const { useState: mUseState } = React;

function distColor(s) {
  if (s >= 65) return "#2D5A27";
  if (s >= 55) return "#4E7B45";
  if (s >= 48) return "#C48414";
  if (s >= 40) return "#A93346";
  return "#8B1A2E";
}

function MapaSection() {
  const [selected, setSelected] = mUseState("ICA");
  const [zoneView, setZoneView] = mUseState(null);
  const districts = window.DATA.districts;

  const zones = {
    URBANO:    ["ICA", "PAR", "SUB", "SJB", "LAT"],
    PERIURBANO: ["TAT", "PNU", "STG", "SAL", "LAQ"],
    ANDINO:    ["SJM", "PAC", "YAU"],
  };

  const selDist = districts.find(d => d.id === selected);
  const detail = window.DATA.districtDetail[selected] || window.DATA.districtDetailDefault;
  if (selDist) detail.score = selDist.s;

  function inView(id) {
    if (!zoneView) return true;
    return zones[zoneView]?.includes(id);
  }

  return (
    <div className="p-6 grid grid-cols-[1fr_420px] gap-6 fade-up">
      {/* Mapa SVG */}
      <Panel
        title="Sentimiento por distrito"
        subtitle="13 distritos de la Provincia de Ica · datos actualizados"
        right={<Legend/>}
      >
        <div className="bg-cream-100 rounded border border-cream-300 relative overflow-hidden" style={{ height: 620 }}>
          {/* Zona toggle */}
          <div className="absolute top-4 left-4 z-10 flex gap-1 bg-cream-50 p-1 rounded border border-cream-300 shadow-card">
            {[
              { k: null,       l: "Toda la Provincia" },
              { k: "URBANO",    l: "Urbano" },
              { k: "PERIURBANO",l: "Periurbano" },
              { k: "ANDINO",    l: "Andino" },
            ].map(g => (
              <button
                key={g.l}
                onClick={() => setZoneView(g.k)}
                className={`smallcaps px-2.5 py-1.5 rounded transition-colors ${zoneView === g.k ? "bg-brand-300 text-navy" : "text-navy-300 hover:bg-cream-100"}`}
              >{g.l}</button>
            ))}
          </div>

          {/* Leyenda capa */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-cream-50 p-2 rounded border border-cream-300 shadow-card min-w-[140px]">
            <div className="smallcaps text-navy-300">Capa</div>
            <button className="text-[11px] text-navy px-2 py-1 rounded bg-cream-200 text-left">Sentimiento</button>
            <button className="text-[11px] text-navy-300 px-2 py-1 rounded hover:bg-cream-100 text-left">Actividad rival</button>
            <button className="text-[11px] text-navy-300 px-2 py-1 rounded hover:bg-cream-100 text-left">Cobertura propia</button>
          </div>

          {/* Nota de ayuda */}
          <div className="absolute bottom-4 left-4 z-10 px-3 py-2 bg-cream-50 border border-cream-300 rounded shadow-card text-[11px] text-navy-300 max-w-[220px]">
            Haz clic en cualquier distrito para ver el detalle. Color = sentimiento ciudadano hoy.
            <div className="mt-1 text-[10px] text-navy-200">Mapa esquemático · Oeste = Costa · Este = Andes</div>
          </div>

          {/* Stats rápidos */}
          <div className="absolute bottom-4 right-4 z-10 bg-cream-50 border border-cream-300 rounded shadow-card px-3 py-2 grid grid-cols-3 gap-3">
            <DStat n={districts.length}                         l="distritos"/>
            <DStat n={districts.filter(d => d.s >= 55).length} l="positivos" color="#2D5A27"/>
            <DStat n={districts.filter(d => d.s < 46).length}  l="críticos"  color="#8B1A2E"/>
          </div>

          {/* SVG del mapa */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 380 420"
              style={{ width: "100%", height: "100%", maxWidth: 480 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {districts.map(d => {
                const active = d.id === selected;
                const visible = inView(d.id);
                const fill = distColor(d.s);
                return (
                  <g key={d.id} onClick={() => setSelected(d.id)} style={{ cursor: "pointer" }}>
                    <path
                      d={d.path}
                      fill={fill}
                      fillOpacity={visible ? (active ? 1 : 0.78) : 0.15}
                      stroke={active ? "#2A1810" : "#FDFBF7"}
                      strokeWidth={active ? 2.5 : 1}
                      style={{ transition: "fill-opacity 0.2s, stroke-width 0.15s" }}
                    />
                    {visible && (
                      <text
                        x={d.cx}
                        y={d.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={d.name.length > 10 ? 8 : 9}
                        fontFamily="'DM Sans', system-ui, sans-serif"
                        fontWeight={active ? "700" : "500"}
                        fill={d.s >= 48 ? "#FDFBF7" : "#FDFBF7"}
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      >
                        {d.name.length > 14 ? d.name.split(" ").map((w, i) => (
                          <tspan key={i} x={d.cx} dy={i === 0 ? -5 : 11}>{w}</tspan>
                        )) : d.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Narrativa de zona */}
        {zoneView && window.DATA.zoneNarratives && window.DATA.zoneNarratives[zoneView] && (
          <div className="mt-4 p-4 bg-cream-100 border border-cream-300 rounded">
            <div className="smallcaps text-navy-300 mb-2">
              Narrativa recomendada — Zona {zoneView}
              <span className="text-navy-200 ml-2 normal-case tracking-normal">· {zones[zoneView].length} distritos</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[11px] text-navy-300 mb-0.5">Tema</div>
                <div className="text-[13px] text-navy leading-snug">{window.DATA.zoneNarratives[zoneView].theme}</div>
              </div>
              <div>
                <div className="text-[11px] text-navy-300 mb-0.5">Ángulo</div>
                <div className="text-[13px] text-navy leading-snug">{window.DATA.zoneNarratives[zoneView].angle}</div>
              </div>
              <div>
                <div className="text-[11px] text-navy-300 mb-0.5">Evitar</div>
                <div className="text-[13px] text-wine-300 leading-snug">{window.DATA.zoneNarratives[zoneView].avoid}</div>
              </div>
            </div>
          </div>
        )}
      </Panel>

      {/* Detalle del distrito */}
      <DistrictDetail dist={selDist} detail={detail}/>
    </div>
  );
}

function DStat({ n, l, color }) {
  return (
    <div className="text-center">
      <div className="num text-[14px] font-semibold" style={{ color: color || "#2A1810" }}>{n}</div>
      <div className="text-[9px] text-navy-300 uppercase tracking-wide leading-tight">{l}</div>
    </div>
  );
}

function Legend() {
  const stops = [
    { s: 35, l: "Crítico" },
    { s: 45, l: "Bajo" },
    { s: 52, l: "Neutro" },
    { s: 60, l: "Positivo" },
    { s: 75, l: "Fuerte" },
  ];
  return (
    <div className="flex items-center gap-2">
      <span className="smallcaps text-navy-300 mr-1">Sentimiento</span>
      {stops.map(s => (
        <div key={s.l} className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ background: distColor(s.s) }}/>
          <span className="text-[10px] text-navy-300">{s.l}</span>
        </div>
      ))}
    </div>
  );
}

function DistrictDetail({ dist, detail }) {
  if (!dist) return null;
  return (
    <div className="space-y-4 fade-up d1">
      <div className="bg-cream-50 border border-cream-300 rounded-lg shadow-panel overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-cream-300">
          <div className="flex items-end justify-between">
            <div>
              <div className="smallcaps text-navy-300 mb-1">Distrito seleccionado · Provincia de Ica</div>
              <h2 className="serif text-[28px] text-navy leading-tight">{dist.name}</h2>
            </div>
            <div className="text-right">
              <div className="smallcaps text-navy-300">Sentimiento</div>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="num text-[34px] font-semibold" style={{ color: distColor(dist.s) }}>{dist.s}</span>
                <span className="text-navy-200">/100</span>
              </div>
              <div className="text-[12px] text-forest">{detail.trend}</div>
            </div>
          </div>
          <div className="mt-3">
            <MiniSpark values={detail.history} w={360} h={36} color={distColor(dist.s)}/>
            <div className="flex justify-between text-[10px] text-navy-300 mt-0.5 num">
              <span>4 sem atrás</span><span>3 sem</span><span>2 sem</span><span>1 sem</span><span>Hoy</span>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <DBlock label="Preocupaciones principales">
            <ul className="space-y-1.5">
              {detail.concerns.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-navy">
                  <span className="num text-[10px] text-navy-200 mt-1">0{i+1}</span> {c}
                </li>
              ))}
            </ul>
          </DBlock>
          <DBlock label="Narrativa dominante">
            <p className="text-[13px] text-navy italic leading-relaxed">"{detail.narrative}"</p>
          </DBlock>
          {detail.activeSignals && detail.activeSignals.length > 0 && (
            <DBlock label="Señales activas en este distrito">
              <div className="flex gap-1.5 flex-wrap">
                {detail.activeSignals.map(sid => (
                  <span key={sid} className="text-[11px] px-2 py-0.5 bg-wine-50 border border-wine-200 rounded text-wine-300 num">{sid} — ACTIVA</span>
                ))}
              </div>
            </DBlock>
          )}
          <DBlock label="Actividad rival">
            <p className="text-[13px] text-navy">{detail.rivals}</p>
          </DBlock>
          <DBlock label="Recomendación de contenido">
            <p className="text-[13px] text-navy leading-relaxed">{detail.content}</p>
          </DBlock>
          <DBlock label="Próximos eventos cívicos">
            <div className="flex flex-wrap gap-1.5">
              {detail.events.map((e, i) => (
                <span key={i} className="text-[11px] px-2 py-1 bg-cream-100 border border-cream-300 rounded text-navy num">{e}</span>
              ))}
            </div>
          </DBlock>
          <div className="pt-3 border-t border-cream-200 flex gap-2">
            <Button variant="primary" size="md" className="flex-1 justify-center">Crear contenido distrital</Button>
            <Button variant="ghost" size="md">Ver historial</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DBlock({ label, children }) {
  return (
    <div>
      <div className="smallcaps text-navy-300 mb-1.5">{label}</div>
      {children}
    </div>
  );
}

window.MapaSection = MapaSection;
