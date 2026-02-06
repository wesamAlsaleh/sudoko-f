import Board from "@/components/Grid";
import BoardCard from "@/components/BoardCard";
import Controls from "@/components/Controls";
import NumbersPad from "@/components/NumbersPad";
import StatsBar from "@/components/StatsBar";
import Title from "@/components/Title";

export default function Home() {
  return (
    // Container
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans w-full">
      {/* Title */}
      <Title />

      {/* TODO: Status Bar (Timer & Mistakes Counter) */}
      <StatsBar />

      {/* Board Card & Numbers Pad */}
      <BoardCard />

      {/* TODO: Controls (New Game & Submit) */}
      <Controls />
    </div>
  );
}
