"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "./Grid";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gameService } from "@/service/gameService";

export default function BoardCard({ uuid }: { uuid: string | undefined }) {
  // states
  const [puzzleString, setPuzzleString] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // router instance
  const router = useRouter();

  // fetch the game
  useEffect(() => {
    // function to fetch a new game
    const fetchGame = async () => {
      try {
        setLoading(true);
        //if the uuid exists load the game, otherwise generate a new puzzles
        const data = uuid
          ? await gameService.getGame(uuid)
          : await gameService.createNewGame();

        // update the URL to include the new gameId
        if (data.gameId) {
          router.replace(`?id=${data.gameId}`, { scroll: false });
        }

        // set the puzzle
        setPuzzleString(data.puzzleString);

        // add the puzzle in the localstorage
        localStorage.setItem("gid", data.gameId);
        localStorage.setItem("ps", data.puzzleString);
        localStorage.setItem("d", data.difficulty);
      } catch (error) {
        console.error("Error fetching Sudoku:", error);
      } finally {
        setLoading(false);
      }
    };

    // TODO: check the localstorage if there is a generated game, if not generate a new game
    const localUUID = localStorage.getItem("gid");
    const localPuzzleString = localStorage.getItem("ps");

    if (localUUID) {
    }
    // fetch the new game
    fetchGame();
  }, [uuid]);

  console.log(puzzleString);

  return (
    // Card container
    <div className="flex justify-center items-center mb-4">
      <Card className="p-4">
        {loading ? (
          <div className="animate-pulse text-zinc-400">Loading Board...</div>
        ) : (
          <Grid puzzleString={puzzleString!} />
        )}
      </Card>
    </div>
  );
}
