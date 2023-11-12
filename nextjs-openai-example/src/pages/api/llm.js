// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import "dotenv/config";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";


const client = new OpenAIClient(
  process.env.AZURE_OPENAI_API_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY)
);

const deployment = process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME;


export default async function handler(req, res) {
  const systemPrompt = "You are a helper assistant that translates text from whatever language into English";

  const messages = [{
    role: "system",
    content: systemPrompt,
  }, {
    role: "user",
    content: req.body.text,
  }];

  const result = await client.getChatCompletions(deployment, messages);

  for (const choice of result.choices) {
    console.log(choice);
  }

  res.status(200).json(result.choices[0].message.content)
}
