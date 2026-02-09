"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Lightbulb, RotateCcw } from "lucide-react";
import { gameService } from "@/service/gameService";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Controls() {
  // states
  const [difficulty, setDifficulty] = useState<string>("EASY"); // new game difficulty by default is easy

  // router instance
  const router = useRouter();

  // function to handle generating new game
  const handleGeneratingNewGame = async () => {
    try {
      // request new game from the server
      const data = await gameService.createNewGame(difficulty);

      // update URL
      router.replace(`?id=${data.gameId}`, { scroll: false });

      // update LocalStorage
      localStorage.clear();
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
    <div className="flex gap-2 items-center justify-center my-4">
      <Sheet>
        {/* Sheet opener button */}
        <SheetTrigger asChild>
          {/* New game button */}
          <Button size="icon-lg" className="w-40">
            <RotateCcw />
            <span className="font-semibold">New Game</span>
          </Button>
        </SheetTrigger>

        {/* sheet content */}
        <SheetContent className="flex flex-col p-1 gap-2">
          <SheetHeader>
            <SheetTitle>New Game</SheetTitle>
            <SheetDescription>
              Select a difficulty level to start a fresh puzzle. Note that your
              current game progress will be cleared.
            </SheetDescription>

            <Tabs
              defaultValue="EASY"
              onValueChange={(value) => {
                setDifficulty(value);
              }}
              className="flex flex-col items-center justify-center"
            >
              <TabsList>
                <TabsTrigger value="EASY">Normal</TabsTrigger>
                <TabsTrigger value="MEDIUM">Hard</TabsTrigger>
                <TabsTrigger value="HARD">Hardcore</TabsTrigger>
              </TabsList>

              {/* Normal / EASY */}
              <TabsContent value="EASY">
                <Card>
                  <CardHeader>
                    <CardTitle>Normal Mode</CardTitle>
                    <CardDescription>
                      A balanced experience for casual play.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    With 46 clues remaining, you'll have plenty of starting
                    points to practice your basic Sudoku techniques.
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Hard / MEDIUM */}
              <TabsContent value="MEDIUM">
                <Card>
                  <CardHeader>
                    <CardTitle>Hard Mode</CardTitle>
                    <CardDescription>
                      For seasoned players looking for a challenge.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    45 numbers are removed, leaving only 36 clues. You'll need
                    to use intermediate tactics like "Naked Pairs" to solve
                    this.
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Hardcore / HARD */}
              <TabsContent value="HARD">
                <Card>
                  <CardHeader>
                    <CardTitle>Hardcore Mode</CardTitle>
                    <CardDescription>
                      Maximum difficulty. No room for error.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    Only 27 clues remain. This board requires advanced logic and
                    meticulous note-taking to complete.
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </SheetHeader>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => handleGeneratingNewGame()}>
                Start Game
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* TODO: Hint button */}
      {/* <Button size="icon-lg" className="w-20">
        <Lightbulb />
        <span className="font-semibold">Hint</span>
      </Button> */}
    </div>
  );
}
