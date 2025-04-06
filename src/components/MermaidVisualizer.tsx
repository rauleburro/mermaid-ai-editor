"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useContext } from "react";
import { CodeContext } from "@/context/CodeContext";

type MermaidVisualizerProps = {};

export function MermaidVisualizer({}: MermaidVisualizerProps) {
  const { code } = useContext(CodeContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function renderDiagram() {
      if (!code || !containerRef.current) return;

      try {
        mermaid.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
        });

        // Clear previous content
        containerRef.current.innerHTML = "";

        const { svg } = await mermaid.render("mermaid-diagram", code);
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
      }
    }

    renderDiagram();
  }, [code]);

  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      {code ? (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-auto" />
      ) : (
        <p className="text-gray-500">Diagram will appear here</p>
      )}
    </div>
  );
}
