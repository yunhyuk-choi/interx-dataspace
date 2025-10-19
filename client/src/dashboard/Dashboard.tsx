import { Grid } from "@mui/material";
import DashboardTable from "./table/DashboardTable";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ApplicantCard from "./item/ApplicantCard";
import useDashboard from "./hook/useDashboard";
import { DataType } from "./table/types/DashboardTableType";
import { useMemo } from "react";

const STEPSWITHTITLE: { id: DataType; title: string }[] = [
  { id: "support", title: "✏️ 지원(서류 전형)" },
  { id: "screen-call", title: "📞 TA 스크린 콜" },
  { id: "first-interview", title: "🥇 1차 인터뷰 (실무)" },
  { id: "coding-test", title: "💻 코딩테스트" },
  { id: "second-interview", title: "🥈 2차 인터뷰 (임원)" },
  { id: "salary-negotiation", title: "🥉 처우 협의" },
  { id: "passed", title: "🏆 입사 확정" },
];

export default function Dashboard() {
  const { data, activeItem, handleDragEnd, handleDragStart } = useDashboard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 80,
        tolerance: 20,
      },
    })
  );

  const steps = useMemo(
    () =>
      STEPSWITHTITLE.map((step) => (
        <DashboardTable
          key={step.id}
          title={step.title}
          dataType={step.id}
          applicantList={data?.[step.id]}
        />
      )),
    [data]
  );

  const flatApplicants = useMemo(
    () => (data ? Object.values(data).flat() : []),
    [data]
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{
        WebkitUserSelect: "none",
        userSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        maxWidth: "1600px",
        minWidth: "1200px",
        overflowX: "auto",
        marginX: "auto",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {steps}
        <DragOverlay dropAnimation={null}>
          {activeItem && data ? (
            <ApplicantCard
              itemData={flatApplicants.find((i) => i.id === activeItem)!}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Grid>
  );
}
