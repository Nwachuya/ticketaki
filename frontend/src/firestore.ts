import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const eventsCollection = collection(db, "events");

// Function to add a new event
export const addEvent = async (eventData: { name: string; date: string; location: string }) => {
  try {
    const docRef = await addDoc(eventsCollection, eventData);
    console.log("Event added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Function to fetch all events
export const getEvents = async () => {
  try {
    const snapshot = await getDocs(eventsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
