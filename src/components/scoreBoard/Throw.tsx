type ThrowProps = {
  pins: string | null;
};

const Throw = (props: ThrowProps) => {
  if (props.pins === undefined) return null;
  return (
    <div className="w-1/3 py-4 flex items-center justify-center">
      <p className="text-white text-3xl">{props.pins}</p>
    </div>
  );
};

export default Throw;
