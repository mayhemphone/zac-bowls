import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  str: string;
};

const PopUpPre = ({ str }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>View</PopoverTrigger>
      <PopoverContent className="md:w-[500px] sm:w-[300px] p-0">
        <pre className="max-h-[500px] overflow-auto p-4 pr-0">{str}</pre>
      </PopoverContent>
    </Popover>
  );
};

export default PopUpPre;
