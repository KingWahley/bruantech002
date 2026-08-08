"use client";

import React, { useEffect, useState } from "react";
import { Agentation } from "agentation";

export default function AgentationProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Agentation
      endpoint="http://localhost:4747"
      onSessionCreated={(sessionId) => {
        console.log("[Agentation] Session started:", sessionId);
      }}
    />
  );
}
