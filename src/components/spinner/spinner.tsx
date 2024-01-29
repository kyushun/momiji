import clsx from "clsx";

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx("animate-spin text-gray-400", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

type CenteredSpinnerProps = SpinnerProps & {
  wrapperClassName?: string;
};

export const CenteredSpinner = ({
  className,
  wrapperClassName,
}: CenteredSpinnerProps) => (
  <div
    className={clsx(
      "grid size-full place-content-center text-gray-400",
      wrapperClassName
    )}
  >
    <Spinner className={className} />
  </div>
);
