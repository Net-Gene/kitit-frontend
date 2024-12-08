import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config/config";

export const useFetchUserId = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/auth/check-auth-token`, { withCredentials: true })
      .then((response) => setUserId(response.data.userId))
      .catch((error) => console.error("Error fetching user ID:", error));
  }, []);
  return userId;
};
