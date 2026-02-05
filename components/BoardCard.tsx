import React from "react";
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

export default function BoardCard() {
  // puzzle string
  const cellNumbers =
    "012000709005709020080000300104257600007498510500010204803901000050000030970500060";

  return (
    // Card container
    <div className="flex justify-center items-center h-96">
      <Card className="w-[50%] h-full">
        <Grid puzzleString={cellNumbers} />
      </Card>
    </div>
  );
}
