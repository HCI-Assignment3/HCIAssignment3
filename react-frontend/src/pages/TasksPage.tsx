import { motion } from 'framer-motion'
import type { GeneratedTask } from '../App'
import { TaskGenerator } from '../components/TaskGenerator'

type TasksPageProps = {
  currentTask: GeneratedTask
  tasks: GeneratedTask[]
  onOpenFocusModal: () => void
  onSelectTask: (taskId: string) => void
  onTaskSave: (task: GeneratedTask) => void
}

export function TasksPage({ currentTask, tasks, onOpenFocusModal, onSelectTask, onTaskSave }: TasksPageProps) {
  return (
    <div className="grid gap-6">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Tasks Page</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--text-strong)]">
          Break intimidating work into a first move that feels safe to begin.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          This prototype does not actually read your assignment yet. Instead, it lets users describe the task,
          preview where a future PDF upload could sit, and then shows a demo breakdown with the strongest
          emphasis on the `Start Now` action.
        </p>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <TaskGenerator
          key={currentTask.id}
          currentTask={currentTask}
          onStartNow={onOpenFocusModal}
          onTaskSave={onTaskSave}
        />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Task List</p>
          <h3 className="mt-2 font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--text-strong)]">
            Added tasks
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            Add more than one assignment here, then select the one you want APS to focus on across the other pages.
          </p>

          <div className="mt-5 grid gap-3">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => onSelectTask(task.id)}
                className={`rounded-[1.35rem] border p-4 text-left transition ${
                  task.id === currentTask.id
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-[var(--border-soft)] bg-[var(--surface-raised)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[var(--text-strong)]">{task.title}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {task.mode === 'whole assignment' ? 'Whole assignment' : 'Specific section'}
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      First step: {task.breakdown[0]?.title ?? 'Research'}
                    </p>
                  </div>
                  {task.id === currentTask.id ? (
                    <span className="rounded-full bg-[var(--text-strong)] px-3 py-1 text-xs font-semibold text-[var(--button-text)]">
                      Active
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
