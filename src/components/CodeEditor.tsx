"use client";

import { CodeContext } from "@/context/CodeContext";
import React, { useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";

export const CodeEditor = () => {
  const { code, setCode } = useContext(CodeContext);
  const { theme } = useTheme();

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
