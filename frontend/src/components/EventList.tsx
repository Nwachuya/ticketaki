import React, { useEffect, useState } from "react";
import { getEvents } from "../firestore";

interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents as EventData[]);
      } catch (err) {
        setError("Error fetching events");
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>All Events</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {events.map(event => (
          <li key={event.id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
