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

    //return response.data.choices[0].message.content;
    console.log('CONTATTABOT ');
    console.log(response.data);
    if(response.data.type){
      return response.data;
    }else{
      return response.data.results[0].generated_text;
    }
    

  } catch (error) {
    console.error("erroreeeeee ", error);
    return null;
  }
};