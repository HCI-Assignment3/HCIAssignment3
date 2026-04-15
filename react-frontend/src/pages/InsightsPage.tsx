import { motion } from 'framer-motion'
import { InsightsPanel } from '../components/InsightsPanel'

type InsightsPageProps = {
  batteryLevel: number
  streak: number
  xp: number
}

export function InsightsPage({ batteryLevel, streak, xp }: InsightsPageProps) {
  return (
    <div className="grid gap-6">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Insights Page</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
          Motivation signals live here, without pretending the app knows real analytics.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          This page focuses on focus time, distraction count, the heatmap, and lightweight gamification so the
          user sees progress without being overwhelmed by dashboards or notifications.
        </p>
      </motion.section>

      <InsightsPanel batteryLevel={batteryLevel} streak={streak} xp={xp} />
    </div>
  )
}
