import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)
function App() {

  return (
    <div className='text-3xl text-indigo-300'>
      HEllo
    </div>
  )
}

export default App
