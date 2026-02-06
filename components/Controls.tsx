import React from "react";
import { Button } from "./ui/button";
import { Lightbulb, RotateCcw } from "lucide-react";

export default function Controls() {
  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      {/* New game button */}
      <Button size="icon-lg" className="w-40">
        <RotateCcw />
        <span className="font-semibold">New Game</span>
      </Button>

      {/* Hint button */}
      <Button size="icon-lg" className="w-20">
        <Lightbulb />
        <span className="font-semibold">Hint</span>
      </Button>
    </div>
  );
}
