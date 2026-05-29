// ===== APP ROOT =====
const { useState: appUseState } = React;

const SECTION_LABELS = {
  brief:       "Informe del día",
  radar:       "Radar de reputación",
  mapa:        "Mapa distrital",
  sim:         "Simulador de narrativa",
  contenido:   "Sala de contenido",
  memoria:     "Memoria estratégica",
  territorio:  "Territorio distrital",
  sentimiento: "Tendencias en Ica",
  rivales:     "Inteligencia competitiva",
};

function App() {
  const [section, setSection] = appUseState("brief");
  const [signalId, setSignalId] = appUseState(null);
  const [pendingFromRadar, setPendingFromRadar] = appUseState(null);
  const [tallerOpen, setTallerOpen] = appUseState(false);

  const signal = signalId ? window.DATA.signals.find(s => s.id === signalId) : null;

  function openSignal(id) {
    setSignalId(id);
  }
  function closeSignal() {
    setSignalId(null);
  }
  function goRadar() {
    setSection("radar");
    setPendingFromRadar(null);
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <TopBar
        section={SECTION_LABELS[section]}
        alertsActive={3}
        pending={7}
      />

      <div className="flex">
        <Sidebar section={section} setSection={(k) => { setSection(k); setSignalId(null); }}/>

        <main className="flex-1 min-w-0 pb-[60px]">
          {section === "brief" && <BriefSection openSignal={(id) => { setSection("radar"); setPendingFromRadar(id); setTimeout(() => openSignal(id), 50); }} goRadar={goRadar}/>}
          {section === "radar" && <RadarSection openSignal={openSignal} initialSignalId={pendingFromRadar}/>}
          {section === "mapa"  && <MapaSection/>}
          {section === "sim"   && <SimuladorSection/>}
          {section === "contenido" && <ContenidoSection/>}
          {section === "memoria"   && <MemoriaSection/>}
          {section === "territorio" && <LegadoSection/>}
          {section === "sentimiento" && <SentimientoSection openSignal={(id) => { setSection("radar"); setPendingFromRadar(id); setTimeout(() => openSignal(id), 50); }}/>}
          {section === "rivales" && <InteligenciaSection/>}
        </main>
      </div>

      <FloatingButton onClick={() => setTallerOpen(true)}/>
      <Ticker items={window.DATA.ticker}/>

      <SignalDrawer signal={signal} onClose={closeSignal} openSignal={openSignal}/>
      <TallerModal open={tallerOpen} onClose={() => setTallerOpen(false)}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
