// ===== SECTION 5: SALA DE CONTENIDO =====
const { useState: cnUseState } = React;

function ContenidoSection() {
  const [tab, setTab] = cnUseState("CAL"); // CAL | BANK | DRAFT
  const cal = window.DATA.calendar;
  const bank = window.DATA.bank;

  return (
    <div className="p-6 space-y-5 fade-up">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="serif text-[28px] text-navy leading-tight">Sala de contenido</h1>
          <p className="text-[13px] text-navy-300 mt-1">Calendario semanal, banco de piezas publicadas y borradores activos.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md">Importar de simulador</Button>
          <Button variant="primary" size="md" icon={<Icon name="plus" size={14}/>}>Nueva pieza</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-cream-300">
        {[
          { k: "CAL",   l: "Calendario semanal", n: cal.flatMap(d => d.posts).length },
          { k: "BANK",  l: "Banco de contenido", n: bank.length },
          { k: "DRAFT", l: "Borradores", n: 3 },
        ].map(t => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-4 py-2.5 text-[13px] border-b-2 transition-colors ${
              tab === t.k ? "border-brand text-navy font-medium" : "border-transparent text-navy-300 hover:text-navy"
            }`}
          >
            {t.l} <span className="num text-[11px] text-navy-300">({t.n})</span>
          </button>
        ))}
      </div>

      {tab === "CAL" && <Calendar/>}
      {tab === "BANK" && <Bank/>}
      {tab === "DRAFT" && <Drafts/>}
    </div>
  );
}

function Calendar() {
  const cal = window.DATA.calendar;
  return (
    <div className="grid grid-cols-7 gap-2">
      {cal.map((day, di) => (
        <div key={di} className={`bg-cream-50 border border-cream-300 rounded-lg overflow-hidden ${di === 2 ? "ring-2 ring-wine/40" : ""}`}>
          <div className={`px-3 py-2 border-b border-cream-300 ${di === 2 ? "bg-wine text-cream-50" : "bg-cream-100"}`}>
            <div className="flex items-baseline justify-between">
              <span className={`smallcaps ${di === 2 ? "text-cream-100" : "text-navy-300"}`}>{day.day}</span>
              <span className={`num text-[18px] font-semibold ${di === 2 ? "text-cream-50" : "text-navy"}`}>{day.date}</span>
            </div>
          </div>
          <div className="p-2 min-h-[280px] flex flex-col gap-2">
            {day.posts.length === 0 ? (
              <button className="flex-1 placeholder-stripes rounded text-[11px] text-navy-300 hover:bg-cream-100 inline-flex items-center justify-center">
                <Icon name="plus" size={14}/>
              </button>
            ) : day.posts.map((p, pi) => <PostCardSmall key={pi} post={p}/>)}
            {day.posts.length > 0 && (
              <button className="placeholder-stripes rounded text-[11px] text-navy-300 hover:bg-cream-100 inline-flex items-center justify-center py-1">
                <Icon name="plus" size={12}/>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PostCardSmall({ post }) {
  const isPub = post.status === "Publicado";
  return (
    <div className={`rounded p-2 border ${isPub ? "bg-cream-50 border-cream-300" : post.status === "Programado" ? "bg-brand-50/50 border-brand-100" : "bg-cream-100 border-cream-300"}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <PlatformBadge p={post.plat}/>
        <span className="text-[10px] text-navy-300">{post.fmt}</span>
        <span className="text-[10px] text-navy-300 ml-auto num">{post.time}</span>
      </div>
      <div className="text-[12px] text-navy font-medium leading-tight mb-1.5">{post.topic}</div>
      <div className="text-[10px] text-navy-300 line-clamp-2 leading-snug mb-2">{post.caption}</div>
      <Badge kind={post.status}/>
      {isPub && (
        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-navy-300 num">
          <span>{(post.reach/1000).toFixed(1)}K</span><span>·</span><span>{post.eng}</span>
        </div>
      )}
    </div>
  );
}

function Bank() {
  const bank = window.DATA.bank;
  return (
    <div className="bg-cream-50 border border-cream-300 rounded-lg shadow-panel overflow-hidden">
      <div className="px-5 py-3 border-b border-cream-300 flex items-center justify-between bg-cream-100">
        <div className="flex items-center gap-2">
          {["Todos","Publicado","Borrador","Reels","Carruseles"].map((f, i) => (
            <button key={f} className={`smallcaps px-2.5 py-1 rounded ${i===0 ? "bg-brand-300 text-navy" : "text-navy-300 hover:bg-cream-200"}`}>{f}</button>
          ))}
        </div>
        <div className="text-[11px] text-navy-300 num">{bank.length} piezas</div>
      </div>
      <table className="w-full text-[13px]">
        <thead className="bg-cream-100 text-navy-300">
          <tr>
            <th className="text-left px-5 py-2 smallcaps">Pieza</th>
            <th className="text-left px-3 py-2 smallcaps">Plataforma</th>
            <th className="text-left px-3 py-2 smallcaps">Formato</th>
            <th className="text-left px-3 py-2 smallcaps">Fecha</th>
            <th className="text-right px-3 py-2 smallcaps">Alcance</th>
            <th className="text-right px-3 py-2 smallcaps">Engagement</th>
            <th className="text-left px-3 py-2 smallcaps">Sentimiento</th>
            <th className="text-left px-3 py-2 smallcaps">Estado</th>
            <th className="text-right px-5 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
          {bank.map((b, i) => (
            <tr key={i} className="hover:bg-cream-100">
              <td className="px-5 py-3">
                <div className="text-navy font-medium leading-snug">{b.topic}</div>
                <div className="text-[11px] text-navy-300 line-clamp-1">{b.caption}</div>
              </td>
              <td className="px-3"><PlatformBadge p={b.plat}/></td>
              <td className="px-3 text-navy-300">{b.fmt}</td>
              <td className="px-3 text-navy-300 num">{b.date}</td>
              <td className="px-3 text-right text-navy num">{b.reach ? b.reach.toLocaleString("es-PE") : "—"}</td>
              <td className="px-3 text-right text-navy num">{b.eng}</td>
              <td className="px-3">
                {b.sentiment !== "—" && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: b.sentiment === "positive" ? "#2D5A27" : b.sentiment === "mixed" ? "#D4A847" : "#8B1A2E" }}/>
                    <span className="text-[12px] text-navy">{b.sentiment === "positive" ? "Positivo" : b.sentiment === "mixed" ? "Mixto" : "Negativo"}</span>
                  </span>
                )}
              </td>
              <td className="px-3"><Badge kind={b.status}/></td>
              <td className="px-5 text-right"><button className="text-navy-300 hover:text-navy"><Icon name="menu" size={16}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Drafts() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { topic: "Reel economía juvenil — 3 medidas", plat: "IG", fmt: "Reel", updated: "hace 12 min", from: "Simulador" },
        { topic: "Carrusel salud rural — sierra norte v2", plat: "FB", fmt: "Carrusel", updated: "hace 1 h", from: "Editor manual" },
        { topic: "Post Chosica — visita jueves", plat: "FB", fmt: "Post", updated: "hace 2 h", from: "Plantilla" },
      ].map((d, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <PlatformBadge p={d.plat}/>
            <span className="text-[10px] text-navy-300">{d.updated}</span>
          </div>
          <div className="placeholder-stripes rounded mb-3" style={{ height: 120 }}/>
          <div className="serif text-[16px] text-navy leading-snug mb-1">{d.topic}</div>
          <div className="text-[11px] text-navy-300 mb-3">{d.fmt} · originado en {d.from}</div>
          <div className="flex gap-1.5">
            <Button variant="primary" size="sm" className="flex-1 justify-center">Continuar</Button>
            <Button variant="ghost" size="sm"><Icon name="trash" size={13}/></Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

window.ContenidoSection = ContenidoSection;
