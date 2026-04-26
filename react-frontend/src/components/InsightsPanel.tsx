import { motion } from 'framer-motion'

import type { GeneratedTask } from '../App'

type InsightsPanelProps = {
  xp: number
  streak: number
  batteryLevel: number
  currentTask: GeneratedTask
  onOpenFocusModal: () => void
}

const heatmap = [
  [1, 2, 1, 3, 2, 4, 2],
  [0, 1, 2, 2, 3, 2, 1],
  [2, 3, 4, 2, 1, 0, 2],
  [1, 2, 3, 4, 2, 1, 3],
]

const intensityClasses = [
  'bg-[var(--heat-0)]',
  'bg-[var(--heat-1)]',
  'bg-[var(--heat-2)]',
  'bg-[var(--heat-3)]',
  'bg-[var(--heat-4)]',
]

export function InsightsPanel({ xp, streak, batteryLevel, currentTask, onOpenFocusModal }: InsightsPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
      className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Insights Panel</p>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
            Focus patterns that feel encouraging, not judgmental.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
            The stats are static, the visuals are deliberate, and the whole panel reinforces progress without
            cluttering the experience.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Focus time</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">2h 15m</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              This represents the total amount of focused work APS thinks you managed this week.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Distractions</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">12</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Mock self-check count</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              In this prototype, distractions are not being tracked in the background. This number represents a
              fake self-check count, as if the user marked moments where they lost focus.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Current state</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">{batteryLevel}% energy</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              This is your remaining energy in the prototype, based on the effort levels of completed steps.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-muted)]">Attention heatmap</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">Best concentration appears in short evening bursts</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                This heatmap is illustrative rather than real tracking. Darker squares suggest stronger focus during
                those periods, while lighter squares suggest lower concentration.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-2">
            {heatmap.flatMap((row, rowIndex) =>
              row.map((cell, cellIndex) => (
                <motion.div
                  key={`${rowIndex}-${cellIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (rowIndex * 7 + cellIndex) * 0.02 }}
                  className={`aspect-square rounded-xl ${intensityClasses[cell]}`}
                />
              )),
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <div className="rounded-[1.35rem] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">XP status</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">{xp} total points earned</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              XP is a lightweight reward signal that grows when you complete steps and keep momentum going.
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Streak status</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">{streak} day rhythm active</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              A streak shows consistency. It is there to reinforce progress, not to pressure the user.
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Tracked assignment</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">{currentTask.title}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              All of these insights are framed around the same active task selected in the Tasks page.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-dashed border-[var(--border-soft)] p-4">
            <p className="text-sm text-[var(--text-muted)]">What this page means</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
              The Insights page is meant to help the user reflect quickly: when they focus best, how often they
              drift, and what action makes sense next. It is not meant to be a complex analytics dashboard.
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              The goal is lightweight guidance: enough explanation to understand the signals, but not so much that
              the page becomes overwhelming.
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-[var(--accent-soft)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Turn insight into action</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
              Your best concentration appears in short bursts, so the next useful move is a two-minute restart.
            </p>
            <button
              type="button"
              onClick={onOpenFocusModal}
              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-[1rem] bg-[var(--text-strong)] px-4 text-sm font-semibold text-[var(--button-text)] transition hover:translate-y-[-1px]"
            >
              Start a 2-minute focus sprint
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
