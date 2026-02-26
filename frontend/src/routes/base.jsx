import { Navigate } from "react-router-dom";

const routes = {
  path: "/",
  Component: () => <Navigate to="/sign-in" replace />,
};

export default routes;
