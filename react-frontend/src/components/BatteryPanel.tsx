import { motion } from 'framer-motion'

type TaskType = 'High' | 'Medium' | 'Low'

type BatteryPanelProps = {
  batteryLevel: number
  lastCompletedTask: TaskType
  onCompleteTask: (drain: number, taskType: TaskType) => void
}

const tasks: Array<{ label: TaskType; drain: number; color: string; detail: string }> = [
  { label: 'High', drain: 22, color: 'bg-rose-500', detail: 'Essay writing block' },
  { label: 'Medium', drain: 14, color: 'bg-amber-400', detail: 'Outline and sort notes' },
  { label: 'Low', drain: 8, color: 'bg-emerald-400', detail: 'Rename file and collect sources' },
]

export function BatteryPanel({ batteryLevel, lastCompletedTask, onCompleteTask }: BatteryPanelProps) {
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
        <p className="mt-3 text-sm text-[var(--text-muted)]">Last completed type: {lastCompletedTask}</p>
      </div>

      <div className="mt-5 grid gap-3">
        {tasks.map((task) => (
          <div
            key={task.label}
            className="rounded-[1.35rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className={`h-3.5 w-3.5 rounded-full ${task.color}`} />
                <div>
                  <p className="font-semibold text-[var(--text-strong)]">{task.label} energy task</p>
                  <p className="text-sm text-[var(--text-muted)]">{task.detail}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onCompleteTask(task.drain, task.label)}
                className="inline-flex min-h-11 items-center justify-center rounded-[1rem] bg-[var(--surface-contrast)] px-4 text-sm font-semibold text-[var(--text-strong)] transition duration-200 hover:translate-y-[-1px]"
              >
                Complete Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
