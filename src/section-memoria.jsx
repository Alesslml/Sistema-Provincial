// ===== SECTION 6: MEMORIA ESTRATÉGICA =====
const { useState: meUseState } = React;

function MemoriaSection() {
  const [tab, setTab] = meUseState("POSITIONS");
  const m = window.DATA.memoria;

  return (
    <div className="p-6 space-y-5 fade-up">
      {/* Header */}
      <div>
        <h1 className="serif text-[28px] text-navy leading-tight">Memoria estratégica</h1>
        <p className="text-[13px] text-navy-300 mt-1 max-w-3xl">
          La inteligencia institucional acumulada: posiciones por tema, plan de gobierno, vocabulario, crisis pasadas, narrativas comprobadas y el playbook operativo.
        </p>
      </div>

      <div className="flex gap-1 border-b border-cream-300 overflow-x-auto">
        {[
          { k: "POSITIONS", l: "Posiciones por tema" },
          { k: "PLAN", l: "Plan de gobierno" },
          { k: "AVOID", l: "Vocabulario y términos a evitar" },
          { k: "CRISIS", l: "Crisis pasadas" },
          { k: "WORKED", l: "Narrativas comprobadas" },
          { k: "PLAY", l: "Playbook de crisis" },
        ].map(t => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-4 py-2.5 text-[13px] border-b-2 transition-colors whitespace-nowrap ${
              tab === t.k ? "border-brand text-navy font-medium" : "border-transparent text-navy-300 hover:text-navy"
            }`}
          >{t.l}</button>
        ))}
      </div>

      {tab === "POSITIONS" && <Positions positions={m.positions}/>}
      {tab === "PLAN" && <Plan plan={m.plan}/>}
      {tab === "AVOID" && <Avoid avoid={m.avoid} clips={m.clips}/>}
      {tab === "CRISIS" && <Crisis crises={m.crises}/>}
      {tab === "WORKED" && <Worked items={m.workedNarratives}/>}
      {tab === "PLAY" && <Playbook steps={m.playbook}/>}
    </div>
  );
}

const SECTOR_ICONS = {
  Seguridad: "shield",
  Economía: "money",
  Salud: "heart",
  Educación: "book",
  Infraestructura: "build",
  Social: "heart",
};

function Positions({ positions }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {positions.map((p, i) => (
        <Card key={i} className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded bg-brand-300 text-navy flex items-center justify-center">
              <Icon name={SECTOR_ICONS[p.topic] || "book"} size={18}/>
            </span>
            <h3 className="serif text-[22px] text-navy">{p.topic}</h3>
          </div>
          <p className="text-[13px] text-navy leading-relaxed mb-4">{p.stance}</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="smallcaps text-forest mb-1.5">Énfasis</div>
              <ul className="space-y-1">
                {p.emphasis.map((e, j) => (
                  <li key={j} className="text-[12px] text-navy flex items-start gap-1.5">
                    <Icon name="check" size={11} className="mt-1 text-forest"/>{e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="smallcaps text-wine mb-1.5">Evitar</div>
              <ul className="space-y-1">
                {p.avoid.map((a, j) => (
                  <li key={j} className="text-[12px] text-navy-300 flex items-start gap-1.5">
                    <Icon name="close" size={11} className="mt-1 text-wine"/>{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Plan({ plan }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {plan.map((p, i) => (
        <Card key={i} className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded bg-cream-200 text-navy flex items-center justify-center">
              <Icon name={SECTOR_ICONS[p.sector] || "book"} size={16}/>
            </span>
            <h3 className="serif text-[18px] text-navy">{p.sector}</h3>
          </div>
          <ol className="space-y-2">
            {p.proposals.map((pr, j) => (
              <li key={j} className="flex items-start gap-2.5 text-[13px] text-navy">
                <span className="num text-[10px] text-navy-200 mt-1">0{j+1}</span>{pr}
              </li>
            ))}
          </ol>
        </Card>
      ))}
    </div>
  );
}

function Avoid({ avoid, clips }) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-5">
      <Panel title="Términos a evitar" subtitle="Vocabulario que resta autoridad o polariza">
        <ul className="divide-y divide-cream-200">
          {avoid.map((a, i) => (
            <li key={i} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="serif text-[17px] text-wine line-through">{a.term}</span>
              </div>
              <div className="text-[12.5px] text-navy-300 leading-relaxed">{a.why}</div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Clips antiguos sensibles" subtitle="Material reciclable por adversarios — preparación de respuesta">
        <div className="space-y-3">
          {clips.map((c, i) => (
            <Card key={i} className="p-4">
              <div className="serif text-[16px] text-navy mb-1">{c.title}</div>
              <div className="text-[12px] text-navy-300 mb-2">{c.context}</div>
              <div className="text-[12px] text-navy bg-cream-100 p-2 rounded border border-cream-300">
                <span className="smallcaps text-navy-300 mr-1">Estrategia</span> {c.response}
              </div>
            </Card>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Crisis({ crises }) {
  return (
    <div className="space-y-3">
      {crises.map((c, i) => (
        <Card key={i} className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="num text-[11px] text-navy-300">{c.date}</span>
            <h3 className="serif text-[20px] text-navy">{c.title}</h3>
          </div>
          <p className="text-[13px] text-navy mb-4">{c.handled}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-forest-50 border border-forest-100 rounded">
              <div className="smallcaps text-forest mb-1">Qué funcionó</div>
              <p className="text-[12.5px] text-navy">{c.worked}</p>
            </div>
            <div className="p-3 bg-wine-50 border border-wine-100 rounded">
              <div className="smallcaps text-wine mb-1">Qué no funcionó</div>
              <p className="text-[12.5px] text-navy">{c.didnt}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Worked({ items }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((w, i) => (
        <Card key={i} className="p-5">
          <Badge kind="OPORTUNIDAD" className="mb-3">Comprobada</Badge>
          <blockquote className="serif text-[19px] text-navy leading-snug border-l-2 border-forest pl-3 my-2 italic">
            {w.msg.split(" — ")[0]}
          </blockquote>
          <div className="text-[11px] text-navy-300 mb-3">{w.msg.split(" — ")[1]}</div>
          <div className="text-[11.5px] text-navy"><span className="smallcaps text-navy-300">Región</span><br/>{w.region}</div>
          <div className="text-[11.5px] text-navy mt-2"><span className="smallcaps text-navy-300">Audiencia</span><br/>{w.audience}</div>
        </Card>
      ))}
    </div>
  );
}

function Playbook({ steps }) {
  return (
    <div className="max-w-3xl">
      <Panel title="Playbook de crisis" subtitle="Cinco pasos institucionales — orden y propietario claros antes de actuar">
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-4 p-4 bg-cream-100 border border-cream-300 rounded">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${s.done ? "bg-forest text-cream-50" : "bg-cream-50 border border-brand-100 text-navy"}`}>
                {s.done ? <Icon name="check" size={16}/> : <span className="num text-[14px] font-semibold">{i+1}</span>}
              </div>
              <div className="flex-1">
                <div className={`text-[14px] ${s.done ? "text-navy-300 line-through" : "text-navy font-medium"}`}>{s.step}</div>
                <div className="text-[11px] text-navy-300 mt-0.5">{s.done ? "Completado en simulacro · 12 may" : "Pendiente — protocolo activo"}</div>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

window.MemoriaSection = MemoriaSection;
