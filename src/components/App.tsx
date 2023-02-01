import '../styles/App.css'

import Redactor from './Redactor/Redactor'
import { DragAndDropList } from './DragAndDropList'

function App() {

  return (
    <div className='app'>
      {/* <DragAndDropList /> Testing drag and drop events for myself */} 
      <Redactor /> 
    </div>
  )
}

export default App
