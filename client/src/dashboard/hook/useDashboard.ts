import { useMutation, useQuery } from "@tanstack/react-query";
import { changeStep, getApplicantData } from "../../apis/api";
import { useCallback, useMemo, useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { DataType } from "../table/types/DashboardTableType";

export const STEPS: DataType[] = [
  "support",
  "screen-call",
  "first-interview",
  "coding-test",
  "second-interview",
  "salary-negotiation",
  "passed",
];

export default function useDashboard() {
  const { data, refetch } = useQuery({
    queryKey: ["applicant-list"],
    queryFn: getApplicantData,
  });

  const mutateChangeStep = useMutation({
    mutationFn: changeStep,
    mutationKey: ["changeStep"],
    onSuccess: () => {
      setActiveItem(null);
      refetch();
    },
  });

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(Number(active.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) {
        setActiveItem(null);
        return;
      }

      if (active.id !== over.id && data) {
        const sourceKey: DataType | undefined = Object.keys(data).find((key) =>
          data[key as DataType].some((item) => item.id === active.id)
        ) as DataType;
        const targetKey = STEPS.includes(over.id as DataType)
          ? (over.id as DataType)
          : null;

        if (!sourceKey || !targetKey) return;

        const activeItemData = data[sourceKey].find(
          (i) => i.id === Number(active.id)
        );
        activeItemData &&
          mutateChangeStep.mutate({ ...activeItemData, step: targetKey });
        return;
      }
      return;
    },
    [setActiveItem, data, mutateChangeStep]
  );

  return { data, activeItem, handleDragStart, handleDragEnd };
}
