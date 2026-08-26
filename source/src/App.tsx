"use client";

import { useEffect, useState } from "react";
type Language = "it" | "en";
type Profile = "marco" | "luisa";
type Screen = "cover" | "onboarding" | "intro" | "approach" | "companySetup" | "missions" | "roadmapPreview" | "company" | "priorities" | "priorityData" | "bridge" | "briefing" | "missionIntro" | "asis" | "dataFoundation" | "dfConclusion" | "decision" | "compare" | "tobe" | "trust" | "negative" | "success" | "milestone" | "summary" | "nextStep" | "thankYou";
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
      "Alla base dei modelli di abatement: ogni scenario calcola la CO₂e evitata per iniziativa."
    ],
    boardQuoteLabel:"Voce del CdA",
    boardQuotes:[
      {positive:"Finalmente possiamo presentare una baseline ESG verificabile. È la base su cui costruire tutto il resto.",warning:"I form migliorano l'ordine, ma non la tracciabilità. Il CdA chiederà comunque le evidenze originali.",critical:"Rimandare significa rinunciare alla credibilità del dato per un altro anno. Non è una posizione sostenibile."},
      {positive:"I dati energetici strutturati dimostrano che stiamo investendo nella decarbonizzazione, non solo dichiarandola.",warning:"Un cruscotto manuale è un passo avanti, ma non genera gli alert e le azioni che il COO si aspetta.",critical:"Senza analisi sui contatori, gli sprechi continuano e non abbiamo nulla da mostrare agli investitori climatici."},
      {positive:"Avere dati Scope 3 credibili cambia il dialogo con i clienti e con chi ci finanzia. Siamo avanti rispetto ai concorrenti.",warning:"Un portale separato raccoglie risposte, ma non le integra nella contabilità GHG. Rimane un'isola.",critical:"Senza Scope 3 strutturato siamo fuori dai requisiti di qualifica di molti grandi clienti."},
      {positive:"Un reporting auditabile e conforme ai framework è ciò che separa un'azienda affidabile da una che si limita a dichiarare.",warning:"I template aiutano, ma i calcoli GHG restano disconnessi. L'assurance esterna sarà difficile da ottenere.",critical:"Costruire il reporting ogni anno da zero non è scala. Il CdA non può approvare quello che non può verificare."},
      {positive:"Avere scenari quantificati e programmi verificabili è l'unico modo per difendere il piano Net Zero davanti agli investitori.",warning:"Un portafoglio su foglio mostra le intenzioni, ma non dimostra l'esecuzione. Non regge a un'analisi esterna.",critical:"Senza un piano di decarbonizzazione credibile perdiamo accesso ai finanziamenti legati agli obiettivi climatici."}
    ],
    crossEffectLabel:"Effetto della scelta precedente",
    crossEffects:[
      [],
      [{from:0,positive:"La Data Foundation di M1 alimenta direttamente le analisi energetiche: i dati dei contatori e delle bollette si integrano nella stessa fonte verificabile.",warning:"La soluzione a form di M1 rende più difficile normalizzare i dati energetici: le sedi useranno formati diversi.",critical:"Senza baseline ESG di M1, i risparmi energetici non sono confrontabili con nessun punto di riferimento verificabile."}],
      [{from:0,positive:"Con la Data Foundation attiva, i dati Scope 3 dei fornitori si integrano nella stessa piattaforma senza riconciliazioni aggiuntive.",warning:"Senza una fonte dati centrale di M1, le risposte dei fornitori rimangono isolate e non entrano nei calcoli GHG.",critical:null}],
      [{from:0,positive:"Il reporting può attingere direttamente ai dati verificabili già raccolti: nessuna riconciliazione tra sistemi.",warning:"Con i form di M1, il team dovrà riconciliare manualmente i dati prima di ogni ciclo di reporting.",critical:"Senza baseline di M1, il reporting ESG si basa su stime: un rischio significativo per l'assurance esterna."},
       {from:1,positive:"I dati energetici strutturati di M2 entrano direttamente nei calcoli Scope 1–2 senza ulteriori elaborazioni.",warning:null,critical:"Senza dati energetici strutturati di M2, i consumi negli stabilimenti restano aggregati e non auditabili per sito."}],
      [{from:0,positive:"La baseline Envizi di M1 è il punto di partenza degli scenari what-if: i forecast partono da dati verificati.",warning:"Con i form di M1, la baseline di emissioni su cui costruire gli scenari è approssimativa.",critical:"Senza baseline di M1, qualsiasi modello Net Zero si basa su stime: il CdA non potrà validare il gap da colmare."},
       {from:1,positive:"I dati energetici di M2 alimentano direttamente i modelli di abatement: i risparmi calcolati sono confrontabili con gli obiettivi.",warning:null,critical:null}]
    ],
    asiaOffice:"ASIA · 1 SEDE UFFICIO", europeOffices:"EUROPA · 3 UFFICI", hqShort:"HQ · MILANO",
    introKicker:"La tua sfida", introTitle:"Guadagna la fiducia.", introBody:"Il tuo obiettivo è conquistare la fiducia di CdA, Finanziatori, Clienti e Auditor. Ogni scelta influenza reputazione, accesso ai capitali e crescita del business. Raccogli punti fiducia e sblocca il livello \"Trusted ESG Leader\".", introScoreLabel:"Punteggio fiducia attuale", introLegend:"Decisioni Envizi +15 · Intermedie +7 · Rimandare +0", introStart:"Inizia il Quest", trustedLabel:"Trusted ESG Leader", trustLabel:"Fiducia stakeholder",
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
    approachQuestCallout:"Durante la Quest valuteremo come IBM Envizi risponda sia alle esigenze di cambiamento delle persone, attraverso un’interfaccia intuitiva e il supporto dell’AI che guida gli utenti, sia alla necessità di gestire dati ESG complessi, confrontando questa soluzione con le alternative più comunemente adottate dalle aziende. L’impatto di ogni scelta sarà misurato attraverso un intuitivo punteggio di fiducia degli stakeholder: banche, clienti, CdA e auditor.",
    approachQuestCta:"Iniziamo la quest",
    asIsEditHint:"I valori sono pre-compilati con i parametri dello scenario. Puoi modificarli con i dati reali della tua organizzazione.",

    backScenarios:"Torna agli scenari", summaryCta:"Guarda il cruscotto finale", summaryKicker:"Il lavoro svolto", summaryTitle:"La tua roadmap ESG", summaryIntro:"Una panoramica per rileggere priorità, decisioni, impatti attesi e le esigenze di dati associate a ogni blocco prima del prossimo passo.", topPriorities:"I primi 3 obiettivi di business", parameters:"Esigenze di dati associate", backOne:"Indietro", backStart:"Torna all'inizio", nextStep:"Passiamo al prossimo passo", nextKicker:"Prossimo passo", nextTitle:"Porta i tuoi dati ESG al livello successivo.", nextSiteLabel:"Scopri IBM Envizi", nextSiteIntro:"La piattaforma SaaS per raccogliere, gestire e rendicontare i dati ESG con qualità e auditabilità.", nextSiteButton:"Visita il sito IBM Envizi →", nextDemoLabel:"Chiedi una demo", nextDemoIntro:"Inserisci l'email del tuo contatto IBM o Partner di fiducia. Se non hai un riferimento, scrivici direttamente: troveremo insieme la soluzione giusta.", nextDemoEmailPlaceholder:"Email contatto IBM o Partner", nextDemoButton:"Richiedi una demo →", nextDemoFallback:"Nessun contatto? Scrivi a Felice →", nextPocLabel:"Proof of Concept", nextPocIntro:"Porta i tuoi dati reali nella piattaforma: un PoC su misura per vedere IBM Envizi all'opera nel tuo contesto specifico, prima di qualsiasi decisione di investimento.", nextPocButton:"Chiedi un PoC →", nextBvaLabel:"Business Value Assessment", nextBvaIntro:"Quantifica il valore che IBM Envizi può generare per la tua organizzazione: risparmio di tempo, riduzione del rischio e impatto sul costo del capitale ESG.", nextBvaButton:"Richiedi un BVA →", nextContactLabel:"Il tuo riferimento IBM", nextContactName:"Felice Petrignano", nextContactRole:"Senior ESG Solution Engineer and Advisor", nextContactEmail:"", thankYouTitle:"Grazie / Thank you", prereqNoteLabel:"PREREQUISITO", prereqNoteText:"Richiede IBM Envizi Data Foundation (Missione 01)", prereqLabel:"PREREQUISITO NON SODDISFATTO", prereqText:"Per adottare IBM Envizi in questo scenario è necessario aver attivato la Data Foundation nella Missione 01 — Fabbrica dei dati ESG.", prereqLinkLabel:"Vai alla Missione 01 →", tobeKicker:"Proiezione TO BE", tobeTitle:"Come cambiano i tuoi parametri.", tobeSubtitle:"Stima dell'impatto atteso · 12 mesi", tobeAsIs:"AS-IS attuale", tobeToBe:"TO BE stimato", tobeDelta:"Variazione attesa", tobeDisclaimer:"Le stime TO BE sono proiezioni indicative basate su casistiche di adozione IBM Envizi. I benefici effettivi dipendono da contesto, perimetro e maturità dei processi. Non costituiscono garanzia di risultato.", tobeCta:"Vedi l'impatto sulla fiducia", trustKicker:"Indicatore di fiducia", trustTitle:"Quale l'impatto delle decisioni ESG data sulla fiducia?", trustIntro:"In questa fase il mercato valuta governance, solidità esecutiva e qualità del dato. Ogni scelta modifica il livello di fiducia con cui CdA, banche, clienti e auditor leggeranno il piano ESG.", trustScore:"Indice di fiducia", trustBase:"Baseline iniziale", trustMax:"Soglia massima 100", trustStakeholders:"Perimetro di lettura", trustBoard:"CdA", trustBanks:"Banche", trustClients:"Clienti", trustAuditors:"Auditor", trustGainPositive:"Scelta strategicamente solida · +15", trustGainWarning:"Scelta accettabile ma non scalabile · +7", trustGainCritical:"Scelta difensiva senza creazione di fiducia · +0", trustContinue:"Torna alle missioni", trustCurrentDecision:"Lettura del CdA", trustProgressLabel:"Fiducia cumulata sulla roadmap", trustPersonaLabel:"Responsabile della decisione",
    roadmapKicker:"La tua roadmap", roadmapTitle:"Dalle esigenze alle sfide decisionali.", roadmapIntro:"Ogni esigenza di dati è associata a una sfida. Affronta gli scenari nell'ordine che preferisci: ogni decisione costruisce la tua roadmap ESG.", missionReview:"Approfondisci", roadmapProgress:"Roadmap completata", moveLeft:"Sposta a sinistra", moveRight:"Sposta a destra", adoptedDecision:"Decisione adottata", expectedImpact:"Impatto atteso", decisionLabels:{positive:"Data Foundation IBM Envizi",warning:"Soluzione “semplice” basata su form non integrata con le fonti",critical:"Rimandare al prossimo esercizio"}, outcomeLabels:{positive:"−62% tempo di reporting · +34% qualità dati",warning:"−12% tempo di reporting · +8% qualità dati · beneficio limitato",critical:"Nessun miglioramento · fiducia del CdA bassa e invariata"},
    benchmarkLabel:"Riferimento scenario", yourValue:"I tuoi parametri attuali", sourceLabel:"Fonte metodologica IBM Envizi", benchmarkNote:"I numeri sono ipotesi di scenario, non benchmark di settore. La fonte descrive l'approccio Envizi a raccolta, qualità e auditabilità dei dati.",
    dataQuality:"Qualità dei dati", reportingTime:"Tempo di reporting", confidence:"Fiducia del management", successTitle:"Una Data Foundation pronta a crescere.", eyebrow:"IBM ENVIZI · IMPACT EXPERIENCE", title:"Ogni dato cambia la storia.", intro:"Entra nei panni di un ESG Manager. Affronta decisioni reali, misura gli impatti e guida l’azienda verso obiettivi credibili.", language:"Scegli la lingua", profile:"Scegli il tuo profilo", maleRole:"ESG Manager · Operations", femaleRole:"ESG Manager · Strategy", start:"Entra nell’azienda", select:"Seleziona un profilo per continuare", sameStory:"Una storia · Due protagonisti · Impatti reali", disclaimer:"Questa esperienza è stata ideata e realizzata da Felice Petrignano, Senior ESG Solution Engineer and Advisor, sulla base della propria esperienza e prospettiva professionale. I contenuti esprimono valutazioni personali e non rappresentano necessariamente posizioni ufficiali di IBM.",
    mission0QuestionKicker:"SFIDA · MISSIONE 01",mission0Question:"Quale scelta per la gestione dei dati ESG?",mission0QuestionBody:"Di fronte a dati provenienti da sedi, impianti e funzioni diverse, spesso raccolti tramite fogli Excel e processi manuali, quale approccio è più adatto alle esigenze attuali e future di COMPANY_NAME, considerando qualità, tracciabilità, impegno richiesto e capacità di crescere nel tempo?",mission0Cta:"Entra nella sfida →", missionMenuKicker:"Scegli la tua sfida", missionMenuTitle:"Da dove vuoi iniziare?", missionMenuIntro:"Cinque missioni, un’unica trasformazione. Scegli lo scenario più vicino alle priorità del tuo cliente.", missionSelect:"Avvia missione", missionDuration:"8–12 MIN", missionStartHere:"PARTI DA QUI", missionLocked:"Disponibile dopo la Data Foundation", companyIntro:"La tua azienda", companyTitle:"COMPANY_NAME", companyStory:"Un gruppo manifatturiero internazionale da 400 milioni di euro, nato in Italia e cresciuto attraverso otto stabilimenti e cinque sedi operative.", evolving:"COMPANY_NAME sta evolvendo verso un modello ESG per rispondere alle nuove esigenze di banche, regolatori, clienti e mercati, trasformando dati frammentati in decisioni affidabili.", revenue:"Fatturato annuo", plants:"Stabilimenti", offices:"Sedi uffici", people:"Dipendenti", explore:"Definisci le priorità ESG", europe:"EUROPA · 6 STABILIMENTI", usa:"USA · 1 STABILIMENTO", asia:"ASIA · 1 STABILIMENTO", hq:"HEADQUARTERS · MILANO", officeLabel:"5 SEDI UFFICI",
    priorityKicker:"Prima di iniziare", priorityTitle:"Quali sono gli obiettivi prioritari di business per l'ESG?", priorityIntro:"Metti in ordine le priorità che stanno spingendo COMPANY_NAME verso l'ESG. Non esiste una risposta universale: la tua classifica orienterà la lettura degli impatti.", moveUp:"Sposta su", moveDown:"Sposta giù", confirm:"Conferma le priorità", priorityNames:{credit:"Accesso al credito",compliance:"Compliance e reporting",customers:"Clienti e gare",efficiency:"Efficienza, energia e costi",supply:"Resilienza della supply chain",reputation:"Reputazione e attrazione talenti"}, priorityDetails:{credit:"Condizioni di finanziamento e dialogo con le banche",compliance:"Dati verificabili per CSRD, ESRS e richieste di audit",customers:"Trasparenza richiesta nelle qualifiche e nei capitolati",efficiency:"Riduzione di consumi, sprechi e volatilità energetica",supply:"Rischi, Scope 3 e continuità dei fornitori",reputation:"Fiducia degli stakeholder e capacità di attrarre competenze"},
    bridgeKicker:"Da qui in avanti", bridgeTitle:"Cinque decisioni. Una trasformazione.", bridgeIntro:"Hai definito le priorità e le esigenze di dati. Ora affronterai cinque scenari reali: per ognuno dovrai scegliere come rispondere alla sfida. Ogni decisione accumula fiducia e costruisce la tua roadmap ESG.", bridgeCta:"Entra nella quest", bridgePrereqLabel:"PREREQUISITO · BLOCCO FONDANTE", bridgeCapLabel:"CAPACITÀ ULTERIORI",
    bridgeMissions:[
      {num:"01",label:"Fabbrica dei dati ESG",need:"Una fonte unica verificabile per emissioni, energia e reporting."},
      {num:"02",label:"Energia e decarbonizzazione",need:"Dati intervallari e analisi delle bollette per ridurre costi e sprechi."},
      {num:"03",label:"Coinvolgimento supply chain",need:"Scope 3 strutturato e risposte fornitori integrabili nella contabilità GHG."},
      {num:"04",label:"Prova del reporting",need:"Processi auditabili e calcoli GHG tracciabili per framework e assurance."},
      {num:"05",label:"Rotta verso Net Zero",need:"Scenari what-if e programmi di abbattimento verificabili nel tempo."}
    ],
    bridgeNote:"Puoi affrontare le missioni nell'ordine che preferisci. Le scelte si accumulano: ogni decisione influenza le successive.",
    priorityDataKicker:"Le tue esigenze di dati", priorityDataTitle:"Esigenze di dati e sfide associate", priorityDataIntro:"Hai definito le priorità e le esigenze di business. Ora per le prime tre priorità di business seleziona l'ordine di priorità delle esigenze di dati.", priorityDataCta:"Conferma priorità →",
    priorityDataNeeds:{
      credit:[
        {id:"credit-1",label:"Emissioni Scope 1, 2 e 3 verificabili e auditabili"},
        {id:"credit-2",label:"Indici ESG strutturati per il dialogo con banche e investitori"},
        {id:"credit-3",label:"Tracciabilità completa dalla fonte al report finale"},
        {id:"credit-4",label:"Rating ESG comparabili con i peer di settore"},
        {id:"credit-5",label:"Disclosure allineata agli standard di rendicontazione finanziaria sostenibile (ESRS, ISSB)"}
      ],
      compliance:[
        {id:"compliance-1",label:"Calcoli GHG Scope 1–2 e Scope 3 tracciabili e riconciliabili"},
        {id:"compliance-2",label:"Workflow con assignee, approvazioni ed evidenze per l'assurance"},
        {id:"compliance-3",label:"Framework CSRD / ESRS e GRI aggiornati e gestiti nel sistema"},
        {id:"compliance-4",label:"Registro delle modifiche e audit trail per ogni dato ESG"},
        {id:"compliance-5",label:"Mappatura automatica delle informazioni materiali richieste dagli standard"}
      ],
      customers:[
        {id:"customers-1",label:"Dati Scope 3 per categoria GHG Protocol (acquisti, trasporti, prodotti)"},
        {id:"customers-2",label:"Risposte dei fornitori strutturate e integrabili nella contabilità GHG"},
        {id:"customers-3",label:"Product Carbon Footprint per le linee di prodotto rilevanti"},
        {id:"customers-4",label:"Documentazione ESG pronta per capitolati e qualifiche di gara"},
        {id:"customers-5",label:"Comparabilità delle prestazioni ambientali rispetto ai concorrenti"}
      ],
      efficiency:[
        {id:"efficiency-1",label:"Dati intervallari dei contatori digitali quasi in tempo reale"},
        {id:"efficiency-2",label:"Analisi delle bollette per sito, tariffa e voci di anomalia"},
        {id:"efficiency-3",label:"KPI energetici normalizzati per meteo e output produttivo"},
        {id:"efficiency-4",label:"Alert automatici su picchi, sprechi e consumi fuori orario"},
        {id:"efficiency-5",label:"Benchmarking dei consumi tra stabilimenti e verso target SBTi"}
      ],
      supply:[
        {id:"supply-1",label:"Dati Scope 3 cat. 1 (acquisti) e cat. 4 (trasporti upstream)"},
        {id:"supply-2",label:"Risposte fornitori su emissioni, conformità e continuità operativa"},
        {id:"supply-3",label:"Integrazione con i flussi ERP per coprire gli ordini di acquisto"},
        {id:"supply-4",label:"Valutazione del rischio ESG per fornitore e paese di origine"},
        {id:"supply-5",label:"Tracciabilità delle azioni correttive e dei piani di miglioramento dei fornitori"}
      ],
      reputation:[
        {id:"reputation-1",label:"Report ESG pronti per gli stakeholder, allineati ai framework pubblici"},
        {id:"reputation-2",label:"Dati verificabili su diversity, sicurezza e impatto sociale"},
        {id:"reputation-3",label:"Indicatori di performance comparabili nel tempo e tra sedi"},
        {id:"reputation-4",label:"Contenuti ESG strutturati per comunicazione esterna e sito istituzionale"},
        {id:"reputation-5",label:"Evidenze di avanzamento verso obiettivi Net Zero comunicabili agli stakeholder"}
      ]
    },
    mission:"Missione", missionTitle:"La fabbrica dei dati invisibili", companyFacts:"Manifattura · €400M · 8 stabilimenti", briefing:"Il CdA vuole una baseline ESG affidabile entro 90 giorni. I dati energetici e ambientali sono dispersi tra stabilimenti, fornitori e fogli di calcolo.", objective:"Il tuo obiettivo", objectiveText:"Creare un’unica fonte verificabile per emissioni, energia e reporting, senza rallentare le attività produttive.", analyse:"Esamina l’AS-IS", asIsKicker:"Fotografia attuale", asIsTitle:"Quattro criticità.\nUn solo problema di fondo.", asIsIntro:"Prima di scegliere una soluzione, osserva come COMPANY_NAME gestisce oggi i dati ESG.", asIsItems:[{title:"Fonti frammentate",detail:"Dati energetici, ambientali e di produzione distribuiti tra 8 stabilimenti, ERP, fatture ed e-mail.",metric:"12 FONTI"},{title:"Raccolta manuale",detail:"Ogni mese gli utenti copiano i valori in fogli diversi, con solleciti e controlli gestiti via e-mail.",metric:"180 ORE/MESE"},{title:"Regole incoerenti",detail:"Unità, fattori di emissione e perimetri cambiano tra sedi: confrontare i risultati richiede rilavorazioni.",metric:"17% ERRORI"},{title:"Audit lento",detail:"Ricostruire origine, modifica e approvazione di un dato richiede documenti separati e verifiche manuali.",metric:"6 SETTIMANE"}], proceedDecision:"Decisioni →", decisionTitle:"Quale strada scegli?", decisionIntro:"La scelta deve risolvere il problema di oggi senza crearne uno più grande tra dodici mesi.", optionA:"Adottare la Data Foundation IBM Envizi", optionADetail:"Integra le fonti dati, automatizza raccolta e controlli, riduce tempi ed errori e conserva una traccia verificabile.", optionB:"Soluzione “semplice”", optionBDetail:"Basata su form per gli utenti che sostituiscono visivamente i fogli, ma mantengono attività manuali, solleciti ed errori: tra un anno il volume non sarà più gestibile.", optionC:"Rimandare al prossimo esercizio", optionCDetail:"Evita costi immediati, ma lascia il CdA senza una baseline affidabile.", impact:"Impatto della decisione · 12 mesi dopo", negativeTitle:"Il nuovo form è diventato il nuovo foglio di calcolo.", negativeText:"L’interfaccia è cambiata, ma il processo è ancora manuale. Più utenti e più dati aumentano errori, ritardi e costi di controllo; le fonti restano scollegate.", postponeTitle:"Un anno perso, lo stesso problema più grande.", postponeText:"Le fonti e i volumi sono aumentati, mentre la baseline è ancora incompleta. Il CdA deve decidere senza dati affidabili e la pressione del reporting cresce.", successTitle:"Una Data Foundation pronta a crescere.", successText:"Envizi integra progressivamente le fonti degli otto stabilimenti, automatizza controlli e normalizzazioni e crea una traccia verificabile, riducendo tempi ed errori.", dataQuality:"Qualità dati", reportingTime:"Tempo reporting", confidence:"Fiducia del CdA", retry:"Rivedi la decisione", restart:"Cambia profilo", continue:"Continua la quest", backScenarios:"Torna al menu degli scenari", enviziValue:"VALORE ENVIZI SBLOCCATO · DATA FOUNDATION"
  },
  en: {
    formTitleUpdated:"A quick but limited benefit.", formTextUpdated:"Forms standardize data entry and reduce some errors compared with the current state. Manual work, reminders and disconnected sources remain; as volumes grow, the benefit plateaus and does not scale.", impactUpdated:"Change versus the current AS-IS · 12 months later", asIsTitleUpdated:"No step forward.", asIsTextUpdated:"Keeping the current AS-IS leaves data quality and reporting time unchanged, while Board confidence remains low. The cost of the choice is foregoing benefits and postponing the transformation.",
    successTextUpdated:"Envizi supports data entry via Excel templates and simple user-facing forms guided by workflows, and progressively integrates external data sources, such as utility bills and purchase invoices, and internal systems, such as ERP, HR and Asset Management; it automates controls and normalization and creates a verifiable trail, reducing time and errors.",
    efcLabel:"OVER 40,000 ENVIZI EMISSION FACTORS", efcByMission:[
      "Automatically mapped to utility bills, purchases, travel, waste, gas consumption and production assets.",
      "Matched to meter readings and line items in electricity, gas and district-heating bills.",
      "Applied to purchases by GHG Protocol category, from raw materials to upstream transport.",
      "Used in Scope 1–2 calculations and across all Scope 3 categories reported in disclosure frameworks.",
      "Underpinning abatement models: each scenario calculates avoided CO₂e per initiative."
    ],
    boardQuoteLabel:"Board voice",
    boardQuotes:[
      {positive:"We can finally present a verifiable ESG baseline. This is the foundation on which everything else is built.",warning:"Forms improve order, but not traceability. The Board will still ask for the original evidence.",critical:"Postponing means giving up data credibility for another year. That is not a sustainable position."},
      {positive:"Structured energy data demonstrates that we are investing in decarbonisation, not just declaring it.",warning:"A manual dashboard is a step forward, but it does not generate the alerts and actions the COO expects.",critical:"Without meter analytics, waste continues and we have nothing to show climate investors."},
      {positive:"Having credible Scope 3 data changes the conversation with customers and financiers. We are ahead of our peers.",warning:"A separate portal collects responses but does not integrate them into GHG accounting. It remains an island.",critical:"Without structured Scope 3 we are outside the qualification requirements of many major customers."},
      {positive:"Auditable reporting aligned with disclosure frameworks is what separates a credible company from one that merely declares.",warning:"Templates help, but GHG calculations remain disconnected. Obtaining external assurance will be difficult.",critical:"Rebuilding reporting from scratch every year does not scale. The Board cannot approve what it cannot verify."},
      {positive:"Quantified scenarios and verifiable programmes are the only way to defend the Net Zero plan in front of investors.",warning:"A spreadsheet portfolio shows intent but does not demonstrate execution. It will not withstand external scrutiny.",critical:"Without a credible decarbonisation plan we lose access to financing tied to climate targets."}
    ],
    crossEffectLabel:"Effect of the previous choice",
    crossEffects:[
      [],
      [{from:0,positive:"The M1 Data Foundation feeds directly into energy analytics: meter and bill data share the same verifiable source.",warning:"The M1 forms solution makes it harder to normalise energy data: sites will use different formats.",critical:"Without the M1 ESG baseline, energy savings cannot be compared against any verifiable reference point."}],
      [{from:0,positive:"With the Data Foundation active, supplier Scope 3 data integrates into the same platform without additional reconciliation.",warning:"Without a central data source from M1, supplier responses remain isolated and do not feed into GHG calculations.",critical:null}],
      [{from:0,positive:"Reporting can draw directly from the verifiable data already collected: no reconciliation between systems.",warning:"With M1 forms, the team will need to reconcile data manually before every reporting cycle.",critical:"Without the M1 baseline, ESG reporting relies on estimates — a significant risk for external assurance."},
       {from:1,positive:"The structured energy data from M2 feeds directly into Scope 1–2 calculations without further processing.",warning:null,critical:"Without structured energy data from M2, site-level consumption remains aggregated and cannot be audited by location."}],
      [{from:0,positive:"The M1 Envizi baseline is the starting point for what-if scenarios: forecasts are built on verified data.",warning:"With M1 forms, the emissions baseline on which scenarios are built is approximate.",critical:"Without the M1 baseline, any Net Zero model relies on estimates: the Board cannot validate the gap to close."},
       {from:1,positive:"The M2 energy data feeds directly into abatement models: calculated savings are comparable against targets.",warning:null,critical:null}]
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
    approachQuestCallout:"During the quest we will analyse your business needs and data challenges together. That is exactly what we are here to do.",
    approachQuestCta:"Let's start the quest",
    asIsEditHint:"Values are pre-filled with the scenario parameters. You can replace them with your organisation's actual data.",

    summaryCta:"View the final dashboard", summaryKicker:"Work completed", summaryTitle:"Your ESG roadmap", summaryIntro:"An overview to reflect on priorities, decisions, expected impacts and the data needs associated with each block before the next step.", topPriorities:"Top 3 business objectives", parameters:"Associated data needs", backOne:"Back", backStart:"Back to the beginning", nextStep:"Let's move to the next step", nextKicker:"Next step", nextTitle:"Take your ESG data to the next level.", nextSiteLabel:"Discover IBM Envizi", nextSiteIntro:"The SaaS platform to collect, manage and report ESG data with quality and auditability.", nextSiteButton:"Visit the IBM Envizi website →", nextDemoLabel:"Request a demo", nextDemoIntro:"Enter your IBM or trusted Partner contact email. If you don't have one, write to us directly — we'll find the right solution together.", nextDemoEmailPlaceholder:"IBM or Partner contact email", nextDemoButton:"Request a demo →", nextDemoFallback:"No contact? Write to Felice →", nextPocLabel:"Proof of Concept", nextPocIntro:"Bring your real data into the platform: a tailored PoC to see IBM Envizi in action within your specific context, before any investment decision.", nextPocButton:"Request a PoC →", nextBvaLabel:"Business Value Assessment", nextBvaIntro:"Quantify the value IBM Envizi can generate for your organisation: time savings, risk reduction and impact on ESG cost of capital.", nextBvaButton:"Request a BVA →", nextContactLabel:"Your IBM contact", nextContactName:"Felice Petrignano", nextContactRole:"Senior ESG Solution Engineer and Advisor", nextContactEmail:"", thankYouTitle:"Grazie / Thank you", backScenarios:"Back to scenarios", prereqNoteLabel:"PREREQUISITE", prereqNoteText:"Requires IBM Envizi Data Foundation (Mission 01)", prereqLabel:"PREREQUISITE NOT MET", prereqText:"To adopt IBM Envizi in this scenario you must first activate the Data Foundation in Mission 01 — ESG Data Factory.", prereqLinkLabel:"Go to Mission 01 →", tobeKicker:"TO BE projection", tobeTitle:"How your parameters will change.", tobeSubtitle:"Estimated impact · 12 months", tobeAsIs:"Current AS-IS", tobeToBe:"Estimated TO BE", tobeDelta:"Expected change", tobeDisclaimer:"TO BE estimates are indicative projections based on IBM Envizi adoption cases. Actual benefits depend on context, scope and process maturity. They do not constitute a guarantee of results.", tobeCta:"See the trust impact", trustKicker:"Trust indicator", trustTitle:"Why choose IBM Envizi?", trustIntro:"At this stage the market is assessing governance, execution credibility and data quality. Each choice changes the level of confidence with which the Board, banks, clients and auditors will read the ESG plan.", trustScore:"Trust index", trustBase:"Opening baseline", trustMax:"Ceiling 100", trustStakeholders:"Stakeholder lens", trustBoard:"Board", trustBanks:"Banks", trustClients:"Clients", trustAuditors:"Auditors", trustGainPositive:"Strategically strong decision · +15", trustGainWarning:"Acceptable but not scalable decision · +7", trustGainCritical:"Defensive decision with no trust creation · +0", trustContinue:"Back to missions", trustCurrentDecision:"Board reading", trustProgressLabel:"Trust accumulated across the roadmap", trustPersonaLabel:"Decision owner",
    roadmapKicker:"Your roadmap", roadmapTitle:"From identified needs to decision challenges.", roadmapIntro:"Each data need is linked to a challenge. Tackle the scenarios in any order: every decision builds your ESG roadmap.", missionReview:"Explore further", roadmapProgress:"Roadmap completed", moveLeft:"Move left", moveRight:"Move right", adoptedDecision:"Decision adopted", expectedImpact:"Expected impact", decisionLabels:{positive:"IBM Envizi Data Foundation",warning:"A “simple” forms-based solution not integrated with sources",critical:"Postpone until next year"}, outcomeLabels:{positive:"−62% reporting time · +34% data quality",warning:"−12% reporting time · +8% data quality · limited benefit",critical:"No improvement · Board confidence remains low"},
    benchmarkLabel:"Scenario reference", yourValue:"Your current parameters", sourceLabel:"IBM Envizi methodology source", benchmarkNote:"These figures are scenario assumptions, not industry benchmarks. The source describes the Envizi approach to data capture, quality and auditability.",
    dataQuality:"Data quality", reportingTime:"Reporting time", confidence:"Stakeholder confidence", successTitle:"A Data Foundation ready to scale.", eyebrow:"IBM ENVIZI · IMPACT EXPERIENCE", title:"Every data point changes the story.", intro:"Step into the role of an ESG Manager. Face real decisions, measure their impact and lead the company towards credible goals.", language:"Choose your language", profile:"Choose your profile", maleRole:"ESG Manager · Operations", femaleRole:"ESG Manager · Strategy", start:"Enter the company", select:"Select a profile to continue", sameStory:"One story · Two protagonists · Real impact", disclaimer:"This experience was conceived and developed by Felice Petrignano, Senior ESG Solution Engineer and Advisor, based on his professional experience and perspective. Its content reflects personal views and does not necessarily represent official IBM positions.",
    mission0QuestionKicker:"CHALLENGE · MISSION 01",mission0Question:"How should ESG data be managed?",mission0QuestionBody:"Faced with data from multiple sites, plants and functions — often collected via Excel and manual processes — which approach best fits COMPANY_NAME's current and future needs, balancing data quality, traceability, effort required and the ability to scale over time?",mission0Cta:"Enter the challenge →", missionMenuKicker:"Choose your challenge", missionMenuTitle:"Where do you want to begin?", missionMenuIntro:"Five missions, one transformation. Choose the scenario closest to your client’s priorities.", missionSelect:"Start mission", missionDuration:"8–12 MIN", missionStartHere:"START HERE", missionLocked:"Available after the Data Foundation", companyIntro:"Your company", companyTitle:"COMPANY_NAME", companyStory:"A €400 million international manufacturing group, founded in Italy and grown across eight plants and five operating offices.", evolving:"COMPANY_NAME is evolving towards an ESG model to meet the changing needs of banks, regulators, customers and markets—turning fragmented data into trusted decisions.", revenue:"Annual revenue", plants:"Plants", offices:"Office locations", people:"Employees", explore:"Set ESG priorities", europe:"EUROPE · 6 PLANTS", usa:"USA · 1 PLANT", asia:"ASIA · 1 PLANT", hq:"HEADQUARTERS · MILAN", officeLabel:"5 OFFICE LOCATIONS",
    priorityKicker:"Before you begin", priorityTitle:"What matters most to the business?", priorityIntro:"Rank the priorities driving COMPANY_NAME towards ESG. There is no universal answer: your order will shape how the impacts are interpreted.", moveUp:"Move up", moveDown:"Move down", confirm:"Confirm priorities", priorityNames:{credit:"Access to finance",compliance:"Compliance and reporting",customers:"Customers and tenders",efficiency:"Efficiency, energy and cost",supply:"Supply-chain resilience",reputation:"Reputation and talent attraction"}, priorityDetails:{credit:"Financing conditions and dialogue with banks",compliance:"Verifiable data for CSRD, ESRS and audit requests",customers:"Transparency required in qualification and procurement",efficiency:"Reducing consumption, waste and energy volatility",supply:"Risk, Scope 3 and supplier continuity",reputation:"Stakeholder trust and the ability to attract skills"},
    bridgeKicker:"From here on", bridgeTitle:"Five decisions. One transformation.", bridgeIntro:"You have set your priorities and identified your data needs. Now you will face five real-world scenarios: for each one you will choose how to respond to the challenge. Every decision builds trust and shapes your ESG roadmap.", bridgeCta:"Enter the quest", bridgePrereqLabel:"PREREQUISITE · FOUNDATIONAL BLOCK", bridgeCapLabel:"ADDITIONAL CAPABILITIES",
    bridgeMissions:[
      {num:"01",label:"The ESG data factory",need:"One verifiable source for emissions, energy and reporting."},
      {num:"02",label:"Energy and decarbonisation",need:"Interval data and bill analytics to cut costs and waste."},
      {num:"03",label:"Supply-chain engagement",need:"Structured Scope 3 and supplier responses integrable into GHG accounting."},
      {num:"04",label:"The reporting test",need:"Auditable processes and traceable GHG calculations for frameworks and assurance."},
      {num:"05",label:"The route to Net Zero",need:"What-if scenarios and abatement programmes verifiable over time."}
    ],
    bridgeNote:"You can tackle missions in any order. Choices accumulate: each decision influences the ones that follow.",
    priorityDataKicker:"Your data needs", priorityDataTitle:"Data needs and associated challenges", priorityDataIntro:"You have defined your business priorities. Now for each of the top three business priorities, select the order of priority for your data needs.", priorityDataCta:"Confirm priorities →",
    priorityDataNeeds:{
      credit:[
        {id:"credit-1",label:"Verifiable and auditable Scope 1, 2 and 3 emissions"},
        {id:"credit-2",label:"Structured ESG indices for dialogue with banks and investors"},
        {id:"credit-3",label:"Full traceability from source to final report"},
        {id:"credit-4",label:"ESG ratings comparable with sector peers"},
        {id:"credit-5",label:"Disclosure aligned with sustainable finance reporting standards (ESRS, ISSB)"}
      ],
      compliance:[
        {id:"compliance-1",label:"Traceable and reconcilable Scope 1–2 and Scope 3 GHG calculations"},
        {id:"compliance-2",label:"Workflows with assignees, approvals and evidence for assurance"},
        {id:"compliance-3",label:"CSRD / ESRS and GRI frameworks kept current in the system"},
        {id:"compliance-4",label:"Change log and audit trail for every ESG data point"},
        {id:"compliance-5",label:"Automatic mapping of material information required by standards"}
      ],
      customers:[
        {id:"customers-1",label:"Scope 3 data by GHG Protocol category (procurement, transport, products)"},
        {id:"customers-2",label:"Structured supplier responses integrable into GHG accounting"},
        {id:"customers-3",label:"Product Carbon Footprints for relevant product lines"},
        {id:"customers-4",label:"ESG documentation ready for tender qualification requirements"},
        {id:"customers-5",label:"Environmental performance comparability against competitors"}
      ],
      efficiency:[
        {id:"efficiency-1",label:"Near-real-time interval data from digital meters"},
        {id:"efficiency-2",label:"Bill analytics by site, tariff and anomaly line item"},
        {id:"efficiency-3",label:"Energy KPIs normalised for weather and production output"},
        {id:"efficiency-4",label:"Automatic alerts on peaks, waste and out-of-hours consumption"},
        {id:"efficiency-5",label:"Consumption benchmarking across plants and against SBTi targets"}
      ],
      supply:[
        {id:"supply-1",label:"Scope 3 cat. 1 (purchased goods) and cat. 4 (upstream transport) data"},
        {id:"supply-2",label:"Supplier responses on emissions, compliance and operational continuity"},
        {id:"supply-3",label:"Integration with ERP purchase-order flows"},
        {id:"supply-4",label:"ESG risk assessment by supplier and country of origin"},
        {id:"supply-5",label:"Traceability of corrective actions and supplier improvement plans"}
      ],
      reputation:[
        {id:"reputation-1",label:"Stakeholder-ready ESG reports aligned with public frameworks"},
        {id:"reputation-2",label:"Verifiable data on diversity, safety and social impact"},
        {id:"reputation-3",label:"Performance indicators comparable over time and across sites"},
        {id:"reputation-4",label:"Structured ESG content for external communication and corporate website"},
        {id:"reputation-5",label:"Evidence of Net Zero progress communicable to stakeholders"}
      ]
    },
    mission:"Mission", missionTitle:"The factory of invisible data", companyFacts:"Manufacturing · €400M · 8 plants", briefing:"The Board wants a reliable ESG baseline within 90 days. Energy and environmental data is scattered across plants, suppliers and spreadsheets.", objective:"Your objective", objectiveText:"Create one verifiable source for emissions, energy and reporting without slowing production.", analyse:"Examine the AS-IS", asIsKicker:"Current-state snapshot", asIsTitle:"Four critical issues.\nOne underlying problem.", asIsIntro:"Before choosing a solution, examine how COMPANY_NAME manages ESG data today.", asIsItems:[{title:"Fragmented sources",detail:"Energy, environmental and production data is spread across 8 plants, ERP systems, invoices and email.",metric:"12 SOURCES"},{title:"Manual collection",detail:"Every month users copy values into different sheets, with reminders and checks managed by email.",metric:"180 HRS/MONTH"},{title:"Inconsistent rules",detail:"Units, emission factors and boundaries vary by site, forcing teams to rework comparisons.",metric:"17% ERRORS"},{title:"Slow audit",detail:"Reconstructing the origin, change and approval of a value requires separate files and manual checks.",metric:"6 WEEKS"}], proceedDecision:"Decisions →", decisionTitle:"Which path do you choose?", decisionIntro:"The choice must solve today’s problem without creating a larger one twelve months from now.", optionA:"Adopt the IBM Envizi Data Foundation", optionADetail:"Integrates data sources, automates collection and controls, reduces time and errors, and preserves a verifiable trail.", optionB:"A “simple” solution", optionBDetail:"Based on user forms that visually replace spreadsheets, but preserve manual work, reminders and errors; within a year, volume becomes unmanageable.", optionC:"Postpone until next year", optionCDetail:"Avoid immediate cost, but leave the Board without a reliable baseline.", impact:"Decision impact · 12 months later", negativeTitle:"The new form has become the new spreadsheet.", negativeText:"The interface changed, but the process remains manual. More users and data increase errors, delays and control costs, while sources remain disconnected.", postponeTitle:"A year lost, the same problem—only larger.", postponeText:"Sources and volumes have grown while the baseline remains incomplete. The Board must decide without reliable data as reporting pressure rises.", successTitle:"A Data Foundation ready to scale.", successText:"Envizi progressively integrates sources across eight plants, automates controls and normalization, and creates a verifiable trail—reducing time and errors.", dataQuality:"Data quality", reportingTime:"Reporting time", confidence:"Board confidence", retry:"Review the decision", restart:"Change profile", continue:"Continue the quest", backScenarios:"Back to scenario menu", enviziValue:"ENVIZI VALUE UNLOCKED · DATA FOUNDATION"
  }
};

const defaultPriorities: Priority[] = ["customers","compliance","credit","efficiency","supply","reputation"];
const missionCatalog = [
  {icon:"DATA",it:"La fabbrica dei dati ESG",en:"The ESG data factory",itSub:"Baseline ESG e qualità dei dati",enSub:"ESG baseline and data quality",value:"DATA FOUNDATION"},
  {icon:"ENERGY",it:"Energia e decarbonizzazione",en:"Energy and decarbonization",itSub:"Consumi, anomalie e costi operativi",enSub:"Consumption, anomalies and operating cost",value:"PERFORMANCE"},
  {icon:"SCOPE 3",it:"Il coinvolgimento della supply chain",en:"Supply chain engagement",itSub:"Fornitori, acquisti e catena del valore",enSub:"Suppliers, procurement and value chain",value:"SUPPLY CHAIN"},
  {icon:"AUDIT",it:"La prova del reporting",en:"The reporting test",itSub:"Compliance, assurance e tracciabilità",enSub:"Compliance, assurance and traceability",value:"REPORTING"},
  {icon:"2035",it:"La rotta verso Net Zero",en:"The route to Net Zero",itSub:"Scenari, investimenti e decarbonizzazione",enSub:"Scenarios, investment and decarbonisation",value:"PLANNING"}
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
  it:{briefing:"COMPANY_NAME deve preparare disclosure ESG e inventario GHG coinvolgendo Finance, Operations, HR, Procurement e responsabili di stabilimento. Framework, calcoli Scope 1–2 e Scope 3, evidenze e approvazioni oggi seguono percorsi separati.",objectiveText:"Creare un processo unico e auditabile che mantenga aggiornati i requisiti, assegni responsabilità, governi i calcoli GHG e produca dashboard e disclosure riutilizzabili.",asIsTitle:"Il reporting si ricostruisce ogni anno.",asIsIntro:"Normativa, dati, risposte ed evidenze sono distribuiti tra file e persone: il controllo arriva soprattutto alla fine.",asIsItems:[{title:"Aggiornamenti manuali",detail:"Il team confronta autonomamente nuove versioni di ESRS, GRI, SASB, CDP e altri framework e modifica i template locali.",metric:"6 FRAMEWORK"},{title:"Calcoli GHG separati",detail:"Scope 1–2, fattori di emissione e categorie Scope 3 sono gestiti in modelli differenti, con riconciliazioni prima della disclosure.",metric:"14 FILE DI CALCOLO"},{title:"Workflow via e-mail",detail:"Domande, evidenze, revisioni e approvazioni vengono sollecitate attraverso e-mail e tracker senza responsabilità visibile end-to-end.",metric:"146 IN RITARDO"},{title:"Dashboard ricostruite",detail:"Ogni pubblico richiede nuove estrazioni e presentazioni; la tracciabilità dal grafico alla fonte deve essere ricomposta.",metric:"14 SETTIMANE"}],units:["framework","file di calcolo","domande in ritardo","settimane"],decisionIntro:"Scegli come rendere reporting e assurance un processo continuo, distribuito e governato.",optionA:"Integrare ESG Reporting Frameworks e GHG Reporting Envizi",optionADetail:"Usa framework gestiti e aggiornati nel servizio SaaS, workflow con owner, assignee, contributor, reviewer e approver, calcoli Scope 1–2 e Scope 3 su dati tracciabili, dashboard pronte e PowerReports Microsoft Power BI Embedded personalizzabili.",optionB:"Adottare un workflow documentale con template",optionBDetail:"Centralizza incarichi, scadenze e documenti, ma importa valori GHG già calcolati altrove. Aggiornamento dei questionari, fattori, riconciliazioni, lineage e dashboard restano attività separate o personalizzazioni manuali.",optionC:"Continuare con e-mail, Word e fogli di calcolo",optionCDetail:"Evita un nuovo sistema, ma mantiene sorveglianza normativa, calcoli, solleciti, versioni ed evidenze distribuiti tra i team.",successTitle:"Il reporting diventa un processo aziendale governato.",successText:"ESG Reporting Frameworks rende disponibili contenuti gestiti e aggiornati, riusa risposte ed evidenze e orchestra assegnazione, contributo, revisione e approvazione. I moduli Scope 1–2 e Scope 3 governano fattori, metodi e accuratezza dei calcoli. Dashboard preconfigurate e PowerReports personalizzabili trasformano lo stesso dato auditabile in viste per CdA, auditor e stakeholder.",warningTitle:"Il workflow avanza, ma il dato resta fuori.",warningText:"Il portale documentale riduce e-mail e rende visibili le scadenze, ma calcoli GHG, fattori, aggiornamenti dei framework e dashboard continuano a dipendere da file e integrazioni manuali. La responsabilità sul documento migliora; quella sul dato rimane frammentata.",criticalTitle:"La disclosure resta un esercizio di ricostruzione.",criticalText:"Dopo dodici mesi completezza, ritardi e durata del ciclo restano ai livelli attuali. Ogni modifica normativa riapre template e riconciliazioni, mentre auditor e CdA attendono evidenze disperse.",metricLabels:["Completezza disclosure","Domande nei tempi","Riduzione ciclo reporting"],positiveValues:["94%","89%","−45%"],warningValues:["72%","64%","−12%"],criticalValues:["58% · INVARIATA","54% · INVARIATO","NESSUNA"],decisionLabels:{positive:"Envizi Frameworks + Scope 1–2 + Scope 3 Reporting",warning:"Workflow documentale con template",critical:"E-mail, Word e fogli"},outcomeLabels:{positive:"94% completezza · 89% risposte nei tempi · −45% ciclo reporting",warning:"Workflow più visibile · calcoli, aggiornamenti e dashboard ancora separati",critical:"Completezza, puntualità e ciclo reporting invariati"},enviziValue:"VALORE ENVIZI SBLOCCATO · ESG & GHG REPORTING"},
  en:{briefing:"COMPANY_NAME must prepare ESG disclosures and its GHG inventory across Finance, Operations, HR, Procurement and plant managers. Frameworks, Scope 1–2 and Scope 3 calculations, evidence and approvals currently follow separate paths.",objectiveText:"Create one auditable process that keeps requirements current, assigns accountability, governs GHG calculations and produces reusable dashboards and disclosures.",asIsTitle:"Reporting is rebuilt every year.",asIsIntro:"Regulation, data, responses and evidence are distributed across files and people, so control happens mainly at the end.",asIsItems:[{title:"Manual updates",detail:"The team independently compares new versions of ESRS, GRI, SASB, CDP and other frameworks and edits local templates.",metric:"6 FRAMEWORKS"},{title:"Separate GHG calculations",detail:"Scope 1–2, emission factors and Scope 3 categories are managed in different models and reconciled before disclosure.",metric:"14 CALCULATION FILES"},{title:"Email workflow",detail:"Questions, evidence, reviews and approvals are chased through email and trackers without visible end-to-end accountability.",metric:"146 OVERDUE"},{title:"Dashboards rebuilt",detail:"Every audience requires new extracts and presentations, while traceability from charts to source must be reconstructed.",metric:"14 WEEKS"}],units:["frameworks","calculation files","overdue questions","weeks"],decisionIntro:"Choose how to make reporting and assurance a continuous, distributed and governed process.",optionA:"Combine Envizi ESG Reporting Frameworks and GHG Reporting",optionADetail:"Uses managed framework content kept current in the SaaS service, workflows with owners, assignees, contributors, reviewers and approvers, traceable Scope 1–2 and Scope 3 calculations, ready-made dashboards and customizable Microsoft Power BI Embedded PowerReports.",optionB:"Adopt a document workflow with templates",optionBDetail:"Centralizes tasks, deadlines and documents, but imports GHG totals calculated elsewhere. Questionnaire updates, factors, reconciliation, lineage and dashboards remain separate activities or manual customizations.",optionC:"Continue with email, Word and spreadsheets",optionCDetail:"Avoids a new system but keeps regulatory monitoring, calculations, reminders, versions and evidence distributed across teams.",successTitle:"Reporting becomes a governed enterprise process.",successText:"ESG Reporting Frameworks provides managed, current content, reuses responses and evidence, and orchestrates assignment, contribution, review and approval. Scope 1–2 and Scope 3 modules govern factors, methods and calculation accuracy. Preconfigured dashboards and customizable PowerReports turn the same auditable data into views for the Board, auditors and stakeholders.",warningTitle:"The workflow moves forward, but the data remains outside.",warningText:"The document portal reduces email and exposes deadlines, but GHG calculations, factors, framework updates and dashboards still depend on files and manual integrations. Accountability for the document improves; accountability for the data remains fragmented.",criticalTitle:"Disclosure remains a reconstruction exercise.",criticalText:"After twelve months, completeness, delays and cycle time remain at current levels. Every regulatory change reopens templates and reconciliations while auditors and the Board wait for scattered evidence.",metricLabels:["Disclosure completeness","Questions on time","Reporting-cycle reduction"],positiveValues:["94%","89%","−45%"],warningValues:["72%","64%","−12%"],criticalValues:["58% · UNCHANGED","54% · UNCHANGED","NONE"],decisionLabels:{positive:"Envizi Frameworks + Scope 1–2 + Scope 3 Reporting",warning:"Document workflow with templates",critical:"Email, Word and spreadsheets"},outcomeLabels:{positive:"94% completeness · 89% responses on time · −45% reporting cycle",warning:"More visible workflow · calculations, updates and dashboards remain separate",critical:"Completeness, timeliness and reporting cycle unchanged"},enviziValue:"ENVIZI VALUE UNLOCKED · ESG & GHG REPORTING"}
};
const planningModule = {
  it:{briefing:"Il CdA ha fissato una traiettoria Net Zero, ma stabilimenti e funzioni propongono iniziative diverse senza un metodo comune per confrontare CapEx, risparmi ed emissioni evitate. Il budget disponibile non può finanziare tutto.",objectiveText:"Costruire un portafoglio di decarbonizzazione che confronti scenari e investimenti, selezioni le azioni che chiudono il gap verso il target e ne verifichi l’esecuzione nel tempo.",asIsTitle:"Molte idee. Nessuna traiettoria condivisa.",asIsIntro:"Oggi le proposte nascono dai team, ma non esiste un modello che colleghi emissioni, budget, priorità e risultati reali.",asIsItems:[{title:"Idee non confrontabili",detail:"Efficienza, rinnovabili, elettrificazione e supply chain vengono proposte con ipotesi e formati differenti.",metric:"37 INIZIATIVE"},{title:"CapEx oltre il budget",detail:"Le richieste sommano 22 milioni di euro contro 12 milioni disponibili, senza una graduatoria condivisa per costo e CO₂e evitata.",metric:"€22M RICHIESTI"},{title:"Un solo scenario",detail:"Il piano confronta il target con una traiettoria statica; non valuta combinazioni alternative, rischi o variazioni di costo.",metric:"1 SCENARIO"},{title:"Esecuzione poco seguita",detail:"Dopo l’approvazione, avanzamento, spesa e benefici reali vengono aggiornati in presentazioni trimestrali separate.",metric:"31% MONITORATO"}],units:["iniziative","M€ richiesti","scenari","% monitorato"],decisionIntro:"Scegli come trasformare le proposte dei team in un piano finanziabile, adattabile e verificabile.",optionA:"Integrare Scenario Modeler, Program Tracking e Planning Analytics con AI",optionADetail:"Parte dalla baseline Envizi, crea forecast e scenari what-if, applica programmi di abbattimento, confronta CapEx, OpEx e CO₂e, ottimizza le combinazioni rispetto al budget e riporta target e programmi in Envizi per seguirne l’esecuzione.",optionB:"Creare un portafoglio progetti in foglio e project tool",optionBDetail:"Introduce criteri comuni, scoring e milestone, ma scenari e curve di abbattimento restano statici; baseline, actual, budget e tracking non sono collegati e il reforecast richiede riconciliazioni manuali.",optionC:"Continuare a raccogliere le idee dei team",optionCDetail:"Preserva autonomia e velocità iniziale, ma il CdA non può confrontare scenari, selezionare il miglior portafoglio entro budget o verificare se il piano chiude il gap.",successTitle:"Il piano diventa una decisione continua.",successText:"Planning Analytics, potenziato dall’AI, confronta baseline, target e scenari what-if e simula combinazioni di programmi rispetto a budget e traiettoria. Sustainability Program Tracking registra costi, risparmi, responsabili e avanzamento; Target Setting + Tracking confronta actual e obiettivi, permettendo di correggere il piano prima che resti teorico.",warningTitle:"Il portafoglio è ordinato, ma resta statico.",warningText:"Scoring e milestone migliorano la selezione iniziale, ma ogni variazione di budget, costi o prestazioni richiede nuovi fogli. Gli actual non aggiornano automaticamente la traiettoria e il team scopre tardi se il piano non chiude il gap.",criticalTitle:"Le idee non diventano un piano finanziabile.",criticalText:"Dopo dodici mesi il numero di proposte è cresciuto, ma capacità decisionale e monitoraggio restano ai livelli attuali. Il budget è distribuito senza una simulazione comune e il contributo reale al target rimane incerto.",metricLabels:["Budget su azioni prioritarie","Gap target coperto","Programmi monitorati"],positiveValues:["93%","88%","84%"],warningValues:["62%","51%","56%"],criticalValues:["41% · INVARIATO","34% · INVARIATO","31% · INVARIATO"],decisionLabels:{positive:"Envizi Planning + Scenario + Program Tracking",warning:"Foglio portafoglio + project tool",critical:"Idee bottom-up non coordinate"},outcomeLabels:{positive:"93% budget prioritizzato · 88% gap coperto · 84% programmi monitorati",warning:"Selezione più ordinata · scenari e reforecast ancora manuali",critical:"Prioritizzazione, copertura e monitoraggio invariati"},enviziValue:"VALORE ENVIZI SBLOCCATO · DECARBONIZATION PLANNING"},
  en:{briefing:"The Board has set a Net Zero pathway, but plants and functions propose different initiatives without a common method to compare CapEx, savings and avoided emissions. The available budget cannot fund everything.",objectiveText:"Build a decarbonization portfolio that compares scenarios and investments, selects actions that close the target gap and verifies execution over time.",asIsTitle:"Many ideas. No shared pathway.",asIsIntro:"Teams generate proposals, but no model connects emissions, budget, priorities and actual results.",asIsItems:[{title:"Ideas cannot be compared",detail:"Efficiency, renewables, electrification and supply-chain initiatives use different assumptions and formats.",metric:"37 INITIATIVES"},{title:"CapEx exceeds budget",detail:"Requests total €22 million against €12 million available, without a shared ranking by cost and avoided CO₂e.",metric:"€22M REQUESTED"},{title:"One static scenario",detail:"The plan compares the target with one trajectory and does not test alternatives, risks or cost changes.",metric:"1 SCENARIO"},{title:"Limited execution tracking",detail:"After approval, progress, spend and realized benefits are updated in separate quarterly presentations.",metric:"31% TRACKED"}],units:["initiatives","€M requested","scenarios","% tracked"],decisionIntro:"Choose how to turn team proposals into a fundable, adaptable and verifiable plan.",optionA:"Combine Scenario Modeler, Program Tracking and AI-infused Planning Analytics",optionADetail:"Starts from the Envizi baseline, builds forecasts and what-if scenarios, applies abatement programs, compares CapEx, OpEx and CO₂e, optimizes combinations against budget and returns targets and programs to Envizi for execution tracking.",optionB:"Create a project portfolio in spreadsheets and a project tool",optionBDetail:"Introduces common criteria, scoring and milestones, but scenarios and abatement curves remain static; baseline, actuals, budget and tracking are disconnected, and reforecasting requires manual reconciliation.",optionC:"Continue collecting team ideas",optionCDetail:"Preserves autonomy and initial speed, but the Board cannot compare scenarios, select the best portfolio within budget or verify whether the plan closes the gap.",successTitle:"The plan becomes a continuous decision process.",successText:"AI-infused Planning Analytics compares baseline, target and what-if scenarios and simulates program combinations against budget and pathway. Sustainability Program Tracking records costs, savings, owners and progress; Target Setting + Tracking compares actuals with targets, allowing the plan to be corrected before it remains theoretical.",warningTitle:"The portfolio is organized, but remains static.",warningText:"Scoring and milestones improve initial selection, but every change in budget, cost or performance requires new spreadsheets. Actuals do not automatically update the pathway, so the team discovers too late when the plan does not close the gap.",criticalTitle:"Ideas do not become a fundable plan.",criticalText:"After twelve months, the proposal list has grown, but decision capability and monitoring remain at current levels. Budget is allocated without a common simulation and the actual contribution to the target remains uncertain.",metricLabels:["Budget on priority actions","Target gap covered","Programs monitored"],positiveValues:["93%","88%","84%"],warningValues:["62%","51%","56%"],criticalValues:["41% · UNCHANGED","34% · UNCHANGED","31% · UNCHANGED"],decisionLabels:{positive:"Envizi Planning + Scenario + Program Tracking",warning:"Portfolio spreadsheet + project tool",critical:"Uncoordinated bottom-up ideas"},outcomeLabels:{positive:"93% budget prioritized · 88% gap covered · 84% programs monitored",warning:"More orderly selection · scenarios and reforecasting remain manual",critical:"Prioritization, coverage and monitoring unchanged"},enviziValue:"ENVIZI VALUE UNLOCKED · DECARBONIZATION PLANNING"}
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
const DF_REQUIREMENTS:{id:string,it:string,en:string,capIt:string,capEn:string,benIt:string,benEn:string}[]=[
  {id:"df1",it:"Raccogliere dati ESG provenienti da fonti e formati diversi",en:"Collect ESG data from different sources and formats",capIt:"IBM Envizi permette di acquisire e consolidare dati provenienti da sistemi aziendali, file, API, moduli web, survey e caricamenti massivi in un unico sistema.",capEn:"IBM Envizi lets you acquire and consolidate data from enterprise systems, files, APIs, web forms, surveys and bulk uploads into a single system.",benIt:"Riduce la frammentazione e offre un punto di accesso unico alle informazioni ESG.",benEn:"Reduces fragmentation and provides a single access point for ESG information."},
  {id:"df2",it:"Disporre di un'unica fonte affidabile per tutti i dati ESG",en:"Have a single reliable source for all ESG data",capIt:"IBM Envizi permette di creare un sistema centralizzato e autorevole per dati ambientali, sociali e di governance.",capEn:"IBM Envizi lets you create a centralised, authoritative system for environmental, social and governance data.",benIt:"Evita versioni contrastanti dei dati e aumenta la fiducia di management, auditor e stakeholder.",benEn:"Avoids conflicting data versions and increases trust among management, auditors and stakeholders."},
  {id:"df3",it:"Uniformare dati raccolti con unità, valute e periodi differenti",en:"Normalise data collected with different units, currencies and periods",capIt:"IBM Envizi permette di normalizzare automaticamente unità di misura, valute e periodi temporali, rendendo i dati aggregabili e confrontabili.",capEn:"IBM Envizi automatically normalises units of measure, currencies and time periods, making data aggregable and comparable.",benIt:"Riduce le elaborazioni manuali e consente confronti coerenti tra sedi, società e periodi.",benEn:"Reduces manual processing and enables consistent comparisons across sites, entities and periods."},
  {id:"df4",it:"Rappresentare una struttura organizzativa complessa e in evoluzione",en:"Represent a complex, evolving organisational structure",capIt:"IBM Envizi permette di organizzare i dati attraverso gerarchie flessibili per società, sedi, portafogli, aree geografiche e centri di costo.",capEn:"IBM Envizi lets you organise data through flexible hierarchies for companies, locations, portfolios, geographies and cost centres.",benIt:"Consente di analizzare e rendicontare i dati secondo diversi perimetri organizzativi e stakeholder.",benEn:"Enables analysis and reporting across different organisational perimeters and stakeholders."},
  {id:"df5",it:"Gestire nella stessa piattaforma dati ambientali e sociali",en:"Manage environmental and social data on the same platform",capIt:"IBM Envizi permette di raccogliere e aggregare consumi, emissioni, acqua e rifiuti insieme a indicatori come dipendenti, incidenti, formazione e diversità.",capEn:"IBM Envizi lets you collect and aggregate energy, emissions, water and waste alongside indicators such as employees, incidents, training and diversity.",benIt:"Offre una visione ESG integrata senza dover mantenere archivi e processi separati.",benEn:"Provides an integrated ESG view without maintaining separate repositories and processes."},
  {id:"df6",it:"Identificare dati mancanti, incoerenti o anomali",en:"Identify missing, inconsistent or anomalous data",capIt:"IBM Envizi permette di applicare regole di validazione, alert, controlli di completezza e meccanismi di stima dei dati mancanti.",capEn:"IBM Envizi lets you apply validation rules, alerts, completeness checks and mechanisms for estimating missing data.",benIt:"Riduce il tempo dedicato ai controlli manuali e migliora la qualità delle informazioni prima del reporting.",benEn:"Reduces time spent on manual checks and improves information quality ahead of reporting."},
  {id:"df7",it:"Poter ricostruire l'origine e le modifiche di ogni dato",en:"Trace the origin and changes of every data point",capIt:"IBM Envizi permette di conservare evidenze, record di dettaglio e tracciabilità dei dati utilizzati nei calcoli e nei report.",capEn:"IBM Envizi lets you retain evidence, detail records and full traceability of data used in calculations and reports.",benIt:"Facilita verifiche, assurance e audit, rendendo i risultati ESG più difendibili.",benEn:"Facilitates verifications, assurance and audits, making ESG results more defensible."},
  {id:"df8",it:"Automatizzare il calcolo delle emissioni Scope 1, 2 e 3",en:"Automate the calculation of Scope 1, 2 and 3 emissions",capIt:"IBM Envizi permette di trasformare i dati di attività in emissioni attraverso un motore di calcolo strutturato e metodologie coerenti con il GHG Protocol.",capEn:"IBM Envizi transforms activity data into emissions through a structured calculation engine and methodologies aligned with the GHG Protocol.",benIt:"Riduce il rischio di errori nei calcoli e libera tempo per analisi e iniziative di decarbonizzazione.",benEn:"Reduces calculation error risk and frees time for analysis and decarbonisation initiatives."},
  {id:"df9",it:"Disporre di fattori di emissione aggiornati e gestiti centralmente",en:"Have up-to-date emission factors managed centrally",capIt:"IBM Envizi permette di utilizzare una libreria gestita di oltre 40.000 fattori di emissione, insieme a fattori personalizzati o di terze parti.",capEn:"IBM Envizi lets you use a managed library of over 40,000 emission factors, alongside custom or third-party factors.",benIt:"Evita la ricerca e la manutenzione manuale dei fattori e rende più coerenti i risultati tra paesi e periodi.",benEn:"Eliminates manual factor research and maintenance and makes results more consistent across countries and periods."},
  {id:"df10",it:"Scalare la raccolta dei dati riducendo attività manuali e dipendenza dai fogli di calcolo",en:"Scale data collection while reducing manual activities and spreadsheet dependency",capIt:"IBM Envizi permette di automatizzare i flussi tramite connettori, API, template, form e workflow, mantenendo anche modalità guidate per i contributori occasionali.",capEn:"IBM Envizi lets you automate flows via connectors, APIs, templates, forms and workflows, while maintaining guided modes for occasional contributors.",benIt:"Consente di estendere il processo a più sedi e utenti senza aumentare proporzionalmente tempi, errori e carico operativo.",benEn:"Enables you to extend the process to more sites and users without proportionally increasing time, errors and operational load."},
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
  const [language,setLanguage]=useState<Language>("it"); const [profile,setProfile]=useState<Profile|null>(null); const [screen,setScreenState]=useState<Screen>("cover"); const [screenHistory,setScreenHistory]=useState<Screen[]>([]); const [priorities,setPriorities]=useState<Priority[]>(defaultPriorities); const [selectedMission,setSelectedMission]=useState(0); const [negativeChoice,setNegativeChoice]=useState<"form"|"postpone">("form"); const [pendingOutcome,setPendingOutcome]=useState<Outcome>("positive"); const [missionParameters,setMissionParameters]=useState<Record<number,string[]>>({}); const [missionOutcomes,setMissionOutcomes]=useState<Record<number,Outcome>>({}); const [missionOrder,setMissionOrder]=useState<number[]>([0,3,2,1,4]); const [trustScore,setTrustScore]=useState(30); const [approachBiz,setApproachBiz]=useState(""); const [approachData,setApproachData]=useState(""); const [contactEmail,setContactEmail]=useState(""); const [asIsRatings,setAsIsRatings]=useState<Record<number,("alto"|"medio"|"basso")[]>>({});
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
  const [topNNeeds,setTopNNeeds]=useState(5);
  const [dfRatings,setDfRatings]=useState<Record<string,DFRating>>(()=>Object.fromEntries(DF_REQUIREMENTS.map(r=>[r.id,"medium" as DFRating])));
  const setDfRating=(id:string,val:DFRating)=>setDfRatings(prev=>({...prev,[id]:val}));
  const [dfFocusId,setDfFocusId]=useState<string|null>(null);
  useEffect(()=>{setDataNeeds(buildDefaultDataNeeds(language,priorities));},[language,priorities]);
  const moveNeed=(index:number,direction:-1|1)=>{const next=[...dataNeeds];const target=index+direction;if(target<0||target>=next.length)return;[next[index],next[target]]=[next[target],next[index]];setDataNeeds(next);};
  const rankNeed=(fromIdx:number,toRank:number)=>{const clamped=Math.max(1,Math.min(dataNeeds.length,toRank));const toIdx=clamped-1;if(toIdx===fromIdx)return;const next=[...dataNeeds];const [item]=next.splice(fromIdx,1);next.splice(toIdx,0,item);setDataNeeds(next);};
  const rankPriority=(fromIdx:number,toRank:number)=>{const clamped=Math.max(1,Math.min(priorities.length,toRank));const toIdx=clamped-1;if(toIdx===fromIdx)return;const next=[...priorities];const [item]=next.splice(fromIdx,1);next.splice(toIdx,0,item);setPriorities(next);};
  const needIdToMission:Record<string,number>={
    "credit-1":0,"credit-3":0,"compliance-1":0,"compliance-4":0,"reputation-2":0,"reputation-3":0,
    "efficiency-1":1,"efficiency-2":1,"efficiency-3":1,"efficiency-4":1,"efficiency-5":4,
    "supply-1":2,"supply-2":2,"supply-3":2,"supply-4":2,"supply-5":2,
    "customers-1":2,"customers-2":2,"customers-3":2,
    "compliance-2":3,"compliance-3":3,"compliance-5":3,
    "credit-2":3,"credit-4":3,"credit-5":3,
    "customers-4":3,"customers-5":3,
    "reputation-1":3,"reputation-4":3,
    "reputation-5":4,
  };
  const topNeeds=dataNeeds.slice(0,topNNeeds).map((n,i)=>({...n,rank:i+1}));
  const needsByMissionHub:[number,typeof topNeeds][]=[0,1,2,3,4].map(mi=>[mi,topNeeds.filter(n=>(needIdToMission[n.id]??0)===mi)]);
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
  const PAGE_NUMS:Partial<Record<Screen,number>>={cover:1,onboarding:2,intro:3,approach:4,companySetup:5,priorities:6,priorityData:7,bridge:8,roadmapPreview:9,missions:10,briefing:10,missionIntro:11,asis:12,decision:13,compare:14,trust:15,dataFoundation:16,dfConclusion:17,success:18,negative:18,milestone:19,tobe:20,summary:21,nextStep:22,thankYou:23};
  useEffect(()=>{let el=document.getElementById("envizi-page-num");if(!el){el=document.createElement("div");el.id="envizi-page-num";el.className="pageNum";document.body.appendChild(el)}const n=PAGE_NUMS[screen];el.textContent=n!=null?String(n).padStart(2,"0"):"";el.style.display=n!=null?"flex":"none";},[screen]);
  useEffect(()=>()=>{document.getElementById("envizi-page-num")?.remove()},[]);

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
  const scenario=selectedMission===1?energy:selectedMission===2?supply:selectedMission===3?reporting:selectedMission===4?planning:null;
  const active={briefing:scenario?.briefing||t.briefing,objectiveText:scenario?.objectiveText||t.objectiveText,asIsTitle:scenario?.asIsTitle||t.asIsTitle,asIsIntro:scenario?.asIsIntro||t.asIsIntro,asIsItems:scenario?.asIsItems||t.asIsItems,decisionIntro:scenario?.decisionIntro||t.decisionIntro,optionA:scenario?.optionA||t.optionA,optionADetail:scenario?.optionADetail||t.optionADetail,optionB:scenario?.optionB||t.optionB,optionBDetail:scenario?.optionBDetail||t.optionBDetail,optionC:scenario?.optionC||t.optionC,optionCDetail:scenario?.optionCDetail||t.optionCDetail,successTitle:scenario?.successTitle||t.successTitle,successText:scenario?.successText||t.successText,warningTitle:scenario?.warningTitle||t.negativeTitle,warningText:scenario?.warningText||t.negativeText,criticalTitle:scenario?.criticalTitle||t.postponeTitle,criticalText:scenario?.criticalText||t.postponeText,metricLabels:scenario?.metricLabels||[t.dataQuality,t.reportingTime,t.confidence],enviziValue:selectedMission===1?(language==="it"?"VALORE ENVIZI SBLOCCATO · ENERGY ANALYTICS":"ENVIZI VALUE UNLOCKED · ENERGY ANALYTICS"):selectedMission===2?supply.enviziValue:selectedMission===3?reporting.enviziValue:selectedMission===4?planning.enviziValue:t.enviziValue};
  const defaultUnits=language==="it"?["fonti","ore/mese","% errori","settimane"]:["sources","hrs/month","% errors","weeks"];
  const parameterUnits=scenario?.units||defaultUnits;
  const resultValues=scenario?(screen==="success"?scenario.positiveValues:negativeChoice==="form"?scenario.warningValues:scenario.criticalValues):screen==="success"?["+34%","−62%","92/100"]:negativeChoice==="form"?["+8%","−12%","58/100"]:language==="it"?["INVARIATA","INVARIATO","BASSA · INVARIATA"]:["UNCHANGED","UNCHANGED","LOW · UNCHANGED"];
  const decisionLabel=(missionIndex:number,outcome:Outcome)=>missionIndex===1?energy.decisionLabels[outcome]:missionIndex===2?supply.decisionLabels[outcome]:missionIndex===3?reporting.decisionLabels[outcome]:missionIndex===4?planning.decisionLabels[outcome]:t.decisionLabels[outcome];
  const outcomeLabel=(missionIndex:number,outcome:Outcome)=>missionIndex===1?energy.outcomeLabels[outcome]:missionIndex===2?supply.outcomeLabels[outcome]:missionIndex===3?reporting.outcomeLabels[outcome]:missionIndex===4?planning.outcomeLabels[outcome]:t.outcomeLabels[outcome];
  const missionItems=(missionIndex:number)=>missionIndex===1?energy.asIsItems:missionIndex===2?supply.asIsItems:missionIndex===3?reporting.asIsItems:missionIndex===4?planning.asIsItems:t.asIsItems;
  const missionUnits=(missionIndex:number)=>missionIndex===1?energy.units:missionIndex===2?supply.units:missionIndex===3?reporting.units:missionIndex===4?planning.units:defaultUnits;
  type TrustIntroEntry={it:string,en:string,sources?:{label:string,url:string}[]};
  const trustIntroByMission:Record<number,TrustIntroEntry>={
    0:{it:"Una base dati auditabile è il fondamento della credibilità ESG. Il CdA e i finanziatori valutano la solidità del dato prima ancora dei numeri: un sistema verificabile trasforma le dichiarazioni in evidenza.",en:"An auditable data foundation is the bedrock of ESG credibility. The Board and financiers assess data integrity before the numbers themselves: a verifiable system turns declarations into evidence."},
    1:{it:"L'energy management è la prova tangibile che l'azienda sta investendo attivamente nella decarbonizzazione. Per il CdA, i dati energetici strutturati dimostrano al contempo impegno climatico e disciplina sui costi operativi.",en:"Energy management is tangible proof that the company is actively investing in decarbonisation. For the Board, structured energy data simultaneously demonstrates climate commitment and operational cost discipline."},
    2:{it:"La copertura dello Scope 3 e il coinvolgimento della supply chain sono oggi indicatori chiave per investitori e clienti. Un inventario credibile della catena del valore segnala governance responsabile e riduce il rischio reputazionale.",en:"Scope 3 coverage and supply-chain engagement are now key indicators for investors and customers. A credible value-chain inventory signals responsible governance and reduces reputational risk."},
    3:{
      it:"Un processo di reporting governato e tracciabile rassicura auditor e regolatori e rafforza la credibilità del piano ESG davanti al mercato. Se l'azienda è in scope CSRD, la full disclosure e la conformità agli ESRS sono requisiti normativi non negoziabili (Dir. 2022/2464/UE). Anche le aziende fuori scope non sono immuni: i clienti diretti in scope raccolgono dati lungo tutta la catena del valore (ESRS 1, §5), mentre le banche europee — sotto le aspettative di vigilanza della BCE e le linee guida EBA sul credito — integrano i fattori ESG nella valutazione del merito creditizio di tutte le imprese, indipendentemente dalla dimensione.",
      en:"A governed, traceable reporting process reassures auditors and regulators and strengthens the credibility of the ESG plan in the market. If the company is in scope for CSRD, full disclosure and compliance with ESRS are non-negotiable regulatory requirements (Dir. 2022/2464/EU). Companies outside scope are not immune: in-scope clients collect data across the entire value chain (ESRS 1, §5), while European banks — under ECB supervisory expectations and EBA loan-origination guidelines — integrate ESG factors into the creditworthiness assessment of all companies, regardless of size.",
      sources:[
        {label:"CSRD — Dir. 2022/2464/UE",url:"https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32022L2464"},
        {label:"ESRS 1 §5 — Catena del valore",url:"https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32023R2772"},
        {label:"BCE — Guida sui rischi climatici e ambientali (2020)",url:"https://www.bankingsupervision.europa.eu/ecb/pub/pdf/ssm.202011guideonclimaterelatedandenvironmentalrisks~58213f6564.it.pdf"},
        {label:"EBA/GL/2020/06 — Erogazione e monitoraggio del credito",url:"https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2020/Guidelines%20on%20loan%20origination%20and%20monitoring/884283/EBA%20GL%202020%2006%20Final%20Report%20on%20GL%20on%20loan%20origination%20and%20monitoring.pdf"}
      ]
    },
    4:{it:"La pianificazione della decarbonizzazione dimostra che l'azienda non si limita a misurare le emissioni, ma lavora per ridurle nel tempo. Scenari quantificati e programmi verificabili sono la prova concreta dell'impegno verso Net Zero.",en:"Decarbonisation planning demonstrates that the company is not merely measuring emissions but working to reduce them over time. Quantified scenarios and verifiable programmes are concrete proof of the commitment to Net Zero."}
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
      const chartLabels:{it:string,en:string}[]=[{it:"Fabbrica\ndati",en:"Data\nfactory"},{it:"Energia",en:"Energy"},{it:"Supply\nchain",en:"Supply\nchain"},{it:"Reporting",en:"Reporting"},{it:"Net\nZero",en:"Net\nZero"}];
      const lbl=language==='it'?chartLabels[mi].it:chartLabels[mi].en;
      const fill=outcome===null?'none':outcome==='positive'?'#39efb4':outcome==='warning'?'#ffc07c':'#ff7777';
      const stroke=outcome===null?'#2e4d41':isCurrent?(outcome==='positive'?'#8affda':outcome==='warning'?'#ffd09c':'#ff9b9b'):(outcome==='positive'?'#39efb4':outcome==='warning'?'#ffc07c':'#ff7777');
      return{label:lbl,val:(outcome!==null?cum:null),isCurrent,fill,stroke,strokeW:isCurrent?'2':'1'};
    })
  ]);
  const trustTotalW=trustSteps.length*(TRUST_BAR_W+TRUST_BAR_GAP)-TRUST_BAR_GAP+TRUST_SVG_PAD_X*2;

  if(screen==="intro"&&profile)return <main className="introScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> YOUR CHALLENGE</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="characterStage"><img src={`./characters/${profile}-neutral.png`} alt={name}/><div className="characterTag characterTagRaised"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></section><section className="introBody"><p className="eyebrow">{t.introKicker}</p><h1>{t.introTitle}</h1><p className="storyText">{t.introBody}</p><div className="introTrustBox"><p className="introScoreLabel">{t.introScoreLabel}</p>{renderTrustBar()}</div><button className="actionButton questLaunchBtn" onClick={()=>setScreen("approach")}>{t.introStart}<b>→</b><span className="mouseDemo questMouse" aria-hidden="true"><img src="./hand-pointer.svg" alt=""/></span></button></section></main>;

  if(screen==="approach"&&profile)return <main className="approachScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> PEOPLE & DATA</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="approachBody"><div className="approachTopTitle"><h1>{t.approachTitle}</h1><button className="actionButton approachTopCta" onClick={()=>setScreen("companySetup")}>{t.approachQuestCta}<b>→</b></button></div><div className="approachLeft approachVisual"><div className="approachPeopleIntro"><small className="approachSectionLabel">{language==="it"?"FILONE 01 · PERSONE":"TRACK 01 · PEOPLE"}</small><h2>{language==="it"?"La sfida è agire sul cambiamento con le persone: coinvolgimento, formazione, responsabilizzazione.":"The challenge is acting on change with people: engagement, training, accountability."}</h2></div><img className="approachTeamImage" src="./approach-team-scene.png" alt={language==="it"?"Team ESG che discute una dashboard di sostenibilità":"ESG team discussing a sustainability dashboard"}/></div><div className="approachRight"><div className="approachDataIntro"><small className="approachSectionLabel">{language==="it"?"FILONE 02 · DATI":"TRACK 02 · DATA"}</small><h2>{language==="it"?<><span>Il secondo filone è agire</span><br/><span>sulla complessità di oltre 500 tipi di dati ESG.</span></>:<><span>The second track is acting</span><br/><span>on the complexity of 500+ ESG data types.</span></>}</h2></div><img className="approachDataImage" src="./approach-data-scene.png" alt={language==="it"?"Dashboard e dati ESG":"ESG data dashboard"}/></div><div className="approachBottomAction"><div className="approachQuestBox"><span className="approachQuestIcon">🚀</span><p>{t.approachQuestCallout}</p></div><button className="actionButton" onClick={()=>setScreen("company")}>{t.approachQuestCta}<b>→</b></button></div></section></main>;

  const renderMissionHub=(isPreview=false)=>{const completed=Object.keys(missionOutcomes).length;const foundationDone=!!missionOutcomes[0];return <main className="missionMenuScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> MISSION HUB</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="missionMenuIntro"><div><p className="eyebrow">{t.roadmapKicker}</p><h1>{t.roadmapTitle}</h1><p>{t.roadmapIntro}</p><div className="roadmapProgress"><span style={{width:`${completed*20}%`}}/><b>{t.roadmapProgress}: {completed}/5</b></div>{isPreview&&<button className="actionButton rpPreviewCta" onClick={()=>{setSelectedMission(0);localStorage.setItem("envizi-quest-mission","1");setScreen("briefing");}}>{language==="it"?"Parti da qui →":"Start here →"}</button>}{!isPreview&&completed===5&&<button className="summaryCta" onClick={()=>setScreen("summary")}>{t.summaryCta}<b>→</b></button>}</div><div className="priorityPersona"><img src={`./characters/${profile}-neutral.png`} alt={name}/><span>{name}<small>ESG MANAGER</small></span></div></section><section className="missionCards roadmapCards">{missionOrder.map((missionIndex,position)=>{const m=missionCatalog[missionIndex];const outcome=missionOutcomes[missionIndex];const isLocked=!isPreview&&(!foundationDone&&missionIndex!==0);const isStartHere=!isPreview&&!foundationDone&&missionIndex===0;return <article key={m.value} className={`missionCard ${outcome?`completed ${outcome}`:""}${isLocked?" missionCardLocked":""}`}><button className="missionCardOpen" disabled={isLocked||isPreview} onClick={()=>{if(isLocked||isPreview)return;setSelectedMission(missionIndex);localStorage.setItem("envizi-quest-mission",String(missionIndex+1));setScreen("briefing")}}>{(()=>{const raw=needsByMissionHub.find(([mi])=>mi===missionIndex)?.[1]||[];const needs=missionIndex===0?[{id:"__foundation__",label:language==="it"?"Una data foundation solida e tracciabile":"A solid and traceable data foundation"},...raw]:raw;const needsLabel=language==="it"?"Esigenze specifiche":"Specific needs";return <><div className="missionCardNeedsBox"><small className="missionCardNeedsLabel">{needsLabel}</small>{needs.length>0?needs.map(n=><span key={n.id} className="missionCardNeed"><b className="missionCardNeedRank">{("rank" in n)?String((n as any).rank).padStart(2,"0"):""}</b>⬡ {n.label}</span>):<span className="missionCardNeed">—</span>}</div><div className="missionCardChallengeBox"><div className="missionCardTop"><span>{String(position+1).padStart(2,"0")}</span><i>{outcome?"✓":m.icon}</i></div><h2>{language==="it"?m.it:m.en}</h2></div></>;})()}{isLocked&&<div className="missionCardLockedOverlay"><span>⊘</span><small>{t.missionLocked}</small></div>}{isStartHere&&<div className="missionCardStartHere"><span>{t.missionStartHere}</span><b>→</b></div>}{outcome&&<div className="missionImpact"><div><small>{t.adoptedDecision}</small><strong>{decisionLabel(missionIndex,outcome)}</strong></div><div><small>{t.expectedImpact}</small><p>{outcomeLabel(missionIndex,outcome)}</p></div></div>}<div className="missionCardBottom"><small>{outcome?`${position+1}/5 · ROADMAP`:isLocked?"🔒":""}</small><b>{outcome?t.missionReview:""}</b></div></button></article>})}</section></main>};

  if(screen==="roadmapPreview"&&profile)return renderMissionHub(true);

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

  if(screen==="missionIntro"&&profile){const m0=missionCatalog[0];const questionBody=(t.mission0QuestionBody as string).replace("COMPANY_NAME",displayCompanyName);return <main className="mission0IntroScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> MISSION 01</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="m0iStage"><img src={`./characters/${profile}-neutral.png`} alt={name} className="m0iProfileImg"/><div className="m0iPersonaTag"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div></section><section className="m0iContent"><div className="m0iMissionBadge"><span>{m0.icon}</span><i>{language==="it"?"MISSIONE 01 · DATA FOUNDATION":"MISSION 01 · DATA FOUNDATION"}</i></div><h1 className="m0iTitle">{language==="it"?m0.it:m0.en}</h1><p className="m0iKicker">{t.mission0QuestionKicker}</p><p className="m0iQuestion">{t.mission0Question}</p><p className="m0iBody">{questionBody}</p><button className="actionButton m0iCta" onClick={()=>setScreen("compare")}>{t.mission0Cta}<b>→</b></button></section></main>;}



  if(screen==="summary"&&profile)return <main className="summaryScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> ESG ROADMAP</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="summaryIntro"><p className="eyebrow">{t.summaryKicker}</p><h1>{t.summaryTitle}</h1><p>{t.summaryIntro}</p><div className="summaryPriorities"><small>{t.topPriorities}</small><div>{priorities.slice(0,3).map((p,i)=><span key={p}><b>{String(i+1).padStart(2,"0")}</b>{t.priorityNames[p]}</span>)}</div></div>{calculatedTrustScore>=80&&<div className="trustedBadgeSummary">★ {t.trustedLabel}</div>}</section><section className="summaryGrid">{missionOrder.map((missionIndex,position)=>{const m=missionCatalog[missionIndex];const outcome=missionOutcomes[missionIndex];const assignedNeeds=needsByMissionHub.find(([mi])=>mi===missionIndex)?.[1]||[];const displayNeeds=missionIndex===0?[{id:"__foundation__",label:language==="it"?"Una data foundation solida e tracciabile":"A solid and traceable data foundation"},...assignedNeeds]:assignedNeeds;return <article className={`summaryCard ${outcome}`} key={m.value}><div className="summaryCardTitle"><span>{String(position+1).padStart(2,"0")}</span><h2>{language==="it"?m.it:m.en}</h2></div><div><small>{t.adoptedDecision}</small><strong>{outcome?decisionLabel(missionIndex,outcome):"—"}</strong></div><div><small>{t.expectedImpact}</small><p>{outcome?outcomeLabel(missionIndex,outcome):"—"}</p></div><div className="summaryParams"><small>{t.parameters}</small>{displayNeeds.length>0?displayNeeds.map(n=><span key={n.id}>⬡ {n.label}</span>):<span>—</span>}</div></article>})}</section><footer className="summaryActions"><button className="secondaryAction" onClick={reset}>← {t.backStart}</button><button className="actionButton" onClick={()=>setScreen("nextStep")}>{t.nextStep}<b>→</b></button></footer></main>;

  if(screen==="nextStep"&&profile){const top3=priorities.slice(0,3).map((p,i)=>`${i+1}. ${t.priorityNames[p]}`).join(", ");const decisionsLine=missionOrder.map(mi=>{const o=missionOutcomes[mi];return o?`M${mi+1}: ${decisionLabel(mi,o)}`:`M${mi+1}: —`}).join(" | ");const paramsLine=missionOrder.map(mi=>{const vals=missionParameters[mi]||[];const items=missionItems(mi);const units=missionUnits(mi);const filled=items.map((item,i)=>vals[i]?`${item.title}: ${vals[i]} ${units[i]}`:"").filter(Boolean);return filled.length?`[M${mi+1}: ${filled.join(", ")}]`:""}).filter(Boolean).join(" ");const isIt=language==="it";const toEmail=contactEmail.trim()||t.nextContactEmail;const subj=isIt?"Demo IBM Envizi — Envizi Impact Quest":"IBM Envizi Demo — Envizi Impact Quest";const pocSubj=isIt?"Proof of Concept IBM Envizi — Envizi Impact Quest":"IBM Envizi PoC — Envizi Impact Quest";const bvaSubj=isIt?"Business Value Assessment IBM Envizi — Envizi Impact Quest":"IBM Envizi BVA — Envizi Impact Quest";const commonBody=isIt?`%0A%0A— Profilo: ${name} (${profile==="marco"?t.maleRole:t.femaleRole})%0A— Punteggio fiducia finale: ${trustScore}/100%0A— Top 3 priorità: ${top3}%0A— Decisioni: ${decisionsLine}${paramsLine?`%0A— Parametri AS-IS: ${paramsLine}`:""}${approachBiz?`%0A— Esigenze di business: ${approachBiz}`:""}${approachData?`%0A— Sfide sui dati: ${approachData}`:""}%0A%0AIn attesa di un riscontro.`:`%0A%0A— Profile: ${name} (${profile==="marco"?t.maleRole:t.femaleRole})%0A— Final trust score: ${trustScore}/100%0A— Top 3 priorities: ${top3}%0A— Decisions: ${decisionsLine}${paramsLine?`%0A— AS-IS parameters: ${paramsLine}`:""}${approachBiz?`%0A— Business needs: ${approachBiz}`:""}${approachData?`%0A— Data challenges: ${approachData}`:""}%0A%0ALooking forward to your reply.`;const demoBody=isIt?`Ciao,%0A%0AHo completato l'Envizi Impact Quest e vorrei approfondire come IBM Envizi si integra nel nostro contesto con una demo.${commonBody}`:`Hi,%0A%0AI have completed the Envizi Impact Quest and would like to explore how IBM Envizi fits our context with a demo.${commonBody}`;const pocBody=isIt?`Ciao,%0A%0AHo completato l'Envizi Impact Quest e sono interessato a un Proof of Concept con i dati reali della mia organizzazione.${commonBody}`:`Hi,%0A%0AI have completed the Envizi Impact Quest and I am interested in a Proof of Concept with my organisation's real data.${commonBody}`;const bvaBody=isIt?`Ciao,%0A%0AHo completato l'Envizi Impact Quest e vorrei richiedere un Business Value Assessment per quantificare il valore di IBM Envizi per la mia organizzazione.${commonBody}`:`Hi,%0A%0AI have completed the Envizi Impact Quest and would like to request a Business Value Assessment to quantify the value of IBM Envizi for my organisation.${commonBody}`;return <main className="nextStepScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> NEXT STEP</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="nextStepBody"><p className="eyebrow">{t.nextKicker}</p><h1>{t.nextTitle}</h1><div className="nextStepCards"><div className="nextStepCard nextStepCardDemo"><small>{t.nextDemoLabel}</small><p>{t.nextDemoIntro}</p><div className="nextDemoEmailRow"><input className="nextDemoEmailInput" type="email" placeholder={t.nextDemoEmailPlaceholder} value={contactEmail} onChange={e=>setContactEmail(e.target.value)}/></div><a className="nextStepBtn primary" href={`mailto:${toEmail}?subject=${subj}&body=${demoBody}`}>{t.nextDemoButton}</a>{!contactEmail.trim()&&<a className="nextDemoFallbackLink" href={`mailto:${t.nextContactEmail}?subject=${subj}&body=${demoBody}`}>{t.nextDemoFallback}</a>}</div><div className="nextStepCard"><small>{t.nextPocLabel}</small><p>{t.nextPocIntro}</p><a className="nextStepBtn primary" href={`mailto:${toEmail||t.nextContactEmail}?subject=${pocSubj}&body=${pocBody}`}>{t.nextPocButton}</a></div><div className="nextStepCard"><small>{t.nextBvaLabel}</small><p>{t.nextBvaIntro}</p><a className="nextStepBtn primary" href={`mailto:${toEmail||t.nextContactEmail}?subject=${bvaSubj}&body=${bvaBody}`}>{t.nextBvaButton}</a></div><div className="nextStepCard"><small>{t.nextSiteLabel}</small><p>{t.nextSiteIntro}</p><a className="nextStepBtn primary" href="https://www.ibm.com/it-it/products/envizi" target="_blank" rel="noreferrer">{t.nextSiteButton}</a></div></div><div className="nextStepContact"><small>{t.nextContactLabel}</small><strong>{t.nextContactName}</strong><span>{t.nextContactRole}</span><a href={`mailto:${t.nextContactEmail}`}>{t.nextContactEmail}</a></div><div className="nextStepActions"><button className="secondaryAction" onClick={reset}>← {t.backStart}</button><button className="actionButton" onClick={()=>setScreen("thankYou")}>{t.nextStep}<b>→</b></button></div></section></main>;}


  if(screen==="milestone"&&profile){const isTrusted=missionOutcomes[0]==="positive";const isIt=language==="it";return <main className="thankYouScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> MILESTONE</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="thankYouBody" style={{display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",gap:"0",padding:"0",overflow:"hidden"}}><div style={{height:"100%",overflow:"hidden"}}><img src={`./characters/${profile}-${isTrusted?"success":"neutral"}.png`} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/></div><div style={{padding:"3vw 4vw",display:"flex",flexDirection:"column",gap:"16px"}}><h1 style={{color:isTrusted?"#39efb4":"#ffc07c",fontSize:isTrusted?"clamp(24px,3vw,44px)":"clamp(14px,1.5vw,20px)",lineHeight:1.5,letterSpacing:"-.02em",margin:0}}>{isTrusted?(isIt?"Complimenti, hai sbloccato il livello Trusted ESG Data Manager.":"Congratulations, you have unlocked the Trusted ESG Data Manager level."):(isIt?"Avviare la digitalizzazione dell'ESG in modo semplice, con moduli per la raccolta dati e senza integrazione delle fonti, può essere un'ottima decisione per contenere costi e rischi iniziali. Anche in questo contesto IBM Envizi può diventare fattore critico di successo per la tua iniziativa. Verifica quali requisiti della gestione dati sono comunque importanti per te e il valore di Envizi a supporto.":"Starting ESG digitalisation simply, with data collection forms and without source integration, can be an excellent decision to contain initial costs and risks. Even in this context, IBM Envizi can become a critical success factor for your initiative. Check which data management requirements are still important to you and the value Envizi can provide.")}</h1><div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}><button className="secondaryAction" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button><button className="actionButton" style={{width:"auto",marginTop:0,padding:"12px 16px"}} onClick={()=>setScreen("dataFoundation")}>{isIt?"Approfondiamo perché Envizi →":"Let's explore why Envizi →"}</button></div></div></section></main>;}


  if(screen==="thankYou"&&profile)return <main className="thankYouScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> FINAL</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="thankYouBody"><h1>{t.thankYouTitle}</h1></section></main>;

  if(screen==="dataFoundation"&&profile){
    const isIt=language==="it";
    const allRated=DF_REQUIREMENTS.every(r=>dfRatings[r.id]);
    const dfScore=Object.values(dfRatings).reduce((s,v)=>s+(v==="medium"?5:v==="high"?10:0),0);
    const dfPct=Math.min(100,Math.round(dfScore));
    const dfHighlight=dfScore>=40;
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
          <p className="dfSubtitle">{isIt?"Valuta ogni requisito: Basso (+0), Medio (+5 pt), Alto (+10 pt).":"Rate each requirement: Low (+0), Medium (+5 pts), High (+10 pts)."}</p>
          {dfHighlight&&<div className="dfScoreMsg">
            <span className="dfScoreMsgIcon">⬡</span>
            <p>{isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua azienda.":"IBM Envizi is very likely the right solution for your organisation."}</p>
          </div>}
        </div>
        <div className="dfStickyRight">
          <div className="dfScoreBox">
            <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
            <strong className={dfHighlight?"dfScoreHigh":""}>{dfScore}<em>/100</em></strong>
            <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${dfPct}%`,background:dfHighlight?"#39efb4":"#ffc07c"}}/></div>
          </div>
          <button className="actionButton dfContinueBtn" disabled={!allRated} onClick={()=>setScreen("dfConclusion")}>{isIt?"Continua →":"Continue →"}</button>
          {!allRated&&<p className="dfHint">{isIt?"Valuta tutti i requisiti per continuare.":"Rate all requirements to continue."}</p>}
        </div>
      </div>

      {/* Intestazioni colonne — sticky sotto la bar */}
      <div className="dfColHeaders">
        <div className="dfColH dfColHReq">{isIt?"Requisito · Valutazione":"Requirement · Rating"}</div>
        <div className="dfColH dfColHCap">⬡ {isIt?"Capacità IBM Envizi":"IBM Envizi capability"}</div>
        <div className="dfColH dfColHBen">{isIt?"Beneficio ESG Manager":"ESG Manager benefit"}</div>
      </div>

      {/* Righe */}
      <div className="dfGrid">
        {DF_REQUIREMENTS.map((req,i)=>{
          const rating=dfRatings[req.id];
          const isActive=rating==="medium"||rating==="high";
          const pts=rating==="high"?10:rating==="medium"?5:0;
          return <div key={req.id} className={`dfRow${isActive?" dfRowActive":""}${rating==="low"?" dfRowLow":""}`}>
            <div className="dfRowReq">
              <div className="dfRowReqTop">
                <span className="dfItemNum">{String(i+1).padStart(2,"0")}</span>
                <p className="dfItemQ">{isIt?req.it:req.en}</p>
              </div>
              <div className="dfRatingGroup">
                {(["low","medium","high"] as DFRating[]).map(v=><button key={v} className={`dfRatingBtn dfRatingBtn--${v}${rating===v?" dfRatingBtnActive":""}`} onClick={()=>setDfRating(req.id,v)}>{isIt?(v==="low"?"Basso":v==="medium"?"Medio +5":"Alto +10"):(v==="low"?"Low":v==="medium"?"Medium +5":"High +10")}</button>)}
              </div>
              {isActive&&<span className={`dfRowPts dfRowPts--${rating}`}>+{pts} pt</span>}
            </div>
            <div className={`dfRowCap${isActive?"":" dfRowColDim"}`}>
              {isActive
                ?<><span className="dfRowColLabel">⬡ IBM Envizi</span><p>{isIt?req.capIt:req.capEn}</p></>
                :<span className="dfRowColEmpty">—</span>}
            </div>
            <div className={`dfRowBen${isActive?"":" dfRowColDim"}`}>
              {isActive
                ?<><span className="dfRowColLabel">{isIt?"Beneficio":"Benefit"}</span><p>{isIt?req.benIt:req.benEn}</p></>
                :<span className="dfRowColEmpty">—</span>}
            </div>
          </div>;
        })}
      </div>

      <footer className="dfFooter">
        <p className="dfSources">{isIt?"Capacità basate su: ":"Capabilities based on: "}<a href="https://www.ibm.com/products/envizi/esg-data-management" target="_blank" rel="noreferrer">ESG Data Management ↗</a>{" · "}<a href="https://www.ibm.com/docs/en/envizi-esg-suite?topic=managing-normalizing-data" target="_blank" rel="noreferrer">{isIt?"Normalizzazione dati":"Data normalisation"} ↗</a>{" · "}<a href="https://www.ibm.com/products/envizi/scope-1-2-ghg-accounting-reporting" target="_blank" rel="noreferrer">Scope 1–2 GHG ↗</a></p>
      </footer>
    </main>;
  }

  if(screen==="dfConclusion"&&profile){
    const isIt=language==="it";
    const dfScore=Object.values(dfRatings).reduce((s,v)=>s+(v==="medium"?5:v==="high"?10:0),0);
    const dfPct=Math.min(100,Math.round(dfScore));
    const dfHighlight=dfScore>=40;
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

        {/* COLONNA SX — immagine, decisione, score, CTA */}
        <div className="dfcLeft">
          <p className="eyebrow">{isIt?"CONCLUSIONI · DATA FOUNDATION":"CONCLUSIONS · DATA FOUNDATION"}</p>
          <h1 className="dfcTitle">{isIt?"La tua scelta per la gestione dei dati ESG":"Your ESG data management choice"}</h1>

          {decisionTaken&&<>
            <img src={decisionImg} alt={decisionTaken} className="dfcDecisionImg"/>
            <div className="dfcDecisionLabel">
              <small>{isIt?"DECISIONE ADOTTATA · MISSIONE 01":"DECISION ADOPTED · MISSION 01"}</small>
              <strong style={{color:decisionColor}}>{decisionTaken}</strong>
            </div>
          </>}

          <div className="dfcScorePanelLeft">
            <p className="dfcSectionLabel">{isIt?"RILEVANZA IBM ENVIZI":"IBM ENVIZI RELEVANCE"}</p>
            <div className="dfScoreBox">
              <span className="dfScoreBoxLabel">{isIt?"Punteggio rilevanza":"Relevance score"}</span>
              <strong className={dfHighlight?"dfScoreHigh":""}>{dfScore}<em>/100</em></strong>
              <div className="dfScoreTrack"><span className="dfScoreFill" style={{width:`${dfPct}%`,background:dfHighlight?"#39efb4":"#ffc07c"}}/></div>
            </div>
            <div className={`dfScoreMsg`} style={{margin:0,borderColor:dfHighlight?"#39efb4":"#ffc07c"}}>
              <span className="dfScoreMsgIcon" style={{color:dfHighlight?"#39efb4":"#ffc07c"}}>⬡</span>
              <p style={{color:dfHighlight?"#39efb4":"#ffc07c"}}>{dfHighlight
                ?(isIt?"Molto probabilmente IBM Envizi è la soluzione per la tua azienda.":"IBM Envizi is very likely the right solution for your organisation.")
                :(isIt?"Alcuni requisiti sono prioritari: approfondisci con il tuo team IBM.":"Some requirements are a priority — explore further with your IBM team.")
              }</p>
            </div>
          </div>

          <div className="dfcActions">
            <button className="actionButton" onClick={()=>goBack()}>{isIt?"← Indietro":"← Back"}</button>
            <button className="actionButton" onClick={()=>setScreen("missions")}>{isIt?"Entra nella roadmap →":"Enter the roadmap →"}</button>
          </div>
        </div>

        {/* COLONNA DX — fattori divisi per livello */}
        <div className="dfcRight">
          {highReqs.length>0&&<section className="dfcSection">
            <p className="dfcIntroTitle">{isIt?"Abbiamo recepito che per te la scelta Envizi può essere giustificata per:":"We've noted that for you the Envizi choice can be justified by:"}</p>
            <p className="dfcSectionLabel" style={{color:"#39efb4"}}>{isIt?"FATTORI MOLTO RILEVANTI":"HIGHLY RELEVANT FACTORS"}</p>
            <ul className="dfcFactorList">
              {highReqs.map(r=><li key={r.id} style={{fontSize:"clamp(28px,2.8vw,38px)",fontWeight:600,color:"#effbf6"}}><span className="dfcFactorDot" style={{background:"#39efb4",width:"10px",height:"10px"}}/>{isIt?r.it:r.en}</li>)}
            </ul>
          </section>}

          {medReqs.length>0&&<section className="dfcSection">
            <p className="dfcSectionLabel" style={{color:"#ffc07c"}}>{isIt?"FATTORI MEDIAMENTE RILEVANTI":"MODERATELY RELEVANT FACTORS"}</p>
            <ul className="dfcFactorList">
              {medReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)"}}><span className="dfcFactorDot" style={{background:"#ffc07c"}}/>{isIt?r.it:r.en}</li>)}
            </ul>
          </section>}

          {lowReqs.length>0&&<section className="dfcSection">
            <p className="dfcSectionLabel" style={{color:"#57606a"}}>{isIt?"FATTORI NON RILEVANTI":"NON-RELEVANT FACTORS"}</p>
            <ul className="dfcFactorList">
              {lowReqs.map(r=><li key={r.id} style={{fontSize:"clamp(20px,1.8vw,26px)"}}><span className="dfcFactorDot" style={{background:"#57606a"}}/>{isIt?r.it:r.en}</li>)}
            </ul>
          </section>}
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
                  <div className={`csGeoRow${geoError?" csGeoRowError":" csGeoRowItalia"}`}><span>{isIt?"Italia":"Italy"}</span><input className="csDimInput" type="number" readOnly value={italyVal}/><span>%</span></div>
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
      <section className="companyCopy"><p className="eyebrow">{t.companyIntro}</p><h1>{displayCompanyName}</h1><p className="companySubtitle">{isIt?"Edita con i tuoi valori o prosegui con i default mostrati":"Edit with your values or continue with the defaults shown"}</p><p className="companyLead">{companyStoryGen}</p><div className="companyStats"><div><strong>{dimVal}</strong><span>{dimUnit}</span></div><div><strong>{opsVal}</strong><span>{opsUnit}</span></div><div><strong>{officesVal}</strong><span>{offUnit}</span></div><div><strong>{peopleVal.toLocaleString()}</strong><span>{pepUnit}</span></div></div><blockquote>{evolvingGen}</blockquote><button className="actionButton" onClick={()=>setScreen("priorities")}>{t.explore}<b>→</b></button></section>
      <section className="worldMap" aria-label={`${displayCompanyName} footprint`}>
        <div className="mapGrid"/>
        <div className="region americas">AMERICAS</div><div className="region emea">EMEA</div><div className="region apac">APAC</div>
        <div className="mapPoint office milan" title="Milano HQ"><i/><span style={{left:"24px",top:"-46px",bottom:"auto",lineHeight:"1.45"}}><b style={{display:"block",color:"#effff9"}}>HQ · {displayCompanyName}</b><small style={{display:"block",color:"#72f7ca",fontSize:"8px"}}>MILAN</small></span></div>
        {activeGeo.filter(k=>k!=="italia").map(k=>{const pct=geoDistrib[k]??0;const count=Math.max(1,Math.round(pct/10));const positions=posMap[k]||[];return Array.from({length:Math.min(count,positions.length)}).map((_,idx)=><div key={`${k}-${idx}`} className="mapPoint office" style={{left:positions[idx].left,top:positions[idx].top}} title={isIt?geoLabelsShort[k].it:geoLabelsShort[k].en}><i/>{idx===0&&<span>{isIt?geoLabelsShort[k].it:geoLabelsShort[k].en} · {pct}%</span>}</div>);})}
        <div className="mapLegend"><b><i className="officeDot"/> {isIt?"SEDE":"OFFICE"}</b></div>
      </section>
    </main>;
  }

  if(screen==="priorities"&&profile)return <main className="priorityScreen"><header className="missionNav missionNavTrust"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> BUSINESS PRIORITIES</div>{renderTrustBar()}<button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="priorityIntro"><p className="eyebrow">{t.priorityKicker}</p><h1>{t.priorityTitle}</h1><p>{(t.priorityIntro as string).replace("COMPANY_NAME",displayCompanyName)}</p><div className="priorityPersona"><img src={`./characters/${profile}-neutral.png`} alt={name}/><span>{name}<small>ESG MANAGER</small></span></div></section><section className="priorityBoard"><div className="priorityList">{priorities.map((p,i)=><div className="priorityItem" key={p}><input className={`priorityRankInput${i<3?" priorityRankInputTop":""}`} type="number" min="1" max="6" value={i+1} onChange={e=>{const v=parseInt(e.target.value,10);if(!isNaN(v))rankPriority(i,v);}} onFocus={e=>e.target.select()} aria-label={`Posizione di ${t.priorityNames[p]}`}/><div><b>{t.priorityNames[p]}</b><small>{t.priorityDetails[p]}</small></div></div>)}</div><button className="actionButton" onClick={()=>{localStorage.setItem("envizi-quest-priorities",JSON.stringify(priorities));setScreen("priorityData")}}>{t.confirm}<b>→</b></button></section></main>;

  if(screen==="priorityData"&&profile){
    const top3=priorities.slice(0,3);
    return <main className="priorityDataScreen">
      <header className="missionNav missionNavTrust">
        <button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button>
        <div className="missionProgress"><span className="activeDot"/> DATA NEEDS</div>
        {renderTrustBar()}
        <button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button>
      </header>
      <section className="pdIntroBar">
        <div className="pdIntroLeft">
          <p className="eyebrow">{t.priorityDataKicker}</p>
          <h1>{t.priorityDataTitle}</h1>
          <p className="pdIntroText">{t.priorityDataIntro}</p>
          <div className="pdPersona">
            <img src={`./characters/${profile}-neutral.png`} alt={name}/>
            <div><strong>{name}</strong><small>ESG MANAGER</small></div>
          </div>
        </div>
        <div className="pdRightCol">
          <div className="pdTopNBox">
            <div className="pdTopNStepper">
              <div className="pdTopNStepperControls">
                <button className="pdTopNBtn" onClick={()=>setTopNNeeds(v=>Math.min(15,v+1))} disabled={topNNeeds>=15} aria-label="Aumenta">▲</button>
                <span className="pdTopNValue">{topNNeeds}</span>
                <button className="pdTopNBtn" onClick={()=>setTopNNeeds(v=>Math.max(5,v-1))} disabled={topNNeeds<=5} aria-label="Diminuisci">▼</button>
              </div>
              <div className="pdTopNStepperText">
                <span className="pdTopNStepperDesc">{language==="it"?"Clicca le frecce per variare il numero di requirement\nda considerare nella slide successiva":"Click the arrows to vary the number of requirements\nto carry into the next slide"}</span>
                <span className="pdTopNHint">{language==="it"?"min 5 · max 15":"min 5 · max 15"}</span>
              </div>
            </div>
          </div>
          <button className="actionButton pdConfirmBtn" onClick={()=>setScreen("roadmapPreview")}>{t.priorityDataCta}<b>→</b></button>
        </div>
      </section>
      <section className="pdColumns">
        {top3.map((p,i)=>{
          const colItems=dataNeeds.filter(n=>n.priority===p);
          return <div key={p} className="pdCol">
            <div className="pdColHeader">
              <span className="pdColNum">{String(i+1).padStart(2,"0")}</span>
              <strong>{t.priorityNames[p]}</strong>
            </div>
            <div className="pdColItems">
              {colItems.map(item=>{
                const globalIdx=dataNeeds.findIndex(n=>n.id===item.id);
                const globalRank=globalIdx+1;
                const isTop=globalRank<=topNNeeds;
                return <div key={item.id} className={`pdItem${isTop?" pdItemTop":""}`}>
                  <input
                    className={`pdItemRankInput${isTop?" pdItemRankInputTop":""}`}
                    type="number" min="1" max="15"
                    value={globalRank}
                    onChange={e=>{const v=parseInt(e.target.value,10);if(!isNaN(v))rankNeed(globalIdx,v);}}
                    onFocus={e=>e.target.select()}
                    aria-label={`Posizione di "${item.label}"`}
                  />
                  <span className="pdItemLabel">{item.label}</span>
                </div>;
              })}
            </div>
          </div>;
        })}
      </section>
    </main>;
  }

  if(screen==="bridge"&&profile){
    const top5=topNeeds;
    const missions=t.bridgeMissions as {num:string,label:string,need:string}[];
    // group top5 needs by destination mission (fallback → data foundation)
    const needsByMission:Record<number,typeof top5>=Object.fromEntries([0,1,2,3,4].map(i=>[i,[]]));
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
      positive:["./envizi-data-automation.png","./energy-envizi-analytics.png","./supply-chain-envizi.png","./reporting-envizi.png","./planning-envizi.png"],
      warning:["./envizi-manual-forms.png","./energy-manual-dashboard.png","./supply-chain-portal.png","./reporting-intermediate.png","./planning-intermediate.png"],
      critical:["./envizi-spreadsheets-email.png","./energy-asis-fragmented.png","./supply-chain-asis.png","./reporting-asis.png","./planning-asis.png"]
    };
    const options=[
      {key:"critical" as Outcome,label:"C",title:active.optionC,detail:active.optionCDetail,img:missionImgs.critical[selectedMission]},
      {key:"warning" as Outcome,label:"B",title:active.optionB,detail:active.optionBDetail,img:missionImgs.warning[selectedMission]},
      {key:"positive" as Outcome,label:"A",title:active.optionA,detail:active.optionADetail,img:missionImgs.positive[selectedMission]}
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
    return <main className="compareScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {t.mission} <b>{String(selectedMission+1).padStart(2,"0")}</b><i>/</i>05</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header>
    <section className="compareBody"><h1>{language==="it"?"Scegli la strada":"Choose your path"}</h1><p className="compareHint">{language==="it"?"Clicca sull'immagine per selezionare la tua scelta e proseguire.":"Click an image to make your choice and continue."}</p><div className="compareGrid">{options.map(opt=><article key={opt.key} className={`compareCard ${opt.key}`} onClick={()=>handleDecision(opt.key)}><div className="compareImg"><img src={opt.img} alt={opt.title}/><div className="compareImgOverlay"><span>{language==="it"?"Scegli →":"Select →"}</span></div></div><div className="compareText"><strong>{opt.title}</strong><p>{opt.detail}</p></div>{critOnCard[critLevel]===opt.key&&<div className="compareCritBadge" style={{color:critColor,borderColor:critColor}}><span className="compareCritScore">{totalCrit}<small>/100</small></span><span className="compareCritLabel">{critLabel[critLevel]}</span></div>}</article>)}</div></section></main>;
  }

  if(screen==="tobe"&&profile){
    const tobeDeltas:{[mi:number]:{positive:(number|null)[],warning:(number|null)[],critical:(number|null)[]}}={
      0:{positive:[0.83,0.38,0.17,0.10],warning:[0.92,0.72,0.78,0.60],critical:[1,1,1,1]},
      1:{positive:[0.82,0.88,0.13,0.18],warning:[0.93,0.95,0.48,0.55],critical:[1,1,1,1]},
      2:{positive:[null,0.62,null,0.12],warning:[null,0.80,null,0.45],critical:[null,1,null,1]},
      3:{positive:[0.33,0.21,0.12,0.28],warning:[0.72,0.65,0.55,0.60],critical:[1,1,1,1]},
      4:{positive:[null,null,3.2,0.55],warning:[null,null,1.8,0.75],critical:[null,null,1,1]},
    };
    const items=missionItems(selectedMission);
    const units=missionUnits(selectedMission);
    const userVals=missionParameters[selectedMission]||[];
    const deltas=tobeDeltas[selectedMission]?.[pendingOutcome]||items.map(()=>null);
    const outcomeColor=pendingOutcome==="positive"?"#39efb4":pendingOutcome==="warning"?"#ffc07c":"#ff7777";
    const outcomeLabel2=pendingOutcome==="positive"?(language==="it"?"Scelta A — Envizi":"Option A — Envizi"):pendingOutcome==="warning"?(language==="it"?"Scelta B — Soluzione intermedia":"Option B — Intermediate"):language==="it"?"Scelta C — Rimandare":"Option C — Postpone";
    return <main className="tobeScreen"><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {t.mission} <b>{String(selectedMission+1).padStart(2,"0")}</b><i>/</i>05</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="tobeBody"><div className="tobeIntro"><p className="eyebrow">{t.tobeKicker}</p><h1>{t.tobeTitle}</h1><p className="tobeSubtitle">{t.tobeSubtitle}</p><div className="tobeChoiceBadge" style={{borderColor:outcomeColor,color:outcomeColor}}>{outcomeLabel2}</div></div><div className="tobeGrid">{items.map((item,i)=>{const raw=userVals[i]?parseFloat(userVals[i]):null;const factor=deltas[i];const hasDelta=factor!==null&&factor!==1;const tobeVal=raw!==null&&factor!==null?raw*factor:null;const isImprovement=factor!==null&&factor<1;const isWorse=factor!==null&&factor>1;const deltaSign=isImprovement?"↓":isWorse?"↑":"—";const deltaColor=isImprovement?outcomeColor:isWorse?"#ff7777":"#7a9a90";return <article key={item.title} className={`tobeCard${hasDelta?" tobeCardChanged":""}`}><div className="tobeCardHeader"><span className="tobeCardNum">{String(i+1).padStart(2,"0")}</span><strong>{item.title}</strong></div><div className="tobeRow"><div className="tobeCol"><small>{t.tobeAsIs}</small><b>{raw!==null?`${raw} ${units[i]}`:item.metric}</b></div><div className="tobeArrow" style={{color:deltaColor}}>{deltaSign}</div><div className="tobeCol tobeColNew"><small>{t.tobeToBe}</small><b style={{color:tobeVal!==null?outcomeColor:undefined}}>{tobeVal!==null?`${tobeVal%1===0?tobeVal:tobeVal.toFixed(1)} ${units[i]}`:factor===1?(language==="it"?"Invariato":"Unchanged"):(language==="it"?"n.d.":"n/a")}</b></div></div>{hasDelta&&tobeVal!==null&&raw!==null&&<div className="tobeDeltaBar"><span className="tobeDeltaLabel" style={{color:deltaColor}}>{t.tobeDelta}: {isImprovement?"-":"+"}{Math.abs(Math.round((1-factor)*100))}%</span></div>}</article>; })}</div><div className="tobeDisclaimer"><span>⚠</span><p>{t.tobeDisclaimer}</p></div><button className="actionButton" onClick={()=>setScreen(pendingOutcome==="positive"?"success":"negative")}>{t.tobeCta}<b>→</b></button></section></main>;
  }



  if(screen!=="onboarding"&&profile){const result=screen==="negative"||screen==="success";return <main className={`missionScreen mission-${selectedMission} ${screen} ${screen==="negative"?(negativeChoice==="form"?"formOutcome":"asIsOutcome"):""}`}><header className="missionNav"><button className="brand brandButton" onClick={reset}><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></button><div className="missionProgress"><span className="activeDot"/> {t.mission} <b>{String(selectedMission+1).padStart(2,"0")}</b><i>/</i>05</div><button className="langMini" onClick={()=>setLanguage(language==="it"?"en":"it")}>{language==="it"?"EN":"IT"}</button></header><section className="characterStage"><img src={imageFor(profile,screen)} alt={`${name} · ${screen}`}/><div className="characterTag"><span className="statusDot"/><div><small>ESG MANAGER</small><strong>{name}</strong></div></div>{screen==="trust"&&<button className="actionButton trustStageCta" onClick={()=>setScreen(selectedMission===0?"milestone":"missions")}>{t.trustContinue}<b>→</b></button>}</section><section className="missionContent"><div className="missionLabel"><span>{t.mission} {String(selectedMission+1).padStart(2,"0")}</span><i>90 DAYS</i></div>
    {screen==="briefing"&&(()=>{const effects=(t.crossEffects[selectedMission]||[]).filter(e=>{const o=missionOutcomes[e.from];return o&&(e[o as keyof typeof e] as string|null)!==null});return<><h1>{language==="it"?missionCatalog[selectedMission].it:missionCatalog[selectedMission].en}</h1><div className="companyChip"><strong>{displayCompanyName}</strong><span>{t.companyFacts}</span></div>{effects.length>0&&<div className="crossEffectBanners">{effects.map(e=>{const o=missionOutcomes[e.from] as Outcome;const msg=e[o as keyof typeof e] as string;return<div key={e.from} className={`crossEffectBanner ${o}`}><span className="crossEffectIcon">{o==="positive"?"✓":"!"}</span><p><strong>{t.crossEffectLabel} · {language==="it"?missionCatalog[e.from].it:missionCatalog[e.from].en}:</strong> {msg}</p></div>})}</div>}<p className="storyText">{(active.briefing as string).replace("COMPANY_NAME",displayCompanyName)}</p><div className="objectiveBox"><small>{t.objective}</small><p>{active.objectiveText}</p></div><button className="actionButton" onClick={()=>setScreen("asis")}>{t.analyse}<b>→</b></button></>;})()}
    {screen==="asis"&&(()=>{const ratingVal={"alto":25,"medio":12,"basso":0};const currentRatings=asIsRatings[selectedMission]||(active.asIsItems.map(()=>"alto" as "alto"|"medio"|"basso"));const total=currentRatings.reduce((s,r)=>s+ratingVal[r],0);const totalColor=total<=25?"#39efb4":total<=50?"#f5c542":"#ff6b6b";const totalLabel=language==="it"?(total<=25?"BASSA":total<=50?"MEDIA":"ALTA"):(total<=25?"LOW":total<=50?"MEDIUM":"HIGH");const setRating=(i:number,v:"alto"|"medio"|"basso")=>{const next=[...currentRatings];next[i]=v;setAsIsRatings({...asIsRatings,[selectedMission]:next});};return<><div className="asisHeader"><div><p className="resultEyebrow">{t.asIsKicker}</p><h1>{active.asIsTitle}</h1></div><button className="actionButton asisTopBtn" onClick={()=>setScreen("missionIntro")}>{t.proceedDecision}<b>→</b></button></div><p className="storyText asisIntroText">{(active.asIsIntro as string).replace("COMPANY_NAME",displayCompanyName)}</p><div className="asIsRatingGrid">{active.asIsItems.map((item,i)=>{const r=currentRatings[i];return<article key={item.title} className={`asIsRatingCard asIsRating-${r}`}><div className="asIsRatingCardTop"><h2>{item.title}</h2><p>{item.detail}</p></div><div className="asIsRatingButtons"><button className={`asIsRatingBtn${r==="alto"?" asIsRatingBtnActive asIsRatingBtnAlto":""}`} onClick={()=>setRating(i,"alto")}>{language==="it"?"Alto":"High"}</button><button className={`asIsRatingBtn${r==="medio"?" asIsRatingBtnActive asIsRatingBtnMedio":""}`} onClick={()=>setRating(i,"medio")}>{language==="it"?"Medio":"Medium"}</button><button className={`asIsRatingBtn${r==="basso"?" asIsRatingBtnActive asIsRatingBtnBasso":""}`} onClick={()=>setRating(i,"basso")}>{language==="it"?"Basso":"Low"}</button></div></article>})}</div><div className="asisTotal"><span className="asisTotalLabel">{language==="it"?"Criticità totale":"Total criticality"}</span><span className="asisTotalScore" style={{color:totalColor}}>{total}<span className="asisTotalMax">/100</span></span><span className="asisTotalBadge" style={{color:totalColor,borderColor:totalColor}}>{totalLabel}</span></div></>;})()}
    {screen==="decision"&&<><h1>{t.decisionTitle}</h1><p className="storyText">{active.decisionIntro}</p><div className="decisionList"><button onClick={()=>handleDecision("positive")}><span>A</span><div><strong>{active.optionA}</strong><small>{active.optionADetail}</small>{selectedMission!==0&&<span className="decisionPrereqNote"><b>⬡</b>{t.prereqNoteLabel}: {t.prereqNoteText}</span>}</div><b>↗</b></button><button onClick={()=>handleDecision("warning")}><span>B</span><div><strong>{active.optionB}</strong><small>{active.optionBDetail}</small></div><b>↗</b></button><button onClick={()=>handleDecision("critical")}><span>C</span><div><strong>{active.optionC}</strong><small>{active.optionCDetail}</small></div><b>↗</b></button></div></>}
    {screen==="trust"&&<><p className="resultEyebrow">{t.trustKicker}</p><h1>{t.trustTitle}</h1><p className="storyText">{activeTrustIntro}</p>{activeTrustSources&&activeTrustSources.length>0&&<p className="trustSourceList">{language==="it"?"Fonti: ":"Sources: "}{activeTrustSources.map((s,i)=><><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>{i<activeTrustSources.length-1&&" · "}</>)}</p>}<div className="trustEvolutionChart"><small className="trustChartLabel">{language==="it"?"Evoluzione missione per missione":"Mission-by-mission evolution"}</small><svg width="100%" viewBox={"0 0 "+trustTotalW+" "+(TRUST_CHART_H+40)} preserveAspectRatio="xMidYMid meet">{[30,50,70,100].map(v=>{const y=4+TRUST_CHART_H-(v/100)*TRUST_CHART_H;return<g key={v}><line x1={TRUST_SVG_PAD_X} x2={trustTotalW-TRUST_SVG_PAD_X} y1={y} y2={y} stroke="#1e3a30" strokeWidth="1" strokeDasharray="3 4"/><text x={TRUST_SVG_PAD_X-2} y={y+4} fontSize="8" fill="#4a6d60" textAnchor="end">{v}</text></g>;})} {trustSteps.map((s,i)=>{const x=TRUST_SVG_PAD_X+i*(TRUST_BAR_W+TRUST_BAR_GAP);const isEmpty=s.val===null;const barH=isEmpty?12:(s.val!/100)*TRUST_CHART_H;const barY=4+TRUST_CHART_H-barH;return<g key={i}>{s.isCurrent&&<rect x={x-5} y={4} width={TRUST_BAR_W+10} height={TRUST_CHART_H+8} rx="8" fill="rgba(57,239,180,0.07)" stroke={s.fill==="none"?"#39efb4":s.fill} strokeWidth="1.5" strokeDasharray={s.fill==="none"?"4 3":"0"}/>}<rect x={x} y={isEmpty?barY+barH-12:barY} width={TRUST_BAR_W} height={isEmpty?12:barH} rx="5" fill={isEmpty?"none":s.fill} stroke={s.stroke} strokeWidth={s.strokeW} opacity={isEmpty?1:0.92}/>{!isEmpty&&<text x={x+TRUST_BAR_W/2} y={barY-5} fontSize="11" fill={i===0?"#7fa898":s.isCurrent?"#f2fff9":"#c9e8dc"} textAnchor="middle" fontWeight={s.isCurrent?"700":"400"}>{s.val}</text>}{isEmpty&&<text x={x+TRUST_BAR_W/2} y={barY+barH/2+5} fontSize="9" fill="#3d6052" textAnchor="middle">—</text>}<text x={x+TRUST_BAR_W/2} y={4+TRUST_CHART_H+18} fontSize="8" fill={s.isCurrent?"#8affda":isEmpty?"#3d6052":"#7da89a"} textAnchor="middle">{s.label.split("\n")[0]}</text>{s.label.split("\n")[1]&&<text x={x+TRUST_BAR_W/2} y={4+TRUST_CHART_H+28} fontSize="8" fill={s.isCurrent?"#8affda":isEmpty?"#3d6052":"#7da89a"} textAnchor="middle">{s.label.split("\n")[1]}</text>}</g>;})} </svg></div><div className="trustPanel"><div className="trustScoreCard"><small>{t.trustScore}</small><strong>{trustScore}</strong><span>{t.trustBase}: 30 · {t.trustMax}</span><div className="trustBar"><span style={{width:trustScore+"%"}}/></div><p>{t.trustProgressLabel}</p></div><div className="trustStakeholders"><small>{t.trustStakeholders}</small><div><span>{t.trustBoard}</span><span>{t.trustBanks}</span><span>{t.trustClients}</span><span>{t.trustAuditors}</span></div></div><div className="trustGainCard"><small>{t.trustCurrentDecision}</small><strong>{missionOutcomes[selectedMission]==="positive"?(selectedMission===0?(language==="it"?"Scelta fondante · +25":"Foundational choice · +25"):t.trustGainPositive):missionOutcomes[selectedMission]==="warning"?t.trustGainWarning:t.trustGainCritical}</strong><p>{t.trustPersonaLabel}</p><b>{name}</b><span>{profile==="marco"?t.maleRole:t.femaleRole}</span></div></div></>}

    {result&&<><p className="resultEyebrow">{screen==="success"?active.enviziValue:t.impact}</p><h1>{screen==="success"?active.successTitle:negativeChoice==="form"?active.warningTitle:active.criticalTitle}</h1><p className="storyText">{screen==="success"?active.successText:negativeChoice==="form"?active.warningText:active.criticalText}</p>{screen==="success"&&<div className="enviziFactChip"><span className="efcNumber">40.000+</span><div className="efcText"><span className="efcLabel">{t.efcLabel}</span><span className="efcDetail">{t.efcByMission[selectedMission]}</span><span className="efcSource"><a href="https://www.ibm.com/docs/it/envizi-esg-suite?topic=reference-emission-factors" target="_blank" rel="noreferrer">{language==="it"?"Libreria fattori Envizi ↗":"Envizi factor library ↗"}</a>{" · "}<span>{language==="it"?"Compatibile anche con ecoinvent":"Also compatible with ecoinvent"}</span></span></div></div>}<div className="metrics"><div><span>{active.metricLabels[0]}</span><strong>{resultValues[0]}</strong></div><div><span>{active.metricLabels[1]}</span><strong>{resultValues[1]}</strong></div><div><span>{active.metricLabels[2]}</span><strong>{resultValues[2]}</strong></div></div><blockquote className="boardQuote"><small>{t.boardQuoteLabel} · CFO, {displayCompanyName}</small><p>"{t.boardQuotes[selectedMission][screen==="success"?"positive":negativeChoice==="form"?"warning":"critical"]}"</p></blockquote><button className="actionButton" onClick={()=>setScreen(selectedMission===0?"milestone":"missions")}>{t.backScenarios}<b>→</b></button></>}
  </section></main>}


  if(screen==="cover")return <main className="coverScreen"><img className="coverImage" src="./cover-marco.png" alt="Envizi Impact Quest"/><div className="coverCta"><button className="coverStartBtn" onClick={()=>setScreenState("onboarding")}>START</button></div></main>;


  return <main className="onboarding"><div className="ambient ambientOne"/><div className="ambient ambientTwo"/><header className="topbar"><div className="brand"><span className="brandMark">e·</span><span>Envizi<br/>Impact Quest</span></div><div className="step">01 <span>/</span> 05</div></header><section className="introPanel"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="intro">{t.intro}</p><p className="thread">{t.sameStory}</p><p className="authorDisclaimer">{t.disclaimer}<a href="mailto:felice_petrignano@it.ibm.com">felice_petrignano@it.ibm.com</a></p></section><section className="choicePanel"><div className="choiceHeading"><div><span className="choiceNumber">01</span><h2>{t.language}</h2></div><div className="languageSwitch"><button className={language==="it"?"active":""} onClick={()=>setLanguage("it")}>Italiano <span>🇮🇹</span></button><button className={language==="en"?"active":""} onClick={()=>setLanguage("en")}>English <span>🇬🇧</span></button></div></div><div className="profileSection"><div className="profileTitle profileTitleHighlighted"><span className="choiceNumber">02</span><h2>{t.profile}</h2></div><div className="profilesWrap"><div className="profiles profilesGuided">{(["marco","luisa"] as Profile[]).map(p=><button key={p} className={`profileCard ${profile===p?"selected":""}`} onClick={()=>setProfile(p)}><img src={`./characters/${p}-neutral.png`} alt={p==="marco"?"Marco Rossi":"Luisa Bianchi"}/><div className="profileInfo"><span className="statusDot"/><div><strong>{p==="marco"?"Marco Rossi":"Luisa Bianchi"}</strong><small>{p==="marco"?t.maleRole:t.femaleRole}</small></div></div><span className="selector">{profile===p?"✓":"+"}</span></button>)}{!profile&&<div className="profilesMouseLane" aria-hidden="true"><span className="mouseDemo profileMouse"><img src="./hand-pointer.svg" alt=""/></span></div>}</div></div></div><button className="startButton" disabled={!profile} onClick={start}><span>{profile?`${t.start} · ${profile==="marco"?"Marco":"Luisa"}`:t.start}</span><b>→</b></button>{!profile&&<p className="hint">{t.select}</p>}<p className="bobCredit">{language==="it"?"Sviluppato con IBM Bob":"Developed with IBM Bob"}</p></section></main>;
}
