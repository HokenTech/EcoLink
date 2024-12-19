import { generaTesto } from "./contattabot";
import { fetchIAMToken } from "./IAMToken";

export const generateText = async (inputText) => {

  const iamToken = await fetchIAMToken();
  if (!iamToken) {
    return "Failed to authenticate. Please try again later.";
  }
  const generaTestamento = await generaTesto(inputText, iamToken);

  return generaTestamento;
}