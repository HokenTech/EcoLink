import axios from "axios";

export const generaTesto = async (inputText, iamToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/generate-text`, 
      { inputText, iamToken },  // Un unico oggetto con entrambi i campi
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("erroreeeeee ", error);
    return null;
  }
};