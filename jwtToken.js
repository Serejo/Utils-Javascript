const getJwtToken = () => {
  return localStorage.getItem("token") || false;
};

const setJwtToken = (token) => {
  if (!token) {
    return false;
  }
  localStorage.setItem("token", token);
  return getJwtToken() === token;
};

export { getJwtToken, setJwtToken };
