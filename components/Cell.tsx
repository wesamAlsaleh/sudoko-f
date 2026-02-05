import React from "react";

export default function Cell({ number }: { number: string }) {
  return (
    <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center text-zinc-800 font-medium">
      {number === "0" ? "" : number}
    </div>
  );
}
