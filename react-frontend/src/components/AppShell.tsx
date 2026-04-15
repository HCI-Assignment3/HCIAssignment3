import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

type AppShellProps = PropsWithChildren<{
  batteryLevel: number
  currentNudge: string
  streak: number
  theme: 'light' | 'dark'
  xp: number
  onRotateNudge: () => void
  onToggleTheme: () => void
}>

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/energy', label: 'Energy' },
  { to: '/future', label: 'Future' },
  { to: '/planner', label: 'Planner' },
  { to: '/insights', label: 'Insights' },
]

export function AppShell({
  batteryLevel,
  children,
  currentNudge,
  streak,
  theme,
  xp,
  onRotateNudge,
  onToggleTheme,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] transition-colors duration-500">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-8rem] h-80 w-80 rounded-full bg-[var(--glow-primary)] blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-96 w-96 rounded-full bg-[var(--glow-secondary)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_32%),linear-gradient(135deg,_transparent,_rgba(255,255,255,0.05))]" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--pill-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Adaptive Productivity System
                </div>
                <h1 className="max-w-2xl font-[var(--font-display)] text-4xl leading-tight tracking-[-0.04em] text-[var(--text-strong)] sm:text-5xl">
                  Start before your brain has time to negotiate.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                  APS is now split into focused pages so your prototype reads like a complete product system
                  instead of a single long dashboard.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:min-w-[18rem]">
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-medium text-[var(--text-strong)] transition duration-200 hover:scale-[1.01] hover:bg-[var(--surface-hover)]"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                </button>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">XP</p>
                    <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--text-strong)]">{xp}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">+10 on each completed task</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Streak</p>
                    <p className="mt-2 font-[var(--font-display)] text-3xl text-[var(--text-strong)]">{streak} days</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{batteryLevel}% energy left</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Context Nudge</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-strong)]">{currentNudge}</p>
                    <button
                      type="button"
                      onClick={onRotateNudge}
                      className="mt-3 inline-flex items-center rounded-full bg-[var(--text-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--button-text)] transition duration-200 hover:scale-[1.02]"
                    >
                      Show another nudge
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[var(--text-strong)] text-[var(--button-text)]'
                        : 'border border-[var(--border-soft)] bg-[var(--surface-muted)] text-[var(--text-strong)] hover:bg-[var(--surface-hover)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </motion.header>

        {children}
      </main>
    </div>
  )
}
