import React from "react";

interface TypographyH2Props {
  children: React.ReactNode;
}

export function TypographyH2({ children }: TypographyH2Props) {
  return (
    <h2 className="bg-linear-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
