import axios from "axios";

const URL = process.env.REACT_APP_API_BASE_URL;

// Delete an event
export const deleteEvent = async (eventId, eventTitle) => {
    try {
        const response = await axios.post(`${URL}/events/delete`, { id: eventId });

        if (response.status === 200) {
            return { success: true, message: `Event '${eventTitle}' is deleted` };
        } else {
            console.error("Failed to delete event:", response.data.message);
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, message: "An error occurred while deleting the event." };
    }
};

// Register for an event
export const registerForEvent = async (userId, eventId, eventTitle) => {
    try {
        const response = await axios.post(`${URL}/events/${eventId}/register`, { userId });

        if (response.status === 200) {
            return { success: true, message: `You are registered for event '${eventTitle}'` };
        } else {
            console.error("Failed to register for event:", response.data.message);
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Error registering for event:", error);
        return { success: false, message: "An error occurred while registering for the event." };
    }
};


//fetch user's specific registration 
export const fetchUserRegisteredEvents = async (userId) => {
    try {
        const response = await axios.get(`${URL}/users/${userId}/registered-events`);
        
        if (response.status === 200) {
            return { success: true, events: response.data };
        } else {
            console.error("Failed to fetch registered events:", response.data.message);
            return { success: false, events: [] };
        }
    } catch (error) {
        console.error("Error fetching registered events:", error);
        return { success: false, events: [] };
    }
};

// Fetch all event registrations
export const fetchAllRegistrations = async () => {
    try {
      const response = await axios.get(`${URL}/users/registrations`);
  
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        console.error("Failed to fetch registrations:", response.data.message);
        return { success: false, data: [] };
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return { success: false, data: [] };
    }
  };
  
  export default fetchAllRegistrations;
  