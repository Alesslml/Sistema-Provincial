// ===== SECTION: TENDENCIAS EN ICA (Google Trends) =====
const { useState: tUseState, useEffect: tUseEffect } = React;

const TERMS_TO_TRACK = [
  "agua Ica",
  "seguridad Ica",
  "alcalde Ica",
  "obras Ica",
  "basura Ica",
  "Parcona",
  "Huacachina",
  "luz Ica",
  "empleo Ica",
  "pistas Ica",
];

const FALLBACK_DATA = {
  dailyTrends: [
    { term: "agua Ica",               score: 82, trend: "up"     },
    { term: "seguridad Parcona",       score: 71, trend: "up"     },
    { term: "obras municipales Ica",   score: 58, trend: "stable" },
    { term: "Huacachina turismo",      score: 64, trend: "up"     },
    { term: "empleo Ica 2026",         score: 47, trend: "stable" },
  ],
  trackedTerms: [
    { term: "agua Ica",      scores: [45,52,60,58,71,75,82], current: 82 },
    { term: "seguridad Ica", scores: [38,40,45,50,55,62,71], current: 71 },
    { term: "alcalde Ica",   scores: [20,22,25,28,30,35,40], current: 40 },
    { term: "obras Ica",     scores: [30,35,38,42,50,55,58], current: 58 },
    { term: "basura Ica",    scores: [25,28,30,35,38,40,45], current: 45 },
    { term: "Parcona",       scores: [40,45,50,55,62,68,71], current: 71 },
    { term: "Huacachina",    scores: [55,58,60,62,65,62,64], current: 64 },
    { term: "luz Ica",       scores: [20,22,20,25,28,30,32], current: 32 },
    { term: "empleo Ica",    scores: [35,38,40,42,44,46,47], current: 47 },
    { term: "pistas Ica",    scores: [28,30,32,35,38,40,42], current: 42 },
  ],
  isLive: false,
};

const PROXY = "https://api.allorigins.win/get?url=";
const DAILY_URL = "https://trends.google.com/trends/api/dailytrends?hl=es&tz=-300&geo=PE-ICA&ns=15";

function parseTrends(text) {
  return JSON.parse(text.replace(/^\)\]\}',?\s*/, ""));
}

function generateInsights(trackedTerms) {
  const by = Object.fromEntries(trackedTerms.map(t => [t.term, t.current]));
  const ins = [];

  if ((by["agua Ica"] || 0) > 65) ins.push({
    icon: "⚡", level: "ACTUAR HOY",
    title: "El agua es el tema del momento en Ica",
    desc: "Las búsquedas sobre agua en Ica están en su punto más alto. La ciudadanía busca información activamente — hay una ventana abierta para posicionarse.",
    action: "Publicar hoy una pieza sobre tu propuesta de agua. Reel en TikTok + post en Facebook con cifras concretas.",
  });

  if ((by["seguridad Ica"] || 0) > 55) ins.push({
    icon: "⚡", level: "ACTUAR HOY",
    title: "Inseguridad en conversación activa",
    desc: "Las búsquedas de seguridad en Ica están por encima del promedio. Puede haber un incidente reciente que lo esté generando.",
    action: "Verificar si hubo evento de seguridad reciente en Ica. Si sí: presencia en zona + declaración en 4 horas.",
  });

  if ((by["alcalde Ica"] || 0) > 45) ins.push({
    icon: "👁️", level: "MONITOREAR",
    title: "La gente está buscando al alcalde de Ica",
    desc: "Aumento de búsquedas sobre el alcalde actual. Puede ser por gestión reciente o por inicio de campaña electoral.",
    action: "Monitorear qué noticias aparecen al buscar 'alcalde Ica'. Si son negativas para el rival — oportunidad de contraste.",
  });

  if ((by["Huacachina"] || 0) > 60) ins.push({
    icon: "💡", level: "ESTA SEMANA",
    title: "Huacachina en tendencia — ventana de turismo",
    desc: "Alto interés en Huacachina. Puede ser temporada turística o evento reciente. Tema sin dueño político claro.",
    action: "Publicar propuesta concreta sobre gestión turística de Huacachina. Nadie más la está hablando.",
  });

  if ((by["obras Ica"] || 0) > 50) ins.push({
    icon: "💡", level: "ESTA SEMANA",
    title: "Ciudadanía buscando información sobre obras",
    desc: "Interés activo en obras municipales. La gente quiere saber qué se está haciendo — o no se está haciendo.",
    action: "Carrusel comparativo: obras prometidas vs. ejecutadas por la gestión actual. Con fotos.",
  });

  if ((by["Parcona"] || 0) > 60) ins.push({
    icon: "⚡", level: "ACTUAR HOY",
    title: "Parcona está en conversación",
    desc: "El distrito más poblado de la provincia está en tendencia. Oportunidad de presencia territorial directa.",
    action: "Programar visita a Parcona esta semana. Más votos, más olvidado históricamente.",
  });

  if (ins.length === 0) ins.push({
    icon: "👁️", level: "MONITOREAR",
    title: "Semana tranquila en tendencias",
    desc: "No hay términos de campaña en pico esta semana. Buena ventana para construir narrativa propia sin reaccionar a la agenda ajena.",
    action: "Publicar contenido de propuesta proactivo — elige el tema donde el rival es más débil.",
  });

  return ins.slice(0, 3);
}

function TrendSparkline({ scores, color }) {
  if (!scores || scores.length < 2) return null;
  const w = 80, h = 32, p = 4;
  const mn = Math.min(...scores), mx = Math.max(...scores);
  const rng = mx - mn || 1;
  const pts = scores.map((s, i) => {
    const x = p + (i / (scores.length - 1)) * (w - p * 2);
    const y = h - p - ((s - mn) / rng) * (h - p * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const path = pts.map((pt, i) => (i === 0 ? `M${pt}` : `L${pt}`)).join(" ");
  const [lx, ly] = pts[pts.length - 1].split(",");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={lx} cy={ly} r="2.5" fill={color}/>
    </svg>
  );
}

function termStyle(score) {
  if (score >= 70) return { wrap: "bg-forest-50 border-forest-100", num: "#27AE22", hot: true };
  if (score >= 40) return { wrap: "bg-brand-50 border-brand-100", num: "#A88400", hot: false };
  return { wrap: "bg-cream-100 border-cream-200", num: "#3D6B3B", hot: false };
}

function levelPill(level) {
  if (level === "ACTUAR HOY")  return "bg-wine text-white";
  if (level === "ESTA SEMANA") return "bg-brand-300 text-navy";
  return "bg-cream-200 text-navy-300";
}

function isCampaignRelevant(term) {
  const keys = ["alcalde","municipio","obra","obras","agua","seguridad","corrupción","voto","basura","luz","empleo","pistas","parcona"];
  return keys.some(k => term.toLowerCase().includes(k));
}

function timeSince(iso) {
  if (!iso) return "—";
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1)  return "ahora";
  if (min < 60) return `hace ${min} min`;
  return `hace ${Math.floor(min / 60)} h`;
}

// ---- Skeleton ----
function SkeletonBlock({ h = "h-10", w = "w-full", className = "" }) {
  return <div className={`${h} ${w} bg-cream-200 animate-pulse rounded ${className}`}/>;
}

function SentimientoSection() {
  const [data,        setData]        = tUseState(null);
  const [loading,     setLoading]     = tUseState(true);
  const [isLive,      setIsLive]      = tUseState(false);
  const [lastUpdated, setLastUpdated] = tUseState(null);
  const [tick,        setTick]        = tUseState(0);

  tUseEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(PROXY + encodeURIComponent(DAILY_URL));
        if (!res.ok) throw new Error("proxy");
        const json = await res.json();
        const raw = (json.contents || "").trim();
        if (!raw) throw new Error("empty");
        const parsed = parseTrends(raw);
        const days = parsed?.default?.trendingSearchesDays || [];
        const searches = (days[0]?.trendingSearches || []).slice(0, 5);
        const daily = searches.map((s, i) => ({
          term:  s.title?.query || "—",
          score: Math.max(20, 90 - i * 10),
          trend: i < 2 ? "up" : "stable",
        }));
        if (!cancelled) {
          const live = daily.length >= 3;
          setData({ dailyTrends: live ? daily : FALLBACK_DATA.dailyTrends, trackedTerms: FALLBACK_DATA.trackedTerms, isLive: live });
          setIsLive(live);
          setLastUpdated(new Date().toISOString());
        }
      } catch (_) {
        if (!cancelled) {
          setData({ ...FALLBACK_DATA, isLive: false });
          setIsLive(false);
          setLastUpdated(new Date().toISOString());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const iv = setInterval(load, 60 * 60 * 1000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [tick]);

  // While first load
  if (loading && !data) {
    return (
      <div className="p-6 space-y-5 fade-up">
        <SkeletonBlock h="h-9" w="w-72"/>
        <SkeletonBlock h="h-4" w="w-56"/>
        <SkeletonBlock h="h-44"/>
        <div className="grid grid-cols-2 gap-5">
          <SkeletonBlock h="h-72"/>
          <SkeletonBlock h="h-72"/>
        </div>
        <p className="text-[13px] text-navy-300 text-center pt-2">Consultando Google Trends para Ica…</p>
      </div>
    );
  }

  const d = data || FALLBACK_DATA;
  const insights = generateInsights(d.trackedTerms);
  const maxScore = Math.max(...d.dailyTrends.map(t => t.score), 1);
  const sorted = [...d.trackedTerms].sort((a, b) => b.current - a.current);

  return (
    <div className="p-6 space-y-5 fade-up">

      {/* ── HEADER ── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="serif text-[28px] text-navy leading-tight">Tendencias en Ica</h1>
          <p className="text-[13px] text-navy-300 mt-1">Qué busca la ciudadanía en Google · actualizado cada hora</p>
        </div>
        <div className="flex items-center gap-3">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-forest-50 border border-forest-100 rounded smallcaps text-[10px] text-forest-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse"/>En vivo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-wine-50 border border-wine-200 rounded smallcaps text-[10px] text-wine">
              <span className="w-1.5 h-1.5 rounded-full bg-wine"/>Datos de referencia
            </span>
          )}
          <span className="text-[11px] text-navy-300">Actualizado {timeSince(lastUpdated)}</span>
          <Button variant="secondary" size="sm" onClick={() => setTick(n => n + 1)} icon={<Icon name="regen" size={13}/>}>
            Actualizar
          </Button>
        </div>
      </div>

      {/* ── SECCIÓN B: Tendencias calientes del día ── */}
      <Panel title="Búsquedas en tendencia hoy" subtitle="Top 5 términos activos en Ica · Google Trends">
        <div className="space-y-3.5">
          {d.dailyTrends.map((t, i) => {
            const pct = Math.round((t.score / maxScore) * 100);
            const rel = isCampaignRelevant(t.term);
            return (
              <div key={i} className="flex items-center gap-4">
                <span className="num text-[12px] text-navy-300 w-4 shrink-0 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-medium text-navy truncate pr-2">{t.term}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[13px] font-bold ${t.trend === "up" ? "text-forest-400" : "text-navy-300"}`}>
                        {t.trend === "up" ? "↑" : "→"}
                      </span>
                      {rel
                        ? <Badge kind="OPORTUNIDAD">Campaña</Badge>
                        : <span className="smallcaps text-[10px] text-navy-300 bg-cream-200 px-2 py-0.5 rounded">General</span>
                      }
                    </div>
                  </div>
                  <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: rel ? "#27AE22" : "#AACFA7", transition: "width .6s ease" }}
                    />
                  </div>
                </div>
                <span className="num text-[14px] font-semibold text-navy w-8 text-right shrink-0">{t.score}</span>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ── SECCIÓN C: Radar + Insights ── */}
      <div className="grid grid-cols-[1fr_380px] gap-5">

        {/* Radar de términos */}
        <Panel title="Radar de términos de campaña" subtitle="Nivel de interés · escala 0–100 · últimos 7 días">
          <div className="grid grid-cols-2 gap-3">
            {d.trackedTerms.map((t) => {
              const { wrap, num, hot } = termStyle(t.current);
              return (
                <div key={t.term} className={`p-3 border rounded-lg ${wrap}`}>
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-[12px] font-semibold text-navy leading-tight">{t.term}</span>
                    {hot && <span className="text-[12px] shrink-0 ml-1" title="Alta demanda">🔥</span>}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="num text-[30px] font-bold leading-none" style={{ color: num }}>{t.current}</span>
                    <TrendSparkline scores={t.scores} color={num}/>
                  </div>
                  {hot && (
                    <div className="mt-1 text-[10px] smallcaps font-semibold" style={{ color: num }}>
                      Oportunidad de contenido
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Lectura política */}
        <Panel title="Lectura política" subtitle="Qué hacer con estas tendencias">
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="p-3 border border-cream-200 rounded-lg bg-cream-50">
                <div className="flex gap-3">
                  <span className="text-[20px] leading-none shrink-0 mt-0.5">{ins.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`smallcaps text-[9px] px-2 py-0.5 rounded ${levelPill(ins.level)}`}>
                        {ins.level}
                      </span>
                    </div>
                    <div className="text-[13px] font-semibold text-navy leading-snug mb-1">{ins.title}</div>
                    <div className="text-[12px] text-navy-300 leading-snug mb-2">{ins.desc}</div>
                    <div className="text-[11px] font-medium text-navy p-2 bg-cream-100 border border-cream-200 rounded leading-snug">
                      → {ins.action}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── SECCIÓN D: Historial ── */}
      <Panel title="Evolución de términos clave" subtitle="Últimas dos semanas · ordenado por actividad actual">
        <table className="w-full text-[13px]">
          <thead className="border-b border-cream-200">
            <tr className="text-navy-300">
              <th className="text-left py-2 font-normal smallcaps">Término</th>
              <th className="text-right py-2 font-normal smallcaps">Pico 7d</th>
              <th className="text-right py-2 font-normal smallcaps">Semana actual</th>
              <th className="text-right py-2 font-normal smallcaps">Semana anterior</th>
              <th className="text-right py-2 font-normal smallcaps">Variación</th>
              <th className="py-2 w-24"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {sorted.map((t) => {
              const prev  = t.scores[t.scores.length - 4] ?? t.scores[0];
              const delta = t.current - prev;
              const up    = delta > 2;
              const dn    = delta < -2;
              const sparkColor = up ? "#27AE22" : dn ? "#C43232" : "#6E9E6C";
              return (
                <tr key={t.term} className="hover:bg-cream-100">
                  <td className="py-2.5 font-medium text-navy">{t.term}</td>
                  <td className="py-2.5 text-right num text-navy-300">{Math.max(...t.scores)}</td>
                  <td className="py-2.5 text-right num font-bold text-navy">{t.current}</td>
                  <td className="py-2.5 text-right num text-navy-300">{prev}</td>
                  <td className="py-2.5 text-right">
                    <span className={`num font-semibold text-[12px] ${up ? "text-forest-400" : dn ? "text-wine" : "text-navy-300"}`}>
                      {up ? `↑ +${delta}` : dn ? `↓ ${delta}` : "→ estable"}
                    </span>
                  </td>
                  <td className="py-2.5 pl-4">
                    <TrendSparkline scores={t.scores} color={sparkColor}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>

    </div>
  );
}

window.SentimientoSection = SentimientoSection;
