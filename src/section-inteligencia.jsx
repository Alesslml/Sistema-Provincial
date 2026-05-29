// ===== SECTION 8: INTELIGENCIA COMPETITIVA =====
const { useState: rivUseState } = React;

function InteligenciaSection() {
  const [selected, setSelected] = rivUseState("APP");
  const rivals = window.DATA.rivals;
  const timeline = window.DATA.rivalTimeline;
  const prof = window.DATA.rivalProfileRLA;
  const matrix = window.DATA.matrix;

  return (
    <div className="p-6 space-y-5 fade-up">
      <div>
        <h1 className="serif text-[28px] text-navy leading-tight">Inteligencia competitiva</h1>
        <p className="text-[13px] text-navy-300 mt-1">Mapa del ecosistema rival, perfiles tácticos y matriz comparativa</p>
      </div>

      {/* Rival grid */}
      <div className="grid grid-cols-4 gap-4">
        {rivals.map(r => (
          <RivalCard key={r.id} rival={r} selected={selected === r.id} onSelect={() => setSelected(r.id)}/>
        ))}
      </div>

      {/* Timeline + profile */}
      <div className="grid grid-cols-[1fr_540px] gap-5">
        <Panel title="Actividad rival reciente" subtitle="Últimas 48 horas — clasificado por tipo de mensaje">
          <div className="relative pl-7">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-cream-300"/>
            <ul className="space-y-4">
              {timeline.map((t, i) => {
                const r = rivals.find(x => x.id === t.rival);
                return (
                  <li key={i} className="relative">
                    <div className="absolute -left-7 top-2 w-6 h-6 rounded-full bg-cream-50 border-2 border-cream-300 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-navy">{r.initials}</span>
                    </div>
                    <Card className="p-3.5">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-navy">{r.name}</span>
                          <PlatformBadge p={t.plat}/>
                          <span className="text-[11px] text-navy-300">{t.fmt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge kind={t.tag}/>
                          <span className="text-[10px] text-navy-300 num">{t.time}</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-navy leading-relaxed mb-2">"{t.caption}"</p>
                      <div className="text-[11px] text-navy-300 num">{t.eng}</div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        </Panel>

        <RivalProfile rival={rivals.find(r => r.id === selected) || rivals[0]} prof={prof}/>
      </div>

      {/* Matrix */}
      <Panel title="Matriz comparativa" subtitle="Nuestra posición vs los principales rivales — semana en curso">
        <table className="w-full text-[13px]">
          <thead className="text-navy-300">
            <tr className="border-b-2 border-cream-300">
              <th className="text-left py-2.5 smallcaps">Métrica</th>
              {matrix.cols.map((c, i) => (
                <th key={c} className={`text-center py-2.5 smallcaps px-2 ${i === 0 ? "text-navy bg-cream-100" : ""}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {matrix.rows.map((row, ri) => (
              <tr key={ri}>
                <td className="py-3 text-navy font-medium">{row.label}</td>
                {row.values.map((v, vi) => (
                  <td key={vi} className={`text-center py-3 num px-2 ${vi === 0 ? "bg-cream-100 font-semibold" : ""} ${row.best === vi ? "text-forest font-semibold" : "text-navy"}`}>
                    {v}
                    {row.best === vi && <span className="ml-1 text-[9px]">●</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 p-4 bg-amber2-50 border border-amber2-100 rounded">
          <div className="smallcaps text-amber2 mb-2">Brechas detectadas — acción recomendada</div>
          <ul className="space-y-1.5 text-[12.5px] text-navy">
            {matrix.gaps.map((g, i) => <li key={i} className="flex gap-2"><Icon name="arrow" size={12} className="mt-1 text-amber2"/>{g}</li>)}
          </ul>
        </div>
      </Panel>
    </div>
  );
}

function RivalCard({ rival, selected, onSelect }) {
  const threatColors = {
    HIGH:   "border-l-wine",
    MEDIUM: "border-l-amber2",
    LOW:    "border-l-cream-300",
  };
  return (
    <Card
      onClick={onSelect}
      className={`p-4 border-l-4 ${threatColors[rival.threat]} ${selected ? "ring-2 ring-brand/30" : ""}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-brand-300 text-navy flex items-center justify-center shrink-0">
          <span className="text-[12px] font-semibold">{rival.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="serif text-[16px] text-navy leading-tight">{rival.name}</h3>
          <div className="text-[11px] text-navy-300">{rival.party}</div>
        </div>
        <Badge kind={rival.threat}/>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <div className="smallcaps text-navy-300 mb-0.5">Actividad</div>
          <Badge kind={rival.activity}/>
        </div>
        <div className="text-right">
          <div className="smallcaps text-navy-300 mb-0.5">Engagement</div>
          <div className="num text-navy">{rival.eng}</div>
        </div>
        <div>
          <div className="smallcaps text-navy-300 mb-0.5">Tema</div>
          <div className="text-navy">{rival.topic}</div>
        </div>
        <div className="text-right">
          <div className="smallcaps text-navy-300 mb-0.5">Última pub.</div>
          <div className="text-navy num">{rival.lastPost}</div>
        </div>
      </div>
    </Card>
  );
}

function RivalProfile({ rival, prof }) {
  if (!rival) return null;
  return (
    <Panel title={`Perfil táctico — ${rival.name}`} subtitle={`${rival.party} · análisis de últimos 30 días`}>
      {/* Posts grid */}
      <div className="mb-4">
        <div className="smallcaps text-navy-300 mb-2">Últimas piezas — engagement</div>
        <div className="grid grid-cols-5 gap-1.5">
          {prof.posts.slice(0, 10).map((p, i) => {
            const eng = parseFloat(p.eng);
            const intensity = Math.min(1, eng / 50);
            return (
              <div
                key={i}
                className="aspect-square rounded p-1.5 flex flex-col justify-between border border-cream-300"
                style={{ background: `rgba(139, 26, 46, ${0.08 + intensity * 0.35})` }}
                title={p.desc}
              >
                <div className="text-[8px] text-navy-300 num">{p.fmt}</div>
                <div className="text-[8.5px] text-navy font-medium leading-tight line-clamp-2">{p.topic}</div>
                <div className="text-[8px] text-wine num font-semibold">{p.eng.split(" ·")[0]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic distribution */}
      <div className="mb-4">
        <div className="smallcaps text-navy-300 mb-2">Distribución temática</div>
        <div className="space-y-1.5">
          {Object.entries(prof.topics).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <span className="text-[11px] text-navy w-20 shrink-0">{k}</span>
              <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand" style={{ width: `${v * 3}%` }}/>
              </div>
              <span className="text-[10px] text-navy-300 w-8 text-right num">{v}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="mb-4">
        <div className="smallcaps text-navy-300 mb-2">Cuándo publica — patrón horario</div>
        <Heatmap data={prof.heatmap}/>
      </div>

      {/* Vulnerabilities + opportunities */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-3 bg-wine-50 border border-wine-100 rounded">
          <div className="smallcaps text-wine mb-1.5">Vulnerabilidades</div>
          <ul className="space-y-1 text-[11.5px] text-navy">
            {prof.vulnerabilities.map((v, i) => <li key={i} className="flex gap-1.5"><span className="text-wine">→</span>{v}</li>)}
          </ul>
        </div>
        <div className="p-3 bg-forest-50 border border-forest-100 rounded">
          <div className="smallcaps text-forest mb-1.5">Oportunidades</div>
          <ul className="space-y-1 text-[11.5px] text-navy">
            {prof.opportunities.map((v, i) => <li key={i} className="flex gap-1.5"><span className="text-forest">→</span>{v}</li>)}
          </ul>
        </div>
      </div>

      <div className="text-[11px] text-navy-300"><span className="smallcaps">Audiencia · </span>{prof.audience}</div>
    </Panel>
  );
}

function Heatmap({ data }) {
  const days = ["L","M","X","J","V","S","D"];
  return (
    <div>
      <div className="grid grid-cols-[20px_1fr] gap-1">
        <div/>
        <div className="grid grid-cols-24 gap-px text-[8px] text-navy-300 num" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
          {[0,4,8,12,16,20].map(h => (
            <div key={h} style={{ gridColumn: `${h+1} / span 4` }}>{String(h).padStart(2,'0')}</div>
          ))}
        </div>
      </div>
      <div className="space-y-px mt-1">
        {data.map((row, di) => (
          <div key={di} className="grid grid-cols-[20px_1fr] gap-1 items-center">
            <div className="text-[10px] text-navy-300 num">{days[di]}</div>
            <div className="grid grid-cols-24 gap-px" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {row.map((v, hi) => (
                <div
                  key={hi}
                  className="aspect-square rounded-sm"
                  style={{ background: `rgba(27, 42, 74, ${0.08 + v * 0.6})` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.InteligenciaSection = InteligenciaSection;
