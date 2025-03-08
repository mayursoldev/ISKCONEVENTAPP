export const getInitials = (name) => {
    console.log("inInitials", name)
      const initials = name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
      return initials;
    };