"use client";

import { ReactNode } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface AlertMessageProps {
  children: ReactNode;
  variant?: "default" | "destructive";
  icon?: ReactNode;
}

/**
 * Alert 메시지 컴포넌트
 * - 사용자에게 중요한 정보를 표시
 */
export function AlertMessage({
  children,
  variant = "destructive",
  icon = <AlertCircleIcon />,
}: AlertMessageProps) {
  return (
    <Alert variant={variant}>
      {icon}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
