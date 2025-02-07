import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

/** 
 * Full list of fields we agreed on
 */
export interface TicketData {
  eventId: string;
  userId: string;           // UID of the buyer
  buyerName: string;
  buyerEmail: string;
  tier: string;
  price: number;
  quantity: number;
  seatNumber?: string;      // optional if no assigned seats
  paymentStatus: string;    // e.g. "paid", "refunded", "pending"
  status: string;           // e.g. "active", "used", "cancelled"
  purchaseDate?: Date;      // fallback to now if not provided
  qrCode?: string;
  scannedAt?: Date | null;
}

const ticketsCollection = collection(db, "tickets");

/**
 * Create a new ticket document with all fields
 */
export const createTicket = async (ticketData: TicketData) => {
  try {
    // Default purchaseDate to now if none provided
    if (!ticketData.purchaseDate) {
      ticketData.purchaseDate = new Date();
    }

    const docRef = await addDoc(ticketsCollection, {
      ...ticketData,
      // Convert any date fields to Timestamps so Firestore stores them properly
      purchaseDate: Timestamp.fromDate(ticketData.purchaseDate),
      scannedAt: ticketData.scannedAt
        ? Timestamp.fromDate(ticketData.scannedAt)
        : null,
    });

    console.log("Ticket created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};
