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
import { BREAKDOWN_ITEMS, type BreakdownStep, type TaskMode } from './lib/taskData'

export type EnergyTaskType = 'High' | 'Medium' | 'Low'
export type GeneratedTask = {
  id: string
  title: string
  mode: TaskMode
  mockUploadName: string
  breakdown: BreakdownStep[]
  completedStepTitles: string[]
}

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
  const [batteryTask, setBatteryTask] = useState('Outline')
  const [nudgeIndex, setNudgeIndex] = useState(0)
  const [focusModalOpen, setFocusModalOpen] = useState(false)
  const [tasks, setTasks] = useState<GeneratedTask[]>([
    {
      id: 'task-1',
      title: 'Finish my interaction design assignment',
      mode: 'whole assignment',
      mockUploadName: '',
      breakdown: BREAKDOWN_ITEMS,
      completedStepTitles: [],
    },
  ])
  const [activeTaskId, setActiveTaskId] = useState('task-1')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const currentTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0]

  const handleTaskCompletion = (drain: number, taskTitle: string) => {
    if (!currentTask || currentTask.completedStepTitles.includes(taskTitle)) {
      return
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === currentTask.id
          ? {
              ...task,
              completedStepTitles: [...task.completedStepTitles, taskTitle],
            }
          : task,
      ),
    )
    setBatteryTask(taskTitle)
    setBatteryLevel((current) => Math.max(10, current - drain))
    setXp((current) => current + 10)
    setStreak((current) => current + 1)
  }

  const handleTaskSave = (task: GeneratedTask) => {
    setTasks((current) => {
      const exists = current.some((item) => item.id === task.id)
      return exists ? current.map((item) => (item.id === task.id ? task : item)) : [task, ...current]
    })
    setActiveTaskId(task.id)
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
          <Route
            path="/tasks"
            element={
              <TasksPage
                currentTask={currentTask}
                tasks={tasks}
                onOpenFocusModal={() => setFocusModalOpen(true)}
                onSelectTask={setActiveTaskId}
                onTaskSave={handleTaskSave}
              />
            }
          />
          <Route
            path="/energy"
            element={
              <EnergyPage
                batteryLevel={batteryLevel}
                currentTask={currentTask}
                lastCompletedTask={batteryTask}
                onCompleteTask={handleTaskCompletion}
              />
            }
          />
          <Route path="/future" element={<FuturePage currentTask={currentTask} />} />
          <Route path="/planner" element={<PlannerPage currentTask={currentTask} />} />
          <Route
            path="/insights"
            element={
              <InsightsPage
                batteryLevel={batteryLevel}
                currentTask={currentTask}
                onOpenFocusModal={() => setFocusModalOpen(true)}
                streak={streak}
                xp={xp}
              />
            }
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
