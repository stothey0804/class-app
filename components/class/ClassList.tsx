"use client";

export function ClassList({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <ul className="flex flex-col gap-2 ">{children}</ul>
    </section>
  );
}
