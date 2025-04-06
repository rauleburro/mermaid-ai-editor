"use client";

import { CodeContext } from "@/context/CodeContext";
import React, { useContext } from "react";
import MonacoEditor from "@monaco-editor/react";

export const CodeEditor = () => {
  const { code, setCode } = useContext(CodeContext);

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="mermaid"
      value={code}
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
