import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { StartNowModal } from './components/StartNowModal'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { EnergyPage } from './pages/EnergyPage'
import { FuturePage } from './pages/FuturePage'
import { InsightsPage } from './pages/InsightsPage'
import { PlannerPage } from './pages/PlannerPage'
import { TasksPage } from './pages/TasksPage'

export type EnergyTaskType = 'High' | 'Medium' | 'Low'

const nudgeSuggestions = [
  'You focus best at 8 PM',
  'You have 20 mins -> Start Outline',
  'Your easiest win is opening the document',
  'Momentum beats motivation tonight',
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(3)
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [batteryTask, setBatteryTask] = useState<EnergyTaskType>('Medium')
  const [nudgeIndex, setNudgeIndex] = useState(0)
  const [focusModalOpen, setFocusModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleTaskCompletion = (drain: number, taskType: EnergyTaskType) => {
    setBatteryTask(taskType)
    setBatteryLevel((current) => Math.max(10, current - drain))
    setXp((current) => current + 10)
    setStreak((current) => current + 1)
  }

  return (
    <HashRouter>
      <AppShell
        batteryLevel={batteryLevel}
        currentNudge={nudgeSuggestions[nudgeIndex]}
        streak={streak}
        theme={theme}
        xp={xp}
        onRotateNudge={() => setNudgeIndex((current) => (current + 1) % nudgeSuggestions.length)}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      >
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                batteryLevel={batteryLevel}
                streak={streak}
                xp={xp}
                onOpenFocusModal={() => setFocusModalOpen(true)}
              />
            }
          />
          <Route path="/tasks" element={<TasksPage onOpenFocusModal={() => setFocusModalOpen(true)} />} />
          <Route
            path="/energy"
            element={
              <EnergyPage
                batteryLevel={batteryLevel}
                lastCompletedTask={batteryTask}
                onCompleteTask={handleTaskCompletion}
              />
            }
          />
          <Route path="/future" element={<FuturePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route
            path="/insights"
            element={<InsightsPage batteryLevel={batteryLevel} streak={streak} xp={xp} />}
          />
        </Routes>
      </AppShell>

      <AnimatePresence>
        {focusModalOpen ? <StartNowModal onClose={() => setFocusModalOpen(false)} /> : null}
      </AnimatePresence>
    </HashRouter>
  )
}

export default App
