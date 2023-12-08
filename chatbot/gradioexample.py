import os
import json
import dotenv
from openai import AzureOpenAI
import gradio as gr


dotenv.load_dotenv()

    
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_APIKEY"),  
    api_version=os.getenv('OPEN_API_VERSION'),
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
)

memory=[]

def produce_response(message, history):
    """
      message: new message from the user
      history: history of messages from user
    """
    model=os.getenv("MODEL_NAME")
    messages = []
    for e in history:
      messages.append({"role": "system", "content": e[0]})
      messages.append({"role": "user", "content": e[1]})
    messages.append({"role": "user", "content": message})
    response = client.chat.completions.create(
      model=model,
      messages=messages,
    )
    return response.choices[0].message.content

demo = gr.ChatInterface(
  produce_response,
  title="OpenAI Chatbot Example",
  description="A chatbot example for QCRI Generative AI Hackathon 2023",
  )

if __name__ == "__main__":
    demo.launch()
