import TomatoClock from './components/TomatoClock'

function App() {
  return (
    <div className='flex justify-center items-center rounded-full w-[100px] h-[50px] relative'>
      <TomatoClock delayInit={2400} />
    </div>
  )
}

export default App
