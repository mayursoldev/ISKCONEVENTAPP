import axios from "axios";

const URL = process.env.REACT_APP_API_BASE_URL


export const FetchLocations = async (user) => {
   
    try {
        const response = await axios.get(`${URL}/locations`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
};
