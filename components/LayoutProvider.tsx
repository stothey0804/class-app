"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** Layout 렌더링 시 필요한 Provider
 *  - QueryClientProvider
 */
export function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 각 요청마다 새로운 QueryClient 인스턴스를 생성
  // useState를 사용하여 컴포넌트 생명주기 동안 동일한 인스턴스 유지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
