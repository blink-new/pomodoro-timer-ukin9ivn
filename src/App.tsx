import { useState, useEffect, useCallback } from 'react'
import { cn } from './lib/utils'

type TimerPhase = 'work' | 'break'

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [phase, setPhase] = useState<TimerPhase>('work')
  const [sessions, setSessions] = useState(0)

  const workTime = 25 * 60
  const breakTime = 5 * 60

  const resetTimer = useCallback(() => {
    setTimeLeft(phase === 'work' ? workTime : breakTime)
    setIsRunning(false)
  }, [phase])

  const toggleTimer = () => setIsRunning(!isRunning)

  const switchPhase = useCallback(() => {
    const newPhase = phase === 'work' ? 'break' : 'work'
    setPhase(newPhase)
    setTimeLeft(newPhase === 'work' ? workTime : breakTime)
    setIsRunning(false)
    if (newPhase === 'work') {
      setSessions(s => s + 1)
    }
  }, [phase])

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play()
      switchPhase()
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, switchPhase])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((phase === 'work' ? workTime : breakTime) - timeLeft) / (phase === 'work' ? workTime : breakTime) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800">Pomodoro Timer</h1>
          <p className="text-slate-600 mt-2">Focus on what matters</p>
        </div>

        <div className="relative w-64 h-64 mx-auto">
          {/* Progress circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className="stroke-slate-200"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className={cn(
                "stroke-current transition-all duration-300",
                phase === 'work' ? 'text-rose-500' : 'text-emerald-500'
              )}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${progress} 100`}
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: 1000 - (progress * 10),
              }}
            />
          </svg>

          {/* Timer display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-800">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className={cn(
                "text-lg font-medium mt-2",
                phase === 'work' ? 'text-rose-500' : 'text-emerald-500'
              )}>
                {phase === 'work' ? 'Work Time' : 'Break Time'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className={cn(
              "px-6 py-2 rounded-lg text-white font-medium transition-all",
              isRunning
                ? "bg-slate-500 hover:bg-slate-600"
                : "bg-indigo-500 hover:bg-indigo-600"
            )}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-lg bg-slate-200 text-slate-700 font-medium hover:bg-slate-300 transition-all"
          >
            Reset
          </button>
          <button
            onClick={switchPhase}
            className="px-6 py-2 rounded-lg bg-slate-200 text-slate-700 font-medium hover:bg-slate-300 transition-all"
          >
            Skip
          </button>
        </div>

        <div className="text-center text-slate-600">
          Sessions completed: {sessions}
        </div>
      </div>
    </div>
  )
}