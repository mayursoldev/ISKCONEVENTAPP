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
