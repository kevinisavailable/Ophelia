import { RouterProvider } from "react-router-dom"
import { router } from "./Router/routes"

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
