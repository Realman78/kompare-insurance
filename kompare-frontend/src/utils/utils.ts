import axios from "axios";
import { toast } from "react-toastify";

export const isValidDate = (dateStr: string) => {
    try {
        return !isNaN(new Date(dateStr).getTime());
    } catch (_) {
        return false;
    }
};

export const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.response && error.response.status >= 500) {
            toast.error("Server error!");
        }
        if (error.response?.data) {
            toast.error(error.response?.data);
        }
        throw new Error(error.message);
    } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
    }
};
