import { createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({ token: null, role: null });
    const [events, setEvents] = useState([]);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Load user data from sessionStorage (for persistence)
    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            fetchEvents();
        }
    }, []);

    // Login with API
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

            if (response.data.token) {
                const userData = { 
                    token: response.data.token, 
                    role: response.data.user.role, 
                    name: response.data.user.name 
                };

                setUser(userData);
                sessionStorage.setItem("user", JSON.stringify(userData));

                fetchEvents();
            }
        } catch (error) {
            alert("Invalid credentials or server error!");
            console.error("Login failed:", error);
        }
    };

    // Signup with API
    const signup = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });

            if (response.status === 201) {
                alert("Signup successful! Please log in.");
            }
        } catch (error) {
            alert("Signup failed. Try again!");
            console.error("Signup error:", error);
        }
    };

    // Fetch events
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            setEvents(response.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
            setEvents([]);
        }
    };


    //addingEvents, updating events
    // const addEvent = async (newEvent) => {
    //   try {
    //     const response = await fetch(`${API_BASE_URL}/events`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newEvent),
    //     });
  
    //     if (response.ok) {
    //       const savedEvent = await response.json();
    //       setEvents((prevEvents) => [...prevEvents, savedEvent]);
    //     } else {
    //       console.error("Failed to add event");
    //     }
    //   } catch (error) {
    //     console.error("Error adding event:", error);
    //   }
    // };

    // Logout
    const logout = () => {
        setUser({ token: null, role: null, name: null });
        setEvents([]);
        sessionStorage.removeItem("user");
    };

    return (
        <GlobalContext.Provider value={{ user, events, fetchEvents, login, signup, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
