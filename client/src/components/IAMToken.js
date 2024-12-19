import axios from "axios";

export const fetchIAMToken = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/get-iam-token`, {}, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('URL:', response.data.accessToken);

    return response.data.accessToken;

  } catch (error) {
    console.error("Failed to fetch IAM token:", error);
    return null;
  }
};
