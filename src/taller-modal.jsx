// ===== TALLER DE NARRATIVA — Floating modal =====
const { useState: tmUseState, useEffect: tmUseEffect } = React;

function TallerModal({ open, onClose }) {
  const [stage, setStage] = tmUseState("INPUT"); // INPUT | THINKING | RESULT
  const [prompt, setPrompt] = tmUseState("Generar respuesta a la crisis hídrica en La Tinguiña sin confrontar directamente a las agroexportadoras");
  const [thinking, setThinking] = tmUseState([]);

  const thinkingSteps = [
    { label: "Consultando memoria estratégica...", note: "Encontrado: posición sobre agua · 4 declaraciones previas alineadas" },
    { label: "Revisando crisis pasadas...", note: "Crisis tipo 5 — emergencia sin presencia física, contexto similar" },
    { label: "Cruzando con sentimiento ciudadano...", note: "Agua: tema más sensible de la provincia · 60% sentimiento negativo activo" },
    { label: "Analizando radar de señales...", note: "2 señales CRÍTICAS activas · La Tinguiña y Parcona · convergencia territorial" },
    { label: "Verificando posiciones de rivales...", note: "Rival APP sin pronunciamiento en 12 horas · ventana de 24h abierta" },
    { label: "Calibrando tono territorial...", note: "Zona URBANO · audiencia 35-65 · sensibilidad agua máxima" },
    { label: "Generando narrativa contextualizada...", note: "Reel en territorio + comunicado técnico · presencia antes que palabras" },
  ];

  function start() {
    setStage("THINKING");
    setThinking([]);
    let i = 0;
    const tick = () => {
      const item = thinkingSteps[i]; // capturar por valor antes del i++ para evitar stale closure en React 18
      i++;
      if (item) setThinking(prev => [...prev, item]);
      if (i < thinkingSteps.length) setTimeout(tick, 380);
      else setTimeout(() => setStage("RESULT"), 500);
    };
    setTimeout(tick, 220);
  }

  tmUseEffect(() => {
    if (open) {
      setStage("INPUT");
      setThinking([]);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} width={960}>
      {/* Header */}
      <header className="px-6 py-4 border-b border-cream-300 flex items-center justify-between bg-cream-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-wine text-cream-50 flex items-center justify-center">
            <Icon name="plus" size={18}/>
          </div>
          <div>
            <h2 className="serif text-[20px] text-navy leading-tight">Taller de narrativa</h2>
            <div className="text-[11px] text-navy-300">Pensamiento estratégico en tiempo real — integra memoria, sentimiento y radar distrital</div>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-navy">
          <Icon name="close" size={16}/>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {stage === "INPUT" && (
          <div className="p-7 space-y-5">
            <div>
              <div className="smallcaps text-navy-300 mb-2">¿Qué necesitas resolver?</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full text-[14px] bg-cream-100 border border-cream-300 rounded p-3 leading-relaxed focus:outline-none focus:border-brand-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="smallcaps text-navy-300 mb-2">Sugerencias rápidas</div>
                <div className="space-y-1.5">
                  {[
                    "Responder a crisis hídrica en La Tinguiña sin atacar a las empresas",
                    "Contrarrestar propuesta rival de asfaltado en San Juan Bautista",
                    "Crear mensaje para visita al aniversario de Ica del 17 de junio",
                    "Generar contraste sobre turismo en Huacachina — identidad iqueña",
                    "Mensaje de empleo juvenil para jóvenes que quieren irse de Ica",
                  ].map(s => (
                    <button key={s} onClick={() => setPrompt(s)} className="block w-full text-left text-[12.5px] text-navy hover:bg-cream-100 rounded px-2 py-1.5">
                      → {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="smallcaps text-navy-300 mb-2">Contexto activo</div>
                  <div className="space-y-1.5 text-[12px]">
                    <Toggle on label="Memoria estratégica" detail="5 temas, 7 posiciones, 5 crisis tipo"/>
                    <Toggle on label="Radar actual" detail="4 señales activas — 2 CRÍTICAS"/>
                    <Toggle on label="Sentimiento ciudadano" detail="últimos 30 días — 13 distritos"/>
                    <Toggle on label="Inteligencia territorial" detail="perfiles de los 13 distritos de Ica"/>
                    <Toggle label="Conversaciones internas" detail="reuniones de equipo — últimas 2 semanas"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-cream-200 flex justify-between items-center">
              <div className="text-[11px] text-navy-300">El taller consulta todas las fuentes activas antes de generar.</div>
              <Button variant="wine" size="lg" onClick={start} icon={<Icon name="arrow" size={14}/>}>Iniciar pensamiento</Button>
            </div>
          </div>
        )}

        {stage === "THINKING" && (
          <div className="p-7">
            <div className="smallcaps text-navy-300 mb-1">Consultando fuentes estratégicas — ARCA</div>
            <h3 className="serif text-[22px] text-navy mb-6">"{prompt}"</h3>
            <ul className="space-y-3">
              {thinking.map((t, i) => (
                <li key={i} className="flex items-start gap-3 fade-up">
                  <div className="w-6 h-6 rounded-full bg-forest text-cream-50 flex items-center justify-center shrink-0">
                    <Icon name="check" size={13}/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] text-navy font-medium">{t.label}</div>
                    <div className="text-[11.5px] text-navy-300">{t.note}</div>
                  </div>
                </li>
              ))}
              {thinking.length < thinkingSteps.length && (
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-brand animate-pulse"/>
                  </div>
                  <div className="text-[14px] text-navy-300">{thinkingSteps[thinking.length]?.label}</div>
                </li>
              )}
            </ul>
          </div>
        )}

        {stage === "RESULT" && <TallerResult prompt={prompt}/>}
      </div>

      {stage === "RESULT" && (
        <footer className="px-6 py-4 border-t border-cream-300 bg-cream-100 flex items-center justify-between">
          <Button variant="ghost" size="md" icon={<Icon name="regen" size={14}/>} onClick={() => setStage("INPUT")}>Re-trabajar</Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="md" icon={<Icon name="save" size={14}/>}>Guardar como borrador</Button>
            <Button variant="primary" size="md">Enviar a Sala de contenido</Button>
            <Button variant="wine" size="md">Publicar ahora</Button>
          </div>
        </footer>
      )}
    </Modal>
  );
}

function Toggle({ label, detail, on }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-cream-100 border border-cream-300 rounded">
      <span className={`w-8 h-4 rounded-full flex items-center transition-colors ${on ? "bg-forest justify-end" : "bg-cream-300 justify-start"}`}>
        <span className="w-3 h-3 rounded-full bg-cream-50 mx-0.5 shadow"/>
      </span>
      <div className="flex-1">
        <div className="text-[12px] text-navy">{label}</div>
        <div className="text-[10px] text-navy-300">{detail}</div>
      </div>
    </div>
  );
}

function TallerResult({ prompt }) {
  return (
    <div className="p-7 space-y-5">
      <div>
        <div className="smallcaps text-navy-300 mb-1">Respuesta generada — ARCA</div>
        <h3 className="serif text-[20px] text-navy mb-2">Estrategia: presencia primero, propuesta técnica después</h3>
        <p className="text-[13.5px] text-navy leading-relaxed">
          Basado en el perfil de la crisis hídrica (señal s2 activa) y el patrón documentado de crisis tipo 5, la respuesta requiere <strong>presencia física hoy antes de las 18:00</strong>. El comunicado sin presencia se lee como tibieza en La Tinguiña. La posición sobre agua evita atacar a las agroexportadoras (son el mayor empleador) y propone mesa técnica con plazo concreto — esto ocupa el espacio sin abrir un frente innecesario.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-cream-100 border border-cream-300 rounded">
          <div className="smallcaps text-navy-300 mb-2">Reel en territorio — 28 seg máx.</div>
          <p className="text-[13px] text-navy leading-relaxed">
            "Hoy estoy en La Tinguiña. 4,200 familias llevan 48 horas sin agua potable. Lo primero que haremos: coordinar con EMAPICA hoy. Lo que sigue: redes domiciliarias en 180 días. El agua de Ica es de los iqueños primero."
          </p>
          <div className="flex items-center gap-2 mt-3 text-[10px] text-navy-300 num">
            <span>Tono: presencial</span><span>·</span><span>Audiencia: 35-65</span><span>·</span><span>Riesgo: bajo</span>
          </div>
        </div>
        <div className="p-4 bg-cream-100 border border-cream-300 rounded">
          <div className="smallcaps text-navy-300 mb-2">Comunicado escrito — Facebook</div>
          <p className="text-[13px] text-navy leading-relaxed">
            Slide 1: cifra de familias afectadas. Slide 2: acción inmediata (hoy). Slide 3: compromiso de redes en 180 días. Slide 4: mecanismo de rendición de cuentas. Sin atacar empresas — proponer mesa técnica Municipalidad-ANA-sector productivo.
          </p>
          <div className="flex items-center gap-2 mt-3 text-[10px] text-navy-300 num">
            <span>Tono: técnico</span><span>·</span><span>Audiencia: 35-60</span><span>·</span><span>Riesgo: bajo</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-brand-300 text-navy rounded">
        <div className="smallcaps text-cream-100/60 mb-2">Por qué funciona</div>
        <ul className="space-y-1.5 text-[12.5px]">
          <li className="flex gap-2"><Icon name="check" size={13} className="mt-0.5 shrink-0"/>Presencia física cierra la narrativa de inacción antes de que llegue a radio</li>
          <li className="flex gap-2"><Icon name="check" size={13} className="mt-0.5 shrink-0"/>No ataca a las agroexportadoras — evita crear un frente con el mayor empleador</li>
          <li className="flex gap-2"><Icon name="check" size={13} className="mt-0.5 shrink-0"/>Propone mesa técnica con plazo — ocupa el espacio de solución sin prometer lo imposible</li>
          <li className="flex gap-2"><Icon name="check" size={13} className="mt-0.5 shrink-0"/>Deja al rival APP sin respuesta — ventana de contraste de 24 horas</li>
        </ul>
      </div>

      <div>
        <div className="smallcaps text-navy-300 mb-2">Riesgos residuales</div>
        <ul className="space-y-1 text-[12.5px] text-navy">
          <li className="flex gap-2"><Icon name="bell" size={13} className="mt-0.5 text-amber2 shrink-0"/>Si la visita no ocurre hoy, el comunicado solo amplifica la narrativa de inacción</li>
          <li className="flex gap-2"><Icon name="bell" size={13} className="mt-0.5 text-amber2 shrink-0"/>Radio Ica podría pedir declaración — confirmar disponibilidad para entrevista telefónica</li>
        </ul>
      </div>
    </div>
  );
}

window.TallerModal = TallerModal;
