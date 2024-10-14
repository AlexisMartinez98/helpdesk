import {  Routes, Route ,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Layout from "./components/Layout";
import Login from "./components/Login";
import TicketList from "./components/TicketList";
import Chatbot from "./components/ChatBot";
import Register from "./components/Register";
import TicketDetail from "./components/TicketDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login"); 
    }
  }, [navigate]);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
         
           <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="/" element={<TicketList  isChatOpen={isChatOpen}/>} />
        </Routes>
      </Layout>
      <Chatbot setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen}/> 
      <ToastContainer />
    </div>
  );
};

export default App;
