/**
 * Domain module: the three levels of government in India and who does which job (Q1).
 * See docs/rules/WORLD_RULES.md
 */

export type GovLevel = 'local' | 'state' | 'union';

/** From the closest to the people to the whole country. */
export const GOV_LEVELS: readonly GovLevel[] = ['local', 'state', 'union'];

export type CivicJob = 'streetlight' | 'garbage' | 'police' | 'highway' | 'rupee' | 'army';

/** Local bodies look after lanes and waste; police and state roads are state subjects; money and defence are union subjects. */
export const JOB_LEVEL: Readonly<Record<CivicJob, GovLevel>> = {
  streetlight: 'local',
  garbage: 'local',
  police: 'state',
  highway: 'state',
  rupee: 'union',
  army: 'union',
};

export const CIVIC_JOBS = Object.keys(JOB_LEVEL) as CivicJob[];

export type Representative = 'sarpanch' | 'mla' | 'mp';

/** Whom grown-ups elect at each level: sarpanch (gram panchayat), MLA (state assembly), MP (Parliament). */
export const ELECTED_AT: Readonly<Record<Representative, GovLevel>> = {
  sarpanch: 'local',
  mla: 'state',
  mp: 'union',
};

export const REPRESENTATIVES = Object.keys(ELECTED_AT) as Representative[];

export function levelForJob(job: CivicJob): GovLevel {
  const level = JOB_LEVEL[job];
  if (!level) throw new Error(`Unknown job: ${job}`);
  return level;
}

export function levelOfRepresentative(rep: Representative): GovLevel {
  const level = ELECTED_AT[rep];
  if (!level) throw new Error(`Unknown representative: ${rep}`);
  return level;
}
