"use client";

import React from "react";
import { Button } from "./ui/button";
import { Lightbulb, RotateCcw } from "lucide-react";
import { gameService } from "@/service/gameService";
import { useRouter } from "next/navigation";

export default function Controls() {
  // router instance
  const router = useRouter();

  // function to handle generating new game
  const handleGeneratingNewGame = async () => {
    try {
      // request new game from the server
      const data = await gameService.createNewGame();

      // update URL
      router.replace(`?id=${data.gameId}`, { scroll: false });

      // update LocalStorage
      localStorage.setItem("gid", data.gameId);
      localStorage.setItem("ps", data.puzzleString);
      localStorage.setItem("d", data.difficulty);

      // force a full page reload to the new URL
      window.location.href = `/?id=${data.gameId}`;
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      {/* New game button */}
      <Button
        size="icon-lg"
        className="w-40"
        onClick={() => handleGeneratingNewGame()}
      >
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
