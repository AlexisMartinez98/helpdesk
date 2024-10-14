import { useState } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

const Chatbot = ({isChatOpen,setIsChatOpen}) => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  // const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setIsButtonDisabled(true);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3000/chatbot",
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResponses([
        ...responses,
        { user: message, bot: response.data.aiResponse },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error en el chatbot:", error);
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
    } else {
      setIsChatOpen(true);
    }
  };

  return (
    <div>
      <div
        className="fixed bottom-5 right-5 bg-blue-600 text-white w-16 h-16 rounded-full flex justify-center items-center shadow-lg cursor-pointer"
        onClick={toggleChat}
      >
        <FaRobot size={30} />
      </div>

      {isChatOpen && (
        <div className="fixed bottom-20 right-5 bg-gray-800 text-white shadow-lg rounded-lg w-96 h-2/3 md:h-1/2 p-4 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">Chatbot</h3>

          <div className="space-y-4 overflow-y-auto h-64 bg-gray-700 p-2 rounded-md flex-grow">
            {responses.map((res, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-white">
                  <strong>Tu:</strong> {res.user}
                </p>
                <p className="font-medium text-gray-300">
                  <strong>Bot:</strong> {res.bot}
                </p>
              </div>
            ))}
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isLoading ? "El bot está pensando..." : "Pregúntale al Chatbot"}
              className="w-full p-3 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-900 text-white"
              disabled={isLoading} // Desactivar el input mientras se espera la respuesta
            />
            <button
              onClick={sendMessage}
              className={`bg-blue-600 text-white p-3 rounded-r-lg transition ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={isButtonDisabled} // Desactivar el botón mientras se espera la respuesta
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
