export function solveTime(second:number,state:'work'|'rest') {
  const m = (second / 30) >> 1
  const s = second % 60
  return second === 0 ? `${state === 'rest' ? '工作!' : '休息!'}` :`${m >= 10 ? m : `0${m}`}:${s >= 10 ? s : `0${s}`}`
}

