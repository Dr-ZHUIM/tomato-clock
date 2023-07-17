import React, { useState, useEffect, useRef, useCallback } from 'react'
import { solveTime } from '../utils/utils'

const { onCommands } = window.electron

export default function TomatoClock({ workDelay, restDelay }: { workDelay: number; restDelay: number }) {
  const [delay, setDelay] = useState(workDelay)
  const [state, setState] = useState<'work' | 'rest'>('work')

  const timeRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    onCommands((_event: any, value: any) => {
      if (value === 'reset') {
        clearInterval(timeRef.current!)
        timeRef.current = setInterval(() => {
          setDelay((v) => v - 1)
        }, 1000)
        setDelay(workDelay)
        setState('work')
      }
    })
  }, [workDelay])

  const toggle = useCallback(() => {
    if (!delay) {
      setDelay(state === 'rest' ? workDelay : restDelay)
      setState(state === 'rest' ? 'work' : 'rest')
      timeRef.current = setInterval(() => {
        setDelay((v) => v - 1)
      }, 1000)
    }
  }, [delay, state, workDelay, restDelay])

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setDelay((v) => v - 1)
    }, 1000)
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
    <div onClick={toggle} className={`${!delay && 'nodrag'} text-[24px] font-bold text-blue-300 w-[fit-content]  select-none cursor-pointer`}>
      {state === 'work' ? '📑' : '💖'}
      {solveTime(delay, state)}
    </div>
  )
}
