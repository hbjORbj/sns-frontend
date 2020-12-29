export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  next();
};

export const isUserLoggedIn = () => {
  if (typeof window == "undefined") {
    return false;
  }
  return localStorage.getItem("jwt") ? true : false;
};

export const getJwt = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return null;
  }
};

export const updateJwt = (user, next) => {
  if (localStorage.getItem("jwt")) {
    let jwt = JSON.parse(localStorage.getItem("jwt"));
    jwt.user = user;
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  next();
};

export const sendPasswordResetLink = (email) => {
  return fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const resetPassword = (newPassword, resetPasswordLink) => {
  return fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword, resetPasswordLink }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
