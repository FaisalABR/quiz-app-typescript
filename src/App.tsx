import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Product, Quiz, User } from "./Pages";
import { useAuthContext } from "./Hooks/useAuth";
import { Loading } from "./Components/atoms";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { isAuth, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route
          element={isAuth ? <Navigate to="/" replace /> : <Login />}
          path="/login"
        />
        <Route
          element={isAuth ? <Quiz /> : <Navigate to="/login" replace />}
          path="/quiz"
        />
        <Route element={<Product />} path="/products" />
        <Route element={<Product />} path="/products/:productId" />
        <Route element={<User />} path="/talents" />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
