// ===== MOCK DATA — ARCA · Alcaldía de Ica 2026 =====
const DATA = {
  brief: {
    date: "Miércoles 28 de mayo, 2026",
    priority: {
      title: "Crisis hídrica en La Tinguiña — 48 h sin agua — ventana de respuesta: próximas 4 horas",
      reasoning: "Detectamos 3,800 menciones en grupos de Facebook de Ica vinculando la crisis hídrica en La Tinguiña con inacción municipal. La conversación está escalando de grupos vecinales a cuentas de noticias locales. Un comunicado + presencia en territorio hoy antes de las 18:00 puede contener la narrativa antes de que llegue a Radio Ica.",
    },
    risks: [
      {
        title: "Video viral de calle anegada en Parcona — sin desagüe ni mantenimiento",
        platform: "TikTok",
        severity: "CRÍTICO",
        desc: "Vecino grabó su calle inundada el lunes; acumuló 42K vistas y está siendo compartido por páginas de noticias regionales. Narrativa: abandono municipal.",
        reach: "≈ 42,000 vistas",
      },
      {
        title: "Rival publica propuesta de asfaltado SJB con cifra específica",
        platform: "Facebook",
        severity: "MODERADO",
        desc: "Candidato APP publicó compromiso de S/. 8.2M en pistas para San Juan Bautista con cronograma. Alto engagement en electores 35–55.",
        reach: "≈ 18,000 alcance",
      },
      {
        title: "Columna en El Regional cuestiona viabilidad de la Oficina de Turismo",
        platform: "Prensa local",
        severity: "BAJO",
        desc: "Periodista cuestiona propuesta turística; eco bajo en redes hasta ahora.",
        reach: "≈ 4,200 lectores",
      },
    ],
    opportunities: [
      {
        title: "Aniversario de la Provincia de Ica — 17 de junio",
        type: "FECHA CÍVICA",
        desc: "Ciudadanos compartiendo fotos históricas de Ica. Ningún rival tomó el tema con propuesta concreta.",
        action: "Contenido de identidad iqueña + propuesta de recuperación del centro histórico",
      },
      {
        title: "Rival sin respuesta sobre crisis hídrica en La Tinguiña",
        type: "RIVAL EXPUESTO",
        desc: "El candidato APP no se pronunció sobre el agua en las últimas 12 horas. Ventana de 24 horas.",
        action: "Visita relámpago a La Tinguiña con propuesta de inversión en redes de agua",
      },
      {
        title: "Silencio temático: empleo juvenil en Ica",
        type: "SILENCIO TEMÁTICO",
        desc: "Ningún rival habla de oportunidades para jóvenes iqueños esta semana.",
        action: "Reel sobre propuesta de formación técnica con SENATI y empresas agroindustriales locales",
      },
      {
        title: "Temporada de vendimia — ventana de identidad iqueña",
        type: "TENDENCIA",
        desc: "Las festividades del pisco y la uva activan el orgullo iqueño. Alta receptividad a mensajes de identidad.",
        action: "Reel desde viñedos: Ica productora, Ica que también se administra bien",
      },
    ],
    actions: [
      { txt: "Visita relámpago a La Tinguiña — llegar antes del mediodía con equipo de prensa", impact: "ALTO", deadline: "Hoy 10:00" },
      { txt: "Comunicado agua La Tinguiña: familias afectadas + compromiso de inversión concreto", impact: "ALTO", deadline: "Antes 12:00" },
      { txt: "Reel en territorio La Tinguiña — primeros 3 seg: cifra de familias sin agua", impact: "ALTO", deadline: "Hoy 18:00" },
      { txt: "Contrarrestar video Parcona — no reactivar, publicar propuesta propia de desagüe", impact: "MEDIO", deadline: "Hoy 14:00" },
      { txt: "Coordinar visita a Parcona para mañana con dirigentes vecinales", impact: "MEDIO", deadline: "Hoy 16:00" },
      { txt: "Preparar contenido aniversario Ica — aprobación del equipo", impact: "BAJO", deadline: "Hoy 20:00" },
    ],
    metrics: [
      { label: "Momentum semanal", value: "61", suffix: "/100", trend: "↑", trendNote: "vs 58 la semana pasada", tone: "good" },
      { label: "Sentimiento positivo", value: "48", suffix: "%", trend: "↑", trendNote: "de menciones favorables · 24h", tone: "warn" },
      { label: "Alertas activas", value: "3", suffix: "", trend: "—", trendNote: "señales críticas detectadas", tone: "warn" },
      { label: "Contenido programado", value: "5", suffix: "", trend: "—", trendNote: "piezas esta semana", tone: "neutral" },
      { label: "Rivales en alerta", value: "2", suffix: "", trend: "↑", trendNote: "con actividad inusual", tone: "warn" },
      { label: "Cobertura distrital", value: "7", suffix: "/13", trend: "↑", trendNote: "distritos con acción en 15 días", tone: "neutral" },
    ],
  },

  signals: [
    {
      id: "s1",
      title: "Video viral de calle anegada en Parcona — vecinos exigen respuesta urgente",
      severity: "CRÍTICO",
      platforms: ["TikTok", "Facebook"],
      time: "hace 1 h 45 min",
      velocity: "CRECIENDO RÁPIDO",
      summary: "Un vecino de Parcona grabó su calle completamente inundada por desborde del desagüe el lunes por la tarde. El video acumula 42,000 vistas en TikTok y fue replicado por la página 'Parcona al Día' (Facebook, 28K seguidores). La narrativa apunta a abandono municipal y falta de mantenimiento preventivo.",
      origin: "Cuenta @vecinosdeparcona (TikTok, 8,400 seguidores) el lunes a las 15:20. Replicado por 9 páginas locales en 22 horas.",
      reach: "≈ 42,000 vistas totales · TikTok 58% · Facebook 38% · WhatsApp grupos 4%",
      audience: "68% entre 30–55 años · Parcona 71% · La Tinguiña 14% · resto de Ica 15% · mayoritariamente mujeres jefas de hogar",
      narrative: "\"Con lluvia el barrio es un lodazal. El Municipio solo viene cuando hay cámara.\"",
      risk: "ALTO si supera 80K vistas. La narrativa de abandono de Parcona es el tema con mayor potencial de daño: Parcona es el distrito más poblado y el más disputado electoralmente.",
      sources: [
        { label: "tiktok.com/@vecinosdeparcona/video/...", url: "#" },
        { label: "facebook.com/parconaaldía/posts/...", url: "#" },
        { label: "Grupos WhatsApp vecinales Parcona", url: "#" },
      ],
      links: ["s2"],
      tactic: "No responder al video directamente — refuerza el alcance. Publicar reel propio desde Parcona con propuesta específica de desagüe: kilómetros de red, inversión en soles, plazo. Visita presencial hoy o mañana es la única respuesta que funciona.",
    },
    {
      id: "s2",
      title: "Crisis hídrica La Tinguiña — 48 horas sin agua potable",
      severity: "CRÍTICO",
      platforms: ["Facebook", "WhatsApp"],
      time: "hace 3 h",
      velocity: "CRECIENDO",
      summary: "El grupo de Facebook 'Vecinos de La Tinguiña' (12,400 miembros) tiene un hilo activo desde la madrugada. Vecinos reportan 48 horas sin agua potable. Algunos ya pagaron camiones cisterna a precio de escasez. La conversación menciona a la Municipalidad Provincial como principal responsable.",
      origin: "Hilo iniciado por dirigente barrial en grupo de Facebook. Replicado en 3 grupos de WhatsApp con más de 200 miembros cada uno.",
      reach: "≈ 14,000 alcance directo · Facebook grupos 65% · WhatsApp 35%",
      audience: "Mayoría 35–65 años · mujeres 62% · La Tinguiña y zonas periféricas · alta sensibilidad al tema agua",
      narrative: "\"48 horas sin agua y pagando cisterna. Así estamos en La Tinguiña mientras las empresas agroexportadoras chupan el acuífero.\"",
      risk: "MUY ALTO si alcanza Radio Ica o Radio Luren (cubren temas virales de redes). El agua es la tensión política más profunda de la provincia.",
      sources: [
        { label: "facebook.com/groups/vecinosdelatingUIña/...", url: "#" },
        { label: "Grupos WhatsApp barrio Las Flores", url: "#" },
        { label: "Grupos WhatsApp barrio Villa Rica", url: "#" },
      ],
      links: ["s1"],
      tactic: "Visita presencial hoy antes de las 18:00. Primera declaración: número de familias afectadas + coordinación inmediata con EMAPICA. Segunda (72h): propuesta de inversión en redes con plazo concreto. Sin comunicado sin presencia.",
    },
    {
      id: "s3",
      title: "Rival publica propuesta asfaltado San Juan Bautista con cifra específica",
      severity: "MODERADO",
      platforms: ["Facebook", "Instagram"],
      time: "hace 6 h",
      velocity: "ESTABLE",
      summary: "El candidato de APP publicó un carrusel con plan de asfaltado para San Juan Bautista con inversión específica (S/. 8.2 millones) y cronograma de 18 meses. Alto engagement entre electores 35–55. Se está compartiendo activamente en grupos vecinales del distrito.",
      origin: "Publicación en fanpage del rival (42K seguidores) a las 08:30 del martes.",
      reach: "≈ 18,000 alcance · Facebook 82% · Instagram 18%",
      audience: "Mixto 35–55 · San Juan Bautista 58% · Subtanjalla 22% · otros 20%",
      narrative: "\"Por fin alguien que pone números. S/. 8.2 millones para nuestras calles — eso sí es propuesta.\"",
      risk: "MEDIO. Si no se responde con propuesta equivalente en 48h, la narrativa de 'propuesta concreta con cifras' queda dominada por el rival en un distrito disputado.",
      sources: [
        { label: "facebook.com/candidatoapp/posts/...", url: "#" },
        { label: "instagram.com/candidatoapp/...", url: "#" },
      ],
      links: [],
      tactic: "No responder directamente al rival. Publicar propuesta propia para San Juan Bautista con cifras iguales o mayores y cronograma más detallado. Acompañar con visita al distrito esta semana.",
    },
    {
      id: "s4",
      title: "Radio Ica menciona ausencia de candidatos en debate técnico sobre el acuífero",
      severity: "BAJO",
      platforms: ["Radio local"],
      time: "hace 10 h",
      velocity: "ESTABLE",
      summary: "El programa matinal de Radio Ica (audiencia estimada 35,000 oyentes) mencionó que varios candidatos no confirmaron asistencia al debate técnico sobre el acuífero organizado por la ONG Agua Para Ica. La mención fue neutral pero puede crecer si los rivales se posicionan.",
      origin: "Programa matinal Radio Ica, 07:15 del miércoles. Mención replicada en 2 grupos de Facebook locales.",
      reach: "≈ 35,000 oyentes directos",
      audience: "35–65 años · radioescuchas tradicionales · alta penetración en electores 50+ y zonas rurales de la provincia",
      narrative: "\"Los candidatos evitan hablar de agua con especialistas. Hablan en campaña pero no ante técnicos.\"",
      risk: "BAJO hoy. Se vuelve ALTO si el candidato rival confirma asistencia al debate y nosotros no.",
      sources: [
        { label: "Radio Ica — Programa matinal 07:15", url: "#" },
        { label: "facebook.com/radioicaoficial/...", url: "#" },
      ],
      links: [],
      tactic: "Confirmar asistencia al debate hoy. Llevar propuesta técnica preparada. La presencia en foro técnico construye credibilidad con electores 45+ y medios locales.",
    },
  ],

  // Provincia de Ica: 13 distritos. SVG path coords, viewBox "0 0 380 420".
  // Norte = arriba, Costa (Oeste) = izquierda, Andes (Este) = derecha.
  districts: [
    { id: "PNU", name: "Pueblo Nuevo",            s: 49, cx: 35,  cy: 42,  path: "M0,0 L70,0 L70,85 L0,85 Z" },
    { id: "TAT", name: "Tate",                    s: 50, cx: 142, cy: 42,  path: "M70,0 L215,0 L215,85 L70,85 Z" },
    { id: "SJM", name: "San José de los Molinos", s: 46, cx: 255, cy: 70,  path: "M215,0 L295,0 L295,140 L215,140 Z" },
    { id: "YAU", name: "Yauca del Rosario",        s: 42, cx: 337, cy: 210, path: "M295,0 L380,0 L380,420 L295,420 Z" },
    { id: "PAR", name: "Parcona",                 s: 52, cx: 55,  cy: 130, path: "M0,85 L110,85 L110,175 L0,175 Z" },
    { id: "SUB", name: "Subtanjalla",              s: 50, cx: 162, cy: 130, path: "M110,85 L215,85 L215,175 L110,175 Z" },
    { id: "PAC", name: "Pachacútec",               s: 44, cx: 255, cy: 205, path: "M215,140 L295,140 L295,270 L215,270 Z" },
    { id: "LAT", name: "La Tinguiña",              s: 48, cx: 35,  cy: 230, path: "M0,175 L70,175 L70,285 L0,285 Z" },
    { id: "SJB", name: "San Juan Bautista",        s: 54, cx: 112, cy: 225, path: "M70,175 L155,175 L155,275 L70,275 Z" },
    { id: "ICA", name: "Ica",                      s: 58, cx: 185, cy: 225, path: "M155,175 L215,175 L215,275 L155,275 Z" },
    { id: "LAQ", name: "Los Aquijes",              s: 53, cx: 255, cy: 345, path: "M215,270 L295,270 L295,420 L215,420 Z" },
    { id: "STG", name: "Santiago",                 s: 51, cx: 142, cy: 347, path: "M70,275 L215,275 L215,420 L70,420 Z" },
    { id: "SAL", name: "Salas",                    s: 47, cx: 35,  cy: 352, path: "M0,285 L70,285 L70,420 L0,420 Z" },
  ],

  districtDetail: {
    ICA: {
      score: 58, trend: "+2",
      concerns: ["Seguridad en el centro histórico y mercado central", "Comercio informal desordenado — ambulantes invaden vías", "Modernización del Mercado Central"],
      narrative: "\"El centro está abandonado. Los ambulantes invadieron todo y la Municipalidad aparece solo en fotos.\"",
      activeSignals: [],
      rivals: "Candidato empresarial activo en cámara de comercio · candidato APP con maquinaria en el centro",
      history: [52, 54, 56, 58],
      content: "Propuestas para el Mercado Central y centro histórico. Imagen de la Catedral y Plaza de Armas. Tono de recuperación, no de nostalgia.",
      events: ["17 jun — Aniversario Provincia de Ica", "Dic — Navidad en la Plaza de Armas"],
    },
    PAR: {
      score: 52, trend: "-2",
      concerns: ["Pistas sin asfaltar — más del 60% de vías sin pavimento", "Agua y desagüe deficiente — desborde frecuente", "Seguridad nocturna — robos al paso"],
      narrative: "\"Parcona financia con sus impuestos a toda la Municipalidad y recibe las migajas. Ya estamos hartos.\"",
      activeSignals: ["s1"],
      rivals: "Candidato local con fuerte base territorial en Parcona · distrito más disputado de la provincia",
      history: [58, 56, 54, 52],
      content: "Visita presencial urgente. Propuesta de asfaltado con mapa y cronograma. Inversión en soles concretos. Tono: Parcona primero.",
      events: ["Jul — Aniversario de Parcona", "Ago — Fiestas Patrias — desfile local"],
    },
    LAT: {
      score: 48, trend: "-4",
      concerns: ["Agua potable — crisis crónica (CRÍTICO)", "Saneamiento — pozos sépticos sin tratamiento", "Caminos rurales sin afirmar"],
      narrative: "\"Sin agua y con tierra en las calles. ¿Para qué sirve la Municipalidad aquí?\"",
      activeSignals: ["s2"],
      rivals: "Sin rival dominante · terreno ganable con propuesta de agua concreta y credible",
      history: [55, 52, 50, 48],
      content: "Compromisos específicos de redes de agua con fecha de inicio. Familias beneficiadas en números. Tono: reconocimiento del problema histórico + acción concreta.",
      events: ["Aniversario La Tinguiña — fecha variable", "Temporada de lluvias — emergencias"],
    },
    SUB: {
      score: 50, trend: "—",
      concerns: ["Agua potable irregular", "Residuos sólidos — puntos críticos de basura", "Falta de espacios recreativos para jóvenes"],
      narrative: "\"Somos el patio trasero de Ica. El recojo de basura llega cuando quiere, el agua también.\"",
      activeSignals: [],
      rivals: "Moderada presencia rival · tema de parques y áreas verdes sin dueño",
      history: [50, 51, 50, 50],
      content: "Reconocer el abandono histórico. Propuesta de parques y áreas verdes. Compromisos de agua. Tono: reparación de deuda histórica.",
      events: ["Aniversario Subtanjalla — fecha variable"],
    },
    SJB: {
      score: 54, trend: "+1",
      concerns: ["Pistas y veredas en mal estado — vías secundarias sin asfaltar", "Seguridad — robos al paso en horas nocturnas", "Servicios básicos irregulares"],
      narrative: "\"Las propuestas se escuchan bien aquí. La gente está dispuesta a creer si hay números y plazos.\"",
      activeSignals: ["s3"],
      rivals: "Rival APP publicó propuesta de asfaltado con cifra · distrito disputado con electorado receptivo",
      history: [51, 52, 53, 54],
      content: "Propuesta de infraestructura con cifras reales. Cronograma trimestral público. Vecino como veedor. Tono: técnico y directo.",
      events: ["Aniversario SJB — fecha variable", "Navidad — actividades vecinales"],
    },
    STG: {
      score: 51, trend: "—",
      concerns: ["Acceso vial a zonas rurales del distrito", "Agua potable en sectores alejados del centro", "Infraestructura educativa deteriorada"],
      narrative: "\"Santiago es grande pero nadie llega a los sectores más alejados. Solo atienden al centro.\"",
      activeSignals: [],
      rivals: "Actividad rival baja esta semana",
      history: [50, 51, 51, 51],
      content: "Contenido territorial con mención de localidades internas. Propuesta de conectividad rural. Tono: llegamos a donde otros no llegan.",
      events: ["Aniversario Santiago — julio", "Fiestas Patronales — fecha variable"],
    },
    SAL: {
      score: 47, trend: "-1",
      concerns: ["Conectividad vial — zona costera aislada del centro", "Agua y saneamiento críticos en sectores rurales", "Servicios básicos mínimos"],
      narrative: "\"Salas queda lejos pero existe. Nadie nos visita y menos nos considera en los presupuestos.\"",
      activeSignals: [],
      rivals: "Sin actividad rival significativa",
      history: [49, 48, 48, 47],
      content: "Visita presencial como diferenciador. Tono: compromiso de incluir lo excluido. Una propuesta concreta de acceso vial.",
      events: ["Aniversario Salas — fecha variable"],
    },
    TAT: {
      score: 50, trend: "+1",
      concerns: ["Residuos sólidos — basura acumulada en vía principal", "Agua y saneamiento", "Comercio informal en la carretera"],
      narrative: "\"Estamos en la carretera principal y así estamos. Si no fuera por eso, nadie vendría.\"",
      activeSignals: [],
      rivals: "Sin actividad rival significativa",
      history: [48, 49, 50, 50],
      content: "Propuesta de ordenamiento del comercio de carretera. Residuos sólidos con cronograma. Tono: tu ubicación es tu ventaja, no tu condena.",
      events: ["Aniversario Tate — fecha variable"],
    },
    PNU: {
      score: 49, trend: "—",
      concerns: ["Distancia al centro — abandono histórico", "Servicios básicos mínimos", "Empleo — alta dependencia de agricultura temporal"],
      narrative: "\"Pueblo Nuevo existe solo en el nombre. Por servicios, por todo, tenemos que ir hasta Ica.\"",
      activeSignals: [],
      rivals: "Sin actividad rival",
      history: [50, 50, 49, 49],
      content: "Presencia física como mayor diferenciador. Una propuesta concreta de conectividad. Tono: nadie los visita — nosotros sí.",
      events: ["Aniversario Pueblo Nuevo — fecha variable"],
    },
    SJM: {
      score: 46, trend: "-1",
      concerns: ["Aislamiento — acceso vial deficiente hacia la sierra", "Puesto de salud sin abastecimiento regular", "Agua potable irregular"],
      narrative: "\"San José de los Molinos queda en los Andes y para la Municipalidad podría estar en otro país.\"",
      activeSignals: [],
      rivals: "Sin actividad rival",
      history: [48, 47, 47, 46],
      content: "Visita en campo, reel desde el territorio. Propuesta de salud rural específica. Tono: llegamos al rincón que otros ignoran.",
      events: ["Festividades Patronales — fecha variable"],
    },
    PAC: {
      score: 44, trend: "-2",
      concerns: ["Infraestructura vial — caminos de herradura deteriorados", "Agua potable escasa — comunidades sin red", "Empleo rural sin oportunidades técnicas"],
      narrative: "\"Pachacútec tiene nombre de inca pero vive olvidado. El agua que sale de aquí no vuelve para nosotros.\"",
      activeSignals: [],
      rivals: "Sin actividad rival",
      history: [48, 46, 45, 44],
      content: "Propuesta rural con nombres de comunidades específicas. Tono: reparación histórica, no promesa vacía.",
      events: ["Festividades Patronales — fecha variable"],
    },
    LAQ: {
      score: 53, trend: "+1",
      concerns: ["Pistas y acceso vial a sectores rurales productivos", "Agua y saneamiento en zonas alejadas", "Apoyo técnico al productor agropecuario"],
      narrative: "\"Los Aquijes tiene buena tierra pero mal acceso. Si arreglan las pistas, el resto nos lo ganamos solos.\"",
      activeSignals: [],
      rivals: "Actividad rival baja",
      history: [50, 51, 52, 53],
      content: "Mensaje de apoyo al productor. Propuesta de pistas con cifras. Tono: facilitamos lo que ya hacen bien.",
      events: ["Cosecha de uva y espárragos — temporada variable"],
    },
    YAU: {
      score: 42, trend: "-3",
      concerns: ["Aislamiento extremo — el distrito más remoto de la provincia", "Servicios básicos prácticamente inexistentes", "Emigración de jóvenes — despoblamiento progresivo"],
      narrative: "\"Yauca del Rosario aparece en el mapa pero no en los presupuestos. La gente se va porque no hay nada.\"",
      activeSignals: [],
      rivals: "Sin actividad rival",
      history: [47, 45, 43, 42],
      content: "La visita presencial es el mayor diferenciador posible aquí. Una propuesta de puesto de salud o agua es suficiente para posicionarse. Tono: no te hemos olvidado.",
      events: ["Festividades Patronales — fecha variable"],
    },
  },

  districtDetailDefault: {
    score: 0, trend: "—",
    concerns: ["Servicios básicos deficientes", "Infraestructura vial deteriorada", "Abandono histórico"],
    narrative: "Sin narrativa dominante esta semana. Conversación dispersa entre temas locales.",
    activeSignals: [],
    rivals: "Actividad rival baja esta semana",
    history: [48, 49, 50, 50],
    content: "Contenido territorial con mención específica de localidades. Presencia física antes que comunicados.",
    events: ["Por confirmar — consultar agenda distrital"],
  },

  zoneNarratives: {
    URBANO: {
      theme: "Seguridad, servicios básicos y recuperación del centro histórico",
      angle: "Propuestas medibles con plazos. La ciudad que los iqueños merecen — sin improvisación.",
      tone: "Directo, técnico pero cercano. Mencionar la Plaza de Armas, el Mercado Central, Huacachina.",
      avoid: "Promesas vagas, comparaciones con Lima, lenguaje limeño",
    },
    PERIURBANO: {
      theme: "Agua, pistas y presencia municipal real en todos los distritos",
      angle: "Reconocer el abandono histórico. Obra pequeña terminada vale más que megaproyecto prometido.",
      tone: "Empático y directo. Visita física antes que comunicado. Mencionar el nombre del barrio, no solo el distrito.",
      avoid: "Generalidades, cifras sin fuente, paternalismo",
    },
    ANDINO: {
      theme: "Conectividad, salud rural y agua en comunidades remotas",
      angle: "La sola presencia del candidato es un mensaje. Propuesta de al menos una obra visible por comunidad.",
      tone: "Respetuoso, presencial, sin tecnicismos. Ropa de campo, no terno.",
      avoid: "Prometer obras que requieren presupuesto regional, cifras irreales, ausencia física",
    },
  },

  calendar: [
    { day: "LUN", date: "25", posts: [
      { plat: "FB", fmt: "Carrusel", topic: "Propuesta agua La Tinguiña", status: "Publicado", time: "19:00", reach: 8200, eng: "4.1%", caption: "4,200 familias de La Tinguiña llevan años esperando agua potable garantizada. Nuestra propuesta con fecha de inicio y plazo de 180 días.", visual: "5 slides tipo infografía: problema, cifra, propuesta, inversión, plazo", hashtags: ["#PorElAguaDeIca", "#LaTinguiña", "#Ica2026"], sentiment: "positive" },
    ]},
    { day: "MAR", date: "26", posts: [
      { plat: "IG", fmt: "Reel", topic: "Visita Parcona", status: "Publicado", time: "17:30", reach: 12400, eng: "5.8%", caption: "Parcona tiene el 60% de sus calles sin asfaltar. Estuvimos escuchando. Esto es lo que prometemos.", visual: "Reel desde la calle sin asfaltar — primeros 3 seg: dato impactante en pantalla grande", hashtags: ["#ParconaExige", "#Ica2026", "#AlcaldíaDeIca"], sentiment: "positive" },
      { plat: "FB", fmt: "Post", topic: "BTS Parcona", status: "Publicado", time: "20:00", reach: 4100, eng: "—", caption: "Detrás de cámaras de nuestra visita a Parcona — equipo escuchando en cada cuadra.", visual: "Fotos del recorrido con vecinos", hashtags: [], sentiment: "positive" },
    ]},
    { day: "MIÉ", date: "27", posts: [
      { plat: "IG", fmt: "Reel", topic: "Crisis agua La Tinguiña", status: "Programado", time: "16:00", caption: "Hoy estamos en La Tinguiña. 48 horas sin agua. Esto es lo que haremos.", visual: "Reel en territorio — cámara directa, sin producción, primeros 3 seg: dato en pantalla", hashtags: ["#PorElAguaDeIca", "#LaTinguiña"] },
      { plat: "FB", fmt: "Post", topic: "Propuesta SJB", status: "Borrador", time: "—", caption: "San Juan Bautista merece una propuesta con número: S/. 9.4 millones en pistas y veredas en 24 meses. Cronograma en la web.", visual: "Imagen con mapa del distrito y cifra destacada", hashtags: ["#Ica2026", "#SanJuanBautista"] },
    ]},
    { day: "JUE", date: "28", posts: [
      { plat: "IG", fmt: "Reel", topic: "Debate técnico agua — ONG", status: "Programado", time: "12:00", caption: "Hoy en el debate sobre el acuífero. Porque el agua de Ica se discute con datos, no con discursos.", visual: "Reel previo y posterior al debate — muestra presencia real", hashtags: ["#PorElAguaDeIca", "#IcaVotaBien"] },
    ]},
    { day: "VIE", date: "29", posts: [
      { plat: "FB", fmt: "Carrusel", topic: "Propuesta seguridad Ica", status: "Programado", time: "19:00", caption: "Cámaras, serenazgo articulado y plan barrio seguro. 100 días para que Ica sienta la diferencia.", visual: "Carrusel con 5 medidas concretas de seguridad ciudadana", hashtags: ["#IcaSegura", "#Ica2026"] },
    ]},
    { day: "SÁB", date: "30", posts: [] },
    { day: "DOM", date: "31", posts: [
      { plat: "IG", fmt: "Carrusel", topic: "Semana en imágenes", status: "Borrador", time: "—", caption: "Una semana en territorio. La Tinguiña, Parcona, San Juan Bautista — el que busca, encuentra.", visual: "Resumen fotográfico de la semana en los distritos, paleta uniforme", hashtags: [] },
    ]},
  ],

  bank: [
    { topic: "Visita Parcona", plat: "IG", fmt: "Reel", date: "26 may", reach: 12400, eng: "5.8%", status: "Publicado", sentiment: "positive", caption: "El 60% de las calles de Parcona sin asfaltar — eso cambia en nuestro gobierno." },
    { topic: "Propuesta agua La Tinguiña", plat: "FB", fmt: "Carrusel", date: "25 may", reach: 8200, eng: "4.1%", status: "Publicado", sentiment: "positive", caption: "4,200 familias de La Tinguiña, 180 días para el cambio." },
    { topic: "Huacachina — turismo", plat: "IG", fmt: "Reel", date: "20 may", reach: 18700, eng: "6.2%", status: "Publicado", sentiment: "positive", caption: "Huacachina es de los iqueños. Que los ingresos vuelvan al vecino, no al tour operador de Lima." },
    { topic: "Seguridad Parcona", plat: "FB", fmt: "Post", date: "18 may", reach: 5900, eng: "3.4%", status: "Publicado", sentiment: "mixed", caption: "El serenazgo y la PNP tienen que trabajar juntos en Ica — hoy no lo hacen." },
    { topic: "Día de la Madre", plat: "IG", fmt: "Historia", date: "11 may", reach: 7200, eng: "—", status: "Publicado", sentiment: "positive", caption: "Para las madres de Ica que sostienen el hogar cuando el agua no llega y la calle está rota." },
    { topic: "Propuesta pistas SJB", plat: "FB", fmt: "Carrusel", date: "—", reach: 0, eng: "—", status: "Borrador", sentiment: "—", caption: "S/. 9.4 millones en pistas para San Juan Bautista. Con cronograma público y vecino veedor." },
  ],

  memoria: {
    positions: [
      { topic: "Agua y saneamiento", stance: "Auditar y regular el uso del acuífero con mesa técnica Municipalidad-ANA-empresas en 30 días. Garantizar agua potable en los 13 distritos con inversión en redes domiciliarias y reservorios. Plazo: 180 días para los distritos más críticos.", emphasis: ["El agua es de los iqueños primero", "Inversión en redes, no en promesas", "Mesa técnica con resultados en 180 días"], avoid: ["Prometer 'recuperar el acuífero' (imposible en un período municipal)", "Atacar directamente a agroexportadoras (son el mayor empleador)", "Tecnicismos hídricos sin traducción al ciudadano"] },
      { topic: "Seguridad ciudadana", stance: "Articulación real entre serenazgo municipal y PNP con mando coordinado. Cámaras en zonas críticas con sala de monitoreo 24/7. Plan barrio seguro con 100 días de acción visible en Parcona, La Tinguiña y zonas críticas.", emphasis: ["Autoridad con resultados medibles", "Cámaras, patrullaje y resultados en 100 días", "Reuniones vecinales mensuales con el alcalde"], avoid: ["'Mano dura' sin matices", "Promesas de 'erradicar la delincuencia'", "Comparaciones con Lima"] },
      { topic: "Residuos sólidos", stance: "Reforma del servicio de limpieza con cronograma por distrito. Nuevo contrato de gestión con indicadores públicos y penalidades. Recojo diferenciado en toda la provincia. Prioridad: distritos periféricos que hoy no reciben servicio regular.", emphasis: ["Cada distrito con recojo 3 veces por semana", "Indicadores públicos en la web municipal", "Periférico primero — el centro ya tiene"], avoid: ["Atacar gestiones anteriores sin propuesta alternativa", "Cifras sin fuente verificable"] },
      { topic: "Turismo — Huacachina", stance: "Crear la Oficina de Turismo Municipal de Ica con presupuesto propio. Concesión ordenada de actividades recreativas. Fondo de reinversión turística para los distritos. Huacachina como orgullo provincial, no como botín.", emphasis: ["Que el turismo beneficie a las familias iqueñas", "Gestión ordenada, no improvisación", "Reinversión local de los ingresos turísticos"], avoid: ["Prometer obras en Huacachina sin coordinación con el gobierno regional", "Cifras de turistas sin mencionar impacto en el bolsillo local"] },
      { topic: "Infraestructura vial", stance: "Plan de pavimentación de vías secundarias con cronograma trimestral público. Prioridad: Parcona, La Tinguiña, San Juan Bautista. Vecino como veedor en cada obra.", emphasis: ["Cronograma en la web, vecino como veedor", "Obra pequeña terminada vale más que megaobra prometida", "Prioridad a los distritos más postergados"], avoid: ["Plazos imposibles", "Prometer obras que requieren presupuesto del gobierno regional"] },
    ],
    plan: [
      { sector: "Agua y saneamiento", proposals: ["Mesa técnica Municipalidad-ANA-empresas en 30 días", "Redes domiciliarias La Tinguiña y Subtanjalla en 180 días", "Auditoría del acuífero con resultados públicos"] },
      { sector: "Seguridad", proposals: ["Sala de monitoreo 24/7 con 120 cámaras en zonas críticas", "Articulación serenazgo-PNP con mando coordinado único", "Plan barrio seguro 100 días — Parcona, La Tinguiña, centro"] },
      { sector: "Residuos sólidos", proposals: ["Cronograma de recojo por distrito — 3 veces por semana garantizadas", "Contrato con indicadores públicos y penalidades por incumplimiento", "Puntos de reciclaje diferenciado en zonas urbanas"] },
      { sector: "Turismo", proposals: ["Oficina de Turismo Municipal con presupuesto propio el primer año", "Concesión ordenada de actividades recreativas en Huacachina", "Fondo de reinversión turística para familias locales"] },
      { sector: "Infraestructura", proposals: ["500 cuadras asfaltadas en el primer año — prioridad Parcona y SJB", "Cronograma trimestral público con veedor vecinal por obra", "3 vías rurales afirmadas en distritos andinos en 24 meses"] },
    ],
    avoid: [
      { term: "'Pueblo' (uso genérico)", why: "Suena populista; preferir 'ciudadanos de Ica', 'vecinos de Parcona', 'familias de La Tinguiña'." },
      { term: "'Mano dura'", why: "Polariza sin ganar votos independientes; reemplazar por 'autoridad con resultados'." },
      { term: "'Luchar contra'", why: "Lenguaje de conflicto; reemplazar por 'trabajar por' o 'resolver'." },
      { term: "'Modelo de gestión'", why: "Abstracto; hablar de obras, servicios, personas concretas." },
      { term: "'Prometo' (sin cifra ni plazo)", why: "Siempre acompañado de número y fecha: 'me comprometo a X en Y días'." },
      { term: "'El agua es un derecho' (sin acción)", why: "Verdad pero vacía sin propuesta concreta. En Ica suena a evasión." },
      { term: "'Casta política'", why: "Resta seriedad; no entrar en ese marco discursivo." },
    ],
    crises: [
      { date: "Crisis tipo 1", title: "Acusación de no ser de Ica / ser 'de fuera'", handled: "Historia personal concreta en la provincia. Sin defensiva.", worked: "Nombrar el barrio, la calle, la escuela donde creció. El detalle geográfico cierra la duda.", didnt: "Respuesta genérica 'conozco Ica' sin anclaje específico — abre más preguntas." },
      { date: "Crisis tipo 2", title: "¿Qué hiciste antes por Ica?", handled: "Lista de acciones concretas previas. Nunca responder con promesas futuras a esta pregunta.", worked: "Citar trabajo previo, gestión comunitaria o trayectoria profesional concreta.", didnt: "Hablar de propuestas futuras cuando preguntan por antecedentes — desacredita." },
      { date: "Crisis tipo 3", title: "Ataque por posición sobre agua y agroexportadoras", handled: "El agua para consumo humano es primero. La agroindustria también necesita agua planificada. No son enemigos — necesitan ordenarse juntos.", worked: "Tono técnico y ecuánime. No ataca ni cede. Propone mesa técnica con plazo.", didnt: "Atacar directamente a agroexportadoras — son el mayor empleador de la provincia." },
      { date: "Crisis tipo 4", title: "'Otro más que va a robar'", handled: "Entender la desconfianza antes de responder. Proponer mecanismo de transparencia específico: presupuesto en línea, obra con veedor ciudadano, rendición mensual.", worked: "La propuesta concreta de transparencia, no la defensa propia.", didnt: "Indignarse por la acusación — aumenta la percepción de que hay algo que ocultar." },
      { date: "Crisis tipo 5", title: "Emergencia climática — lluvias, inundaciones en distritos", handled: "Presencia física en zona afectada en menos de 24 horas. Primera declaración: cifras de afectados + acción inmediata. Segunda (72h): propuesta estructural.", worked: "La llegada física antes de las 24 horas. El comunicado solo nunca funciona en Ica.", didnt: "Comunicado sin presencia — se lee como tibieza." },
    ],
    clips: [
      { title: "Cita descontextualizada sobre agua y empresas agroexportadoras", context: "Extracto editado de entrevista anterior presentado como defensa de las empresas.", response: "No responder al clip. Publicar pieza nueva con la posición completa: agua humana primero + mesa técnica." },
      { title: "Ausencia en actividad distrital", context: "Foto o video de evento donde el candidato no fue, usado como evidencia de desinterés.", response: "Mostrar agenda real del mismo día. Sin polemizar — contranarrar con contenido propio de esa fecha." },
    ],
    workedNarratives: [
      { msg: "'4,200 familias en La Tinguiña llevan años esperando agua — en 180 días esto cambia'", region: "La Tinguiña, Subtanjalla", audience: "35–65 años, alta sensibilidad al tema agua" },
      { msg: "'Parcona paga impuestos y recibe las migajas. Eso se termina'", region: "Parcona", audience: "Electores 30–55, tema infraestructura y abandono" },
      { msg: "'Huacachina es de los iqueños, no del tour operador de Lima'", region: "Ica distrito, jóvenes", audience: "18–40 años, identidad iqueña y turismo" },
    ],
    playbook: [
      { step: "Detectar y clasificar la señal en menos de 60 minutos", done: true },
      { step: "Alinear vocería única — un solo mensaje, un solo portavoz", done: true },
      { step: "Publicar pieza contextual sin reactivar el ataque original", done: false },
      { step: "Activar respuesta distrital segmentada si la crisis es local", done: false },
      { step: "Reunión post-mortem en 48 horas para documentar aprendizaje", done: false },
    ],
  },

  sentiment: {
    topics: [
      { name: "Agua",         vol: 100, pos: 18, neu: 22, neg: 60, trend: "↑", quote: "48 horas sin agua y pagando cisterna. Esto no puede seguir así en pleno 2026." },
      { name: "Seguridad",    vol: 82,  pos: 25, neu: 32, neg: 43, trend: "↑", quote: "De noche no se puede salir. Nadie hace nada." },
      { name: "Pistas",       vol: 71,  pos: 30, neu: 28, neg: 42, trend: "↑", quote: "Con lluvia el barrio de Parcona es un lodazal. Hace años que piden la pista." },
      { name: "Propuestas",   vol: 58,  pos: 55, neu: 32, neg: 13, trend: "↑", quote: "Las propuestas suenan bien pero quiero ver cifras y plazos, no discurso." },
      { name: "Turismo",      vol: 45,  pos: 62, neu: 28, neg: 10, trend: "→", quote: "Huacachina lleno de turistas y el iqueño igual de pobre. Algo está mal." },
      { name: "Basura",       vol: 64,  pos: 20, neu: 30, neg: 50, trend: "↑", quote: "En Tate y Los Aquijes la basura acumulada es un escándalo. Al centro sí van." },
      { name: "Empleo joven", vol: 38,  pos: 48, neu: 35, neg: 17, trend: "→", quote: "Aquí no hay futuro para los jóvenes. Terminas el colegio y te tienes que ir a Lima." },
      { name: "Corrupción",   vol: 52,  pos: 18, neu: 30, neg: 52, trend: "→", quote: "Todos dicen lo mismo y al final todos roban. A ver si este es diferente." },
    ],
    timeline: [
      { d: "L 18", s: 50 }, { d: "M 19", s: 52 }, { d: "M 20", s: 51 },
      { d: "J 21", s: 54, ev: "Visita Parcona" }, { d: "V 22", s: 56 }, { d: "S 23", s: 53 },
      { d: "D 24", s: 55 }, { d: "L 25", s: 58, ev: "Propuesta agua" }, { d: "M 26", s: 60 },
      { d: "M 27", s: 54, ev: "Crisis La Tinguiña" },
    ],
    topConvos: [
      { topic: "Crisis hídrica en La Tinguiña — 48h sin agua potable", origin: "Facebook · grupos vecinales La Tinguiña", sentiment: "negativo", status: "Activa", related: "s2" },
      { topic: "Video viral calle anegada Parcona — abandono municipal", origin: "TikTok · cuentas de vecinos locales", sentiment: "negativo", status: "Activa", related: "s1" },
      { topic: "Propuesta rival de asfaltado en San Juan Bautista", origin: "Facebook · fanpage candidato APP", sentiment: "mixto", status: "Activa", related: "s3" },
      { topic: "Aniversario de Ica — 17 de junio", origin: "Facebook · páginas de historia y cultura iqueña", sentiment: "positivo", status: "Creciendo", related: null },
      { topic: "Huacachina sin gestión turística profesional", origin: "TikTok · cuentas de turismo y viajes", sentiment: "mixto", status: "Estable", related: null },
    ],
  },

  rivals: [
    { id: "APP", name: "Candidato Alianza para el Progreso", party: "APP",            activity: "MUY ACTIVO",  lastPost: "hace 2 h",   topic: "Infraestructura", eng: "↑ 18%", threat: "HIGH",   initials: "APP" },
    { id: "FP",  name: "Ex-funcionario Municipal",           party: "Fuerza Popular", activity: "MODERADO",   lastPost: "hace 7 h",   topic: "Seguridad",       eng: "↑ 8%",  threat: "MEDIUM", initials: "FP" },
    { id: "SP",  name: "Candidato Empresarial",              party: "Somos Perú",     activity: "MODERADO",   lastPost: "hace 5 h",   topic: "Turismo",         eng: "→ 2%",  threat: "MEDIUM", initials: "SP" },
    { id: "MR",  name: "Candidato Independiente Local",      party: "Mov. Regional",  activity: "INACTIVO",   lastPost: "hace 2 d",   topic: "Empleo local",    eng: "↓ 5%",  threat: "LOW",    initials: "MR" },
  ],

  rivalTimeline: [
    { rival: "APP", plat: "FB",  fmt: "Carrusel", caption: "S/. 8.2 millones en pistas para San Juan Bautista. Con cronograma y rendición de cuentas. Esto es propuesta concreta.", eng: "18.4K · 4.8% engagement", tag: "PROPUESTA", time: "hace 2 h" },
    { rival: "FP",  plat: "IG",  fmt: "Reel",     caption: "Serenazgo reforzado en Parcona — porque la seguridad no espera. Nuestro plan de los primeros 100 días.", eng: "9.2K · 2.8%", tag: "PROPUESTA", time: "hace 7 h" },
    { rival: "SP",  plat: "FB",  fmt: "Post",     caption: "Huacachina merece gestión profesional. Presentamos nuestro plan de turismo sostenible para Ica.", eng: "6.8K · 2.1%", tag: "POSICIONAMIENTO", time: "hace 5 h" },
    { rival: "APP", plat: "IG",  fmt: "Reel",     caption: "Mientras otros hablan de agua, nosotros ya tenemos el expediente técnico listo. Así se hace gestión.", eng: "22.1K · 5.6%", tag: "ATAQUE DIRECTO", time: "hace 1 d" },
    { rival: "FP",  plat: "FB",  fmt: "Carrusel", caption: "Cuatro años en la gestión municipal me dan la experiencia que Ica necesita para avanzar.", eng: "7.1K · 2.4%", tag: "POSICIONAMIENTO", time: "hace 1 d" },
    { rival: "MR",  plat: "FB",  fmt: "Post",     caption: "El empleo local de Ica depende de fortalecer nuestra identidad productiva agropecuaria.", eng: "1.8K · 1.2%", tag: "CONTENIDO", time: "hace 2 d" },
  ],

  rivalProfileRLA: {
    posts: [
      { fmt: "Carrusel", topic: "Propuesta pistas SJB",       eng: "18.4K · 4.8%", desc: "S/. 8.2M con cronograma detallado y fotos de campo previas",      date: "hace 2 h" },
      { fmt: "Reel",     topic: "Ataque propuesta agua",       eng: "22.1K · 5.6%", desc: "Menciona expediente técnico propio como diferenciador clave",      date: "hace 1 d" },
      { fmt: "Post",     topic: "Visita mercado central Ica",  eng: "14.2K · 3.9%", desc: "Recorrido con comerciantes formales del Mercado Central",          date: "hace 2 d" },
      { fmt: "Carrusel", topic: "Seguridad Parcona",           eng: "12.8K · 3.2%", desc: "10 slides con plan de cámaras y coordinación serenazgo-PNP",      date: "hace 3 d" },
      { fmt: "Reel",     topic: "Día de la Madre",             eng: "19.4K · 5.8%", desc: "Foto con madre iqueña — mensaje emotivo, alto engagement",         date: "hace 16 d" },
      { fmt: "Post",     topic: "Visita San Juan Bautista",    eng: "8.2K · 2.4%",  desc: "Reunión con dirigentes vecinales del distrito",                    date: "hace 4 d" },
      { fmt: "Carrusel", topic: "Plan de gobierno resumen",    eng: "6.4K · 1.9%",  desc: "Resumen de propuestas por sector — bajo engagement",              date: "hace 5 d" },
      { fmt: "Reel",     topic: "Crítica a gestión saliente",  eng: "11.8K · 3.4%", desc: "Confrontacional, cámara directa, sin nombrarlo",                   date: "hace 6 d" },
    ],
    topics: { Infraestructura: 32, Seguridad: 18, Ataques: 22, Propuestas: 20, Emocional: 8 },
    tone: "Técnico con destellos confrontacionales. Usa cifras como armamento narrativo.",
    keywords: [["pistas", 14], ["inversión", 12], ["propuesta", 11], ["Parcona", 10], ["agua", 9], ["cronograma", 8], ["Ica", 18], ["gestión", 7]],
    heatmap: (() => {
      const m = [];
      for (let d = 0; d < 7; d++) {
        const row = [];
        for (let h = 0; h < 24; h++) {
          let v = 0;
          if (h >= 7 && h <= 9)   v = 0.6 + Math.random() * 0.4;
          else if (h >= 18 && h <= 21) v = 0.7 + Math.random() * 0.3;
          else if (h >= 12 && h <= 13) v = 0.3 + Math.random() * 0.3;
          else v = Math.random() * 0.2;
          if (d >= 5) v *= 0.5;
          row.push(v);
        }
        m.push(row);
      }
      return m;
    })(),
    formats: [
      { fmt: "Carrusel", avg: "14.8K", count: 10 },
      { fmt: "Reel",     avg: "16.2K", count: 12 },
      { fmt: "Post",     avg: "9.4K",  count: 18 },
      { fmt: "Historia", avg: "—",     count: 6 },
    ],
    audience: "35–60 años · Parcona 34% · San Juan Bautista 22% · Ica distrito 24% · resto de la provincia 20%",
    vulnerabilities: [
      "Bajo engagement cuando habla de turismo y Huacachina (1.9% vs 4.8% promedio)",
      "Comentarios negativos frecuentes vinculando su partido con gestión nacional cuestionada",
      "Audiencia joven 18–30 prácticamente ausente en su engagement orgánico",
    ],
    opportunities: [
      "Ocupar el espacio de turismo y empleo juvenil — terrenos donde su narrativa es débil",
      "Contrastar el desgaste nacional de su partido con una propuesta técnica independiente",
      "Capitalizar la desconfianza hacia partidos con maquinaria — enfatizar candidatura técnica",
    ],
  },

  matrix: {
    cols: ["NOSOTROS", "APP", "Fuerza Pop.", "Somos Perú", "Mov. Regional"],
    rows: [
      { label: "Frecuencia (posts/sem)", values: ["12", "14", "8", "6", "3"], best: 1 },
      { label: "Engagement promedio",    values: ["4.8%", "3.9%", "2.6%", "2.1%", "1.2%"], best: 0 },
      { label: "Tema dominante semana",  values: ["Agua", "Infraestr.", "Seguridad", "Turismo", "Empleo"], best: null, raw: true },
      { label: "Plataforma más fuerte",  values: ["Instagram", "Facebook", "Facebook", "Facebook", "Facebook"], best: null, raw: true },
      { label: "Momentum semanal",       values: ["61", "58", "44", "38", "28"], best: 0 },
      { label: "Nivel de amenaza",       values: ["—", "ALTO", "MEDIO", "MEDIO", "BAJO"], best: null, raw: true },
    ],
    gaps: [
      "APP publica 14 posts/semana vs nuestros 12 — igualar frecuencia aumentaría visibilidad",
      "Ningún rival posiciona empleo juvenil esta semana — ventana abierta para ocupar el tema",
      "APP tiene bajo engagement en turismo (1.9%) — diferenciación clara en Huacachina",
    ],
  },

  ticker: [
    "La Tinguiña · grupo FB: '48 horas sin agua y nadie viene. ¿Dónde está el candidato?' · hace 4 min",
    "Parcona · TikTok: video calle anegada supera 42K vistas · hace 9 min",
    "Radio Ica · mención al debate técnico sobre el acuífero esta semana · hace 12 min",
    "San Juan Bautista · vecinos comparten propuesta de pistas del rival APP · hace 17 min",
    "Subtanjalla · grupo WhatsApp: 'El recojo de basura no vino esta semana otra vez' · hace 23 min",
    "Huacachina · TikTok: turistas comparten fotos del oasis — 280K visualizaciones en 48h · hace 31 min",
    "Parcona · mención positiva de propuesta de cámaras y serenazgo · hace 36 min",
    "Ica · vecinos organizando preparativos para el aniversario del 17 de junio · hace 42 min",
  ],
};

window.DATA = DATA;
