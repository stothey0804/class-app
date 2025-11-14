"use client";

import { Suspense } from "react";

import { ClassPageSkeleton, ClassPageContent } from "@/components/class";

/**
 * 강의 목록 페이지
 */
export function ClassPage() {
  return (
    <main>
      <Suspense fallback={<ClassPageSkeleton count={10} />}>
        <ClassPageContent />
      </Suspense>
    </main>
  );
}
