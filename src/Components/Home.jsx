import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Home = () => {
  
   const navigate = useNavigate();
  const cards = [
    {
      title: "Admin Login",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      path: "/admin-login",
    },
    {
      title: "Passenger Login",
      img: "https://cdn-icons-png.flaticon.com/512/12757/12757672.png",
      path: "/passenger-login",
    },
    {
      title: "Driver Login",
      img: "https://cdn-icons-png.flaticon.com/512/1535/1535791.png",
      path: "/driver-login",
    },
  ];

  return (
  <>
    <Navbar />
    <div className="container">
      <div className="cards-container">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => navigate(card.path)}
          className="cards"
        >
          <img
            src={card.img}
            alt={card.title}
            className=""
          />
          <h1 className="card-title">
            {card.title}
          </h1>
        </div>
      ))}
      </div>
    </div></>
  );
};

export default Home;
