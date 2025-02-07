import React, { useState } from "react";
import { createTicket, TicketData } from "../ticketService";
import { getAuth } from "firebase/auth";

const PurchaseTicket: React.FC = () => {
  const user = getAuth().currentUser; // Current logged-in user (for userId)
  
  // State for each field in TicketData
  const [eventId, setEventId] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [tier, setTier] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [seatNumber, setSeatNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("paid"); // default
  const [status, setStatus] = useState("active");             // default
  const [qrCode, setQrCode] = useState("");
  
  // For simplicity, we won't set `purchaseDate` or `scannedAt` manually
  // Firestore will default `purchaseDate` to now, and `scannedAt` stays null
  const [message, setMessage] = useState("");

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("You must be logged in to purchase tickets.");
      return;
    }

    // Build the ticket data object
    const ticketData: TicketData = {
      eventId,
      userId: user.uid,
      buyerName,
      buyerEmail,
      tier,
      price,
      quantity,
      seatNumber: seatNumber ? seatNumber : undefined,
      paymentStatus,
      status,
      // purchaseDate, qrCode, scannedAt are optional
      qrCode: qrCode ? qrCode : undefined,
    };

    try {
      await createTicket(ticketData);
      setMessage("Ticket purchased successfully!");

      // Reset form fields
      setEventId("");
      setBuyerName("");
      setBuyerEmail("");
      setTier("");
      setPrice(0);
      setQuantity(1);
      setSeatNumber("");
      setPaymentStatus("paid");
      setStatus("active");
      setQrCode("");
    } catch (error) {
      setMessage("Error purchasing ticket.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Purchase Ticket</h2>
      <form onSubmit={handlePurchase} style={{ maxWidth: "300px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Buyer Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="email"
          placeholder="Buyer Email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Ticket Tier"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Seat Number (optional)"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        >
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        >
          <option value="active">Active</option>
          <option value="used">Used</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="QR Code (optional)"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Buy Ticket
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PurchaseTicket;
