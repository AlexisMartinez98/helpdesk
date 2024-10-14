import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://20.118.220.82:3000/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Usuario registrado exitosamente.");
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Error en el registro:", error.response ? error.response.data : error.message);
      alert("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registro</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm text-gray-600">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <label className="block mb-2 text-sm text-gray-600">Email</label>
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
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
