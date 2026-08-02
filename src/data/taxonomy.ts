/**
 * The filtering model for Studio Credits.
 *
 * THE ONE RULE: a credit entry never declares which filter group it belongs
 * to. It declares its fine-grained ROLES only. Group membership is derived
 * from those roles by `groupsOf()` below. This means adding a new role is a
 * one-line change here and nothing in the data files has to be revisited,
 * and it makes "credit tagged Producer but not in the Production group"
 * unrepresentable.
 */

/** The three selectable pills, in bar order. */
export const GROUPS = [
  {
    key: 'musician',
    label: 'STUDIO MUSICIAN',
    roles: ['Guitarist', 'Bassist', 'Trumpet', 'Keys', 'Drums', 'Vocals'],
    color: 'navy',
  },
  {
    key: 'production',
    label: 'PRODUCTION & COMPOSITION',
    roles: ['Producer', 'Composer', 'Arranger'],
    color: 'purple',
  },
  {
    key: 'engineering',
    label: 'ENGINEER',
    roles: [
      'Mixing Engineer',
      'Tracking Engineer',
      'Mastering Engineer',
      'Assistant Engineer',
    ],
    color: 'crimson',
  },
] as const

export type GroupKey = (typeof GROUPS)[number]['key']

/**
 * Every legal role, derived from GROUPS. A role that isn't listed in some
 * group is a type error at the credit's call site — which is exactly the
 * bug you want caught, since an orphan role would silently never match a
 * filter.
 */
export type Role = (typeof GROUPS)[number]['roles'][number]

const ROLE_TO_GROUP = new Map<string, GroupKey>(
  GROUPS.flatMap((g) => g.roles.map((r): [string, GroupKey] => [r, g.key])),
)

/** Which filter groups a set of roles puts an entry into. Deduped, no order guarantee. */
export function groupsOf(roles: readonly Role[]): GroupKey[] {
  const out = new Set<GroupKey>()
  for (const r of roles) {
    const g = ROLE_TO_GROUP.get(r)
    if (g) out.add(g)
  }
  return [...out]
}

/**
 * Filter semantics, matching the mockup exactly: AND across selected groups.
 * Selecting nothing shows everything. Selecting MUSICIAN + ENGINEER shows
 * only entries where he did both — not the union.
 */
export function matchesFilter(roles: readonly Role[], active: readonly GroupKey[]): boolean {
  if (active.length === 0) return true
  const groups = groupsOf(roles)
  return active.every((k) => groups.includes(k))
}
