// ===== SECTION 1: INFORME DEL DÍA =====

function BriefSection({ openSignal, goRadar }) {
  const b = window.DATA.brief;
  return (
    <div className="p-6 space-y-6">
      {/* Hero priority */}
      <div className="fade-up bg-brand-700 text-cream-50 rounded-lg shadow-pop overflow-hidden">
        <div className="px-7 pt-6 pb-7 relative">
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-wine-200 animate-pulse"/>
            <span className="smallcaps text-cream-100">Prioridad del día</span>
          </div>
          <div className="smallcaps text-cream-100/80 mb-2">{b.date}</div>
          <h1 className="serif text-[42px] leading-[1.08] tracking-tight max-w-[820px] mb-5">
            {b.priority.title}
          </h1>
          <p className="text-[14px] leading-relaxed text-cream-100/85 max-w-[760px] mb-5">
            <span className="smallcaps text-cream-100/60 mr-2">Por qué importa →</span>
            {b.priority.reasoning}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="wine" size="lg" icon={<Icon name="arrow" size={15}/>} onClick={() => goRadar()}>Ver señal en el radar</Button>
            <Button variant="secondary" size="lg" className="!bg-cream-50/10 !text-cream-50 !border-cream-50/20 hover:!bg-cream-50/15">Generar respuesta</Button>
            <Button variant="ghost" size="lg" className="!text-cream-100/80 hover:!bg-cream-50/10">Asignar al equipo</Button>
          </div>
        </div>
        {/* Metric strip */}
        <div className="grid grid-cols-6 border-t border-brand-600">
          {b.metrics.map((m, i) => (
            <div key={i} className={`px-5 py-3 ${i < 5 ? "border-r border-brand-600" : ""}`}>
              <div className="smallcaps text-cream-100/60 mb-1">{m.label}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="num text-[24px] font-semibold">{m.value}</span>
                <span className="text-[12px] text-cream-100/60">{m.suffix}</span>
                <span className={`ml-1 text-[12px] ${m.tone === "good" ? "text-forest-100" : m.tone === "warn" ? "text-amber2-100" : "text-cream-100/60"}`}>{m.trend}</span>
              </div>
              <div className="text-[10px] text-cream-100/55 mt-0.5">{m.trendNote}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns: Riesgos / Oportunidades */}
      <div className="grid grid-cols-2 gap-5">
        <Panel
          title="Riesgos detectados"
          subtitle="Señales que requieren atención hoy"
          right={<Badge kind="CRÍTICO">3 activos</Badge>}
          className="fade-up d1"
        >
          <div className="space-y-3">
            {b.risks.map((r, i) => (
              <Card key={i} className="p-4" onClick={() => openSignal("s" + (i+1))}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="serif text-[17px] text-navy leading-snug pr-2">{r.title}</h3>
                  <Badge kind={r.severity}/>
                </div>
                <p className="text-[13px] text-navy-300 leading-relaxed mb-3">{r.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                  <div className="flex items-center gap-1.5">
                    <PlatformBadge p={r.platform}/>
                    <span className="text-[11px] text-navy-300 num">{r.reach}</span>
                  </div>
                  <span className="text-[11px] text-navy-300 inline-flex items-center gap-1">Ver detalles <Icon name="arrow" size={11}/></span>
                </div>
              </Card>
            ))}
          </div>
        </Panel>

        <Panel
          title="Oportunidades disponibles"
          subtitle="Espacios para tomar la iniciativa"
          right={<Badge kind="OPORTUNIDAD">4 abiertas</Badge>}
          className="fade-up d2"
        >
          <div className="space-y-3">
            {b.opportunities.map((o, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="serif text-[17px] text-navy leading-snug pr-2">{o.title}</h3>
                  <Badge kind={o.type}/>
                </div>
                <p className="text-[13px] text-navy-300 leading-relaxed mb-3">{o.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                  <span className="text-[11px] text-forest font-medium inline-flex items-center gap-1.5">
                    <Icon name="arrow" size={11}/> {o.action}
                  </span>
                  <Button size="sm" variant="ghost">Activar</Button>
                </div>
              </Card>
            ))}
          </div>
        </Panel>
      </div>

      {/* Action list */}
      <Panel
        title="Hoja de ruta — hoy"
        subtitle="6 acciones priorizadas por impacto y ventana de tiempo"
        right={<Button size="sm" variant="ghost" icon={<Icon name="check" size={13}/>}>Marcar todo</Button>}
        className="fade-up d3"
        noPad
      >
        <div className="divide-y divide-cream-200">
          {b.actions.map((a, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-cream-100 transition-colors">
              <Check on={i === 0}/>
              <div className="w-6 text-center num text-[11px] text-navy-200">{String(i+1).padStart(2,"0")}</div>
              <div className="flex-1">
                <div className={`text-[13.5px] text-navy ${i===0 ? "line-through opacity-60" : ""}`}>{a.txt}</div>
              </div>
              <Badge kind={a.impact}>{a.impact}</Badge>
              <div className="num text-[12px] text-navy-300 w-[120px] text-right inline-flex items-center gap-1.5 justify-end">
                <Icon name="clock" size={12}/> {a.deadline}
              </div>
              <button className="text-navy-300 hover:text-navy"><Icon name="menu" size={16}/></button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

window.BriefSection = BriefSection;
