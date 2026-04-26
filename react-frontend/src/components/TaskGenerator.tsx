import { useState } from 'react'
import { motion } from 'framer-motion'
import type { GeneratedTask } from '../App'
import { BREAKDOWN_ITEMS, type TaskMode } from '../lib/taskData'

type TaskGeneratorProps = {
  currentTask: GeneratedTask
  onStartNow: () => void
  onTaskSave: (task: GeneratedTask) => void
}

export function TaskGenerator({ currentTask, onStartNow, onTaskSave }: TaskGeneratorProps) {
  const [taskInput, setTaskInput] = useState(currentTask.title)
  const [showBreakdown, setShowBreakdown] = useState(true)
  const [taskMode, setTaskMode] = useState<TaskMode>(currentTask.mode)
  const [mockUploadName, setMockUploadName] = useState(currentTask.mockUploadName)

  const publishTask = (nextTask: { title?: string; mode?: TaskMode; mockUploadName?: string }) => {
    onTaskSave({
      id: currentTask.id,
      title: nextTask.title ?? taskInput,
      mode: nextTask.mode ?? taskMode,
      mockUploadName: nextTask.mockUploadName ?? mockUploadName,
      breakdown: BREAKDOWN_ITEMS,
      completedStepTitles: currentTask.completedStepTitles,
    })
  }

  const handleAddTask = () => {
    const trimmedTitle = taskInput.trim()
    const nextTitle = trimmedTitle || 'New assignment task'

    onTaskSave({
      id: `task-${Date.now()}`,
      title: nextTitle,
      mode: taskMode,
      mockUploadName,
      breakdown: BREAKDOWN_ITEMS,
      completedStepTitles: [],
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Task Generator</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
              Turn avoidance into the smallest possible start.
            </h2>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
          <label htmlFor="task-input" className="mb-2 block text-sm font-medium text-[var(--text-muted)]">
            What feels heavy right now?
          </label>
          <div className="mb-3 flex flex-wrap gap-2">
            {(['whole assignment', 'specific section'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setTaskMode(option)
                  publishTask({ mode: option })
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  taskMode === option
                    ? 'bg-[var(--accent)] text-[var(--button-strong-text)]'
                    : 'border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--text-strong)]'
                }`}
              >
                {option === 'whole assignment' ? 'Split whole assignment' : 'Split one section'}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              id="task-input"
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              placeholder="Write my paper"
              className="min-h-14 flex-1 rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 text-base text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
            />
            <button
              type="button"
              onClick={() => {
                setShowBreakdown(true)
                publishTask({ title: taskInput })
              }}
              className="min-h-14 rounded-[1.25rem] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--button-text)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[var(--shadow-button)]"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleAddTask}
              className="min-h-14 rounded-[1.25rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-5 text-sm font-semibold text-[var(--text-strong)] transition duration-200 hover:bg-[var(--surface-hover)]"
            >
              Add Task
            </button>
          </div>
          <div className="mt-4 rounded-[1.25rem] border border-dashed border-[var(--border-soft)] bg-[var(--surface-raised)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--text-strong)]">Assignment brief upload</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                  Prototype only. This shows where a future PDF upload could live, but APS is not reading files yet.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextUploadName = mockUploadName ? '' : 'interaction-design-assignment-brief.pdf'
                  setMockUploadName(nextUploadName)
                  publishTask({ mockUploadName: nextUploadName })
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-[1rem] bg-[var(--surface-contrast)] px-4 text-sm font-semibold text-[var(--text-strong)] transition hover:translate-y-[-1px]"
              >
                {mockUploadName ? 'Remove mock PDF' : 'Add mock PDF'}
              </button>
            </div>
            {mockUploadName ? (
              <p className="mt-3 text-sm text-[var(--text-strong)]">Attached: {mockUploadName}</p>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            UI only. APS does not know the assignment contents yet, so it always returns the same starter sequence.
          </p>
        </div>

        {showBreakdown ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--text-strong)]">
                  Breakdown for "{taskInput || 'your task'}"
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Each label is a broad stage, and the short description underneath explains the simplest way to
                approach that stage.
              </p>

              <div className="mt-4 grid gap-3">
                {currentTask.breakdown.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className={`rounded-[1.35rem] border px-4 py-3 transition ${
                      index === 0
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                        : 'border-[var(--border-soft)] bg-[var(--surface-muted)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">Step {index + 1}</p>
                        <p className="text-base font-semibold text-[var(--text-strong)]">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{item.caption}</p>
                      </div>
                      {index === 0 ? (
                        <span className="rounded-full bg-[var(--text-strong)] px-3 py-1 text-xs font-semibold text-[var(--button-text)]">
                          Start here
                        </span>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--panel-strong)] p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">First Move</p>
                <h3 className="mt-2 font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--text-strong)]">
                  Open document (2 min)
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  No drafting pressure yet. Just open the file, title it, and let motion beat avoidance.
                </p>
              </div>

              <button
                type="button"
                onClick={onStartNow}
                className="mt-6 inline-flex min-h-14 items-center justify-center rounded-[1.25rem] bg-[var(--text-strong)] px-5 text-base font-semibold text-[var(--button-text)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[var(--shadow-button)]"
              >
                Start Now
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </motion.section>
  )
}
