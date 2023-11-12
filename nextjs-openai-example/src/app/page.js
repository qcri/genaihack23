"use client"
import { useState } from 'react'
import { Note, Textarea, Button, Spacer } from '@geist-ui/core'


const TextInput = ({ onSubmit }) => {
  const [text, setText] = useState("")
  
  const handleUpdateText = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="flex flex-col">
      <Textarea type="secondary" className="border border-gray-300 rounded-lg p-2" onChange={handleUpdateText} />
      <Spacer h={1} />
      <Button type="success" className="border border-gray-300 rounded-lg p-2 ml-2" onClick={() => onSubmit(text)}>Submit</Button>
    </div>
  )
}


export default function Home() {
  const [response, setResponse] = useState("")

  const handleSubmit = async (query) => {
    const data = await fetch("/api/llm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: query,
      }),
    }).then(res => res.json())

    setResponse(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.js</code>
        </p>
      </div>

      <div className="flex flex-col">
        <TextInput onSubmit={(text) => handleSubmit(text)} />

        <Spacer h={2} />

        { response &&
          <Note label="Translation" type="cyan" width="100%" className="h-16 w-16 border">
            {response}
          </Note>
        }
      </div>
    </main>
  )
}
