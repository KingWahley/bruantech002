"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function LayoutShell({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardOrLogin = pathname.startsWith("/dashboard") || pathname.startsWith("/login");

  if (isDashboardOrLogin) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      {children}
      {footer}
    </>
  );
}
