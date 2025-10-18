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

function DashboardTable({
  title,
  dataType,
  applicantList,
}: DashboardTableType) {
  const { setNodeRef } = useDroppable({ id: dataType });
  return (
    <Grid size={"grow"} ref={setNodeRef}>
      <Card
        sx={{ height: "100dvh", backgroundColor: grey[300], padding: "4px" }}
      >
        <CardHeader
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            paddingX: "4px",
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
            height: "calc( 100dvh - 100px )",
            overflowY: "auto",
            padding: "4px",
          }}
        >
          <SortableContext
            id={dataType}
            items={applicantList?.map((item) => item.id) || []}
            strategy={verticalListSortingStrategy}
          >
            {applicantList &&
              applicantList.map((item) => (
                <ApplicantCard key={item.id} itemData={item} />
              ))}
          </SortableContext>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default memo(DashboardTable);
