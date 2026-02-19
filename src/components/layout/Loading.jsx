import { Spinner } from "../ui/spinner";

export const Loading = ({ message }) => {
  return (
    <div className="mx-auto flex flex-col items-center gap-1 text-main-theme">
      <Spinner className="size-12" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
