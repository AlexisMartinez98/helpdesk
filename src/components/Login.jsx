import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://20.118.220.82:3000/auth/login", {
        email,
        password,
      });
        localStorage.setItem("authToken", response.data.token);
        toast.success(response.data.message);
        navigate("/");
      
    } catch (error) {
      console.error("Error en el login:", error.response ? error.response.data : error.message);
      toast.error("Error en el login, por favor verifica tus credenciales.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Inicio de sesion</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm text-gray-600">Correo electronico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <label className="block mb-2 text-sm text-gray-600">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
};

export default Login;
