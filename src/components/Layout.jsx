import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken"); 
  useEffect(() => {
    setIsAuthenticated(!!token); 
  }, [,token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login"); 
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white py-4 shadow-md">
        <nav className="container mx-auto px-6 flex justify-between">
          <div className="text-lg font-bold">HELPDESK-Ryp Cloud</div>
          <div>
            {!isAuthenticated ? ( 
              <>
                <Link to="/login" className="px-4 hover:underline">Iniciar sesión</Link>
                <Link to="/register" className="px-4 hover:underline">Registro</Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 hover:underline bg-red-600 text-white py-2 rounded-md"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-10 flex-grow">
        {children}
      </main>
      <footer className="bg-blue-800 text-white py-4 text-center">
        © 2024 Ryp Cloud.
      </footer>
    </div>
  );
};

export default Layout;
