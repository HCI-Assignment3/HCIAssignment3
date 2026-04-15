import { useState } from 'react'
import { motion } from 'framer-motion'

export function FutureSimulator() {
  const [skipped, setSkipped] = useState(false)
  const stressLevel = skipped ? 78 : 18

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
      className={`rounded-[2rem] border p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-colors ${
        skipped
          ? 'border-[rgba(255,120,120,0.35)] bg-[var(--warning-panel)]'
          : 'border-[var(--border-soft)] bg-[var(--panel)]'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Future You Simulator</p>
      <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
        Make the later consequence visible right now.
      </h2>

      <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
        <p className="text-sm text-[var(--text-muted)]">Projected outcome</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--text-strong)]">
          If you skip this -&gt; Stress at 11:30 PM
        </p>
        <p className={`mt-4 text-sm leading-6 ${skipped ? 'text-[var(--warning-text)]' : 'text-[var(--text-muted)]'}`}>
          {skipped
            ? 'You skipped the start, so the UI pushes stress forward and makes the tension feel harder to ignore.'
            : 'A small start now keeps tonight from turning into a deadline spiral.'}
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className={skipped ? 'font-semibold text-[var(--warning-text)]' : 'text-[var(--text-muted)]'}>
              Stress projection
            </span>
            <span className={skipped ? 'font-semibold text-[var(--warning-text)]' : 'text-[var(--text-muted)]'}>
              {stressLevel}%
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--track)]">
            <motion.div
              animate={{ width: `${stressLevel}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`h-full rounded-full ${skipped ? 'bg-[var(--warning)]' : 'bg-[var(--accent)]'}`}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSkipped(true)}
        className={`mt-5 inline-flex min-h-12 items-center justify-center rounded-[1.1rem] px-4 text-sm font-semibold transition duration-200 ${
          skipped
            ? 'bg-[var(--warning)] text-white shadow-[0_18px_40px_rgba(165,37,37,0.24)]'
            : 'bg-[var(--surface-contrast)] text-[var(--text-strong)] hover:translate-y-[-1px]'
        }`}
      >
        {skipped ? 'Skipped - stress increased' : 'Skip'}
      </button>
    </motion.section>
  )
}
