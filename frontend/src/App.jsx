import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import route from "./routes";

const routes = createHashRouter(route);

function App() {
  return (
    <div>
        <RouterProvider router={routes} />
    </div>
  );
}

export default App;
