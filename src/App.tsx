import TomatoClock from './components/TomatoClock'
import DragPoint from './components/DragPoint'

function App() {
  return (
    <div className='flex drag justify-center items-center rounded-full w-full'>
      <TomatoClock workDelay={2400} restDelay={300} />
      <DragPoint />
    </div>
  )
}

export default App
