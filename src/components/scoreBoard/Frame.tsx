import { ScoreBoardProps } from "./ScoreBoard";
import Throw from "./Throw";

type FrameProps = {
  frame: NonNullable<ScoreBoardProps["game"]>["frames"][number];
};

const Frame = ({ frame }: FrameProps) => {
  return (
    <div id="outer" style={{ scrollSnapAlign: "end" }}>
      <div className="w-full">
        <p className="text-center">{frame.frameNumber}</p>
      </div>

      <div className="border  min-w-[160px] flex flex-col">
        <div className="flex justify-end">
          {frame?.throws?.map((t) => (
            <Throw key={t.id} pins={t.pins} />
          ))}
        </div>
        <div className="flex items-center justify-center flex-1">
          <p className="text-white text-6xl pb-4">
            ???
            {
              //score needs to be calculated.  I probably should have just injested it lol
            }
          </p>
        </div>
      </div>
    </div>
  );
};
export default Frame;
