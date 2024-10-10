"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LanguageSelector({
  currentLanguage,
  availableLanguages,
}: {
  currentLanguage: string;
  availableLanguages: { [key: string]: string };
}) {
  const router = useRouter();
  const handleSelection = (selected: string) => {
    router.push(`/${selected}`);
  };
  return (
    <Select
      size="sm"
      selectedKeys={[currentLanguage]}
      onSelectionChange={(keys) =>
        handleSelection(Array.from(keys)[0] as string)
      }
    >
      {Object.entries(availableLanguages).map(([key, label]) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
}
