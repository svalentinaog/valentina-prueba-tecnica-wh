type Align = "center" | "left";
type Size = "sm" | "md" | "lg";

interface HeadingProps {
  highlight?: string;
  title: string;
  align?: Align;
  size?: Size;
  className?: string;
}

const sizeClasses = (size: Size) => {
  if (size === "sm") return "text-lg md:text-xl";
  if (size === "lg") return "text-2xl md:text-3xl";
  return "text-xl md:text-2xl";
};

export const Heading = ({
  highlight,
  title,
  align = "center",
  size = "md",
  className,
}: HeadingProps) => {
  const wrapper =
    align === "center"
      ? "flex flex-col items-center gap-3"
      : "flex flex-col items-start gap-3";

  return (
    <div className={`${wrapper} ${className ?? ""}`}>
      {highlight ? (
        <div className="rounded-full px-4 py-1 bg-gray-200">
          <span className="text-xs font-semibold tracking-wide text-gray-700">
            {highlight}
          </span>
        </div>
      ) : null}
      <div className="rounded-full px-6 py-2 bg-gray-200">
        <h2 className={`${sizeClasses(size)} font-bold text-gray-900`}>
          {title}
        </h2>
      </div>
    </div>
  );
};
