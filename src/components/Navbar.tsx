"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, Share2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareModal } from "./ShareModal";

export function Navbar({ className }: { className?: string }) {
  const [shareUrl, setShareUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <nav
      className={cn(
        "flex items-center justify-between p-4 border-b",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        {/* Replace with your logo */}
        <div className="w-8 h-8 rounded-full bg-primary"></div>
        <span className="font-semibold">Mermaid AI Editor</span>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <a
            href="https://github.com:rauleburro/mermaid-ai-editor.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <GithubIcon className="w-4 h-4 mr-2" />
            GitHub
          </a>
        </Button>

        <ShareModal shareUrl={shareUrl}>
          <Button variant="outline" size="sm">
            <Share2Icon className="w-4 h-4 mr-2" />
            Share
          </Button>
        </ShareModal>
      </div>
    </nav>
  );
}
