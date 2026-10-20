/**
 * Rights and responsibilities (Q2 "A good citizen"): every right is paired with the duty that keeps it
 * working for everyone, and everyday situations have one careful choice.
 */

export type Right = 'education' | 'clean' | 'public' | 'vote';
export type Duty = 'learn' | 'bin' | 'protect' | 'choose';

export const RIGHTS: readonly Right[] = ['education', 'clean', 'public', 'vote'];

const DUTY_OF: Record<Right, Duty> = {
  education: 'learn',
  clean: 'bin',
  public: 'protect',
  vote: 'choose',
};

export const DUTIES: readonly Duty[] = ['bin', 'choose', 'learn', 'protect'];

export function dutyFor(right: Right): Duty {
  return DUTY_OF[right];
}

export type CareSituation = 'wrapper' | 'tap' | 'seat';
export type CareAction =
  | 'binIt'
  | 'dropIt'
  | 'hideIt'
  | 'closeTap'
  | 'walkOn'
  | 'splash'
  | 'stopFriend'
  | 'join'
  | 'watch';

export interface Situation {
  id: CareSituation;
  actions: readonly CareAction[];
  careful: CareAction;
  /** The right that the careful action protects. */
  right: Right;
}

export const SITUATIONS: readonly Situation[] = [
  { id: 'wrapper', actions: ['dropIt', 'binIt', 'hideIt'], careful: 'binIt', right: 'clean' },
  { id: 'tap', actions: ['walkOn', 'splash', 'closeTap'], careful: 'closeTap', right: 'public' },
  { id: 'seat', actions: ['stopFriend', 'join', 'watch'], careful: 'stopFriend', right: 'public' },
];

export function isCareful(situation: CareSituation, action: CareAction): boolean {
  const s = SITUATIONS.find((x) => x.id === situation);
  if (!s) throw new Error(`unknown situation ${situation}`);
  if (!s.actions.includes(action)) throw new Error(`${action} is not a choice in ${situation}`);
  return s.careful === action;
}
