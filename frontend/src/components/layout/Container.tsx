import type { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={`w-full py-8 px-8 ${className ?? ""}`}>
      <div className={`mx-auto max-w-7xl w-full ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
