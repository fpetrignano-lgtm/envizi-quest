"use client";

import { useEffect, useState } from "react";
type Language = "it" | "en";
type Profile = "marco" | "luisa";
type Screen = "cover" | "welcome" | "onboarding" | "intro" | "approach" | "questIntro" | "approachIntro" | "approachSteps" | "approachData" | "approachDecisions" | "approachRoadmap" | "approachTrust" | "approachReport" | "separatorNext" | "companySetup" | "missions" | "roadmapPreview" | "chapterOneSummary" | "esgStrategist" | "introCopy" | "introCopy2" | "company" | "priorities" | "approachDataCopy" | "priorityData" | "priorityMatrix" | "bridge" | "briefing" | "missionIntro" | "asis" | "dataFoundation" | "dfConclusion" | "dfSummary" | "decision" | "compare" | "tobe" | "trust" | "negative" | "success" | "milestone" | "reportingFoundation" | "reportingConclusion" | "energyFoundation" | "energyConclusion" | "supplyFoundation" | "supplyConclusion" | "planningFoundation" | "planningConclusion" | "frameworkFoundation" | "frameworkConclusion" | "summary" | "nextStep" | "thankYou";
type Market = "italia" | "europa" | "mondo";
type EsgReadiness = "primi" | "consolidamento" | "decisioni";
type SectorKey = "manifatturiero"|"bancario"|"assicurativo"|"utilities"|"distribuzione"|"farmaceutico"|"sanitario"|"logistico"|"alberghiero"|"telecomunicazioni"|"trasporti"|"costruzioni"|"immobiliare"|"media"|"tecnologico"|"pa"|"universitario"|"nonprofit";
type Priority = "credit" | "compliance" | "customers" | "efficiency" | "supply" | "reputation";
type Outcome = "positive" | "warning" | "critical";

const copy = {
  it: {
    formTitleUpdated:"Un beneficio rapido, ma limitato.", formTextUpdated:"I form standardizzano l'inserimento e riducono alcuni errori rispetto all'AS-IS. Restano però attività manuali, solleciti e fonti scollegate: con la crescita dei volumi il vantaggio si stabilizza e non scala.", impactUpdated:"Variazione rispetto all'AS-IS attuale · 12 mesi dopo", asIsTitleUpdated:"Nessun passo avanti.", asIsTextUpdated:"Mantenere l'AS-IS lascia invariati qualità dei dati e tempi di reporting, con un livello di fiducia del CdA che resta basso. Il costo della scelta è rinunciare ai benefici e rimandare la trasformazione.",
    successTextUpdated:"Envizi permette di alimentare i dati con template Excel e form semplici per gli utenti, guidati da workflow, e di integrare progressivamente le fonti dati esterne, come bollette delle utilities e fatture di acquisto, e interne, come ERP, HR e Asset Management; automatizza controlli e normalizzazioni e crea una traccia verificabile, riducendo tempi ed errori.",
    efcLabel:"OLTRE 40.000 FATTORI DI EMISSIONE ENVIZI", efcByMission:[
      "Associati automaticamente a bollette, acquisti, viaggi, rifiuti, consumi di gas e asset produttivi.",
      "Abbinati alle letture dei contatori e alle voci di bolletta elettrica, gas e teleriscaldamento.",
      "Applicati agli acquisti per categoria GHG Protocol, dalle materie prime al trasporto upstream.",
      "Utilizzati nei calcoli Scope 1–2 e in tutte le categorie Scope 3 rendicontate nei framework.",
      "Alla base dei modelli di abatement: ogni scenario calcola la CO₂e evitata per iniziativa.",
      "Integrati direttamente nei calcoli richiesti dai framework ESRS, GRI, SASB e CDP per la disclosure delle emissioni."
    ],
    boardQuoteLabel:"Voce del CdA",
    boardQuotes:[
      {positive:"Finalmente possiamo presentare una baseline ESG verificabile. È la base su cui costruire tutto il resto.",warning:"I form migliorano l'ordine, ma non la tracciabilità. Il CdA chiederà comunque le evidenze originali.",critical:"Rimandare significa rinunciare alla credibilità del dato per un altro anno. Non è una posizione sostenibile."},
      {positive:"I dati energetici strutturati dimostrano che stiamo investendo nella decarbonizzazione, non solo dichiarandola.",warning:"Un cruscotto manuale è un passo avanti, ma non genera gli alert e le azioni che il COO si aspetta.",critical:"Senza analisi sui contatori, gli sprechi continuano e non abbiamo nulla da mostrare agli investitori climatici."},
      {positive:"Avere dati Scope 3 credibili cambia il dialogo con i clienti e con chi ci finanzia. Siamo avanti rispetto ai concorrenti.",warning:"Un portale separato raccoglie risposte, ma non le integra nella contabilità GHG. Rimane un'isola.",critical:"Senza Scope 3 strutturato siamo fuori dai requisiti di qualifica di molti grandi clienti."},
      {positive:"Un reporting auditabile e conforme ai framework è ciò che separa un'azienda affidabile da una che si limita a dichiarare.",warning:"I template aiutano, ma i calcoli GHG restano disconnessi. L'assurance esterna sarà difficile da ottenere.",critical:"Costruire il reporting ogni anno da zero non è scala. Il CdA non può approvare quello che non può verificare."},
      {positive:"Avere scenari quantificati e programmi verificabili è l'unico modo per difendere il piano Net Zero davanti agli investitori.",warning:"Un portafoglio su foglio mostra le intenzioni, ma non dimostra l'esecuzione. Non regge a un'analisi esterna.",critical:"Senza un piano di decarbonizzazione credibile perdiamo accesso ai finanziamenti legati agli obiettivi climatici."},
      {positive:"Una disclosure strutturata e aggiornata ai framework è la prova che la sostenibilità è gestita come una funzione aziendale, non come un esercizio annuale.",warning:"I template aiutano a raccogliere le informazioni, ma senza un sistema governato non possiamo garantire la conformità ai framework aggiornati.",critical:"Inseguire i framework a mano ogni anno non è sostenibile: il rischio di non conformità cresce più velocemente delle nostre risorse."}
    ],
    crossEffectLabel:"Effetto della scelta precedente",
    crossEffects:[
      [],
      [{from:0,positive:"La Data Foundation di M1 alimenta direttamente le analisi energetiche: i dati dei contatori e delle bollette si integrano nella stessa fonte verificabile.",warning:"La soluzione a form di M1 rende più difficile normalizzare i dati energetici: le sedi useranno formati diversi.",critical:"Senza baseline ESG di M1, i risparmi energetici non sono confrontabili con nessun punto di riferimento verificabile."}],
      [{from:0,positive:"Con la Data Foundation attiva, i dati Scope 3 dei fornitori si integrano nella stessa piattaforma senza riconciliazioni aggiuntive.",warning:"Senza una fonte dati centrale di M1, le risposte dei fornitori rimangono isolate e non entrano nei calcoli GHG.",critical:null}],
      [{from:0,positive:"Il reporting può utilizzare direttamente dati ESG verificabili, normalizzati e tracciabili, senza ulteriori riconciliazioni tra sistemi e fogli di calcolo.",warning:"Con i form di M1, il team dovrà riconciliare manualmente i dati prima di ogni ciclo di reporting.",critical:"Senza baseline di M1, il reporting ESG si basa su stime: un rischio significativo per l'assurance esterna."},
       {from:1,positive:"I dati energetici strutturati di M2 entrano direttamente nei calcoli Scope 1–2 senza ulteriori elaborazioni.",warning:null,critical:"Senza dati energetici strutturati di M2, i consumi negli stabilimenti restano aggregati e non auditabili per sito."}],
      [{from:0,positive:"La baseline Envizi di M1 è il punto di partenza degli scenari what-if: i forecast partono da dati verificati.",warning:"Con i form di M1, la baseline di emissioni su cui costruire gli scenari è approssimativa.",critical:"Senza baseline di M1, qualsiasi modello Net Zero si basa su stime: il CdA non potrà validare il gap da colmare."},
       {from:1,positive:"I dati energetici di M2 alimentano direttamente i modelli di abatement: i risparmi calcolati sono confrontabili con gli obiettivi.",warning:null,critical:null}],
      [{from:0,positive:"Con la Data Foundation attiva, i framework in Envizi attingono direttamente ai dati già raccolti: nessuna riconciliazione prima della disclosure.",warning:"Con i form di M1, il team dovrà riconciliare manualmente i dati prima di ogni ciclo di disclosure.",critical:"Senza baseline di M1, le informazioni richieste dai framework si basano su stime: un rischio significativo per l'assurance esterna."},
       {from:3,positive:"Il GHG reporting di M4 produce i calcoli Scope 1–2 e Scope 3 che i framework richiedono: nessuna doppia elaborazione.",warning:null,critical:"Senza il GHG reporting strutturato di M4, la disclosure delle emissioni nei framework si basa su file separati non tracciabili."}]
    ],
    asiaOffice:"ASIA · 1 SEDE UFFICIO", europeOffices:"EUROPA · 3 UFFICI", hqShort:"HQ · MILANO",
    introKicker:"La tua sfida", introTitle:"Guadagna la fiducia.", introBody:"Il tuo obiettivo è conquistare la fiducia di CdA, Finanziatori, Clienti e Auditor. Ogni scelta influenza reputazione, accesso ai capitali e crescita del business. Raccogli punti fiducia e sblocca il livello \"Trusted ESG Leader\".", introScoreLabel:"Punteggio fiducia attuale", introLegend:"Decisioni Envizi +15 · Intermedie +7 · Rimandare +0", introStart:"Inizia il Quest", trustedLabel:"Trusted ESG Leader", trustLabel:"Fiducia stakeholder",
    questIntroKicker:"Come funziona il Quest", // TODO-EN
    questIntroText:"Questo percorso ti guida attraverso sei aree di evoluzione della gestione ESG. Per ognuna analizzerai la situazione attuale, confronterai tre possibili approcci e sceglierai la direzione più adatta al tuo contesto. Le tue scelte costruiranno progressivamente una roadmap ESG personalizzata e un punteggio di fiducia che riflette l'impatto delle decisioni prese. Non esistono risposte giuste o sbagliate: ogni scelta ha conseguenze diverse, e il percorso è pensato per rendere esplicite le priorità e avviare un confronto significativo.", // TODO-EN
    questIntroCta:"Avanti →", // TODO-EN
    approachKicker:"Due filoni paralleli", approachTitle:"ESG · un percorso basato su Persone e Dati.", approachBody:"La sfida è agire sul cambiamento con le persone. Formazione, responsabilizzazione, coinvolgimento e leadership sono fondamentali per rendere credibile e duraturo qualsiasi percorso ESG.",
    approachLeversLabel:"Le leve operative in campo", approachLevers:[
      {icon:"📐",label:"Governance e struttura",detail:"Policy, ruoli ESG, sistema di obiettivi e integrazione con il piano strategico."},
      {icon:"📊",label:"Dati e misurazione",detail:"Qualità, auditabilità e tracciabilità delle informazioni ambientali, sociali e di governance."},
      {icon:"⚙️",label:"Processi operativi",detail:"Efficienza energetica, supply chain, gestione dei rifiuti e decarbonizzazione delle operazioni."},
      {icon:"📋",label:"Reporting e disclosure",detail:"Framework di rendicontazione, conformità normativa e comunicazione agli stakeholder."},
      {icon:"🎯",label:"Pianificazione e target",detail:"Scenari di decarbonizzazione, obiettivi Net Zero e monitoraggio dell'esecuzione nel tempo."}
    ],
    approachDataTitle:"Il secondo filone è agire sulle sfide di dati.", approachDataBody:"La sfida è decidere come affrontare dati frammentati, processi manuali e tracciabilità assente. È qui che dovrai scegliere quale soluzione adottare per rendere misurabili, difendibili e scalabili le iniziative ESG.",
    approachOptionsLabel:"Le opzioni che valuterai attraverso questo Quest", approachOptions:[
      {key:"asis",icon:"⏸",label:"Attendere con l'AS-IS",detail:"Nessun investimento immediato, ma i problemi restano e la pressione cresce: da banche, clienti, normativa."},
      {key:"simple",icon:"🔧",label:"Adottare una soluzione percepita come semplice",detail:"Un tool puntuale o un workflow digitale: abbassa la complessità percepita, ma spesso non scala e non integra."},
      {key:"platform",icon:"🚀",label:"Adottare una piattaforma ESG enterprise",detail:"Un sistema integrato che unisce raccolta, calcolo, reporting e pianificazione su una fonte unica verificabile. Nel nostro Quest esploreremo le capacità di IBM Envizi, soluzione leader e sperimentata di ESG Reporting e Performance Management."}
    ],
    approachImpactNote:"Per ogni use case valuterai l'impatto sulla fiducia di CdA, banche, clienti e auditor. Le decisioni si accumulano: la roadmap finale è il risultato delle tue scelte.",
    approachCta:"Entra nell'azienda",
    approachQuestCallout:[
      "La Quest parte dalle priorità di business legate all'ESG e le collega alle esigenze delle persone che raccolgono, controllano e utilizzano i dati.",
      "Attraverso scenari e scelte alternative, individuerai le capacità necessarie per gestire dati ESG complessi, accompagnare il cambiamento e offrire agli utenti strumenti intuitivi, anche con il supporto dell'AI.",
      "L'obiettivo è aiutarti a mettere a fuoco bisogni, priorità e criteri di scelta prima di valutare dove e perché IBM Envizi possa rispondere alle necessità emerse.",
    ],
    approachQuestCta:"Avanti →",
    approachIntroTitle:"Dalle priorità alle decisioni: costruisci la tua roadmap ESG",
    approachIntroBody:[
      "Envizi Quest è un percorso guidato che ti aiuta a mettere a fuoco le esigenze ESG della tua azienda prima di valutare tecnologie e soluzioni.",
      "Non è un test con risposte giuste o sbagliate. È uno spazio di analisi nel quale rendere esplicite le priorità, confrontare approcci alternativi e costruire progressivamente una roadmap coerente con il tuo contesto.",
    ],
    approachIntroCta:"Avanti →",
    approachStepsTitle:"1. Parti dalle priorità di business",
    approachStepsBody:[
      "Il percorso inizia da sei macro-obiettivi di business collegati all'ESG. Potrai ordinarli in base alla loro importanza per la tua azienda e annotare le considerazioni che motivano le tue scelte.",
      "In questo modo, l'analisi non partirà dalla tecnologia, ma dai risultati che l'organizzazione intende perseguire.",
    ],
    approachStepsExample:"Esempio · La nostra motivazione principale per l'ESG è facilitare l'accesso a migliori condizioni di credito. Inoltre riceviamo richieste crescenti di dati ESG dai nostri clienti business.",
    approachStepsCta:"Avanti →",
    approachDataTitle:"2. Metti a fuoco le criticità dei dati ESG",
    approachDataBody:[
      "A ogni obiettivo di business sono associate sette fra le principali problematiche riscontrate nella gestione dei dati ESG.",
      "L'elenco non pretende di rappresentare tutte le possibili situazioni né di sostituire un'analisi specifica della tua azienda. Offre però una base strutturata per riconoscere le criticità più vicine alla tua realtà e avviare un confronto significativo.",
      "Potrai selezionare tutte le issue che ritieni pertinenti e valutarle secondo due dimensioni: la loro rilevanza per il raggiungimento degli obiettivi; il livello di criticità che presentano oggi.",
      "La matrice rilevanza–criticità evidenzierà le issue prioritarie sulle quali concentrare l'attenzione.",
    ],
    approachDataExample:"Esempio · Con l'obiettivo di accesso al credito affrontiamo diverse issue in termini di dati ESG. In particolare sono molto rilevanti e molto problematiche queste esigenze: KPI ESG strutturati per il dialogo con banche e investitori · Tracciabilità completa dalla fonte al dato comunicato alla banca · Dati e piano ESG utilizzabili nei processi di rating e confronto con i peer.",
    approachDataCta:"Avanti →",
    approachDecisionsTitle:"3. Affronta le sfide decisionali",
    approachDecisionsBody:[
      "Sulla base delle priorità emerse, affronterai sei sfide dedicate alle principali aree di evoluzione della gestione ESG: dalla Data Foundation alla rendicontazione delle emissioni, dai framework ESG e CSRD alla supply chain, fino all'energia, alla decarbonizzazione e alla pianificazione degli scenari.",
      "Alcune capacità possono rappresentare fondamenta necessarie fin dall'inizio; altre possono trovare posto in una seconda fase della roadmap.",
      "Per ogni sfida confronterai tre possibili approcci: mantenere l'attuale situazione; adottare una soluzione semplice e di breve periodo; costruire una soluzione enterprise integrata.",
      "Dopo ogni decisione potrai osservare le possibili conseguenze e il contributo che le capacità di IBM Envizi potrebbero offrire.",
    ],
    approachDecisionsExample:"Esempio · Al fine di risolvere le issue della gestione dati ESG identificate come prioritarie stiamo valutando 3 approcci: mantenere lo stato attuale, adottare una soluzione semplice, evolvere a una soluzione integrata, confrontando pro e contro di ogni scelta.",
    approachDecisionsCta:"Avanti →",
    approachRoadmapTitle:"4. Trasforma le scelte in una roadmap",
    approachRoadmapBody:[
      "Per ciascuna sfida esaminerai i principali requisiti richiesti dalle aziende, indicando: la priorità del requisito nella tua roadmap; lo stato attuale della tua organizzazione; il divario da affrontare; il potenziale ruolo delle capacità di IBM Envizi.",
      "Tutte le sfide seguono la stessa struttura, così potrai confrontare le diverse aree utilizzando criteri coerenti.",
    ],
    approachRoadmapExample:"Esempio · Abbiamo scelto un approccio alla soluzione. Ora individuiamo le capacità necessarie per rispondere alle esigenze emerse. Questa è la fase più analitica del percorso: confronteremo requisiti, priorità e stato attuale per identificare la soluzione più adeguata al contesto. IBM Envizi sarà utilizzato come soluzione di riferimento per valutare in che modo le sue capacità possano contribuire a rispondere alle esigenze individuate.",
    approachRoadmapCta:"Avanti →",
    approachTrustTitle:"5. Costruisci la fiducia degli stakeholder",
    approachTrustBody:[
      "Attraverso una dinamica di gamification, le tue decisioni costruiranno un percorso a punti verso la fiducia di banche, clienti, CdA e auditor. Il punteggio ha un valore narrativo e, pur non rappresentando una valutazione scientifica, intende aiutare a confrontare le conseguenze delle diverse scelte proposte.",
    ],
    approachTrustExample:"Esempio · Al termine della valutazione Obiettivi, Rilevanza e Valore gestione dati riceverai il badge ESG Strategist, e potrai progredire verso altri punti fiducia e badge al completamento degli scenari successivi.",
    approachTrustCta:"Avanti →",
    approachReportTitle:"6. Porta con te il risultato",
    approachReportBody:[
      "Al termine della Quest riceverai un report complessivo con la sintesi delle priorità, delle criticità selezionate, delle decisioni assunte e dei requisiti individuati.",
      "Il tempo dedicato al percorso serve a trasformare percezioni spesso frammentate in una prima base di analisi condivisibile: non una roadmap definitiva, ma un punto di partenza più consapevole per decidere dove intervenire, con quale priorità e attraverso quali capacità.",
    ],
    approachReportExample:"Esempio · Potrai scaricare un documento con i risultati dell'analisi fatta.",
    approachReportCta:"Iniziamo la quest",
    asIsEditHint:"I valori sono pre-compilati con i parametri dello scenario. Puoi modificarli con i dati reali della tua organizzazione.",

    backScenarios:"Torna agli scenari", summaryCta:"Guarda il cruscotto finale", summaryKicker:"Il lavoro svolto", summaryTitle:"La tua roadmap ESG", summaryIntro:"Una panoramica per rileggere priorità, decisioni, impatti attesi e le esigenze di dati associate a ogni blocco prima del prossimo passo.", topPriorities:"I primi 3 obiettivi di business", parameters:"Esigenze di dati associate", backOne:"Indietro", backStart:"Torna all'inizio", nextStep:"Passiamo al prossimo passo", nextKicker:"Prossimo passo", nextTitle:"Porta i tuoi dati ESG al livello successivo.", nextSiteLabel:"Scopri IBM Envizi", nextSiteIntro:"La piattaforma SaaS per raccogliere, gestire e rendicontare i dati ESG con qualità e auditabilità.", nextSiteButton:"Visita il sito IBM Envizi →", nextDemoLabel:"Chiedi una demo", nextDemoIntro:"Inserisci l'email del tuo contatto IBM o Partner di fiducia. Se non hai un riferimento, scrivici direttamente: troveremo insieme la soluzione giusta.", nextDemoEmailPlaceholder:"Email contatto IBM o Partner", nextDemoButton:"Richiedi una demo →", nextDemoFallback:"Nessun contatto? Scrivi a Felice →", nextPocLabel:"Proof of Concept", nextPocIntro:"Porta i tuoi dati reali nella piattaforma: un PoC su misura per vedere IBM Envizi all'opera nel tuo contesto specifico, prima di qualsiasi decisione di investimento.", nextPocButton:"Chiedi un PoC →", nextBvaLabel:"Business Value Assessment", nextBvaIntro:"Quantifica il valore che IBM Envizi può generare per la tua organizzazione: risparmio di tempo, riduzione del rischio e impatto sul costo del capitale ESG.", nextBvaButton:"Richiedi un BVA →", nextContactLabel:"Il tuo riferimento IBM", nextContactName:"Felice Petrignano", nextContactRole:"Senior ESG Solution Engineer and Advisor", nextContactEmail:"", thankYouTitle:"Grazie / Thank you", prereqNoteLabel:"PREREQUISITO", prereqNoteText:"Richiede IBM Envizi Data Foundation (Missione 01)", prereqLabel:"PREREQUISITO NON SODDISFATTO", prereqText:"Per adottare IBM Envizi in questo scenario è necessario aver attivato la Data Foundation nella Missione 01 — Fabbrica dei dati ESG.", prereqLinkLabel:"Vai alla Missione 01 →", tobeKicker:"Proiezione TO BE", tobeTitle:"Come cambiano i tuoi parametri.", tobeSubtitle:"Stima dell'impatto atteso · 12 mesi", tobeAsIs:"AS-IS attuale", tobeToBe:"TO BE stimato", tobeDelta:"Variazione attesa", tobeDisclaimer:"Le stime TO BE sono proiezioni indicative basate su casistiche di adozione IBM Envizi. I benefici effettivi dipendono da contesto, perimetro e maturità dei processi. Non costituiscono garanzia di risultato.", tobeCta:"Vedi l'impatto sulla fiducia", trustKicker:"Indicatore di fiducia", trustTitle:"Quale l'impatto delle decisioni ESG data sulla fiducia?", trustIntro:"In questa fase il mercato valuta governance, solidità esecutiva e qualità del dato. Ogni scelta modifica il livello di fiducia con cui CdA, banche, clienti e auditor leggeranno il piano ESG.", trustScore:"Indice di fiducia", trustBase:"Baseline iniziale", trustMax:"Soglia massima 100", trustStakeholders:"Perimetro di lettura", trustBoard:"CdA", trustBanks:"Banche", trustClients:"Clienti", trustAuditors:"Auditor", trustGainPositive:"Scelta strategicamente solida · +15", trustGainWarning:"Scelta accettabile ma non scalabile · +7", trustGainCritical:"Scelta difensiva senza creazione di fiducia · +0", trustContinue:"Torna alle missioni", trustCurrentDecision:"Lettura del CdA", trustProgressLabel:"Fiducia cumulata sulla roadmap", trustPersonaLabel:"Responsabile della decisione",
    roadmapKicker:"La tua roadmap", roadmapTitle:"Dalle esigenze alle sfide decisionali.", roadmapIntro:"Ogni esigenza di dati è associata a una sfida. Affronta gli scenari nell'ordine che preferisci: ogni decisione costruisce la tua roadmap ESG.", missionReview:"Approfondisci", roadmapProgress:"Roadmap completata", moveLeft:"Sposta a sinistra", moveRight:"Sposta a destra", adoptedDecision:"Decisione adottata", expectedImpact:"Impatto atteso", decisionLabels:{positive:"Data Foundation IBM Envizi",warning:"Soluzione “semplice” basata su form non integrata con le fonti",critical:"Rimandare al prossimo esercizio"}, outcomeLabels:{positive:"−62% tempo di reporting · +34% qualità dati",warning:"−12% tempo di reporting · +8% qualità dati · beneficio limitato",critical:"Nessun miglioramento · fiducia del CdA bassa e invariata"},
    benchmarkLabel:"Riferimento scenario", yourValue:"I tuoi parametri attuali", sourceLabel:"Fonte metodologica IBM Envizi", benchmarkNote:"I numeri sono ipotesi di scenario, non benchmark di settore. La fonte descrive l'approccio Envizi a raccolta, qualità e auditabilità dei dati.",
    dataQuality:"Qualità dei dati", reportingTime:"Tempo di reporting", confidence:"Fiducia del management", successTitle:"Una Data Foundation pronta a crescere.", eyebrow:"IBM ENVIZI · IMPACT EXPERIENCE", title:"Ogni dato cambia la storia.", intro:"Entra nei panni di un ESG Manager. Affronta decisioni reali, misura gli impatti e guida l’azienda verso obiettivi credibili.", language:"Scegli la lingua", profile:"Scegli il tuo profilo", maleRole:"ESG Manager · Operations", femaleRole:"ESG Manager · Strategy", start:"Entra nell’azienda", select:"Seleziona un profilo per continuare", sameStory:"Una storia · Due protagonisti · Impatti reali", disclaimer:"Questa esperienza è stata ideata e realizzata da Felice Petrignano, Senior ESG Solution Engineer and Advisor, sulla base della propria esperienza e prospettiva professionale. I contenuti esprimono valutazioni personali e non rappresentano necessariamente posizioni ufficiali di IBM.",
    mission0QuestionKicker:"SFIDA · MISSIONE 01",mission0Question:"Quale scelta per la gestione dei dati ESG?",mission0QuestionBody:"Di fronte a dati provenienti da sedi, impianti e funzioni diverse, spesso raccolti tramite fogli Excel e processi manuali, quale approccio è più adatto alle esigenze attuali e future di COMPANY_NAME, considerando qualità, tracciabilità, impegno richiesto e capacità di crescere nel tempo?",mission0Cta:"Entra nella sfida →",
    missionIntroData:[
      {eyebrow:"REPORTING · MISSIONE 01 · DATA FOUNDATION",title:"Dai dati invisibili alle decisioni affidabili",kicker:"SFIDA · MISSIONE 01",question:"Quale scelta per la gestione dei dati ESG?",body:"Di fronte a dati provenienti da sedi, impianti e funzioni diverse, spesso raccolti tramite fogli Excel e processi manuali, quale approccio è più adatto alle esigenze attuali e future di COMPANY_NAME, considerando qualità, tracciabilità, impegno richiesto e capacità di crescere nel tempo?",cta:"Entra nella sfida →"},
      {eyebrow:"REPORTING · MISSIONE 02 · ENERGIA E DECARBONIZZAZIONE",title:"Dai consumi alle azioni",kicker:"SFIDA · MISSIONE 02",question:"Quale scelta per il controllo dell'energia?",body:"Di fronte a bollette e dati dei contatori digitali distribuiti tra le sedi, quale approccio permette a COMPANY_NAME di individuare anomalie, confrontare le performance e assegnare azioni correttive in modo tempestivo?",cta:"Entra nella sfida →"},
      {eyebrow:"REPORTING · MISSIONE 03 · COINVOLGIMENTO SUPPLY CHAIN",title:"Dai fornitori ai dati Scope 3",kicker:"SFIDA · MISSIONE 03",question:"Quale scelta per il coinvolgimento della supply chain?",body:"Di fronte a categorie Scope 3 incomplete e risposte fornitori frammentate, quale approccio consente a COMPANY_NAME di estendere la copertura, migliorare la qualità del dato e integrare le risposte nella contabilità GHG?",cta:"Entra nella sfida →"},
      {eyebrow:"REPORTING · MISSIONE 04 · REPORTING E PERFORMANCE",title:"Dai dati ESG alle decisioni",kicker:"SFIDA · MISSIONE 04",question:"Quale scelta per il reporting delle performance ESG?",body:"Di fronte alla necessità di consolidare le emissioni Scope 1, 2 e 3, analizzare le performance delle diverse sedi e produrre report e dashboard per stakeholder differenti, quale approccio è più adatto alle esigenze attuali e future di COMPANY_NAME, considerando affidabilità, capacità di analisi, personalizzazione e scalabilità nel tempo?",cta:"Entra nella sfida →"},
      {eyebrow:"REPORTING · MISSIONE 05 · ROTTA VERSO NET ZERO",title:"Dagli scenari al piano verificabile",kicker:"SFIDA · MISSIONE 05",question:"Quale scelta per il piano di decarbonizzazione?",body:"Di fronte a proposte di iniziative eterogenee, budget limitato e necessità di dimostrare al CdA la fattibilità del target Net Zero, quale approccio permette a COMPANY_NAME di confrontare scenari, selezionare le azioni prioritarie e monitorarne l'esecuzione?",cta:"Entra nella sfida →"},
      {eyebrow:"REPORTING · MISSIONE 06 · FRAMEWORK ESG E DISCLOSURE",title:"Dai requisiti alla disclosure governata",kicker:"SFIDA · MISSIONE 06",question:"Quale scelta per la gestione dei framework ESG?",body:"Di fronte a framework CSRD, ESRS, GRI, SASB e CDP in continua evoluzione, quale approccio consente a COMPANY_NAME di mantenere aggiornati i requisiti, mappare le informazioni materiali e produrre disclosure pronte all'uso senza ricostruire tutto ogni anno?",cta:"Entra nella sfida →"}
    ], missionMenuKicker:"Scegli la tua sfida", missionMenuTitle:"Da dove vuoi iniziare?", missionMenuIntro:"Cinque missioni, un’unica trasformazione. Scegli lo scenario più vicino alle priorità del tuo cliente.", missionSelect:"Avvia missione", missionDuration:"8–12 MIN", missionStartHere:"PARTI DA QUI", missionLocked:"Disponibile dopo la Data Foundation", companyIntro:"La tua azienda", companyTitle:"COMPANY_NAME", companyStory:"Un gruppo manifatturiero internazionale da 400 milioni di euro, nato in Italia e cresciuto attraverso otto stabilimenti e cinque sedi operative.", evolving:"COMPANY_NAME sta evolvendo verso un modello ESG per rispondere alle nuove esigenze di banche, regolatori, clienti e mercati, trasformando dati frammentati in decisioni affidabili.", revenue:"Fatturato annuo", plants:"Stabilimenti", offices:"Sedi uffici", people:"Dipendenti", explore:"Definisci le priorità ESG", europe:"EUROPA · 6 STABILIMENTI", usa:"USA · 1 STABILIMENTO", asia:"ASIA · 1 STABILIMENTO", hq:"HEADQUARTERS · MILANO", officeLabel:"5 SEDI UFFICI",
    priorityKicker:"Prima di iniziare", priorityTitle:"Priorità di business collegate all'ESG", priorityIntro:"Metti in ordine le priorità che stanno spingendo COMPANY_NAME verso l'ESG. Non esiste una risposta universale: la tua classifica orienterà la lettura degli impatti.", moveUp:"Sposta su", moveDown:"Sposta giù", confirm:"Conferma le priorità", priorityNames:{credit:"Accesso al credito",compliance:"Compliance e reporting",customers:"Clienti e gare",efficiency:"Efficienza, energia e costi",supply:"Resilienza della supply chain",reputation:"Reputazione e attrazione dei talenti"}, priorityDetails:{credit:"Migliorare il dialogo con banche e investitori e le condizioni di finanziamento.",compliance:"Disporre di dati verificabili per CSRD, ESRS, disclosure e audit.",customers:"Soddisfare i requisiti ESG nelle qualifiche fornitori e nei capitolati.",efficiency:"Ridurre consumi, sprechi, emissioni e volatilità dei costi energetici.",supply:"Gestire rischi di filiera, Scope 3 e continuità dei fornitori.",reputation:"Rafforzare la fiducia degli stakeholder e attrarre e trattenere competenze."},
    bridgeKicker:"Da qui in avanti", bridgeTitle:"Cinque decisioni. Una trasformazione.", bridgeIntro:"Hai definito le priorità e le esigenze di dati. Ora affronterai cinque scenari reali: per ognuno dovrai scegliere come rispondere alla sfida. Ogni decisione accumula fiducia e costruisce la tua roadmap ESG.", bridgeCta:"Entra nella quest", bridgePrereqLabel:"PREREQUISITO · BLOCCO FONDANTE", bridgeCapLabel:"CAPACITÀ ULTERIORI",
    bridgeMissions:[
      {num:"01",label:"Fabbrica dei dati ESG",need:"Una fonte unica verificabile per emissioni, energia e reporting."},
      {num:"02",label:"Energia e decarbonizzazione",need:"Dati intervallari e analisi delle bollette per ridurre costi e sprechi."},
      {num:"03",label:"Coinvolgimento supply chain",need:"Scope 3 strutturato e risposte fornitori integrabili nella contabilità GHG."},
      {num:"04",label:"Reporting e performance",need:"GHG reporting, workflow auditabili e dashboard riutilizzabili."},
      {num:"05",label:"Rotta verso Net Zero",need:"Scenari what-if e programmi di abbattimento verificabili nel tempo."},
      {num:"06",label:"Framework ESG e disclosure",need:"Gestione dei framework CSRD, ESRS, GRI, SASB, CDP e mappatura requisiti materiali."}
    ],
    bridgeNote:"Puoi affrontare le missioni nell'ordine che preferisci. Le scelte si accumulano: ogni decisione influenza le successive.",
    priorityDataKicker:"Le tue esigenze di dati", priorityDataTitle:"Esigenze di dati e sfide associate", priorityDataIntro:"Hai definito le priorità e le esigenze di business. Ora per ogni priorità di business seleziona quali fattori valutare (click cerchi in colonna includi) e per ognuno la rilevanza e la criticità attuale.", priorityDataCta:"Conferma priorità →",
    priorityDataNeeds:{
      credit:[
        {id:"credit-1",label:"Emissioni Scope 1, 2 e 3 verificabili e auditabili"},
        {id:"credit-2",label:"KPI ESG strutturati per il dialogo con banche e investitori"},
        {id:"credit-3",label:"Tracciabilità completa dalla fonte al dato comunicato alla banca"},
        {id:"credit-4",label:"Dati e piano ESG utilizzabili nei processi di rating e confronto con i peer"},
        {id:"credit-5",label:"Disclosure allineata a ESRS e standard ISSB / IFRS S1 e S2"},
        {id:"credit-6",label:"Scenari previsionali che mostrino traiettorie, gap e impatto degli investimenti ESG"},
        {id:"credit-7",label:"Business case delle iniziative con costi, risparmi ed emissioni evitate"}
      ],
      compliance:[
        {id:"compliance-1",label:"Calcoli GHG Scope 1, 2 e 3 tracciabili e riconciliabili"},
        {id:"compliance-2",label:"Workflow con assignee, scadenze, risposte ed evidenze per l'assurance"},
        {id:"compliance-3",label:"Framework CSRD / ESRS, GRI, IFRS S1/S2 e altri standard gestiti nel sistema"},
        {id:"compliance-4",label:"Registro delle modifiche e audit trail per ogni dato ESG"},
        {id:"compliance-5",label:"Identificazione e gestione delle informazioni materiali e dei gap rispetto agli standard"},
        {id:"compliance-6",label:"Controlli di completezza su dati mancanti, sovrapposti o in ritardo"},
        {id:"compliance-7",label:"Accesso rapido a dati, fattori, documenti ed evidenze richiesti dagli auditor"}
      ],
      customers:[
        {id:"customers-1",label:"Dati Scope 3 per categoria GHG Protocol su acquisti, trasporti e prodotti"},
        {id:"customers-2",label:"Risposte dei fornitori strutturate e integrabili nella contabilità GHG"},
        {id:"customers-3",label:"Product Carbon Footprint forniti dai supplier per prodotti e acquisti rilevanti"},
        {id:"customers-4",label:"Informazioni ESG riutilizzabili per capitolati e qualifiche di gara"},
        {id:"customers-5",label:"Prestazioni ambientali confrontabili con benchmark di mercato disponibili"},
        {id:"customers-6",label:"Dashboard e KPI dedicati alle richieste ESG dei clienti strategici"},
        {id:"customers-7",label:"Evidenze su energia rinnovabile ed emissioni Scope 2 location-based e market-based"}
      ],
      efficiency:[
        {id:"efficiency-1",label:"Dati intervallari ad alta frequenza da contatori e sistemi di sub-metering"},
        {id:"efficiency-2",label:"Analisi delle bollette per sito, utility, costo e variazione anomala"},
        {id:"efficiency-3",label:"KPI energetici normalizzati per meteo e variabili operative"},
        {id:"efficiency-4",label:"Alert automatici su picchi, sprechi e consumi fuori andamento atteso"},
        {id:"efficiency-5",label:"Benchmark dei consumi tra stabilimenti e monitoraggio rispetto ai target"},
        {id:"efficiency-6",label:"Identificazione degli impianti con il maggiore potenziale di risparmio"},
        {id:"efficiency-7",label:"Valutazione economica e ambientale degli interventi di efficienza"}
      ],
      supply:[
        {id:"supply-1",label:"Dati Scope 3 cat. 1 (acquisti) e cat. 4 (trasporti upstream)"},
        {id:"supply-2",label:"Risposte fornitori su emissioni, target, conformità e continuità"},
        {id:"supply-3",label:"Integrazione con i flussi ERP per elaborare ordini e transazioni di acquisto"},
        {id:"supply-4",label:"Valutazione del rischio ESG per fornitore e paese di origine"},
        {id:"supply-5",label:"Tracciabilità delle azioni correttive e dei piani di miglioramento"},
        {id:"supply-6",label:"Monitoraggio dei tassi di risposta e della qualità dei dati ricevuti dai fornitori"},
        {id:"supply-7",label:"Passaggio progressivo da stime spend-based a dati supplier-specific e PCF"}
      ],
      reputation:[
        {id:"reputation-1",label:"Report ESG chiari, coerenti e allineati ai framework riconosciuti"},
        {id:"reputation-2",label:"Dati verificabili su diversity, sicurezza, formazione e benessere"},
        {id:"reputation-3",label:"Indicatori ESG confrontabili nel tempo, tra sedi e tra funzioni"},
        {id:"reputation-4",label:"Contenuti ESG strutturati e riutilizzabili nella comunicazione esterna"},
        {id:"reputation-5",label:"Evidenze di avanzamento verso obiettivi climatici e Net Zero"},
        {id:"reputation-6",label:"Raccolta strutturata di dati e percezioni ESG da dipendenti e funzioni aziendali"},
        {id:"reputation-7",label:"Dashboard sintetiche per comunicare cultura, persone e risultati ESG al management"}
      ]
    },
    mission:"Missione", missionTitle:"La fabbrica dei dati invisibili", companyFacts:"Manifattura · €400M · 8 stabilimenti", briefing:"Il CdA vuole una baseline ESG affidabile entro 90 giorni. I dati energetici e ambientali sono dispersi tra stabilimenti, fornitori e fogli di calcolo.", objective:"Il tuo obiettivo", objectiveText:"Creare un’unica fonte verificabile per emissioni, energia e reporting, senza rallentare le attività produttive.", analyse:"Esamina l’AS-IS", asIsKicker:"Fotografia attuale", asIsTitle:"Quattro criticità.\nUn solo problema di fondo.", asIsIntro:"Prima di scegliere una soluzione, osserva come COMPANY_NAME gestisce oggi i dati ESG.", asIsItems:[{title:"Fonti frammentate",detail:"Dati energetici, ambientali e di produzione distribuiti tra 8 stabilimenti, ERP, fatture ed e-mail.",metric:"12 FONTI"},{title:"Raccolta manuale",detail:"Ogni mese gli utenti copiano i valori in fogli diversi, con solleciti e controlli gestiti via e-mail.",metric:"180 ORE/MESE"},{title:"Regole incoerenti",detail:"Unità, fattori di emissione e perimetri cambiano tra sedi: confrontare i risultati richiede rilavorazioni.",metric:"17% ERRORI"},{title:"Audit lento",detail:"Ricostruire origine, modifica e approvazione di un dato richiede documenti separati e verifiche manuali.",metric:"6 SETTIMANE"}], proceedDecision:"Decisioni →", decisionTitle:"Quale strada scegli?", decisionIntro:"La scelta deve risolvere il problema di oggi senza crearne uno più grande tra dodici mesi.", optionA:"Adottare una Data Foundation integrata", optionATag:"Soluzione indicata: IBM Envizi Premium", optionADetail:"Integra le fonti dati, automatizza raccolta e controlli, riduce tempi ed errori e conserva una traccia verificabile.", optionB:"Soluzione “semplice”", optionBDetail:"Basata su form per gli utenti che sostituiscono visivamente i fogli, ma mantengono attività manuali, solleciti ed errori: tra un anno, sarai ancora in grado di gestire il volume?", optionC:"Rimandare al prossimo esercizio", optionCDetail:"Evita costi immediati, ma lascia il CdA senza una baseline affidabile.", impact:"Impatto della decisione · 12 mesi dopo", negativeTitle:"Il nuovo form è diventato il nuovo foglio di calcolo.", negativeText:"L’interfaccia è cambiata, ma il processo è ancora manuale. Più utenti e più dati aumentano errori, ritardi e costi di controllo; le fonti restano scollegate.", postponeTitle:"Un anno perso, lo stesso problema più grande.", postponeText:"Le fonti e i volumi sono aumentati, mentre la baseline è ancora incompleta. Il CdA deve decidere senza dati affidabili e la pressione del reporting cresce.", successTitle:"Una Data Foundation pronta a crescere.", successText:"Envizi integra progressivamente le fonti degli otto stabilimenti, automatizza controlli e normalizzazioni e crea una traccia verificabile, riducendo tempi ed errori.", dataQuality:"Qualità dati", reportingTime:"Tempo reporting", confidence:"Fiducia del CdA", retry:"Rivedi la decisione", restart:"Cambia profilo", continue:"Continua la quest", backScenarios:"Torna al menu degli scenari", enviziValue:"VALORE ENVIZI SBLOCCATO · DATA FOUNDATION"
  },
  en: {
    formTitleUpdated:"A quick but limited benefit.", formTextUpdated:"Forms standardize data entry and reduce some errors compared with the current state. Manual work, reminders and disconnected sources remain; as volumes grow, the benefit plateaus and does not scale.", impactUpdated:"Change versus the current AS-IS · 12 months later", asIsTitleUpdated:"No step forward.", asIsTextUpdated:"Keeping the current AS-IS leaves data quality and reporting time unchanged, while Board confidence remains low. The cost of the choice is foregoing benefits and postponing the transformation.",
    successTextUpdated:"Envizi supports data entry via Excel templates and simple user-facing forms guided by workflows, and progressively integrates external data sources, such as utility bills and purchase invoices, and internal systems, such as ERP, HR and Asset Management; it automates controls and normalization and creates a verifiable trail, reducing time and errors.",
    efcLabel:"OVER 40,000 ENVIZI EMISSION FACTORS", efcByMission:[
      "Automatically mapped to utility bills, purchases, travel, waste, gas consumption and production assets.",
      "Matched to meter readings and line items in electricity, gas and district-heating bills.",
      "Applied to purchases by GHG Protocol category, from raw materials to upstream transport.",
      "Used in Scope 1–2 calculations and across all Scope 3 categories reported in disclosure frameworks.",
      "Underpinning abatement models: each scenario calculates avoided CO₂e per initiative.",
      "Integrated directly into the emission calculations required by ESRS, GRI, SASB and CDP frameworks for disclosure."
    ],
    boardQuoteLabel:"Board voice",
    boardQuotes:[
      {positive:"We can finally present a verifiable ESG baseline. This is the foundation on which everything else is built.",warning:"Forms improve order, but not traceability. The Board will still ask for the original evidence.",critical:"Postponing means giving up data credibility for another year. That is not a sustainable position."},
      {positive:"Structured energy data demonstrates that we are investing in decarbonisation, not just declaring it.",warning:"A manual dashboard is a step forward, but it does not generate the alerts and actions the COO expects.",critical:"Without meter analytics, waste continues and we have nothing to show climate investors."},
      {positive:"Having credible Scope 3 data changes the conversation with customers and financiers. We are ahead of our peers.",warning:"A separate portal collects responses but does not integrate them into GHG accounting. It remains an island.",critical:"Without structured Scope 3 we are outside the qualification requirements of many major customers."},
      {positive:"Auditable reporting aligned with disclosure frameworks is what separates a credible company from one that merely declares.",warning:"Templates help, but GHG calculations remain disconnected. Obtaining external assurance will be difficult.",critical:"Rebuilding reporting from scratch every year does not scale. The Board cannot approve what it cannot verify."},
      {positive:"Quantified scenarios and verifiable programmes are the only way to defend the Net Zero plan in front of investors.",warning:"A spreadsheet portfolio shows intent but does not demonstrate execution. It will not withstand external scrutiny.",critical:"Without a credible decarbonisation plan we lose access to financing tied to climate targets."},
      {positive:"Structured, framework-aligned disclosure is proof that sustainability is managed as a business function, not an annual exercise.",warning:"Templates help collect information, but without a governed system we cannot guarantee compliance with updated frameworks.",critical:"Chasing frameworks manually every year is not sustainable: the risk of non-compliance grows faster than our resources."}
    ],
    crossEffectLabel:"Effect of the previous choice",
    crossEffects:[
      [],
      [{from:0,positive:"The M1 Data Foundation feeds directly into energy analytics: meter and bill data share the same verifiable source.",warning:"The M1 forms solution makes it harder to normalise energy data: sites will use different formats.",critical:"Without the M1 ESG baseline, energy savings cannot be compared against any verifiable reference point."}],
      [{from:0,positive:"With the Data Foundation active, supplier Scope 3 data integrates into the same platform without additional reconciliation.",warning:"Without a central data source from M1, supplier responses remain isolated and do not feed into GHG calculations.",critical:null}],
      [{from:0,positive:"Reporting can draw directly from the verifiable data already collected: no reconciliation between systems.",warning:"With M1 forms, the team will need to reconcile data manually before every reporting cycle.",critical:"Without the M1 baseline, ESG reporting relies on estimates — a significant risk for external assurance."},
       {from:1,positive:"The structured energy data from M2 feeds directly into Scope 1–2 calculations without further processing.",warning:null,critical:"Without structured energy data from M2, site-level consumption remains aggregated and cannot be audited by location."}],
      [{from:0,positive:"The M1 Envizi baseline is the starting point for what-if scenarios: forecasts are built on verified data.",warning:"With M1 forms, the emissions baseline on which scenarios are built is approximate.",critical:"Without the M1 baseline, any Net Zero model relies on estimates: the Board cannot validate the gap to close."},
       {from:1,positive:"The M2 energy data feeds directly into abatement models: calculated savings are comparable against targets.",warning:null,critical:null}],
      [{from:0,positive:"With the Data Foundation active, frameworks in Envizi draw directly from already-collected data: no reconciliation before disclosure.",warning:"With M1 forms, the team will need to manually reconcile data before each disclosure cycle.",critical:"Without the M1 baseline, information required by frameworks relies on estimates — a significant risk for external assurance."},
       {from:3,positive:"The GHG reporting from M4 produces the Scope 1–2 and Scope 3 calculations that frameworks require: no double processing.",warning:null,critical:"Without the structured GHG reporting from M4, emissions disclosure in frameworks relies on separate, untraceable files."}]
    ],
    asiaOffice:"ASIA · 1 OFFICE", europeOffices:"EUROPE · 3 OFFICES", hqShort:"HQ · MILAN",
    introKicker:"Your challenge", introTitle:"Earn their trust.", introBody:"Your goal is to earn the trust of Board, Financiers, Customers and Auditors. Every choice shapes reputation, access to capital and business growth. Collect trust points and unlock the \"Trusted ESG Leader\" status.", introScoreLabel:"Current trust score", introLegend:"Envizi decisions +15 · Intermediate +7 · Postponing +0", introStart:"Start the Quest", trustedLabel:"Trusted ESG Leader", trustLabel:"Stakeholder trust",
    approachKicker:"Two parallel tracks", approachTitle:"ESG · a journey built on People and Data.", approachBody:"The first track is acting on change challenges with people. Training, accountability, engagement and leadership are essential to make any ESG journey credible and durable.",
    approachLeversLabel:"The operational levers at play", approachLevers:[
      {icon:"📐",label:"Governance and structure",detail:"Policies, ESG roles, objective-setting and integration with the strategic plan."},
      {icon:"📊",label:"Data and measurement",detail:"Quality, auditability and traceability of environmental, social and governance information."},
      {icon:"⚙️",label:"Operational processes",detail:"Energy efficiency, supply chain, waste management and operational decarbonisation."},
      {icon:"📋",label:"Reporting and disclosure",detail:"Reporting frameworks, regulatory compliance and stakeholder communication."},
      {icon:"🎯",label:"Planning and targets",detail:"Decarbonisation scenarios, Net Zero objectives and execution monitoring over time."}
    ],
    approachDataTitle:"The second track is acting on data challenges.", approachDataBody:"The challenge is deciding how to address fragmented data, manual processes and missing traceability. This is where you will choose which solution to adopt to make ESG initiatives measurable, defensible and scalable.",
    approachOptionsLabel:"The options you will evaluate through this Quest", approachOptions:[
      {key:"asis",icon:"⏸",label:"Wait with the AS-IS",detail:"No immediate investment, but problems persist and pressure grows: from banks, clients, regulation."},
      {key:"simple",icon:"🔧",label:"A solution perceived as simple",detail:"A point tool or digital workflow: lowers perceived complexity, but often does not scale or integrate."},
      {key:"platform",icon:"🚀",label:"An enterprise ESG platform",detail:"An integrated system that combines collection, calculation, reporting and planning on one verifiable source."}
    ],
    approachImpactNote:"For each use case you will assess the impact on the trust of the Board, banks, clients and auditors. Decisions accumulate: the final roadmap is the result of your choices.",
    approachCta:"Enter the company",
    approachQuestCallout:[
      "The Quest starts from ESG-related business priorities and connects them to the needs of the people who collect, control and use data.",
      "Through scenarios and alternative choices, you will identify the capabilities needed to manage complex ESG data, support change and offer users intuitive tools, including with AI support.",
      "The goal is to help you clarify needs, priorities and selection criteria before evaluating where and why IBM Envizi can address the needs that emerge.",
    ],
    approachQuestCta:"Next →",
    approachIntroTitle:"From priorities to decisions: build your ESG roadmap",
    approachIntroBody:[
      "Envizi Quest is a guided journey that helps you clarify your organisation's ESG needs before evaluating technologies and solutions.",
      "It is not a test with right or wrong answers. It is an analysis space where you can make priorities explicit, compare alternative approaches, and progressively build a roadmap that fits your context.",
    ],
    approachIntroCta:"Next →",
    approachStepsTitle:"1. Start from business priorities",
    approachStepsBody:[
      "The journey begins with six ESG-related business macro-objectives. You can rank them by importance for your organisation and add notes explaining the reasoning behind your choices.",
      "This way, the analysis will start from the outcomes the organisation wants to achieve — not from technology.",
    ],
    approachStepsExample:"Example · Our main motivation for ESG is to facilitate access to better credit conditions. We also receive growing requests for ESG data from our business clients.",
    approachStepsCta:"Next →",
    approachDataTitle:"2. Focus on ESG data criticalities",
    approachDataBody:[
      "Each business objective is linked to seven of the most common issues found in ESG data management.",
      "The list does not claim to cover every possible situation or replace a specific analysis of your organisation. It does, however, offer a structured basis for recognising the issues closest to your reality and starting a meaningful conversation.",
      "You will be able to select all the issues you consider relevant and assess them along two dimensions: their relevance to achieving the objectives; the level of criticality they present today.",
      "The relevance–criticality matrix will highlight the priority issues to focus on.",
    ],
    approachDataExample:"Example · With the credit access objective in mind, we face several ESG data issues. Particularly relevant and critical: structured ESG KPIs for dialogue with banks and investors · Full traceability from source to data communicated to the bank · ESG data and plan usable in rating processes and peer comparison.",
    approachDataCta:"Next →",
    approachDecisionsTitle:"3. Face the decision challenges",
    approachDecisionsBody:[
      "Based on the priorities identified, you will face six challenges covering the main ESG management evolution areas: from the Data Foundation to emissions reporting, from ESG and CSRD frameworks to supply chain, through to energy, decarbonisation and scenario planning.",
      "Some capabilities may represent necessary foundations from the start; others may fit into a second phase of the roadmap.",
      "For each challenge you will compare three possible approaches: maintaining the current situation; adopting a simple, short-term solution; building an integrated enterprise solution.",
      "After each decision you will be able to observe the possible consequences and the contribution that IBM Envizi capabilities could offer.",
    ],
    approachDecisionsExample:"Example · To address the ESG data management issues identified as priorities, we are evaluating 3 approaches: maintaining the current state, adopting a simple solution, evolving to an integrated solution — comparing the pros and cons of each choice.",
    approachDecisionsCta:"Next →",
    approachRoadmapTitle:"4. Turn your choices into a roadmap",
    approachRoadmapBody:[
      "For each challenge you will review the main requirements companies typically face, indicating: the priority of the requirement in your roadmap; the current state of your organisation; the gap to address; the potential role of IBM Envizi capabilities.",
      "All challenges follow the same structure, so you can compare different areas using consistent criteria.",
    ],
    approachRoadmapExample:"Example · We have chosen an approach to the solution. Now we identify the capabilities needed to address the needs that emerged. This is the most analytical phase of the journey: we will compare requirements, priorities and current state to identify the most suitable solution for the context. IBM Envizi will be used as the reference solution to assess how its capabilities can contribute to addressing the identified needs.", // TODO-EN
    approachRoadmapCta:"Next →",
    approachTrustTitle:"5. Build stakeholder trust",
    approachTrustBody:[
      "Through a gamification dynamic, your decisions will build a point-based journey towards the trust of banks, clients, boards and auditors. The score has a narrative value and, while not representing a scientific assessment, is intended to help compare the consequences of the different choices proposed.",
    ],
    approachTrustExample:"Example · Upon completing the Objectives, Relevance and Data Management Value assessment you will receive the ESG Strategist badge, and you can progress towards further trust points and badges upon completing subsequent scenarios.",
    approachTrustCta:"Next →",
    approachReportTitle:"6. Take the result with you",
    approachReportBody:[
      "At the end of the Quest you will receive a comprehensive report summarising your priorities, the criticalities selected, the decisions taken and the requirements identified.",
      "The time invested in this journey serves to turn often fragmented perceptions into a first shareable basis for analysis: not a definitive roadmap, but a more informed starting point for deciding where to act, with what priority and through which capabilities.",
    ],
    approachReportExample:"Example · You will be able to download a document with the results of the analysis carried out.",
    approachReportCta:"Let's start the quest",
    asIsEditHint:"Values are pre-filled with the scenario parameters. You can replace them with your organisation's actual data.",

    summaryCta:"View the final dashboard", summaryKicker:"Work completed", summaryTitle:"Your ESG roadmap", summaryIntro:"An overview to reflect on priorities, decisions, expected impacts and the data needs associated with each block before the next step.", topPriorities:"Top 3 business objectives", parameters:"Associated data needs", backOne:"Back", backStart:"Back to the beginning", nextStep:"Let's move to the next step", nextKicker:"Next step", nextTitle:"Take your ESG data to the next level.", nextSiteLabel:"Discover IBM Envizi", nextSiteIntro:"The SaaS platform to collect, manage and report ESG data with quality and auditability.", nextSiteButton:"Visit the IBM Envizi website →", nextDemoLabel:"Request a demo", nextDemoIntro:"Enter your IBM or trusted Partner contact email. If you don't have one, write to us directly — we'll find the right solution together.", nextDemoEmailPlaceholder:"IBM or Partner contact email", nextDemoButton:"Request a demo →", nextDemoFallback:"No contact? Write to Felice →", nextPocLabel:"Proof of Concept", nextPocIntro:"Bring your real data into the platform: a tailored PoC to see IBM Envizi in action within your specific context, before any investment decision.", nextPocButton:"Request a PoC →", nextBvaLabel:"Business Value Assessment", nextBvaIntro:"Quantify the value IBM Envizi can generate for your organisation: time savings, risk reduction and impact on ESG cost of capital.", nextBvaButton:"Request a BVA →", nextContactLabel:"Your IBM contact", nextContactName:"Felice Petrignano", nextContactRole:"Senior ESG Solution Engineer and Advisor", nextContactEmail:"", thankYouTitle:"Grazie / Thank you", backScenarios:"Back to scenarios", prereqNoteLabel:"PREREQUISITE", prereqNoteText:"Requires IBM Envizi Data Foundation (Mission 01)", prereqLabel:"PREREQUISITE NOT MET", prereqText:"To adopt IBM Envizi in this scenario you must first activate the Data Foundation in Mission 01 — ESG Data Factory.", prereqLinkLabel:"Go to Mission 01 →", tobeKicker:"TO BE projection", tobeTitle:"How your parameters will change.", tobeSubtitle:"Estimated impact · 12 months", tobeAsIs:"Current AS-IS", tobeToBe:"Estimated TO BE", tobeDelta:"Expected change", tobeDisclaimer:"TO BE estimates are indicative projections based on IBM Envizi adoption cases. Actual benefits depend on context, scope and process maturity. They do not constitute a guarantee of results.", tobeCta:"See the trust impact", trustKicker:"Trust indicator", trustTitle:"Why choose IBM Envizi?", trustIntro:"At this stage the market is assessing governance, execution credibility and data quality. Each choice changes the level of confidence with which the Board, banks, clients and auditors will read the ESG plan.", trustScore:"Trust index", trustBase:"Opening baseline", trustMax:"Ceiling 100", trustStakeholders:"Stakeholder lens", trustBoard:"Board", trustBanks:"Banks", trustClients:"Clients", trustAuditors:"Auditors", trustGainPositive:"Strategically strong decision · +15", trustGainWarning:"Acceptable but not scalable decision · +7", trustGainCritical:"Defensive decision with no trust creation · +0", trustContinue:"Back to missions", trustCurrentDecision:"Board reading", trustProgressLabel:"Trust accumulated across the roadmap", trustPersonaLabel:"Decision owner",
    roadmapKicker:"Your roadmap", roadmapTitle:"From identified needs to decision challenges.", roadmapIntro:"Each data need is linked to a challenge. Tackle the scenarios in any order: every decision builds your ESG roadmap.", missionReview:"Explore further", roadmapProgress:"Roadmap completed", moveLeft:"Move left", moveRight:"Move right", adoptedDecision:"Decision adopted", expectedImpact:"Expected impact", decisionLabels:{positive:"IBM Envizi Data Foundation",warning:"A “simple” forms-based solution not integrated with sources",critical:"Postpone until next year"}, outcomeLabels:{positive:"−62% reporting time · +34% data quality",warning:"−12% reporting time · +8% data quality · limited benefit",critical:"No improvement · Board confidence remains low"},
    benchmarkLabel:"Scenario reference", yourValue:"Your current parameters", sourceLabel:"IBM Envizi methodology source", benchmarkNote:"These figures are scenario assumptions, not industry benchmarks. The source describes the Envizi approach to data capture, quality and auditability.",
    dataQuality:"Data quality", reportingTime:"Reporting time", confidence:"Stakeholder confidence", successTitle:"A Data Foundation ready to scale.", eyebrow:"IBM ENVIZI · IMPACT EXPERIENCE", title:"Every data point changes the story.", intro:"Step into the role of an ESG Manager. Face real decisions, measure their impact and lead the company towards credible goals.", language:"Choose your language", profile:"Choose your profile", maleRole:"ESG Manager · Operations", femaleRole:"ESG Manager · Strategy", start:"Enter the company", select:"Select a profile to continue", sameStory:"One story · Two protagonists · Real impact", disclaimer:"This experience was conceived and developed by Felice Petrignano, Senior ESG Solution Engineer and Advisor, based on his professional experience and perspective. Its content reflects personal views and does not necessarily represent official IBM positions.",
    mission0QuestionKicker:"CHALLENGE · MISSION 01",mission0Question:"How should ESG data be managed?",mission0QuestionBody:"Faced with data from multiple sites, plants and functions — often collected via Excel and manual processes — which approach best fits COMPANY_NAME's current and future needs, balancing data quality, traceability, effort required and the ability to scale over time?",mission0Cta:"Enter the challenge →",
    missionIntroData:[
      {eyebrow:"REPORTING · MISSION 01 · DATA FOUNDATION",title:"From invisible data to trusted decisions",kicker:"CHALLENGE · MISSION 01",question:"How should ESG data be managed?",body:"Faced with data from multiple sites, plants and functions — often collected via Excel and manual processes — which approach best fits COMPANY_NAME's current and future needs, balancing data quality, traceability, effort required and the ability to scale over time?",cta:"Enter the challenge →"},
      {eyebrow:"REPORTING · MISSION 02 · ENERGY AND DECARBONISATION",title:"From consumption to action",kicker:"CHALLENGE · MISSION 02",question:"How should energy performance be managed?",body:"Faced with utility bills and digital-meter data spread across sites, which approach allows COMPANY_NAME to detect anomalies, benchmark performance and assign corrective actions in a timely way?",cta:"Enter the challenge →"},
      {eyebrow:"REPORTING · MISSION 03 · SUPPLY CHAIN ENGAGEMENT",title:"From suppliers to Scope 3 data",kicker:"CHALLENGE · MISSION 03",question:"How should the supply chain be engaged for Scope 3?",body:"Faced with incomplete Scope 3 categories and fragmented supplier responses, which approach allows COMPANY_NAME to extend coverage, improve data quality and integrate responses into GHG accounting?",cta:"Enter the challenge →"},
      {eyebrow:"REPORTING · MISSION 04 · REPORTING AND PERFORMANCE",title:"From ESG data to decisions",kicker:"CHALLENGE · MISSION 04",question:"How should ESG performance reporting be managed?",body:"Faced with the need to consolidate Scope 1, 2 and 3 emissions, analyse performance across sites and produce reports and dashboards for different stakeholders, which approach best fits COMPANY_NAME's current and future needs, considering reliability, analytical depth, customisation and scalability over time?",cta:"Enter the challenge →"},
      {eyebrow:"REPORTING · MISSION 05 · NET ZERO PATHWAY",title:"From scenarios to a verifiable plan",kicker:"CHALLENGE · MISSION 05",question:"How should the decarbonisation plan be built?",body:"Faced with heterogeneous initiative proposals, a constrained budget and the need to demonstrate Net Zero feasibility to the Board, which approach allows COMPANY_NAME to compare scenarios, select priority actions and track their execution?",cta:"Enter the challenge →"},
      {eyebrow:"REPORTING · MISSION 06 · ESG FRAMEWORKS AND DISCLOSURE",title:"From requirements to governed disclosure",kicker:"CHALLENGE · MISSION 06",question:"How should ESG frameworks be managed?",body:"Faced with continuously evolving CSRD, ESRS, GRI, SASB and CDP requirements, which approach allows COMPANY_NAME to keep frameworks current, map material information and produce disclosure-ready outputs without rebuilding everything each year?",cta:"Enter the challenge →"}
    ], missionMenuKicker:"Choose your challenge", missionMenuTitle:"Where do you want to begin?", missionMenuIntro:"Five missions, one transformation. Choose the scenario closest to your client's priorities.", missionSelect:"Start mission", missionDuration:"8–12 MIN", missionStartHere:"START HERE", missionLocked:"Available after the Data Foundation", companyIntro:"Your company", companyTitle:"COMPANY_NAME", companyStory:"A €400 million international manufacturing group, founded in Italy and grown across eight plants and five operating offices.", evolving:"COMPANY_NAME is evolving towards an ESG model to meet the changing needs of banks, regulators, customers and markets—turning fragmented data into trusted decisions.", revenue:"Annual revenue", plants:"Plants", offices:"Office locations", people:"Employees", explore:"Set ESG priorities", europe:"EUROPE · 6 PLANTS", usa:"USA · 1 PLANT", asia:"ASIA · 1 PLANT", hq:"HEADQUARTERS · MILAN", officeLabel:"5 OFFICE LOCATIONS",
    priorityKicker:"Before you begin", priorityTitle:"Business priorities linked to ESG", priorityIntro:"Rank the priorities driving COMPANY_NAME towards ESG. There is no universal answer: your order will shape how the impacts are interpreted.", moveUp:"Move up", moveDown:"Move down", confirm:"Confirm priorities", priorityNames:{credit:"Access to finance",compliance:"Compliance and reporting",customers:"Customers and tenders",efficiency:"Efficiency, energy and cost",supply:"Supply-chain resilience",reputation:"Reputation and talent attraction"}, priorityDetails:{credit:"Improving dialogue with banks and investors and financing conditions.",compliance:"Having verifiable data for CSRD, ESRS, disclosure and audit.",customers:"Meeting ESG requirements in supplier qualification and procurement.",efficiency:"Reducing consumption, waste, emissions and energy cost volatility.",supply:"Managing supply-chain risk, Scope 3 and supplier continuity.",reputation:"Strengthening stakeholder trust and attracting and retaining talent."},
    bridgeKicker:"From here on", bridgeTitle:"Five decisions. One transformation.", bridgeIntro:"You have set your priorities and identified your data needs. Now you will face five real-world scenarios: for each one you will choose how to respond to the challenge. Every decision builds trust and shapes your ESG roadmap.", bridgeCta:"Enter the quest", bridgePrereqLabel:"PREREQUISITE · FOUNDATIONAL BLOCK", bridgeCapLabel:"ADDITIONAL CAPABILITIES",
    bridgeMissions:[
      {num:"01",label:"The ESG data factory",need:"One verifiable source for emissions, energy and reporting."},
      {num:"02",label:"Energy and decarbonisation",need:"Interval data and bill analytics to cut costs and waste."},
      {num:"03",label:"Supply-chain engagement",need:"Structured Scope 3 and supplier responses integrable into GHG accounting."},
      {num:"04",label:"Reporting and performance",need:"GHG reporting, auditable workflows and reusable dashboards."},
      {num:"05",label:"The route to Net Zero",need:"What-if scenarios and abatement programmes verifiable over time."},
      {num:"06",label:"ESG frameworks and disclosure",need:"Managing CSRD, ESRS, GRI, SASB, CDP frameworks and material requirements mapping."}
    ],
    bridgeNote:"You can tackle missions in any order. Choices accumulate: each decision influences the ones that follow.",
    priorityDataKicker:"Your data needs", priorityDataTitle:"Data needs and associated challenges", priorityDataIntro:"You have defined your business priorities. Now for each business priority, select which factors to evaluate and assign a relevance and current criticality score to each one.", priorityDataCta:"Confirm priorities →",
    priorityDataNeeds:{
      credit:[
        {id:"credit-1",label:"Verifiable and auditable Scope 1, 2 and 3 emissions"},
        {id:"credit-2",label:"Structured ESG KPIs for dialogue with banks and investors"},
        {id:"credit-3",label:"Full traceability from source to the data communicated to the bank"},
        {id:"credit-4",label:"ESG data and plan usable in rating processes and peer benchmarking"},
        {id:"credit-5",label:"Disclosure aligned with ESRS and ISSB / IFRS S1 and S2 standards"},
        {id:"credit-6",label:"Forward-looking scenarios showing trajectories, gaps and the impact of ESG investments"},
        {id:"credit-7",label:"Business case for initiatives with costs, savings and avoided emissions"}
      ],
      compliance:[
        {id:"compliance-1",label:"Traceable and reconcilable Scope 1, 2 and 3 GHG calculations"},
        {id:"compliance-2",label:"Workflows with assignees, deadlines, responses and evidence for assurance"},
        {id:"compliance-3",label:"CSRD / ESRS, GRI, IFRS S1/S2 and other standards managed in the system"},
        {id:"compliance-4",label:"Change log and audit trail for every ESG data point"},
        {id:"compliance-5",label:"Identification and management of material information and gaps against standards"},
        {id:"compliance-6",label:"Completeness checks on missing, overlapping or delayed data"},
        {id:"compliance-7",label:"Quick access to data, factors, documents and evidence requested by auditors"}
      ],
      customers:[
        {id:"customers-1",label:"Scope 3 data by GHG Protocol category for procurement, transport and products"},
        {id:"customers-2",label:"Structured supplier responses integrable into GHG accounting"},
        {id:"customers-3",label:"Product Carbon Footprints provided by suppliers for relevant products and purchases"},
        {id:"customers-4",label:"Reusable ESG information for tender and procurement qualification requirements"},
        {id:"customers-5",label:"Environmental performance comparable against available market benchmarks"},
        {id:"customers-6",label:"Dashboards and KPIs dedicated to ESG requests from strategic customers"},
        {id:"customers-7",label:"Evidence on renewable energy and location-based and market-based Scope 2 emissions"}
      ],
      efficiency:[
        {id:"efficiency-1",label:"High-frequency interval data from meters and sub-metering systems"},
        {id:"efficiency-2",label:"Bill analytics by site, utility, cost and anomalous variation"},
        {id:"efficiency-3",label:"Energy KPIs normalised for weather and operational variables"},
        {id:"efficiency-4",label:"Automatic alerts on peaks, waste and consumption outside expected trends"},
        {id:"efficiency-5",label:"Consumption benchmarking across plants and monitoring against targets"},
        {id:"efficiency-6",label:"Identification of facilities with the greatest savings potential"},
        {id:"efficiency-7",label:"Economic and environmental assessment of efficiency interventions"}
      ],
      supply:[
        {id:"supply-1",label:"Scope 3 cat. 1 (purchased goods) and cat. 4 (upstream transport) data"},
        {id:"supply-2",label:"Supplier responses on emissions, targets, compliance and continuity"},
        {id:"supply-3",label:"Integration with ERP flows to process purchase orders and transactions"},
        {id:"supply-4",label:"ESG risk assessment by supplier and country of origin"},
        {id:"supply-5",label:"Traceability of corrective actions and improvement plans"},
        {id:"supply-6",label:"Monitoring of response rates and data quality received from suppliers"},
        {id:"supply-7",label:"Progressive transition from spend-based estimates to supplier-specific data and PCFs"}
      ],
      reputation:[
        {id:"reputation-1",label:"Clear, consistent ESG reports aligned with recognised frameworks"},
        {id:"reputation-2",label:"Verifiable data on diversity, safety, training and wellbeing"},
        {id:"reputation-3",label:"ESG indicators comparable over time, across sites and functions"},
        {id:"reputation-4",label:"Structured and reusable ESG content for external communication"},
        {id:"reputation-5",label:"Evidence of progress towards climate and Net Zero targets"},
        {id:"reputation-6",label:"Structured collection of ESG data and perceptions from employees and business functions"},
        {id:"reputation-7",label:"Summary dashboards to communicate culture, people and ESG results to management"}
      ]
    },
    mission:"Mission", missionTitle:"The factory of invisible data", companyFacts:"Manufacturing · €400M · 8 plants", briefing:"The Board wants a reliable ESG baseline within 90 days. Energy and environmental data is scattered across plants, suppliers and spreadsheets.", objective:"Your objective", objectiveText:"Create one verifiable source for emissions, energy and reporting without slowing production.", analyse:"Examine the AS-IS", asIsKicker:"Current-state snapshot", asIsTitle:"Four critical issues.\nOne underlying problem.", asIsIntro:"Before choosing a solution, examine how COMPANY_NAME manages ESG data today.", asIsItems:[{title:"Fragmented sources",detail:"Energy, environmental and production data is spread across 8 plants, ERP systems, invoices and email.",metric:"12 SOURCES"},{title:"Manual collection",detail:"Every month users copy values into different sheets, with reminders and checks managed by email.",metric:"180 HRS/MONTH"},{title:"Inconsistent rules",detail:"Units, emission factors and boundaries vary by site, forcing teams to rework comparisons.",metric:"17% ERRORS"},{title:"Slow audit",detail:"Reconstructing the origin, change and approval of a value requires separate files and manual checks.",metric:"6 WEEKS"}], proceedDecision:"Decisions →", decisionTitle:"Which path do you choose?", decisionIntro:"The choice must solve today’s problem without creating a larger one twelve months from now.", optionA:"Adopt an integrated Data Foundation", optionATag:"Recommended solution: IBM Envizi Premium", optionADetail:"Integrates data sources, automates collection and controls, reduces time and errors, and preserves a verifiable trail.", optionB:"A “simple” solution", optionBDetail:"Based on user forms that visually replace spreadsheets, but preserve manual work, reminders and errors; in a year's time, will you still be able to manage the volume?", optionC:"Postpone until next year", optionCDetail:"Avoid immediate cost, but leave the Board without a reliable baseline.", impact:"Decision impact · 12 months later", negativeTitle:"The new form has become the new spreadsheet.", negativeText:"The interface changed, but the process remains manual. More users and data increase errors, delays and control costs, while sources remain disconnected.", postponeTitle:"A year lost, the same problem—only larger.", postponeText:"Sources and volumes have grown while the baseline remains incomplete. The Board must decide without reliable data as reporting pressure rises.", successTitle:"A Data Foundation ready to scale.", successText:"Envizi progressively integrates sources across eight plants, automates controls and normalization, and creates a verifiable trail—reducing time and errors.", retry:"Review the decision", restart:"Change profile", continue:"Continue the quest", enviziValue:"ENVIZI VALUE UNLOCKED · DATA FOUNDATION"
  }
};

const defaultPriorities: Priority[] = ["customers","compliance","credit","efficiency","supply","reputation"];
const missionCatalog = [
  {icon:"DATA",it:"La fabbrica dei dati ESG",en:"The ESG data factory",itSub:"Baseline ESG e qualità dei dati",enSub:"ESG baseline and data quality",value:"DATA FOUNDATION"},
  {icon:"ENERGY",it:"Energia e decarbonizzazione",en:"Energy and decarbonization",itSub:"Consumi, anomalie e costi operativi",enSub:"Consumption, anomalies and operating cost",value:"PERFORMANCE"},
  {icon:"SCOPE 3",it:"Il coinvolgimento della supply chain",en:"Supply chain engagement",itSub:"Fornitori, acquisti e catena del valore",enSub:"Suppliers, procurement and value chain",value:"SUPPLY CHAIN"},
  {icon:"AUDIT",it:"Reporting e performance",en:"Reporting and performance",itSub:"GHG reporting, workflow e dashboard",enSub:"GHG reporting, workflows and dashboards",value:"REPORTING"},
  {icon:"2035",it:"La rotta verso Net Zero",en:"The route to Net Zero",itSub:"Scenari, investimenti e decarbonizzazione",enSub:"Scenarios, investment and decarbonisation",value:"PLANNING"},
  {icon:"CSRD",it:"Framework ESG e disclosure",en:"ESG frameworks and disclosure",itSub:"CSRD, ESRS, GRI, SASB, CDP e mappatura requisiti",enSub:"CSRD, ESRS, GRI, SASB, CDP and requirements mapping",value:"FRAMEWORK"}
];
const energyModule = {
  it:{briefing:"Fatture e dati dei contatori digitali degli otto stabilimenti arrivano con frequenze e formati diversi. Il COO vuole individuare scostamenti di costo, consumi anomali e sprechi senza attendere il consuntivo mensile.",objectiveText:"Unire analisi delle bollette e dati intervallari quasi in tempo reale dei contatori digitali per confrontare le curve di carico degli stabilimenti, trovare anomalie e assegnare tempestivamente le azioni correttive.",asIsTitle:"Bollette e contatori raccontano due storie separate.",asIsIntro:"Prima di decidere, osserva come COMPANY_NAME controlla oggi consumi, costi e anomalie energetiche.",asIsItems:[{title:"Consumi poco confrontabili",detail:"I dati non sono normalizzati per meteo e KPI produttivi, quindi intensità e prestazioni degli stabilimenti non sono confrontabili.",metric:"48 GWh/ANNO"},{title:"Costo delle utilities",detail:"Le fatture vengono consolidate manualmente; tariffe elevate, varianze e voci anomale emergono tardi.",metric:"€8,4M/ANNO"},{title:"Anomalie dei contatori",detail:"Picchi, domanda e consumi fuori orario nei dati intervallari non generano automaticamente alert e assegnazioni.",metric:"23 / MESE"},{title:"Verifica delle bollette",detail:"Dati mancanti, periodi sovrapposti e differenze rispetto allo storico richiedono controlli manuali.",metric:"68% MANUALE"}],units:["GWh/anno","M€/anno","anomalie/mese","% manuale"],decisionIntro:"Scegli come trasformare bollette e dati dei contatori in riduzione dei costi e azioni operative.",optionA:"Attivare Utility Bill Analytics e Interval Meter Analytics",optionADetail:"Consolida le bollette e ne rileva le anomalie; acquisisce quasi in tempo reale i dati intervallari dai contatori digitali, confronta le curve di carico delle sedi, genera alert e assegna le verifiche all’Energy Manager.",optionB:"Creare un cruscotto energetico manuale",optionBDetail:"Raccoglie caricamenti mensili di fatture e letture e rende i dati più visibili, ma varianze, alert e azioni restano dipendenti da controlli manuali.",optionC:"Mantenere bollette e contatori separati",optionCDetail:"Non richiede un nuovo progetto, ma costi anomali, sprechi e problemi di completezza continuano a emergere in ritardo.",successTitle:"Dalla bolletta all’anomalia, fino all’azione.",successText:"Utility Bill Analytics consolida costi e consumi e segnala varianze, dati mancanti, sovrapposizioni e costi unitari anomali. Interval Meter Analytics acquisisce quasi in tempo reale i dati dai contatori digitali, confronta le curve di carico delle sedi, rileva gli scostamenti e assegna gli alert all’Energy Manager.",warningTitle:"Più visibilità, poca capacità di agire.",warningText:"Il cruscotto mensile rende bollette e letture più leggibili e produce un beneficio iniziale, ma caricamenti, verifiche e assegnazione delle anomalie restano manuali.",criticalTitle:"Il consuntivo descrive il costo, non lo evita.",criticalText:"Dopo dodici mesi consumi e costi restano sui livelli attuali. Bollette e contatori rimangono separati e le anomalie continuano a essere riconosciute in ritardo.",metricLabels:["Consumo utilities","Costo utilities","Anomalie gestite in tempo"],positiveValues:["−9%","−11%","82%"],warningValues:["−2%","−3%","45%"],criticalValues:["INVARIATO","INVARIATO","BASSO · INVARIATO"],decisionLabels:{positive:"Utility Bill + Interval Meter Analytics",warning:"Cruscotto energetico manuale",critical:"Bollette e contatori separati"},outcomeLabels:{positive:"−9% consumi · −11% costo utilities · 82% anomalie gestite in tempo",warning:"−2% consumi · −3% costo · beneficio limitato",critical:"Consumi e costi invariati · gestione anomalie ancora bassa"}},
  en:{briefing:"Bills and digital-meter data from eight plants arrive at different frequencies and in different formats. The COO wants to identify cost variances, abnormal consumption and waste without waiting for month-end reporting.",objectiveText:"Combine utility-bill analysis with near-real-time interval data from digital meters to compare site load curves, find anomalies and assign corrective action promptly.",asIsTitle:"Bills and meters tell two separate stories.",asIsIntro:"Before deciding, examine how COMPANY_NAME currently controls energy consumption, cost and anomalies.",asIsItems:[{title:"Consumption is hard to compare",detail:"Data is not normalized for weather and production KPIs, so plant intensity and performance cannot be compared reliably.",metric:"48 GWh/YEAR"},{title:"Utility cost",detail:"Bills are consolidated manually; high rates, variances and unusual items emerge late.",metric:"€8.4M/YEAR"},{title:"Meter anomalies",detail:"Peaks, demand and out-of-hours interval consumption do not automatically trigger alerts and assignments.",metric:"23 / MONTH"},{title:"Bill checking",detail:"Missing data, overlapping periods and historical variances require manual checks.",metric:"68% MANUAL"}],units:["GWh/year","€M/year","anomalies/month","% manual"],decisionIntro:"Choose how to turn utility bills and meter data into lower cost and operational action.",optionA:"Activate Utility Bill Analytics and Interval Meter Analytics",optionADetail:"Consolidates bills and detects billing anomalies; captures near-real-time interval data from digital meters, compares site load curves, generates alerts and assigns investigations to the Energy Manager.",optionB:"Create a manual energy dashboard",optionBDetail:"Monthly uploads of bills and readings improve visibility, but variances, alerts and actions still depend on manual checks.",optionC:"Keep bills and meters separate",optionCDetail:"Requires no new project, but abnormal costs, waste and completeness issues continue to emerge late.",successTitle:"From the bill to the anomaly—and into action.",successText:"Utility Bill Analytics consolidates cost and consumption and flags variances, missing data, overlaps and unusual unit costs. Interval Meter Analytics captures near-real-time data from digital meters, compares site load curves, detects deviations and assigns alerts to the Energy Manager.",warningTitle:"More visibility, limited ability to act.",warningText:"The monthly dashboard makes bills and readings easier to interpret and delivers an initial benefit, but uploads, checks and anomaly assignment remain manual.",criticalTitle:"The report describes the cost; it does not prevent it.",criticalText:"After twelve months, consumption and costs remain at current levels. Bills and meters remain separate and anomalies continue to be recognized late.",metricLabels:["Utility consumption","Utility cost","Anomalies handled promptly"],positiveValues:["−9%","−11%","82%"],warningValues:["−2%","−3%","45%"],criticalValues:["UNCHANGED","UNCHANGED","LOW · UNCHANGED"],decisionLabels:{positive:"Utility Bill + Interval Meter Analytics",warning:"Manual energy dashboard",critical:"Bills and meters remain separate"},outcomeLabels:{positive:"−9% consumption · −11% utility cost · 82% anomalies handled promptly",warning:"−2% consumption · −3% cost · limited benefit",critical:"Consumption and costs unchanged · anomaly response remains low"}}
};
const supplyChainModule = {
  it:{briefing:"COMPANY_NAME deve ampliare l’inventario Scope 3 oltre gli acquisti. Servono dati su commuting, trasporti upstream e downstream, attività a valle e, per i fornitori più rilevanti, informazioni granulari sulle emissioni dei prodotti.",objectiveText:"Coprire progressivamente le categorie GHG Protocol, coinvolgere fornitori e referenti interni e migliorare la qualità del dato passando dalle stime spend-based ai dati specifici di fornitore e prodotto.",asIsTitle:"Lo Scope 3 viaggia ancora come allegato e-mail.",asIsIntro:"Oggi PDF, fogli e richieste separate producono una visione incompleta della catena del valore.",asIsItems:[{title:"Categorie incomplete",detail:"La raccolta è concentrata sugli acquisti; commuting, trasporti, uso e fine vita dei prodotti non seguono un processo comune.",metric:"4 / 15 CATEGORIE"},{title:"Risposte poco complete",detail:"I fornitori ricevono PDF via e-mail, interpretano le domande in modo diverso e spesso inviano allegati non confrontabili.",metric:"38% COMPLETE"},{title:"Granularità limitata",detail:"Le emissioni sono stimate soprattutto da spesa e fattori medi; pochi acquisti hanno dati specifici di fornitore o Product Carbon Footprint.",metric:"9% PRODUCT-LEVEL"},{title:"Solleciti manuali",detail:"Scadenze, chiarimenti e fornitori in ritardo vengono controllati con caselle e-mail e tracker separati.",metric:"126 / MESE"}],units:["categorie","% complete","% product-level","solleciti/mese"],decisionIntro:"Scegli come estendere la copertura Scope 3 e aumentare la qualità dei dati della supply chain.",optionA:"Integrare Envizi Surveys e Supply Chain Intelligence",optionADetail:"Surveys gestisce domande multiple, allegati, commenti, scadenze e stato delle risposte per categorie e soggetti diversi. Supply Chain Intelligence integra le righe d’ordine ERP per categorie 1 e 2, coinvolge i fornitori e privilegia dati corporate, supplier-specific e PCF quando disponibili.",optionB:"Adottare un portale questionari separato",optionBDetail:"Migliora distribuzione e compilazione rispetto ai PDF, ma resta scollegato da ERP, motore di calcolo e inventario ESG: mapping, validazioni, fattori e riconciliazione degli allegati rimangono manuali.",optionC:"Continuare con PDF, e-mail e fogli",optionCDetail:"Mantiene il processo conosciuto, ma non amplia la copertura, non identifica rapidamente i ritardi e non aumenta la granularità dei dati.",successTitle:"Dalla richiesta generica al dato che guida la filiera.",successText:"Surveys & Assessments raccoglie dati ESG quantitativi e qualitativi da referenti interni e soggetti terzi attraverso campi di testo, liste di selezione e allegati. Il Survey Portal e l’Issue Management gestiscono notifiche, scadenze, stato delle risposte, commenti e solleciti. IBM Envizi Supply Chain Intelligence (SCI) acquisisce direttamente dati transazionali, righe d’ordine e spesa da ERP e sistemi finanziari per le categorie Scope 3 1 e 2, applica il metodo di calcolo più appropriato tra spend-based, dati medi, ibrido e supplier-specific e coinvolge i fornitori per raccogliere emissioni corporate, obiettivi, dati ESG e Product Carbon Footprint, evidenziando lacune di qualità e hotspot a livello di fornitore e prodotto.",warningTitle:"Il questionario è digitale, il processo resta separato.",warningText:"Il portale aumenta il tasso di risposta e riduce parte delle e-mail, ma dati, calcoli e acquisti non sono integrati. Il team continua a mappare categorie, validare allegati e riconciliare manualmente le risposte con l’inventario Scope 3.",criticalTitle:"Più PDF non producono più conoscenza.",criticalText:"Dopo dodici mesi copertura, completezza e granularità restano ai livelli attuali. I fornitori in ritardo vengono ancora inseguiti manualmente e le decisioni si basano soprattutto su fattori medi.",metricLabels:["Categorie Scope 3 coperte","Risposte complete","Dati supplier/product-level"],positiveValues:["13 / 15","78%","45%"],warningValues:["7 / 15","54%","16%"],criticalValues:["4 / 15 · INVARIATE","38% · INVARIATO","9% · INVARIATO"],decisionLabels:{positive:"Envizi Surveys + Supply Chain Intelligence",warning:"Portale questionari separato",critical:"PDF, e-mail e fogli"},outcomeLabels:{positive:"13/15 categorie · 78% risposte complete · 45% dati supplier/product-level",warning:"7/15 categorie · 54% risposte · integrazione e granularità limitate",critical:"Copertura, risposte e granularità invariate"},enviziValue:"VALORE ENVIZI SBLOCCATO · SCOPE 3 ENGAGEMENT"},
  en:{briefing:"COMPANY_NAME must expand its Scope 3 inventory beyond procurement. It needs data on employee commuting, upstream and downstream transportation, downstream activities and, for material suppliers, granular product-emissions information.",objectiveText:"Progressively cover GHG Protocol categories, engage suppliers and internal owners, and improve data quality by moving from spend-based estimates to supplier- and product-specific data.",asIsTitle:"Scope 3 still travels as an email attachment.",asIsIntro:"Today, PDFs, spreadsheets and separate requests create an incomplete view of the value chain.",asIsItems:[{title:"Incomplete category coverage",detail:"Collection focuses on purchases; commuting, transportation, product use and end of life do not follow a common process.",metric:"4 / 15 CATEGORIES"},{title:"Low-quality responses",detail:"Suppliers receive PDFs by email, interpret questions differently and often return attachments that cannot be compared.",metric:"38% COMPLETE"},{title:"Limited granularity",detail:"Emissions rely mainly on spend and average factors; few purchases have supplier-specific data or Product Carbon Footprints.",metric:"9% PRODUCT-LEVEL"},{title:"Manual follow-up",detail:"Deadlines, clarifications and overdue suppliers are tracked through email inboxes and separate trackers.",metric:"126 / MONTH"}],units:["categories","% complete","% product-level","reminders/month"],decisionIntro:"Choose how to extend Scope 3 coverage and improve supply-chain data quality.",optionA:"Combine Envizi Surveys and Supply Chain Intelligence",optionADetail:"Surveys manages multiple question types, attachments, comments, due dates and response status across categories and respondents. Supply Chain Intelligence integrates ERP order lines for categories 1 and 2, engages suppliers and prioritizes corporate, supplier-specific and PCF data when available.",optionB:"Adopt a separate questionnaire portal",optionBDetail:"Improves distribution and completion compared with PDFs, but remains disconnected from ERP, the calculation engine and ESG inventory; mapping, validation, factors and attachment reconciliation remain manual.",optionC:"Continue with PDFs, email and spreadsheets",optionCDetail:"Keeps the familiar process, but does not expand coverage, identify late responses quickly or increase data granularity.",successTitle:"From a generic request to data that steers the value chain.",successText:"Surveys coordinates different Scope 3 collections with structured questions, attachments, comments and response workflows. Supply Chain Intelligence connects ERP purchases, supplier materiality, calculations and requests for corporate or PCF data, exposing gaps and hotspots down to product level.",warningTitle:"The questionnaire is digital; the process remains disconnected.",warningText:"The portal improves response rates and reduces some email, but data, calculations and purchasing remain separate. The team still maps categories, validates attachments and manually reconciles responses with the Scope 3 inventory.",criticalTitle:"More PDFs do not create more insight.",criticalText:"After twelve months, coverage, completeness and granularity remain at current levels. Late suppliers are still chased manually and decisions continue to rely mainly on average factors.",metricLabels:["Scope 3 categories covered","Complete responses","Supplier/product-level data"],positiveValues:["13 / 15","78%","45%"],warningValues:["7 / 15","54%","16%"],criticalValues:["4 / 15 · UNCHANGED","38% · UNCHANGED","9% · UNCHANGED"],decisionLabels:{positive:"Envizi Surveys + Supply Chain Intelligence",warning:"Separate questionnaire portal",critical:"PDFs, email and spreadsheets"},outcomeLabels:{positive:"13/15 categories · 78% complete responses · 45% supplier/product-level data",warning:"7/15 categories · 54% responses · limited integration and granularity",critical:"Coverage, responses and granularity unchanged"},enviziValue:"ENVIZI VALUE UNLOCKED · SCOPE 3 ENGAGEMENT"}
};
const reportingModule = {
  it:{briefing:"COMPANY_NAME deve trasformare i dati provenienti dai PLANTS_COUNT stabilimenti in un inventario consolidato delle emissioni Scope 1, 2 e 3. Management e funzioni operative hanno bisogno di analizzare trend, confrontare le performance delle sedi, individuare le principali fonti emissive e monitorare i risultati nel tempo.",objectiveText:"Creare un sistema di reporting che produca inventari GHG affidabili, report preconfigurati, PowerReports personalizzabili basati su Power BI e dashboard dedicate ai diversi stakeholder, trasformando i dati ESG in informazioni comprensibili e utili alle decisioni.",asIsTitle:"I dati sono affidabili, ma il reporting resta frammentato.",asIsIntro:"La Data Foundation ha reso disponibili dati ESG verificabili e riconciliati. Inventari GHG, analisi delle performance e dashboard vengono però ancora prodotti attraverso elaborazioni e strumenti separati.",asIsItems:[{title:"Inventario GHG ricostruito",detail:"Le viste consolidate delle emissioni Scope 1, 2 e 3 vengono preparate periodicamente attraverso estrazioni e passaggi manuali.",metric:"14 FILE DI CALCOLO"},{title:"Analisi Scope 1 e 2 separate",detail:"Emissioni per fonte, stabilimento e periodo, incluse le prospettive location-based e market-based, non sono disponibili in un'unica vista interattiva.",metric:"6 VISTE SEPARATE"},{title:"Scope 3 difficile da interpretare",detail:"Le emissioni delle diverse categorie sono calcolate, ma identificare hotspot, metodologie utilizzate e livello di accuratezza richiede analisi aggiuntive.",metric:"ANALISI MANUALI"},{title:"Dashboard ricostruite",detail:"CdA, management, banche, clienti e auditor richiedono viste differenti, generando ogni volta nuove estrazioni, grafici e presentazioni.",metric:"14 SETTIMANE"}],units:["file di calcolo","viste separate","analisi manuali","settimane"],decisionIntro:"Scegli come rendere reporting e assurance un processo continuo, distribuito e governato.",optionA:"Integrare ESG Reporting Frameworks e GHG Reporting Envizi",optionADetail:"Usa framework gestiti e aggiornati nel servizio SaaS, workflow con owner, assignee, contributor, reviewer e approver, calcoli Scope 1–2 e Scope 3 su dati tracciabili, dashboard pronte e PowerReports Microsoft Power BI Embedded personalizzabili.",optionB:"Adottare un workflow documentale con template",optionBDetail:"Centralizza incarichi, scadenze e documenti, ma importa valori GHG già calcolati altrove. Aggiornamento dei questionari, fattori, riconciliazioni, lineage e dashboard restano attività separate o personalizzazioni manuali.",optionC:"Continuare con e-mail, Word e fogli di calcolo",optionCDetail:"Evita un nuovo sistema, ma mantiene sorveglianza normativa, calcoli, solleciti, versioni ed evidenze distribuiti tra i team.",successTitle:"Il reporting diventa un processo aziendale governato.",successText:"ESG Reporting Frameworks rende disponibili contenuti gestiti e aggiornati, riusa risposte ed evidenze e orchestra assegnazione, contributo, revisione e approvazione. I moduli Scope 1–2 e Scope 3 governano fattori, metodi e accuratezza dei calcoli. Dashboard preconfigurate e PowerReports personalizzabili trasformano lo stesso dato auditabile in viste per CdA, auditor e stakeholder.",warningTitle:"Il workflow avanza, ma il dato resta fuori.",warningText:"Il portale documentale riduce e-mail e rende visibili le scadenze, ma calcoli GHG, fattori, aggiornamenti dei framework e dashboard continuano a dipendere da file e integrazioni manuali. La responsabilità sul documento migliora; quella sul dato rimane frammentata.",criticalTitle:"La disclosure resta un esercizio di ricostruzione.",criticalText:"Dopo dodici mesi completezza, ritardi e durata del ciclo restano ai livelli attuali. Ogni modifica normativa riapre template e riconciliazioni, mentre auditor e CdA attendono evidenze disperse.",metricLabels:["Completezza disclosure","Domande nei tempi","Riduzione ciclo reporting"],positiveValues:["94%","89%","−45%"],warningValues:["72%","64%","−12%"],criticalValues:["58% · INVARIATA","54% · INVARIATO","NESSUNA"],decisionLabels:{positive:"Envizi Frameworks + Scope 1–2 + Scope 3 Reporting",warning:"Workflow documentale con template",critical:"E-mail, Word e fogli"},outcomeLabels:{positive:"94% completezza · 89% risposte nei tempi · −45% ciclo reporting",warning:"Workflow più visibile · calcoli, aggiornamenti e dashboard ancora separati",critical:"Completezza, puntualità e ciclo reporting invariati"},enviziValue:"VALORE ENVIZI SBLOCCATO · ESG & GHG REPORTING"},
  en:{briefing:"COMPANY_NAME must prepare ESG disclosures and its GHG inventory across Finance, Operations, HR, Procurement and plant managers. Frameworks, Scope 1–2 and Scope 3 calculations, evidence and approvals currently follow separate paths.",objectiveText:"Create one auditable process that keeps requirements current, assigns accountability, governs GHG calculations and produces reusable dashboards and disclosures.",asIsTitle:"Reporting is rebuilt every year.",asIsIntro:"Regulation, data, responses and evidence are distributed across files and people, so control happens mainly at the end.",asIsItems:[{title:"Manual updates",detail:"The team independently compares new versions of ESRS, GRI, SASB, CDP and other frameworks and edits local templates.",metric:"6 FRAMEWORKS"},{title:"Separate GHG calculations",detail:"Scope 1–2, emission factors and Scope 3 categories are managed in different models and reconciled before disclosure.",metric:"14 CALCULATION FILES"},{title:"Email workflow",detail:"Questions, evidence, reviews and approvals are chased through email and trackers without visible end-to-end accountability.",metric:"146 OVERDUE"},{title:"Dashboards rebuilt",detail:"Every audience requires new extracts and presentations, while traceability from charts to source must be reconstructed.",metric:"14 WEEKS"}],units:["frameworks","calculation files","overdue questions","weeks"],decisionIntro:"Choose how to make reporting and assurance a continuous, distributed and governed process.",optionA:"Combine Envizi ESG Reporting Frameworks and GHG Reporting",optionADetail:"Uses managed framework content kept current in the SaaS service, workflows with owners, assignees, contributors, reviewers and approvers, traceable Scope 1–2 and Scope 3 calculations, ready-made dashboards and customizable Microsoft Power BI Embedded PowerReports.",optionB:"Adopt a document workflow with templates",optionBDetail:"Centralizes tasks, deadlines and documents, but imports GHG totals calculated elsewhere. Questionnaire updates, factors, reconciliation, lineage and dashboards remain separate activities or manual customizations.",optionC:"Continue with email, Word and spreadsheets",optionCDetail:"Avoids a new system but keeps regulatory monitoring, calculations, reminders, versions and evidence distributed across teams.",successTitle:"Reporting becomes a governed enterprise process.",successText:"ESG Reporting Frameworks provides managed, current content, reuses responses and evidence, and orchestrates assignment, contribution, review and approval. Scope 1–2 and Scope 3 modules govern factors, methods and calculation accuracy. Preconfigured dashboards and customizable PowerReports turn the same auditable data into views for the Board, auditors and stakeholders.",warningTitle:"The workflow moves forward, but the data remains outside.",warningText:"The document portal reduces email and exposes deadlines, but GHG calculations, factors, framework updates and dashboards still depend on files and manual integrations. Accountability for the document improves; accountability for the data remains fragmented.",criticalTitle:"Disclosure remains a reconstruction exercise.",criticalText:"After twelve months, completeness, delays and cycle time remain at current levels. Every regulatory change reopens templates and reconciliations while auditors and the Board wait for scattered evidence.",metricLabels:["Disclosure completeness","Questions on time","Reporting-cycle reduction"],positiveValues:["94%","89%","−45%"],warningValues:["72%","64%","−12%"],criticalValues:["58% · UNCHANGED","54% · UNCHANGED","NONE"],decisionLabels:{positive:"Envizi Frameworks + Scope 1–2 + Scope 3 Reporting",warning:"Document workflow with templates",critical:"Email, Word and spreadsheets"},outcomeLabels:{positive:"94% completeness · 89% responses on time · −45% reporting cycle",warning:"More visible workflow · calculations, updates and dashboards remain separate",critical:"Completeness, timeliness and reporting cycle unchanged"},enviziValue:"ENVIZI VALUE UNLOCKED · ESG & GHG REPORTING"}
};
const planningModule = {
  it:{briefing:"Il CdA ha fissato una traiettoria Net Zero, ma stabilimenti e funzioni propongono iniziative diverse senza un metodo comune per confrontare CapEx, risparmi ed emissioni evitate. Il budget disponibile non può finanziare tutto.",objectiveText:"Costruire un portafoglio di decarbonizzazione che confronti scenari e investimenti, selezioni le azioni che chiudono il gap verso il target e ne verifichi l’esecuzione nel tempo.",asIsTitle:"Molte idee. Nessuna traiettoria condivisa.",asIsIntro:"Oggi le proposte nascono dai team, ma non esiste un modello che colleghi emissioni, budget, priorità e risultati reali.",asIsItems:[{title:"Idee non confrontabili",detail:"Efficienza, rinnovabili, elettrificazione e supply chain vengono proposte con ipotesi e formati differenti.",metric:"37 INIZIATIVE"},{title:"CapEx oltre il budget",detail:"Le richieste sommano 22 milioni di euro contro 12 milioni disponibili, senza una graduatoria condivisa per costo e CO₂e evitata.",metric:"€22M RICHIESTI"},{title:"Un solo scenario",detail:"Il piano confronta il target con una traiettoria statica; non valuta combinazioni alternative, rischi o variazioni di costo.",metric:"1 SCENARIO"},{title:"Esecuzione poco seguita",detail:"Dopo l’approvazione, avanzamento, spesa e benefici reali vengono aggiornati in presentazioni trimestrali separate.",metric:"31% MONITORATO"}],units:["iniziative","M€ richiesti","scenari","% monitorato"],decisionIntro:"Scegli come trasformare le proposte dei team in un piano finanziabile, adattabile e verificabile.",optionA:"Integrare Scenario Modeler, Program Tracking e Planning Analytics con AI",optionADetail:"Parte dalla baseline Envizi, crea forecast e scenari what-if, applica programmi di abbattimento, confronta CapEx, OpEx e CO₂e, ottimizza le combinazioni rispetto al budget e riporta target e programmi in Envizi per seguirne l’esecuzione.",optionB:"Creare un portafoglio progetti in foglio e project tool",optionBDetail:"Introduce criteri comuni, scoring e milestone, ma scenari e curve di abbattimento restano statici; baseline, actual, budget e tracking non sono collegati e il reforecast richiede riconciliazioni manuali.",optionC:"Continuare a raccogliere le idee dei team",optionCDetail:"Preserva autonomia e velocità iniziale, ma il CdA non può confrontare scenari, selezionare il miglior portafoglio entro budget o verificare se il piano chiude il gap.",successTitle:"Il piano diventa una decisione continua.",successText:"Planning Analytics, potenziato dall’AI, confronta baseline, target e scenari what-if e simula combinazioni di programmi rispetto a budget e traiettoria. Sustainability Program Tracking registra costi, risparmi, responsabili e avanzamento; Target Setting + Tracking confronta actual e obiettivi, permettendo di correggere il piano prima che resti teorico.",warningTitle:"Il portafoglio è ordinato, ma resta statico.",warningText:"Scoring e milestone migliorano la selezione iniziale, ma ogni variazione di budget, costi o prestazioni richiede nuovi fogli. Gli actual non aggiornano automaticamente la traiettoria e il team scopre tardi se il piano non chiude il gap.",criticalTitle:"Le idee non diventano un piano finanziabile.",criticalText:"Dopo dodici mesi il numero di proposte è cresciuto, ma capacità decisionale e monitoraggio restano ai livelli attuali. Il budget è distribuito senza una simulazione comune e il contributo reale al target rimane incerto.",metricLabels:["Budget su azioni prioritarie","Gap target coperto","Programmi monitorati"],positiveValues:["93%","88%","84%"],warningValues:["62%","51%","56%"],criticalValues:["41% · INVARIATO","34% · INVARIATO","31% · INVARIATO"],decisionLabels:{positive:"Envizi Planning + Scenario + Program Tracking",warning:"Foglio portafoglio + project tool",critical:"Idee bottom-up non coordinate"},outcomeLabels:{positive:"93% budget prioritizzato · 88% gap coperto · 84% programmi monitorati",warning:"Selezione più ordinata · scenari e reforecast ancora manuali",critical:"Prioritizzazione, copertura e monitoraggio invariati"},enviziValue:"VALORE ENVIZI SBLOCCATO · DECARBONIZATION PLANNING"},
  en:{briefing:"The Board has set a Net Zero pathway, but plants and functions propose different initiatives without a common method to compare CapEx, savings and avoided emissions. The available budget cannot fund everything.",objectiveText:"Build a decarbonization portfolio that compares scenarios and investments, selects actions that close the target gap and verifies execution over time.",asIsTitle:"Many ideas. No shared pathway.",asIsIntro:"Teams generate proposals, but no model connects emissions, budget, priorities and actual results.",asIsItems:[{title:"Ideas cannot be compared",detail:"Efficiency, renewables, electrification and supply-chain initiatives use different assumptions and formats.",metric:"37 INITIATIVES"},{title:"CapEx exceeds budget",detail:"Requests total €22 million against €12 million available, without a shared ranking by cost and avoided CO₂e.",metric:"€22M REQUESTED"},{title:"One static scenario",detail:"The plan compares the target with one trajectory and does not test alternatives, risks or cost changes.",metric:"1 SCENARIO"},{title:"Limited execution tracking",detail:"After approval, progress, spend and realized benefits are updated in separate quarterly presentations.",metric:"31% TRACKED"}],units:["initiatives","€M requested","scenarios","% tracked"],decisionIntro:"Choose how to turn team proposals into a fundable, adaptable and verifiable plan.",optionA:"Combine Scenario Modeler, Program Tracking and AI-infused Planning Analytics",optionADetail:"Starts from the Envizi baseline, builds forecasts and what-if scenarios, applies abatement programs, compares CapEx, OpEx and CO₂e, optimizes combinations against budget and returns targets and programs to Envizi for execution tracking.",optionB:"Create a project portfolio in spreadsheets and a project tool",optionBDetail:"Introduces common criteria, scoring and milestones, but scenarios and abatement curves remain static; baseline, actuals, budget and tracking are disconnected, and reforecasting requires manual reconciliation.",optionC:"Continue collecting team ideas",optionCDetail:"Preserves autonomy and initial speed, but the Board cannot compare scenarios, select the best portfolio within budget or verify whether the plan closes the gap.",successTitle:"The plan becomes a continuous decision process.",successText:"AI-infused Planning Analytics compares baseline, target and what-if scenarios and simulates program combinations against budget and pathway. Sustainability Program Tracking records costs, savings, owners and progress; Target Setting + Tracking compares actuals with targets, allowing the plan to be corrected before it remains theoretical.",warningTitle:"The portfolio is organized, but remains static.",warningText:"Scoring and milestones improve initial selection, but every change in budget, cost or performance requires new spreadsheets. Actuals do not automatically update the pathway, so the team discovers too late when the plan does not close the gap.",criticalTitle:"Ideas do not become a fundable plan.",criticalText:"After twelve months, the proposal list has grown, but decision capability and monitoring remain at current levels. Budget is allocated without a common simulation and the actual contribution to the target remains uncertain.",metricLabels:["Budget on priority actions","Target gap covered","Programs monitored"],positiveValues:["93%","88%","84%"],warningValues:["62%","51%","56%"],criticalValues:["41% · UNCHANGED","34% · UNCHANGED","31% · UNCHANGED"],decisionLabels:{positive:"Envizi Planning + Scenario + Program Tracking",warning:"Portfolio spreadsheet + project tool",critical:"Uncoordinated bottom-up ideas"},outcomeLabels:{positive:"93% budget prioritized · 88% gap covered · 84% programs monitored",warning:"More orderly selection · scenarios and reforecasting remain manual",critical:"Prioritization, coverage and monitoring unchanged"},enviziValue:"ENVIZI VALUE UNLOCKED · DECARBONIZATION PLANNING"}
};
const frameworkModule = {
  it:{briefing:"COMPANY_NAME deve allineare la propria disclosure ai framework ESG richiesti da banche, clienti e regolatori — CSRD, ESRS, GRI, SASB, CDP — ma i requisiti cambiano ogni anno e il team li insegue manualmente su file locali, senza un processo governato di aggiornamento e mappatura.",objectiveText:"Adottare un sistema che mantenga aggiornati i framework, mappi automaticamente i requisiti materiali, gestisca il processo di raccolta delle informazioni e produca output pronti per la disclosure.",asIsTitle:"Il framework cambia. Il processo no.",asIsIntro:"Prima di scegliere, osserva come COMPANY_NAME gestisce oggi i requisiti di disclosure ESG.",asIsItems:[{title:"Framework aggiornati a mano",detail:"Ogni nuova versione di ESRS, GRI, SASB o CDP viene confrontata manualmente con i template esistenti e le modifiche distribuite via e-mail.",metric:"6 FRAMEWORK"},{title:"Mappatura non strutturata",detail:"I requisiti materiali sono identificati in fogli separati; la correlazione tra informazione richiesta e dato disponibile non è tracciata.",metric:"48 ORE/CICLO"},{title:"Raccolta non governata",detail:"Non esiste un sistema unico per assegnare responsabilità, raccogliere evidenze e approvare le informazioni per ciascun requisito.",metric:"67% MANUALE"},{title:"Output non riutilizzabili",detail:"Le disclosure vengono costruite da zero ogni anno: tabelle, narrative e dati non sono collegati a una fonte centrale verificabile.",metric:"18 SETTIMANE"}],units:["framework","ore/ciclo","% manuale","settimane"],decisionIntro:"Scegli come gestire framework, mappatura e disclosure in modo governato e scalabile.",optionA:"Integrare ESG Reporting Frameworks Envizi con gestione integrata dei requisiti",optionADetail:"I framework ESRS, GRI, SASB e CDP sono gestiti e aggiornati nel servizio SaaS; la mappatura dei requisiti materiali è integrata nel sistema; workflow con owner, assignee, reviewer e approver guidano la raccolta; i PowerReports Power BI Embedded producono output riutilizzabili.",optionB:"Adottare uno strumento di gestione documentale con template framework",optionBDetail:"Centralizza i template e le assegnazioni, ma i framework restano aggiornati manualmente; la mappatura dei requisiti non è automatizzata; la tracciabilità dalla fonte alla disclosure è assente.",optionC:"Continuare con i file locali e aggiornamenti manuali",optionCDetail:"Nessun investimento immediato, ma ogni ciclo di disclosure richiede settimane di riconciliazione: il rischio di errori e non conformità cresce con la complessità normativa.",successTitle:"La disclosure diventa un processo industriale.",successText:"Envizi mantiene aggiornati i framework nel servizio SaaS, mappa i requisiti materiali, assegna responsabilità e produce output riutilizzabili per ogni stakeholder — senza ripartire da zero a ogni ciclo.",warningTitle:"Un passo avanti, ma la distanza dai requisiti resta.",warningText:"I template centralizzati migliorano l'ordine interno, ma i framework restano aggiornati a mano e la mappatura dei requisiti materiali è ancora un'attività manuale non tracciabile.",criticalTitle:"Il rischio normativo cresce ogni anno.",criticalText:"Mantenere i file locali significa inseguire ogni aggiornamento normativo senza una traccia verificabile: auditor e regolatori chiederanno evidenze che il processo attuale non può produrre.",metricLabels:["Framework gestiti","Ore per ciclo di disclosure","% processo manuale"],positiveValues:["+4 framework","−74% ore","12% manuale"],warningValues:["+2 framework","−30% ore","52% manuale"],criticalValues:["INVARIATO","INVARIATO","67% manuale"],enviziValue:"VALORE ENVIZI SBLOCCATO · ESG REPORTING FRAMEWORKS",decisionLabels:{positive:"ESG Reporting Frameworks IBM Envizi",warning:"Gestione documentale con template",critical:"Continuare con file locali"},outcomeLabels:{positive:"−74% ore per ciclo · framework sempre aggiornati",warning:"−30% ore · mappatura ancora manuale",critical:"Nessun miglioramento · rischio normativo crescente"}},
  en:{briefing:"COMPANY_NAME must align its ESG disclosure with frameworks required by banks, clients and regulators — CSRD, ESRS, GRI, SASB, CDP — but requirements change every year and the team tracks them manually in local files, without a governed update and mapping process.",objectiveText:"Adopt a system that keeps frameworks current, automatically maps material requirements, manages the information-gathering process and produces disclosure-ready outputs.",asIsTitle:"The framework changes. The process does not.",asIsIntro:"Before deciding, examine how COMPANY_NAME manages ESG disclosure requirements today.",asIsItems:[{title:"Manually updated frameworks",detail:"Every new version of ESRS, GRI, SASB or CDP is manually compared with existing templates and changes distributed by email.",metric:"6 FRAMEWORKS"},{title:"Unstructured mapping",detail:"Material requirements are tracked in separate spreadsheets; the link between required information and available data is not traced.",metric:"48 HRS/CYCLE"},{title:"Ungoverned collection",detail:"No single system exists to assign accountability, collect evidence and approve information for each requirement.",metric:"67% MANUAL"},{title:"Non-reusable outputs",detail:"Disclosures are rebuilt from scratch each year: tables, narratives and data are not linked to a central verifiable source.",metric:"18 WEEKS"}],units:["frameworks","hrs/cycle","% manual","weeks"],decisionIntro:"Choose how to manage frameworks, mapping and disclosure in a governed and scalable way.",optionA:"Combine Envizi ESG Reporting Frameworks with integrated requirements management",optionADetail:"ESRS, GRI, SASB and CDP frameworks are managed and kept current in the SaaS service; material requirements mapping is built into the system; workflows with owners, assignees, reviewers and approvers guide collection; Power BI Embedded PowerReports produce reusable outputs.",optionB:"Adopt a document-management tool with framework templates",optionBDetail:"Centralises templates and assignments, but frameworks still need manual updates; requirements mapping is not automated; traceability from source to disclosure is absent.",optionC:"Continue with local files and manual updates",optionCDetail:"No immediate investment, but every disclosure cycle requires weeks of reconciliation: the risk of errors and non-compliance grows with regulatory complexity.",successTitle:"Disclosure becomes an industrial process.",successText:"Envizi keeps frameworks current in the SaaS service, maps material requirements, assigns accountability and produces reusable outputs for every stakeholder — without starting from scratch each cycle.",warningTitle:"A step forward, but the gap to requirements remains.",warningText:"Centralised templates improve internal order, but frameworks still need manual updates and material requirements mapping remains a manual, untraceable activity.",criticalTitle:"Regulatory risk grows every year.",criticalText:"Keeping local files means chasing every regulatory update without a verifiable trail: auditors and regulators will ask for evidence the current process cannot produce.",metricLabels:["Frameworks managed","Hours per disclosure cycle","% manual process"],positiveValues:["+4 frameworks","−74% hours","12% manual"],warningValues:["+2 frameworks","−30% hours","52% manual"],criticalValues:["UNCHANGED","UNCHANGED","67% manual"],enviziValue:"ENVIZI VALUE UNLOCKED · ESG REPORTING FRAMEWORKS",decisionLabels:{positive:"IBM Envizi ESG Reporting Frameworks",warning:"Document management with templates",critical:"Continue with local files"},outcomeLabels:{positive:"−74% hours per cycle · frameworks always current",warning:"−30% hours · mapping still manual",critical:"No improvement · growing regulatory risk"}}
};

const imageFor = (profile: Profile, screen: Screen) => `./characters/${profile}-${screen === "decision" || screen === "asis" ? "thoughtful" : screen === "negative" ? "negative" : screen === "success" ? "success" : "neutral"}.png`;

type SectorDef={label:{it:string,en:string};dimLabel:{it:string,en:string};dimUnit:{it:string,en:string};opsLabel:{it:string,en:string};opsUnit:{it:string,en:string};defaults:[number,number,number,number,number]};
const SECTORS:Record<SectorKey,SectorDef>={
  manifatturiero:{label:{it:"Gruppo manifatturiero",en:"Manufacturing group"},dimLabel:{it:"Dimensione economica",en:"Economic size"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Unità operative",en:"Operational units"},opsUnit:{it:"stabilimenti",en:"Plants"},defaults:[100,3,5,1,500]},
  bancario:{label:{it:"Gruppo bancario",en:"Banking group"},dimLabel:{it:"Attivi",en:"Assets"},dimUnit:{it:"€mld attivi",en:"€B assets"},opsLabel:{it:"Filiali",en:"Branches"},opsUnit:{it:"filiali",en:"Branches"},defaults:[30,150,5,2,3000]},
  assicurativo:{label:{it:"Gruppo assicurativo",en:"Insurance group"},dimLabel:{it:"Premi",en:"Premiums"},dimUnit:{it:"€mld premi",en:"€B premiums"},opsLabel:{it:"Agenzie",en:"Agencies"},opsUnit:{it:"agenzie",en:"Agencies"},defaults:[1,300,10,2,1000]},
  utilities:{label:{it:"Gruppo utilities",en:"Utilities group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mld ricavi",en:"€B revenue"},opsLabel:{it:"Impianti",en:"Plants"},opsUnit:{it:"impianti",en:"Plants"},defaults:[1,30,20,2,3000]},
  distribuzione:{label:{it:"Gruppo distribuzione/GDO",en:"Retail/Distribution group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mld ricavi",en:"€B revenue"},opsLabel:{it:"Punti vendita",en:"Stores"},opsUnit:{it:"punti vendita",en:"Stores"},defaults:[1,100,10,2,5000]},
  farmaceutico:{label:{it:"Gruppo farmaceutico",en:"Pharma group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Stabilimenti/laboratori",en:"Plants/labs"},opsUnit:{it:"stabilimenti/laboratori",en:"Plants/labs"},defaults:[500,4,8,1,1500]},
  sanitario:{label:{it:"Gruppo sanitario",en:"Healthcare group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Ospedali/cliniche",en:"Hospitals/clinics"},opsUnit:{it:"ospedali/cliniche",en:"Hospitals/clinics"},defaults:[500,15,10,2,5000]},
  logistico:{label:{it:"Gruppo logistico",en:"Logistics group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Hub/magazzini",en:"Hubs/warehouses"},opsUnit:{it:"hub/magazzini",en:"Hubs/warehouses"},defaults:[500,30,15,1,3000]},
  alberghiero:{label:{it:"Gruppo alberghiero",en:"Hotel group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Hotel",en:"Hotels"},opsUnit:{it:"hotel",en:"Hotels"},defaults:[300,30,5,1,2000]},
  telecomunicazioni:{label:{it:"Gruppo telecomunicazioni",en:"Telecom group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mld ricavi",en:"€B revenue"},opsLabel:{it:"Siti di rete",en:"Network sites"},opsUnit:{it:"siti di rete",en:"Network sites"},defaults:[1,5000,30,5,4000]},
  trasporti:{label:{it:"Gruppo trasporti",en:"Transport group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mld ricavi",en:"€B revenue"},opsLabel:{it:"Mezzi/stazioni",en:"Vehicles/stations"},opsUnit:{it:"mezzi/stazioni",en:"Vehicles/stations"},defaults:[1,1000,20,2,6000]},
  costruzioni:{label:{it:"Gruppo costruzioni",en:"Construction group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Cantieri",en:"Sites"},opsUnit:{it:"cantieri",en:"Construction sites"},defaults:[500,20,10,1,2000]},
  immobiliare:{label:{it:"Gruppo immobiliare",en:"Real estate group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Immobili",en:"Properties"},opsUnit:{it:"immobili",en:"Properties"},defaults:[300,100,10,1,500]},
  media:{label:{it:"Gruppo media",en:"Media group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Testate/canali",en:"Titles/channels"},opsUnit:{it:"testate/canali",en:"Titles/channels"},defaults:[300,10,8,2,1000]},
  tecnologico:{label:{it:"Gruppo tecnologico/IT",en:"Tech/IT group"},dimLabel:{it:"Ricavi",en:"Revenue"},dimUnit:{it:"€mln ricavi",en:"€M revenue"},opsLabel:{it:"Strutture operative",en:"Operational units"},opsUnit:{it:"strutture operative",en:"Operational units"},defaults:[300,5,15,5,2000]},
  pa:{label:{it:"Pubblica amministrazione",en:"Public administration"},dimLabel:{it:"Bilancio",en:"Budget"},dimUnit:{it:"€mld bilancio",en:"€B budget"},opsLabel:{it:"Strutture",en:"Structures"},opsUnit:{it:"strutture",en:"Structures"},defaults:[1,100,50,3,5000]},
  universitario:{label:{it:"Gruppo universitario",en:"University group"},dimLabel:{it:"Bilancio",en:"Budget"},dimUnit:{it:"€mln bilancio",en:"€M budget"},opsLabel:{it:"Campus/dipartimenti",en:"Campuses/depts"},opsUnit:{it:"campus e dipartimenti",en:"Campuses and departments"},defaults:[500,30,30,2,4000]},
  nonprofit:{label:{it:"Fondazione/non profit",en:"Foundation/non-profit"},dimLabel:{it:"Risorse annue",en:"Annual resources"},dimUnit:{it:"€mln risorse annue",en:"€M annual resources"},opsLabel:{it:"Progetti/centri",en:"Projects/centres"},opsUnit:{it:"progetti/centri",en:"Projects/centres"},defaults:[100,20,10,1,500]},
};
const SECTOR_KEYS=Object.keys(SECTORS) as SectorKey[];
type DFRating="low"|"medium"|"high";
const DF_REQUIREMENTS:{id:string,it:string,en:string,critIt:string,critEn:string,capIt:string,capEn:string,toBeIt:string,toBeEn:string,benIt:string,benEn:string}[]=[
  {id:"df1",it:"Raccogliere dati ESG da fonti e formati diversi",en:"Collect ESG data from different sources and formats",
    critIt:"I dati sono dispersi tra ERP, e-mail, file CSV e portali separati: ogni raccolta richiede estrazione e riconciliazione manuale.",critEn:"Data is scattered across ERP systems, emails, CSV files and separate portals — every collection cycle requires manual extraction and reconciliation.",
    capIt:"Envizi acquisisce e consolida dati da sistemi aziendali, API, web form, survey e caricamenti massivi in un unico repository.",capEn:"Envizi ingests and consolidates data from enterprise systems, APIs, web forms, surveys and bulk uploads into a single repository.",
    toBeIt:"Un flusso automatizzato porta ogni fonte dati direttamente in Envizi, senza passaggi manuali intermedi.",toBeEn:"An automated flow brings every data source directly into Envizi, with no manual intermediate steps.",
    benIt:"Riduce la frammentazione e offre un punto di accesso unico alle informazioni ESG.",benEn:"Reduces fragmentation and provides a single access point for all ESG information."},
  {id:"df2",it:"Disporre di un'unica fonte affidabile per tutti i dati ESG",en:"Have a single reliable source for all ESG data",
    critIt:"Versioni parallele dei dati circolano su fogli diversi; non esiste un master record univoco su cui management e auditor possano fare affidamento.",critEn:"Parallel data versions circulate across different spreadsheets — there is no single master record that management and auditors can rely on.",
    capIt:"Envizi crea un sistema centralizzato e autorevole per dati ambientali, sociali e di governance, con accesso controllato per ruolo.",capEn:"Envizi creates a centralised, authoritative system for environmental, social and governance data, with role-based access control.",
    toBeIt:"Un unico sistema di record elimina le versioni parallele e diventa la fonte di riferimento per ogni decisione e disclosure.",toBeEn:"A single system of record eliminates parallel versions and becomes the reference source for every decision and disclosure.",
    benIt:"Evita versioni contrastanti dei dati e aumenta la fiducia di management, auditor e stakeholder.",benEn:"Avoids conflicting data versions and increases trust among management, auditors and stakeholders."},
  {id:"df3",it:"Uniformare dati con unità, valute e periodi differenti",en:"Normalise data with different units, currencies and periods",
    critIt:"Unità di misura, valute e periodi variano tra sedi: confrontare o aggregare i dati richiede rielaborazioni manuali ripetitive.",critEn:"Units of measure, currencies and periods vary across sites — comparing or aggregating data requires repetitive manual rework.",
    capIt:"Envizi normalizza automaticamente unità, valute e periodi, rendendo i dati aggregabili e confrontabili senza intervento manuale.",capEn:"Envizi automatically normalises units, currencies and periods, making data aggregable and comparable without manual intervention.",
    toBeIt:"Tutti i dati sono espressi in unità coerenti: i confronti tra sedi e periodi sono immediati e affidabili.",toBeEn:"All data is expressed in consistent units — comparisons across sites and periods are immediate and reliable.",
    benIt:"Riduce le elaborazioni manuali e consente confronti coerenti tra sedi, società e periodi.",benEn:"Reduces manual processing and enables consistent comparisons across sites, entities and periods."},
  {id:"df4",it:"Rappresentare una struttura organizzativa complessa",en:"Represent a complex, evolving organisational structure",
    critIt:"Le gerarchie organizzative cambiano spesso; aggiornare la struttura nei fogli di calcolo rompe le serie storiche e richiede riconciliazioni.",critEn:"Organisational hierarchies change frequently — updating the structure in spreadsheets breaks historical series and requires reconciliation.",
    capIt:"Envizi organizza i dati attraverso gerarchie flessibili per società, sedi, portafogli, aree geografiche e centri di costo.",capEn:"Envizi organises data through flexible hierarchies for companies, locations, portfolios, geographies and cost centres.",
    toBeIt:"La struttura organizzativa è gestita centralmente in Envizi: ogni variazione si riflette automaticamente su report e dashboard senza rielaborazioni.",toBeEn:"The organisational structure is managed centrally in Envizi — every change is automatically reflected across reports and dashboards without rework.",
    benIt:"Consente di analizzare e rendicontare i dati secondo diversi perimetri organizzativi e stakeholder.",benEn:"Enables analysis and reporting across different organisational perimeters and stakeholders."},
  {id:"df5",it:"Gestire dati ambientali e sociali sulla stessa piattaforma",en:"Manage environmental and social data on the same platform",
    critIt:"Dati ambientali e indicatori sociali vivono su sistemi separati; costruire una vista ESG integrata richiede esportazioni ed elaborazioni manuali.",critEn:"Environmental data and social indicators live in separate systems — building an integrated ESG view requires manual exports and processing.",
    capIt:"Envizi raccoglie e aggrega consumi, emissioni, acqua e rifiuti insieme a indicatori HR come dipendenti, incidenti, formazione e diversità.",capEn:"Envizi collects and aggregates energy, emissions, water and waste alongside HR indicators such as headcount, incidents, training and diversity.",
    toBeIt:"Un'unica piattaforma copre tutti gli indicatori ESG: la vista integrata è disponibile senza esportazioni o riconciliazioni.",toBeEn:"A single platform covers all ESG indicators — the integrated view is available without exports or reconciliation.",
    benIt:"Offre una visione ESG integrata senza dover mantenere archivi e processi separati.",benEn:"Provides an integrated ESG view without maintaining separate repositories and processes."},
  {id:"df6",it:"Identificare dati mancanti, incoerenti o anomali",en:"Identify missing, inconsistent or anomalous data",
    critIt:"I dati errati o incompleti vengono scoperti tardi, spesso solo in fase di reporting, quando correggerli è costoso e rallenta la chiusura.",critEn:"Erroneous or incomplete data is discovered late — often only during reporting — when correcting it is costly and delays the close.",
    capIt:"Envizi applica regole di validazione, alert, controlli di completezza e meccanismi di stima per i dati mancanti.",capEn:"Envizi applies validation rules, alerts, completeness checks and estimation mechanisms for missing data.",
    toBeIt:"I problemi di qualità sono segnalati in tempo reale, prima che raggiungano i report; il team interviene subito, non a consuntivo.",toBeEn:"Quality issues are flagged in real time, before they reach reports — the team acts immediately, not after the close.",
    benIt:"Riduce il tempo dedicato ai controlli manuali e migliora la qualità delle informazioni prima del reporting.",benEn:"Reduces time spent on manual checks and improves information quality ahead of reporting."},
  {id:"df7",it:"Ricostruire l'origine e le modifiche di ogni dato",en:"Trace the origin and changes of every data point",
    critIt:"In assenza di tracciabilità, rispondere a una richiesta di audit significa cercare e-mail, file e versioni precedenti dei fogli per ore o giorni.",critEn:"Without traceability, responding to an audit request means searching emails, files and previous spreadsheet versions for hours or days.",
    capIt:"Envizi conserva evidenze, record di dettaglio e tracciabilità completa dei dati usati nei calcoli e nei report.",capEn:"Envizi retains evidence, detail records and full traceability of data used in calculations and reports.",
    toBeIt:"Ogni dato è tracciabile dalla fonte al report in pochi clic: audit e assurance si gestiscono senza ricerche manuali.",toBeEn:"Every data point is traceable from source to report in a few clicks — audits and assurance are handled without manual searches.",
    benIt:"Facilita verifiche, assurance e audit, rendendo i risultati ESG più difendibili.",benEn:"Facilitates verifications, assurance and audits, making ESG results more defensible."},
  {id:"df8",it:"Automatizzare il calcolo delle emissioni Scope 1, 2 e 3",en:"Automate the calculation of Scope 1, 2 and 3 emissions",
    critIt:"I calcoli delle emissioni sono eseguiti manualmente su fogli complessi: errori nelle formule o nei fattori passano inosservati fino all'assurance.",critEn:"Emission calculations are performed manually on complex spreadsheets — formula or factor errors go unnoticed until assurance.",
    capIt:"Envizi trasforma i dati di attività in emissioni con un motore di calcolo strutturato e metodologie allineate al GHG Protocol.",capEn:"Envizi transforms activity data into emissions using a structured calculation engine aligned with the GHG Protocol.",
    toBeIt:"Il calcolo GHG è automatico, trasparente e verificabile: nessuna formula manuale, nessun rischio di errori silenti.",toBeEn:"GHG calculation is automatic, transparent and verifiable — no manual formulas, no risk of silent errors.",
    benIt:"Riduce il rischio di errori nei calcoli e libera tempo per analisi e iniziative di decarbonizzazione.",benEn:"Reduces calculation error risk and frees time for analysis and decarbonisation initiatives."},
  {id:"df9",it:"Disporre di fattori di emissione aggiornati e gestiti centralmente",en:"Have up-to-date emission factors managed centrally",
    critIt:"I team cercano e aggiornano manualmente i fattori di emissione: versioni diverse circolano tra sedi e anni, rendendo i confronti inaffidabili.",critEn:"Teams manually search for and update emission factors — different versions circulate across sites and years, making comparisons unreliable.",
    capIt:"Envizi mette a disposizione una libreria gestita di oltre 40.000 fattori di emissione, aggiornata nel servizio SaaS, più supporto a fattori custom.",capEn:"Envizi provides a managed library of over 40,000 emission factors, updated in the SaaS service, plus support for custom factors.",
    toBeIt:"I fattori sono aggiornati centralmente da IBM: ogni nuovo calcolo usa automaticamente la versione corrente, senza interventi del team.",toBeEn:"Factors are updated centrally by IBM — every new calculation automatically uses the current version, with no team intervention.",
    benIt:"Elimina la ricerca manuale dei fattori e rende più coerenti i risultati tra paesi e periodi.",benEn:"Eliminates manual factor research and makes results more consistent across countries and periods."},
  {id:"df10",it:"Scalare la raccolta riducendo dipendenza dai fogli di calcolo",en:"Scale data collection while reducing spreadsheet dependency",
    critIt:"All'aumentare di sedi e contributori, i fogli di calcolo diventano ingestibili: errori, versioni bloccate e tempi di raccolta crescono in modo non lineare.",critEn:"As sites and contributors grow, spreadsheets become unmanageable — errors, locked versions and collection times increase non-linearly.",
    capIt:"Envizi automatizza i flussi tramite connettori, API, template e workflow, con modalità guidate per i contributori occasionali.",capEn:"Envizi automates flows via connectors, APIs, templates and workflows, with guided modes for occasional contributors.",
    toBeIt:"Il processo scala a decine di sedi e centinaia di utenti senza aggiungere complessità operativa o rischio di errore.",toBeEn:"The process scales to dozens of sites and hundreds of users without adding operational complexity or error risk.",
    benIt:"Consente di estendere il processo a più sedi e utenti senza aumentare proporzionalmente tempi, errori e carico operativo.",benEn:"Enables you to extend the process to more sites and users without proportionally increasing time, errors and operational load."},
];
const RF_REQUIREMENTS:{id:string,it:string,en:string,capIt:string,capEn:string,benIt:string,benEn:string}[]=[
  {id:"rf1",it:"Calcolare l'inventario GHG Scope 1 e 2 con metodi location-based e market-based",en:"Calculate the Scope 1 and 2 GHG inventory using location-based and market-based methods",capIt:"IBM Envizi governa fattori di emissione, metodologie e calcoli Scope 1–2, supportando sia il metodo location-based che market-based e producendo inventari riconciliati.",capEn:"IBM Envizi governs emission factors, methodologies and Scope 1–2 calculations, supporting both location-based and market-based methods and producing reconciled inventories.",benIt:"Elimina le riconciliazioni manuali tra metodi e riduce il rischio di errori nei calcoli GHG.",benEn:"Eliminates manual reconciliation between methods and reduces the risk of errors in GHG calculations."},
  {id:"rf2",it:"Calcolare le emissioni Scope 3 per categoria GHG Protocol",en:"Calculate Scope 3 emissions by GHG Protocol category",capIt:"IBM Envizi supporta il calcolo delle principali categorie Scope 3 con fattori e metodi coerenti con il GHG Protocol, a partire dai dati già presenti nel sistema.",capEn:"IBM Envizi supports the calculation of the main Scope 3 categories with GHG Protocol-aligned factors and methods, drawing from data already held in the system.",benIt:"Riduce le elaborazioni manuali e rende comparabili le categorie Scope 3 nel tempo e tra sedi.",benEn:"Reduces manual processing and makes Scope 3 categories comparable over time and across sites."},
  {id:"rf3",it:"Analizzare le emissioni per fonte, sito e periodo in un'unica vista",en:"Analyse emissions by source, site and period in a single view",capIt:"IBM Envizi fornisce dashboard preconfigurate per analizzare Scope 1–2 per sito, fonte e periodo, con drill-down dai totali aggregati ai dati di dettaglio.",capEn:"IBM Envizi provides preconfigured dashboards to analyse Scope 1–2 by site, source and period, with drill-down from aggregated totals to detail-level data.",benIt:"Consente a management e funzioni operative di confrontare le performance senza necessità di estrazioni manuali.",benEn:"Allows management and operational teams to compare performance without manual extractions."},
  {id:"rf4",it:"Identificare gli hotspot emissivi e le principali fonti di emissione",en:"Identify emission hotspots and primary emission sources",capIt:"IBM Envizi permette di analizzare la distribuzione delle emissioni per fonte, categoria e sito, evidenziando le voci che incidono maggiormente sull'inventario totale.",capEn:"IBM Envizi lets you analyse the distribution of emissions by source, category and site, highlighting the entries with the greatest impact on the total inventory.",benIt:"Orienta le priorità di decarbonizzazione e supporta le decisioni di investimento con dati verificabili.",benEn:"Guides decarbonisation priorities and supports investment decisions with verifiable data."},
  {id:"rf5",it:"Produrre report preconfigurati pronti per la disclosure",en:"Produce preconfigured reports ready for disclosure",capIt:"IBM Envizi include report preconfigurati per i principali requisiti di disclosure GHG, esportabili e pronti per la revisione e l'approvazione.",capEn:"IBM Envizi includes preconfigured reports for the main GHG disclosure requirements, exportable and ready for review and approval.",benIt:"Riduce il tempo di preparazione della disclosure e garantisce coerenza tra i cicli di rendicontazione.",benEn:"Reduces disclosure preparation time and ensures consistency across reporting cycles."},
  {id:"rf6",it:"Creare dashboard e PowerReports personalizzabili per stakeholder diversi",en:"Create customisable dashboards and PowerReports for different stakeholders",capIt:"IBM Envizi supporta la creazione di PowerReports personalizzabili con Microsoft Power BI Embedded, integrati nei dati del sistema senza esportazioni manuali.",capEn:"IBM Envizi supports the creation of customisable PowerReports with embedded Microsoft Power BI, integrated directly into system data without manual exports.",benIt:"Consente di produrre viste dedicate per CdA, banche, clienti e auditor dallo stesso dato auditabile.",benEn:"Enables dedicated views for Board, banks, clients and auditors from the same auditable data source."},
  {id:"rf7",it:"Risalire dai report ai dati e alle metodologie sottostanti",en:"Trace back from reports to the underlying data and methodologies",capIt:"IBM Envizi mantiene la tracciabilità completa dal valore presentato in dashboard o report al dato originale, al fattore applicato e al metodo utilizzato.",capEn:"IBM Envizi maintains full traceability from the value shown in a dashboard or report back to the original data, the factor applied and the method used.",benIt:"Facilita l'assurance esterna e risponde alle richieste di auditor e regolatori con evidenze dirette.",benEn:"Facilitates external assurance and responds to auditor and regulator requests with direct evidence."},
  {id:"rf8",it:"Monitorare i KPI GHG nel tempo e rispetto ai target",en:"Monitor GHG KPIs over time and against targets",capIt:"IBM Envizi permette di confrontare i valori effettivi con i target, visualizzare l'andamento nel tempo e ricevere alert su scostamenti significativi.",capEn:"IBM Envizi lets you compare actual values against targets, visualise trends over time and receive alerts on significant deviations.",benIt:"Rende il monitoraggio della decarbonizzazione continuo e visibile a tutta l'organizzazione.",benEn:"Makes decarbonisation monitoring continuous and visible across the organisation."},
];
const EF_REQUIREMENTS:{id:string,it:string,en:string,capIt:string,capEn:string,benIt:string,benEn:string}[]=[
  {id:"ef1",it:"Acquisire automaticamente i dati intervallari dai contatori digitali",en:"Automatically capture interval data from digital meters",capIt:"Envizi Interval Meter Analytics acquisisce letture quasi in tempo reale dai contatori, le normalizza e le rende disponibili per l'analisi senza interventi manuali.",capEn:"Envizi Interval Meter Analytics captures near-real-time readings from meters, normalises them and makes them available for analysis without manual intervention.",benIt:"Elimina il caricamento manuale delle letture e rende visibili anomalie e picchi non appena si verificano.",benEn:"Eliminates manual reading uploads and makes anomalies and peaks visible as soon as they occur."},
  {id:"ef2",it:"Analizzare le bollette per sito, utility, costo e variazione anomala",en:"Analyse utility bills by site, utility type, cost and anomalous variance",capIt:"Envizi Utility Bill Analytics consolida le fatture, identifica voci anomale e confronta i costi tra periodi e sedi.",capEn:"Envizi Utility Bill Analytics consolidates bills, identifies anomalous items and compares costs across periods and sites.",benIt:"Riduce il tempo di revisione delle fatture e anticipa variazioni di costo prima del consuntivo.",benEn:"Reduces bill review time and anticipates cost variances before month-end."},
  {id:"ef3",it:"Normalizzare i KPI energetici per meteo e variabili operative",en:"Normalise energy KPIs for weather and operational variables",capIt:"Envizi supporta la regressione e la normalizzazione dei consumi in base a variabili come gradi-giorno e unità produttive.",capEn:"Envizi supports regression and normalisation of consumption against variables such as degree-days and production units.",benIt:"Rende confrontabili i consumi tra stabilimenti con condizioni climatiche e produttive diverse.",benEn:"Makes consumption comparable across sites with different climatic and production conditions."},
  {id:"ef4",it:"Generare alert automatici su picchi, sprechi e consumi fuori andamento",en:"Generate automatic alerts on peaks, waste and out-of-pattern consumption",capIt:"Envizi Interval Meter Analytics genera alert configurabili su soglie, picchi di domanda e consumi anomali, assegnabili all'Energy Manager.",capEn:"Envizi Interval Meter Analytics generates configurable alerts on thresholds, demand peaks and anomalous consumption, assignable to the Energy Manager.",benIt:"Riduce il tempo di reazione agli sprechi e documenta ogni segnalazione per il follow-up.",benEn:"Reduces response time to waste events and documents each alert for follow-up."},
  {id:"ef5",it:"Confrontare le performance energetiche tra stabilimenti e rispetto ai target",en:"Benchmark energy performance across sites and against targets",capIt:"Envizi permette di confrontare intensità energetiche tra sedi, visualizzare l'andamento rispetto ai target e individuare gli impianti con le maggiori opportunità di miglioramento.",capEn:"Envizi lets you compare energy intensity across sites, track progress against targets and identify the plants with the greatest improvement potential.",benIt:"Orienta le priorità di efficienza verso i siti con il maggiore impatto su costi ed emissioni.",benEn:"Directs efficiency priorities towards the sites with the greatest impact on cost and emissions."},
  {id:"ef6",it:"Valutare economicamente e ambientalmente gli interventi di efficienza",en:"Assess energy efficiency measures economically and environmentally",capIt:"Envizi Sustainability Program Tracking e Scenario Modeler permettono di stimare costi, risparmi e CO₂e evitata per ciascun intervento.",capEn:"Envizi Sustainability Program Tracking and Scenario Modeler let you estimate costs, savings and avoided CO₂e for each measure.",benIt:"Supporta la selezione degli investimenti con dati verificabili e collegati alla baseline ESG.",benEn:"Supports investment selection with verifiable data linked to the ESG baseline."},
];
const SC_REQUIREMENTS:{id:string,it:string,en:string,capIt:string,capEn:string,benIt:string,benEn:string}[]=[
  {id:"sc1",it:"Coprire le principali categorie Scope 3 del GHG Protocol",en:"Cover the main GHG Protocol Scope 3 categories",capIt:"Envizi Scope 3 GHG Accounting supporta il calcolo delle categorie GHG Protocol più rilevanti, con fattori di emissione gestiti centralmente e metodi coerenti.",capEn:"Envizi Scope 3 GHG Accounting supports the calculation of the most material GHG Protocol categories using centrally managed emission factors and consistent methods.",benIt:"Estende la copertura dell'inventario oltre gli acquisti e riduce le elaborazioni manuali per ciascuna categoria.",benEn:"Extends inventory coverage beyond procurement and reduces manual processing per category."},
  {id:"sc2",it:"Coinvolgere i fornitori con questionari strutturati e workflow di raccolta",en:"Engage suppliers with structured questionnaires and collection workflows",capIt:"Envizi Surveys + Assessments gestisce domande multiple, allegati, commenti, scadenze, stato delle risposte e workflow di approvazione.",capEn:"Envizi Surveys + Assessments manages multiple question types, attachments, comments, due dates, response status and approval workflows.",benIt:"Riduce i solleciti manuali e rende le risposte comparabili tra fornitori e periodi.",benEn:"Reduces manual follow-up and makes responses comparable across suppliers and periods."},
  {id:"sc3",it:"Integrare i dati ERP per il calcolo delle emissioni da acquisti",en:"Integrate ERP data for purchase-based emission calculations",capIt:"Envizi Supply Chain Intelligence acquisisce automaticamente righe d'ordine e transazioni da sistemi ERP e finanziari per le categorie 1 e 2.",capEn:"Envizi Supply Chain Intelligence automatically ingests order lines and transactions from ERP and financial systems for categories 1 and 2.",benIt:"Elimina la raccolta manuale degli acquisti e aumenta la copertura e l'accuratezza delle emissioni cat. 1 e 2.",benEn:"Eliminates manual procurement data collection and improves coverage and accuracy for categories 1 and 2."},
  {id:"sc4",it:"Passare progressivamente dalle stime spend-based ai dati supplier-specific e PCF",en:"Progressively move from spend-based estimates to supplier-specific data and PCFs",capIt:"Envizi Supply Chain Intelligence supporta una gerarchia di metodi: da fattori medi a dati corporate, supplier-specific e Product Carbon Footprint.",capEn:"Envizi Supply Chain Intelligence supports a method hierarchy: from average factors to corporate, supplier-specific and Product Carbon Footprint data.",benIt:"Migliora la qualità e la granularità dell'inventario Scope 3 progressivamente, senza riconfigurare il sistema.",benEn:"Improves Scope 3 inventory quality and granularity progressively without reconfiguring the system."},
  {id:"sc5",it:"Monitorare i tassi di risposta e la qualità dei dati ricevuti dai fornitori",en:"Monitor supplier response rates and the quality of data received",capIt:"Envizi Supply Chain Intelligence e Surveys offrono dashboard di engagement con tassi di completamento, qualità delle risposte e stato dei workflow.",capEn:"Envizi Supply Chain Intelligence and Surveys provide engagement dashboards with completion rates, response quality and workflow status.",benIt:"Rende visibile la copertura della supply chain e orienta le azioni di miglioramento verso i fornitori più critici.",benEn:"Makes supply chain coverage visible and directs improvement actions towards the most material suppliers."},
  {id:"sc6",it:"Integrare le risposte dei fornitori nella contabilità GHG senza riconciliazioni manuali",en:"Integrate supplier responses into GHG accounting without manual reconciliation",capIt:"I dati raccolti tramite Surveys e Supply Chain Intelligence confluiscono direttamente nei calcoli Scope 3, senza esportazioni o passaggi intermedi.",capEn:"Data collected via Surveys and Supply Chain Intelligence flows directly into Scope 3 calculations, without exports or intermediate steps.",benIt:"Riduce il rischio di errori nella riconciliazione e accelera il ciclo di chiusura dell'inventario Scope 3.",benEn:"Reduces reconciliation error risk and accelerates the Scope 3 inventory close cycle."},
];
const PL_REQUIREMENTS:{id:string,it:string,en:string,capIt:string,capEn:string,benIt:string,benEn:string}[]=[
  {id:"pl1",it:"Costruire previsioni di emissione a partire dalla baseline ESG verificata",en:"Build emission forecasts from the verified ESG baseline",capIt:"Envizi Scenario Modeler parte dalla baseline certificata del sistema per costruire traiettorie di emissione future e scenari what-if.",capEn:"Envizi Scenario Modeler starts from the system-certified baseline to build future emission trajectories and what-if scenarios.",benIt:"Garantisce che i forecast siano collegati a dati verificati, non a stime manuali, aumentando la credibilità del piano.",benEn:"Ensures forecasts are linked to verified data, not manual estimates, increasing plan credibility."},
  {id:"pl2",it:"Confrontare scenari e combinazioni di iniziative rispetto al target Net Zero",en:"Compare scenarios and initiative combinations against the Net Zero target",capIt:"Envizi Scenario Modeler permette di creare e confrontare più scenari what-if, valutando combinazioni di iniziative per CapEx, OpEx e CO₂e evitata.",capEn:"Envizi Scenario Modeler lets you create and compare multiple what-if scenarios, evaluating initiative combinations for CapEx, OpEx and avoided CO₂e.",benIt:"Consente di identificare il mix ottimale di iniziative che chiude il gap verso il target con il budget disponibile.",benEn:"Enables identification of the optimal initiative mix that closes the target gap within the available budget."},
  {id:"pl3",it:"Ottimizzare il portafoglio di decarbonizzazione rispetto al budget disponibile",en:"Optimise the decarbonisation portfolio against the available budget",capIt:"Envizi Planning Analytics AddOn e Scenario Modeler supportano l'ottimizzazione del portafoglio per massimizzare le riduzioni di CO₂e nel rispetto dei vincoli di budget.",capEn:"Envizi Planning Analytics AddOn and Scenario Modeler support portfolio optimisation to maximise CO₂e reductions within budget constraints.",benIt:"Riduce la dipendenza da fogli di calcolo e semplifica le decisioni di allocazione del capitale con dati ESG integrati.",benEn:"Reduces spreadsheet dependency and simplifies capital allocation decisions with integrated ESG data."},
  {id:"pl4",it:"Monitorare l'esecuzione dei programmi e la spesa rispetto al piano",en:"Monitor programme execution and spend against the plan",capIt:"Envizi Sustainability Program Tracking registra milestone, avanzamento, spesa effettiva, risparmi realizzati e emissioni evitate per ciascun programma.",capEn:"Envizi Sustainability Program Tracking records milestones, progress, actual spend, realised savings and avoided emissions per programme.",benIt:"Rende l'esecuzione trasparente e verificabile, consentendo di aggiornare il piano se le condizioni cambiano.",benEn:"Makes execution transparent and verifiable, enabling plan updates if conditions change."},
  {id:"pl5",it:"Quantificare l'impatto finanziario degli investimenti in decarbonizzazione (IRR, NPV)",en:"Quantify the financial impact of decarbonisation investments (IRR, NPV)",capIt:"Envizi Sustainability Program Tracking include la valorizzazione economica delle iniziative con costi, risparmi attesi, IRR e NPV configurabili.",capEn:"Envizi Sustainability Program Tracking includes economic valuation of initiatives with configurable costs, expected savings, IRR and NPV.",benIt:"Rende il business case ESG difendibile davanti al CFO e ai finanziatori con dati verificabili e confrontabili.",benEn:"Makes the ESG business case defensible before the CFO and financiers with verifiable, comparable data."},
  {id:"pl6",it:"Aggiornare i target e le traiettorie al variare delle condizioni operative",en:"Update targets and trajectories as operational conditions change",capIt:"Envizi Target Setting + Tracking e Scenario Modeler permettono di aggiornare target e traiettorie quando cambiano dati, budget o priorità.",capEn:"Envizi Target Setting + Tracking and Scenario Modeler allow targets and trajectories to be updated when data, budgets or priorities change.",benIt:"Mantiene il piano Net Zero attuale e adattabile senza ricostruire l'analisi da zero a ogni revisione.",benEn:"Keeps the Net Zero plan current and adaptable without rebuilding the analysis from scratch at each review."},
];
const FR_REQUIREMENTS:{id:string,it:string,en:string,capIt:string,capEn:string,benIt:string,benEn:string}[]=[
  {id:"fr1",it:"Gestire framework ESG (CSRD, ESRS, GRI, SASB, CDP) sempre aggiornati nel sistema",en:"Manage ESG frameworks (CSRD, ESRS, GRI, SASB, CDP) kept current in the system",capIt:"Envizi Sustainability Reporting Manager include una Framework Library gestita e aggiornata nel servizio SaaS, senza interventi manuali del team.",capEn:"Envizi Sustainability Reporting Manager includes a managed Framework Library kept current in the SaaS service, without manual team intervention.",benIt:"Elimina il confronto manuale tra versioni dei framework e riduce il rischio di perdere aggiornamenti normativi.",benEn:"Eliminates manual comparison between framework versions and reduces the risk of missing regulatory updates."},
  {id:"fr2",it:"Mappare i requisiti materiali e identificare i gap rispetto ai dati disponibili",en:"Map material requirements and identify gaps against available data",capIt:"Envizi Sustainability Reporting Manager supporta la mappatura dei requisiti, il tagging di materialità e l'identificazione dei gap rispetto ai dati già presenti nel sistema.",capEn:"Envizi Sustainability Reporting Manager supports requirements mapping, materiality tagging and gap identification against data already in the system.",benIt:"Rende visibile la copertura informativa per ciascun framework e orienta le azioni di raccolta verso i requisiti non ancora soddisfatti.",benEn:"Makes information coverage visible per framework and directs data collection towards requirements not yet met."},
  {id:"fr3",it:"Gestire il processo di raccolta con workflow, owner, reviewer e approvazioni",en:"Manage the collection process with workflows, owners, reviewers and approvals",capIt:"Envizi Sustainability Reporting Manager gestisce il workflow di raccolta con assignee, scadenze, evidenze, commenti e approvazioni tracciate.",capEn:"Envizi Sustainability Reporting Manager manages the collection workflow with assignees, due dates, evidence, comments and tracked approvals.",benIt:"Sostituisce la gestione via e-mail con un processo governato, tracciabile e auditabile da inizio a fine ciclo.",benEn:"Replaces email-based management with a governed, traceable and auditable process from start to end of cycle."},
  {id:"fr4",it:"Produrre output di disclosure riutilizzabili e pronti per l'assurance",en:"Produce reusable disclosure outputs ready for assurance",capIt:"Envizi Sustainability Reporting Manager genera risposte strutturate, allegati e export per i framework selezionati, tracciabili fino alla fonte del dato.",capEn:"Envizi Sustainability Reporting Manager generates structured responses, attachments and exports for selected frameworks, traceable to the data source.",benIt:"Riduce il tempo di preparazione della disclosure e rende le evidenze immediatamente disponibili per auditor e revisori.",benEn:"Reduces disclosure preparation time and makes evidence immediately available for auditors and reviewers."},
  {id:"fr5",it:"Integrare i calcoli GHG nei requisiti di disclosure senza doppia elaborazione",en:"Integrate GHG calculations into disclosure requirements without double processing",capIt:"I dati GHG già presenti in Envizi (Scope 1, 2 e 3) vengono richiamati direttamente dai framework attivi nel Sustainability Reporting Manager.",capEn:"GHG data already in Envizi (Scope 1, 2 and 3) is referenced directly by the active frameworks in the Sustainability Reporting Manager.",benIt:"Elimina la riconciliazione tra il modello GHG e i template di disclosure, riducendo errori e tempi di chiusura.",benEn:"Eliminates reconciliation between the GHG model and disclosure templates, reducing errors and close time."},
  {id:"fr6",it:"Mantenere un audit trail completo per ciascun requisito e dato comunicato",en:"Maintain a full audit trail for each requirement and disclosed data point",capIt:"Envizi conserva la tracciabilità di ogni dato comunicato: fonte, fattore applicato, workflow di approvazione e versione del framework.",capEn:"Envizi retains full traceability for every disclosed data point: source, applied factor, approval workflow and framework version.",benIt:"Risponde alle richieste di assurance esterna con evidenze dirette, riducendo il carico operativo del team ESG.",benEn:"Responds to external assurance requests with direct evidence, reducing the operational load on the ESG team."},
];
const ESG_READINESS_IT=[
  {key:"primi" as EsgReadiness,label:"Primi passi — Readiness dati: bassa",desc:"L'organizzazione sta iniziando il percorso ESG. I dati sono pochi e frammentati. Cerca una soluzione per raccogliere i dati, capire cosa manca e organizzare le informazioni."},
  {key:"consolidamento" as EsgReadiness,label:"Consolidamento — Readiness dati: media",desc:"L'organizzazione dispone dei principali dati ESG, ma deve renderli completi, affidabili e confrontabili. Cerca una piattaforma per unificare e controllare i dati, calcolare le emissioni e preparare la rendicontazione."},
  {key:"decisioni" as EsgReadiness,label:"Decisioni ESG — Readiness dati: alta",desc:"L'organizzazione dispone di dati ESG strutturati e affidabili e vuole utilizzarli nelle decisioni aziendali. Cerca analisi, scenari e KPI per monitorare i risultati, gestire i rischi e raggiungere gli obiettivi ESG."},
];
const ESG_READINESS_EN=[
  {key:"primi" as EsgReadiness,label:"First steps — Data readiness: low",desc:"The organisation is starting its ESG journey. Data is scarce and fragmented. Looking for a solution to collect data, identify gaps and organise information."},
  {key:"consolidamento" as EsgReadiness,label:"Consolidation — Data readiness: medium",desc:"The organisation has the main ESG data but needs to make it complete, reliable and comparable. Looking for a platform to unify and control data, calculate emissions and prepare reporting."},
  {key:"decisioni" as EsgReadiness,label:"ESG decisions — Data readiness: high",desc:"The organisation has structured, reliable ESG data and wants to use it in business decisions. Looking for analytics, scenarios and KPIs to monitor results, manage risks and achieve ESG targets."},
];
export default function Home(){
  const [language,setLanguage]=useState<Language>("it"); const [profile,setProfile]=useState<Profile|null>(null); const [screen,setScreenState]=useState<Screen>("cover"); const [screenHistory,setScreenHistory]=useState<Screen[]>([]); const [priorities,setPriorities]=useState<Priority[]>(defaultPriorities); const [selectedMission,setSelectedMission]=useState(0); const [negativeChoice,setNegativeChoice]=useState<"form"|"postpone">("form"); const [pendingOutcome,setPendingOutcome]=useState<Outcome>("positive"); const [missionParameters,setMissionParameters]=useState<Record<number,string[]>>({}); const [missionOutcomes,setMissionOutcomes]=useState<Record<number,Outcome>>({}); const [missionOrder,setMissionOrder]=useState<number[]>([0,3,5,2,1,4]); const [trustScore,setTrustScore]=useState(30); const [approachBiz,setApproachBiz]=useState(""); const [approachData,setApproachData]=useState(""); const [contactEmail,setContactEmail]=useState(""); const [asIsRatings,setAsIsRatings]=useState<Record<number,("alto"|"medio"|"basso")[]>>({});
  const [companyName,setCompanyName]=useState("");
  const [companySector,setCompanySector]=useState<SectorKey>("manifatturiero");
  const [companyMarket,setCompanyMarket]=useState<Market>("mondo");
  const [esgReadiness,setEsgReadiness]=useState<EsgReadiness>("primi");
  const [companyDims,setCompanyDims]=useState<[number,number,number,number,number]>([100,3,5,1,500]);
  const [geoDistrib,setGeoDistrib]=useState<Record<string,number>>({italia:70,europa:30,asia:0,nordamerica:0,sudamerica:0,africa:0,australia:0});
  const updateCompanyDim=(i:number,v:number)=>{const next=[...companyDims] as [number,number,number,number,number];next[i]=v;setCompanyDims(next);};
  type DataNeedItem={id:string,priority:Priority,label:string};
  const buildDefaultDataNeeds=(lang:"it"|"en",prioOrder:Priority[]):DataNeedItem[]=>{
    const needs=copy[lang].priorityDataNeeds as Record<Priority,{id:string,label:string}[]>;
    return prioOrder.flatMap(p=>(needs[p]||[]).map(n=>({id:n.id,priority:p,label:n.label})));
  };
  const [dataNeeds,setDataNeeds]=useState<DataNeedItem[]>(()=>buildDefaultDataNeeds("it",defaultPriorities));
  const [topNNeeds,setTopNNeeds]=useState(10);
  const [needRelevance,setNeedRelevance]=useState<Record<string,number>>({});
  const [needCriticality,setNeedCriticality]=useState<Record<string,number>>({});
  const [focusMinR,setFocusMinR]=useState(1);
  const [focusMinC,setFocusMinC]=useState(1);
  const [hoveredPriority,setHoveredPriority]=useState<Priority|null>(null);
  const [pmMissionFilter,setPmMissionFilter]=useState<number|null>(null);
  const [pmFromBriefing,setPmFromBriefing]=useState(false);
  const [pmSelected,setPmSelected]=useState<{id:string,label:string,rel:number,crit:number,color:string}|null>(null);
  const [dfRatings,setDfRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(DF_REQUIREMENTS.map(r=>[r.id,"low" as DFRating])));
  const setDfRating=(id:string,val:DFRating)=>setDfRatings(prev=>({...prev,[id]:val}));
  const [rfRatings,setRfRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(RF_REQUIREMENTS.map(r=>[r.id,"low" as DFRating])));
  const setRfRating=(id:string,val:DFRating)=>setRfRatings(prev=>({...prev,[id]:val}));
  const [efRatings,setEfRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(EF_REQUIREMENTS.map(r=>[r.id,"low" as DFRating])));
  const setEfRating=(id:string,val:DFRating)=>setEfRatings(prev=>({...prev,[id]:val}));
  const [scRatings,setScRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(SC_REQUIREMENTS.map(r=>[r.id,"low" as DFRating])));
  const setScRating=(id:string,val:DFRating)=>setScRatings(prev=>({...prev,[id]:val}));
  const [plRatings,setPlRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(PL_REQUIREMENTS.map(r=>[r.id,"low" as DFRating])));
  const setPlRating=(id:string,val:DFRating)=>setPlRatings(prev=>({...prev,[id]:val}));
  const [frRatings,setFrRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(FR_REQUIREMENTS.map(r=>[r.id,"low" as DFRating])));
  const setFrRating=(id:string,val:DFRating)=>setFrRatings(prev=>({...prev,[id]:val}));
  const [needIncluded,setNeedIncluded]=useState<Record<string,boolean>>(()=>{
    const init:Record<string,boolean>={};
    buildDefaultDataNeeds("it",defaultPriorities).forEach((n)=>{init[n.id]=false;});
    return init;
  });
  const [pdHelpOpen,setPdHelpOpen]=useState(false);
  const toggleNeedIncluded=(id:string)=>setNeedIncluded(prev=>({...prev,[id]:!prev[id]}));
  const isNeedIncluded=(id:string)=>needIncluded[id]??false;
  const [dfFocusId,setDfFocusId]=useState<string|null>(null);
  const [priorityIncluded,setPriorityIncluded]=useState<Record<Priority,boolean>>({credit:true,compliance:true,customers:true,efficiency:true,supply:true,reputation:true});
  const togglePriorityIncluded=(p:Priority)=>setPriorityIncluded(prev=>({...prev,[p]:!prev[p]}));
  const [prioExperience,setPrioExperience]=useState<Record<Priority,string>>({credit:"",compliance:"",customers:"",efficiency:"",supply:"",reputation:""});
  const [prioExpModal,setPrioExpModal]=useState<Priority|null>(null);
  const [prioExpSelected,setPrioExpSelected]=useState<Record<Priority,number>>({credit:-1,compliance:-1,customers:-1,efficiency:-1,supply:-1,reputation:-1});
  const prioDefaultExp:Record<Priority,Record<"it"|"en",[string,string,string]>>={
    credit:{
      it:[
        "Le banche ci chiedono sempre più spesso dati ESG strutturati per rinnovare le linee di credito. Negli ultimi 18 mesi abbiamo ricevuto richieste di rating ESG da 3 istituti diversi. Senza dati verificabili rischiamo condizioni peggiorative sui finanziamenti.",
        "Stiamo lavorando a un'emissione di green bond. Il lead arranger ci ha già richiesto un framework ESG verificabile con dati storici su emissioni ed energia. Non abbiamo ancora un sistema capace di produrre questo livello di evidenza.",
        "Il nostro rating ESG esterno è peggiorato nell'ultimo ciclo di valutazione. Gli analisti ci hanno segnalato la mancanza di dati Scope 2 disaggregati per sede e l'assenza di un processo di assurance. Questo impatta il costo del debito."
      ],
      en:[
        "Banks increasingly ask for structured ESG data to renew credit lines. In the last 18 months we received ESG rating requests from 3 different institutions. Without verifiable data we risk worse financing conditions.",
        "We are working on a green bond issuance. The lead arranger has already asked for a verifiable ESG framework with historical data on emissions and energy. We do not yet have a system capable of producing this level of evidence.",
        "Our external ESG rating worsened in the last assessment cycle. Analysts flagged the lack of disaggregated Scope 2 data by site and the absence of an assurance process. This is affecting our cost of debt."
      ]
    },
    compliance:{
      it:[
        "La CSRD ci tocca direttamente: siamo in scope dal 2026. Il team ESG oggi raccoglie dati manualmente da 8 sistemi diversi e impiega 14 settimane per chiudere il report annuale. Abbiamo bisogno di un sistema unico e auditabile.",
        "Abbiamo ricevuto i primi rilievi dall'auditor ESG: le catene di evidenza per i dati di Scope 1 e 2 non sono ricostruibili in modo indipendente. Se non risolviamo prima del prossimo ciclo rischiamo un'opinione con riserva.",
        "Il nostro settore è sotto osservazione da parte di ESMA per il rischio di greenwashing. Il Compliance Officer ha chiesto al team ESG di dimostrare che ogni dato pubblicato è tracciabile fino alla fonte primaria. Oggi non siamo in grado di farlo."
      ],
      en:[
        "CSRD applies to us directly: we're in scope from 2026. The ESG team today collects data manually from 8 different systems and takes 14 weeks to close the annual report. We need a single, auditable system.",
        "We received the first findings from the ESG auditor: the evidence chains for Scope 1 and 2 data cannot be independently reconstructed. If we don't resolve this before the next cycle we risk a qualified opinion.",
        "Our sector is under scrutiny from ESMA for greenwashing risk. The Compliance Officer has asked the ESG team to demonstrate that every published data point is traceable to its primary source. Today we cannot do that."
      ]
    },
    customers:{
      it:[
        "Tre dei nostri top-10 clienti ci hanno già inviato questionari ESG per la qualifica fornitori. Uno di essi ha inserito soglie minime di performance ambientale nei contratti 2024. Rischiamo di perdere gare se non dimostriamo dati credibili.",
        "Un grande retailer europeo ci ha notificato che dal 2025 tutti i fornitori dovranno dichiarare le emissioni Scope 3 cat. 1 con dati specifici per prodotto. Oggi lavoriamo con stime spend-based che non soddisfano questo requisito.",
        "Siamo entrati nella shortlist per una gara pubblica da €15M. Il capitolato prevede un punteggio tecnico ESG con peso del 20%. Non abbiamo documentazione strutturata per rispondere ai criteri ambientali richiesti."
      ],
      en:[
        "Three of our top-10 customers have already sent us ESG questionnaires for supplier qualification. One of them introduced minimum environmental performance thresholds in 2024 contracts. We risk losing tenders without credible data.",
        "A large European retailer has notified us that from 2025 all suppliers must declare Scope 3 cat. 1 emissions with product-specific data. Today we work with spend-based estimates that do not meet this requirement.",
        "We have been shortlisted for a €15M public tender. The specification includes a technical ESG score with a 20% weighting. We have no structured documentation to respond to the required environmental criteria."
      ]
    },
    efficiency:{
      it:[
        "I costi energetici rappresentano il 18% del costo di produzione. Nel 2023 abbiamo perso €2,1M per la volatilità dei prezzi dell'energia. Abbiamo avviato alcuni progetti di efficienza ma non riusciamo a misurarne il ritorno in modo sistematico.",
        "Abbiamo installato pannelli fotovoltaici e sostituito i compressori negli ultimi due anni. Non siamo però in grado di quantificare i risparmi reali stabilimento per stabilimento: i dati dei contatori non sono integrati in nessun sistema centrale.",
        "Il CFO ha chiesto un piano di decarbonizzazione con NPV e payback per ogni iniziativa. Non disponiamo di una baseline energetica affidabile per sito, né di un sistema che aggreghi consumi, costi e produzioni per calcolare l'intensità emissiva."
      ],
      en:[
        "Energy costs represent 18% of production cost. In 2023 we lost €2.1M due to energy price volatility. We have started some efficiency projects but cannot measure their return systematically.",
        "We have installed photovoltaic panels and replaced compressors over the last two years. However we cannot quantify the actual savings plant by plant: meter data is not integrated into any central system.",
        "The CFO has asked for a decarbonisation plan with NPV and payback for each initiative. We do not have a reliable energy baseline by site, nor a system that aggregates consumption, costs and production to calculate emission intensity."
      ]
    },
    supply:{
      it:[
        "Scope 3 cat. 1 e 2 valgono il 65% della nostra impronta totale. I principali fornitori non inviano dati strutturati: riceviamo PDF e allegati e-mail che non riusciamo a riconciliare. Un cliente chiave ci ha già chiesto un piano di riduzione Scope 3.",
        "Abbiamo 340 fornitori attivi. Per i 50 più rilevanti vorremmo raccogliere dati primari sulle emissioni, ma oggi mandiamo questionari in PDF via e-mail con un tasso di risposta inferiore al 40% e dati non confrontabili tra loro.",
        "Stiamo preparando il bilancio di sostenibilità per la prima volta. La sezione Scope 3 è la più critica: le categorie acquisti, trasporti e uso dei prodotti rappresentano oltre il 70% delle emissioni ma non abbiamo un processo strutturato per raccogliere questi dati."
      ],
      en:[
        "Scope 3 cat. 1 and 2 account for 65% of our total footprint. Key suppliers don't send structured data: we receive PDFs and email attachments we can't reconcile. A key customer has already asked us for a Scope 3 reduction plan.",
        "We have 340 active suppliers. For the 50 most relevant ones we want to collect primary emissions data, but today we send PDF questionnaires by email with a response rate below 40% and data that is not comparable across suppliers.",
        "We are preparing our first sustainability report. The Scope 3 section is the most critical: purchased goods, transport and product use categories account for over 70% of emissions but we have no structured process to collect this data."
      ]
    },
    reputation:{
      it:[
        "Il turnover dei profili ESG, sustainability e HSE è raddoppiato negli ultimi 2 anni. I candidati chiedono sistematicamente se disponiamo di strumenti professionali per la gestione della sostenibilità. La reputazione ESG è diventata un fattore di retention.",
        "Abbiamo perso tre candidati senior in favore di competitor che comunicano obiettivi di Net Zero con dati verificabili. Il nostro employer branding ESG è percepito come generico. I neolaureati STEM chiedono di vedere metriche reali prima di accettare un'offerta.",
        "Il CdA ha approvato un obiettivo pubblico di Net Zero al 2040. Non disponiamo però di un sistema che monitori l'avanzamento delle iniziative di decarbonizzazione e dimostri ai nostri stakeholder che stiamo rispettando il piano."
      ],
      en:[
        "Turnover of ESG, sustainability and HSE profiles has doubled in the last 2 years. Candidates systematically ask whether we have professional sustainability management tools. ESG reputation has become a retention factor.",
        "We have lost three senior candidates to competitors who communicate Net Zero targets with verifiable data. Our ESG employer branding is perceived as generic. STEM graduates ask to see real metrics before accepting an offer.",
        "The Board has approved a public Net Zero target for 2040. However we do not have a system that monitors progress on decarbonisation initiatives and demonstrates to our stakeholders that we are on track."
      ]
    }
  };
  const [userName,setUserName]=useState("");
  const [questName,setQuestName]=useState("");
  const getSavedQuestKeys=():string[]=>{const keys:string[]=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith("envizi-quest-save-"))keys.push(k.replace("envizi-quest-save-",""));}return keys.sort();};
  const saveQuest=(name:string)=>{if(!name.trim())return;const data={userName,language,profile,priorities,missionOrder,missionOutcomes,missionParameters,trustScore,companyName,companySector,companyDims,companyMarket,geoDistrib,esgReadiness,asIsRatings,dataNeeds,screen};localStorage.setItem(`envizi-quest-save-${name.trim()}`,JSON.stringify(data));};
  const loadQuest=(name:string)=>{const raw=localStorage.getItem(`envizi-quest-save-${name}`);if(!raw)return;try{const d=JSON.parse(raw);if(d.userName)setUserName(d.userName);if(d.language)setLanguage(d.language);if(d.profile)setProfile(d.profile);if(d.priorities)setPriorities(d.priorities);if(d.missionOrder)setMissionOrder(d.missionOrder);if(d.missionOutcomes)setMissionOutcomes(d.missionOutcomes);if(d.missionParameters)setMissionParameters(d.missionParameters);if(d.trustScore!=null)setTrustScore(d.trustScore);if(d.companyName!=null)setCompanyName(d.companyName);if(d.companySector)setCompanySector(d.companySector);if(d.companyDims)setCompanyDims(d.companyDims);if(d.companyMarket)setCompanyMarket(d.companyMarket);if(d.geoDistrib)setGeoDistrib(d.geoDistrib);if(d.esgReadiness)setEsgReadiness(d.esgReadiness);if(d.asIsRatings)setAsIsRatings(d.asIsRatings);if(d.dataNeeds)setDataNeeds(d.dataNeeds);setQuestName(name);if(d.screen)setScreenState(d.screen);}catch(e){}};
  const deleteQuest=(name:string)=>{localStorage.removeItem(`envizi-quest-save-${name}`);};
  const downloadQuest=(name:string)=>{
    const raw=localStorage.getItem(`envizi-quest-save-${name}`);
    if(!raw)return;
    const blob=new Blob([raw],{type:"application/json"});
    const filename=`${name}.envizi-quest`;
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=filename;a.click();
    URL.revokeObjectURL(url);
  };
  const uploadQuestFile=(file:File,overrideName?:string)=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const d=JSON.parse(e.target?.result as string);
        const key=overrideName||(d.questName||file.name.replace(/\.envizi-quest$/,"").replace(/\.json$/,""));
        if(!key.trim())return;
        if(overrideName===undefined&&userName.trim())d.userName=userName.trim();
        localStorage.setItem(`envizi-quest-save-${key.trim()}`,JSON.stringify(d));
        setScreenState("cover");setTimeout(()=>setScreenState("welcome"),10);
      }catch(err){}
    };
    reader.readAsText(file);
  };
  const openUploadPicker=async()=>{
    // File System Access API — apre dialogo con scelta cartella
    if(typeof (window as any).showOpenFilePicker==="function"){
      try{
        const [handle]=await (window as any).showOpenFilePicker({
          types:[{description:"Envizi Quest",accept:{"application/json":[".envizi-quest",".json"]}}],
          multiple:false
        });
        const file=await handle.getFile();
        uploadQuestFile(file);
        return;
      }catch(e){/* annullato o non supportato */}
    }
    // Fallback: click sull'input nascosto
    document.getElementById("welcomeUploadInput")?.click();
  };
  useEffect(()=>{setDataNeeds(buildDefaultDataNeeds(language,priorities));},[language,priorities]);
  const moveNeed=(index:number,direction:-1|1)=>{const next=[...dataNeeds];const target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];setDataNeeds(next);};
  const rankNeed=(fromIdx:number,toRank:number)=>{const clamped=Math.max(1,Math.min(dataNeeds.length,toRank));const toIdx=clamped-1;if(toIdx===fromIdx)return;const next=[...dataNeeds];const [item]=next.splice(fromIdx,1);next.splice(toIdx,0,item);setDataNeeds(next);};
  // rank within a priority group: fromIdx is the global index, toRank is 1-based within the group
  const rankNeedInGroup=(id:string,priority:Priority,toRank:number)=>{
    const groupIds=dataNeeds.filter(n=>n.priority===priority).map(n=>n.id);
    const groupSize=groupIds.length;
    const clamped=Math.max(1,Math.min(groupSize,toRank));
    const fromPos=groupIds.indexOf(id);
    if(fromPos===-1||fromPos===clamped-1)return;
    // rebuild flat array: extract item from its current global position, insert at target global position
    const next=[...dataNeeds];
    const fromGlobal=next.findIndex(n=>n.id===id);
    const [item]=next.splice(fromGlobal,1);
    // after removal, find where the target slot is among the same-priority items
    const targetId=groupIds.filter(gid=>gid!==id)[clamped-1];
    const toGlobal=targetId?next.findIndex(n=>n.id===targetId):next.findIndex(n=>n.priority===priority&&next.indexOf(n)>=0);
    const insertAt=toGlobal!==-1?toGlobal+(fromPos<clamped-1?1:0):next.length;
    next.splice(insertAt,0,item);
    setDataNeeds(next);
  };
  const rankPriority=(fromIdx:number,toRank:number)=>{const clamped=Math.max(1,Math.min(priorities.length,toRank));const toIdx=clamped-1;if(toIdx===fromIdx)return;const next=[...priorities];const [item]=next.splice(fromIdx,1);next.splice(toIdx,0,item);setPriorities(next);};
  const needIdToMission:Record<string,number>={
    // M0 — Data Foundation
    "credit-3":0, "compliance-4":0, "compliance-6":0, "compliance-7":0, "reputation-2":0, "reputation-6":0,
    // M1 — Energia
    "efficiency-1":1, "efficiency-2":1, "efficiency-3":1, "efficiency-4":1, "efficiency-6":1,
    // M2 — Supply Chain
    "supply-1":2, "supply-2":2, "supply-3":2, "supply-4":2, "supply-5":2, "supply-6":2, "supply-7":2,
    "customers-1":2, "customers-2":2, "customers-3":2,
    // M3 — Reporting e performance
    "credit-1":3, "credit-2":3, "compliance-1":3, "reputation-3":3, "reputation-7":3,
    "customers-5":3, "customers-6":3, "customers-7":3,
    // M4 — Net Zero
    "credit-4":4, "credit-6":4, "credit-7":4, "efficiency-5":4, "efficiency-7":4, "reputation-5":4,
    // M5 — Framework ESG e disclosure
    "compliance-2":5, "compliance-3":5, "compliance-5":5, "credit-5":5,
    "customers-4":5, "reputation-1":5, "reputation-4":5,
  };
  const needIdToCapability:Record<string,{it:string,en:string}>={
    // M0
    "credit-3":    {it:"Sistema di record centralizzato, record di dettaglio e audit trail Envizi",                                         en:"Centralised system of record, detail records and Envizi audit trail"},
    "compliance-4":{it:"Audit History, record di dettaglio, note e allegati Envizi",                                                        en:"Envizi Audit History, detail records, notes and attachments"},
    "compliance-6":{it:"Data Health Check, Monthly Data Summary, regole di validazione e alert",                                            en:"Data Health Check, Monthly Data Summary, validation rules and alerts"},
    "compliance-7":{it:"Audit report, allegati, report di dettaglio e accesso controllato in Envizi",                                       en:"Audit reports, attachments, detail reports and controlled access in Envizi"},
    "reputation-2":{it:"Social Metrics Account Styles, form e Surveys + Assessments",                                                       en:"Social Metrics Account Styles, forms and Surveys + Assessments"},
    "reputation-6":{it:"Surveys + Assessments con template, scoring, allegati e workflow",                                                  en:"Surveys + Assessments with templates, scoring, attachments and workflow"},
    // M1
    "efficiency-1":{it:"Interval Meter Analytics",                                                                                          en:"Interval Meter Analytics"},
    "efficiency-2":{it:"Utility Bill Analytics",                                                                                            en:"Utility Bill Analytics"},
    "efficiency-3":{it:"Regression modeling e KPI normalization di Utility Bill e Interval Meter Analytics",                                en:"Regression modelling and KPI normalisation in Utility Bill and Interval Meter Analytics"},
    "efficiency-4":{it:"Meter-based alerts di Interval Meter Analytics",                                                                    en:"Meter-based alerts in Interval Meter Analytics"},
    "efficiency-6":{it:"Utility performance management e analisi di intensità di Interval Meter Analytics",                                 en:"Utility performance management and intensity analytics in Interval Meter Analytics"},
    // M2
    "supply-1":    {it:"Supply Chain Intelligence per cat. 1; Scope 3 GHG Accounting per cat. 4",                                          en:"Supply Chain Intelligence for cat. 1; Scope 3 GHG Accounting for cat. 4"},
    "supply-2":    {it:"Surveys + Assessments e supplier engagement portal",                                                                en:"Surveys + Assessments and supplier engagement portal"},
    "supply-3":    {it:"Automated data capture di Supply Chain Intelligence da sistemi ERP e finanziari",                                   en:"Supply Chain Intelligence automated data capture from ERP and financial systems"},
    "supply-4":    {it:"Surveys + Assessments e dati ESG/risk insight raccolti con Supply Chain Intelligence",                              en:"Surveys + Assessments and ESG/risk insight data gathered via Supply Chain Intelligence"},
    "supply-5":    {it:"Workflow e Issues Management di Surveys + Assessments; piani da configurare",                                       en:"Workflow and Issues Management in Surveys + Assessments; plans to configure"},
    "supply-6":    {it:"Dashboard di supplier engagement e controlli di data quality di Supply Chain Intelligence",                         en:"Supplier engagement dashboards and data quality controls in Supply Chain Intelligence"},
    "supply-7":    {it:"Gerarchia dei metodi di calcolo e raccolta di emissioni corporate e PCF in Supply Chain Intelligence",              en:"Calculation method hierarchy and collection of corporate emissions and PCFs in Supply Chain Intelligence"},
    "customers-1": {it:"Scope 3 GHG Accounting; Supply Chain Intelligence per categorie 1 e 2",                                            en:"Scope 3 GHG Accounting; Supply Chain Intelligence for categories 1 and 2"},
    "customers-2": {it:"Surveys + Assessments e supplier engagement di Supply Chain Intelligence",                                          en:"Surveys + Assessments and supplier engagement in Supply Chain Intelligence"},
    "customers-3": {it:"Raccolta e gestione di PCF tramite Supply Chain Intelligence",                                                      en:"PCF collection and management via Supply Chain Intelligence"},
    // M3
    "credit-1":    {it:"Scope 1 & 2 e Scope 3 GHG Accounting + Reporting, alimentati dalla Data Foundation",                              en:"Scope 1 & 2 and Scope 3 GHG Accounting + Reporting, fed by the Data Foundation"},
    "credit-2":    {it:"PowerReports preconfigurati e dashboard personalizzabili",                                                          en:"Pre-configured PowerReports and customisable dashboards"},
    "compliance-1":{it:"Scope 1 & 2 e Scope 3 GHG Accounting + Reporting",                                                                en:"Scope 1 & 2 and Scope 3 GHG Accounting + Reporting"},
    "reputation-3":{it:"PowerReports, dashboard e analisi multi-periodo e multi-sede",                                                      en:"PowerReports, dashboards and multi-period and multi-site analytics"},
    "reputation-7":{it:"Survey Dataset e PowerReports personalizzabili basati su Power BI Embedded",                                       en:"Survey Dataset and customisable PowerReports based on Power BI Embedded"},
    "customers-5": {it:"PowerReports supporta il confronto se vengono forniti benchmark esterni",                                           en:"PowerReports supports comparison where external benchmarks are provided"},
    "customers-6": {it:"PowerReports personalizzabili con filtri per gruppo, sede, periodo e indicatore",                                   en:"Customisable PowerReports with filters by group, site, period and indicator"},
    "customers-7": {it:"Market-based Emissions PowerReport e Scope 1 & 2 GHG Accounting",                                                  en:"Market-based Emissions PowerReport and Scope 1 & 2 GHG Accounting"},
    // M4
    "credit-4":    {it:"Envizi produce KPI, target e scenari a supporto; rating e peer comparison restano esterni",                        en:"Envizi produces supporting KPIs, targets and scenarios; rating and peer comparison remain external"},
    "credit-6":    {it:"Scenario Modeler e Envizi Planning Analytics AddOn",                                                               en:"Scenario Modeler and Envizi Planning Analytics AddOn"},
    "credit-7":    {it:"Sustainability Program Tracking con impatto finanziario, IRR, NPV e risparmi attesi",                               en:"Sustainability Program Tracking with financial impact, IRR, NPV and expected savings"},
    "efficiency-5":{it:"Target Setting + Tracking, dashboard e PowerReports",                                                              en:"Target Setting + Tracking, dashboards and PowerReports"},
    "efficiency-7":{it:"Sustainability Program Tracking e Scenario Modeler per costi, risparmi ed emissioni",                              en:"Sustainability Program Tracking and Scenario Modeler for costs, savings and emissions"},
    "reputation-5":{it:"Target Setting + Tracking, Sustainability Program Tracking e PowerReports",                                        en:"Target Setting + Tracking, Sustainability Program Tracking and PowerReports"},
    // M5
    "compliance-2":{it:"Sustainability Reporting Manager",                                                                                  en:"Sustainability Reporting Manager"},
    "compliance-3":{it:"Framework Library di Sustainability Reporting Manager",                                                             en:"Sustainability Reporting Manager Framework Library"},
    "compliance-5":{it:"Materiality e gap tags in Sustainability Reporting Manager; valutazione non automatica",                            en:"Materiality and gap tags in Sustainability Reporting Manager; assessment not automated"},
    "credit-5":    {it:"Framework Library e workflow di Sustainability Reporting Manager",                                                  en:"Sustainability Reporting Manager Framework Library and workflow"},
    "customers-4": {it:"Risposte, evidenze ed export di Sustainability Reporting Manager; non è un modulo dedicato alle gare",              en:"Sustainability Reporting Manager responses, evidence and exports; not a dedicated tender module"},
    "reputation-1":{it:"Sustainability Reporting Manager + PowerReports personalizzabili",                                                  en:"Sustainability Reporting Manager + customisable PowerReports"},
    "reputation-4":{it:"Export di risposte e report; pubblicazione tramite strumenti esterni",                                             en:"Export of responses and reports; publication via external tools"},
  };
  const missionBadgeLabel=["M0","M1","M2","M3","M4","M5"];
  const topNeeds=dataNeeds.filter(n=>isNeedIncluded(n.id)).map((n,i)=>({...n,rank:i+1}));
  const needsByMissionHub:[number,typeof topNeeds][]=[0,1,2,3,4,5].map(mi=>[mi,topNeeds.filter(n=>(needIdToMission[n.id]??0)===mi)]);
  const focusedNeeds=topNeeds.filter(n=>{const rel=Math.min(needRelevance[n.id]??5,10);const relNorm=rel;const crit=needCriticality[n.id]??5;return relNorm>=focusMinR&&crit>=focusMinC;});
  const needsByMissionHubFocused:[number,typeof topNeeds][]=[0,1,2,3,4,5].map(mi=>[mi,focusedNeeds.filter(n=>(needIdToMission[n.id]??0)===mi)]);
  const t={...copy[language],successText:copy[language].successTextUpdated,negativeTitle:copy[language].formTitleUpdated,negativeText:copy[language].formTextUpdated,postponeTitle:copy[language].asIsTitleUpdated,postponeText:copy[language].asIsTextUpdated,impact:copy[language].impactUpdated}; const name=profile==="marco"?"Marco Rossi":"Luisa Bianchi";
  const displayCompanyName=companyName.trim()||( language==="it"?"La tua azienda":"Your company");
  useEffect(()=>{localStorage.removeItem("envizi-quest-roadmap");localStorage.removeItem("envizi-quest-mission-order");localStorage.removeItem("envizi-quest-mission-parameters");localStorage.removeItem("envizi-quest-trust-score");localStorage.removeItem("envizi-quest-priorities");localStorage.removeItem("envizi-quest-profile");localStorage.removeItem("envizi-quest-mission");},[]);
  const setScreen=(next:Screen)=>{if(next===screen)return;setScreenHistory(history=>[...history,screen]);setScreenState(next)};
  const goBack=()=>{if(!screenHistory.length)return;setScreenState(screenHistory[screenHistory.length-1]);setScreenHistory(screenHistory.slice(0,-1))};
  const start=()=>{if(!profile)return;localStorage.setItem("envizi-quest-profile",JSON.stringify({language,profile}));setScreen("intro")};
  const reset=()=>{setScreenState("onboarding");setScreenHistory([]);setProfile(null);setTrustScore(30);localStorage.removeItem("envizi-quest-trust-score")};
  useEffect(()=>{let button=document.getElementById("envizi-global-back") as HTMLButtonElement|null;if(!button){button=document.createElement("button");button.id="envizi-global-back";button.className="globalBack";button.type="button";document.body.appendChild(button)}button.innerHTML=`← <span>${language==="it"?"Indietro":"Back"}</span>`;button.disabled=!screenHistory.length;button.setAttribute("aria-label",language==="it"?"Torna alla pagina precedente":"Go back one page");const handleBack=()=>goBack();button.addEventListener("click",handleBack);return()=>button?.removeEventListener("click",handleBack)},[language,screenHistory]);
  useEffect(()=>()=>{document.getElementById("envizi-global-back")?.remove()},[]);
  useEffect(()=>{let badge=document.getElementById("envizi-bob-badge");if(!badge){badge=document.createElement("div");badge.id="envizi-bob-badge";badge.className="bobBadge";badge.innerHTML=`<img src="./ibm-bob-logo.svg" alt="IBM Bob"/><span>Sviluppato con IBM Bob</span>`;document.body.appendChild(badge)}return()=>{};},[]);
  useEffect(()=>()=>{document.getElementById("envizi-bob-badge")?.remove()},[]);
  const NUMBERED_SCREENS:Screen[]=["cover","welcome","onboarding","intro","approach","questIntro","approachIntro","approachSteps","approachData","approachDecisions","approachRoadmap","approachTrust","approachReport","separatorNext","companySetup","company","priorities","approachDataCopy","priorityData","priorityMatrix","chapterOneSummary","esgStrategist","introCopy","missions","briefing","introCopy2","asis","missionIntro","compare","decision","tobe","trust","milestone","dataFoundation","dfConclusion","dfSummary","reportingFoundation","reportingConclusion","success","negative","summary","nextStep","thankYou"];
  const currentPageNum=NUMBERED_SCREENS.indexOf(screen)+1;
  useEffect(()=>{let el=document.getElementById("envizi-page-num");if(!el){el=document.createElement("div");el.id="envizi-page-num";el.className="pageNum";document.body.appendChild(el)}const show=currentPageNum>0;el.textContent=show?String(currentPageNum).padStart(2,"0"):"";el.style.display=show?"flex":"none";},[screen,currentPageNum]);
  useEffect(()=>()=>{document.getElementById("envizi-page-num")?.remove()},[]);

  const [saveBtnOpen,setSaveBtnOpen]=useState(false);
  // 0 = mostra Sì/No iniziale  1 = mostra Sicuro?  2 = confermato definitivamente
  const [csrdConfirmStep,setCsrdConfirmStep]=useState<0|1|2>(0);
  const [csrdPendingChoice,setCsrdPendingChoice]=useState<boolean>(false); // true=soggetta, false=non soggetta
  const [csrdNote,setCsrdNote]=useState("");
  const [csrdNoteOpen,setCsrdNoteOpen]=useState(false);
  const [csrdNoteDraft,setCsrdNoteDraft]=useState("");
  const [prioExpMode,setPrioExpMode]=useState<"scratch"|"scenario">("scratch");
  const [saveBtnName,setSaveBtnName]=useState(questName);
  const renderSaveBtn=(isIt:boolean)=>{
    if(!saveBtnOpen)return <button className="saveBtnTrigger" onClick={()=>setSaveBtnOpen(true)}>{isIt?"💾 Salva progressi":"💾 Save progress"}</button>;
    return <div className="saveBtnBox">
      <input className="saveBtnInput" type="text" placeholder={isIt?"Nome sessione...":"Session name..."} value={saveBtnName} onChange={e=>setSaveBtnName(e.target.value)}/>
      <button className="saveBtnConfirm" onClick={()=>{saveQuest(saveBtnName);setQuestName(saveBtnName);setSaveBtnOpen(false);}} disabled={!saveBtnName.trim()}>{isIt?"Salva":"Save"}</button>
      <button className="saveBtnCancel" onClick={()=>setSaveBtnOpen(false)}>✕</button>
    </div>;
  };
  const move=(index:number,direction:-1|1)=>{const next=[...priorities];const target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];setPriorities(next)};
  const saveOutcome=(outcome:Outcome)=>{const next={...missionOutcomes,[selectedMission]:outcome};setMissionOutcomes(next);localStorage.setItem("envizi-quest-roadmap",JSON.stringify(next))};
  const moveMission=(position:number,direction:-1|1)=>{const target=position+direction;if(target<0||target>=missionOrder.length)return;const next=[...missionOrder];[next[position],next[target]]=[next[target],next[position]];setMissionOrder(next);localStorage.setItem("envizi-quest-mission-order",JSON.stringify(next))};
  const updateParameter=(index:number,value:string)=>{const values=[...(missionParameters[selectedMission]||["","","",""])];values[index]=value;const next={...missionParameters,[selectedMission]:values};setMissionParameters(next);localStorage.setItem("envizi-quest-mission-parameters",JSON.stringify(next))};
  const extractMetricDefault=(metric:string):string=>{const m=metric.replace(/[€,]/g,"").match(/[\d]+(?:[.,]\d+)?/);return m?m[0].replace(",","."):"";};
  useEffect(()=>{if(screen==="asis"&&!missionParameters[selectedMission]?.some(v=>v)){const items=active.asIsItems;const defaults=items.map(item=>extractMetricDefault(item.metric));const next={...missionParameters,[selectedMission]:defaults};setMissionParameters(next);}},[screen,selectedMission]);
  const trustGainByOutcome=(outcome:Outcome,missionIndex?:number)=>{if(missionIndex===0&&outcome==="positive")return 25;return outcome==="positive"?15:outcome==="warning"?7:0;};
  const calculatedTrustScore=Object.entries(missionOutcomes).reduce((total,[mi,o])=>total+trustGainByOutcome(o as Outcome,Number(mi)),30);
  const trustColor=trustScore>=50?"#39efb4":trustScore>=20?"#ffc07c":"#ff7777";
  const renderTrustBar=()=><div className="trustBar"><span className="trustBarLabel">{t.trustLabel}</span><div className="trustBarTrack"><div className="trustBarFill" style={{width:`${trustScore}%`,background:trustColor}}/></div><span className="trustBarValue" style={{color:trustColor}}>{trustScore}<small>/100</small></span></div>;
  const handleDecision=(outcome:Outcome)=>{const nextOutcomes={...missionOutcomes,[selectedMission]:outcome};saveOutcome(outcome);const nextTrust=Math.min(100,Object.entries(nextOutcomes).reduce((total,[mi,o])=>total+trustGainByOutcome(o as Outcome,Number(mi)),30));setTrustScore(nextTrust);localStorage.setItem("envizi-quest-trust-score",String(nextTrust));if(outcome!=="positive")setNegativeChoice(outcome==="warning"?"form":"postpone");setPendingOutcome(outcome);setScreen("trust")};
  const energy=energyModule[language];
  const supply=supplyChainModule[language];
  const reporting=reportingModule[language];
  const planning=planningModule[language];
  const framework=frameworkModule[language];
  const scenario=selectedMission===1?energy:selectedMission===2?supply:selectedMission===3?reporting:selectedMission===4?planning:selectedMission===5?framework:null;
  const active={briefing:scenario?.briefing||t.briefing,objectiveText:scenario?.objectiveText||t.objectiveText,asIsTitle:scenario?.asIsTitle||t.asIsTitle,asIsIntro:scenario?.asIsIntro||t.asIsIntro,asIsItems:scenario?.asIsItems||t.asIsItems,decisionIntro:scenario?.decisionIntro||t.decisionIntro,optionA:scenario?.optionA||t.optionA,optionADetail:scenario?.optionADetail||t.optionADetail,optionB:scenario?.optionB||t.optionB,optionBDetail:scenario?.optionBDetail||t.optionBDetail,optionC:scenario?.optionC||t.optionC,optionCDetail:scenario?.optionCDetail||t.optionCDetail,successTitle:scenario?.successTitle||t.successTitle,successText:scenario?.successText||t.successText,warningTitle:scenario?.warningTitle||t.negativeTitle,warningText:scenario?.warningText||t.negativeText,criticalTitle:scenario?.criticalTitle||t.postponeTitle,criticalText:scenario?.criticalText||t.postponeText,metricLabels:scenario?.metricLabels||[t.dataQuality,t.reportingTime,t.confidence],enviziValue:selectedMission===1?(language==="it"?"VALORE ENVIZI SBLOCCATO · ENERGY ANALYTICS":"ENVIZI VALUE UNLOCKED · ENERGY ANALYTICS"):selectedMission===2?supply.enviziValue:selectedMission===3?reporting.enviziValue:selectedMission===4?planning.enviziValue:selectedMission===5?framework.enviziValue:t.enviziValue};
  const defaultUnits=language==="it"?["fonti","ore/mese","% errori","settimane"]:["sources","hrs/month","% errors","weeks"];
  const parameterUnits=scenario?.units||defaultUnits;
  const resultValues=scenario?(screen==="success"?scenario.positiveValues:negativeChoice==="form"?scenario.warningValues:scenario.criticalValues):screen==="success"?["+34%","−62%","92/100"]:negativeChoice==="form"?["+8%","−12%","58/100"]:language==="it"?["INVARIATA","INVARIATO","BASSA · INVARIATA"]:["UNCHANGED","UNCHANGED","LOW · UNCHANGED"];
  const decisionLabel=(missionIndex:number,outcome:Outcome)=>missionIndex===1?energy.decisionLabels[outcome]:missionIndex===2?supply.decisionLabels[outcome]:missionIndex===3?reporting.decisionLabels[outcome]:missionIndex===4?planning.decisionLabels[outcome]:missionIndex===5?framework.decisionLabels[outcome]:t.decisionLabels[outcome];
  const outcomeLabel=(missionIndex:number,outcome:Outcome)=>missionIndex===1?energy.outcomeLabels[outcome]:missionIndex===2?supply.outcomeLabels[outcome]:missionIndex===3?reporting.outcomeLabels[outcome]:missionIndex===4?planning.outcomeLabels[outcome]:missionIndex===5?framework.outcomeLabels[outcome]:t.outcomeLabels[outcome];
  const missionItems=(missionIndex:number)=>missionIndex===1?energy.asIsItems:missionIndex===2?supply.asIsItems:missionIndex===3?reporting.asIsItems:missionIndex===4?planning.asIsItems:missionIndex===5?framework.asIsItems:t.asIsItems;
  const missionUnits=(missionIndex:number)=>missionIndex===1?energy.units:missionIndex===2?supply.units:missionIndex===3?reporting.units:missionIndex===4?planning.units:missionIndex===5?framework.units:defaultUnits;
  type TrustIntroEntry={it:string,en:string,sources?:{label:string,url:string}[]};
  const trustIntroByMission:Record<number,TrustIntroEntry>={
    0:{it:"Una base dati auditabile è il fondamento della credibilità ESG. Il CdA e i finanziatori valutano la solidità del dato prima ancora dei numeri: un sistema verificabile trasforma le dichiarazioni in evidenza.",en:"An auditable data foundation is the bedrock of ESG credibility. The Board and financiers assess data integrity before the numbers themselves: a verifiable system turns declarations into evidence."},
    1:{it:"L'energy management è la prova tangibile che l'azienda sta investendo attivamente nella decarbonizzazione. Per il CdA, i dati energetici strutturati dimostrano al contempo impegno climatico e disciplina sui costi operativi.",en:"Energy management is tangible proof that the company is actively investing in decarbonisation. For the Board, structured energy data simultaneously demonstrates climate commitment and operational cost discipline."},
    2:{it:"La copertura dello Scope 3 e il coinvolgimento della supply chain sono oggi indicatori chiave per investitori e clienti. Un inventario credibile della catena del valore segnala governance responsabile e riduce il rischio reputazionale.",en:"Scope 3 coverage and supply-chain engagement are now key indicators for investors and customers. A credible value-chain inventory signals responsible governance and reduces reputational risk."},
    3:{
      it:"Un inventario GHG coerente, trasparente e tracciabile aumenta la fiducia nei dati presentati a CdA, banche, clienti e auditor. La possibilità di confrontare Scope 1, 2 e 3 nel tempo, individuare gli hotspot emissivi e risalire dalle dashboard ai dati e alle metodologie sottostanti rende le performance ESG più comprensibili e difendibili.\n\nAl contrario, report ricostruiti manualmente, KPI non confrontabili e viste diverse tra i vari stakeholder generano dubbi sulla qualità delle informazioni e sulla capacità dell'azienda di governare concretamente i propri obiettivi climatici.",
      en:"A consistent, transparent and traceable GHG inventory increases confidence in the data presented to the Board, banks, clients and auditors. The ability to compare Scope 1, 2 and 3 over time, identify emission hotspots and trace back from dashboards to the underlying data and methodologies makes ESG performance more understandable and defensible.\n\nConversely, manually reconstructed reports, non-comparable KPIs and different views for different stakeholders raise doubts about data quality and the company's ability to concretely govern its climate objectives.",
      sources:[
        {label:"GHG Protocol — Corporate Standard",url:"https://ghgprotocol.org/corporate-standard"},
        {label:"GHG Protocol — Corporate Value Chain Scope 3 Standard",url:"https://ghgprotocol.org/scope-3-standard"}
      ]
    },
    4:{it:"La pianificazione della decarbonizzazione dimostra che l'azienda non si limita a misurare le emissioni, ma lavora per ridurle nel tempo. Scenari quantificati e programmi verificabili sono la prova concreta dell'impegno verso Net Zero.",en:"Decarbonisation planning demonstrates that the company is not merely measuring emissions but working to reduce them over time. Quantified scenarios and verifiable programmes are concrete proof of the commitment to Net Zero."},
    5:{it:"Allineare la disclosure ai framework normativi — CSRD, ESRS, GRI, SASB, CDP — è oggi un requisito di mercato oltre che legale. Un processo governato e tracciabile dimostra che l'azienda non si limita a dichiarare la propria sostenibilità, ma la documenta in modo verificabile.",en:"Aligning disclosure with regulatory frameworks — CSRD, ESRS, GRI, SASB, CDP — is today both a market and legal requirement. A governed, traceable process demonstrates that the company does not merely declare its sustainability but documents it in a verifiable way."}
  };
  const activeTrustEntry=trustIntroByMission[selectedMission]??{it:t.trustIntro,en:t.trustIntro};
  const activeTrustIntro=activeTrustEntry[language];
  const activeTrustSources=activeTrustEntry.sources;
  const TRUST_BAR_W=52,TRUST_BAR_GAP=14,TRUST_CHART_H=110,TRUST_LABEL_H=36,TRUST_SVG_PAD_X=8;
  const trustSteps=([
    {label:'BASE',val:30,isCurrent:false,fill:'#293f38',stroke:'#3d6052',strokeW:'1'},
    ...missionOrder.map((mi,pos)=>{
      const outcome=missionOutcomes[mi]??null;
      const isCurrent=mi===selectedMission;
      let cum=30;for(let p=0;p<=pos;p++){const o=missionOutcomes[missionOrder[p]];if(o)cum=Math.min(100,cum+trustGainByOutcome(o,missionOrder[p]));}
      const chartLabels:{it:string,en:string}[]=[{it:"Fabbrica\ndati",en:"Data\nfactory"},{it:"Energia",en:"Energy"},{it:"Supply\nchain",en:"Supply\nchain"},{it:"Reporting",en:"Reporting"},{it:"Net\nZero",en:"Net\nZero"},{it:"Framework\nESG",en:"ESG\nFramework"}];
      const lbl=language==='it'?chartLabels[mi].it:chartLabels[mi].en;
      const fill=outcome===null?'none':outcome==='positive'?'#39efb4':outcome==='warning'?'#ffc07c':'#ff7777';
      const stroke=outcome===null?'#2e4d41':isCurrent?(outcome==='positive'?'#8affda':outcome==='warning'?'#ffd09c':'#ff9b9b'):(outcome==='positive'?'#39efb4':outcome==='warning'?'#ffc07c':'#ff7777');
      return{label:lbl,val:(outcome!==null?cum:null),isCurrent,fill,stroke,strokeW:isCurrent?'2':'1'};
    })
  ]);
  const trustTotalW=trustSteps.length*(TRUST_BAR_W+TRUST_BAR_GAP)-TRUST_BAR_GAP+TRUST_SVG_PAD_X*2;

  if(screen==="intro"&&profile)return <main className="introScreen" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> YOUR CHALLENGE</div><div className="introNavRight"><button className="introBackBtn" onClick={()=>setScreenState("onboarding")}>← {language==="it"?"Indietro":"Back"}</button><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></div></header><section className="characterStage"><img src={`./characters/${profile}-neutral.png`} alt={name}/><div className="characterTag characterTagRaised"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></section><section className="introBody"><p className="eyebrow">{t.introKicker}</p><h1>{t.introTitle}</h1><p className="storyText">{t.introBody}</p><div className="introTrustBox"><p className="introScoreLabel">{t.introScoreLabel}</p>{renderTrustBar()}</div><div className="introCtaRow"><button className="actionButton questLaunchBtn" onClick={()=>setScreen("approach")}>{t.introStart}<b>→</b><span className="mouseDemo questMouse" aria-hidden="true"><img src="./hand-pointer.svg" alt=""/></span></button></div></section></main>;

  if(screen==="approach"&&profile)return <main className="approachScreen" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> PEOPLE & DATA</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachBody"><div className="approachTopTitle"><h1>{t.approachTitle}</h1></div><div className="approachLeft approachVisual"><div className="approachPeopleIntro"><small className="approachSectionLabel">{language==="it"?"FILONE 01 · PERSONE":"TRACK 01 · PEOPLE"}</small><h2>{language==="it"?"La sfida è agire sul cambiamento con le persone: coinvolgimento, formazione, responsabilizzazione.":"The challenge is acting on change with people: engagement, training, accountability."}</h2></div><img className="approachTeamImage" src="./approach-team-scene.png" alt={language==="it"?"Team ESG che discute una dashboard di sostenibilità":"ESG team discussing a sustainability dashboard"}/></div><div className="approachRight"><div className="approachDataIntro"><small className="approachSectionLabel">{language==="it"?"FILONE 02 · DATI":"TRACK 02 · DATA"}</small><h2>{language==="it"?<><span>Il secondo filone è agire</span><br/><span>sulla complessità di oltre 500 tipi di dati ESG.</span></>:<><span>The second track is acting</span><br/><span>on the complexity of 500+ ESG data types.</span></>}</h2></div><img className="approachDataImage" src="./approach-data-scene.png" alt={language==="it"?"Dashboard e dati ESG":"ESG data dashboard"}/></div><div className="approachBottomAction"><div className="approachQuestBox"><span className="approachQuestIcon">🚀</span><div className="approachQuestCalloutParagraphs">{(Array.isArray(t.approachQuestCallout)?t.approachQuestCallout:[t.approachQuestCallout]).map((para,i)=><p key={i}>{para}</p>)}</div></div><button className="actionButton" onClick={()=>setScreen("questIntro")}>{t.approachQuestCta}</button></div></section></main>;

  if(screen==="questIntro"&&profile)return <main className="questIntroScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL QUEST</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="questIntroBody"><img src={`./characters/${profile}-neutral.png`} className="questIntroProfileImg" alt={name}/><h1 className="questIntroTitle">{language==="it"?"Introduzione: Come funziona il Quest":"Introduction: How the Quest works"}</h1><button className="actionButton questIntroCta" onClick={()=>setScreen("approachIntro")}>{t.questIntroCta}<b>→</b></button></section></main>;


  if(screen==="approachIntro"&&profile)return <main className="approachIntroScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachIntroTitle}</h1><div className="approachIntroText">{(t.approachIntroBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("approachSteps")}>{t.approachIntroCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-6.svg" className="approachIntroStepBadge" alt="Step 6"/><img src="./logica-macro.png" className="approachIntroImg" alt="Dalle priorità alle decisioni"/></div></section></main>;

  if(screen==="approachSteps"&&profile)return <main className="approachIntroScreen" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachStepsTitle}</h1><div className="approachIntroText">{(t.approachStepsBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div></div><div className="approachIntroRight"><img src="./step-1.svg" className="approachIntroStepBadge" alt="Step 1"/><img src="./logica-obiettivi.png" className="approachIntroImg" alt="Obiettivi di business ESG"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachStepsExample as string}</p><button className="actionButton approachIntroCta" onClick={()=>setScreen("approachData")}>{t.approachStepsCta}<b>→</b></button></div></section></main>;

  if(screen==="approachData"&&profile)return <main className="approachIntroScreen" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachDataTitle}</h1><div className="approachIntroText">{(t.approachDataBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("approachDecisions")}>{t.approachDataCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-2.svg" className="approachIntroStepBadge" alt="Step 2"/><img src="./logica-issue.png" className="approachIntroImg" alt="Criticità dati ESG"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachDataExample as string}</p></div></section></main>;

  if(screen==="approachDecisions"&&profile)return <main className="approachIntroScreen" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachDecisionsTitle}</h1><div className="approachIntroText">{(t.approachDecisionsBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("approachRoadmap")}>{t.approachDecisionsCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-3.svg" className="approachIntroStepBadge" alt="Step 3"/><img src="./logica-decisionali.png" className="approachIntroImg" alt="Sfide decisionali ESG"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachDecisionsExample as string}</p></div></section></main>;

  if(screen==="approachRoadmap"&&profile)return <main className="approachIntroScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachRoadmapTitle}</h1><div className="approachIntroText">{(t.approachRoadmapBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("approachTrust")}>{t.approachRoadmapCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-4.svg" className="approachIntroStepBadge" alt="Step 4"/><img src="./logica-road-elementi.png" className="approachIntroImg" alt="Roadmap ESG"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachRoadmapExample as string}</p></div></section></main>;

  if(screen==="approachTrust"&&profile)return <main className="approachIntroScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachTrustTitle}</h1><div className="approachIntroText">{(t.approachTrustBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("approachReport")}>{t.approachTrustCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-5.svg" className="approachIntroStepBadge" alt="Step 5"/><img src="./logica-game-fiducia.png" className="approachIntroImg" alt="Game fiducia stakeholder"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachTrustExample as string}</p></div></section></main>;

  if(screen==="approachReport"&&profile)return <main className="approachIntroScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachReportTitle}</h1><div className="approachIntroText">{(t.approachReportBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("separatorNext")}>{t.approachReportCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-6.svg" className="approachIntroStepBadge" alt="Step 6"/><img src="./logica-report-finale.png" className="approachIntroImg" alt="Report finale ESG"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachReportExample as string}</p></div></section></main>;
  if(screen==="separatorNext"&&profile)return <main className="questIntroScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL QUEST</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="questIntroBody"><img src={`./characters/${profile}-neutral.png`} className="questIntroProfileImg" alt={name}/><h1 className="questIntroTitle">{language==="it"?"Partiamo dagli obiettivi della tua azienda":"Let's start from your company's objectives"}</h1><button className="actionButton questIntroCta" onClick={()=>setScreen("companySetup")}>{t.questIntroCta}<b>→</b></button></section></main>;

  const renderMissionHub=(isPreview=false)=>{const completed=Object.keys(missionOutcomes).length;const foundationDone=!!missionOutcomes[0];const hubNeeds=isPreview?needsByMissionHubFocused:needsByMissionHub;return <main className="missionMenuScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> MISSION HUB</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="missionMenuIntro"><div><p className="eyebrow">{t.roadmapKicker}</p><h1>{t.roadmapTitle}</h1><p>{t.roadmapIntro}</p><div className="roadmapProgress"><span style={{width:`${completed*(100/6)}%`}}/><b>{t.roadmapProgress}: {completed}/6</b></div>{isPreview&&<button className="actionButton rpPreviewCta" onClick={()=>setScreen("chapterOneSummary")}>{language==="it"?"Avanti →":"Next →"}</button>}{isPreview&&<div className="needsTierLegend"><span style={{color:"#ff4d4d"}}>⬡ {language==="it"?"Alta":"High"}</span><span style={{color:"#7dd3fc"}}>⬡ {language==="it"?"Media":"Medium"}</span><span style={{color:"#9ca3af"}}>⬡ {language==="it"?"Bassa":"Low"}</span></div>}{!isPreview&&completed===6&&<button className="summaryCta" onClick={()=>setScreen("summary")}>{t.summaryCta}<b>→</b></button>}</div><div className="priorityPersona"><img src={`./characters/${profile}-neutral.png`} alt={name}/><span>{name}<small>ESG MANAGER</small></span></div></section><section className="missionCards roadmapCards">{missionOrder.map((missionIndex,position)=>{const m=missionCatalog[missionIndex];const outcome=missionOutcomes[missionIndex];const isLocked=!isPreview&&(!foundationDone&&missionIndex!==0);const isStartHere=!isPreview&&!foundationDone&&missionIndex===0;return <article key={m.value} className={`missionCard ${missionIndex===0?"missionCardFoundation":""} ${outcome?`completed ${outcome}`:""}${isLocked?" missionCardLocked":""}`}><button className="missionCardOpen" disabled={isLocked||isPreview} onClick={()=>{if(isLocked||isPreview)return;setSelectedMission(missionIndex);localStorage.setItem("envizi-quest-mission",String(missionIndex+1));setScreen("briefing")}}>{(()=>{const raw=hubNeeds.find(([mi])=>mi===missionIndex)?.[1]||[];const needs=missionIndex===0?[{id:"__foundation__",label:language==="it"?"Una data foundation solida e tracciabile":"A solid and traceable data foundation"},...raw]:raw;const needsLabel=language==="it"?"Esigenze specifiche":"Specific needs";const legendHigh=language==="it"?"Alta":"High";const legendMid=language==="it"?"Media":"Medium";const legendLow=language==="it"?"Bassa":"Low";return <><div className="missionCardChallengeBox"><div className="missionCardTop"><span>{String(position+1).padStart(2,"0")}</span><i>{outcome?"✓":m.icon}</i></div><h2>{language==="it"?m.it:m.en}</h2></div><div className="missionCardNeedsBox"><small className="missionCardNeedsLabel">{needsLabel}</small>{needs.length>0?needs.map(n=>{const prioIdx=priorities.indexOf((n as any).priority);const relMax=prioIdx===0?10:prioIdx===1?8:prioIdx===2?6:4;const rel=Math.min(needRelevance[n.id]??Math.round(relMax/2),relMax);const relNorm=Math.round((rel/relMax)*10);const crit=needCriticality[n.id]??5;const cap=needIdToCapability[n.id];const capLabel=cap?(language==="it"?cap.it:cap.en):null;const tier=relNorm>7&&crit>7?"red":relNorm>4&&relNorm<=7&&crit>4&&crit<=7?"yellow":relNorm>4||crit>4?"yellow":"green";const tierColor=tier==="red"?"#ff4d4d":tier==="yellow"?"#7dd3fc":"#9ca3af";return <span key={n.id} className="missionCardNeed"><span className="missionCardNeedHeader"><b className="missionCardNeedRank" style={{color:tierColor}}>{("rank" in n)?String((n as any).rank).padStart(2,"0"):""}</b><b className="missionCardNeedName" style={{color:tierColor}}>⬡ {n.label}</b><span className="missionCardNeedRC" style={{color:tierColor}}>R:{relNorm} C:{crit}</span></span>{capLabel&&<span className="missionCardNeedCap" style={{color:tierColor,opacity:.8}}>{capLabel}</span>}</span>}):<span className="missionCardNeed">—</span>}</div></>;})()}{isLocked&&<div className="missionCardLockedOverlay"><span>⊘</span><small>{t.missionLocked}</small></div>}{isStartHere&&<div className="missionCardStartHere"><span>{t.missionStartHere}</span><b>→</b></div>}{outcome&&<div className="missionImpact"><div><small>{t.adoptedDecision}</small><strong>{decisionLabel(missionIndex,outcome)}</strong></div><div><small>{t.expectedImpact}</small><p>{outcomeLabel(missionIndex,outcome)}</p></div></div>}<div className="missionCardBottom"><small>{outcome?`${position+1}/5 · ROADMAP`:isLocked?"🔒":""}</small><b>{outcome?t.missionReview:""}</b></div></button></article>})}</section></main>};

  if(screen==="roadmapPreview"&&profile)return renderMissionHub(true);

  if(screen==="chapterOneSummary"&&profile){
    const isIt=language==="it";
    const sec=SECTORS[companySector];
    const sectorLabel=isIt?sec.label.it:sec.label.en;
    const readinessList=isIt?ESG_READINESS_IT:ESG_READINESS_EN;
    const activeReadiness=readinessList.find(r=>r.key===esgReadiness)!;
    const isCsrd=companyDims[4]>=1000&&companyDims[0]>=450;
    const marketLabels:Record<string,{it:string,en:string}>={italia:{it:"Solo Italia",en:"Italy only"},europa:{it:"Europa",en:"Europe"},mondo:{it:"Globale",en:"Global"}};
    const includedPrios=priorities.filter(p=>priorityIncluded[p]);
    const excludedPrios=priorities.filter(p=>!priorityIncluded[p]);
    // top 7 critical needs sorted by R+C desc
    const priorityColors:Record<Priority,string>={credit:"#39efb4",compliance:"#7c86ff",customers:"#f5c542",efficiency:"#ff8c5a",supply:"#a78bfa",reputation:"#f472b6"};
    const top7=dataNeeds.filter(n=>isNeedIncluded(n.id)).map(n=>{
      const rel=needRelevance[n.id]??5;
      const crit=needCriticality[n.id]??5;
      const tier=rel>7&&crit>7?"high":rel>4||crit>4?"medium":"low";
      return{...n,rel,crit,score:rel+crit,tier};
    }).sort((a,b)=>b.score-a.score).slice(0,7);
    // ── testo descrittivo slide 2 ──
    const prioDescIt=(()=>{
      const names=includedPrios.map(p=>(t.priorityNames as Record<Priority,string>)[p]);
      if(names.length===0)return"Non sono stati selezionati obiettivi per l'analisi.";
      const topName=names[0];
      const restNames=names.slice(1);
      const company=displayCompanyName;
      const matLabel=activeReadiness.label.split("—")[0].trim();
      let txt=`${company} ha definito ${names.length} obiettivo${names.length>1?"":"i"} prioritario${names.length>1?"":"i"} per la propria strategia ESG. `;
      txt+=`In particolare, la priorità principale è <strong>${topName}</strong>`;
      if(restNames.length>0)txt+=`, seguita da ${restNames.slice(0,-1).join(", ")}${restNames.length>1?" e ":""}<strong>${restNames[restNames.length-1]}</strong>`;
      txt+=`. Il livello di maturità attuale — <em>${matLabel}</em> — indica che ${activeReadiness.desc.charAt(0).toLowerCase()+activeReadiness.desc.slice(1)}`;
      return txt;
    })();
    const prioDescEn=(()=>{
      const names=includedPrios.map(p=>(t.priorityNames as Record<Priority,string>)[p]);
      if(names.length===0)return"No objectives were selected for the analysis.";
      const topName=names[0];
      const restNames=names.slice(1);
      const company=displayCompanyName;
      const matLabel=activeReadiness.label.split("—")[0].trim().replace("–","—").split("—")[0].trim();
      let txt=`${company} has defined ${names.length} priority objective${names.length>1?"s":""} for its ESG strategy. `;
      txt+=`The main priority is <strong>${topName}</strong>`;
      if(restNames.length>0)txt+=`, followed by ${restNames.slice(0,-1).join(", ")}${restNames.length>1?" and ":""}<strong>${restNames[restNames.length-1]}</strong>`;
      txt+=`. The current maturity level — <em>${matLabel}</em> — means that ${activeReadiness.desc.charAt(0).toLowerCase()+activeReadiness.desc.slice(1)}`;
      return txt;
    })();
    return <main className="c1sScreen">
      <header className="missionNav">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"RIEPILOGO CAPITOLO 1":"CHAPTER 1 SUMMARY"}</div>
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="c1sBody">
        {/* ── SLIDE 1: Azienda ── */}
        <section className="c1sSlide c1sSlideHero">
          <div className="c1sSlideLabel">{isIt?"01 · Profilo azienda":"01 · Company profile"}</div>
          <div className="c1sHeroTop">
            <div className="c1sHeroName">{displayCompanyName}</div>
            <div className="c1sHeroTags">
              <span className="c1sHeroTag">{sectorLabel}</span>
              <span className="c1sHeroTag">{isIt?marketLabels[companyMarket].it:marketLabels[companyMarket].en}</span>
              <span className="c1sHeroTag">€{companyDims[0]}M</span>
              <span className="c1sHeroTag">{companyDims[4].toLocaleString()} {isIt?"dipendenti":"employees"}</span>
              {companyDims[1]>0&&<span className="c1sHeroTag">{companyDims[1]} {isIt?`stabiliment${companyDims[1]===1?"o":"i"}`:`plant${companyDims[1]===1?"":"s"}`}</span>}
              {companyDims[2]>0&&<span className="c1sHeroTag">{companyDims[2]} {isIt?`uffic${companyDims[2]===1?"io":"i"}`:`office${companyDims[2]===1?"":"s"}`}</span>}
            </div>
          </div>
          <div className="c1sMaturityBlock">
            <div className="c1sMaturityLabel">{isIt?"Maturità ESG":"ESG Maturity"}</div>
            <div className="c1sMaturityTitle">{activeReadiness.label}</div>
            <p className="c1sMaturityDesc">{activeReadiness.desc}</p>
          </div>
          <div className={`c1sCsrdBadge${isCsrd?"":" c1sCsrdBadgeOut"}`}>
            <span className="c1sCsrdIcon">{isCsrd?"⚑":"○"}</span>
            <div>
              <strong>{isCsrd?(isIt?"Soggetta a CSRD":"Subject to CSRD"):(isIt?"Non soggetta a CSRD":"Not subject to CSRD")}</strong>
              <span>{isCsrd?(isIt?"Oltre 1.000 dipendenti e €450M di fatturato":"Over 1,000 employees and €450M revenue"):(isIt?"Sotto le soglie CSRD":"Below CSRD thresholds")}</span>
            </div>
          </div>
          {csrdNote&&<div className="c1sCsrdNote"><span>✎</span><p>{csrdNote}</p></div>}
        </section>
        {/* ── SLIDE 2: Obiettivi inclusi ── */}
        <section className="c1sSlide">
          <div className="c1sSlideLabel">{isIt?"02 · Obiettivi prioritari":"02 · Priority objectives"}</div>
          <p className="c1sPrioIntro" dangerouslySetInnerHTML={{__html:isIt?prioDescIt:prioDescEn}}/>
          <div className="c1sPrioList">
            {includedPrios.map((p,i)=><div key={p} className="c1sPrioItem">
              <div className="c1sPrioRank" style={{color:priorityColors[p]}}>{String(i+1).padStart(2,"0")}</div>
              <div className="c1sPrioContent">
                <strong>{(t.priorityNames as Record<Priority,string>)[p]}</strong>
                <span className="c1sPrioDetail">{(t.priorityDetails as Record<Priority,string>)[p]}</span>
                {prioExperience[p]&&<p className="c1sPrioNote">✎ {prioExperience[p]}</p>}
              </div>
            </div>)}
          </div>
        </section>
        {/* ── SLIDE 3: Top 7 aree critiche ── */}
        <section className="c1sSlide">
          <div className="c1sSlideLabel">{isIt?"03 · Le 7 aree critiche principali":"03 · Top 7 critical areas"}</div>
          <h2 className="c1sSlideSub">{isIt?"Ordinate per Rilevanza + Criticità":"Sorted by Relevance + Criticality"}</h2>
          <div className="c1sCritList">
            {top7.map((n,i)=>{
              const tierColor=n.tier==="high"?"#ff4d4d":n.tier==="medium"?"#7dd3fc":"#9ca3af";
              return <div key={n.id} className="c1sCritItem">
                <div className="c1sCritRank" style={{color:tierColor}}>{String(i+1).padStart(2,"0")}</div>
                <div className="c1sCritBody">
                  <strong style={{color:tierColor}}>{n.label}</strong>
                  <div className="c1sCritMeta">
                    <span className="c1sCritPrio" style={{color:priorityColors[n.priority]}}>⬡ {(t.priorityNames as Record<Priority,string>)[n.priority]}</span>
                    <span className="c1sCritScore">R{n.rel} · C{n.crit}</span>
                    <span className="c1sCritTier" style={{color:tierColor}}>{n.tier==="high"?(isIt?"Alta":"High"):n.tier==="medium"?(isIt?"Media":"Medium"):(isIt?"Bassa":"Low")}</span>
                  </div>
                </div>
              </div>;
            })}
          </div>
        </section>
        <div className="c1sNavRow">
          <button className="actionButton" onClick={()=>setScreen("esgStrategist")}>{isIt?"Avanti →":"Next →"}</button>
        </div>
      </div>
    </main>;
  }

  if(screen==="esgStrategist"&&profile){
    const isIt=language==="it";
    return <main className="esgStrategistScreen">
      <header className="missionNav">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> ESG STRATEGIST</div>
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <section className="esgStrategistBody">
        <div className="esgStrategistStage">
          <img src={`./characters/${profile}-success.png`} alt={name} className="esgStrategistImg"/>
        </div>
        <div className="esgStrategistContent">
          <p className="eyebrow">{isIt?"LIVELLO SBLOCCATO":"LEVEL UNLOCKED"}</p>
          <div className="esgStrategistBadge">★ ESG STRATEGIST</div>
          <h1 className="esgStrategistTitle">{isIt?"Complimenti, hai sbloccato il livello ESG Strategist!":"Congratulations, you have unlocked the ESG Strategist level!"}</h1>
          <p className="esgStrategistSub">{isIt?"Hai identificato le esigenze di dati chiave e costruito la tua matrice di priorità. Ora è il momento di trasformare l'analisi in sfide decisionali concrete.":"You have identified key data needs and built your priority matrix. Now it's time to turn the analysis into concrete decision challenges."}</p>
          <div className="esgStrategistActions">
            <button className="secondaryAction" onClick={()=>goBack()}>← {isIt?"Indietro":"Back"}</button>
            <button className="actionButton" onClick={()=>setScreen("introCopy")}>{isIt?"Inizia le sfide →":"Start challenges →"}</button>
          </div>
          {renderSaveBtn(isIt)}
        </div>
      </section>
    </main>;
  }

  if(screen==="introCopy"&&profile)return <main className="introScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> YOUR CHALLENGE</div><div className="introNavRight"><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></div></header><section className="characterStage"><img src={`./characters/${profile}-neutral.png`} alt={name}/><div className="characterTag characterTagRaised"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></section><section className="introBody"><p className="eyebrow">{t.introKicker}</p><h1>{t.introTitle}</h1><p className="storyText">{t.introBody}</p><div className="introTrustBox"><p className="introScoreLabel">{t.introScoreLabel}</p>{renderTrustBar()}</div><div className="introCtaRow"><button className="actionButton questLaunchBtn" onClick={()=>{setSelectedMission(0);localStorage.setItem("envizi-quest-mission","1");setScreen("briefing");}}>{t.introStart}<b>→</b></button></div></section></main>;

  if(screen==="missions"&&profile){
    if(!!missionOutcomes[0])return renderMissionHub(false);
    const m0=missionCatalog[0];
    const questionBody=(t.mission0QuestionBody as string).replace("COMPANY_NAME",displayCompanyName);
    return <main className="mission0IntroScreen">
      <header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> MISSION 01</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header>
      <section className="m0iStage">
        <img src={`./characters/${profile}-neutral.png`} alt={name} className="m0iProfileImg"/>
        <div className="m0iPersonaTag"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div>
      </section>
      <section className="m0iContent">
        <div className="m0iMissionBadge"><span>{m0.icon}</span><i>{language==="it"?"MISSIONE 01 · DATA FOUNDATION":"MISSION 01 · DATA FOUNDATION"}</i></div>
        <h1 className="m0iTitle">{language==="it"?m0.it:m0.en}</h1>
        <p className="m0iKicker">{t.mission0QuestionKicker}</p>
        <p className="m0iQuestion">{t.mission0Question}</p>
        <p className="m0iBody">{questionBody}</p>
        <button className="actionButton m0iCta" onClick={()=>{setSelectedMission(0);localStorage.setItem("envizi-quest-mission","1");setScreen("briefing");}}>{t.mission0Cta}<b>→</b></button>
      </section>
    </main>;
  }

  if(screen==="missionIntro"&&profile){const mid=t.missionIntroData[selectedMission]||t.missionIntroData[0];const mBody=(mid.body as string).replace("COMPANY_NAME",displayCompanyName);const activeMission=missionCatalog[selectedMission];return <main className="mission0IntroScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {mid.eyebrow}</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="m0iStage"><img src={`./characters/${profile}-neutral.png`} alt={name} className="m0iProfileImg"/><div className="m0iPersonaTag"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></section><section className="m0iContent"><div className="m0iMissionBadge"><span>{activeMission.icon}</span><i>{mid.eyebrow}</i></div><h1 className="m0iTitle">{mid.title}</h1><p className="m0iKicker">{mid.kicker}</p><p className="m0iQuestion">{mid.question}</p><p className="m0iBody">{mBody}</p><button className="actionButton m0iCta" onClick={()=>setScreen("compare")}>{mid.cta}<b>→</b></button></section></main>;}



  if(screen==="summary"&&profile)return <main className="summaryScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> ESG ROADMAP</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="summaryIntro"><p className="eyebrow">{t.summaryKicker}</p><h1>{t.summaryTitle}</h1><p>{t.summaryIntro}</p><div className="summaryPriorities"><small>{t.topPriorities}</small><div>{priorities.slice(0,3).map((p,i)=><span key={p} className={priorityIncluded[p]?"":"summaryPriorityExcluded"}><b>{String(i+1).padStart(2,"0")}</b>{t.priorityNames[p]}{!priorityIncluded[p]&&<small className="summaryPriorityExcludedNote">{language==="it"?" (escluso dall'analisi)":" (excluded from analysis)"}</small>}</span>)}</div></div>{calculatedTrustScore>=80&&<div className="trustedBadgeSummary">★ {t.trustedLabel}</div>}</section><section className="summaryGrid">{missionOrder.map((missionIndex,position)=>{const m=missionCatalog[missionIndex];const outcome=missionOutcomes[missionIndex];const assignedNeeds=needsByMissionHub.find(([mi])=>mi===missionIndex)?.[1]||[];const displayNeeds=missionIndex===0?[{id:"__foundation__",label:language==="it"?"Una data foundation solida e tracciabile":"A solid and traceable data foundation"},...assignedNeeds]:assignedNeeds;return <article className={`summaryCard ${outcome}`} key={m.value}><div className="summaryCardTitle"><span>{String(position+1).padStart(2,"0")}</span><h2>{language==="it"?m.it:m.en}</h2></div><div><small>{t.adoptedDecision}</small><strong>{outcome?decisionLabel(missionIndex,outcome):"—"}</strong></div><div><small>{t.expectedImpact}</small><p>{outcome?outcomeLabel(missionIndex,outcome):"—"}</p></div><div className="summaryParams"><small>{t.parameters}</small>{displayNeeds.length>0?displayNeeds.map(n=><span key={n.id}>⬡ {n.label}</span>):<span>—</span>}</div></article>})}</section><footer className="summaryActions"><button className="secondaryAction" onClick={reset}>← {t.backStart}</button><button className="actionButton" onClick={()=>setScreen("nextStep")}>{t.nextStep}<b>→</b></button></footer></main>;

  if(screen==="nextStep"&&profile){const top3=priorities.slice(0,3).map((p,i)=>`${i+1}. ${t.priorityNames[p]}`).join(", ");const decisionsLine=missionOrder.map(mi=>{const o=missionOutcomes[mi];return o?`M${mi+1}: ${decisionLabel(mi,o)}`:`M${mi+1}: —`}).join(" | ");const paramsLine=missionOrder.map(mi=>{const vals=missionParameters[mi]||[];const items=missionItems(mi);const units=missionUnits(mi);const filled=items.map((item,i)=>vals[i]?`${item.title}: ${vals[i]} ${units[i]}`:"").filter(Boolean);return filled.length?`[M${mi+1}: ${filled.join(", ")}]`:""}).filter(Boolean).join(" ");const isIt=language==="it";const toEmail=contactEmail.trim()||t.nextContactEmail;const subj=isIt?"Demo IBM Envizi — Envizi Impact Quest":"IBM Envizi Demo — Envizi Impact Quest";const pocSubj=isIt?"Proof of Concept IBM Envizi — Envizi Impact Quest":"IBM Envizi PoC — Envizi Impact Quest";const bvaSubj=isIt?"Business Value Assessment IBM Envizi — Envizi Impact Quest":"IBM Envizi BVA — Envizi Impact Quest";const commonBody=isIt?`%0A%0A— Profilo: ${name} (${profile==="marco"?t.maleRole:t.femaleRole})%0A— Punteggio fiducia finale: ${trustScore}/100%0A— Top 3 priorità: ${top3}%0A— Decisioni: ${decisionsLine}${paramsLine?`%0A— Parametri AS-IS: ${paramsLine}`:""}${approachBiz?`%0A— Esigenze di business: ${approachBiz}`:""}${approachData?`%0A— Sfide sui dati: ${approachData}`:""}%0A%0AIn attesa di un riscontro.`:`%0A%0A— Profile: ${name} (${profile==="marco"?t.maleRole:t.femaleRole})%0A— Final trust score: ${trustScore}/100%0A— Top 3 priorities: ${top3}%0A— Decisions: ${decisionsLine}${paramsLine?`%0A— AS-IS parameters: ${paramsLine}`:""}${approachBiz?`%0A— Business needs: ${approachBiz}`:""}${approachData?`%0A— Data challenges: ${approachData}`:""}%0A%0ALooking forward to your reply.`;const demoBody=isIt?`Ciao,%0A%0AHo completato l'Envizi Impact Quest e vorrei approfondire come IBM Envizi si integra nel nostro contesto con una demo.${commonBody}`:`Hi,%0A%0AI have completed the Envizi Impact Quest and would like to explore how IBM Envizi fits our context with a demo.${commonBody}`;const pocBody=isIt?`Ciao,%0A%0AHo completato l'Envizi Impact Quest e sono interessato a un Proof of Concept con i dati reali della mia organizzazione.${commonBody}`:`Hi,%0A%0AI have completed the Envizi Impact Quest and I am interested in a Proof of Concept with my organisation's real data.${commonBody}`;const bvaBody=isIt?`Ciao,%0A%0AHo completato l'Envizi Impact Quest e vorrei richiedere un Business Value Assessment per quantificare il valore di IBM Envizi per la mia organizzazione.${commonBody}`:`Hi,%0A%0AI have completed the Envizi Impact Quest and would like to request a Business Value Assessment to quantify the value of IBM Envizi for my organisation.${commonBody}`;return <main className="nextStepScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> NEXT STEP</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="nextStepBody"><p className="eyebrow">{t.nextKicker}</p><h1>{t.nextTitle}</h1><div className="nextStepCards"><div className="nextStepCard nextStepCardDemo"><small>{t.nextDemoLabel}</small><p>{t.nextDemoIntro}</p><div className="nextDemoEmailRow"><input className="nextDemoEmailInput" type="email" placeholder={t.nextDemoEmailPlaceholder} value={contactEmail} onChange={e=>setContactEmail(e.target.value)}/></div><a className="nextStepBtn primary" href={`mailto:${toEmail}?subject=${subj}&body=${demoBody}`}>{t.nextDemoButton}</a>{!contactEmail.trim()&&<a className="nextDemoFallbackLink" href={`mailto:${t.nextContactEmail}?subject=${subj}&body=${demoBody}`}>{t.nextDemoFallback}</a>}</div><div className="nextStepCard"><small>{t.nextPocLabel}</small><p>{t.nextPocIntro}</p><a className="nextStepBtn primary" href={`mailto:${toEmail||t.nextContactEmail}?subject=${pocSubj}&body=${pocBody}`}>{t.nextPocButton}</a></div><div className="nextStepCard"><small>{t.nextBvaLabel}</small><p>{t.nextBvaIntro}</p><a className="nextStepBtn primary" href={`mailto:${toEmail||t.nextContactEmail}?subject=${bvaSubj}&body=${bvaBody}`}>{t.nextBvaButton}</a></div><div className="nextStepCard"><small>{t.nextSiteLabel}</small><p>{t.nextSiteIntro}</p><a className="nextStepBtn primary" href="https://www.ibm.com/it-it/products/envizi" target="_blank" rel="noreferrer">{t.nextSiteButton}</a></div></div><div className="nextStepContact"><small>{t.nextContactLabel}</small><strong>{t.nextContactName}</strong><span>{t.nextContactRole}</span><a href={`mailto:${t.nextContactEmail}`}>{t.nextContactEmail}</a></div><div className="nextStepActions"><button className="secondaryAction" onClick={reset}>← {t.backStart}</button><button className="actionButton" onClick={()=>setScreen("thankYou")}>{t.nextStep}<b>→</b></button></div></section></main>;}


  if(screen==="milestone"&&profile){
    const isTrusted=missionOutcomes[0]==="positive";
    const isIt=language==="it";
    const milestoneText=isTrusted
      ?(isIt
        ?"Complimenti, hai sbloccato il livello Trusted ESG Data Manager."
        :"Congratulations, you have unlocked the Trusted ESG Data Manager level.")
      :(isIt
        ?"Avviare la digitalizzazione dell\u2019ESG in modo semplice, con moduli per la raccolta dati e senza integrazione delle fonti, pu\u00f2 essere un\u2019ottima decisione per contenere costi e rischi iniziali. Anche in questo contesto IBM Envizi pu\u00f2 diventare fattore critico di successo per la tua iniziativa. Verifica quali requisiti della gestione dati sono comunque importanti per te e il valore di Envizi a supporto."
        :"Starting ESG digitalisation simply, with data collection forms and without source integration, can be an excellent decision to contain initial costs and risks. Even in this context, IBM Envizi can become a critical success factor for your initiative. Check which data management requirements are still important to you and the value Envizi can provide.");
    return (
      <main className="thankYouScreen">
        <header className="missionNav">
          <button className="brand brandButton" onClick={reset}>
            <span className="brandMark">e·</span>
            <span>Envizi<br/>Impact Quest</span>
          </button>
          <div className="missionProgress"><span className="activeDot"/> MILESTONE</div>
          <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
        </header>
        <section className="thankYouBody" style={{display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",gap:"0",padding:"0",overflow:"hidden"}}>
          <div style={{height:"100%",overflow:"hidden"}}>
            <img src={`./characters/${profile}-${isTrusted?"success":"neutral"}.png`} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
          </div>
          <div style={{padding:"3vw 4vw",display:"flex",flexDirection:"column",gap:"16px"}}>
            <h1 style={{color:isTrusted?"#39efb4":"#ffc07c",fontSize:isTrusted?"clamp(24px,3vw,44px)":"clamp(14px,1.5vw,20px)",lineHeight:1.5,letterSpacing:"-.02em",margin:0}}>
              {milestoneText}
            </h1>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <button className="secondaryAction" onClick={()=>goBack()}>{isIt?"\u2190 Indietro":"\u2190 Back"}</button>
              <button className="actionButton" style={{width:"auto",marginTop:0,padding:"12px 16px"}} onClick={()=>setScreen("dataFoundation")}>{isIt?"Approfondiamo perch\u00e9 Envizi \u2192":"Let\u2019s explore why Envizi \u2192"}</button>
            </div>
            {renderSaveBtn(isIt)}
          </div>
        </section>
      </main>
    );
  }


  if(screen==="thankYou"&&profile)return <main className="thankYouScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> FINAL</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="thankYouBody"><h1>{t.thankYouTitle}</h1></section></main>;



  // ── ENERGIA E DECARBONIZZAZIONE — Foundation + Conclusion ──────────────────
  if(screen==="energyFoundation"&&profile){
    const isIt=language==="it";
    const allRated=EF_REQUIREMENTS.every(r=>efRatings[r.id]);
    const efScore=Object.values(efRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const efPct=Math.min(100,Math.round(efScore));
    const efHighlight=efScore>=35;
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"ENERGIA E DECARBONIZZAZIONE":"ENERGY AND DECARBONISATION"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfStickyBar">
        <div className="dfStickyLeft">
          <p className="eyebrow">{isIt?"PERCHÉ SELEZIONARE IBM ENVIZI · ENERGY ANALYTICS":"WHY SELECT IBM ENVIZI · ENERGY ANALYTICS"}</p>
          <h1>{isIt?"Quanto contano per te questi requisiti di energy management?":"How important are these energy management requirements for you?"}</h1>
          <p className="dfSubtitle">{isIt?"Basso = non in esame · Medio = in esame per il prossimo passo · Alto = urgente":"Low = not under review · Medium = under review for next step · High = urgent"}</p>
          {efHighlight&&<div className="dfScoreMsg"><span className="dfScoreMsgIcon">⬡</span><p>{isIt?"Molto probabilmente IBM Envizi è la soluzione per le tue esigenze energetiche.":"IBM Envizi is very likely the right solution for your energy management needs."}</p></div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={efHighlight?"dfScoreHigh":""}>{efScore}<em>/60</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${efPct}%`,background:efHighlight?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("energyConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>
      <div className="dfColHeaders">
        <div className="dfColH dfColHReq">{isIt?"Requisito · Valutazione":"Requirement · Rating"}</div>
        <div className="dfColH dfColHCap">⬡ {isIt?"Capacità IBM Envizi":"IBM Envizi capability"}</div>
        <div className="dfColH dfColHBen">{isIt?"Beneficio ESG Manager":"ESG Manager benefit"}</div>
      </div>
      <div className="dfGrid">
        {EF_REQUIREMENTS.map((req,i)=>{
          const rating=efRatings[req.id];
          const isActive=rating==="medium"||rating==="high";
          const pts=rating==="high"?10:rating==="medium"?7.5:0;
          return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
            <div className="dfRowReq">
              <div className="dfRowReqTop"><span className="dfItemNum">{String(i+1).padStart(2,"0")}</span><p className="dfItemQ">{isIt?req.it:req.en}</p></div>
              <div className="dfRatingGroup">{(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setEfRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +7,5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +7.5":"High +10")}</button>)}</div>
              {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
            </div>
            <div className={`dfRowCap${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">⬡ IBM Envizi</span><p>{isIt?req.capIt:req.capEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
            <div className={`dfRowBen${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">{isIt?"Beneficio":"Benefit"}</span><p>{isIt?req.benIt:req.benEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
          </div>;
        })}
      </div>
      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/interval-meter-analytics" target="_blank" rel="noreferrer">Interval Meter Analytics ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/utility-bill-analytics" target="_blank" rel="noreferrer">Utility Bill Analytics ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="energyConclusion"&&profile){
    const isIt=language==="it";
    const efScore=Object.values(efRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const efPct=Math.min(100,Math.round(efScore));
    const efHighVery=efScore>=50;
    const efHighMaybe=efScore>=30;
    const efHighlight=efHighMaybe;
    const m1outcome=missionOutcomes[1];
    const decisionTaken=m1outcome?(isIt?{positive:"Envizi Utility Bill Analytics + Interval Meter Analytics",warning:"Cruscotto energetico manuale",critical:"Bollette e contatori separati"}[m1outcome]:{positive:"Envizi Utility Bill Analytics + Interval Meter Analytics",warning:"Manual energy dashboard",critical:"Bills and meters kept separate"}[m1outcome]):null;
    const decisionImg=m1outcome==="positive"?"./energy-envizi-analytics.png":m1outcome==="warning"?"./energy-manual-dashboard.png":"./energy-asis-fragmented.png";
    const decisionColor=m1outcome==="positive"?"#39efb4":m1outcome==="warning"?"#ffc07c":"#ff7777";
    const highReqs=EF_REQUIREMENTS.filter(r=>efRatings[r.id]==="high");
    const medReqs=EF_REQUIREMENTS.filter(r=>efRatings[r.id]==="medium");
    const lowReqs=EF_REQUIREMENTS.filter(r=>efRatings[r.id]==="low");
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"ENERGIA E DECARBONIZZAZIONE":"ENERGY AND DECARBONISATION"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfConclusionBody">
        <div className="dfcLeft">
          <p className="eyebrow">{isIt?"CONCLUSIONI · ENERGIA E DECARBONIZZAZIONE":"CONCLUSIONS · ENERGY AND DECARBONISATION"}</p>
          <h1 className="dfcTitle">{isIt?"La tua scelta per il controllo dell'energia":"Your energy management choice"}</h1>
          {decisionTaken&&<><img src={decisionImg} alt={decisionTaken} className="dfcDecisionImg"/><div className="dfcDecisionLabel"><small>{isIt?"DECISIONE ADOTTATA · MISSIONE 02":"DECISION ADOPTED · MISSION 02"}</small><strong style={{color:decisionColor}}>{decisionTaken}</strong></div></>}
          <div className="dfcScorePanelLeft">
            <p className="dfcSectionLabel">{isIt?"RILEVANZA IBM ENVIZI · ENERGY ANALYTICS":"IBM ENVIZI RELEVANCE · ENERGY ANALYTICS"}</p>
            <div className="dfScoreBox">
              <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
              <strong className={efHighlight?"dfScoreHigh":""}>{efScore}<em>/60</em></strong>
              <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${efPct}%`,background:efHighlight?"#39efb4":"#ffc07c"}}/></div>
            </div>
            <div className="dfScoreMsg" style={{margin:0,borderColor:efHighVery?"#39efb4":efHighMaybe?"#ffc07c":"#57606a"}}>
              <span className="dfScoreMsgIcon" style={{color:efHighVery?"#39efb4":efHighMaybe?"#ffc07c":"#57606a"}}>⬡</span>
              <p style={{color:efHighVery?"#39efb4":efHighMaybe?"#ffc07c":"#57606a"}}>{efHighVery?(isIt?"Molto probabilmente IBM Envizi è la soluzione per le tue esigenze energetiche.":"IBM Envizi is very likely the right solution for your energy management needs."):efHighMaybe?(isIt?"Probabilmente IBM Envizi è la soluzione per le tue esigenze energetiche.":"IBM Envizi is probably the right solution for your energy management needs."):(isIt?"Alcuni requisiti sono prioritari: approfondisci con il tuo team IBM.":"Some requirements are a priority — explore further with your IBM team.")}</p>
            </div>
          </div>
          <div className="dfcActions">
            <button className="actionButton" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>{setSelectedMission(4);localStorage.setItem("envizi-quest-mission","5");setScreen("briefing");}}>{isIt?"Prossima sfida: Net Zero →":"Next challenge: Net Zero →"}</button>
          </div>
        </div>
        <div className="dfcRight">
          {efHighlight&&<p className="dfcIntroTitle">{isIt?"Abbiamo recepito che per te la scelta Envizi può essere giustificata per:":"We've noted that for you the Envizi choice can be justified by:"}</p>}
          {highReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#39efb4"}}>{isIt?"MOLTO RILEVANTI":"HIGHLY RELEVANT"}</p><ul className="dfcFactorList">{highReqs.map(r=><li key={r.id} style={{fontSize:"clamp(24px,2.2vw,32px)",fontWeight:600,color:"#effbf6"}}><span className="dfcFactorDot" style={{background:"#39efb4",width:"10px",height:"10px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {medReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#ffc07c"}}>{isIt?"MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT"}</p><ul className="dfcFactorList">{medReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)",color:"#c8ddd6"}}><span className="dfcFactorDot" style={{background:"#ffc07c",width:"8px",height:"8px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {lowReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#5a7a70"}}>{isIt?"POCO RILEVANTI":"LOW RELEVANCE"}</p><ul className="dfcFactorList">{lowReqs.map(r=><li key={r.id} style={{fontSize:"clamp(16px,1.4vw,20px)",color:"#5a7a70"}}><span className="dfcFactorDot" style={{background:"#3d6052",width:"6px",height:"6px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
        </div>
      </div>
    </main>;
  }

  // ── COINVOLGIMENTO SUPPLY CHAIN — Foundation + Conclusion ───────────────────
  if(screen==="supplyFoundation"&&profile){
    const isIt=language==="it";
    const allRated=SC_REQUIREMENTS.every(r=>scRatings[r.id]);
    const scScore=Object.values(scRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const scPct=Math.min(100,Math.round(scScore));
    const scHighlight=scScore>=35;
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"COINVOLGIMENTO SUPPLY CHAIN":"SUPPLY CHAIN ENGAGEMENT"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfStickyBar">
        <div className="dfStickyLeft">
          <p className="eyebrow">{isIt?"PERCHÉ SELEZIONARE IBM ENVIZI · SUPPLY CHAIN INTELLIGENCE":"WHY SELECT IBM ENVIZI · SUPPLY CHAIN INTELLIGENCE"}</p>
          <h1>{isIt?"Quanto contano per te questi requisiti di supply chain?":"How important are these supply chain requirements for you?"}</h1>
          <p className="dfSubtitle">{isIt?"Basso = non in esame · Medio = in esame per il prossimo passo · Alto = urgente":"Low = not under review · Medium = under review for next step · High = urgent"}</p>
          {scHighlight&&<div className="dfScoreMsg"><span className="dfScoreMsgIcon">⬡</span><p>{isIt?"Molto probabilmente IBM Envizi è la soluzione per le tue esigenze Scope 3 e supply chain.":"IBM Envizi is very likely the right solution for your Scope 3 and supply chain needs."}</p></div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={scHighlight?"dfScoreHigh":""}>{scScore}<em>/60</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${scPct}%`,background:scHighlight?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("supplyConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>
      <div className="dfColHeaders">
        <div className="dfColH dfColHReq">{isIt?"Requisito · Valutazione":"Requirement · Rating"}</div>
        <div className="dfColH dfColHCap">⬡ {isIt?"Capacità IBM Envizi":"IBM Envizi capability"}</div>
        <div className="dfColH dfColHBen">{isIt?"Beneficio ESG Manager":"ESG Manager benefit"}</div>
      </div>
      <div className="dfGrid">
        {SC_REQUIREMENTS.map((req,i)=>{
          const rating=scRatings[req.id];
          const isActive=rating==="medium"||rating==="high";
          const pts=rating==="high"?10:rating==="medium"?7.5:0;
          return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
            <div className="dfRowReq">
              <div className="dfRowReqTop"><span className="dfItemNum">{String(i+1).padStart(2,"0")}</span><p className="dfItemQ">{isIt?req.it:req.en}</p></div>
              <div className="dfRatingGroup">{(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setScRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +7,5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +7.5":"High +10")}</button>)}</div>
              {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
            </div>
            <div className={`dfRowCap${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">⬡ IBM Envizi</span><p>{isIt?req.capIt:req.capEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
            <div className={`dfRowBen${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">{isIt?"Beneficio":"Benefit"}</span><p>{isIt?req.benIt:req.benEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
          </div>;
        })}
      </div>
      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/supply-chain-intelligence" target="_blank" rel="noreferrer">Supply Chain Intelligence ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/scope-3-ghg-accounting-reporting" target="_blank" rel="noreferrer">Scope 3 GHG Accounting ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="supplyConclusion"&&profile){
    const isIt=language==="it";
    const scScore=Object.values(scRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const scPct=Math.min(100,Math.round(scScore));
    const scHighVery=scScore>=50;
    const scHighMaybe=scScore>=30;
    const scHighlight=scHighMaybe;
    const m2outcome=missionOutcomes[2];
    const decisionTaken=m2outcome?(isIt?{positive:"Envizi Surveys + Assessments e Supply Chain Intelligence",warning:"Portale questionari separato",critical:"E-mail e fogli separati"}[m2outcome]:{positive:"Envizi Surveys + Assessments and Supply Chain Intelligence",warning:"Separate questionnaire portal",critical:"Email and separate spreadsheets"}[m2outcome]):null;
    const decisionImg=m2outcome==="positive"?"./supply-chain-envizi.png":m2outcome==="warning"?"./supply-chain-portal.png":"./supply-chain-asis.png";
    const decisionColor=m2outcome==="positive"?"#39efb4":m2outcome==="warning"?"#ffc07c":"#ff7777";
    const highReqs=SC_REQUIREMENTS.filter(r=>scRatings[r.id]==="high");
    const medReqs=SC_REQUIREMENTS.filter(r=>scRatings[r.id]==="medium");
    const lowReqs=SC_REQUIREMENTS.filter(r=>scRatings[r.id]==="low");
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"COINVOLGIMENTO SUPPLY CHAIN":"SUPPLY CHAIN ENGAGEMENT"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfConclusionBody">
        <div className="dfcLeft">
          <p className="eyebrow">{isIt?"CONCLUSIONI · SUPPLY CHAIN ENGAGEMENT":"CONCLUSIONS · SUPPLY CHAIN ENGAGEMENT"}</p>
          <h1 className="dfcTitle">{isIt?"La tua scelta per il coinvolgimento della supply chain":"Your supply chain engagement choice"}</h1>
          {decisionTaken&&<><img src={decisionImg} alt={decisionTaken} className="dfcDecisionImg"/><div className="dfcDecisionLabel"><small>{isIt?"DECISIONE ADOTTATA · MISSIONE 03":"DECISION ADOPTED · MISSION 03"}</small><strong style={{color:decisionColor}}>{decisionTaken}</strong></div></>}
          <div className="dfcScorePanelLeft">
            <p className="dfcSectionLabel">{isIt?"RILEVANZA IBM ENVIZI · SUPPLY CHAIN INTELLIGENCE":"IBM ENVIZI RELEVANCE · SUPPLY CHAIN INTELLIGENCE"}</p>
            <div className="dfScoreBox">
              <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
              <strong className={scHighlight?"dfScoreHigh":""}>{scScore}<em>/60</em></strong>
              <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${scPct}%`,background:scHighlight?"#39efb4":"#ffc07c"}}/></div>
            </div>
            <div className="dfScoreMsg" style={{margin:0,borderColor:scHighVery?"#39efb4":scHighMaybe?"#ffc07c":"#57606a"}}>
              <span className="dfScoreMsgIcon" style={{color:scHighVery?"#39efb4":scHighMaybe?"#ffc07c":"#57606a"}}>⬡</span>
              <p style={{color:scHighVery?"#39efb4":scHighMaybe?"#ffc07c":"#57606a"}}>{scHighVery?(isIt?"Molto probabilmente IBM Envizi è la soluzione per le tue esigenze Scope 3 e supply chain.":"IBM Envizi is very likely the right solution for your Scope 3 and supply chain needs."):scHighMaybe?(isIt?"Probabilmente IBM Envizi è la soluzione per le tue esigenze Scope 3 e supply chain.":"IBM Envizi is probably the right solution for your Scope 3 and supply chain needs."):(isIt?"Alcuni requisiti sono prioritari: approfondisci con il tuo team IBM.":"Some requirements are a priority — explore further with your IBM team.")}</p>
            </div>
          </div>
          <div className="dfcActions">
            <button className="actionButton" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>{setSelectedMission(1);localStorage.setItem("envizi-quest-mission","2");setScreen("briefing");}}>{isIt?"Prossima sfida: Energia →":"Next challenge: Energy →"}</button>
          </div>
        </div>
        <div className="dfcRight">
          {scHighlight&&<p className="dfcIntroTitle">{isIt?"Abbiamo recepito che per te la scelta Envizi può essere giustificata per:":"We've noted that for you the Envizi choice can be justified by:"}</p>}
          {highReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#39efb4"}}>{isIt?"MOLTO RILEVANTI":"HIGHLY RELEVANT"}</p><ul className="dfcFactorList">{highReqs.map(r=><li key={r.id} style={{fontSize:"clamp(24px,2.2vw,32px)",fontWeight:600,color:"#effbf6"}}><span className="dfcFactorDot" style={{background:"#39efb4",width:"10px",height:"10px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {medReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#ffc07c"}}>{isIt?"MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT"}</p><ul className="dfcFactorList">{medReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)",color:"#c8ddd6"}}><span className="dfcFactorDot" style={{background:"#ffc07c",width:"8px",height:"8px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {lowReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#5a7a70"}}>{isIt?"POCO RILEVANTI":"LOW RELEVANCE"}</p><ul className="dfcFactorList">{lowReqs.map(r=><li key={r.id} style={{fontSize:"clamp(16px,1.4vw,20px)",color:"#5a7a70"}}><span className="dfcFactorDot" style={{background:"#3d6052",width:"6px",height:"6px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
        </div>
      </div>
    </main>;
  }

  // ── ROTTA VERSO NET ZERO — Foundation + Conclusion ──────────────────────────
  if(screen==="planningFoundation"&&profile){
    const isIt=language==="it";
    const allRated=PL_REQUIREMENTS.every(r=>plRatings[r.id]);
    const plScore=Object.values(plRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const plPct=Math.min(100,Math.round(plScore));
    const plHighlight=plScore>=35;
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"ROTTA VERSO NET ZERO":"NET ZERO PATHWAY"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfStickyBar">
        <div className="dfStickyLeft">
          <p className="eyebrow">{isIt?"PERCHÉ SELEZIONARE IBM ENVIZI · PLANNING E SCENARIO MODELER":"WHY SELECT IBM ENVIZI · PLANNING & SCENARIO MODELER"}</p>
          <h1>{isIt?"Quanto contano per te questi requisiti di pianificazione Net Zero?":"How important are these Net Zero planning requirements for you?"}</h1>
          <p className="dfSubtitle">{isIt?"Basso = non in esame · Medio = in esame per il prossimo passo · Alto = urgente":"Low = not under review · Medium = under review for next step · High = urgent"}</p>
          {plHighlight&&<div className="dfScoreMsg"><span className="dfScoreMsgIcon">⬡</span><p>{isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua pianificazione della decarbonizzazione.":"IBM Envizi is very likely the right solution for your decarbonisation planning needs."}</p></div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={plHighlight?"dfScoreHigh":""}>{plScore}<em>/60</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${plPct}%`,background:plHighlight?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("planningConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>
      <div className="dfColHeaders">
        <div className="dfColH dfColHReq">{isIt?"Requisito · Valutazione":"Requirement · Rating"}</div>
        <div className="dfColH dfColHCap">⬡ {isIt?"Capacità IBM Envizi":"IBM Envizi capability"}</div>
        <div className="dfColH dfColHBen">{isIt?"Beneficio ESG Manager":"ESG Manager benefit"}</div>
      </div>
      <div className="dfGrid">
        {PL_REQUIREMENTS.map((req,i)=>{
          const rating=plRatings[req.id];
          const isActive=rating==="medium"||rating==="high";
          const pts=rating==="high"?10:rating==="medium"?7.5:0;
          return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
            <div className="dfRowReq">
              <div className="dfRowReqTop"><span className="dfItemNum">{String(i+1).padStart(2,"0")}</span><p className="dfItemQ">{isIt?req.it:req.en}</p></div>
              <div className="dfRatingGroup">{(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setPlRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +7,5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +7.5":"High +10")}</button>)}</div>
              {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
            </div>
            <div className={`dfRowCap${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">⬡ IBM Envizi</span><p>{isIt?req.capIt:req.capEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
            <div className={`dfRowBen${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">{isIt?"Beneficio":"Benefit"}</span><p>{isIt?req.benIt:req.benEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
          </div>;
        })}
      </div>
      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/scenario-modeler" target="_blank" rel="noreferrer">Scenario Modeler ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/sustainability-program-tracking" target="_blank" rel="noreferrer">Sustainability Program Tracking ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="planningConclusion"&&profile){
    const isIt=language==="it";
    const plScore=Object.values(plRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const plPct=Math.min(100,Math.round(plScore));
    const plHighVery=plScore>=50;
    const plHighMaybe=plScore>=30;
    const plHighlight=plHighMaybe;
    const m4outcome=missionOutcomes[4];
    const decisionTaken=m4outcome?(isIt?{positive:"Envizi Scenario Modeler + Program Tracking + Planning Analytics",warning:"Portafoglio progetti in foglio e project tool",critical:"Nessun modello di pianificazione"}[m4outcome]:{positive:"Envizi Scenario Modeler + Program Tracking + Planning Analytics",warning:"Project portfolio in spreadsheets and project tool",critical:"No planning model"}[m4outcome]):null;
    const decisionImg=m4outcome==="positive"?"./planning-envizi.png":m4outcome==="warning"?"./planning-intermediate.png":"./planning-asis.png";
    const decisionColor=m4outcome==="positive"?"#39efb4":m4outcome==="warning"?"#ffc07c":"#ff7777";
    const highReqs=PL_REQUIREMENTS.filter(r=>plRatings[r.id]==="high");
    const medReqs=PL_REQUIREMENTS.filter(r=>plRatings[r.id]==="medium");
    const lowReqs=PL_REQUIREMENTS.filter(r=>plRatings[r.id]==="low");
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"ROTTA VERSO NET ZERO":"NET ZERO PATHWAY"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfConclusionBody">
        <div className="dfcLeft">
          <p className="eyebrow">{isIt?"CONCLUSIONI · ROTTA VERSO NET ZERO":"CONCLUSIONS · NET ZERO PATHWAY"}</p>
          <h1 className="dfcTitle">{isIt?"La tua scelta per il piano di decarbonizzazione":"Your decarbonisation planning choice"}</h1>
          {decisionTaken&&<><img src={decisionImg} alt={decisionTaken} className="dfcDecisionImg"/><div className="dfcDecisionLabel"><small>{isIt?"DECISIONE ADOTTATA · MISSIONE 05":"DECISION ADOPTED · MISSION 05"}</small><strong style={{color:decisionColor}}>{decisionTaken}</strong></div></>}
          <div className="dfcScorePanelLeft">
            <p className="dfcSectionLabel">{isIt?"RILEVANZA IBM ENVIZI · PLANNING & SCENARIO MODELER":"IBM ENVIZI RELEVANCE · PLANNING & SCENARIO MODELER"}</p>
            <div className="dfScoreBox">
              <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
              <strong className={plHighlight?"dfScoreHigh":""}>{plScore}<em>/60</em></strong>
              <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${plPct}%`,background:plHighlight?"#39efb4":"#ffc07c"}}/></div>
            </div>
            <div className="dfScoreMsg" style={{margin:0,borderColor:plHighVery?"#39efb4":plHighMaybe?"#ffc07c":"#57606a"}}>
              <span className="dfScoreMsgIcon" style={{color:plHighVery?"#39efb4":plHighMaybe?"#ffc07c":"#57606a"}}>⬡</span>
              <p style={{color:plHighVery?"#39efb4":plHighMaybe?"#ffc07c":"#57606a"}}>{plHighVery?(isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua pianificazione della decarbonizzazione.":"IBM Envizi is very likely the right solution for your decarbonisation planning needs."):plHighMaybe?(isIt?"Probabilmente IBM Envizi è la soluzione per la tua pianificazione della decarbonizzazione.":"IBM Envizi is probably the right solution for your decarbonisation planning needs."):(isIt?"Alcuni requisiti sono prioritari: approfondisci con il tuo team IBM.":"Some requirements are a priority — explore further with your IBM team.")}</p>
            </div>
          </div>
          <div className="dfcActions">
            <button className="actionButton" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>setScreen("summary")}>{isIt?"Vai al riepilogo finale →":"Go to final summary →"}</button>
          </div>
        </div>
        <div className="dfcRight">
          {plHighlight&&<p className="dfcIntroTitle">{isIt?"Abbiamo recepito che per te la scelta Envizi può essere giustificata per:":"We've noted that for you the Envizi choice can be justified by:"}</p>}
          {highReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#39efb4"}}>{isIt?"MOLTO RILEVANTI":"HIGHLY RELEVANT"}</p><ul className="dfcFactorList">{highReqs.map(r=><li key={r.id} style={{fontSize:"clamp(24px,2.2vw,32px)",fontWeight:600,color:"#effbf6"}}><span className="dfcFactorDot" style={{background:"#39efb4",width:"10px",height:"10px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {medReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#ffc07c"}}>{isIt?"MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT"}</p><ul className="dfcFactorList">{medReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)",color:"#c8ddd6"}}><span className="dfcFactorDot" style={{background:"#ffc07c",width:"8px",height:"8px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {lowReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#5a7a70"}}>{isIt?"POCO RILEVANTI":"LOW RELEVANCE"}</p><ul className="dfcFactorList">{lowReqs.map(r=><li key={r.id} style={{fontSize:"clamp(16px,1.4vw,20px)",color:"#5a7a70"}}><span className="dfcFactorDot" style={{background:"#3d6052",width:"6px",height:"6px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
        </div>
      </div>
    </main>;
  }

  // ── FRAMEWORK ESG E DISCLOSURE — Foundation + Conclusion ───────────────────
  if(screen==="frameworkFoundation"&&profile){
    const isIt=language==="it";
    const allRated=FR_REQUIREMENTS.every(r=>frRatings[r.id]);
    const frScore=Object.values(frRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const frPct=Math.min(100,Math.round(frScore));
    const frHighlight=frScore>=35;
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"FRAMEWORK ESG E DISCLOSURE":"ESG FRAMEWORKS AND DISCLOSURE"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfStickyBar">
        <div className="dfStickyLeft">
          <p className="eyebrow">{isIt?"PERCHÉ SELEZIONARE IBM ENVIZI · SUSTAINABILITY REPORTING MANAGER":"WHY SELECT IBM ENVIZI · SUSTAINABILITY REPORTING MANAGER"}</p>
          <h1>{isIt?"Quanto contano per te questi requisiti di gestione framework e disclosure?":"How important are these framework management and disclosure requirements for you?"}</h1>
          <p className="dfSubtitle">{isIt?"Basso = non in esame · Medio = in esame per il prossimo passo · Alto = urgente":"Low = not under review · Medium = under review for next step · High = urgent"}</p>
          {frHighlight&&<div className="dfScoreMsg"><span className="dfScoreMsgIcon">⬡</span><p>{isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua gestione dei framework ESG.":"IBM Envizi is very likely the right solution for your ESG framework management needs."}</p></div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={frHighlight?"dfScoreHigh":""}>{frScore}<em>/60</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${frPct}%`,background:frHighlight?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("frameworkConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>
      <div className="dfColHeaders">
        <div className="dfColH dfColHReq">{isIt?"Requisito · Valutazione":"Requirement · Rating"}</div>
        <div className="dfColH dfColHCap">⬡ {isIt?"Capacità IBM Envizi":"IBM Envizi capability"}</div>
        <div className="dfColH dfColHBen">{isIt?"Beneficio ESG Manager":"ESG Manager benefit"}</div>
      </div>
      <div className="dfGrid">
        {FR_REQUIREMENTS.map((req,i)=>{
          const rating=frRatings[req.id];
          const isActive=rating==="medium"||rating==="high";
          const pts=rating==="high"?10:rating==="medium"?7.5:0;
          return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
            <div className="dfRowReq">
              <div className="dfRowReqTop"><span className="dfItemNum">{String(i+1).padStart(2,"0")}</span><p className="dfItemQ">{isIt?req.it:req.en}</p></div>
              <div className="dfRatingGroup">{(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setFrRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +7,5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +7.5":"High +10")}</button>)}</div>
              {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
            </div>
            <div className={`dfRowCap${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">⬡ IBM Envizi</span><p>{isIt?req.capIt:req.capEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
            <div className={`dfRowBen${isActive?"":" dfRowColDim"}`}>{isActive?<><span className="dfRowColLabel">{isIt?"Beneficio":"Benefit"}</span><p>{isIt?req.benIt:req.benEn}</p></>:<span className="dfRowColEmpty">—</span>}</div>
          </div>;
        })}
      </div>
      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/esg-reporting-frameworks" target="_blank" rel="noreferrer">ESG Reporting Frameworks ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/sustainability-reporting-manager" target="_blank" rel="noreferrer">Sustainability Reporting Manager ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="frameworkConclusion"&&profile){
    const isIt=language==="it";
    const frScore=Object.values(frRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const frPct=Math.min(100,Math.round(frScore));
    const frHighVery=frScore>=50;
    const frHighMaybe=frScore>=30;
    const frHighlight=frHighMaybe;
    const m5outcome=missionOutcomes[5];
    const decisionTaken=m5outcome?(isIt?{positive:"Envizi ESG Reporting Frameworks con gestione integrata dei requisiti",warning:"Tool documentale con template framework",critical:"File locali aggiornati manualmente"}[m5outcome]:{positive:"Envizi ESG Reporting Frameworks with integrated requirements management",warning:"Document management tool with framework templates",critical:"Manually updated local files"}[m5outcome]):null;
    const decisionImg=m5outcome==="positive"?"./framework-envizi.png":m5outcome==="warning"?"./framework-intermediate.png":"./framework-asis.png";
    const decisionColor=m5outcome==="positive"?"#39efb4":m5outcome==="warning"?"#ffc07c":"#ff7777";
    const highReqs=FR_REQUIREMENTS.filter(r=>frRatings[r.id]==="high");
    const medReqs=FR_REQUIREMENTS.filter(r=>frRatings[r.id]==="medium");
    const lowReqs=FR_REQUIREMENTS.filter(r=>frRatings[r.id]==="low");
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"FRAMEWORK ESG E DISCLOSURE":"ESG FRAMEWORKS AND DISCLOSURE"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfConclusionBody">
        <div className="dfcLeft">
          <p className="eyebrow">{isIt?"CONCLUSIONI · FRAMEWORK ESG E DISCLOSURE":"CONCLUSIONS · ESG FRAMEWORKS AND DISCLOSURE"}</p>
          <h1 className="dfcTitle">{isIt?"La tua scelta per la gestione dei framework ESG":"Your ESG framework management choice"}</h1>
          {decisionTaken&&<><img src={decisionImg} alt={decisionTaken} className="dfcDecisionImg"/><div className="dfcDecisionLabel"><small>{isIt?"DECISIONE ADOTTATA · MISSIONE 06":"DECISION ADOPTED · MISSION 06"}</small><strong style={{color:decisionColor}}>{decisionTaken}</strong></div></>}
          <div className="dfcScorePanelLeft">
            <p className="dfcSectionLabel">{isIt?"RILEVANZA IBM ENVIZI · SUSTAINABILITY REPORTING MANAGER":"IBM ENVIZI RELEVANCE · SUSTAINABILITY REPORTING MANAGER"}</p>
            <div className="dfScoreBox">
              <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
              <strong className={frHighlight?"dfScoreHigh":""}>{frScore}<em>/60</em></strong>
              <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${frPct}%`,background:frHighlight?"#39efb4":"#ffc07c"}}/></div>
            </div>
            <div className="dfScoreMsg" style={{margin:0,borderColor:frHighVery?"#39efb4":frHighMaybe?"#ffc07c":"#57606a"}}>
              <span className="dfScoreMsgIcon" style={{color:frHighVery?"#39efb4":frHighMaybe?"#ffc07c":"#57606a"}}>⬡</span>
              <p style={{color:frHighVery?"#39efb4":frHighMaybe?"#ffc07c":"#57606a"}}>{frHighVery?(isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua gestione dei framework ESG.":"IBM Envizi is very likely the right solution for your ESG framework management needs."):frHighMaybe?(isIt?"Probabilmente IBM Envizi è la soluzione per la tua gestione dei framework ESG.":"IBM Envizi is probably the right solution for your ESG framework management needs."):(isIt?"Alcuni requisiti sono prioritari: approfondisci con il tuo team IBM.":"Some requirements are a priority — explore further with your IBM team.")}</p>
            </div>
          </div>
          <div className="dfcActions">
            <button className="actionButton" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>{setSelectedMission(2);localStorage.setItem("envizi-quest-mission","3");setScreen("briefing");}}>{isIt?"Prossima sfida: Supply Chain →":"Next challenge: Supply Chain →"}</button>
          </div>
        </div>
        <div className="dfcRight">
          {frHighlight&&<p className="dfcIntroTitle">{isIt?"Abbiamo recepito che per te la scelta Envizi può essere giustificata per:":"We've noted that for you the Envizi choice can be justified by:"}</p>}
          {highReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#39efb4"}}>{isIt?"MOLTO RILEVANTI":"HIGHLY RELEVANT"}</p><ul className="dfcFactorList">{highReqs.map(r=><li key={r.id} style={{fontSize:"clamp(24px,2.2vw,32px)",fontWeight:600,color:"#effbf6"}}><span className="dfcFactorDot" style={{background:"#39efb4",width:"10px",height:"10px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {medReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#ffc07c"}}>{isIt?"MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT"}</p><ul className="dfcFactorList">{medReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)",color:"#c8ddd6"}}><span className="dfcFactorDot" style={{background:"#ffc07c",width:"8px",height:"8px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
          {lowReqs.length>0&&<section className="dfcSection"><p className="dfcSectionLabel" style={{color:"#5a7a70"}}>{isIt?"POCO RILEVANTI":"LOW RELEVANCE"}</p><ul className="dfcFactorList">{lowReqs.map(r=><li key={r.id} style={{fontSize:"clamp(16px,1.4vw,20px)",color:"#5a7a70"}}><span className="dfcFactorDot" style={{background:"#3d6052",width:"6px",height:"6px"}}/>{isIt?r.it:r.en}</li>)}</ul></section>}
        </div>
      </div>
    </main>;
  }


  if(screen==="reportingFoundation"&&profile){
    const isIt=language==="it";
    const allRated=RF_REQUIREMENTS.every(r=>rfRatings[r.id]);
    const rfScore=Object.values(rfRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const rfPct=Math.min(100,Math.round(rfScore));
    const rfHighlight=rfScore>=35;
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"REPORTING E PERFORMANCE":"REPORTING AND PERFORMANCE"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfStickyBar">
        <div className="dfStickyLeft">
          <p className="eyebrow">{isIt?"PERCHÉ SELEZIONARE IBM ENVIZI · GHG & REPORTING":"WHY SELECT IBM ENVIZI · GHG & REPORTING"}</p>
          <h1>{isIt?"Quanto contano per te questi requisiti di reporting?":"How important are these reporting requirements for you?"}</h1>
          <p className="dfSubtitle">{isIt?"Basso = non in esame · Medio = in esame per il prossimo passo · Alto = urgente":"Low = not under review · Medium = under review for next step · High = urgent"}</p>
          {rfHighlight&&<div className="dfScoreMsg">
            <span className="dfScoreMsgIcon">⬡</span>
            <p>{isIt?"Molto probabilmente IBM Envizi è la soluzione per le tue esigenze di reporting.":"IBM Envizi is very likely the right solution for your reporting needs."}</p>
          </div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={rfHighlight?"dfScoreHigh":""}>{rfScore}<em>/80</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${rfPct}%`,background:rfHighlight?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("reportingConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>
      <div className="dfColHeaders">
        <div className="dfColH dfColHReq">{isIt?"Requisito · Valutazione":"Requirement · Rating"}</div>
        <div className="dfColH dfColHCap">⬡ {isIt?"Capacità IBM Envizi":"IBM Envizi capability"}</div>
        <div className="dfColH dfColHBen">{isIt?"Beneficio ESG Manager":"ESG Manager benefit"}</div>
      </div>
      <div className="dfGrid">
        {RF_REQUIREMENTS.map((req,i)=>{
          const rating=rfRatings[req.id];
          const isActive=rating==="medium"||rating==="high";
          const pts=rating==="high"?10:rating==="medium"?7.5:0;
          return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
            <div className="dfRowReq">
              <div className="dfRowReqTop">
                <span className="dfItemNum">{String(i+1).padStart(2,"0")}</span>
                <p className="dfItemQ">{isIt?req.it:req.en}</p>
              </div>
              <div className="dfRatingGroup">
                {(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setRfRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +7,5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +7.5":"High +10")}</button>)}
              </div>
              {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
            </div>
            <div className={`dfRowCap${isActive?"":" dfRowColDim"}`}>
              {isActive?<><span className="dfRowColLabel">⬡ IBM Envizi</span><p>{isIt?req.capIt:req.capEn}</p></>:<span className="dfRowColEmpty">—</span>}
            </div>
            <div className={`dfRowBen${isActive?"":" dfRowColDim"}`}>
              {isActive?<><span className="dfRowColLabel">{isIt?"Beneficio":"Benefit"}</span><p>{isIt?req.benIt:req.benEn}</p></>:<span className="dfRowColEmpty">—</span>}
            </div>
          </div>;
        })}
      </div>
      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/scope-1-2-ghg-accounting-reporting" target="_blank" rel="noreferrer">Scope 1–2 GHG Accounting &amp; Reporting ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/scope-3-ghg-accounting-reporting" target="_blank" rel="noreferrer">Scope 3 GHG ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/esg-reporting-frameworks" target="_blank" rel="noreferrer">ESG Reporting Frameworks ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="reportingConclusion"&&profile){
    const isIt=language==="it";
    const rfScore=Object.values(rfRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const rfPct=Math.min(100,Math.round(rfScore));
    const rfHighVery=rfScore>=50;
    const rfHighMaybe=rfScore>=30;
    const rfHighlight=rfHighMaybe;
    const m3outcome=missionOutcomes[3];
    const decisionTaken=m3outcome?(isIt?{positive:"Envizi ESG Reporting Frameworks + GHG Reporting",warning:"Workflow documentale con template",critical:"E-mail, Word e fogli"}[m3outcome]:{positive:"Envizi ESG Reporting Frameworks + GHG Reporting",warning:"Document workflow with templates",critical:"Email, Word and spreadsheets"}[m3outcome]):null;
    const decisionImg=m3outcome==="positive"?"./reporting-envizi.png":m3outcome==="warning"?"./reporting-intermediate.png":"./reporting-asis.png";
    const decisionColor=m3outcome==="positive"?"#39efb4":m3outcome==="warning"?"#ffc07c":"#ff7777";
    const highReqs=RF_REQUIREMENTS.filter(r=>rfRatings[r.id]==="high");
    const medReqs=RF_REQUIREMENTS.filter(r=>rfRatings[r.id]==="medium");
    const lowReqs=RF_REQUIREMENTS.filter(r=>rfRatings[r.id]==="low");
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> {isIt?"REPORTING E PERFORMANCE":"REPORTING AND PERFORMANCE"}</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="dfConclusionBody">
        <div className="dfcLeft">
          <p className="eyebrow">{isIt?"CONCLUSIONI · REPORTING E PERFORMANCE":"CONCLUSIONS · REPORTING AND PERFORMANCE"}</p>
          <h1 className="dfcTitle">{isIt?"La tua scelta per il reporting delle performance ESG":"Your ESG performance reporting choice"}</h1>
          {decisionTaken&&<>
            <img src={decisionImg} alt={decisionTaken} className="dfcDecisionImg"/>
            <div className="dfcDecisionLabel">
              <small>{isIt?"DECISIONE ADOTTATA · MISSIONE 04":"DECISION ADOPTED · MISSION 04"}</small>
              <strong style={{color:decisionColor}}>{decisionTaken}</strong>
            </div>
          </>}
          <div className="dfcScorePanelLeft">
            <p className="dfcSectionLabel">{isIt?"RILEVANZA IBM ENVIZI · GHG & REPORTING":"IBM ENVIZI RELEVANCE · GHG & REPORTING"}</p>
            <div className="dfScoreBox">
              <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
              <strong className={rfHighlight?"dfScoreHigh":""}>{rfScore}<em>/80</em></strong>
              <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${rfPct}%`,background:rfHighlight?"#39efb4":"#ffc07c"}}/></div>
            </div>
            <div className="dfScoreMsg" style={{margin:0,borderColor:rfHighVery?"#39efb4":rfHighMaybe?"#ffc07c":"#57606a"}}>
              <span className="dfScoreMsgIcon" style={{color:rfHighVery?"#39efb4":rfHighMaybe?"#ffc07c":"#57606a"}}>⬡</span>
              <p style={{color:rfHighVery?"#39efb4":rfHighMaybe?"#ffc07c":"#57606a"}}>{rfHighVery
                ?(isIt?"Molto probabilmente IBM Envizi è la soluzione per le tue esigenze di reporting.":"IBM Envizi is very likely the right solution for your reporting needs.")
                :rfHighMaybe?(isIt?"Probabilmente IBM Envizi è la soluzione per le tue esigenze di reporting.":"IBM Envizi is probably the right solution for your reporting needs.")
                :(isIt?"Alcuni requisiti sono prioritari: approfondisci con il tuo team IBM.":"Some requirements are a priority — explore further with your IBM team.")
              }</p>
            </div>
          </div>
          <div className="dfcActions">
            <button className="actionButton" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>{setSelectedMission(5);localStorage.setItem("envizi-quest-mission","6");setScreen("briefing");}}>{isIt?"Prossima sfida: Framework ESG →":"Next challenge: ESG Frameworks →"}</button>
          </div>
        </div>
        <div className="dfcRight">
          {rfHighlight&&<p className="dfcIntroTitle">{isIt?"Abbiamo recepito che per te la scelta Envizi può essere giustificata per:":"We've noted that for you the Envizi choice can be justified by:"}</p>}
          {highReqs.length>0&&<section className="dfcSection">
            <p className="dfcSectionLabel" style={{color:"#39efb4"}}>{isIt?"MOLTO RILEVANTI":"HIGHLY RELEVANT"}</p>
            <ul className="dfcFactorList">
              {highReqs.map(r=><li key={r.id} style={{fontSize:"clamp(24px,2.2vw,32px)",fontWeight:600,color:"#effbf6"}}><span className="dfcFactorDot" style={{background:"#39efb4",width:"10px",height:"10px"}}/>{isIt?r.it:r.en}</li>)}
            </ul>
          </section>}
          {medReqs.length>0&&<section className="dfcSection">
            <p className="dfcSectionLabel" style={{color:"#ffc07c"}}>{isIt?"MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT"}</p>
            <ul className="dfcFactorList">
              {medReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)",color:"#c8ddd6"}}><span className="dfcFactorDot" style={{background:"#ffc07c",width:"8px",height:"8px"}}/>{isIt?r.it:r.en}</li>)}
            </ul>
          </section>}
          {lowReqs.length>0&&<section className="dfcSection">
            <p className="dfcSectionLabel" style={{color:"#5a7a70"}}>{isIt?"POCO RILEVANTI":"LOW RELEVANCE"}</p>
            <ul className="dfcFactorList">
              {lowReqs.map(r=><li key={r.id} style={{fontSize:"clamp(16px,1.4vw,20px)",color:"#5a7a70"}}><span className="dfcFactorDot" style={{background:"#3d6052",width:"6px",height:"6px"}}/>{isIt?r.it:r.en}</li>)}
            </ul>
          </section>}
        </div>
      </div>
    </main>;
  }


  if(screen==="dataFoundation"&&profile){
    const isIt=language==="it";
    const allRated=DF_REQUIREMENTS.every(r=>dfRatings[r.id]);
    const dfScore=Object.values(dfRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const dfPct=Math.min(100,Math.round(dfScore));
    const dfHighVery=dfScore>=50;
    const dfHighMaybe=dfScore>=30;
    const dfHighlight=dfHighMaybe;
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> DATA FOUNDATION</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>

      {/* Sticky bar: titolo + score + messaggio + CTA — sempre visibile */}
      <div className="dfStickyBar">
        <div className="dfStickyLeft">
          <p className="eyebrow">{isIt?"PERCHÉ SELEZIONARE IBM ENVIZI":"WHY SELECT IBM ENVIZI"}</p>
          <h1>{isIt?"Quanto contano per te questi requisiti?":"How important are these requirements for you?"}</h1>
          <p className="dfSubtitle">{isIt?"Basso = non in esame · Medio = in esame per il prossimo passo · Alto = urgente":"Low = not under review · Medium = under review for next step · High = urgent"}</p>
          {dfHighlight&&<div className="dfScoreMsg" style={{borderColor:dfHighVery?"#39efb4":"#ffc07c",background:dfHighVery?"rgba(57,239,180,.07)":"rgba(255,192,124,.07)"}}>
            <span className="dfScoreMsgIcon" style={{color:dfHighVery?"#39efb4":"#ffc07c"}}>⬡</span>
            <p style={{color:dfHighVery?"#39efb4":"#ffc07c"}}>{dfHighVery
              ?(isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua azienda.":"IBM Envizi is very likely the right solution for your organisation.")
              :(isIt?"Probabilmente IBM Envizi è la soluzione per la tua azienda.":"IBM Envizi is probably the right solution for your organisation.")
            }</p>
          </div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={dfHighlight?"dfScoreHigh":""}>{dfScore}<em>/100</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${dfPct}%`,background:dfHighVery?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("dfConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>

      {/* Righe — 2 colonne: 1-5 a sx, 6-10 a dx */}
      <div className="dfGrid dfGridTwo">
        {([DF_REQUIREMENTS.slice(0,5), DF_REQUIREMENTS.slice(5,10)] as typeof DF_REQUIREMENTS[]).map((col,ci)=>(
          <div key={ci} className="dfGridCol">
            {col.map((req,li)=>{
              const i=ci*5+li;
              const rating=dfRatings[req.id];
              const isActive=rating==="medium"||rating==="high";
              const pts=rating==="high"?10:rating==="medium"?7.5:0;
              return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
                <div className="dfRowReq">
                  <div className="dfRowReqTop">
                    <span className="dfItemNum">{String(i+1).padStart(2,"0")}</span>
                    <p className="dfItemQ">{isIt?req.it:req.en}</p>
                  </div>
                  <div className="dfRatingGroup">
                    {(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setDfRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +7,5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +7.5":"High +10")}</button>)}
                  </div>
                  {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
                </div>
              </div>;
            })}
          </div>
        ))}
      </div>

      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/esg-data-management" target="_blank" rel="noreferrer">ESG Data Management ↗</a>{" · "}<a href="https://www.ibm.com/docs/en/envizi-esg-suite?topic=managing-normalizing-data" target="_blank" rel="noreferrer">{isIt?"Normalizzazione dati":"Data normalisation"} ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/scope-1-2-ghg-accounting-reporting" target="_blank" rel="noreferrer">Scope 1–2 GHG ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="dfConclusion"&&profile){
    const isIt=language==="it";
    const dfScore=Object.values(dfRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const dfPct=Math.min(100,Math.round(dfScore));
    const dfHighVery=dfScore>=50;
    const dfHighMaybe=dfScore>=30;
    const dfHighlight=dfHighMaybe;
    // decisione M0 presa
    const m0outcome=missionOutcomes[0];
    const decisionTaken=m0outcome?t.decisionLabels[m0outcome]:null;
    const decisionImg=m0outcome==="positive"?"./envizi-data-automation.png":m0outcome==="warning"?"./envizi-manual-forms.png":"./envizi-spreadsheets-email.png";
    const decisionColor=m0outcome==="positive"?"#39efb4":m0outcome==="warning"?"#ffc07c":"#ff7777";
    // gruppi fattori
    const highReqs=DF_REQUIREMENTS.filter(r=>dfRatings[r.id]==="high");
    const medReqs=DF_REQUIREMENTS.filter(r=>dfRatings[r.id]==="medium");
    const lowReqs=DF_REQUIREMENTS.filter(r=>dfRatings[r.id]==="low");
    return <main className="dfScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> DATA FOUNDATION</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>

      <div className="dfConclusionBody">

        {/* COLONNA SX */}
        <div className="dfcLeft">
          <p className="eyebrow" style={{letterSpacing:".18em",fontSize:"11px"}}>{isIt?"CONCLUSIONI · DATA FOUNDATION":"CONCLUSIONS · DATA FOUNDATION"}</p>
          <h1 className="dfcTitle" style={{fontSize:"clamp(22px,2.2vw,32px)",fontWeight:800,lineHeight:1.1,marginBottom:4}}>{isIt?"La tua scelta per la gestione dei dati ESG":"Your ESG data management choice"}</h1>

          {/* — score gauge — */}
          <div className="dfcGaugeWrap">
            {(()=>{
              const R=52, cx=64, cy=64;
              const circ=2*Math.PI*R;
              const arcLen=circ*0.75;
              const fillLen=arcLen*(dfPct/100);
              const accentColor=dfHighVery?"#39efb4":dfHighMaybe?"#ffc07c":"#57606a";
              return <svg viewBox="0 0 128 128" className="dfcGaugeSvg">
                <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(57,239,180,.08)" strokeWidth="10"
                  strokeDasharray={`${arcLen} ${circ}`} strokeDashoffset={circ*0.125} strokeLinecap="round"/>
                <circle cx={cx} cy={cy} r={R} fill="none" stroke={accentColor} strokeWidth="10"
                  strokeDasharray={`${fillLen} ${circ}`} strokeDashoffset={circ*0.125} strokeLinecap="round"
                  style={{filter:`drop-shadow(0 0 8px ${accentColor}88)`,transition:"stroke-dasharray .5s"}}/>
                <text x={cx} y={cy-6} textAnchor="middle" fontSize="28" fontWeight="800" fill={accentColor} fontFamily="inherit">{dfScore}</text>
                <text x={cx} y={cy+14} textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(200,221,214,.5)" fontFamily="inherit">/100</text>
                <text x={cx} y={cy+30} textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(200,221,214,.35)" letterSpacing="1" fontFamily="inherit">{isIt?"RILEVANZA":"RELEVANCE"}</text>
              </svg>;
            })()}
            <p className="dfcGaugeVerdict" style={{color:dfHighVery?"#39efb4":dfHighMaybe?"#ffc07c":"#7a9a90"}}>
              {dfHighVery?(isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua azienda.":"IBM Envizi is very likely the right solution for your organisation.")
                :dfHighMaybe?(isIt?"Probabilmente IBM Envizi è la soluzione per la tua azienda.":"IBM Envizi is probably the right solution for your organisation.")
                :(isIt?"Approfondisci con il tuo team IBM.":"Explore further with your IBM team.")}
            </p>
          </div>

          {/* — decisione adottata — */}
          {decisionTaken&&<div className="dfcDecisionCard" style={{borderColor:decisionColor+"55"}}>
            <img src={decisionImg} alt={decisionTaken} className="dfcDecisionCardImg"/>
            <div className="dfcDecisionCardBody">
              <small className="dfcDecisionCardLabel">{isIt?"DECISIONE ADOTTATA · MISSIONE 01":"DECISION ADOPTED · MISSION 01"}</small>
              <strong className="dfcDecisionCardValue" style={{color:decisionColor}}>{decisionTaken}</strong>
            </div>
          </div>}

          <div className="dfcActions">
            <button className="actionButton dfcActionSecondary" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>setScreen("dfSummary")}>{isIt?"Leggi la sintesi →":"Read the summary →"}</button>
          </div>
        </div>

        {/* COLONNA DX — card orizzontali con 4 chip per ogni fattore */}
        <div className="dfcRight">
          {dfHighlight&&<p className="dfcIntroTitle">{isIt?"Perché Envizi risponde alle tue priorità:":"Why Envizi addresses your priorities:"}</p>}

          {([
            {reqs:highReqs,accent:"#39efb4",label:isIt?"FATTORI MOLTO RILEVANTI":"HIGHLY RELEVANT FACTORS"},
            {reqs:medReqs, accent:"#ffc07c",label:isIt?"FATTORI MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT FACTORS"},
          ] as {reqs:typeof highReqs,accent:string,label:string}[]).map(({reqs,accent,label})=>
            reqs.length>0&&<section key={label} className="dfcSection">
              <p className="dfcSectionLabel" style={{color:accent}}>{label}</p>
              {reqs.map(r=><div key={r.id} className="dfcHRow" style={{"--dfcAccent":accent} as React.CSSProperties}>
                <p className="dfcHRowTitle">{isIt?r.it:r.en}</p>
                <div className="dfcHChips">
                  <div className="dfcHChip dfcHChipCrit">
                    <span className="dfcHChipLabel">{isIt?"Criticità tipica":"Typical issue"}</span>
                    <p className="dfcHChipText">{isIt?r.critIt:r.critEn}</p>
                  </div>
                  <div className="dfcHChip dfcHChipCap">
                    <span className="dfcHChipLabel">{isIt?"Capacità Envizi":"Envizi capability"}</span>
                    <p className="dfcHChipText">{isIt?r.capIt:r.capEn}</p>
                  </div>
                  <div className="dfcHChip dfcHChipToBe">
                    <span className="dfcHChipLabel">{isIt?"To-be con Envizi":"To-be with Envizi"}</span>
                    <p className="dfcHChipText">{isIt?r.toBeIt:r.toBeEn}</p>
                  </div>
                  <div className="dfcHChip dfcHChipBen">
                    <span className="dfcHChipLabel">{isIt?"Beneficio":"Benefit"}</span>
                    <p className="dfcHChipText">{isIt?r.benIt:r.benEn}</p>
                  </div>
                </div>
              </div>)}
            </section>
          )}
        </div>

      </div>
    </main>;
  }


  if(screen==="dfSummary"&&profile){
    const isIt=language==="it";
    const dfScore=Object.values(dfRatings).reduce((s,v)=>s+(v==="medium"?7.5:v==="high"?10:0),0);
    const dfHighVery=dfScore>=50;
    const dfHighMaybe=dfScore>=30;
    const highReqs=DF_REQUIREMENTS.filter(r=>dfRatings[r.id]==="high");
    const medReqs=DF_REQUIREMENTS.filter(r=>dfRatings[r.id]==="medium");
    const lowReqs=DF_REQUIREMENTS.filter(r=>dfRatings[r.id]==="low");
    const m0outcome=missionOutcomes[0];
    const decisionLabel=m0outcome?t.decisionLabels[m0outcome]:null;
    const accentColor=dfHighVery?"#39efb4":dfHighMaybe?"#ffc07c":"#7a9a90";

    // — testo di sintesi generato dai dati —
    const verdictIt=dfHighVery?"IBM Envizi si posiziona come soluzione molto probabilmente adatta alle esigenze di"
      :dfHighMaybe?"IBM Envizi si posiziona come soluzione probabilmente adatta alle esigenze di"
      :"L'analisi evidenzia requisiti da approfondire prima di valutare IBM Envizi per";
    const verdictEn=dfHighVery?"IBM Envizi is very likely the right solution for"
      :dfHighMaybe?"IBM Envizi is probably the right solution for"
      :"The analysis highlights requirements to explore further before evaluating IBM Envizi for";

    const highSummaryIt=highReqs.length>0
      ?`Le aree considerate urgenti (${highReqs.map(r=>r.it).join(", ")}) rappresentano le priorità principali su cui Envizi può intervenire immediatamente.`
      :"Non sono stati identificati requisiti urgenti in questa analisi.";
    const highSummaryEn=highReqs.length>0
      ?`The areas rated urgent (${highReqs.map(r=>r.en).join(", ")}) represent the primary priorities where Envizi can act immediately.`
      :"No urgent requirements were identified in this analysis.";

    const medSummaryIt=medReqs.length>0
      ?`Ulteriori ${medReqs.length} requisit${medReqs.length===1?"o":"i"} (${medReqs.map(r=>r.it).join(", ")}) sono in esame per i prossimi passi e potranno essere affrontati in una fase successiva di adozione.`
      :"Non sono stati identificati requisiti da approfondire nel prossimo passo.";
    const medSummaryEn=medReqs.length>0
      ?`A further ${medReqs.length} requirement${medReqs.length===1?"":"s"} (${medReqs.map(r=>r.en).join(", ")}) ${medReqs.length===1?"is":"are"} under review for next steps and can be addressed in a subsequent adoption phase.`
      :"No requirements under review for next steps were identified.";

    const lowSummaryIt=lowReqs.length>0
      ?`${lowReqs.length} requisit${lowReqs.length===1?"o":"i"} non sono attualmente in esame per ${displayCompanyName} e non influenzano la valutazione attuale.`
      :"Tutti i requisiti analizzati sono risultati rilevanti.";
    const lowSummaryEn=lowReqs.length>0
      ?`${lowReqs.length} requirement${lowReqs.length===1?"":"s"} ${lowReqs.length===1?"is":"are"} not currently under review for ${displayCompanyName} and do not affect the current evaluation.`
      :"All analysed requirements were found to be relevant.";

    const decisionSummaryIt=decisionLabel
      ?`In relazione alla decisione adottata nella Missione 01 ("${decisionLabel}"), il percorso di adozione di Envizi può essere calibrato sulla maturità attuale dei dati ESG di ${displayCompanyName}.`
      :"";
    const decisionSummaryEn=decisionLabel
      ?`In relation to the decision adopted in Mission 01 ("${decisionLabel}"), the Envizi adoption path can be calibrated to the current ESG data maturity of ${displayCompanyName}.`
      :"";

    const closingIt=dfHighVery||dfHighMaybe
      ?`Si raccomanda di procedere con un approfondimento tecnico con il team IBM per definire perimetro, architettura e piano di adozione.`
      :`Si raccomanda un workshop di qualificazione con il team IBM per valutare se e come IBM Envizi può rispondere ai requisiti identificati.`;
    const closingEn=dfHighVery||dfHighMaybe
      ?`It is recommended to proceed with a technical deep-dive with the IBM team to define scope, architecture and adoption plan.`
      :`A qualification workshop with the IBM team is recommended to assess whether and how IBM Envizi can address the identified requirements.`;

    return <main className="dfSummaryScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> DATA FOUNDATION · SINTESI</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>

      <div className="dfSummaryBody">

        {/* COLONNA SX — intestazione + scorecard */}
        <div className="dfSummaryLeft">
          <p className="eyebrow" style={{letterSpacing:".18em",fontSize:"11px"}}>{isIt?"SINTESI ANALISI · DATA FOUNDATION":"ANALYSIS SUMMARY · DATA FOUNDATION"}</p>
          <h1 className="dfSummaryTitle">{isIt?"La tua valutazione in sintesi":"Your assessment at a glance"}</h1>

          {/* score ring */}
          <div className="dfSummaryScoreWrap">
            {(()=>{
              const R=52,cx=64,cy=64,circ=2*Math.PI*R,arcLen=circ*0.75,fillLen=arcLen*(Math.min(100,dfScore)/100);
              return <svg viewBox="0 0 128 128" className="dfSummaryGaugeSvg">
                <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(57,239,180,.08)" strokeWidth="10" strokeDasharray={`${arcLen} ${circ}`} strokeDashoffset={circ*0.125} strokeLinecap="round"/>
                <circle cx={cx} cy={cy} r={R} fill="none" stroke={accentColor} strokeWidth="10" strokeDasharray={`${fillLen} ${circ}`} strokeDashoffset={circ*0.125} strokeLinecap="round" style={{filter:`drop-shadow(0 0 8px ${accentColor}88)`}}/>
                <text x={cx} y={cy-6} textAnchor="middle" fontSize="28" fontWeight="800" fill={accentColor} fontFamily="inherit">{dfScore}</text>
                <text x={cx} y={cy+14} textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(200,221,214,.5)" fontFamily="inherit">/100</text>
              </svg>;
            })()}
            <div className="dfSummaryScoreInfo">
              <p className="dfSummaryVerdict" style={{color:accentColor}}>
                {dfHighVery?(isIt?"Molto probabilmente adatto":"Very likely a fit"):dfHighMaybe?(isIt?"Probabilmente adatto":"Probably a fit"):(isIt?"Da approfondire":"To explore further")}
              </p>
              <div className="dfSummaryPills">
                <span className="dfSummaryPill" style={{background:"rgba(57,239,180,.12)",color:"#39efb4"}}>{highReqs.length} {isIt?"urgenti":"urgent"}</span>
                <span className="dfSummaryPill" style={{background:"rgba(255,192,124,.12)",color:"#ffc07c"}}>{medReqs.length} {isIt?"in esame":"in review"}</span>
                <span className="dfSummaryPill" style={{background:"rgba(90,122,112,.12)",color:"#7a9a90"}}>{lowReqs.length} {isIt?"non in esame":"not in scope"}</span>
              </div>
            </div>
          </div>

          {decisionLabel&&<div className="dfSummaryDecision">
            <small>{isIt?"DECISIONE ADOTTATA · MISSIONE 01":"DECISION ADOPTED · MISSION 01"}</small>
            <strong style={{color:m0outcome==="positive"?"#39efb4":m0outcome==="warning"?"#ffc07c":"#ff7777"}}>{decisionLabel}</strong>
          </div>}

          <div className="dfSummaryActions">
            <button className="actionButton dfcActionSecondary" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" style={{whiteSpace:"nowrap"}} onClick={()=>{setSelectedMission(missionOrder[1]);localStorage.setItem("envizi-quest-mission",String(missionOrder[1]+1));setScreen("briefing");}}>{isIt?"Prossima sfida →":"Next challenge →"}</button>
          </div>
        </div>

        {/* COLONNA DX — testo narrativo */}
        <div className="dfSummaryRight">
          <p className="dfSummaryEyebrow">{isIt?"VALUTAZIONE IBM ENVIZI PER":"IBM ENVIZI ASSESSMENT FOR"} <strong>{displayCompanyName.toUpperCase()}</strong></p>

          <p className="dfSummaryLead">
            {isIt?verdictIt:verdictEn} <strong>{displayCompanyName}</strong>.
          </p>

          <div className="dfSummaryBlock dfSummaryBlockHigh">
            <span className="dfSummaryBlockTag" style={{color:"#39efb4"}}>{isIt?"REQUISITI URGENTI":"URGENT REQUIREMENTS"}</span>
            <p>{isIt?highSummaryIt:highSummaryEn}</p>
          </div>

          <div className="dfSummaryBlock dfSummaryBlockMed">
            <span className="dfSummaryBlockTag" style={{color:"#ffc07c"}}>{isIt?"REQUISITI IN ESAME":"REQUIREMENTS UNDER REVIEW"}</span>
            <p>{isIt?medSummaryIt:medSummaryEn}</p>
          </div>

          <div className="dfSummaryBlock dfSummaryBlockLow">
            <span className="dfSummaryBlockTag" style={{color:"#7a9a90"}}>{isIt?"REQUISITI NON IN ESAME":"REQUIREMENTS NOT IN SCOPE"}</span>
            <p>{isIt?lowSummaryIt:lowSummaryEn}</p>
          </div>

          {decisionLabel&&<div className="dfSummaryBlock dfSummaryBlockDecision">
            <span className="dfSummaryBlockTag" style={{color:"#7dd3fc"}}>{isIt?"CONTESTO DECISIONALE":"DECISION CONTEXT"}</span>
            <p>{isIt?decisionSummaryIt:decisionSummaryEn}</p>
          </div>}

          <div className="dfSummaryBlock dfSummaryBlockClosing">
            <span className="dfSummaryBlockTag" style={{color:accentColor}}>{isIt?"RACCOMANDAZIONE":"RECOMMENDATION"}</span>
            <p className="dfSummaryClosing">{isIt?closingIt:closingEn}</p>
          </div>
        </div>

      </div>
    </main>;
  }




  if(screen==="companySetup"&&profile){
    const isIt=language==="it";
    const sec=SECTORS[companySector];
    const readinessList=isIt?ESG_READINESS_IT:ESG_READINESS_EN;
    const activeReadiness=readinessList.find(r=>r.key===esgReadiness)!;
    const geoKeys=["italia","europa","asia","nordamerica","sudamerica","africa","australia"];
    const geoLabels:Record<string,{it:string,en:string}>={italia:{it:"Italia",en:"Italy"},europa:{it:"Europa",en:"Europe"},asia:{it:"Asia",en:"Asia"},nordamerica:{it:"Nord America",en:"N. America"},sudamerica:{it:"Sud America",en:"S. America"},africa:{it:"Africa",en:"Africa"},australia:{it:"Australia",en:"Australia"}};
    const dimLabelsFull:[{it:string,en:string},{it:string,en:string},{it:string,en:string},{it:string,en:string},{it:string,en:string}]=[sec.dimUnit,sec.opsUnit,{it:"sedi uffici",en:"Office locations"},{it:"data center",en:"Data centres"},{it:"dipendenti",en:"Employees"}];
    const handleSectorChange=(sk:SectorKey)=>{setCompanySector(sk);setCompanyDims([...SECTORS[sk].defaults] as [number,number,number,number,number]);};
    const nonItalyKeys=(companyMarket==="mondo"?geoKeys:["europa"]).filter(k=>k!=="italia");
    const otherSum=nonItalyKeys.reduce((s,k)=>s+(geoDistrib[k]??0),0);
    const italyVal=100-otherSum;
    const geoError=(companyMarket==="europa"||companyMarket==="mondo")&&italyVal<0;
    const handleGeoChange=(key:string,val:number)=>{
      if(key==="italia")return;
      const v=isNaN(val)?0:Math.max(0,val);
      setGeoDistrib(prev=>{const next={...prev,[key]:v};const sum=nonItalyKeys.reduce((s,k)=>s+(k===key?v:(next[k]??0)),0);next.italia=100-sum;return next;});
    };
    return <main className="csScreen">
      <header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {isIt?"LA TUA AZIENDA":"YOUR COMPANY"}</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header>
      <div className="csBody">
        <div className="csLeft"><img className="csProfileImg" src={`./characters/${profile}-neutral.png`} alt={name}/><div className="csProfileTag"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></div>
        <div className="csRight">
          <p className="eyebrow">{isIt?"RACCONTACI LA TUA AZIENDA":"TELL US ABOUT YOUR COMPANY"}</p>
          <h1 className="csTitle">{isIt?"La tua azienda":"Your company"}</h1>
          <div className="csFormTwoCol">
            <div className="csFormLeft">
              <div className="csField csFieldName"><label>{isIt?"Nome Azienda":"Company Name"}<span className="csNameHint">{isIt?"· inserisci il nome della tua azienda":"· enter your company name"}</span></label><input className="csInput csInputName" placeholder={isIt?"Es. Acme S.p.A.":"E.g. Acme Ltd"} value={companyName} onChange={e=>setCompanyName(e.target.value)}/></div>
              <div className="csTwoCol">
                <div className="csField"><label>{isIt?"Presenza mercati":"Market presence"}</label>
                  <select className="csSelect" value={companyMarket} onChange={e=>setCompanyMarket(e.target.value as Market)}>
                    <option value="italia">{isIt?"Solo Italia":"Italy only"}</option>
                    <option value="europa">{isIt?"Europa":"Europe"}</option>
                    <option value="mondo">{isIt?"Mondo":"Global"}</option>
                  </select>
                </div>
                <div className="csField"><label>{isIt?"Settore":"Sector"}</label>
                  <select className="csSelect" value={companySector} onChange={e=>handleSectorChange(e.target.value as SectorKey)}>
                    {SECTOR_KEYS.map(sk=><option key={sk} value={sk}>{isIt?SECTORS[sk].label.it:SECTORS[sk].label.en}</option>)}
                  </select>
                </div>
              </div>
              <div className="csField"><label>{isIt?"Dimensioni organizzazione":"Organisation size"}</label>
                <div className="csDimsGrid">
                  {companyDims.map((v,i)=><div key={i} className="csDimRow"><input className="csDimInput" type="number" min={0} value={v} onChange={e=>updateCompanyDim(i,parseFloat(e.target.value))}/><span className="csDimUnit">{isIt?dimLabelsFull[i].it:dimLabelsFull[i].en}</span></div>)}
                </div>
              </div>
              {(companyMarket==="europa"||companyMarket==="mondo")&&<div className="csField"><label>{isIt?"Distribuzione sedi (%, totale 100)":"Location distribution (%, total 100)"}</label>
                <div className="csGeoGrid">
                  <div className={`csGeoRow${geoError?" csGeoRowError":" csGeoRowItalia"}`}><span>{isIt?"Italia":"Italy"}</span><input className="csDimInput csGeoItalyInput" type="number" readOnly value={italyVal} title={isIt?"Calcolato automaticamente: 100% meno la somma delle altre regioni":"Calculated automatically: 100% minus the sum of other regions"}/><span>%</span><span className="csGeoItalyHint">{isIt?"← calcolato":"← auto"}</span></div>
                  {nonItalyKeys.map(k=><div key={k} className="csGeoRow"><span>{isIt?geoLabels[k].it:geoLabels[k].en}</span><input className="csDimInput" type="number" min={0} value={geoDistrib[k]??0} onChange={e=>handleGeoChange(k,parseInt(e.target.value))}/><span>%</span></div>)}
                </div>
                {geoError&&<p className="csGeoErrorMsg">{isIt?"⚠ La somma delle altre regioni supera 100%. Riduci i valori.":"⚠ The sum of other regions exceeds 100%. Please reduce the values."}</p>}
              </div>}
            </div>
            <div className="csFormRight">
              <div className="csField"><label>{isIt?"Seleziona il tuo stato attuale dati ESG":"Select your current ESG data status"}</label>
                <select className="csSelect" value={esgReadiness} onChange={e=>setEsgReadiness(e.target.value as EsgReadiness)}>
                  {readinessList.map(r=><option key={r.key} value={r.key}>{r.label}</option>)}
                </select>
                <p className="csReadinessDesc">{activeReadiness.desc}</p>
              </div>
              <button className="actionButton csConfirmBtn" disabled={geoError} onClick={()=>setScreen("company")}>{isIt?"Entra nell'azienda":"Enter the company"}<b>→</b></button>
            </div>
          </div>
        </div>
      </div>
    </main>;
  }

  if(screen==="company"&&profile){
    const isIt=language==="it";
    const sec=SECTORS[companySector];
    const readinessList=isIt?ESG_READINESS_IT:ESG_READINESS_EN;
    const activeReadiness=readinessList.find(r=>r.key===esgReadiness)!;
    const sectorLabel=isIt?sec.label.it:sec.label.en;
    const dimVal=companyDims[0]; const opsVal=companyDims[1]; const officesVal=companyDims[2]; const peopleVal=companyDims[4];
    const dimUnit=isIt?sec.dimUnit.it:sec.dimUnit.en;
    // CSRD check: fatturato in €M
    const isMld=sec.dimUnit.it.includes("mld");
    const revenueM=isMld?dimVal*1000:dimVal;
    const csrdAlert=revenueM>=450&&peopleVal>=1000;
    const opsUnit=isIt?sec.opsUnit.it:sec.opsUnit.en;
    const offUnit=isIt?"sedi uffici":"office locations";
    const pepUnit=isIt?"dipendenti":"employees";
    const companyStoryGen=isIt?`Un ${sectorLabel.toLowerCase()} da ${dimVal} ${dimUnit}, con ${opsVal} ${opsUnit} e ${officesVal} sedi operative.`:`A ${sectorLabel.toLowerCase()} with ${dimVal} ${dimUnit}, ${opsVal} ${opsUnit} and ${officesVal} operational locations.`;
    const evolvingGen=`${displayCompanyName} — ${activeReadiness.desc}`;
    const geoKeys=["italia","europa","asia","nordamerica","sudamerica","africa","australia"];
    const geoLabelsShort:Record<string,{it:string,en:string}>={italia:{it:"ITALIA",en:"ITALY"},europa:{it:"EUROPA",en:"EUROPE"},asia:{it:"ASIA",en:"ASIA"},nordamerica:{it:"N. AMERICA",en:"N. AMERICA"},sudamerica:{it:"S. AMERICA",en:"S. AMERICA"},africa:{it:"AFRICA",en:"AFRICA"},australia:{it:"AUSTRALIA",en:"AUSTRALIA"}};
    const activeGeo=geoKeys.filter(k=>(geoDistrib[k]??0)>0&&(companyMarket==="mondo"||(companyMarket==="europa"&&(k==="italia"||k==="europa"))||companyMarket==="italia"&&k==="italia"));
    const posMap:Record<string,{left:string,top:string}[]>={europa:[{left:"48%",top:"38%"},{left:"51%",top:"42%"},{left:"44%",top:"40%"},{left:"53%",top:"36%"}],asia:[{left:"72%",top:"42%"},{left:"75%",top:"46%"},{left:"68%",top:"44%"}],nordamerica:[{left:"18%",top:"40%"},{left:"22%",top:"36%"},{left:"15%",top:"44%"}],sudamerica:[{left:"28%",top:"64%"},{left:"24%",top:"68%"}],africa:[{left:"50%",top:"58%"},{left:"46%",top:"62%"}],australia:[{left:"78%",top:"66%"},{left:"82%",top:"62%"}]};
    return <main className="companyScreen">
      <header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> COMPANY PROFILE</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header>
      <section className="companyCopy">
        <p className="eyebrow">{t.companyIntro}</p>
        <h1>{displayCompanyName}</h1>
        <p className="companySubtitle">{isIt?"Edita con i tuoi valori o prosegui con i default mostrati":"Edit with your values or continue with the defaults shown"}</p>
        <p className="companyLead">{companyStoryGen}</p>
        <div className="companyStats">
          <div><strong>{dimVal}</strong><span>{dimUnit}</span></div>
          <div><strong>{opsVal}</strong><span>{opsUnit}</span></div>
          <div><strong>{officesVal}</strong><span>{offUnit}</span></div>
          <div><strong>{peopleVal.toLocaleString()}</strong><span>{pepUnit}</span></div>
        </div>
        {(()=>{
          if(csrdConfirmStep===2){
            // stato finale: solo la frase, nessun bottone
            return csrdPendingChoice?(
              <div className="csrdAlert csrdAlertDone">
                <span className="csrdAlertIcon">⚠</span>
                <div className="csrdAlertBody">
                  <strong>{isIt?"Azienda soggetta a CSRD":"Company subject to CSRD"}</strong>
                  <span>{isIt?"Oltre 1.000 dipendenti e €450M di fatturato.":"Over 1,000 employees and €450M revenue."}</span>
                </div>
              </div>
            ):(
              <div className="csrdAlert csrdAlertOk csrdAlertDone">
                <span className="csrdAlertIcon">ℹ</span>
                <div className="csrdAlertBody">
                  <strong>{isIt?"Azienda non soggetta a CSRD":"Company not subject to CSRD"}</strong>
                  <span>{isIt?"Meno di 1.000 dipendenti o fatturato sotto €450M.":"Under 1,000 employees or revenue below €450M."}</span>
                </div>
              </div>
            );
          }
          if(csrdConfirmStep===1){
            // stato "Sicuro?"
            return (
              <div className={`csrdAlert${csrdPendingChoice?"":" csrdAlertOk"}`}>
                <span className="csrdAlertIcon">{csrdPendingChoice?"⚠":"ℹ"}</span>
                <div className="csrdAlertBody">
                  <strong>{csrdPendingChoice
                    ?(isIt?"Azienda soggetta a CSRD":"Company subject to CSRD")
                    :(isIt?"Azienda non soggetta a CSRD":"Company not subject to CSRD")}
                  </strong>
                  <span>{isIt?"Sicuro?":"Are you sure?"}</span>
                </div>
                <div className="csrdAlertBtns">
                  <button className="csrdBtnYes" onClick={()=>setCsrdConfirmStep(2)}>{isIt?"Sì":"Yes"}</button>
                  <button className="csrdBtnNo" onClick={()=>setCsrdConfirmStep(0)}>{isIt?"No":"No"}</button>
                </div>
              </div>
            );
          }
          // stato 0: mostra Sì confermo / No correggi
          return csrdAlert?(
            <div className="csrdAlert">
              <span className="csrdAlertIcon">⚠</span>
              <div className="csrdAlertBody">
                <strong>{isIt?"Azienda soggetta a CSRD":"Company subject to CSRD"}</strong>
                <span>{isIt?"Oltre 1.000 dipendenti e €450M di fatturato.":"Over 1,000 employees and €450M revenue."}</span>
              </div>
              <div className="csrdAlertBtns">
                <button className="csrdBtnYes" onClick={()=>{setCsrdPendingChoice(true);setCsrdConfirmStep(1);}}>{isIt?"Sì, confermo":"Yes, confirm"}</button>
                <button className="csrdBtnNo" onClick={()=>{updateCompanyDim(4,999);setCsrdPendingChoice(false);setCsrdConfirmStep(1);}}>{isIt?"No, correggi":"No, correct"}</button>
              </div>
            </div>
          ):(
            <div className="csrdAlert csrdAlertOk">
              <span className="csrdAlertIcon">ℹ</span>
              <div className="csrdAlertBody">
                <strong>{isIt?"Azienda non soggetta a CSRD":"Company not subject to CSRD"}</strong>
                <span>{isIt?"Meno di 1.000 dipendenti o fatturato sotto €450M.":"Under 1,000 employees or revenue below €450M."}</span>
              </div>
              <div className="csrdAlertBtns">
                <button className="csrdBtnYes" onClick={()=>{setCsrdPendingChoice(false);setCsrdConfirmStep(1);}}>{isIt?"Sì, confermo":"Yes, confirm"}</button>
                <button className="csrdBtnNo" onClick={()=>{updateCompanyDim(4,10000);setCsrdPendingChoice(true);setCsrdConfirmStep(1);}}>{isIt?"No, correggi":"No, correct"}</button>
              </div>
            </div>
          );
        })()}
        {/* Note / osservazioni CSRD */}
        <div className="csrdNoteWrap">
          <button className="csrdNoteToggle" onClick={()=>{if(!csrdNoteOpen){setCsrdNoteDraft(csrdNote);} setCsrdNoteOpen(o=>!o);}}>
            {csrdNote&&!csrdNoteOpen&&<span className="csrdNoteDot"/>}
            {isIt?"✏ Click per note o osservazioni · perimetro CSRD":"✏ Click for notes or observations · CSRD scope"}
          </button>
          {csrdNoteOpen&&(
            <div className="csrdNoteBox">
              <textarea
                className="csrdNoteArea"
                rows={4}
                placeholder={isIt?"Aggiungi note sul contesto CSRD di questa azienda...":"Add notes on this company's CSRD context..."}
                value={csrdNoteDraft}
                onChange={e=>setCsrdNoteDraft(e.target.value)}
              />
              <div className="csrdNoteActions">
                <button className="csrdNoteSave" onClick={()=>{setCsrdNote(csrdNoteDraft);setCsrdNoteOpen(false);}}>{isIt?"Salva":"Save"}</button>
                <button className="csrdNoteCancel" onClick={()=>setCsrdNoteOpen(false)}>{isIt?"Annulla":"Cancel"}</button>
              </div>
              {csrdNote&&<p className="csrdNoteSaved"><span>✓</span>{csrdNote}</p>}
            </div>
          )}
          {csrdNote&&!csrdNoteOpen&&<p className="csrdNoteSavedInline"><span>✓</span>{csrdNote}</p>}
        </div>
        <blockquote>{evolvingGen}</blockquote>
        {csrdConfirmStep===2&&<button className="actionButton" onClick={()=>setScreen("priorities")}>{t.explore}<b>→</b></button>}
      </section>
      <section className="worldMap" aria-label={`${displayCompanyName} footprint`}>
        <div className="mapGrid"/>
        <div className="region americas">AMERICAS</div><div className="region emea">EMEA</div><div className="region apac">APAC</div>
        <div className="mapPoint office milan" title="Milano HQ"><i/><span style={{left:"24px",top:"-46px",bottom:"auto",lineHeight:"1.45"}}><b style={{display:"block",color:"#effff9"}}>HQ · {displayCompanyName}</b><small style={{display:"block",color:"#72f7ca",fontSize:"8px"}}>MILAN</small></span></div>
        {activeGeo.filter(k=>k!=="italia").map(k=>{const pct=geoDistrib[k]??0;const count=Math.max(1,Math.round(pct/10));const positions=posMap[k]||[];return Array.from({length:Math.min(count,positions.length)}).map((_,idx)=><div key={`${k}-${idx}`} className="mapPoint office" style={{left:positions[idx].left,top:positions[idx].top}} title={isIt?geoLabelsShort[k].it:geoLabelsShort[k].en}><i/>{idx===0&&<span>{isIt?geoLabelsShort[k].it:geoLabelsShort[k].en} · {pct}%</span>}</div>);})}
        <div className="mapLegend"><b><i className="officeDot"/> {isIt?"SEDE":"OFFICE"}</b></div>
      </section>
    </main>;
  }

  if(screen==="priorities"&&profile){
    const isIt=language==="it";
    const prioImg:Record<Priority,string>={credit:"./obj-credit.png",compliance:"./obj-compliance.png",customers:"./obj-customers.png",efficiency:"./obj-efficiency.png",supply:"./obj-supply.png",reputation:"./obj-reputation.png"};
    return <main className="priorityScreen priorityScreenCards">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> BUSINESS PRIORITIES</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="prioCardsLayout">
        <div className="prioCardsIntro">
          <p className="eyebrow">{t.priorityKicker}</p>
          <h1>{t.priorityTitle}</h1>
          <p>{(t.priorityIntro as string).replace("COMPANY_NAME",displayCompanyName)}</p>
          <div className="priorityPersona">
            <img src={`./characters/${profile}-neutral.png`} alt={name}/>
            <div><strong>{name}</strong><small>ESG MANAGER</small></div>
          </div>
        </div>
        <div className="prioCardsArea">
          <div className="prioCardGrid">
            {priorities.map((p,i)=>(
              <div key={p} className={`prioCard${i<3?" prioCardTop":""}`}>
                <div className="prioCardRank">{String(i+1).padStart(2,"0")}</div>
                <img className="prioCardImg" src={prioImg[p]} alt={t.priorityNames[p]}/>
                <div className="prioCardBody">
                  <strong className="prioCardName">{t.priorityNames[p]}</strong>
                  <span className="prioCardDetail">{t.priorityDetails[p]}</span>
                  <button className="prioIncludeToggle" onClick={()=>togglePriorityIncluded(p)} aria-pressed={priorityIncluded[p]} title={isIt?"Includi in analisi":"Include in analysis"}>
                    <span className={`prioIncludeDot${priorityIncluded[p]?" prioIncludeDotOn":""}`}/>
                    {isIt?"Includi in analisi":"Include in analysis"}
                  </button>
                  <button className="prioExpLink" onClick={()=>setPrioExpModal(p)}>
                    {prioExperience[p]?<span className="prioExpDot"/>:null}
                    {isIt?"✏ Racconta la tua esperienza":"✏ Share your experience"}
                  </button>
                </div>
                <div className="prioCardMove">
                  <button className="prioMoveBtn" onClick={()=>rankPriority(i,i)} disabled={i===0} aria-label={t.moveUp}>▲</button>
                  <button className="prioMoveBtn" onClick={()=>rankPriority(i,i+2)} disabled={i===priorities.length-1} aria-label={t.moveDown}>▼</button>
                </div>
              </div>
            ))}
          </div>
          <button className="actionButton prioCardsConfirmBtn" onClick={()=>{localStorage.setItem("envizi-quest-priorities",JSON.stringify(priorities));setScreen("approachDataCopy")}}>{t.confirm}<b>→</b></button>
        </div>
      </div>
      {/* ── Experience modal ── */}
      {prioExpModal&&(()=>{
        const p=prioExpModal;
        const phrases=prioDefaultExp[p][language as "it"|"en"];
        const selIdx=prioExpSelected[p];
        // modalMode: "scratch" = testo libero, "scenario" = scegli scenario
        // determiniamo la modalità corrente: se non c'è selezione attiva e il testo salvato
        // non corrisponde a nessuna frase, siamo in scratch; altrimenti in scenario
        const modalMode=prioExpMode;
        const edited=prioExperience[p];

        const scenarioValue=modalMode==="scenario"
          ?(selIdx>=0?(edited!==""?edited:phrases[selIdx]):"")
          :"";
        const currentVal=modalMode==="scratch"?edited:scenarioValue;
        const canSave=currentVal.trim()!==""||
          (modalMode==="scenario"&&selIdx>=0);

        const selectPhrase=(idx:number)=>{
          if(selIdx===idx){
            setPrioExpSelected(prev=>({...prev,[p]:-1}));
            setPrioExperience(prev=>({...prev,[p]:""}));
          } else {
            setPrioExpSelected(prev=>({...prev,[p]:idx}));
            setPrioExperience(prev=>({...prev,[p]:""}));
          }
        };
        const switchMode=(mode:"scratch"|"scenario")=>{
          setPrioExpMode(mode);
          setPrioExpSelected(prev=>({...prev,[p]:-1}));
          setPrioExperience(prev=>({...prev,[p]:""}));
        };
        const exitWithout=()=>{setPrioExpModal(null);setPrioExpMode("scratch");};
        const saveAndExit=()=>{
          if(modalMode==="scenario"&&edited===""&&selIdx>=0)
            setPrioExperience(prev=>({...prev,[p]:phrases[selIdx]}));
          setPrioExpModal(null);
          setPrioExpMode("scratch");
        };

        return <div className="prioExpOverlay" onClick={exitWithout}>
          <div className="prioExpDialog" onClick={e=>e.stopPropagation()}>
            <div className="prioExpDialogHeader">
              <strong>{t.priorityNames[p]}</strong>
            </div>
            {/* ── Tab switcher ── */}
            <div className="prioExpTabs">
              <button
                className={`prioExpTab${modalMode==="scratch"?" prioExpTabActive":""}`}
                onClick={()=>switchMode("scratch")}
              >
                {isIt?"✍ Scrivi da zero":"✍ Write from scratch"}
              </button>
              <button
                className={`prioExpTab${modalMode==="scenario"?" prioExpTabActive":""}`}
                onClick={()=>switchMode("scenario")}
              >
                {isIt?"📋 Scegli uno scenario":"📋 Choose a scenario"}
              </button>
            </div>

            {modalMode==="scratch"&&(
              <>
                <p className="prioExpHint">{isIt?"Descrivi liberamente il contesto o la sfida specifica di questa priorità per la tua azienda.":"Freely describe the context or specific challenge of this priority for your organisation."}</p>
                <textarea
                  className="prioExpTextarea"
                  value={edited}
                  placeholder={isIt?"Scrivi qui il tuo testo…":"Write your text here…"}
                  onChange={e=>setPrioExperience(prev=>({...prev,[p]:e.target.value}))}
                  rows={6}
                  autoFocus
                />
              </>
            )}

            {modalMode==="scenario"&&(
              <>
                <p className="prioExpHint">{isIt?"Seleziona il caso in cui ti riconosci di più, poi rivedi e personalizza la frase.":"Select the case you identify with most, then review and personalise the phrase."}</p>
                <div className="prioExpPhrases">
                  {phrases.map((phrase,idx)=>(
                    <button key={idx} className={`prioExpPhrase${selIdx===idx?" prioExpPhraseActive":""}`} onClick={()=>selectPhrase(idx)}>
                      <span className="prioExpPhraseNum">{String(idx+1).padStart(2,"0")}</span>
                      <span className="prioExpPhraseText">{phrase}</span>
                      {selIdx===idx&&<span className="prioExpPhraseCheck">✓</span>}
                    </button>
                  ))}
                </div>
                <textarea
                  className={`prioExpTextarea${selIdx<0?" prioExpTextareaEmpty":""}`}
                  value={scenarioValue}
                  placeholder={isIt?"Seleziona uno scenario qui sopra per iniziare…":"Select a scenario above to get started…"}
                  onChange={e=>setPrioExperience(prev=>({...prev,[p]:e.target.value}))}
                  disabled={selIdx<0}
                  rows={5}
                />
              </>
            )}

            <div className="prioExpActions">
              <button className="prioExpClear" onClick={exitWithout}>
                {isIt?"Esci senza modifiche":"Exit without saving"}
              </button>
              <button className="actionButton prioExpSave" onClick={saveAndExit} disabled={!canSave}>
                {isIt?"Salva e esci":"Save and exit"}<b>→</b>
              </button>
            </div>
          </div>
        </div>;
      })()}
    </main>;
  }

  if(screen==="approachDataCopy"&&profile)return <main className="approachIntroScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> IL PERCORSO</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachIntroBody approachIntroBodyWithImg"><div className="approachIntroLeft"><h1 className="approachIntroTitle">{t.approachDataTitle}</h1><div className="approachIntroText">{(t.approachDataBody as string[]).map((para,i)=><p key={i}>{para}</p>)}</div><button className="actionButton approachIntroCta" onClick={()=>setScreen("priorityData")}>{t.approachDataCta}<b>→</b></button></div><div className="approachIntroRight"><img src="./step-2.svg" className="approachIntroStepBadge" alt="Step 2"/><img src="./logica-issue.png" className="approachIntroImg" alt="Criticità dati ESG"/><p className="approachIntroImgCaption approachIntroImgCaptionSm">{t.approachDataExample as string}</p></div></section></main>;

  if(screen==="priorityData"&&profile){
    const isIt=language==="it";
    return <main className="priorityDataScreen" style={{position:"relative"}}>
      <div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div>
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> DATA NEEDS</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="pdTopTitle">
        <div className="pdTopTitleRow">
          <h1 className="pdTopTitleText">{isIt?"Dagli obiettivi alle esigenze di gestione dati ESG":"From objectives to ESG data management needs"}</h1>
          <div className="pdHelpWrap">
            <button className="pdHelpBtn" onClick={()=>setPdHelpOpen(o=>!o)} aria-label="Help">?</button>
            {pdHelpOpen&&<div className="pdHelpTooltip">
              <button className="pdHelpClose" onClick={()=>setPdHelpOpen(false)}>✕</button>
              <p>{isIt
                ?"Seleziona gli elementi che intendi valutare: fai click sui cerchi per includerli. Poi assegna un punteggio di rilevanza (quanto è importante per la tua azienda) e un punteggio di criticità (quanto è problematico oggi per la tua azienda)."
                :"Select the items you want to evaluate: click the circles to include them. Then assign a relevance score (how important it is for your organisation) and a criticality score (how problematic it is for your organisation today)."
              }</p>
            </div>}
          </div>
        </div>
      </div>
      <div className="pdBody">
        {/* ── LEFT: all objectives scrollable ── */}
        <div className="pdLeft">
          {/* color tier legend */}
          <div className="pdTierLegend">
            <span><span style={{color:"#ff4d4d"}}>⬡</span> <span style={{color:"#fde047"}}>{isIt?"Alta priorità (R>7 e C>7)":"High priority (R>7 and C>7)"}</span></span>
            <span><span style={{color:"#7dd3fc"}}>⬡</span> <span style={{color:"#fde047"}}>{isIt?"Media priorità (R>4 o C>4)":"Medium priority (R>4 or C>4)"}</span></span>
            <span><span style={{color:"#9ca3af"}}>⬡</span> <span style={{color:"#fde047"}}>{isIt?"Bassa priorità":"Low priority"}</span></span>
          </div>
          {/* sticky column headers */}
          <div className="pdColHeaders">
            <div className="pdColHeaderSpacer"/>
            <div className="pdColHeaderBand pdColHeaderIncl">{isIt?"Includi":"Include"}</div>
            <div className="pdColHeaderBand pdColHeaderRel">{isIt?"Rilevanza":"Relevance"}</div>
            <div className="pdColHeaderBand pdColHeaderCrit">{isIt?"Criticità":"Criticality"}</div>
          </div>
          {priorities.map((p,prioIdx)=>{
            const colItems=dataNeeds.filter(n=>n.priority===p);
            const isSecondary=prioIdx>=3;
            return <div key={p} className={`pdGroup${isSecondary?" pdGroupSecondary":""}`}>
              <div className="pdGroupHeader">
                <span className="pdGroupNum">{String(prioIdx+1).padStart(2,"0")}</span>
                <strong className="pdGroupName"><span className="pdGroupObjLabel">{isIt?"Obiettivo:":"Objective:"}</span> <span className="pdGroupNameUnder">{t.priorityNames[p]}</span></strong>
              </div>
              <div className="pdGroupSubheader">{isIt?"Esigenze di gestione dei dati ESG":"ESG data management needs"}</div>
              {colItems.map((item,posInGroup)=>{
                const rankLabel=`${prioIdx+1}.${posInGroup+1}`;
                const relMax=10;
                const rel=Math.min(needRelevance[item.id]??5,10);
                const crit=needCriticality[item.id]??5;
                const included=isNeedIncluded(item.id);
                const relNorm=rel;
                const tier=relNorm>7&&crit>7?"high":relNorm>4||crit>4?"mid":"low";
                const tierColor=tier==="high"?"#ff4d4d":tier==="mid"?"#7dd3fc":"#9ca3af";
                return <div key={item.id} className={`pdRow${included?"":" pdRowDimmed"}`}>
                  <div className="pdRowLeft" style={{color:included?tierColor:"#ffffff"}}>
                    <span className="pdRowCode">{rankLabel}</span>
                    <span className="pdRowLabel">{item.label}</span>
                  </div>
                  <div className="pdColIncl">
                    <button
                      className={`pdInclBtn${included?" pdInclBtnOn":""}`}
                      style={{"--incl-color":included?tierColor:"#4a7060"} as React.CSSProperties}
                      onClick={()=>toggleNeedIncluded(item.id)}
                      aria-label={included?(isIt?"Escludi dalla valutazione":"Exclude from assessment"):(isIt?"Includi nella valutazione":"Include in assessment")}
                    />
                  </div>
                  <div className="pdRowBand" style={{"--rel-max":relMax} as React.CSSProperties}>
                    <input type="range" min={1} max={relMax} value={rel}
                      style={{"--v":rel,"--vmax":relMax-1} as React.CSSProperties}
                      onChange={e=>setNeedRelevance(v=>({...v,[item.id]:Number(e.target.value)}))}
                      className="pdScoreSlider pdSliderRel"
                      disabled={!included}/>
                    <span className="pdBandVal pdBandValRel" style={{opacity:included?1:0.3}}>{rel}<span className="pdBandMax">/{relMax}</span></span>
                  </div>
                  <div className="pdRowBand">
                    <input type="range" min={1} max={10} value={crit}
                      style={{"--v":crit} as React.CSSProperties}
                      onChange={e=>setNeedCriticality(v=>({...v,[item.id]:Number(e.target.value)}))}
                      className="pdScoreSlider pdSliderCrit"
                      disabled={!included}/>
                    <span className="pdBandVal pdBandValCrit" style={{opacity:included?1:0.3}}>{crit}</span>
                  </div>
                </div>;
              })}
            </div>;
          })}
        </div>
        {/* ── RIGHT: sticky panel ── */}
        <div className="pdRight">
          <p className="eyebrow">{t.priorityDataKicker}</p>
          <p className="pdRightIntro">{t.priorityDataIntro}</p>
          <div className="pdPersona">
            <img src={`./characters/${profile}-neutral.png`} alt={name}/>
            <div><strong>{name}</strong><small>ESG MANAGER</small></div>
          </div>
          <div className="pdScoreLegend">
            <div className="pdScoreLegendRow"><span className="pdLegendDot pdLegendRel"/>
              <div><strong>{isIt?"Rilevanza":"Relevance"}</strong><small>{isIt?"1 = poco rilevante · 10 = molto rilevante":"1 = low relevance · 10 = very relevant"}</small></div>
            </div>
            <div className="pdScoreLegendRow"><span className="pdLegendDot pdLegendCrit"/>
              <div><strong>{isIt?"Criticità":"Criticality"}</strong><small>{isIt?"1 = poco problematico · 10 = molto problematico":"1 = low severity · 10 = very critical"}</small></div>
            </div>
          </div>
          <button className="actionButton pdConfirmBtn" onClick={()=>setScreen("priorityMatrix")}>{t.priorityDataCta}<b>→</b></button>
        </div>
      </div>
    </main>;
  }


  if(screen==="priorityMatrix"&&profile){
    const isIt=language==="it";
    const MATRIX_W=800; // horizontal plot area
    const MATRIX_H=380; // shorter vertical plot area
    const PAD_L=38;     // left padding (y-axis labels)
    const PAD_B=58;     // bottom padding (x-axis labels + legend)
    const VW=MATRIX_W+PAD_L;
    const VH=MATRIX_H+PAD_B;
    const priorityColors:Record<Priority,string>={
      credit:"#39efb4",compliance:"#7c86ff",customers:"#f5c542",
      efficiency:"#ff8c5a",supply:"#a78bfa",reputation:"#f472b6"
    };
    // collect only the included needs
    const allNeeds=dataNeeds.filter(n=>isNeedIncluded(n.id)).map((n)=>{
      const prioIdx=priorities.indexOf(n.priority);
      const rel=Math.min(needRelevance[n.id]??5,10);
      const crit=needCriticality[n.id]??5;
      const relNorm=rel;
      const tierColor=relNorm>7&&crit>7?"#ff4d4d":relNorm>4||crit>4?"#7dd3fc":"#9ca3af";
      return {...n,rel,relNorm,crit,prioIdx,color:tierColor};
    });
    // x = Rilevanza (1-10), y = Criticità (1-10)
    const toX=(v:number)=>PAD_L+(v-1)/(10-1)*MATRIX_W;
    const toY=(v:number)=>(10-v)/(10-1)*MATRIX_H;
    const gridVals=[1,2,3,4,5,6,7,8,9,10];
    // zoom: viewport della zona [focusMinR..10] x [focusMinC..10]
    const zoomF=focusMinR; // R e C sono sempre uguali
    const vbX=zoomF>1?toX(zoomF)-PAD_L/2:0;
    const vbY=zoomF>1?toY(10):0;          // top invariato
    const vbW=zoomF>1?(PAD_L+MATRIX_W)-vbX:VW;
    const vbH=zoomF>1?(toY(zoomF)+PAD_B)-vbY:VH;
    return <main className="pmScreen" style={{position:"relative"}}>
      <div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div>
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> PRIORITY MATRIX</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <div className="pmBody">
        <div className="pmLeft">
          <p className="eyebrow">{isIt?"Matrice di Priorità":"Priority Matrix"}</p>
          <h1 className="pmTitle">{isIt?"Rilevanza vs Criticità":"Relevance vs Criticality"}</h1>
          {/* tier color legend */}
          <div className="pmTierLegend">
            <div className="pmTierLegendItem"><span className="pmTierDot" style={{background:"#ff4d4d"}}/><span style={{color:"#fde047"}}>{isIt?"Alta priorità":"High priority"}</span><small>{isIt?"R>7 e C>7":"R>7 and C>7"}</small></div>
            <div className="pmTierLegendItem"><span className="pmTierDot" style={{background:"#7dd3fc"}}/><span style={{color:"#fde047"}}>{isIt?"Media priorità":"Medium priority"}</span><small>{isIt?"R>4 o C>4":"R>4 or C>4"}</small></div>
            <div className="pmTierLegendItem"><span className="pmTierDot" style={{background:"#9ca3af"}}/><span style={{color:"#fde047"}}>{isIt?"Bassa priorità":"Low priority"}</span></div>
          </div>
          {/* objectives filter list */}
          <div className="pmObjList">
            <p className="pmObjListLabel">{isIt?"Filtra per obiettivo":"Filter by objective"}</p>
            {priorities.map((p,pi)=><div key={p} className={`pmObjItem${hoveredPriority===p?" pmObjItemActive":""}`} onMouseEnter={()=>setHoveredPriority(p)} onMouseLeave={()=>setHoveredPriority(null)}><span className="pmObjRank">{pi+1}</span><span>{t.priorityNames[p]}</span></div>)}
          </div>
          {/* mission (capability) filter list */}
          <div className="pmObjList" style={{marginTop:"14px"}}>
            <p className="pmObjListLabel">{isIt?"Filtra per capacità richiesta":"Filter by required capability"}</p>
            {missionCatalog.map((m,mi)=>{
              const active=pmMissionFilter===mi;
              return <div key={mi} className={`pmObjItem${active?" pmObjItemActive":""}`} onClick={()=>setPmMissionFilter(active?null:mi)} style={{cursor:"pointer"}}>
                <span className="pmObjRank">{mi}</span>
                <span>{isIt?m.it:m.en}</span>
              </div>;
            })}
          </div>
        </div>
        <div className="pmPlotWrap">
          <h2 className="pmMatrixTitle">{isIt?"Esigenze di gestione dei dati ESG: Priorità di intervento":"ESG data management needs: Intervention priorities"}</h2>
          <div className="pmMatrixSpacer"><div className="pmMatrixSpacerLine"/><div className="pmMatrixSpacerLine"/><div className="pmMatrixSpacerLine"/></div>
          {pmFromBriefing
            ? <button className="actionButton pmCta" onClick={()=>{setPmFromBriefing(false);setScreen("asis");}}>{isIt?"Continua verso l'AS-IS →":"Continue to AS-IS →"}</button>
            : <button className="actionButton pmCta" onClick={()=>setScreen("chapterOneSummary")}>{isIt?"Inizia le sfide →":"Start challenges →"}<b>→</b></button>
          }
          <svg className="pmSvg" viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet" style={{transition:"viewBox .35s"}}>
            {/* dashed grid */}
            {gridVals.map(v=><g key={v}>
              <line x1={toX(v)} y1={0} x2={toX(v)} y2={MATRIX_H} stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeDasharray="5 5"/>
              <line x1={PAD_L} y1={toY(v)} x2={PAD_L+MATRIX_W} y2={toY(v)} stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeDasharray="5 5"/>
              <text x={toX(v)} y={MATRIX_H+16} textAnchor="middle" fontSize="12" fill="#7ecfb8" fontFamily="monospace" fontWeight="700">{v}</text>
              <text x={PAD_L-8} y={toY(v)+5} textAnchor="end" fontSize="12" fill="#7ecfb8" fontFamily="monospace" fontWeight="700">{v}</text>
            </g>)}
            {/* trasversale label at (10,10) — visible only when a mission filter is active */}
            {pmMissionFilter!==null&&(()=>{
              const tx=toX(10); const ty=toY(10);
              const lbl=isIt?"Esigenza trasversale":"Cross-cutting need";
              const lbl2=isIt?"a tutte le sfide":"across all challenges";
              const bw=Math.max(lbl.length,lbl2.length)*5.6+16;
              const bh=28;
              return <g>
                <rect x={tx-bw/2} y={ty-bh/2} width={bw} height={bh} rx="4" fill="rgba(7,17,14,.88)" stroke="#f5c542" strokeWidth="1" strokeOpacity="0.7"/>
                <text x={tx} y={ty-3} textAnchor="middle" fontSize="7" fill="#f5c542" fontFamily="monospace" fontWeight="700">{lbl}</text>
                <text x={tx} y={ty+8} textAnchor="middle" fontSize="7" fill="#f5c542" fontFamily="monospace" fontWeight="700">{lbl2}</text>
              </g>;
            })()}
            {/* axis label x */}
            <text x={PAD_L+MATRIX_W/2} y={MATRIX_H+36} textAnchor="middle" fontSize="12" fill="#c2d8cf" fontFamily="monospace" fontWeight="700" letterSpacing="3">{isIt?"RILEVANZA":"RELEVANCE"}</text>
            {/* R / C legend */}
            <text x={PAD_L+MATRIX_W} y={MATRIX_H+52} textAnchor="end" fontSize="9" fill="rgba(255,255,255,.85)" fontFamily="monospace" fontWeight="700">{isIt?"R = Rilevanza (1–10)   ·   C = Criticità (1–10)":"R = Relevance (1–10)   ·   C = Criticality (1–10)"}</text>
            <text x={10} y={MATRIX_H/2} textAnchor="middle" fontSize="12" fill="#c2d8cf" fontFamily="monospace" fontWeight="700" letterSpacing="3" transform={`rotate(-90,10,${MATRIX_H/2})`}>{isIt?"CRITICITÀ":"CRITICALITY"}</text>
            {/* quadrant highlight */}
            <rect x={toX(5.5)} y={0} width={PAD_L+MATRIX_W-toX(5.5)} height={MATRIX_H/2} fill="rgba(57,239,180,.04)"/>
            {(()=>{
              // ── label layout with force repulsion ──
              const FONT=7.5; const LINE_H=9; const MAX_LINES=3;
              const CHAR_W=FONT*0.52; const PAD_X=6; const PAD_Y=4;
              // pre-compute lines for every need
              const maxChars=Math.floor((MATRIX_W/9-PAD_X*2)/CHAR_W);
              const needMeta=allNeeds.map(n=>{
                const words=n.label.split(" ");
                const lines:string[]=[]; let cur="";
                for(const w of words){
                  const test=cur?cur+" "+w:w;
                  if(test.length<=maxChars)cur=test;
                  else{if(cur)lines.push(cur);cur=w;}
                }
                if(cur)lines.push(cur);
                const vis=lines.slice(0,MAX_LINES);
                const bw=Math.max(...vis.map(l=>l.length))*CHAR_W+PAD_X*2;
                const bh=vis.length*LINE_H+PAD_Y*2+8; // +8 for score line at bottom
                const prioIdx=priorities.indexOf(n.priority);
                const posInGroup=dataNeeds.filter(d=>d.priority===n.priority).findIndex(d=>d.id===n.id);
                return {n,vis,bw,bh,
                  ox:toX(n.relNorm),oy:toY(n.crit), // anchor (grid point)
                  lx:toX(n.relNorm),ly:toY(n.crit),  // label centre (mutable)
                  rankLabel:`${prioIdx+1}.${posInGroup+1}`,
                };
              });
              // iterative repulsion (50 passes)
              for(let iter=0;iter<50;iter++){
                for(let i=0;i<needMeta.length;i++){
                  for(let j=i+1;j<needMeta.length;j++){
                    const a=needMeta[i],b=needMeta[j];
                    const overX=Math.max(0,(a.bw+b.bw)/2-Math.abs(a.lx-b.lx));
                    const overY=Math.max(0,(a.bh+b.bh)/2-Math.abs(a.ly-b.ly));
                    if(overX>0&&overY>0){
                      const push=Math.min(overX,overY)*0.5;
                      const dx=a.lx-b.lx||0.1, dy=a.ly-b.ly||0.1;
                      const d=Math.sqrt(dx*dx+dy*dy)||1;
                      a.lx+=push*dx/d; a.ly+=push*dy/d;
                      b.lx-=push*dx/d; b.ly-=push*dy/d;
                    }
                  }
                  // keep within SVG bounds
                  const m=needMeta[i];
                  m.lx=Math.max(PAD_L+m.bw/2+2,Math.min(PAD_L+MATRIX_W-m.bw/2-2,m.lx));
                  m.ly=Math.max(m.bh/2+2,Math.min(MATRIX_H-m.bh/2-2,m.ly));
                }
              }
              return needMeta.map(({n,vis,bw,bh,ox,oy,lx,ly,rankLabel})=>{
                const moved=Math.abs(lx-ox)>4||Math.abs(ly-oy)>4;
                const inFocus=n.relNorm>=focusMinR&&n.crit>=focusMinC;
                const nMission=needIdToMission[n.id]??-1; // -1 = trasversale
                const isTransversal=nMission===-1;
                const missionMatch=pmMissionFilter===null||isTransversal||nMission===pmMissionFilter;
                const visible=(hoveredPriority?n.priority===hoveredPriority:inFocus)&&missionMatch;
                // compute arrow: from nearest box edge toward anchor point
                const dx=ox-lx, dy=oy-ly, dist=Math.sqrt(dx*dx+dy*dy)||1;
                const ux=dx/dist, uy=dy/dist;
                const ex=lx+ux*(bw/2), ey=ly+uy*(bh/2); // exit point on box edge
                const ax=ox-ux*5, ay=oy-uy*5;
                // trasversali: bordo tratteggiato + badge
                const boxStrokeDash=isTransversal&&pmMissionFilter!==null?"4 2":undefined;
                const boxStrokeW=isTransversal&&pmMissionFilter!==null?1.4:0.8;
                return <g key={n.id} className="pmDot" opacity={visible?1:0.1} onClick={()=>setPmSelected({id:n.id,label:n.label,rel:n.relNorm,crit:n.crit,color:n.color})} style={{cursor:"pointer"}}>
                  {/* label box */}
                  <rect x={lx-bw/2} y={ly-bh/2} width={bw} height={bh} rx="3" fill="#07110e" fillOpacity="0.82" stroke={n.color} strokeWidth={boxStrokeW} strokeOpacity="0.7" strokeDasharray={boxStrokeDash}/>
                  <text fontFamily="sans-serif" fontSize={FONT} fill={n.color} fontWeight="600">
                    {vis.map((line,i)=><tspan key={i} x={lx} y={ly-bh/2+PAD_Y+(i+0.85)*LINE_H} textAnchor="middle">{line}</tspan>)}
                  </text>
                  <text x={lx-bw/2+3} y={ly-bh/2+8} fontSize="6" fill={n.color} fontFamily="monospace" fontWeight="700" opacity="0.65">{rankLabel}</text>
                  {isTransversal&&pmMissionFilter!==null&&<text x={lx+bw/2-3} y={ly-bh/2+8} fontSize="5.5" fill="#f5c542" fontFamily="monospace" fontWeight="700" textAnchor="end" opacity="0.9">TRASV.</text>}
                  <text x={lx} y={ly+bh/2-3} fontSize="7" fill={n.color} fontFamily="monospace" fontWeight="700" opacity="1" textAnchor="middle">{`R${n.relNorm} · C${n.crit}`}</text>
                </g>;
              });
            })()}
          </svg>
          {pmSelected&&<div className="pmPopoverOverlay" onClick={()=>setPmSelected(null)}>
            <div className="pmPopover" onClick={e=>e.stopPropagation()}>
              <button className="pmPopoverClose" onClick={()=>setPmSelected(null)}>✕</button>
              <p className="pmPopoverLabel" style={{color:pmSelected.color}}>{pmSelected.label}</p>
              <div className="pmPopoverScores">
                <div className="pmPopoverScore"><span className="pmPopoverScoreKey">{isIt?"Rilevanza":"Relevance"}</span><span className="pmPopoverScoreVal" style={{color:pmSelected.color}}>{pmSelected.rel}<span className="pmPopoverScoreMax">/10</span></span></div>
                <div className="pmPopoverScore"><span className="pmPopoverScoreKey">{isIt?"Criticità":"Criticality"}</span><span className="pmPopoverScoreVal" style={{color:pmSelected.color}}>{pmSelected.crit}<span className="pmPopoverScoreMax">/10</span></span></div>
              </div>
            </div>
          </div>}
          <div className="pmFocusBar">
            <span className="pmFocusLabel">{isIt?"Focalizza su elementi con":"Focus on needs with"}</span>
            <span className="pmFocusGroup">
              <span className="pmFocusKey">R ≥ &amp; C ≥</span>
              <span className="pmFocusStepper">
                <button className="pmFocusBtn" onClick={()=>{const v=Math.min(10,focusMinR+1);setFocusMinR(v);setFocusMinC(v);}} disabled={focusMinR>=10}>▲</button>
                <span className="pmFocusVal">{focusMinR}</span>
                <button className="pmFocusBtn" onClick={()=>{const v=Math.max(1,focusMinR-1);setFocusMinR(v);setFocusMinC(v);}} disabled={focusMinR<=1}>▼</button>
              </span>
            </span>
            <span className="pmFocusHint">{isIt?"(1 = nessun filtro · 10 = solo il massimo)":"(1 = no filter · 10 = max only)"}</span>
          </div>
        </div>
      </div>
    </main>;
  }


  if(screen==="bridge"&&profile){
    const top5=topNeeds;
    const missions=t.bridgeMissions as {num:string,label:string,need:string}[];
    // group top5 needs by destination mission (fallback → data foundation)
    const needsByMission:Record<number,typeof top5>=Object.fromEntries([0,1,2,3,4,5].map(i=>[i,[]]));
    top5.forEach((n,rank)=>{
      const mi=needIdToMission[n.id]??0;
      needsByMission[mi].push({...n,_rank:rank+1} as typeof top5[0] & {_rank:number});
    });
    return <main className="bridgeScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> THE QUEST</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <section className="bridgeIntroBar">
        <div>
          <p className="eyebrow">{t.bridgeKicker}</p>
          <h1>{t.bridgeTitle}</h1>
          <p className="bridgeIntroText">{t.bridgeIntro}</p>
        </div>
        <button className="actionButton bridgeCta" onClick={()=>setScreen("missions")}>{t.bridgeCta}<b>→</b></button>
      </section>
      <section className="bridgeMapping">
        {/* Riquadro prerequisito — missione 0 */}
        {(()=>{
          const m=missions[0];
          const assigned=(needsByMission[0]||[]) as (typeof top5[0] & {_rank:number})[];
          const hasNeeds=assigned.length>0;
          return <div className="bridgePrereqBlock">
            <div className="bridgeBlockLabel">{(t as any).bridgePrereqLabel}</div>
            <div className={`bridgeMapRow bridgeMapRowPrereq${hasNeeds?"":" bridgeMapRowEmpty"}`}>
              <div className="bridgeMapNeedsCol">
                {hasNeeds ? assigned.map(n=>(
                  <div key={n.id} className="bridgeMapNeed">
                    <span className="bridgeMapNeedRank">{String(n._rank).padStart(2,"0")}</span>
                    <div>
                      <small>{language==="it"?"LA TUA ESIGENZA":"YOUR DATA NEED"}</small>
                      <strong>{n.label}</strong>
                      <span className="bridgeMapNeedPrio">{t.priorityNames[n.priority]}</span>
                    </div>
                  </div>
                )) : (
                  <div className="bridgeMapNeedEmpty">
                    <span className="bridgeMapNeedEmptyDash">—</span>
                    <small>{language==="it"?"Nessuna esigenza prioritaria assegnata":"No priority need assigned"}</small>
                  </div>
                )}
              </div>
              <div className="bridgeMapConnector">
                <span className={`bridgeMapConnectorLine${hasNeeds?"":" empty"}`}/>
                <span className={`bridgeMapConnectorArrow${hasNeeds?"":" empty"}`}>▶</span>
              </div>
              <div className={`bridgeMapMission${hasNeeds?"":" bridgeMapMissionEmpty"}`}>
                <span className="bridgeMapMissionNum">{m.num}</span>
                <div>
                  <small>{language==="it"?"SFIDA DELLA QUEST":"QUEST CHALLENGE"}</small>
                  <strong className="bridgeMapMissionTitle">{m.label}</strong>
                  <p className="bridgeMapMissionNeed">{m.need}</p>
                </div>
              </div>
            </div>
          </div>;
        })()}
        {/* Riquadro capacità ulteriori — missioni 1–4 */}
        <div className="bridgeCapBlock">
          <div className="bridgeBlockLabel">{(t as any).bridgeCapLabel}</div>
          {missions.slice(1).map((m,idx)=>{
            const mi=idx+1;
            const assigned=(needsByMission[mi]||[]) as (typeof top5[0] & {_rank:number})[];
            const hasNeeds=assigned.length>0;
            return <div key={m.num} className={`bridgeMapRow${hasNeeds?"":" bridgeMapRowEmpty"}`}>
              <div className="bridgeMapNeedsCol">
                {hasNeeds ? assigned.map(n=>(
                  <div key={n.id} className="bridgeMapNeed">
                    <span className="bridgeMapNeedRank">{String(n._rank).padStart(2,"0")}</span>
                    <div>
                      <small>{language==="it"?"LA TUA ESIGENZA":"YOUR DATA NEED"}</small>
                      <strong>{n.label}</strong>
                      <span className="bridgeMapNeedPrio">{t.priorityNames[n.priority]}</span>
                    </div>
                  </div>
                )) : (
                  <div className="bridgeMapNeedEmpty">
                    <span className="bridgeMapNeedEmptyDash">—</span>
                    <small>{language==="it"?"Nessuna esigenza prioritaria assegnata":"No priority need assigned"}</small>
                  </div>
                )}
              </div>
              <div className="bridgeMapConnector">
                <span className={`bridgeMapConnectorLine${hasNeeds?"":" empty"}`}/>
                <span className={`bridgeMapConnectorArrow${hasNeeds?"":" empty"}`}>▶</span>
              </div>
              <div className={`bridgeMapMission${hasNeeds?"":" bridgeMapMissionEmpty"}`}>
                <span className="bridgeMapMissionNum">{m.num}</span>
                <div>
                  <small>{language==="it"?"SFIDA DELLA QUEST":"QUEST CHALLENGE"}</small>
                  <strong className="bridgeMapMissionTitle">{m.label}</strong>
                  <p className="bridgeMapMissionNeed">{m.need}</p>
                </div>
              </div>
            </div>;
          })}
        </div>
      </section>
    </main>;
  }

  if(screen==="compare"&&profile){
    const missionImgs={
      positive:["./envizi-data-automation.png","./energy-envizi-analytics.png","./supply-chain-envizi.png","./reporting-envizi.png","./planning-envizi.png","./framework-envizi.png"],
      warning:["./envizi-manual-forms.png","./energy-manual-dashboard.png","./supply-chain-portal.png","./reporting-intermediate.png","./planning-intermediate.png","./framework-intermediate.png"],
      critical:["./envizi-spreadsheets-email.png","./energy-asis-fragmented.png","./supply-chain-asis.png","./reporting-asis.png","./planning-asis.png","./framework-asis.png"]
    };
    const m0=selectedMission===0;
    const isIt=language==="it";
    const options=[
      {key:"critical" as Outcome,label:"C",title:active.optionC,detail:active.optionCDetail,img:missionImgs.critical[selectedMission],
        solutionTag:m0?(isIt?"IBM Envizi Servizio Gestito":"IBM Envizi Managed Service"):undefined,
        solutionDetail:m0?(isIt?"Sperimenta con un nostro partner la gestione dei dati ESG.":"Experience ESG data management with one of our partners."):undefined},
      {key:"warning" as Outcome,label:"B",title:active.optionB,detail:active.optionBDetail,img:missionImgs.warning[selectedMission],
        solutionTag:m0?(isIt?"IBM Envizi Standard":"IBM Envizi Standard"):undefined,
        solutionDetail:m0?(isIt?"Modulo Data Foundation. Semplicità e velocità pronti per evolvere con i tuoi bisogni.":"Data Foundation Module. Simplicity and speed, ready to evolve with your needs."):undefined},
      {key:"positive" as Outcome,label:"A",title:active.optionA,tag:(active as any).optionATag as string|undefined,detail:active.optionADetail,img:missionImgs.positive[selectedMission],
        solutionTag:m0?(isIt?"IBM Envizi Premium":"IBM Envizi Premium"):undefined,
        solutionDetail:m0?(isIt?"Modulo Data Foundation e Connettori. Automazione e Affidabilità a portata di mano.":"Data Foundation Module and Connectors. Automation and Reliability at your fingertips."):undefined},
    ];
    const currentRatings=asIsRatings[selectedMission]||(active.asIsItems.map(()=>"alto" as "alto"|"medio"|"basso"));
    const ratingVal={"alto":25,"medio":12,"basso":0};
    const totalCrit=currentRatings.reduce((s,r)=>s+ratingVal[r],0);
    const critLevel=totalCrit<=25?"bassa":totalCrit<=50?"media":"alta";
    const critColor=critLevel==="alta"?"#ff6b6b":critLevel==="media"?"#f5c542":"#39efb4";
    const critLabel=language==="it"
      ?{alta:"CRITICITÀ ALTA",media:"CRITICITÀ MEDIA",bassa:"CRITICITÀ BASSA"}
      :{alta:"HIGH CRITICALITY",media:"MEDIUM CRITICALITY",bassa:"LOW CRITICALITY"};
    // badge appears only on the card whose outcome matches the criticality level
    const critOnCard={"alta":"positive","media":"warning","bassa":"critical"} as Record<string,string>;
    return <main className="compareScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {t.mission} <b>{String(selectedMission+1).padStart(2,"0")}</b><i>/</i>06</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header>
    <section className="compareBody">
      <h1>{language==="it"?"Scegli la strada":"Choose your path"}</h1>
      <p className="compareHint">{language==="it"?"Clicca sull'immagine per selezionare la tua scelta e proseguire.":"Click an image to make your choice and continue."}</p>
      <div className="compareGrid">
        {options.map(opt=>{
          return <div key={opt.key} className="compareCardWrap">
            <article className={`compareCard ${opt.key}`} onClick={()=>handleDecision(opt.key)}>
            {/* RIGA 1 — titolo soluzione */}
            <div className="compareSolution">
              <strong>{opt.title}</strong>
              {opt.key==="positive"&&(opt as any).tag&&<span className="compareSolutionTag">{(opt as any).tag}</span>}
            </div>
            {/* RIGA 2 — immagine */}
            <div className="compareImg">
              <img src={opt.img} alt={opt.title}/>
              <div className="compareImgOverlay"><span>{language==="it"?"Scegli →":"Select →"}</span></div>
            </div>
            {/* RIGA 3 — commento scenario */}
            <div className="compareRowTop">
              <p className="compareDetail">{opt.detail}</p>
            </div>
          </article>
          </div>;
        })}
      </div>
      {/* riga PoC — solo colonna 2 (warning), solo missione 0 */}
      {m0&&<div className="compareGrid compareGridSolutions">
        <div/>
        <div className="comparePocBox">
          <span className="comparePocBoxTag">{isIt?"Envizi Proof of Concept":"Envizi Proof of Concept"}</span>
          <p className="comparePocBoxDetail">{isIt?"Verifica con un test drive la copertura dei tuoi bisogni.":"Verify your needs coverage with a test drive."}</p>
        </div>
        <div/>
      </div>}
      {/* riga box soluzioni — stessa griglia 3 col, allineata sotto */}
      {options.some(o=>(o as any).solutionTag)&&<div className="compareGrid compareGridSolutions">
        {options.map(opt=>(
          <div key={opt.key}>
            {(opt as any).solutionTag&&<div className="compareSolutionBox">
              <span className="compareSolutionBoxTag">{(opt as any).solutionTag}</span>
              <p className="compareSolutionBoxDetail">{(opt as any).solutionDetail}</p>
            </div>}
          </div>
        ))}
      </div>}
    </section></main>;
  }

  if(screen==="tobe"&&profile){
    const tobeDeltas:{[mi:number]:{positive:(number|null)[],warning:(number|null)[],critical:(number|null)[]}}={
      0:{positive:[0.83,0.38,0.17,0.10],warning:[0.92,0.72,0.78,0.60],critical:[1,1,1,1]},
      1:{positive:[0.82,0.88,0.13,0.18],warning:[0.93,0.95,0.48,0.55],critical:[1,1,1,1]},
      2:{positive:[null,0.62,null,0.12],warning:[null,0.80,null,0.45],critical:[null,1,null,1]},
      3:{positive:[0.33,0.21,0.12,0.28],warning:[0.72,0.65,0.55,0.60],critical:[1,1,1,1]},
      4:{positive:[null,null,3.2,0.55],warning:[null,null,1.8,0.75],critical:[null,null,1,1]},
      5:{positive:[null,0.26,0.12,0.22],warning:[null,0.70,0.52,0.61],critical:[null,1,1,1]},
    };
    const items=missionItems(selectedMission);
    const units=missionUnits(selectedMission);
    const userVals=missionParameters[selectedMission]||[];
    const deltas=tobeDeltas[selectedMission]?.[pendingOutcome]||items.map(()=>null);
    const outcomeColor=pendingOutcome==="positive"?"#39efb4":pendingOutcome==="warning"?"#ffc07c":"#ff7777";
    const outcomeLabel2=pendingOutcome==="positive"?(language==="it"?"Scelta A — Envizi":"Option A — Envizi"):pendingOutcome==="warning"?(language==="it"?"Scelta B — Soluzione intermedia":"Option B — Intermediate"):language==="it"?"Scelta C — Rimandare":"Option C — Postpone";
    return <main className="tobeScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {t.mission} <b>{String(selectedMission+1).padStart(2,"0")}</b><i>/</i>06</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="tobeBody"><div className="tobeIntro"><p className="eyebrow">{t.tobeKicker}</p><h1>{t.tobeTitle}</h1><p className="tobeSubtitle">{t.tobeSubtitle}</p><div className="tobeChoiceBadge" style={{borderColor:outcomeColor,color:outcomeColor}}>{outcomeLabel2}</div></div><div className="tobeGrid">{items.map((item,i)=>{const raw=userVals[i]?parseFloat(userVals[i]):null;const factor=deltas[i];const hasDelta=factor!==null&&factor!==1;const tobeVal=raw!==null&&factor!==null?raw*factor:null;const isImprovement=factor!==null&&factor<1;const isWorse=factor!==null&&factor>1;const deltaSign=isImprovement?"↓":isWorse?"↑":"—";const deltaColor=isImprovement?outcomeColor:isWorse?"#ff7777":"#7a9a90";return <article key={item.title} className={`tobeCard${hasDelta?" tobeCardChanged":""}`}><div className="tobeCardHeader"><span className="tobeCardNum">{String(i+1).padStart(2,"0")}</span><strong>{item.title}</strong></div><div className="tobeRow"><div className="tobeCol"><small>{t.tobeAsIs}</small><b>{raw!==null?`${raw} ${units[i]}`:item.metric}</b></div><div className="tobeArrow" style={{color:deltaColor}}>{deltaSign}</div><div className="tobeCol tobeColNew"><small>{t.tobeToBe}</small><b style={{color:tobeVal!==null?outcomeColor:undefined}}>{tobeVal!==null?`${tobeVal%1===0?tobeVal:tobeVal.toFixed(1)} ${units[i]}`:factor===1?(language==="it"?"Invariato":"Unchanged"):(language==="it"?"n.d.":"n/a")}</b></div></div>{hasDelta&&tobeVal!==null&&raw!==null&&<div className="tobeDeltaBar"><span className="tobeDeltaLabel" style={{color:deltaColor}}>{t.tobeDelta}: {isImprovement?"-":"+"}{Math.abs(Math.round((1-factor)*100))}%</span></div>}</article>; })}</div><div className="tobeDisclaimer"><span>⚠</span><p>{t.tobeDisclaimer}</p></div><button className="actionButton" onClick={()=>setScreen(pendingOutcome==="positive"?"success":"negative")}>{t.tobeCta}<b>→</b></button></section></main>;
  }



  if(screen==="introCopy2"&&profile)return <main className="introScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> YOUR CHALLENGE</div><div className="introNavRight"><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></div></header><section className="characterStage"><img src={`./characters/${profile}-neutral.png`} alt={name}/><div className="characterTag characterTagRaised"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></section><section className="introBody"><p className="eyebrow">{t.introKicker}</p><h1>{t.introTitle}</h1><p className="storyText">{t.introBody}</p><div className="introTrustBox"><p className="introScoreLabel">{t.introScoreLabel}</p>{renderTrustBar()}</div><div className="introCtaRow"><button className="actionButton questLaunchBtn" onClick={()=>setScreen("asis")}>{t.introStart}<b>→</b></button></div></section></main>;


  if(screen!=="onboarding"&&profile){const result=screen==="negative"||screen==="success";return <main className={`missionScreen mission-${selectedMission} ${screen} ${screen==="negative"?(negativeChoice==="form"?"formOutcome":"asIsOutcome"):""}`}><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {t.mission} <b>{String(selectedMission+1).padStart(2,"0")}</b><i>/</i>06</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="characterStage"><img src={imageFor(profile,screen)} alt={`${name} · ${screen}`}/><div className="characterTag"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div>{screen==="trust"&&<button className="actionButton trustStageCta" onClick={()=>setScreen(selectedMission===0?"milestone":selectedMission===1?"energyFoundation":selectedMission===2?"supplyFoundation":selectedMission===3?"reportingFoundation":selectedMission===4?"planningFoundation":selectedMission===5?"frameworkFoundation":"missions")}>{t.trustContinue}<b>→</b></button>}</section><section className="missionContent"><div className="missionLabel"><span>{t.mission} {String(selectedMission+1).padStart(2,"0")}</span><i>90 DAYS</i></div>
    {screen==="briefing"&&(()=>{const effects=(t.crossEffects[selectedMission]||[]).filter(e=>{const o=missionOutcomes[e.from];return o&&(e[o as keyof typeof e] as string|null)!==null});return<><h1>{language==="it"?missionCatalog[selectedMission].it:missionCatalog[selectedMission].en}</h1><div className="companyChip"><strong>{displayCompanyName}</strong><span>{t.companyFacts}</span></div>{effects.length>0&&<div className="crossEffectBanners">{effects.map(e=>{const o=missionOutcomes[e.from] as Outcome;const msg=e[o as keyof typeof e] as string;return<div key={e.from} className={`crossEffectBanner ${o}`}><span className="crossEffectIcon">{o==="positive"?"✓":"!"}</span><p><strong>{t.crossEffectLabel} · {language==="it"?missionCatalog[e.from].it:missionCatalog[e.from].en}:</strong> {msg}</p></div>})}</div>}<p className="storyText">{(active.briefing as string).replace("COMPANY_NAME",displayCompanyName).replace("PLANTS_COUNT",String(companyDims[1]))}</p><div className="objectiveBox"><small>{t.objective}</small><p>{active.objectiveText}</p></div><button className="actionButton" onClick={()=>{if(selectedMission===0){setPmMissionFilter(0);setPmFromBriefing(true);setScreen("priorityMatrix");}else{setScreen("introCopy2");}}}>{t.analyse}<b>→</b></button></>;})()}
    {screen==="asis"&&(()=>{const ratingVal={"alto":25,"medio":12,"basso":0};const currentRatings=asIsRatings[selectedMission]||(active.asIsItems.map(()=>"alto" as "alto"|"medio"|"basso"));const total=currentRatings.reduce((s,r)=>s+ratingVal[r],0);const totalColor=total<=25?"#39efb4":total<=50?"#f5c542":"#ff6b6b";const totalLabel=language==="it"?(total<=25?"BASSA":total<=50?"MEDIA":"ALTA"):(total<=25?"LOW":total<=50?"MEDIUM":"HIGH");const setRating=(i:number,v:"alto"|"medio"|"basso")=>{const next=[...currentRatings];next[i]=v;setAsIsRatings({...asIsRatings,[selectedMission]:next});};return<><div className="asisHeader"><div><p className="resultEyebrow">{t.asIsKicker}</p><h1>{active.asIsTitle}</h1></div></div><p className="storyText asisIntroText">{(active.asIsIntro as string).replace("COMPANY_NAME",displayCompanyName)}</p><div className="asIsRatingGrid">{active.asIsItems.map((item,i)=>{const r=currentRatings[i];return<article key={item.title} className={`asIsRatingCard asIsRating-${r}`}><div className="asIsRatingCardTop"><h2>{item.title}</h2><p>{item.detail}</p></div><div className="asIsRatingButtons"><button className={`asIsRatingBtn${r==="alto"?" asIsRatingBtnActive asIsRatingBtnAlto":""}`} onClick={()=>setRating(i,"alto")}>{language==="it"?"Alto":"High"}</button><button className={`asIsRatingBtn${r==="medio"?" asIsRatingBtnActive asIsRatingBtnMedio":""}`} onClick={()=>setRating(i,"medio")}>{language==="it"?"Medio":"Medium"}</button><button className={`asIsRatingBtn${r==="basso"?" asIsRatingBtnActive asIsRatingBtnBasso":""}`} onClick={()=>setRating(i,"basso")}>{language==="it"?"Basso":"Low"}</button></div></article>})}</div><div className="asisTotal"><span className="asisTotalLabel">{language==="it"?"Criticità totale":"Total criticality"}</span><span className="asisTotalScore" style={{color:totalColor}}>{total}<span className="asisTotalMax">/100</span></span><span className="asisTotalBadge" style={{color:totalColor,borderColor:totalColor}}>{totalLabel}</span></div><button className="actionButton asisBottomBtn" onClick={()=>setScreen("compare")}>{t.proceedDecision}<b>→</b></button></>;})()}
    {screen==="decision"&&(()=>{
      const ratingVal={"alto":25,"medio":12,"basso":0};
      const currentRatings=asIsRatings[selectedMission]||(active.asIsItems.map(()=>"alto" as "alto"|"medio"|"basso"));
      const critTotal=currentRatings.reduce((s:number,r:string)=>s+ratingVal[r as keyof typeof ratingVal],0);
      const critColor=critTotal<=25?"#39efb4":critTotal<=50?"#f5c542":"#ff6b6b";
      const critLabel=language==="it"?(critTotal<=25?"BASSA":critTotal<=50?"MEDIA":"ALTA"):(critTotal<=25?"LOW":critTotal<=50?"MEDIUM":"HIGH");
      return <><h1>{t.decisionTitle}</h1><p className="storyText">{active.decisionIntro}</p><div className="decisionList"><button onClick={()=>handleDecision("positive")}><span>A</span><div><strong>{active.optionA}</strong><small>{active.optionADetail}</small>{selectedMission!==0&&<span className="decisionPrereqNote"><b>⬡</b>{t.prereqNoteLabel}: {t.prereqNoteText}</span>}</div><b>↗</b></button><div className="decisionCritWrap"><div className="decisionCritBanner" style={{borderColor:critColor}}><span className="decisionCritLabel" style={{color:critColor}}>{language==="it"?"Criticità AS-IS":"AS-IS Criticality"}</span><span className="decisionCritScore" style={{color:critColor}}>{critTotal}<span className="decisionCritMax">/100</span></span><span className="decisionCritBadge" style={{color:critColor,borderColor:critColor}}>{critLabel}</span></div><div className="decisionCritSpacer"/><div className="decisionCritSpacer"/><button onClick={()=>handleDecision("warning")}><span>B</span><div><strong>{active.optionB}</strong><small>{active.optionBDetail}</small></div><b>↗</b></button></div><button onClick={()=>handleDecision("critical")}><span>C</span><div><strong>{active.optionC}</strong><small>{active.optionCDetail}</small></div><b>↗</b></button></div></>;
    })()}
    {screen==="trust"&&<><p className="resultEyebrow">{t.trustKicker}</p><h1>{t.trustTitle}</h1><p className="storyText">{activeTrustIntro}</p>{activeTrustSources&&activeTrustSources.length>0&&<p className="trustSourceList">{language==="it"?"Fonti: ":"Sources: "}{activeTrustSources.map((s,i)=><><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>{i<activeTrustSources.length-1&&" · "}</>)}</p>}<div className="trustEvolutionChart"><small className="trustChartLabel">{language==="it"?"Evoluzione missione per missione":"Mission-by-mission evolution"}</small><svg width="100%" viewBox={"0 0 "+trustTotalW+" "+(TRUST_CHART_H+40)} preserveAspectRatio="xMidYMid meet">{[30,50,70,100].map(v=>{const y=4+TRUST_CHART_H-(v/100)*TRUST_CHART_H;return<g key={v}><line x1={TRUST_SVG_PAD_X} x2={trustTotalW-TRUST_SVG_PAD_X} y1={y} y2={y} stroke="#1e3a30" strokeWidth="1" strokeDasharray="3 4"/><text x={TRUST_SVG_PAD_X-2} y={y+4} fontSize="8" fill="#4a6d60" textAnchor="end">{v}</text></g>;})} {trustSteps.map((s,i)=>{const x=TRUST_SVG_PAD_X+i*(TRUST_BAR_W+TRUST_BAR_GAP);const isEmpty=s.val===null;const barH=isEmpty?12:(s.val!/100)*TRUST_CHART_H;const barY=4+TRUST_CHART_H-barH;return<g key={i}>{s.isCurrent&&<rect x={x-5} y={4} width={TRUST_BAR_W+10} height={TRUST_CHART_H+8} rx="8" fill="rgba(57,239,180,0.07)" stroke={s.fill==="none"?"#39efb4":s.fill} strokeWidth="1.5" strokeDasharray={s.fill==="none"?"4 3":"0"}/>}<rect x={x} y={isEmpty?barY+barH-12:barY} width={TRUST_BAR_W} height={isEmpty?12:barH} rx="5" fill={isEmpty?"none":s.fill} stroke={s.stroke} strokeWidth={s.strokeW} opacity={isEmpty?1:0.92}/>{!isEmpty&&<text x={x+TRUST_BAR_W/2} y={barY-5} fontSize="11" fill={i===0?"#7fa898":s.isCurrent?"#f2fff9":"#c9e8dc"} textAnchor="middle" fontWeight={s.isCurrent?"700":"400"}>{s.val}</text>}{isEmpty&&<text x={x+TRUST_BAR_W/2} y={barY+barH/2+5} fontSize="9" fill="#3d6052" textAnchor="middle">—</text>}<text x={x+TRUST_BAR_W/2} y={4+TRUST_CHART_H+18} fontSize="8" fill={s.isCurrent?"#8affda":isEmpty?"#3d6052":"#7da89a"} textAnchor="middle">{s.label.split("\n")[0]}</text>{s.label.split("\n")[1]&&<text x={x+TRUST_BAR_W/2} y={4+TRUST_CHART_H+28} fontSize="8" fill={s.isCurrent?"#8affda":isEmpty?"#3d6052":"#7da89a"} textAnchor="middle">{s.label.split("\n")[1]}</text>}</g>;})} </svg></div><div className="trustPanel"><div className="trustScoreCard"><small>{t.trustScore}</small><strong>{trustScore}</strong><span>{t.trustBase}: 30 · {t.trustMax}</span><div className="trustBar"><span style={{width:trustScore+"%"}}/></div><p>{t.trustProgressLabel}</p></div><div className="trustStakeholders"><small>{t.trustStakeholders}</small><div><span>{t.trustBoard}</span><span>{t.trustBanks}</span><span>{t.trustClients}</span><span>{t.trustAuditors}</span></div></div><div className="trustGainCard"><small>{t.trustCurrentDecision}</small><strong>{missionOutcomes[selectedMission]==="positive"?(selectedMission===0?(language==="it"?"Scelta fondante · +25":"Foundational choice · +25"):t.trustGainPositive):missionOutcomes[selectedMission]==="warning"?t.trustGainWarning:t.trustGainCritical}</strong><p>{t.trustPersonaLabel}</p><b>{name}</b><span>{profile==="marco"?t.maleRole:t.femaleRole}</span></div></div></>}

    {result&&<><p className="resultEyebrow">{screen==="success"?active.enviziValue:t.impact}</p><h1>{screen==="success"?active.successTitle:negativeChoice==="form"?active.warningTitle:active.criticalTitle}</h1><p className="storyText">{screen==="success"?active.successText:negativeChoice==="form"?active.warningText:active.criticalText}</p>{screen==="success"&&<div className="enviziFactChip"><span className="efcNumber">40.000+</span><div className="efcText"><span className="efcLabel">{t.efcLabel}</span><span className="efcDetail">{t.efcByMission[selectedMission]}</span><span className="efcSource"><a href="https://www.ibm.com/docs/it/envizi-esg-suite?topic=reference-emission-factors" target="_blank" rel="noreferrer">{language==="it"?"Libreria fattori Envizi ↗":"Envizi factor library ↗"}</a>{" · "}<span>{language==="it"?"Compatibile anche con ecoinvent":"Also compatible with ecoinvent"}</span></span></div></div>}<div className="metrics"><div><span>{active.metricLabels[0]}</span><strong>{resultValues[0]}</strong></div><div><span>{active.metricLabels[1]}</span><strong>{resultValues[1]}</strong></div><div><span>{active.metricLabels[2]}</span><strong>{resultValues[2]}</strong></div></div><blockquote className="boardQuote"><small>{t.boardQuoteLabel} · CFO, {displayCompanyName}</small><p>"{t.boardQuotes[selectedMission][screen==="success"?"positive":negativeChoice==="form"?"warning":"critical"]}"</p></blockquote><button className="actionButton" onClick={()=>setScreen(selectedMission===0?"milestone":"missions")}>{t.backScenarios}<b>→</b></button>{screen==="success"&&renderSaveBtn(language==="it")}</>}
  </section></main>}


  if(screen==="cover")return <main className="coverScreen" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><img className="coverImage" src="./cover-marco.png" alt="Envizi Impact Quest"/><div className="coverCta"><button className="coverStartBtn" onClick={()=>setScreenState("welcome")}>START</button></div></main>;

  if(screen==="welcome"){
    const isIt=language==="it";
    // Leggi tutte le quest salvate con i dati
    const allSavedKeys=getSavedQuestKeys();
    const allSaved=allSavedKeys.map(k=>{
      let d:any={};
      try{d=JSON.parse(localStorage.getItem(`envizi-quest-save-${k}`)||"{}");}catch(e){}
      return {key:k,userName:(d.userName||"") as string,missionOutcomes:d.missionOutcomes||{}};
    });
    // Utenti unici case-insensitive (mantiene prima occorrenza, ordina)
    const knownUsers=(()=>{const seen=new Set<string>();const out:string[]=[];for(const s of allSaved){const u=s.userName.trim();if(u&&!seen.has(u.toLowerCase())){seen.add(u.toLowerCase());out.push(u);}}return out.sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));})();
    // Suggerimenti utente: match parziale sul campo (esclude match esatto case-insensitive)
    const userSuggestions=knownUsers.filter(u=>userName.trim()&&u.toLowerCase().includes(userName.trim().toLowerCase())&&u.toLowerCase()!==userName.trim().toLowerCase());
    // Quest filtrate per utente corrente (match esatto, case-insensitive)
    const userQuests=userName.trim()
      ? allSaved.filter(s=>s.userName.toLowerCase()===userName.trim().toLowerCase())
      : [];
    return <main className="welcomeScreen" style={{position:"relative"}}>
      <div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div>
      <img src="./welcome-gen.png" alt="" className="welcomeBg" aria-hidden="true"/>
      <div className="welcomeBgOverlay"/>
      <header className="missionNav" style={{position:"relative",zIndex:3}}>
        <div className="brand"><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></div>
        <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
          <button className="secondaryAction" style={{fontSize:"clamp(11px,1vw,14px)",padding:"8px 16px"}} onClick={()=>setScreenState("cover")}>← {isIt?"Indietro":"Back"}</button>
          <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
        </div>
      </header>
      <div className="welcomePanel">
        {/* LEFT: form */}
        <div className="welcomeLeft">
          <p className="eyebrow">IBM ENVIZI · IMPACT QUEST</p>
          <h1 className="welcomeTitle">{isIt?"Benvenuto alla Envizi Quest":"Welcome to Envizi Quest"}</h1>
          <p className="welcomeSubtitle">{isIt?"Inserisci il tuo nome o selezionane uno esistente per vedere le tue quest salvate.":"Enter your name or pick an existing one to see your saved quests."}</p>
          <div className="welcomeForm">
            {/* Campo nome con suggerimenti utenti */}
            <div className="welcomeField" style={{position:"relative"}}>
              <label className="welcomeLabel">{isIt?"Il tuo nome":"Your name"}</label>
              <input
                className="welcomeInput"
                type="text"
                placeholder={isIt?"Es. Felice Petrignano":"E.g. Felice Petrignano"}
                value={userName}
                onChange={e=>setUserName(e.target.value)}
                autoComplete="off"
              />
              {/* Dropdown suggerimenti utenti esistenti */}
              {userSuggestions.length>0&&(
                <ul className="welcomeUserSuggestions">
                  {userSuggestions.map(u=>(
                    <li key={u}>
                      <button className="welcomeUserSuggBtn" onClick={()=>setUserName(u)}>
                        <span className="welcomeUserSuggIcon">👤</span>{u}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {/* Pill con tutti gli utenti noti (se il campo è vuoto) */}
              {!userName.trim()&&knownUsers.length>0&&(
                <div className="welcomeKnownUsers">
                  {knownUsers.map(u=>(
                    <button key={u} className="welcomeUserPill" onClick={()=>setUserName(u)}>{u}</button>
                  ))}
                </div>
              )}
            </div>
            {/* Campo nome quest */}
            <div className="welcomeField">
              <label className="welcomeLabel">{isIt?"Nome della Quest (per il salvataggio)":"Quest name (for saving)"}</label>
              <input className="welcomeInput" type="text" placeholder={isIt?"Es. NovaForge — sessione 1":"E.g. NovaForge — session 1"} value={questName} onChange={e=>setQuestName(e.target.value)}/>
            </div>
            {userName.trim()&&questName.trim()&&(
              <button className="actionButton welcomeStartBtn" onClick={()=>{if(questName.trim())saveQuest(questName.trim());setScreenState("onboarding");}}>
                {isIt?"Inizia la Quest →":"Start the Quest →"}
              </button>
            )}
          </div>
          <div className="welcomeNote">
            <span className="welcomeNoteIcon">ℹ</span>
            <p>{isIt?"Per recuperare utenti e Quest precedentemente registrati, collegati dal medesimo browser utilizzato in precedenza.":"To retrieve previously registered users and Quests, connect from the same browser used before."}</p>
          </div>
        </div>
        {/* RIGHT: quest dell'utente corrente */}
        <div className="welcomeRight">
          {userName.trim()?(
            <>
              <p className="welcomeSavedTitle">
                {isIt?"Quest di":"Quests for"} <strong style={{color:"#39efb4"}}>{userName.trim()}</strong>
              </p>
              <button className="welcomeUserBackBtn" onClick={()=>setUserName("")}>← {isIt?"Cambia utente":"Change user"}</button>
              {userQuests.length===0?(
                <p className="welcomeEmpty">{isIt?"Nessuna Quest salvata per questo utente.":"No saved quests for this user."}</p>
              ):(
                <ul className="welcomeSavedList">
                  {userQuests.map(({key,missionOutcomes:mo})=>{
                    const completed=Object.keys(mo).length;
                    return <li key={key} className="welcomeSavedItem">
                      <div className="welcomeSavedInfo">
                        <strong>{key}</strong>
                        <small>{isIt?`${completed}/6 missioni`:`${completed}/6 missions`}</small>
                      </div>
                      <div className="welcomeSavedActions">
                        <button className="welcomeLoadBtn" onClick={()=>{loadQuest(key);setScreenState("onboarding");}}>{isIt?"Riprendi →":"Resume →"}</button>
                        <button className="welcomeDownloadBtn" title={isIt?"Salva come file .envizi-quest (controlla la cartella Download del browser)":"Save as .envizi-quest file (check your browser Downloads folder)"} onClick={()=>downloadQuest(key)}>⬇</button>
                        <button className="welcomeDeleteBtn" onClick={()=>{deleteQuest(key);setScreenState("cover");setTimeout(()=>setScreenState("welcome"),10);}}>✕</button>
                      </div>
                    </li>;
                  })}
                </ul>
              )}
              {/* Upload zone */}
              <div className="welcomeUploadZone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)uploadQuestFile(f);}}>
                <input id="welcomeUploadInput" type="file" accept=".envizi-quest,.json" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)uploadQuestFile(f);e.target.value="";}}/>
                <button className="welcomeUploadBtn" onClick={openUploadPicker}>
                  <span className="welcomeUploadIcon">⬆</span>
                  <span className="welcomeUploadText">{isIt?"Importa una Quest (.envizi-quest)":"Import a Quest (.envizi-quest)"}</span>
                </button>
                <span className="welcomeUploadHint">{isIt?"Scegli cartella o trascina il file qui":"Choose folder or drag file here"}</span>
              </div>
            </>
          ):(
            <>
              <p className="welcomeSavedTitle">{isIt?"Quest salvate":"Saved quests"}</p>
              {allSaved.length===0
                ?<p className="welcomeEmpty">{isIt?"Nessuna Quest salvata ancora.":"No saved quests yet."}</p>
                :<ul className="welcomeSavedList">
                  {allSaved.map(({key,userName:u,missionOutcomes:mo})=>{
                    const completed=Object.keys(mo).length;
                    return <li key={key} className="welcomeSavedItem">
                      <div className="welcomeSavedInfo">
                        <strong>{key}</strong>
                        <small>{u?`${u} · `:""}{isIt?`${completed}/6 missioni`:`${completed}/6 missions`}</small>
                      </div>
                      <div className="welcomeSavedActions">
                        <button className="welcomeLoadBtn" onClick={()=>{loadQuest(key);setScreenState("onboarding");}}>{isIt?"Riprendi →":"Resume →"}</button>
                        <button className="welcomeDeleteBtn" onClick={()=>{deleteQuest(key);setScreenState("cover");setTimeout(()=>setScreenState("welcome"),10);}}>✕</button>
                      </div>
                    </li>;
                  })}
                </ul>
              }
            </>
          )}
        </div>
      </div>
    </main>;
  }


  return <main className="onboarding" style={{position:"relative"}}><div className="slideLockBadge" title="Slide bloccata — non modificare">✕</div><div className="ambient ambientOne"/><div className="ambient ambientTwo"/><header className="topbar"><div className="brand"><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></div></header><section className="introPanel"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="intro">{t.intro}</p><p className="thread">{t.sameStory}</p><p className="authorDisclaimer">{t.disclaimer}<a href="mailto:felice_petrignano@it.ibm.com">felice_petrignano@it.ibm.com</a></p><button className="secondaryAction" style={{fontSize:"clamp(11px,1vw,14px)",padding:"8px 16px",marginTop:"18px",alignSelf:"flex-start"}} onClick={()=>setScreenState("welcome")}>← {language==="it"?"Indietro":"Back"}</button></section><section className="choicePanel"><div className="choiceHeading"><div><span className="choiceNumber">01</span><h2>{t.language}</h2></div><div className="languageSwitch"><button className={language==="it"?"active":""} onClick={()=>setLanguage("it")}>Italiano <span>🇮🇹</span></button><button className={language==="en"?"active":""} onClick={()=>setLanguage("en")}>English <span>🇬🇧</span></button></div></div><div className="profileSection"><div className="profileTitle profileTitleHighlighted"><span className="choiceNumber">02</span><h2>{t.profile}</h2></div><div className="profilesWrap"><div className="profiles profilesGuided">{(["marco","luisa"] as Profile[]).map(p=><div key={p} className="profileCardWrap"><button className={`profileCard ${profile===p?"selected":""}`} onClick={()=>setProfile(p)}><img src={`./characters/${p}-neutral.png`} alt={p==="marco"?"Marco Rossi":"Luisa Bianchi"}/><div className="profileInfo"><span className="statusDot"/><div><strong>{p==="marco"?"Marco Rossi":"Luisa Bianchi"}</strong><small>{p==="marco"?t.maleRole:t.femaleRole}</small></div></div></button><button className="profileChooseBtn" onClick={()=>{setProfile(p);localStorage.setItem("envizi-quest-profile",JSON.stringify({language,profile:p}));setScreen("intro");}}>{language==="it"?`Scegli ${p==="marco"?"Marco":"Luisa"}`:`Choose ${p==="marco"?"Marco":"Luisa"}`} →</button></div>)}</div></div></div><p className="bobCredit">{language==="it"?"Sviluppato con IBM Bob":"Developed with IBM Bob"}</p></section></main>;
}
