import Board from "@/components/Board";
import BoardCard from "@/components/BoardCard";
import Controls from "@/components/Controls";
import NumbersPad from "@/components/NumbersPad";
import StatsBar from "@/components/StatsBar";
import Title from "@/components/Title";

export default function Home() {
  return (
    // Container
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Title */}
      <Title />

      {/* TODO: Status Bar */}
      <StatsBar />

      {/* TODO: Board Card */}
      <BoardCard />

      {/* TODO: Controls */}
      <Controls />

      {/* TODO: Numbers pad */}
      <NumbersPad />
    </div>
  );
}
