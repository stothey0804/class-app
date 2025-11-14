"use client";

import { Spinner } from "@/components/ui/spinner";

interface InfiniteScrollTriggerProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
}

/**
 * 무한 스크롤 트리거 컴포넌트
 * - 뷰포트에 진입 시 다음 페이지를 로드
 */
export function InfiniteScrollTrigger({
  targetRef,
  hasNextPage,
}: InfiniteScrollTriggerProps) {
  return (
    <div ref={targetRef} className="h-1 flex items-center justify-center">
      {hasNextPage && <Spinner />}
    </div>
  );
}
