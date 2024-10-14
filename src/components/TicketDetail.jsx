import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TicketDetail = () => {
  const { id } = useParams(); // Obtener el ID del ticket de la URL
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [isResolved, setIsResolved] = useState(false); // Inicialmente falso

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Obtener el token del almacenamiento local
        const response = await axios.get(`http://20.118.220.82:3000/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Incluir el token en la cabecera
        });
        const fetchedTicket = response.data;
        setTicket(fetchedTicket); // Guardar el ticket en el estado
        
        // Verificar si el ticket ya está resuelto
        if (fetchedTicket.status === "cerrado") {
          setIsResolved(true);
        }
      } catch (error) {
        console.error("Error al obtener el ticket:", error);
        setError(error.response ? error.response.data.error : "Error al obtener el ticket");
      }
    };

    fetchTicketDetail();
  }, [id]);

  const handleMarkAsResolved = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`http://20.118.220.82:3000/tickets/update/${id}`, {
        status: "cerrado",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsResolved(true);
      setTicket({ ...ticket, status: "cerrado" });
    } catch (error) {
      console.error("Error al actualizar el ticket:", error);
    }
  };

  if (error) {
    return <div className="text-red-600">{error}</div>; 
  }

  if (!ticket) {
    return <div>Cargando...</div>;
  }

  const statusClass = () => {
    switch (ticket.status) {
      case "cerrado":
        return "bg-green-200 text-green-800";
      case "En proceso":
        return "bg-yellow-200 text-yellow-800";
      case "abierto":
      default:
        return "bg-red-200 text-red-800";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <h3><strong>ID:</strong> {ticket._id}</h3>
      <span></span>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{ticket.title}</h2>
      <span
        className={`md:absolute top-4 right-4 inline-block px-3 py-1 rounded-full text-sm ${statusClass()}`}
      >
        {ticket.status}
      </span>
      <p className="text-gray-600 mb-2"><strong>Descripción:</strong> {ticket.description}</p>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Solución:</h2>
      <ul className="list-disc list-inside mb-4">
        {ticket.subTickets.map((subTicket, index) => (
          <li key={index} className="mb-1">
            <strong>Resolución:</strong> {subTicket.resolution}
          </li>
        ))}
      </ul>
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">
        Volver a la lista de tickets
      </Link>

      {/* Mostrar el botón solo si el ticket no está resuelto */}
      {!isResolved && (
        <button
          onClick={handleMarkAsResolved}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          ¿Pudimos resolver tu problema?
        </button>
      )}
    </div>
  );
};

export default TicketDetail;
