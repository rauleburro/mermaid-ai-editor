"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useContext } from "react";
import { CodeContext } from "@/context/CodeContext";
import { useTheme } from "next-themes";
import panzoom from "panzoom";

export function MermaidVisualizer() {
  const { code } = useContext(CodeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const panZoomInstance = panzoom(container);

      return () => {
        panZoomInstance.dispose();
      };
    }
  }, []);

  useEffect(() => {
    async function renderDiagram() {
      if (!code || !containerRef.current) return;

      try {
        mermaid.initialize({
          startOnLoad: true,
          theme: theme === "dark" ? "dark" : "default",
          securityLevel: "loose",
        });

        // Clear previous content
        containerRef.current.innerHTML = "";

        const { svg } = await mermaid.render("mermaid-diagram", code);
        containerRef.current.innerHTML = svg;

        // Apply panzoom to the newly rendered SVG
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) {
          // Ensure the SVG scales properly
          if (!svgElement.hasAttribute('viewBox')) {
            const width = svgElement.getAttribute('width');
            const height = svgElement.getAttribute('height');
            if (width && height) {
              svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
            }
          }

          // Ensure high-quality rendering
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

          const panZoomInstance = panzoom(svgElement);
          // Center the SVG
          const bbox = svgElement.getBBox();
          const xCenter = (containerRef.current.clientWidth - bbox.width) / 2;
          const yCenter = (containerRef.current.clientHeight - bbox.height) / 2;
          panZoomInstance.moveTo(xCenter, yCenter);
          panZoomInstance.zoomAbs(xCenter + bbox.width / 2, yCenter + bbox.height / 2, 1);
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
      }
    }

    renderDiagram();
  }, [code, theme]);

  return (
    <>
      {code ? (
        <div
          ref={containerRef}
          className={`w-full h-full overflow-auto grid-bg-${theme}`}
        />
      ) : (
        <p className="text-gray-500">Diagram will appear here</p>
      )}
    </>
  );
}
