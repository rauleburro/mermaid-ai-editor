"use client";

import { CodeContext } from "@/context/CodeContext";
import React, { useContext, useEffect } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import initMermaid from 'monaco-mermaid';

export const CodeEditor = () => {
  const { code, setCode } = useContext(CodeContext);
  const { theme } = useTheme();
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      initMermaid(monaco);
    }
  }, [monaco]);

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="mermaid"
      value={code}
      theme={theme === "dark" ? "vs-dark" : "light"}
      onChange={(value) => setCode(value || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};
