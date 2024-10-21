import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TicketCreationForm = ({ addTicket }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken"); 
      const response = await axios.post("https://rypconsultores.cl/api/tickets/create", {
        title,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      addTicket(response.data);
      setTitle("");
      setDescription("");
      toast.success("Ticket creado exitosamente!");

      window.location.reload();
    } catch (error) {
      console.error("Error al crear el ticket:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Cree un nuevo ticket</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del ticket"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe tu problema"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketCreationForm;
