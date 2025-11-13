import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  threshold?: number;
}

/**
 * Intersection Observer hook - 무한 스크롤
 */
export const useIntersectionObserver = ({
  fetchNextPage,
  hasNextPage = true,
  threshold = 0.1,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }

    const target = targetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { threshold }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasNextPage, fetchNextPage, threshold]);

  return { targetRef };
};
