import { useState, createContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Home from "./pages/Home";
import SharedLayout from "./pages/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="Login" element={<Login setUser={setUser} />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <footer>
          <p>&lt;&lt; &copy; Walter Pompa &gt;&gt;</p>
          <p>API Connected CRUD Web App</p>
        </footer>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
