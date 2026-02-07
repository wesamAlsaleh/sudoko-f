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
    // function to initialize a game
    const initializeGame = async () => {
      // update UI state
      setLoading(true);

      // get the game data from the localstorage
      const localUUID = localStorage.getItem("gid");
      const localPuzzleString = localStorage.getItem("ps");

      // if the url contain an id, fetch from the server (e.g., someone shared a link)
      if (uuid) {
        // if the uuid in the url is different from the one in the storage OR there is no game in the storage fetch the new game
        if (uuid !== localUUID || !localUUID) {
          await fetchGameFromServer(uuid); // only fetch if it's different from what we already have in state
        }
        // else set the game from the localstorage
        else {
          // set the puzzle state
          setPuzzleString(localPuzzleString);
          // update UI state
          setLoading(false);
        }
        return;
      }

      // if there is no url, but localstorage has a saved game, load it from the storage
      if (localUUID && localPuzzleString) {
        // set the puzzle state
        setPuzzleString(localPuzzleString);

        // update the URL with the id in the localstorage
        router.replace(`?id=${localUUID}`, { scroll: false });

        // update UI state
        setLoading(false);
        return;
      }

      // default if there is no URL, no localstorage, stay empty until the player clicks new game
      setPuzzleString("0".repeat(81)); // set the puzzle state
      setLoading(false); // update UI state
    };

    // function to fetch a game from the server (generate new or load a game)
    const fetchGameFromServer = async (uuid?: string) => {
      try {
        //if the uuid exists load the game, otherwise generate a new puzzles
        const data = uuid
          ? await gameService.getGame(uuid)
          : await gameService.createNewGame();

        // set the puzzle state
        setPuzzleString(data.puzzleString);

        // update URL
        router.replace(`?id=${data.gameId}`, { scroll: false });

        // update LocalStorage
        localStorage.setItem("gid", data.gameId);
        localStorage.setItem("ps", data.puzzleString);
        localStorage.setItem("d", data.difficulty);
      } catch (error) {
        // log the error
        console.error("Fetch failed:", error);

        // make the puzzle empty
        setPuzzleString("0".repeat(81));
      } finally {
        setLoading(false);
      }
    };

    // initialize a game
    initializeGame();
  }, [uuid]); // listen to url changes

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
