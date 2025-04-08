"use client";
import * as React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CopyIcon } from "lucide-react";
import { Input } from "./ui/input";

type ShareModalProps = {
  children: React.ReactNode;
  shareUrl: string;
};

export function ShareModal({ children, shareUrl }: ShareModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
          <DialogDescription>
            Share this link with others to collaborate
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={shareUrl} readOnly className="flex-1" />
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
