export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  next();
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  return localStorage.getItem("jwt") ? true : false;
};
