import { motion } from 'framer-motion'
import type { GeneratedTask } from '../App'
import { ReversePlanner } from '../components/ReversePlanner'

type PlannerPageProps = {
  currentTask: GeneratedTask
}

export function PlannerPage({ currentTask }: PlannerPageProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <ReversePlanner currentTask={currentTask} />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Planning Page</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
          Reverse planning removes the blank-page feeling from deadlines.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
          Students often know the due date but still do not know where to begin. This page converts one chosen
          date into a stable four-step schedule that feels manageable and visually finite.
        </p>
        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <p className="text-sm text-[var(--text-muted)]">Current planned task</p>
          <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">{currentTask.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            The timeline on the left reuses the task breakdown generated on the `Tasks` page.
          </p>
        </div>
        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <p className="text-sm text-[var(--text-muted)]">Why the timeline works</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">
            A vertical sequence is easier to scan than a dense calendar and fits the assignment brief better than
            traditional reminder-heavy scheduling UI.
          </p>
        </div>
      </motion.section>
    </div>
  )
}
