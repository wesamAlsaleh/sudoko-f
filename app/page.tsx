"use server";

import BoardCard from "@/components/BoardCard";
import Controls from "@/components/Controls";
import StatsBar from "@/components/StatsBar";
import Title from "@/components/Title";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  // get the UUID of the game from the params
  const { id } = await searchParams;

  return (
    // Container
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans w-full">
      {/* Title */}
      <Title />

      {/* TODO: Status Bar (Timer & Mistakes Counter) */}
      {/* <StatsBar /> */}

      {/* Board Card + Numbers Pad */}
      <BoardCard uuid={id || undefined} />

      {/* Controls (New Game & TODO: Hint) */}
      <Controls />
    </div>
  );
}
