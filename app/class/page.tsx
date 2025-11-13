"use client";

import { Card } from "@/components/ui/card";
import {
  ClassFilter,
  ClassList,
  ClassItem,
  Buttons,
} from "../components/class";
import { useGetInfiniteClassData } from "@/lib/queries";
import { useIntersectionObserver } from "@/lib/hooks";
import { Spinner } from "@/components/ui/spinner";

/**
 * /class - 강의 목록 컴포넌트
 */
export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteClassData(10);

  /** 무한 스크롤 타겟 ref */
  const { targetRef } = useIntersectionObserver({
    fetchNextPage: () => fetchNextPage(),
    hasNextPage,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const dataList = data?.pages.flatMap((page) => page.data) || [];

  return (
    <main>
      <Card className="p-4">
        <ClassFilter />
        <ClassList>
          {dataList.length > 0 &&
            dataList.map((classData) => (
              <ClassItem key={`class-item-${classData.id}`} data={classData} />
            ))}
        </ClassList>
        {/* 무한 스크롤 트리거 */}
        <div ref={targetRef} className="h-10 flex items-center justify-center">
          {isFetchingNextPage && <Spinner />}
        </div>
        <Buttons />
      </Card>
    </main>
  );
}
