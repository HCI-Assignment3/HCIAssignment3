import { motion } from 'framer-motion'
import type { GeneratedTask } from '../App'
import { FutureSimulator } from '../components/FutureSimulator'

type FuturePageProps = {
  currentTask: GeneratedTask
}

export function FuturePage({ currentTask }: FuturePageProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <FutureSimulator key={currentTask.title} currentTask={currentTask} />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Consequence Design</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
          Skipping should feel a little uncomfortable, not invisible.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
          Instead of reminders, this page shows the emotional cost of avoidance. The red state, higher stress bar,
          and sharper copy make the consequence immediate without pretending the app has real predictive logic.
        </p>
        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <p className="text-sm text-[var(--text-muted)]">Connected task</p>
          <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">{currentTask.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            This pulls directly from the task created on the `Tasks` page, so the future stress warning is tied to
            the same assignment across the prototype.
          </p>
        </div>
        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <p className="text-sm text-[var(--text-muted)]">Prototype behavior</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
            The stress percentage is intentionally fake. What matters for the assignment is that the interaction
            communicates cause and effect clearly enough to influence behavior.
          </p>
        </div>
      </motion.section>
    </div>
  )
}
