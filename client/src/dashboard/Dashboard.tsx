import { Grid } from "@mui/material";
import DashboardTable from "./table/DashboardTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changeStep, getApplicantData } from "../apis/api";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import ApplicantCard from "./item/ApplicantCard";
import { DataType } from "./table/types/DashboardTableType";

export const STEPS: DataType[] = [
  "support",
  "screen-call",
  "first-interview",
  "coding-test",
  "second-interview",
  "salary-negotiation",
  "passed",
];

export default function Dashboard() {
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 80,
        tolerance: 20,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(Number(active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
  };
  console.log(data);
  return (
    <Grid container spacing={2}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DashboardTable
          title="✏️ 지원(서류 전형)"
          dataType="support"
          applicantList={data?.support}
        />
        <DashboardTable
          title="📞 TA 스크린 콜"
          dataType="screen-call"
          applicantList={data?.["screen-call"]}
        />
        <DashboardTable
          title="🥇 1차 인터뷰 (실무)"
          dataType="first-interview"
          applicantList={data?.["first-interview"]}
        />
        <DashboardTable
          title="💻 코딩테스트"
          dataType="coding-test"
          applicantList={data?.["coding-test"]}
        />
        <DashboardTable
          title="🥈 2차 인터뷰 (임원)"
          dataType="second-interview"
          applicantList={data?.["second-interview"]}
        />
        <DashboardTable
          title="🥉 처우 협의"
          dataType="salary-negotiation"
          applicantList={data?.["salary-negotiation"]}
        />
        <DashboardTable
          title="🏆 입사 확정"
          dataType="passed"
          applicantList={data?.passed}
        />
        <DragOverlay dropAnimation={null}>
          {activeItem && data ? (
            <ApplicantCard
              itemData={
                Object.values(data)
                  .flat()
                  .find((i) => i.id === activeItem)!
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Grid>
  );
}
