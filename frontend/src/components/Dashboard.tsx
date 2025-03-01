import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import EventForm from "./EventForm";
import EventList from "./EventList";
import PurchaseTicket from "./PurchaseTicket";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/"); // Redirect to login if not authenticated
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Your Dashboard</h1>
      {user && <p>Logged in as: {user.email}</p>}

      <hr style={{ margin: "20px 0" }} />

      {/* Add Event Form */}
      <EventForm />

      <hr style={{ margin: "20px 0" }} />

      {/* Display Event List */}
      <EventList />

      <hr style={{ margin: "20px 0" }} />
      
      {/* Purchase Ticket Form */}
      <PurchaseTicket />

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleLogout}
        style={{ padding: "10px 20px", cursor: "pointer", marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
