import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useAuthContext } from "@/Hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import routes from "@/Routes";
import { Spin } from "antd";

function AppRoutes() {
  const { isAuth } = useAuthContext();
  const routing = useRoutes(routes(isAuth));

  return routing;
}

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Spin />}>
          <AppRoutes />
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
