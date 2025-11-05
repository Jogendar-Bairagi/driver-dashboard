import React from "react";
import { useNavigate } from "react-router-dom";
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
      img: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
      path: "/passenger-login",
    },
    {
      title: "Driver Login",
      img: "https://cdn-icons-png.flaticon.com/512/1995/1995525.png",
      path: "/driver-login",
    },
  ];

  return (
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
          <h2 className="card-title">
            {card.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Home;
