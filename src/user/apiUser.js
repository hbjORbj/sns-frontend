export const signup = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const login = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getUser = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")).user;
  } else {
    return null;
  }
};
