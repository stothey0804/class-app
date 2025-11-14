"use client";

/** 강의 목록 컴포넌트
 * - ul
 */
export function ClassList({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <ul className="flex flex-col gap-2 ">{children}</ul>
    </section>
  );
}
