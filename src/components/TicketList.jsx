import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TicketCreationForm from "./TicketCreationForm"; 

const TicketList = (isChatOpen) => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://20.118.220.82:3000/tickets", {
          headers: { Authorization: `Bearer ${token}` }, 
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error al obtener los tickets:", error);
      }
    };

    fetchTickets();
  }, [,isChatOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Tus Tickets</h2>
        <button
          onClick={toggleModal}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Ticket
        </button>
      </div>
      {tickets.map((ticket) => (
        <div key={ticket._id} className="bg-white shadow-md p-4 rounded-lg w-full">
          <Link to={`/ticket/${ticket._id}`}>
          <div className="flex justify-between items-center">

          <div>

            <p className="text-lg font-medium text-gray-900">{ticket.title}</p>
            <p className="text-sm text-gray-600">{ticket.description}</p>
          </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${
                ticket.status === "cerrado"
                ? "bg-green-200 text-green-800"
                : ticket.status === "En proceso"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-red-200 text-red-800"
              }`}
              >
              {ticket.status}
            </span>
              </div>
          </Link>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              X
            </button>
            <TicketCreationForm addTicket={(newTicket) => setTickets([...tickets, newTicket])} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
