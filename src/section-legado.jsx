// ===== SECTION: TERRITORIO DISTRITAL — Provincia de Ica =====
const { useState: legUseState } = React;

const DISTRICTS_LIST = [
  { id: "ICA", name: "Ica",                     zone: "URBANO",     pop: "~80,000",  priority: "MEDIA" },
  { id: "PAR", name: "Parcona",                  zone: "URBANO",     pop: "~85,000",  priority: "ALTA" },
  { id: "LAT", name: "La Tinguiña",              zone: "URBANO",     pop: "~40,000",  priority: "ALTA" },
  { id: "SUB", name: "Subtanjalla",              zone: "URBANO",     pop: "~35,000",  priority: "MEDIA" },
  { id: "SJB", name: "San Juan Bautista",        zone: "URBANO",     pop: "~38,000",  priority: "MEDIA" },
  { id: "TAT", name: "Tate",                     zone: "PERIURBANO", pop: "~18,000",  priority: "MEDIA" },
  { id: "PNU", name: "Pueblo Nuevo",             zone: "PERIURBANO", pop: "~12,000",  priority: "BAJA" },
  { id: "STG", name: "Santiago",                 zone: "PERIURBANO", pop: "~28,000",  priority: "MEDIA" },
  { id: "SAL", name: "Salas",                    zone: "PERIURBANO", pop: "~8,000",   priority: "BAJA" },
  { id: "LAQ", name: "Los Aquijes",              zone: "PERIURBANO", pop: "~22,000",  priority: "MEDIA" },
  { id: "SJM", name: "San José de los Molinos",  zone: "ANDINO",     pop: "~6,000",   priority: "BAJA" },
  { id: "PAC", name: "Pachacútec",               zone: "ANDINO",     pop: "~5,000",   priority: "BAJA" },
  { id: "YAU", name: "Yauca del Rosario",        zone: "ANDINO",     pop: "~3,000",   priority: "BAJA" },
];

const ZONE_COLORS = {
  URBANO:     { bg: "bg-brand-50", border: "border-brand-200", text: "text-brand-500", dot: "#E2700A" },
  PERIURBANO: { bg: "bg-amber2-50", border: "border-amber2-200", text: "text-amber2", dot: "#C48414" },
  ANDINO:     { bg: "bg-forest-50", border: "border-forest-200", text: "text-forest-300", dot: "#2D5A27" },
};

const SCORE_CONCERNS_DATA = {
  agua:       { label: "Agua y saneamiento",    color: "#8B1A2E" },
  seguridad:  { label: "Seguridad ciudadana",   color: "#A93346" },
  pistas:     { label: "Pistas y veredas",      color: "#C48414" },
  residuos:   { label: "Residuos sólidos",      color: "#4E7B45" },
  turismo:    { label: "Turismo / Huacachina",  color: "#2D5A27" },
  empleo:     { label: "Empleo juvenil",        color: "#6B5544" },
};

function sentimentColorLeg(s) {
  if (s >= 65) return "#2D5A27";
  if (s >= 55) return "#4E7B45";
  if (s >= 48) return "#C48414";
  if (s >= 40) return "#A93346";
  return "#8B1A2E";
}

function LegadoSection() {
  const [tab, setTab] = legUseState("perfiles");
  const [selectedDist, setSelectedDist] = legUseState("PAR");
  const [zoneFilter, setZoneFilter] = legUseState(null);

  const tabs = [
    { k: "perfiles",   l: "Perfiles distritales" },
    { k: "prioridad",  l: "Matriz de prioridad" },
    { k: "narrativas", l: "Narrativas por zona" },
    { k: "agenda",     l: "Agenda de visitas" },
    { k: "acciones",   l: "Guion de campo" },
  ];

  return (
    <div className="fade-up">
      <TerritoryHero/>
      <div className="sticky top-[64px] z-20 bg-cream-100/95 backdrop-blur border-b border-cream-300">
        <div className="px-6 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-4 py-3 text-[13px] border-b-2 transition-colors whitespace-nowrap ${
                tab === t.k ? "border-wine text-navy font-medium" : "border-transparent text-navy-300 hover:text-navy"
              }`}
            >{t.l}</button>
          ))}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {tab === "perfiles"   && <PerfilesTab selectedDist={selectedDist} setSelectedDist={setSelectedDist} zoneFilter={zoneFilter} setZoneFilter={setZoneFilter}/>}
        {tab === "prioridad"  && <PrioridadTab/>}
        {tab === "narrativas" && <NarrativasTab/>}
        {tab === "agenda"     && <AgendaTab/>}
        {tab === "acciones"   && <AccionesTab/>}
      </div>
    </div>
  );
}

/* ── HERO ── */
function TerritoryHero() {
  return (
    <div className="bg-brand-700 text-cream-50 px-6 pt-8 pb-7 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #FDFBF7 0 1px, transparent 1px 18px)",
      }}/>
      <div className="relative grid grid-cols-[1fr_280px_280px] gap-8 items-start">
        <div>
          <div className="smallcaps text-brand-100 mb-2">Inteligencia territorial · ARCA</div>
          <h1 className="serif text-[36px] leading-tight mb-3">Provincia de Ica<br/><span className="text-brand-200">13 Distritos</span></h1>
          <p className="text-[13px] text-brand-100 leading-relaxed max-w-[480px]">
            Perfiles estratégicos de cada distrito de la provincia: preocupaciones prioritarias, narrativas ciudadanas dominantes, actividad rival y recomendaciones de contenido calibradas por zona y audiencia.
          </p>
        </div>
        <div className="space-y-3">
          <HeroStat n="~400,000" l="habitantes en la provincia" />
          <HeroStat n="13" l="distritos bajo monitoreo" />
          <HeroStat n="3" l="zonas estratégicas (Urbano · Periurbano · Andino)" />
        </div>
        <div className="space-y-3">
          <HeroStat n="Parcona" l="distrito más poblado — prioridad alta" color="text-wine-200"/>
          <HeroStat n="La Tinguiña" l="crisis hídrica activa — acción urgente" color="text-wine-200"/>
          <HeroStat n="17 jun" l="Aniversario de Ica — ventana cívica" color="text-brand-200"/>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ n, l, color }) {
  return (
    <div>
      <div className={`num text-[18px] font-semibold ${color || "text-cream-50"}`}>{n}</div>
      <div className="text-[11px] text-brand-100 leading-tight">{l}</div>
    </div>
  );
}

/* ── TAB: PERFILES DISTRITALES ── */
function PerfilesTab({ selectedDist, setSelectedDist, zoneFilter, setZoneFilter }) {
  const detail = window.DATA.districtDetail[selectedDist] || window.DATA.districtDetailDefault;
  const dist = window.DATA.districts.find(d => d.id === selectedDist);
  const filtered = zoneFilter ? DISTRICTS_LIST.filter(d => d.zone === zoneFilter) : DISTRICTS_LIST;

  return (
    <div className="grid grid-cols-[260px_1fr] gap-5">
      {/* Lista de distritos */}
      <aside className="space-y-3">
        <div className="flex gap-1.5 flex-wrap">
          {[null, "URBANO", "PERIURBANO", "ANDINO"].map(z => (
            <button
              key={z || "all"}
              onClick={() => setZoneFilter(z)}
              className={`smallcaps px-2 py-1 rounded text-[10px] transition-colors ${zoneFilter === z ? "bg-brand-300 text-navy" : "bg-cream-100 text-navy-300 hover:bg-cream-200"}`}
            >{z || "Todos"}</button>
          ))}
        </div>
        <div className="space-y-1">
          {filtered.map(d => {
            const dist = window.DATA.districts.find(x => x.id === d.id);
            const active = selectedDist === d.id;
            const zc = ZONE_COLORS[d.zone];
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDist(d.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors ${active ? "bg-cream-200 border border-cream-300" : "hover:bg-cream-100"}`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dist ? sentimentColorLeg(dist.s) : "#ccc" }}/>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-navy truncate">{d.name}</div>
                  <div className={`text-[10px] ${zc.text}`}>{d.zone} · {d.pop}</div>
                </div>
                <div className="num text-[12px] font-semibold" style={{ color: dist ? sentimentColorLeg(dist.s) : "#ccc" }}>
                  {dist ? dist.s : "—"}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Detalle del distrito seleccionado */}
      {dist && (
        <div className="space-y-5">
          <div className="bg-cream-50 border border-cream-300 rounded-lg shadow-panel overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b border-cream-300 flex items-start justify-between">
              <div>
                <div className="smallcaps text-navy-300 mb-1">{DISTRICTS_LIST.find(d => d.id === selectedDist)?.zone} · {DISTRICTS_LIST.find(d => d.id === selectedDist)?.pop} hab.</div>
                <h2 className="serif text-[32px] text-navy leading-tight">{dist.name}</h2>
              </div>
              <div className="text-right">
                <div className="smallcaps text-navy-300">Score de simpatía</div>
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="num text-[38px] font-semibold" style={{ color: sentimentColorLeg(dist.s) }}>{dist.s}</span>
                  <span className="text-navy-200">/100</span>
                </div>
                <div className="text-[12px]" style={{ color: sentimentColorLeg(dist.s) }}>{detail.trend}</div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <div className="space-y-4">
                <TBlock label="Preocupaciones principales (top 3)">
                  <ol className="space-y-2">
                    {detail.concerns.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-navy">
                        <span className="num text-[11px] text-navy-200 mt-0.5 shrink-0">0{i+1}</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ol>
                </TBlock>
                <TBlock label="Narrativa dominante">
                  <p className="text-[13px] text-navy italic leading-relaxed border-l-2 border-brand pl-3">"{detail.narrative}"</p>
                </TBlock>
              </div>
              <div className="space-y-4">
                <TBlock label="Actividad rival">
                  <p className="text-[13px] text-navy leading-relaxed">{detail.rivals}</p>
                </TBlock>
                <TBlock label="Recomendación de contenido">
                  <p className="text-[13px] text-navy leading-relaxed">{detail.content}</p>
                </TBlock>
                {detail.activeSignals && detail.activeSignals.length > 0 && (
                  <TBlock label="Señales activas">
                    <div className="flex gap-2 flex-wrap">
                      {detail.activeSignals.map(sid => (
                        <span key={sid} className="text-[11px] px-2 py-1 bg-wine-50 border border-wine-200 rounded text-wine-300 num font-medium">{sid} — ACTIVA</span>
                      ))}
                    </div>
                  </TBlock>
                )}
                <TBlock label="Eventos cívicos">
                  <div className="flex flex-wrap gap-1.5">
                    {detail.events.map((e, i) => (
                      <span key={i} className="text-[11px] px-2 py-1 bg-cream-100 border border-cream-300 rounded text-navy">{e}</span>
                    ))}
                  </div>
                </TBlock>
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-2">
              <Button variant="primary" size="md" className="flex-1 justify-center">Crear contenido para {dist.name}</Button>
              <Button variant="ghost" size="md">Abrir en radar</Button>
            </div>
          </div>

          {/* Tendencia semanal */}
          <div className="bg-cream-50 border border-cream-300 rounded-lg p-4 shadow-card">
            <div className="smallcaps text-navy-300 mb-3">Tendencia de simpatía — últimas 4 semanas</div>
            <MiniSpark values={detail.history} w={680} h={52} color={sentimentColorLeg(dist.s)}/>
            <div className="flex justify-between text-[10px] text-navy-300 mt-1 num">
              <span>4 sem atrás</span><span>3 sem</span><span>2 sem</span><span>1 sem</span><span>Hoy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── TAB: MATRIZ DE PRIORIDAD ── */
function PrioridadTab() {
  const rows = [
    { id: "LAT", name: "La Tinguiña",  pop: "~40K", score: 48, trend: "↓", priority: "ALTA",  urgencia: "CRÍTICA",  tema: "Agua", accion: "Visita hoy + compromiso de redes" },
    { id: "PAR", name: "Parcona",      pop: "~85K", score: 52, trend: "↓", priority: "ALTA",  urgencia: "ALTA",     tema: "Pistas / desagüe", accion: "Visita esta semana + propuesta con cifra" },
    { id: "SJB", name: "San Juan Bautista", pop: "~38K", score: 54, trend: "↑", priority: "ALTA", urgencia: "MEDIA", tema: "Pistas", accion: "Propuesta con S/. y cronograma antes de 48h" },
    { id: "SUB", name: "Subtanjalla",  pop: "~35K", score: 50, trend: "→", priority: "MEDIA", urgencia: "MEDIA",   tema: "Agua / residuos", accion: "Carrusel con propuesta de parques y agua" },
    { id: "ICA", name: "Ica",          pop: "~80K", score: 58, trend: "↑", priority: "MEDIA", urgencia: "MEDIA",   tema: "Seguridad / mercado", accion: "Contenido sobre centro histórico y mercado" },
    { id: "STG", name: "Santiago",     pop: "~28K", score: 51, trend: "→", priority: "MEDIA", urgencia: "BAJA",    tema: "Vial rural", accion: "Visita a sectores alejados — diferenciador" },
    { id: "TAT", name: "Tate",         pop: "~18K", score: 50, trend: "↑", priority: "MEDIA", urgencia: "BAJA",    tema: "Residuos", accion: "Reel de cronograma de recojo" },
    { id: "LAQ", name: "Los Aquijes",  pop: "~22K", score: 53, trend: "↑", priority: "MEDIA", urgencia: "BAJA",    tema: "Pistas productivas", accion: "Mensaje al productor agropecuario" },
    { id: "PNU", name: "Pueblo Nuevo", pop: "~12K", score: 49, trend: "→", priority: "BAJA",  urgencia: "BAJA",    tema: "Distancia al centro", accion: "Visita presencial — sola ya diferencia" },
    { id: "SAL", name: "Salas",        pop: "~8K",  score: 47, trend: "↓", priority: "BAJA",  urgencia: "BAJA",    tema: "Aislamiento vial", accion: "Visita presencial — nadie va allí" },
    { id: "SJM", name: "San José de los Molinos", pop: "~6K", score: 46, trend: "↓", priority: "BAJA", urgencia: "BAJA", tema: "Salud rural", accion: "1 propuesta de salud — visita en campo" },
    { id: "PAC", name: "Pachacútec",   pop: "~5K",  score: 44, trend: "↓", priority: "BAJA",  urgencia: "BAJA",    tema: "Agua rural", accion: "Presencia física — máximo diferenciador" },
    { id: "YAU", name: "Yauca del Rosario", pop: "~3K", score: 42, trend: "↓", priority: "BAJA", urgencia: "BAJA", tema: "Aislamiento", accion: "Visita = mensaje por sí sola" },
  ];
  const urgColors = { CRÍTICA: "text-wine font-bold", ALTA: "text-wine-300 font-semibold", MEDIA: "text-amber2", BAJA: "text-navy-300" };
  return (
    <Panel title="Matriz de prioridad distrital" subtitle="Ordenado por impacto electoral estimado · semana 22">
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="border-b border-cream-300 text-left">
              {["Distrito", "Población", "Score", "Trend", "Prioridad", "Urgencia", "Tema clave", "Acción recomendada"].map(h => (
                <th key={h} className="smallcaps text-navy-300 pb-2 pr-4 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className={`border-b border-cream-200 hover:bg-cream-100 transition-colors ${i % 2 === 0 ? "" : "bg-cream-50"}`}>
                <td className="py-2.5 pr-4 font-semibold text-navy">{r.name}</td>
                <td className="py-2.5 pr-4 num text-navy-300">{r.pop}</td>
                <td className="py-2.5 pr-4"><span className="num font-semibold" style={{ color: sentimentColorLeg(r.score) }}>{r.score}</span></td>
                <td className="py-2.5 pr-4 num" style={{ color: r.trend === "↑" ? "#2D5A27" : r.trend === "↓" ? "#8B1A2E" : "#6B5544" }}>{r.trend}</td>
                <td className="py-2.5 pr-4"><PriorityBadge p={r.priority}/></td>
                <td className={`py-2.5 pr-4 ${urgColors[r.urgencia]}`}>{r.urgencia}</td>
                <td className="py-2.5 pr-4 text-navy">{r.tema}</td>
                <td className="py-2.5 text-navy-300 leading-snug max-w-[240px]">{r.accion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function PriorityBadge({ p }) {
  const colors = { ALTA: "bg-wine text-cream-50", MEDIA: "bg-amber2-50 text-amber2 border border-amber2-200", BAJA: "bg-cream-200 text-navy-300" };
  return <span className={`text-[10px] smallcaps px-2 py-0.5 rounded ${colors[p]}`}>{p}</span>;
}

/* ── TAB: NARRATIVAS POR ZONA ── */
function NarrativasTab() {
  const zones = [
    {
      key: "URBANO",
      label: "Zona Urbana",
      distritos: "Ica, Parcona, La Tinguiña, Subtanjalla, San Juan Bautista",
      tema: "Agua, seguridad, pistas, mercado central",
      tono: "Directo, técnico sin ser frío. Propuesta con cifra y plazo. Referencias locales: Plaza de Armas, Mercado Central, Huacachina.",
      evitar: "Generalidades, comparaciones con Lima, tono limeño",
      apertura: "Hoy estamos en Parcona, donde [cifra] familias llevan [tiempo] esperando [servicio].",
      cierre: "Si Ica nos da su confianza, en [N] días [compromiso concreto].",
      ejemplos: [
        "\"4,200 familias de La Tinguiña sin agua potable garantizada. En 180 días, eso cambia.\"",
        "\"Parcona paga impuestos y recibe las migajas. Eso se termina con nosotros.\"",
        "\"El Mercado Central de Ica necesita modernización — no lo dejamos para el año que viene.\"",
      ],
    },
    {
      key: "PERIURBANO",
      label: "Zona Periurbana",
      distritos: "Tate, Pueblo Nuevo, Santiago, Salas, Los Aquijes",
      tema: "Conectividad vial, residuos sólidos, servicios básicos, distancia al centro",
      tono: "Empático y presencial. Reconocer el abandono histórico antes de cualquier propuesta. Nombre del barrio específico, no el distrito genérico.",
      evitar: "Paternalismo, promesas sin cronograma, cifras sin fuente",
      apertura: "Santiago existe en el mapa — también debe existir en el presupuesto.",
      cierre: "Un solo compromiso concreto, medible, con plazo. No tres.",
      ejemplos: [
        "\"Los Aquijes tiene buena tierra pero mal acceso. Si arreglamos las pistas, el resto ustedes lo hacen solos.\"",
        "\"Salas queda lejos. Por eso vamos. Y no es la última vez.\"",
        "\"Tate está en la carretera principal. Eso es una ventaja — la aprovechamos.\"",
      ],
    },
    {
      key: "ANDINO",
      label: "Zona Andina",
      distritos: "San José de los Molinos, Pachacútec, Yauca del Rosario",
      tema: "Salud rural, agua, aislamiento, conectividad básica",
      tono: "Respetuoso y presencial. Ropa de campo, no terno. La presencia física vale más que cualquier comunicado. Una propuesta concreta por distrito — no generales.",
      evitar: "Prometer obras que dependen del gobierno regional, cifras irreales, ausencia física",
      apertura: "Vine porque Yauca del Rosario existe y merece que alguien llegue.",
      cierre: "Un compromiso específico: un puesto de salud, una vía afirmada, agua en la comunidad.",
      ejemplos: [
        "\"Pachacútec tiene nombre de inca pero vive olvidado. Eso no es justo y lo vamos a cambiar.\"",
        "\"San José de los Molinos queda lejos de Ica. Pero nosotros llegamos.\"",
        "\"Yauca del Rosario aparece en el mapa. También va a aparecer en el presupuesto.\"",
      ],
    },
  ];
  return (
    <div className="space-y-5">
      {zones.map(z => {
        const zc = ZONE_COLORS[z.key];
        return (
          <div key={z.key} className={`rounded-lg border ${zc.border} ${zc.bg} overflow-hidden`}>
            <div className="px-5 py-3 border-b border-cream-300 flex items-center justify-between">
              <div>
                <span className={`smallcaps text-[12px] ${zc.text} font-semibold`}>{z.label}</span>
                <span className="text-[12px] text-navy-300 ml-3">{z.distritos}</span>
              </div>
            </div>
            <div className="p-5 grid grid-cols-3 gap-5">
              <div className="space-y-3">
                <TBlock label="Tema dominante"><p className="text-[13px] text-navy">{z.tema}</p></TBlock>
                <TBlock label="Tono recomendado"><p className="text-[13px] text-navy leading-relaxed">{z.tono}</p></TBlock>
                <TBlock label="Evitar"><p className="text-[13px] text-wine-300">{z.evitar}</p></TBlock>
              </div>
              <div className="space-y-3">
                <TBlock label="Apertura de discurso">
                  <p className="text-[13px] text-navy italic border-l-2 border-brand pl-3 leading-relaxed">"{z.apertura}"</p>
                </TBlock>
                <TBlock label="Cierre con compromiso">
                  <p className="text-[13px] text-navy italic border-l-2 border-forest pl-3 leading-relaxed">"{z.cierre}"</p>
                </TBlock>
              </div>
              <div>
                <TBlock label="Mensajes probados en territorio">
                  <div className="space-y-2.5">
                    {z.ejemplos.map((e, i) => (
                      <div key={i} className="text-[12.5px] text-navy leading-relaxed bg-cream-50 rounded p-2.5 border border-cream-300">
                        {e}
                      </div>
                    ))}
                  </div>
                </TBlock>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── TAB: AGENDA DE VISITAS ── */
function AgendaTab() {
  const weeks = [
    {
      label: "Semana actual (28 may – 3 jun)",
      visits: [
        { day: "Mié 28", dist: "La Tinguiña",  urgencia: "CRÍTICA",  objetivo: "Crisis hídrica — presencia antes de 18:00", output: "Reel en territorio + comunicado con cifras" },
        { day: "Jue 29", dist: "Ica (centro)",  urgencia: "MEDIA",    objetivo: "Debate técnico acuífero — ONG Agua Para Ica", output: "Reel previo + post debate con posición técnica" },
        { day: "Vie 30", dist: "Parcona",       urgencia: "ALTA",     objetivo: "Respuesta al video viral de la calle anegada", output: "Reel propuesta desagüe + reunión dirigentes" },
      ],
    },
    {
      label: "Semana 2 (4 – 10 jun)",
      visits: [
        { day: "Mar",    dist: "San Juan Bautista", urgencia: "MEDIA", objetivo: "Contrarrestar propuesta rival de asfaltado", output: "Carrusel propuesta S/. 9.4M + visita vecinales" },
        { day: "Jue",    dist: "Subtanjalla",   urgencia: "MEDIA",    objetivo: "Agua y espacios recreativos — tema sin dueño", output: "Reel con propuesta de parques + agua" },
        { day: "Sáb",    dist: "Santiago",      urgencia: "BAJA",     objetivo: "Sectores alejados — diferenciador de presencia", output: "Historia BTS + propuesta vial rural" },
      ],
    },
    {
      label: "Semana 3 (11 – 17 jun) — Aniversario Ica",
      visits: [
        { day: "Lun",    dist: "Tate / Pueblo Nuevo", urgencia: "BAJA", objetivo: "Distritos del norte — completar cobertura", output: "Dos reels cortos — uno por distrito" },
        { day: "Mié",    dist: "Los Aquijes",   urgencia: "BAJA",     objetivo: "Productores agrícolas — mensaje de apoyo", output: "Reel desde campo + propuesta de pistas" },
        { day: "Dom 17", dist: "Ica (centro)",  urgencia: "ALTA",     objetivo: "Aniversario de la Provincia — acto cívico", output: "Discurso + reel + FB post identidad iqueña" },
      ],
    },
  ];
  return (
    <div className="space-y-5">
      {weeks.map(w => (
        <Panel key={w.label} title={w.label}>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-cream-300">
                {["Día", "Distrito", "Urgencia", "Objetivo de visita", "Output esperado"].map(h => (
                  <th key={h} className="smallcaps text-navy-300 pb-2 pr-4 text-left font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {w.visits.map((v, i) => (
                <tr key={i} className="border-b border-cream-200 hover:bg-cream-100">
                  <td className="py-2.5 pr-4 num font-semibold text-navy">{v.day}</td>
                  <td className="py-2.5 pr-4 font-semibold text-navy">{v.dist}</td>
                  <td className="py-2.5 pr-4"><PriorityBadge p={v.urgencia === "CRÍTICA" ? "ALTA" : v.urgencia === "ALTA" ? "ALTA" : v.urgencia === "MEDIA" ? "MEDIA" : "BAJA"}/></td>
                  <td className="py-2.5 pr-4 text-navy leading-snug">{v.objetivo}</td>
                  <td className="py-2.5 text-navy-300 leading-snug">{v.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ))}
    </div>
  );
}

/* ── TAB: GUION DE CAMPO ── */
function AccionesTab() {
  const items = [
    { n: "01", title: "Llegada al territorio — primeros 5 minutos", body: "No empezar con discurso. Caminar primero. Saludar de mano. Preguntar el nombre antes de hablar del problema. La imagen de escucha vale más que la primera declaración." },
    { n: "02", title: "Apertura del discurso en territorio", body: "Nunca empezar agradeciendo autoridades. Empezar nombrando el problema o la cifra: 'Hoy estamos en Parcona, donde [N] familias llevan [tiempo] sin [servicio].' El primer dato ancla la narrativa." },
    { n: "03", title: "Estructura de la propuesta en campo", body: "1. Reconocer el problema con cifra. 2. Explicar por qué existe (sin atacar). 3. Comprometer acción concreta con plazo. 4. Dejar claro el mecanismo de rendición de cuentas. Máx. 4 minutos." },
    { n: "04", title: "Cierre — compromiso con número", body: "Siempre terminar con un número concreto y un plazo: 'En 180 días, [N] familias de [distrito] tendrán agua potable.' Nunca cerrar con una aspiración vaga." },
    { n: "05", title: "Gestión de preguntas incómodas en territorio", body: "Ante acusaciones de corrupción: reconocer la desconfianza, no defenderse. Proponer mecanismo de transparencia específico. Ante acusaciones de ser de fuera: anclaje geográfico concreto, sin indignación." },
    { n: "06", title: "Protocolo de reel en campo", body: "Primeros 3 segundos: dato o imagen impactante, sin saludos. Cámara directa. Sin producción elaborada — la autenticidad de terreno supera al estudio. Caption: cifra + propuesta + hashtag local." },
    { n: "07", title: "Manejo de la prensa local en territorio", body: "Radio Ica y Radio Luren tienen audiencia 35+ que no está en redes. Siempre dar declaración de radio en visita. Primero lo urgente (qué vas a hacer hoy), luego lo estructural (qué propones para el período)." },
    { n: "08", title: "Después de la visita — las primeras 2 horas", body: "Publicar reel antes de las 2 horas. Caption con cifra del distrito específico. Responder primeros 20 comentarios manualmente. No dejar la conversación sola las primeras 4 horas." },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map(it => (
        <div key={it.n} className="bg-cream-50 border border-cream-300 rounded-lg p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="num text-[20px] font-semibold text-brand-300 shrink-0">{it.n}</span>
            <div>
              <div className="font-semibold text-[13px] text-navy mb-1.5">{it.title}</div>
              <p className="text-[12.5px] text-navy-300 leading-relaxed">{it.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── HELPER: TBlock ── */
function TBlock({ label, children }) {
  return (
    <div>
      <div className="smallcaps text-navy-300 mb-1.5 text-[10px]">{label}</div>
      {children}
    </div>
  );
}

window.LegadoSection = LegadoSection;
