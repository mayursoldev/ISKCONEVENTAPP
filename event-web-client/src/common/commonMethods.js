import { format } from "date-fns";
export const getInitials = (name) => {
    console.log("inInitials", name)
      const initials = name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
      return initials;
    };


    // date-fns format
export const formatDate = (date, dateFormat = "yyyy-MM-dd") => {
      try {
          return date ? format(new Date(date), dateFormat) : "";
      } catch (error) {
          console.error("Error formatting date:", error);
          return "";
      }
  };