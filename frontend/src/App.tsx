import { Route, Routes } from 'react-router-dom'
import { Create} from '@/components/Create'
import { Edit } from '@/components/Edit'
import { Read } from '@/components/Read'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Read/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/edit" element={<Edit/>}></Route>
      </Routes>
    </div>
  )
}

export default App
