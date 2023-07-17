function solveState(state:ClockState){
  switch (state) {
    case 'rest':
      return '该工作了!'
    case 'uninit':
      return '待开始'
    case 'work':
      return '该休息了!'
    default:
      return '错误!'
  }
}

export function checkIsWork(state:ClockState){
  return state === 'work'
}

export function solveStateInComponent(state:ClockState){
  switch (state) {
    case 'rest':
      return '💖'
    case 'uninit':
      return '⌚️'
    case 'work':
      return '📑'
    default:
      return '错误!'
  }
}

export function toggleState(state:ClockState){
  return checkIsWork(state) ? 'rest' : 'work'
}

export function solveTime(second:number,state:ClockState) {
  const m = (second / 30) >> 1
  const s = second % 60
  return second === 0 ? `${solveState(state)}` :`${m >= 10 ? m : `0${m}`}:${s >= 10 ? s : `0${s}`}`
}