export type TaskMode = 'whole assignment' | 'specific section'
export type TaskEnergyType = 'High' | 'Medium' | 'Low'

export type BreakdownStep = {
  title: string
  caption: string
}

export const BREAKDOWN_ITEMS: BreakdownStep[] = [
  {
    title: 'Research',
    caption: 'Look at 2 or 3 current examples, class notes, or references to see what strong work looks like.',
  },
  {
    title: 'Outline',
    caption: 'List the main sections or talking points so the task stops feeling like one giant block.',
  },
  {
    title: 'Draft',
    caption: 'Write a rough version quickly and focus on getting ideas down before trying to make it polished.',
  },
  {
    title: 'Edit',
    caption: 'Tighten the structure, fix weak wording, and do one last clarity pass before submission.',
  },
]

export const ENERGY_META: Record<TaskEnergyType, { drain: number; color: string; stress: number }> = {
  High: { drain: 22, color: 'bg-rose-500', stress: 34 },
  Medium: { drain: 14, color: 'bg-amber-400', stress: 22 },
  Low: { drain: 8, color: 'bg-emerald-400', stress: 12 },
}

export function getEnergyType(stepTitle: string): TaskEnergyType {
  const normalized = stepTitle.toLowerCase()
  if (normalized.includes('draft')) return 'High'
  if (normalized.includes('outline') || normalized.includes('edit')) return 'Medium'
  return 'Low'
}
