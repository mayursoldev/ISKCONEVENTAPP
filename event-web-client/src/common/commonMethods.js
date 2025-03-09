import { format } from "date-fns";
import Swal from "sweetalert2";
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



export const showConfirmationDialog = (title, text, onConfirm) => {
  Swal.fire({
    title: title || "Are you sure?",
    text: text || "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, proceed!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
};



  