// ===== SECTION 2: RADAR DE REPUTACIÓN =====
const { useState: rUseState, useMemo: rUseMemo } = React;

function RadarSection({ openSignal, initialSignalId }) {
  const [filter, setFilter] = rUseState("ALL");
  const [search, setSearch] = rUseState("");
  const signals = window.DATA.signals;

  const filtered = rUseMemo(() => {
    return signals.filter(s => {
      if (filter === "ALL") return true;
      if (filter === "ALERTAS") return s.severity === "CRÍTICO" || s.severity === "MODERADO";
      if (filter === "OPORTUNIDADES") return s.severity === "OPORTUNIDAD";
      return true;
    }).filter(s => !search || s.title.toLowerCase().includes(search.toLowerCase()));
  }, [filter, search]);

  React.useEffect(() => {
    if (initialSignalId) openSignal(initialSignalId);
  }, [initialSignalId]);

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="fade-up flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          {[
            { k: "ALL", l: "Todas las señales", n: signals.length },
            { k: "ALERTAS", l: "Alertas", n: signals.filter(s => s.severity === "CRÍTICO" || s.severity === "MODERADO").length },
            { k: "OPORTUNIDADES", l: "Oportunidades", n: signals.filter(s => s.severity === "OPORTUNIDAD").length },
          ].map(t => (
            <button
              key={t.k}
              onClick={() => setFilter(t.k)}
              className={`smallcaps inline-flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                filter === t.k ? "bg-brand-300 text-navy" : "bg-cream-100 text-navy-300 hover:bg-cream-200"
              }`}
            >
              {t.l}
              <span className={`num text-[10px] px-1.5 rounded ${filter === t.k ? "bg-cream-50/15" : "bg-cream-50"}`}>{t.n}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-navy-300"/>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar señales..."
              className="pl-8 pr-3 py-2 text-[13px] bg-cream-50 border border-cream-300 rounded w-[240px] focus:outline-none focus:border-brand-200"
            />
          </div>
          <Button variant="ghost" size="md">Última actualización: hace 4 min</Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-5">
        {filtered.map((s, i) => (
          <SignalCard key={s.id} signal={s} onOpen={() => openSignal(s.id)} delay={i}/>
        ))}
      </div>
    </div>
  );
}

function SignalCard({ signal, onOpen, delay }) {
  const sev = signal.severity;
  const accent = sev === "CRÍTICO" ? "bg-wine" : sev === "MODERADO" ? "bg-amber2" : "bg-forest";
  return (
    <Card className={`fade-up d${Math.min(delay+1, 4)} p-0 overflow-hidden hover:translate-y-[-2px] hover:shadow-pop transition-all`}>
      <div className={`h-1 ${accent}`}/>
      <div className="p-5 cursor-pointer" onClick={onOpen}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="serif text-[19px] text-navy leading-snug">{signal.title}</h3>
          <Badge kind={sev}/>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {signal.platforms.map(p => <PlatformBadge key={p} p={p}/>)}
          <span className="text-[11px] text-navy-300">·</span>
          <span className="text-[11px] text-navy-300 num">{signal.time}</span>
          <span className="text-[11px] text-navy-300">·</span>
          <Badge kind={signal.velocity}/>
        </div>

        <p className="text-[13px] text-navy-300 leading-relaxed mb-4 line-clamp-3">{signal.summary}</p>

        <div className="grid grid-cols-2 gap-3 text-[11px] mb-4">
          <div>
            <div className="smallcaps text-navy-300 mb-0.5">Alcance</div>
            <div className="num text-[13px] text-navy">{signal.reach.split(" · ")[0].replace("≈ ", "")}</div>
          </div>
          <div>
            <div className="smallcaps text-navy-300 mb-0.5">Audiencia</div>
            <div className="text-[12px] text-navy line-clamp-1">{signal.audience.split(" · ")[0]}</div>
          </div>
        </div>

        <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
          <span className="text-[11px] text-navy-300">
            {signal.links.length > 0 && <>Vinculada a {signal.links.length} otra · </>}
            <span className="num">{signal.sources.length} fuentes</span>
          </span>
          <span className="text-[12px] text-navy font-medium inline-flex items-center gap-1">Investigar <Icon name="arrow" size={12}/></span>
        </div>
      </div>
    </Card>
  );
}

function SignalDrawer({ signal, onClose, openSignal }) {
  if (!signal) return null;
  const sev = signal.severity;
  return (
    <Drawer open={!!signal} onClose={onClose} width={520}>
      <div className="p-6">
        <Badge kind={sev}/>
        <h2 className="serif text-[26px] leading-tight text-navy mt-3 mb-2 pr-8">{signal.title}</h2>
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {signal.platforms.map(p => <PlatformBadge key={p} p={p}/>)}
          <span className="text-[11px] text-navy-300 num">{signal.time}</span>
          <Badge kind={signal.velocity}/>
        </div>

        <Section title="¿Qué está pasando?">{signal.summary}</Section>
        <Section title="Origen y propagación">{signal.origin}</Section>
        <Section title="Alcance">{signal.reach}</Section>
        <Section title="Audiencia">{signal.audience}</Section>

        <div className="mb-5">
          <div className="smallcaps text-navy-300 mb-2">Narrativa dominante</div>
          <blockquote className="serif text-[18px] text-navy leading-snug italic border-l-2 border-wine pl-4 py-1">
            {signal.narrative}
          </blockquote>
        </div>

        <Section title="Riesgo / impacto">{signal.risk}</Section>

        <div className="mb-5">
          <div className="smallcaps text-navy-300 mb-2">Fuentes ({signal.sources.length})</div>
          <ul className="space-y-1.5">
            {signal.sources.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px] text-navy hover:text-wine cursor-pointer">
                <Icon name="ext" size={12}/>
                <span className="num truncate">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {signal.links.length > 0 && (
          <div className="mb-5 p-3 bg-cream-100 border border-cream-300 rounded">
            <div className="smallcaps text-navy-300 mb-2">Señales vinculadas</div>
            {signal.links.map(id => {
              const s = window.DATA.signals.find(x => x.id === id);
              if (!s) return null;
              return (
                <button key={id} onClick={() => openSignal(id)} className="text-[13px] text-navy hover:text-wine text-left flex items-center gap-1.5">
                  <Icon name="arrow" size={12}/> {s.title}
                </button>
              );
            })}
          </div>
        )}

        <div className="mb-6 p-4 bg-brand-300 text-navy rounded">
          <div className="smallcaps text-cream-100/70 mb-2">Recomendación táctica</div>
          <p className="text-[13.5px] leading-relaxed">{signal.tactic}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="wine" size="lg" className="flex-1 justify-center">Crear respuesta</Button>
          <Button variant="secondary" size="lg">Asignar</Button>
          <Button variant="ghost" size="lg">Archivar</Button>
        </div>
      </div>
    </Drawer>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="smallcaps text-navy-300 mb-1.5">{title}</div>
      <p className="text-[13.5px] text-navy leading-relaxed">{children}</p>
    </div>
  );
}

Object.assign(window, { RadarSection, SignalDrawer });
