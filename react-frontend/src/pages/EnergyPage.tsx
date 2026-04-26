import { motion } from 'framer-motion'
import { BatteryPanel } from '../components/BatteryPanel'
import type { GeneratedTask } from '../App'

type EnergyPageProps = {
  batteryLevel: number
  currentTask: GeneratedTask
  lastCompletedTask: string
  onCompleteTask: (drain: number, taskTitle: string) => void
}

export function EnergyPage({
  batteryLevel,
  currentTask,
  lastCompletedTask,
  onCompleteTask,
}: EnergyPageProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <BatteryPanel
        batteryLevel={batteryLevel}
        currentTask={currentTask}
        lastCompletedTask={lastCompletedTask}
        onCompleteTask={onCompleteTask}
      />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Energy Framing</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
          Make effort visible before burnout sneaks in.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
          APS uses a battery metaphor because it is easier to trust your current capacity than to trust vague
          motivation. High, medium, and low effort tasks all look selectable, but the UI keeps their energy cost
          obvious.
        </p>
        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <p className="text-sm text-[var(--text-muted)]">Current task</p>
          <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">{currentTask.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            The Energy page is now connected to the task you created, so students can judge effort in the context
            of the same assignment across the app.
          </p>
        </div>
        <div className="mt-6 rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
          <p className="text-sm text-[var(--text-muted)]">Why this helps</p>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--text-strong)]">
            <li>Students can choose a realistic task instead of overcommitting.</li>
            <li>The fake battery makes tradeoffs tangible even though the logic is simulated.</li>
            <li>Completing tasks still rewards momentum through XP and streak growth.</li>
          </ul>
        </div>
      </motion.section>
    </div>
  )
}
