import React from "react";
import { Button } from "@/components/ui/button";

export default function NumbersPad({
  onNumberClick,
  onClear,
}: {
  onNumberClick: (number: number) => void;
  onClear: () => void;
}) {
  return (
    <div className="grid grid-cols-10 gap-1">
      {/* numbers buttons */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numberToInput) => {
        return (
          <Button
            variant="outline"
            size="lg"
            className=""
            onClick={() => onNumberClick(numberToInput)}
          >
            <span className="text-lg">{numberToInput}</span>
          </Button>
        );
      })}

      {/* erase button */}
      <Button
        variant="secondary"
        size="lg"
        className=""
        onClick={() => onClear()}
      >
        E
      </Button>
    </div>
  );
}
