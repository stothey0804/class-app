import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ClassPageSkeletonProps {
  count?: number;
}

/**
 * 강의 페이지 스켈레톤 UI
 */
export function ClassPageSkeleton({ count = 5 }: ClassPageSkeletonProps) {
  return (
    <Card className="p-4">
      {/* 필터 영역 */}
      <div className="flex w-full mb-4">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* 강의 목록 */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <ClassItemSkeleton key={`skeleton-${index}`} />
        ))}
      </div>

      {/* 총합 영역 */}
      <div className="mt-4 flex justify-between items-center">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>

      {/* 버튼 영역 */}
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </Card>
  );
}

/**
 * 개별 강의 항목 스켈레톤
 */
function ClassItemSkeleton() {
  return (
    <div className="flex items-start gap-2 rounded-lg border p-3">
      {/* 체크박스 */}
      <Skeleton className="h-4 w-4 rounded flex-shrink-0 mt-1" />
      {/* 강의 정보 */}
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between gap-4">
          {/* 강의 제목 */}
          <Skeleton className="h-5 w-2/3" />
          {/* 가격 */}
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex justify-between items-center">
          {/* 강사명 */}
          <Skeleton className="h-4 w-24" />
          {/* 신청자/정원 */}
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
