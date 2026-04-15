import { motion } from 'framer-motion'

type InsightsPanelProps = {
  xp: number
  streak: number
  batteryLevel: number
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

export function InsightsPanel({ xp, streak, batteryLevel }: InsightsPanelProps) {
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
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Distractions</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">12</p>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Current state</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">{batteryLevel}% energy</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-muted)]">Attention heatmap</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">Best concentration appears in short evening bursts</p>
            </div>
            <span className="rounded-full bg-[var(--pill-bg)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
              Static mock data
            </span>
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
          </div>
          <div className="rounded-[1.35rem] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Streak status</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">{streak} day rhythm active</p>
          </div>
          <div className="rounded-[1.35rem] border border-dashed border-[var(--border-soft)] p-4">
            <p className="text-sm text-[var(--text-muted)]">Design note</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
              APS avoids reminders and instead keeps the next action obvious, the future cost visible, and the
              reward loop lightweight.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
