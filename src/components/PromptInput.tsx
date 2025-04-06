"use client";

import React, { useState, useContext } from "react";
import { CodeContext } from "@/context/CodeContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useLoaderContext } from "@/context/LoaderContext";

const handlePromptSubmit = async (
  event: CustomEvent<string>,
  code: string,
  setCode: (code: string) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  const userPrompt = event.detail;
  if (!userPrompt.trim()) return;

  console.log("Sending to AI:");
  console.log("Prompt:", userPrompt);
  console.log("Current code:", code);

  const fullPrompt = `You are an expert in Mermaid diagrams.
The user wants to modify the following Mermaid code:

\`\`\`mermaid
${code}
\`\`\`

Based on this user request: "${userPrompt}"

Generate the updated Mermaid code. Only return the raw Mermaid code, without any explanations or markdown formatting like \`\`\`mermaid.`;

  try {
    setIsLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const generatedCode = await response.text();

    console.log("AI Response:", generatedCode);

    if (generatedCode) {
      setCode(generatedCode.trim());
    } else {
      console.error("Received empty response from AI");
    }
  } catch (error) {
    console.error("Error calling AI API:", error);
  } finally {
    setIsLoading(false);
  }
};

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const { code, setCode } = useContext(CodeContext);
  const { setIsLoading } = useLoaderContext();

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    const event = new CustomEvent("promptSubmit", { detail: prompt });
    handlePromptSubmit(event, code, setCode, setIsLoading);
    setPrompt("");
  };

  return (
    <div className="relative">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="Enter your prompt"
        className="pr-12 min-h-[100px]"
      />
      <Button
        onClick={handleSubmit}
        variant="default"
        size="sm"
        className="absolute right-2 top-2"
      >
        <Sparkles className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { PromptInput };
