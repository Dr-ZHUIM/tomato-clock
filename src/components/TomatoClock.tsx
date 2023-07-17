import React, { useState, useEffect, useRef, useCallback } from 'react'
import { solveTime, solveStateInComponent, checkIsWork } from '../utils/utils'

const { onCommands, RequestMenu } = window.electron

export default function TomatoClock({ workDelay, restDelay }: { workDelay: number; restDelay: number }) {
  const [delay, setDelay] = useState(0)
  const [state, setState] = useState<ClockState>('uninit')

  const timeRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    onCommands((_event: any, value: any) => {
      if (value === 'reset') {
        clearInterval(timeRef.current!)
        setDelay(0)
        setState('uninit')
      }
    })
  }, [workDelay])

  const toggle = useCallback(() => {
    if (!delay) {
      setDelay(checkIsWork(state) ? restDelay : workDelay)
      setState((v) => (checkIsWork(v) ? 'rest' : 'work'))
      timeRef.current = setInterval(() => {
        setDelay((v) => v - 1)
      }, 1000)
    }
  }, [delay, state, workDelay, restDelay])

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setDelay((v) => v - 1)
    }, 1000)
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      RequestMenu()
    })
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (timeRef.current && delay <= 0) {
      clearInterval(timeRef.current)
    }
  }, [delay])

  return (
    <div onClick={toggle} className={`nodrag text-[24px] font-bold text-blue-300 w-[fit-content]  select-none cursor-pointer`}>
      {delay > 0 && solveStateInComponent(state)}
      {solveTime(delay, state)}
    </div>
  )
}
