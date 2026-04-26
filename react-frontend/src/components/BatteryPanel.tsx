import { motion } from 'framer-motion'
import type { GeneratedTask } from '../App'
import { ENERGY_META, getEnergyType } from '../lib/taskData'

type BatteryPanelProps = {
  batteryLevel: number
  currentTask: GeneratedTask
  lastCompletedTask: string
  onCompleteTask: (drain: number, taskTitle: string) => void
}

export function BatteryPanel({ batteryLevel, currentTask, lastCompletedTask, onCompleteTask }: BatteryPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
      className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Battery UI</p>
      <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
        Match the task to your current energy.
      </h2>
      <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
        Completing tasks drains the battery with fake logic so the tradeoff stays visible and concrete.
      </p>

      <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-muted)]">Available energy</p>
            <p className="mt-2 font-[var(--font-display)] text-4xl text-[var(--text-strong)]">{batteryLevel}%</p>
          </div>
          <div className="flex w-32 items-center justify-end">
            <div className="relative h-14 w-24 rounded-[1rem] border-2 border-[var(--text-strong)] p-1">
              <div className="absolute right-[-0.45rem] top-4 h-6 w-2 rounded-r bg-[var(--text-strong)]" />
              <motion.div
                animate={{ width: `${batteryLevel}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full rounded-[0.7rem] bg-[linear-gradient(90deg,var(--battery-start),var(--battery-end))]"
              />
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-[var(--text-muted)]">Last completed step: {lastCompletedTask}</p>
      </div>

      <div className="mt-5 grid gap-3">
        {currentTask.breakdown.map((task) => {
          const energyType = getEnergyType(task.title)
          const meta = ENERGY_META[energyType]
          const isCompleted = currentTask.completedStepTitles.includes(task.title)

          return (
          <div
            key={task.title}
            className="rounded-[1.35rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className={`h-3.5 w-3.5 rounded-full ${meta.color}`} />
                <div>
                  <p className="font-semibold text-[var(--text-strong)]">
                    {task.title} · {energyType} energy
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">{task.caption}</p>
                </div>
              </div>
              <button
                type="button"
                disabled={isCompleted}
                onClick={() => onCompleteTask(meta.drain, task.title)}
                className={`inline-flex min-h-11 items-center justify-center rounded-[1rem] px-4 text-sm font-semibold transition duration-200 ${
                  isCompleted
                    ? 'cursor-not-allowed bg-[var(--surface-hover)] text-[var(--text-muted)]'
                    : 'bg-[var(--surface-contrast)] text-[var(--text-strong)] hover:translate-y-[-1px]'
                }`}
              >
                {isCompleted ? 'Completed' : 'Complete Task'}
              </button>
            </div>
          </div>
          )
        })}
      </div>
    </motion.section>
  )
}
