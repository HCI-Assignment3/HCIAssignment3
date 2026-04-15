import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type StartNowModalProps = {
  onClose: () => void
}

export function StartNowModal({ onClose }: StartNowModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(120)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? 120 : current - 1))
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = String(secondsLeft % 60).padStart(2, '0')
  const progress = ((120 - secondsLeft) / 120) * 100

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,12,18,0.62)] px-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Focus Sprint</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--text-strong)]">
              Stay focused
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)] px-3 py-1 text-sm text-[var(--text-muted)] transition hover:bg-[var(--surface-hover)]"
          >
            Close
          </button>
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5 text-center">
          <p className="text-sm text-[var(--text-muted)]">Current micro-start</p>
          <p className="mt-2 font-[var(--font-display)] text-5xl tracking-[-0.05em] text-[var(--text-strong)]">
            {minutes}:{seconds}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            Just open the document and sit with the task for two minutes. That is enough for now.
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--track)]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
