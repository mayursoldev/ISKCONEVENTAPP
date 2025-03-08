import { createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({ token: null, role: null });
  let eventDummy = [{ id: 1, title: "React Workshop", date: "2025-02-01", category: "Workshop", location: "Tech Park" },
  { id: 2, title: "SQL Mastery", date: "2025-02-15", category: "Seminar", location: "Convention Center" }]
  const [events, setEvents] = useState(eventDummy);

  // Load user data from sessionStorage (for persistence)
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
  }, []);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://api.example.com/events");
      response ? setEvents(response.data) : setEvents(eventDummy);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const login = (email, password) => {
    if (email === "admin" && password === "admin123") {
      const userData = { token: "fake-token", role: "admin", name: "admin Name"};
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      //fetchEvents(); // Fetch events on successful login
    } else if (email === "user" && password === "user123") {
      const userData = { token: "fake-token", role: "user", name: "user Name" };
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      //fetchEvents(); // Fetch events on successful login
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    setUser({ token: null, role: null, name: null });
    setEvents([]); // Clear events on logout
    sessionStorage.removeItem("user");
  };

  return (
    <GlobalContext.Provider value={{ user, events, fetchEvents, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;