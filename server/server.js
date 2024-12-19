const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs").promises; // Gestione asincrona del file system
const path = require("path"); // Gestione dei percorsi

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const KNOWLEDGE_DIR = './knowledge';
const CRON_CONVERSAZIONI_DIR = './cron_conversazioni';
const SENSORI_BIDONI_DIR = './sensori_bidoni';

// Funzione per convertire l'array di oggetti in una stringa formattata
function formatRoles(roles) {
    return roles.map(role => {
        return `<|start_of_role|>${role.role}<|end_of_role|>${role.text}<|end_of_text|>`;
    }).join('\n');
}

async function apiSensoriBidoni() {
    try {
        const files = await fs.readdir(SENSORI_BIDONI_DIR);
        const jsonData = [];
        for (const file of files) {
            const filePath = path.join(SENSORI_BIDONI_DIR, file);
            const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
            jsonData.push(content);
        }
        return jsonData.flat();
    } catch (error) {
        console.error('Error loading knowledge files sensori bidoni:', error);
        throw error;
    }
}

// Funzione per leggere e unire i contenuti JSON dalla directory `knowledge`
async function loadKnowledgeFiles() {
    try {
        const files = await fs.readdir(KNOWLEDGE_DIR);
        const jsonData = [];
        for (const file of files) {
            const filePath = path.join(KNOWLEDGE_DIR, file);
            const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
            jsonData.push(content);
        }
        return jsonData.flat();
    } catch (error) {
        console.error('Error loading knowledge files:', error);
        throw error;
    }
}

// Funzione per leggere i dati attuali dal file cron_conversazione specifico
async function readCronConversazione(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading cron_conversazioni file:', error);
        throw error;
    }
}

// Funzione per creare un file JSON incrementale nella directory `cron_conversazioni`
async function createCronConversazioneFile() {
    try {
        const files = await fs.readdir(CRON_CONVERSAZIONI_DIR);
        const nextNumber = files.length + 1;
        const newFilePath = path.join(CRON_CONVERSAZIONI_DIR, `conversation_${nextNumber}.json`);
        await fs.writeFile(newFilePath, JSON.stringify([])); // File vuoto iniziale
        return newFilePath;
    } catch (error) {
        console.error('Error creating cron_conversazioni file:', error);
        throw error;
    }
}

// Funzione per salvare i dati nei file JSON di `cron_conversazioni`
async function saveToCronConversazione(filePath, data) {
    try {
        const currentData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        currentData.push(data);
        await fs.writeFile(filePath, JSON.stringify(currentData, null, 2));
    } catch (error) {
        console.error('Error saving to cron_conversazioni file:', error);
        throw error;
    }
}

// Creazione del file iniziale incrementale nella directory `cron_conversazioni` al primo avvio
let currentCronFilePath;
(async () => {
    currentCronFilePath = await createCronConversazioneFile();
})();

// Route to fetch IAM token
app.post("/get-iam-token", async (req, res) => {
  const apiKey = "6nqr1Xpgorh6Al7quQYcaQmE3vb3jvqRXlMVlAwy-OKe";
  try {
    const response = await axios.post(
      "https://iam.cloud.ibm.com/identity/token",
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.json({ accessToken: response.data.access_token });
  } catch (error) {
    console.error("Error fetching IAM token:", error.response?.data || error.message);
    res.status(500).json({ error: "Unable to fetch IAM token" });
  }
});
app.post("/generate-text", async (req, res) => {
    const { inputText, iamToken } = req.body;
  
    try {
      const keywords = ["mostrami", "bidoni", "secchi", "cassonetti"];
      const matchesKeywords = keywords.some((word) => inputText.toLowerCase().includes(word));
  
      if (matchesKeywords) {
        // Estrai la città dall'inputText
        const cities = ["Roma", "Napoli", "Milano", "Torino", "Bologna"]; // Elenco delle città supportate
        const requestedCity = cities.find((city) => inputText.toLowerCase().includes(city.toLowerCase()));
  
        // Ottieni i dati dei bidoni
        const bidoniData = await apiSensoriBidoni();
  
        // Filtra i dati per la città richiesta o restituisci tutti i dati
        const filteredData = requestedCity
          ? bidoniData.filter((bidone) => bidone.luogo.toLowerCase() === requestedCity.toLowerCase())
          : bidoniData;
  
        const responseText = filteredData.length > 0
          ? filteredData
              .map(
                (bidone, index) =>
                  `${index + 1}. Luogo: ${bidone.luogo}, Coordinate: ${bidone.coord}, Riempimento: ${bidone.riempimento}%, Temperatura: ${bidone.temperatura}°C`
              )
              .join("\n")
          : `Non ho trovato bidoni per la città richiesta (${requestedCity || "tutte le città"}).`;
  
        return res.json({
          type: "bidoni",
          city: requestedCity || "tutte le città",
          data: filteredData,
          results: [
            {
                generated_text: responseText,
            }],
        });
      }
  
      // Se non si tratta di una richiesta sui bidoni, continua con Watson
      const knowledgePrompts = await loadKnowledgeFiles();
      const conversationContent = await readCronConversazione(currentCronFilePath);
  
      const promptsToFormat = [
        ...knowledgePrompts,
        ...conversationContent,
        { role: "user", text: inputText },
      ];
  
      const formattedString = formatRoles(promptsToFormat);
  
      const url = "https://eu-de.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${iamToken}`,
      };
      const body = {
        input: formattedString,
        parameters: {
          decoding_method: "greedy",
          max_new_tokens: 900,
          min_new_tokens: 0,
          stop_sequences: [],
          repetition_penalty: 1,
        },
        model_id: "ibm/granite-3-8b-instruct",
        project_id: "9bdded06-64e4-4d38-a058-73f0a3a41131",
      };
  
      const response = await axios.post(url, body, { headers });
      const generatedText = response.data.results[0].generated_text;
  
      await saveToCronConversazione(currentCronFilePath, { role: "user", text: inputText });
      await saveToCronConversazione(currentCronFilePath, { role: "assistant", text: generatedText });
  
      res.json(response.data);
    } catch (error) {
      console.error("Error in generate-text API:", error.response?.data || error.message);
      res.status(500).json({ error: "Non-200 response", details: error.response?.data || error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
