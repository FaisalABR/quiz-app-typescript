import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useAuthContext } from "@/Hooks/useAuth";
import { Loading } from "@/Components/atoms";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import routes from "@/Routes";

function AppRoutes() {
  const { isAuth } = useAuthContext();
  const routing = useRoutes(routes(isAuth));

  return routing;
}

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
