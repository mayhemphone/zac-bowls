"use client";

import { getLatestGame } from "@/db/queries";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Frame from "./Frame";

export type ScoreBoardProps = {
  game: Awaited<ReturnType<typeof getLatestGame>>;
};

const ScoreBoard = ({ game }: ScoreBoardProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      setShow(true);
    }
  }, []);

  if (game?.frames.length === 0)
    return (
      <div className="border p-4">
        No frames, we should find a better game - or dont let this happen, dude
      </div>
    );

  return (
    <div
      className={cn(
        "flex overflow-x-auto pb-4",
        // we are hding it until the container is scrolled to the end
        show ? "visible" : "invisible"
      )}
      ref={scrollContainerRef}
    >
      {game?.frames?.map((frame) => (
        <Frame key={frame.id} frame={frame} />
      ))}
    </div>
  );
};

export default ScoreBoard;
