import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DashboardTableType } from "./types/DashboardTableType";
import DashboardTableActions from "./DashboardTableActions";
import ApplicantCard from "../item/ApplicantCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo } from "react";
import EmptyList from "../item/EmptyList";

function DashboardTable({
  title,
  dataType,
  applicantList,
}: DashboardTableType) {
  const { setNodeRef } = useDroppable({ id: dataType });
  return (
    <Grid
      size={"grow"}
      ref={setNodeRef}
      sx={{ minWidth: 200, marginX: "auto" }}
    >
      <Card
        sx={{
          height: "calc( 100dvh - 172px )",
          backgroundColor: grey[300],
          paddingY: "4px",
          paddingX: 0,
          marginBottom: 1,
        }}
      >
        <CardHeader
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            paddingX: "16px",
            paddingY: "8px",
          }}
          title={title}
          slotProps={{
            title: { fontSize: 12, fontWeight: 500, textAlign: "left" },
          }}
          action={<DashboardTableActions />}
        />
        <Divider />
        <CardContent
          sx={{
            height: "calc( 100% - 60px )",
            overflowY: "auto",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SortableContext
            id={dataType}
            items={applicantList?.map((item) => item.id) || []}
            strategy={verticalListSortingStrategy}
          >
            {applicantList ? (
              applicantList.map((item) => (
                <ApplicantCard key={item.id} itemData={item} />
              ))
            ) : (
              <EmptyList />
            )}
          </SortableContext>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default memo(
  DashboardTable,
  (prevProps, nextProps) =>
    (prevProps.applicantList?.length === nextProps.applicantList?.length &&
      prevProps.applicantList?.every(
        (item, i) => item === nextProps.applicantList?.at(i)
      )) ??
    false
);
