import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Quiz } from "./Pages";
import { useAuthContext } from "./Hooks/useAuth";
import { Loading } from "./Components/atoms";

function App() {
  const { isAuth, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }
  return (
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
    </Routes>
  );
}

export default App;
