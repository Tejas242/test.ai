const express = require('express');
const cors = require('cors');
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());

const MODEL_NAME = "models/text-bison-001";
const stopSequences = [];

app.get('/api/generate-text', async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY || '';
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const topic = req.query.topic;
    const promptString = `Please generate related follow-up questions to this topic: ${topic}`;

    const result = await client.generateText({
      model: MODEL_NAME,
      temperature: 0.25,
      candidateCount: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
      stopSequences: stopSequences,
      safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_LOW_AND_ABOVE"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_LOW_AND_ABOVE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_MEDIUM_AND_ABOVE"}],
      prompt: {
        text: promptString,
      },
    });

    const candidates = result[0]?.candidates;

    if (candidates && candidates.length > 0) {
      res.json({ data: candidates[0].output });
    } else {
      throw new Error('No candidates found in the response.');
    }
  } catch (error) {
    console.error('Error generating text data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
