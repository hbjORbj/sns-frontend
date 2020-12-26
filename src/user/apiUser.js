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

export const follow = (userId, followedUserId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, followedUserId }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const unfollow = (userId, unfollowedUserId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, unfollowedUserId }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// Logged-in user with valid "token" is trying to get user with "userId"
// User making such request is not necessarily the user with "userId"
export const readUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateUser = (userId, token, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const listUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const followUser = (userId, targetId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, targetId }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const unfollowUser = (userId, targetId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, targetId }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
