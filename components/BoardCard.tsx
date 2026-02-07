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

      // if the url contain a uuid
      if (uuid) {
        // if there is a uuid in the localstorage and in the url but there are different, fetch using the uuid in the localstorage
        if (localUUID && uuid !== localUUID) {
          await fetchGameFromServer(localUUID);
        }
        // else if there is a uuid in the url but not in the localstorage, fetch using the uuid in the parameter
        else if (!localUUID) {
          await fetchGameFromServer(uuid);
        }
        // else set the game from the localstorage (no need to fetch from the server)
        else {
          // set the puzzle state
          setPuzzleString(localPuzzleString);
          // update UI state
          setLoading(false);
        }

        // do nothing
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

        // do nothing
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
      } catch (error: any) {
        // handle 404 errors
        if (error.response.status === 404) {
          console.warn("Game not found, resetting...");
        }
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
