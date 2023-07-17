import React, { useState, useEffect, useRef, useCallback } from 'react'
import { solveTime } from '../utils/utils'

const { onCommands } = window.electron

export default function TomatoClock({ delayInit }: { delayInit: number }) {
  const [delay, setDelay] = useState(delayInit)

  const timeRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    onCommands((_event: any, value: any) => {
      if (value === 'reset') {
        setDelay(delayInit)
      }
    })
  }, [delayInit])

  const reset = useCallback(() => {
    if (!delay) {
      setDelay(delayInit)
      timeRef.current = setInterval(() => {
        setDelay((v) => v - 1)
      }, 1000)
    }
  }, [delay, delayInit])

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
    <div onClick={reset} className={`${!delay && 'nodrag'} text-[24px] font-bold text-blue-300 w-[fit-content]  select-none cursor-pointer`}>
      {solveTime(delay)}
    </div>
  )
}
