// ===== SECTION 4: SIMULADOR DE NARRATIVA =====
const { useState: simUseState, useMemo: simUseMemo, useEffect: simUseEffect } = React;

function SimuladorSection() {
  const [topic, setTopic] = simUseState("Crisis hídrica en La Tinguiña — 48 horas sin agua potable");
  const [tone, setTone] = simUseState("PROPOSITIVO");
  const [format, setFormat] = simUseState("REEL");
  const [angle, setAngle] = simUseState("Territorial");
  const [emphasis, setEmphasis] = simUseState({ agua: true, seguridad: false, pistas: false, turismo: false, empleo: true, territorio: true });
  const [running, setRunning] = simUseState(false);
  const [generated, setGenerated] = simUseState(false);

  function run() {
    setRunning(true);
    setGenerated(false);
    setTimeout(() => {
      setRunning(false);
      setGenerated(true);
    }, 1400);
  }

  simUseEffect(() => { run(); }, []);

  // Compute scoring based on combo
  const projected = simUseMemo(() => {
    let reach = 32000, pos = 56, conv = 4.2, risk = 22;
    if (tone === "CONFRONTACIONAL") { reach += 12000; pos -= 14; risk += 18; }
    if (tone === "EMOCIONAL")       { pos += 6; conv += 0.5; }
    if (tone === "PROPOSITIVO")     { pos += 4; risk -= 4; }
    if (tone === "TESTIMONIAL")     { pos += 8; conv += 0.4; reach -= 3000; }
    if (tone === "PEDAGOGICO")      { pos += 3; conv -= 0.2; reach -= 5000; risk -= 6; }
    if (format === "REEL")     { reach += 8000; conv += 0.7; }
    if (format === "CARRUSEL") { conv += 0.3; pos += 2; }
    if (format === "HILO")     { reach -= 6000; pos += 1; risk += 3; }
    if (format === "PODCAST")  { reach -= 8000; pos += 6; conv += 0.2; }
    if (format === "VIDEO")    { reach += 4000; pos += 3; conv += 0.4; }
    if (angle === "Contraste")   { pos -= 2; risk += 4; }
    if (angle === "Territorial") { pos += 5; reach += 3000; }
    if (angle === "Futurible")   { pos += 2; conv += 0.5; }
    if (angle === "Datos duros") { pos += 3; conv += 0.3; }
    if (angle === "Personal")    { pos += 6; reach -= 2000; }
    const ecount = Object.values(emphasis).filter(Boolean).length;
    if (ecount > 4) risk += 5;
    if (emphasis.territorio) { pos += 3; }
    if (emphasis.agua)       { reach += 5000; pos += 2; }
    if (emphasis.seguridad)  { reach += 6000; risk += 2; }
    return {
      reach: Math.round(reach),
      pos: Math.max(15, Math.min(82, Math.round(pos))),
      conv: Math.max(1.4, Math.min(8.0, Math.round(conv*10)/10)),
      risk: Math.max(8, Math.min(75, Math.round(risk))),
    };
  }, [tone, format, angle, emphasis]);

  return (
    <div className="p-6 grid grid-cols-[340px_1fr_360px] gap-5">
      {/* Left controls */}
      <aside className="space-y-4 fade-up">
        <Panel title="Parámetros" noPad>
          <div className="p-4 space-y-4">
            <Field label="Tema o narrativa">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={2}
                className="w-full text-[13px] bg-cream-100 border border-cream-300 rounded p-2 focus:outline-none focus:border-brand-200"
              />
            </Field>
            <Field label="Tono">
              <SegmentedGroup value={tone} setValue={setTone} options={[
                { v: "PROPOSITIVO",     l: "Propositivo" },
                { v: "EMOCIONAL",       l: "Emocional" },
                { v: "CONFRONTACIONAL", l: "Confrontacional" },
                { v: "TESTIMONIAL",     l: "Testimonial" },
                { v: "PEDAGOGICO",      l: "Pedagógico" },
              ]} stacked/>
            </Field>
            <Field label="Formato">
              <div className="grid grid-cols-3 gap-1.5">
                {["REEL","CARRUSEL","POST","HILO","VIDEO","PODCAST"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`smallcaps px-2 py-1.5 rounded ${format === f ? "bg-brand-300 text-navy" : "bg-cream-100 text-navy-300 hover:bg-cream-200"}`}
                  >{f}</button>
                ))}
              </div>
            </Field>
            <Field label="Ángulo narrativo">
              <select value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full text-[13px] bg-cream-100 border border-cream-300 rounded px-3 py-2">
                <option>Territorial</option>
                <option>Contraste</option>
                <option>Personal</option>
                <option>Datos duros</option>
                <option>Testimonial</option>
                <option>Identidad iqueña</option>
                <option>Futurible</option>
              </select>
            </Field>
            <Field label="Énfasis temático">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {[
                  ["agua",      "Agua"],
                  ["seguridad", "Seguridad"],
                  ["pistas",    "Pistas"],
                  ["turismo",   "Turismo"],
                  ["empleo",    "Empleo joven"],
                  ["territorio","Territorio"],
                ].map(([k, l]) => (
                  <label key={k} className="flex items-center gap-2 cursor-pointer text-[13px] text-navy">
                    <Check on={emphasis[k]} onClick={() => setEmphasis({...emphasis, [k]: !emphasis[k]})}/>
                    {l}
                  </label>
                ))}
              </div>
            </Field>
          </div>
          <div className="p-4 border-t border-cream-300 bg-cream-100">
            <Button variant="wine" size="lg" className="w-full justify-center" onClick={run} icon={<Icon name="regen" size={14}/>}>
              {running ? "Simulando..." : "Re-simular"}
            </Button>
          </div>
        </Panel>
      </aside>

      {/* Center preview */}
      <div className="space-y-4 fade-up d1">
        <Panel title="Vista previa" subtitle={`${format} · tono ${tone.toLowerCase()} · ángulo ${angle.toLowerCase()}`} right={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Cambiar a Reel</Button>
            <Button variant="secondary" size="sm">Editar</Button>
          </div>
        }>
          <div className="bg-cream-100 rounded p-6 flex justify-center">
            {running ? <PreviewSkeleton format={format}/> : <PreviewMockup format={format} topic={topic} tone={tone} angle={angle}/>}
          </div>
          {!running && (
            <div className="mt-4 p-4 bg-cream-100 border border-cream-300 rounded">
              <div className="smallcaps text-navy-300 mb-2">Copy generado</div>
              <CopyOutput topic={topic} tone={tone} angle={angle} format={format}/>
            </div>
          )}
        </Panel>
      </div>

      {/* Right metrics */}
      <aside className="space-y-4 fade-up d2">
        <Panel title="Proyección" subtitle="Basada en 18 meses de datos históricos">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Metric label="Alcance estimado" value={projected.reach.toLocaleString("es-PE")} suffix="" tone="neutral"/>
            <Metric label="Sentimiento +" value={projected.pos} suffix="%" tone={projected.pos >= 55 ? "good" : projected.pos >= 45 ? "warn" : "bad"}/>
            <Metric label="Engagement" value={projected.conv} suffix="%" tone="neutral"/>
            <Metric label="Riesgo backlash" value={projected.risk} suffix="%" tone={projected.risk < 25 ? "good" : projected.risk < 45 ? "warn" : "bad"}/>
          </div>
          <RiskBar pos={projected.pos} risk={projected.risk}/>
        </Panel>

        <Panel title="Comparables">
          <div className="space-y-2">
            {[
              { title: "Reel visita Parcona — 26 may", reach: "12.4K", pos: 64, fmt: "Reel", note: "Tono propositivo, Parcona 35-55" },
              { title: "Carrusel propuesta agua — 25 may", reach: "8.2K", pos: 58, fmt: "Carrusel", note: "Tono pedagogico, La Tinguiña" },
              { title: "Reel Huacachina identidad — 20 may", reach: "18.7K", pos: 68, fmt: "Reel", note: "Tono emocional, identidad iqueña" },
            ].map((c, i) => (
              <div key={i} className="p-3 bg-cream-100 border border-cream-300 rounded">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="text-[12.5px] text-navy leading-tight">{c.title}</div>
                  <span className="text-[10px] text-navy-300 num">{c.fmt}</span>
                </div>
                <div className="text-[10.5px] text-navy-300 mb-1.5">{c.note}</div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="num text-navy">{c.reach} alcance</span>
                  <span className="num" style={{ color: sentimentColor(c.pos) }}>{c.pos}% pos.</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Riesgos detectados">
          <ul className="space-y-2 text-[12.5px]">
            {tone === "CONFRONTACIONAL" && (
              <li className="flex gap-2 text-wine"><Icon name="bell" size={13} className="mt-0.5"/> El tono confrontacional eleva el riesgo de polarización.</li>
            )}
            {angle === "Contraste" && (
              <li className="flex gap-2 text-amber2"><Icon name="bell" size={13} className="mt-0.5"/> Contrastes directos atraen respuestas del rival mencionado.</li>
            )}
            {angle === "Legado" && (
              <li className="flex gap-2 text-navy-300"><Icon name="check" size={13} className="mt-0.5"/> Ángulo "legado" funciona bien con tono pausado.</li>
            )}
            <li className="flex gap-2 text-navy-300"><Icon name="check" size={13} className="mt-0.5"/> No hay clips antiguos vinculados al ángulo elegido.</li>
            <li className="flex gap-2 text-navy-300"><Icon name="check" size={13} className="mt-0.5"/> Tema no contradice posiciones previas.</li>
          </ul>
        </Panel>

        <Panel title="Acciones">
          <div className="flex flex-col gap-2">
            <Button variant="wine" size="lg" className="justify-center">Aprobar y enviar a Sala de contenido</Button>
            <Button variant="secondary" size="md" className="justify-center">Guardar variante</Button>
            <Button variant="ghost" size="md" className="justify-center">Comparar dos variantes</Button>
          </div>
        </Panel>
      </aside>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="smallcaps text-navy-300 mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function SegmentedGroup({ value, setValue, options, stacked }) {
  return (
    <div className={`grid gap-1.5 ${stacked ? "grid-cols-1" : `grid-cols-${options.length}`}`}>
      {options.map(o => (
        <button
          key={o.v}
          onClick={() => setValue(o.v)}
          className={`text-[12px] px-2.5 py-1.5 rounded text-left ${value === o.v ? "bg-brand-300 text-navy" : "bg-cream-100 text-navy-300 hover:bg-cream-200"}`}
        >
          <span className="smallcaps">{o.l}</span>
        </button>
      ))}
    </div>
  );
}

function PreviewSkeleton({ format }) {
  const isReel = format === "REEL";
  return (
    <div className={`shimmer rounded ${isReel ? "w-[280px] h-[500px]" : "w-[420px] h-[420px]"}`}/>
  );
}

function PreviewMockup({ format, topic, tone, angle }) {
  if (format === "REEL") {
    return (
      <div className="w-[280px] h-[500px] rounded-2xl bg-brand-800 text-cream-50 overflow-hidden relative shadow-pop">
        {/* "Image" */}
        <div className="absolute inset-0 placeholder-stripes opacity-30"/>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"/>
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-cream-50/20"/>
          <div>
            <div className="text-[11px] font-semibold">@cuenta_oficial</div>
            <div className="text-[9px] text-cream-100/70">hace 2 min</div>
          </div>
        </div>
        <div className="absolute bottom-16 left-3 right-3">
          <div className="text-[10px] uppercase tracking-wider text-cream-100/70 mb-1">{angle}</div>
          <div className="serif text-[20px] leading-tight mb-2">{topic.split("—")[0]}</div>
          <div className="text-[11px] text-cream-100/85">3 medidas concretas para los primeros 100 días.</div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] text-cream-100/70">
          <span>❤ 4.2K · 💬 384 · ↗ 92</span>
          <span>0:24</span>
        </div>
      </div>
    );
  }
  if (format === "CARRUSEL") {
    return (
      <div className="w-[420px] h-[420px] rounded-lg bg-cream-50 border border-cream-300 overflow-hidden shadow-pop">
        <div className="bg-brand-700 text-cream-50 p-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-cream-50/20"/>
          <div>
            <div className="text-[11px] font-semibold">@cuenta_oficial</div>
            <div className="text-[9px] text-cream-100/70">hace 2 min · Lima</div>
          </div>
        </div>
        <div className="p-6 h-[280px] flex flex-col justify-between bg-cream-100">
          <div className="text-[10px] uppercase tracking-wider text-navy-300">Carrusel · 5 slides</div>
          <div>
            <div className="serif text-[22px] text-navy leading-tight mb-3">{topic.split("—")[0]}</div>
            <div className="text-[12px] text-navy-300">Tres medidas concretas. Una decisión que no espera.</div>
          </div>
          <div className="flex gap-1.5">
            {[0,1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded ${i===0 ? "bg-brand" : "bg-cream-300"}`}/>)}
          </div>
        </div>
        <div className="px-4 py-2.5 text-[11px] text-navy-300 num">4.2K · 384 · 92</div>
      </div>
    );
  }
  return (
    <div className="w-[420px] rounded-lg bg-cream-50 border border-cream-300 overflow-hidden shadow-pop">
      <div className="p-4 flex items-center gap-2 border-b border-cream-200">
        <div className="w-9 h-9 rounded-full bg-brand"/>
        <div>
          <div className="text-[12px] font-semibold text-navy">Cuenta Oficial</div>
          <div className="text-[10px] text-navy-300">@cuenta_oficial · hace 2 min</div>
        </div>
      </div>
      <div className="p-4 text-[13.5px] text-navy leading-relaxed">
        {topic}. Tres medidas concretas, plazos publicados, presupuesto desglosado.
      </div>
      <div className="px-4 py-2.5 border-t border-cream-200 text-[11px] text-navy-300 num">4.2K vistas · 384 me gusta · 92 compartidos</div>
    </div>
  );
}

function CopyOutput({ topic, tone, angle, format }) {
  const tones = {
    PROPOSITIVO:     "4,200 familias de La Tinguiña llevan 48 horas sin agua potable. En 180 días eso cambia: red domiciliaria, mesa técnica con la ANA y las empresas, y rendición de cuentas pública cada mes. El agua de Ica es de los iqueños primero.",
    EMOCIONAL:       "Hoy fui a La Tinguiña. Una madre me dijo que lleva dos días comprando agua en cisterna. Eso no puede seguir. En 180 días, esta familia tendrá agua garantizada — y lo podrán ver en la web de la Municipalidad.",
    CONFRONTACIONAL: "Mientras el rival no se pronuncia, La Tinguiña lleva 48 horas sin agua. La diferencia es simple: nosotros ya estamos en el territorio. Ellos tienen comunicados.",
    TESTIMONIAL:     "Rosa tiene 45 años y vive en La Tinguiña. Esta semana pagó S/. 40 en agua de cisterna porque no llega la potable. Su historia se repite en miles de familias. Esta es la propuesta que construimos pensando en ella.",
    PEDAGOGICO:      "¿Cómo resolvemos la crisis de agua en La Tinguiña? Paso 1: coordinar con EMAPICA hoy para emergencia. Paso 2: mesa técnica Municipalidad-ANA-empresas en 30 días. Paso 3: redes domiciliarias en 180 días. Con presupuesto publicado.",
  };
  return (
    <div>
      <p className="text-[13.5px] text-navy leading-relaxed mb-3">{tones[tone] || tones.PROPOSITIVO}</p>
      <div className="flex flex-wrap gap-1.5 text-[11px]">
        {["#PorElAguaDeIca", "#LaTinguiña", "#Ica2026", "#IcaVotaBien", "#AlcaldíaDeIca"].map(h => (
          <span key={h} className="text-navy-300">{h}</span>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value, suffix, tone }) {
  const colors = {
    good: "text-forest",
    warn: "text-amber2",
    bad: "text-wine",
    neutral: "text-navy",
  };
  return (
    <div className="p-3 bg-cream-100 border border-cream-300 rounded">
      <div className="smallcaps text-navy-300 mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className={`num text-[22px] font-semibold ${colors[tone]}`}>{value}</span>
        <span className="text-[12px] text-navy-300">{suffix}</span>
      </div>
    </div>
  );
}

function RiskBar({ pos, risk }) {
  return (
    <div className="space-y-2">
      <div>
        <div className="flex justify-between text-[10px] text-navy-300 mb-1">
          <span className="smallcaps">Sentimiento esperado</span>
          <span className="num">{pos}%</span>
        </div>
        <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
          <div className="h-full" style={{ width: `${pos}%`, background: sentimentColor(pos) }}/>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[10px] text-navy-300 mb-1">
          <span className="smallcaps">Riesgo backlash</span>
          <span className="num">{risk}%</span>
        </div>
        <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
          <div className="h-full bg-wine" style={{ width: `${risk}%` }}/>
        </div>
      </div>
    </div>
  );
}

window.SimuladorSection = SimuladorSection;
