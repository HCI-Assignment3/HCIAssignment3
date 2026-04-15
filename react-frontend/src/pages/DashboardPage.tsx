import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

type DashboardPageProps = {
  batteryLevel: number
  streak: number
  xp: number
  onOpenFocusModal: () => void
}

const routeCards = [
  { to: '/tasks', title: 'Task Generator', detail: 'Break friction into a micro-start you can do right now.' },
  { to: '/energy', title: 'Battery View', detail: 'See energy tradeoffs before you promise too much.' },
  { to: '/future', title: 'Future Simulator', detail: 'Make the cost of skipping visible before tonight.' },
  { to: '/planner', title: 'Reverse Planner', detail: 'Turn one due date into a calm four-day runway.' },
  { to: '/insights', title: 'Insights', detail: 'Review focus patterns and motivation signals.' },
]

export function DashboardPage({ batteryLevel, streak, xp, onOpenFocusModal }: DashboardPageProps) {
  return (
    <div className="grid gap-6">
      <motion.section
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Home Base</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
              The first two minutes matter more than the perfect plan.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              APS is a UX prototype for students who procrastinate, ignore reminders, and struggle to begin.
              Every screen reduces friction, makes consequences visible, or keeps progress emotionally tangible.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenFocusModal}
                className="inline-flex min-h-12 items-center justify-center rounded-[1.15rem] bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--button-text)] transition hover:translate-y-[-1px] hover:shadow-[var(--shadow-button)]"
              >
                Start Now
              </button>
              <Link
                to="/tasks"
                className="inline-flex min-h-12 items-center justify-center rounded-[1.15rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] px-5 text-sm font-semibold text-[var(--text-strong)] transition hover:bg-[var(--surface-hover)]"
              >
                Open task flow
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm text-[var(--text-muted)]">Current energy</p>
              <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--text-strong)]">{batteryLevel}%</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm text-[var(--text-muted)]">Momentum streak</p>
              <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--text-strong)]">{streak} days</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
              <p className="text-sm text-[var(--text-muted)]">Reward loop</p>
              <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--text-strong)]">{xp} XP</p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {routeCards.map((card, index) => (
          <motion.div
            key={card.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--panel)] p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">Page</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--text-strong)]">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{card.detail}</p>
            <Link
              to={card.to}
              className="mt-5 inline-flex rounded-full bg-[var(--surface-contrast)] px-4 py-2 text-sm font-semibold text-[var(--text-strong)] transition hover:translate-y-[-1px]"
            >
              Open page
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
