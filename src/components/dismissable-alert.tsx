"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function DismissableAlert({
  message,
  color = "primary",
}: {
  message: string;
  color?: string;
}) {
  const [displayError, setDisplayError] = useState(true);
  return (
    displayError && (
      <div
        className={`w-full flex items-center rounded-md border border-${color} bg-${color}/30 p-2 gap-4`}
      >
        <p className={`grow text-sm text-${color}`}>{message}</p>
        <Icon
          onClick={() => setDisplayError(false)}
          className="self-start hover:cursor-pointer"
          icon="tabler:x"
        />
      </div>
    )
  );
}
