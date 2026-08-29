export type Language = "it" | "en";
export type Profile = "marco" | "luisa";
export type Screen = "cover" | "welcome" | "onboarding" | "intro" | "approach" | "questIntro" | "approachIntro" | "approachSteps" | "approachData" | "approachDecisions" | "approachRoadmap" | "approachTrust" | "approachReport" | "separatorNext" | "approachStepsCopy" | "companySetup" | "missions" | "roadmapPreview" | "chapterOneSummary" | "esgStrategist" | "challengeSeparator1" | "introCopy" | "introCopy2" | "company" | "priorities" | "approachDataCopy" | "priorityData" | "priorityMatrix" | "bridge" | "briefing" | "missionIntro" | "asis" | "milestone" | "dataFoundation" | "dfConclusion" | "dfSummary" | "compare" | "tobe" | "trust" | "negative" | "success" | "reportingFoundation" | "reportingConclusion" | "energyFoundation" | "energyConclusion" | "supplyFoundation" | "supplyConclusion" | "planningFoundation" | "planningConclusion" | "frameworkFoundation" | "frameworkConclusion" | "summary" | "nextStep" | "thankYou";
export type Market = "italia" | "europa" | "mondo";
export type EsgReadiness = "primi" | "consolidamento" | "decisioni";
export type SectorKey = "manifatturiero"|"bancario"|"assicurativo"|"utilities"|"distribuzione"|"farmaceutico"|"sanitario"|"logistico"|"alberghiero"|"telecomunicazioni"|"trasporti"|"costruzioni"|"immobiliare"|"media"|"tecnologico"|"pa"|"universitario"|"nonprofit";
export type Priority = "credit" | "compliance" | "customers" | "efficiency" | "supply" | "reputation";
export type Outcome = "positive" | "warning" | "critical";
export type DFRating = "low" | "medium" | "high";
export type SectorDef = {
  label:{it:string,en:string};
  dimLabel:{it:string,en:string};
  dimUnit:{it:string,en:string};
  opsLabel:{it:string,en:string};
  opsUnit:{it:string,en:string};
  defaults:[number,number,number,number,number];
};
