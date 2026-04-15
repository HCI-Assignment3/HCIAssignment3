import { motion } from 'framer-motion'
import { TaskGenerator } from '../components/TaskGenerator'

type TasksPageProps = {
  onOpenFocusModal: () => void
}

export function TasksPage({ onOpenFocusModal }: TasksPageProps) {
  return (
    <div className="grid gap-6">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Tasks Page</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
          Break intimidating work into a first move that feels safe to begin.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          This page is dedicated to the smart task breakdown flow, with the same fully hardcoded sequence and
          the strongest emphasis on the `Start Now` action.
        </p>
      </motion.section>

      <TaskGenerator onStartNow={onOpenFocusModal} />
    </div>
  )
}
