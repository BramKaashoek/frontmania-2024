"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface DelayedRenderProps {
  children: React.ReactNode;
  delay?: number;
}

export const DelayedRender: React.FC<DelayedRenderProps> = ({
  children,
  delay = 4000,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};
