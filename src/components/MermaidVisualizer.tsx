"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useContext } from "react";
import { CodeContext } from "@/context/CodeContext";
import { useTheme } from "next-themes";
import panzoom from "panzoom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Download, Square, ZoomIn, ZoomOut } from "lucide-react";

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
        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          // Ensure the SVG scales properly
          if (!svgElement.hasAttribute("viewBox")) {
            const width = svgElement.getAttribute("width");
            const height = svgElement.getAttribute("height");
            if (width && height) {
              svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
            }
          }

          // Ensure high-quality rendering
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

          const panZoomInstance = panzoom(svgElement);
          // Center the SVG
          const bbox = svgElement.getBBox();
          const xCenter = (containerRef.current.clientWidth - bbox.width) / 2;
          const yCenter = (containerRef.current.clientHeight - bbox.height) / 2;
          panZoomInstance.moveTo(xCenter, yCenter);
          panZoomInstance.zoomAbs(
            xCenter + bbox.width / 2,
            yCenter + bbox.height / 2,
            1
          );
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
      }
    }

    renderDiagram();
  }, [code, theme]);

  const handleZoomIn = () => {
    const svgElement = containerRef.current?.querySelector("svg");
    if (svgElement && containerRef.current) {
      const container = containerRef.current;
      const bbox = svgElement.getBBox();
      const panZoomInstance = panzoom(svgElement);
      const xCenter = (container.clientWidth - bbox.width) / 2;
      const yCenter = (container.clientHeight - bbox.height) / 2;
      panZoomInstance.zoomTo(xCenter, yCenter, 1.2);
      panZoomInstance.moveTo(xCenter, yCenter);
    }
  };

  const handleZoomOut = () => {
    const svgElement = containerRef.current?.querySelector("svg");
    if (svgElement && containerRef.current) {
      const container = containerRef.current;
      const bbox = svgElement.getBBox();
      const panZoomInstance = panzoom(svgElement);
      const xCenter = (container.clientWidth - bbox.width) / 2;
      const yCenter = (container.clientHeight - bbox.height) / 2;
      panZoomInstance.zoomTo(xCenter, yCenter, 0.8);
      panZoomInstance.moveTo(xCenter, yCenter);
    }
  };

  const handleReset = () => {
    const svgElement = containerRef.current?.querySelector("svg");
    if (svgElement && containerRef.current) {
      const container = containerRef.current;
      const bbox = svgElement.getBBox();
      const panZoomInstance = panzoom(svgElement);
      const xCenter = (container.clientWidth - bbox.width) / 2;
      const yCenter = (container.clientHeight - bbox.height) / 2;
      panZoomInstance.zoomTo(xCenter, yCenter, 1);
      panZoomInstance.moveTo(xCenter, yCenter);
    }
  };

  const handleDownload = () => {
    const svgElement = containerRef.current?.querySelector("svg");
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "diagram.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <Card className="absolute top-2 right-2 flex flex-row gap-2">
        <Button variant="ghost" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          <Square className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </Card>
      {code ? (
        <div
          ref={containerRef}
          className={`flex-1 w-full h-full overflow-auto grid-bg-${theme}`}
        />
      ) : (
        <p className="text-gray-500">Diagram will appear here</p>
      )}
    </div>
  );
}
