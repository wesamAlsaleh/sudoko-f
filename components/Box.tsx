import React from "react";

interface BoxProps {
  children: React.ReactNode;
}

export default function Box({ children }: BoxProps) {
  return <div className="grid grid-cols-3 bg-green-50 w-40">{children}</div>;
}
