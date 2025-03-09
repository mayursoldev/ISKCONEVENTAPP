import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { FetchLocations } from "../service/location-service";
import Swal from "sweetalert2";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({ token: null, role: null });
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);

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
                    id: response.data.user.id,
                    role: response.data.user.role, 
                    name: response.data.user.name 
                };
    
                setUser(userData);
                sessionStorage.setItem("user", JSON.stringify(userData));
    
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${response.data.user.name}!`,
                    confirmButtonColor: '#28a745'
                });
    
                fetchEvents();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid credentials or server error!',
                confirmButtonColor: '#dc3545'
            });
            console.error("Login failed:", error);
        }
    };
    

    // Signup with API
    const signup = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
    
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful!',
                    text: 'Please log in to continue.',
                    confirmButtonColor: '#28a745'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: 'Try again or contact support.',
                confirmButtonColor: '#dc3545'
            });
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
    const addEvent = async (newEvent) => {
      try {
        const response = await fetch(`${API_BASE_URL}/events/addOrUpdate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
  
        if (response.ok) {
          const savedEvent = await response.json();
          setEvents((prevEvents) => [...prevEvents, savedEvent]);
        } else {
          console.error("Failed to add event");
        }
      } catch (error) {
        console.error("Error adding event:", error);
      }
    };

    // Logout
    const logout = () => {
        setUser({ token: null, role: null, name: null });
        setEvents([]);
        sessionStorage.removeItem("user");
    };

    return (
        <GlobalContext.Provider value={{ user, events, fetchEvents, login, signup, logout, addEvent }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
