import { useState } from 'react'
import { motion } from 'framer-motion'

const schedule = [
  { day: 'Day 1', task: 'Research' },
  { day: 'Day 2', task: 'Outline' },
  { day: 'Day 3', task: 'Draft' },
  { day: 'Day 4', task: 'Edit' },
]

export function ReversePlanner() {
  const [dueDate, setDueDate] = useState('2026-04-20')

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
      className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Reverse Planner</p>
      <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
        Backward planning without the mental overhead.
      </h2>
      <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
        Pick a date and APS reveals a fixed four-day runway so the task feels finite and visible.
      </p>

      <div className="mt-5 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
        <label htmlFor="due-date" className="mb-2 block text-sm font-medium text-[var(--text-muted)]">
          Assignment due date
        </label>
        <input
          id="due-date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="min-h-12 rounded-[1rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 text-[var(--text-strong)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>

      <div className="mt-6 space-y-4">
        {schedule.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative pl-8"
          >
            {index < schedule.length - 1 ? (
              <span className="absolute left-[0.58rem] top-8 h-[calc(100%+0.85rem)] w-px bg-[var(--line)]" />
            ) : null}
            <span className="absolute left-0 top-2.5 h-5 w-5 rounded-full border-4 border-[var(--panel)] bg-[var(--accent)]" />
            <div className="rounded-[1.35rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4">
              <p className="text-sm text-[var(--text-muted)]">{item.day}</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">{item.task}</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Planned toward {dueDate || 'your selected date'} using a fixed APS sequence.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
