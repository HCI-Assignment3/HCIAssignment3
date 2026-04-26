import { useState } from 'react'
import { motion } from 'framer-motion'
import type { GeneratedTask } from '../App'
import { ENERGY_META, getEnergyType } from '../lib/taskData'

type FutureSimulatorProps = {
  currentTask: GeneratedTask
}

export function FutureSimulator({ currentTask }: FutureSimulatorProps) {
  const [skippedSteps, setSkippedSteps] = useState<string[]>([])
  const stressLevel = Math.min(
    100,
    8 +
      skippedSteps.reduce((total, stepTitle) => total + ENERGY_META[getEnergyType(stepTitle)].stress, 0),
  )

  const handleSkip = (stepTitle: string) => {
    setSkippedSteps((current) => (current.includes(stepTitle) ? current : [...current, stepTitle]))
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
      className={`rounded-[2rem] border p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-colors ${
        skippedSteps.length > 0
          ? 'border-[rgba(255,120,120,0.35)] bg-[var(--warning-panel)]'
          : 'border-[var(--border-soft)] bg-[var(--panel)]'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Future You Simulator</p>
      <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
        Make the later consequence visible right now.
      </h2>

      <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
        <p className="text-sm text-[var(--text-muted)]">Assignment at risk</p>
        <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">{currentTask.title}</p>
        <p className="text-sm text-[var(--text-muted)]">Projected outcome</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--text-strong)]">
          If you skip these steps -&gt; Stress at 11:30 PM
        </p>
        <p
          className={`mt-4 text-sm leading-6 ${
            skippedSteps.length > 0 ? 'text-[var(--warning-text)]' : 'text-[var(--text-muted)]'
          }`}
        >
          {skippedSteps.length > 0
            ? 'Higher-energy skipped steps push the stress bar faster, so the future cost feels more immediate.'
            : 'A small start now keeps tonight from turning into a deadline spiral.'}
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span
              className={
                skippedSteps.length > 0 ? 'font-semibold text-[var(--warning-text)]' : 'text-[var(--text-muted)]'
              }
            >
              Stress projection
            </span>
            <span
              className={
                skippedSteps.length > 0 ? 'font-semibold text-[var(--warning-text)]' : 'text-[var(--text-muted)]'
              }
            >
              {stressLevel}%
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--track)]">
            <motion.div
              animate={{ width: `${stressLevel}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                skippedSteps.length > 0 ? 'bg-[var(--warning)]' : 'bg-[var(--accent)]'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {currentTask.breakdown.map((step) => {
          const energyType = getEnergyType(step.title)
          const isSkipped = skippedSteps.includes(step.title)
          const meta = ENERGY_META[energyType]

          return (
            <div
              key={step.title}
              className={`rounded-[1.35rem] border p-4 transition ${
                isSkipped
                  ? 'border-[rgba(255,120,120,0.35)] bg-[rgba(140,31,31,0.08)]'
                  : 'border-[var(--border-soft)] bg-[var(--surface-muted)]'
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-3.5 w-3.5 rounded-full ${meta.color}`} />
                  <div>
                    <p className="font-semibold text-[var(--text-strong)]">
                      {step.title} · {energyType} stress impact
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{step.caption}</p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isSkipped}
                  onClick={() => handleSkip(step.title)}
                  className={`inline-flex min-h-11 items-center justify-center rounded-[1rem] px-4 text-sm font-semibold transition ${
                    isSkipped
                      ? 'cursor-not-allowed bg-[var(--warning)] text-white'
                      : 'bg-[var(--surface-contrast)] text-[var(--text-strong)] hover:translate-y-[-1px]'
                  }`}
                >
                  {isSkipped ? 'Skipped' : 'Skip Step'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
