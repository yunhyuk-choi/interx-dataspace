import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { DashboardTableType } from "./types/DashboardTableType";
import DashboardTableActions from "./DashboardTableActions";
import ApplicantCard from "../item/ApplicantCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo, useMemo } from "react";
import EmptyList from "../item/EmptyList";

function DashboardTable({
  title,
  dataType,
  applicantList,
}: DashboardTableType) {
  const { setNodeRef } = useDroppable({ id: dataType });

  const items = useMemo(
    () =>
      applicantList?.map((item) => (
        <ApplicantCard key={item.id} itemData={item} />
      )) ?? <EmptyList />,
    [applicantList]
  );

  return (
    <Grid size={"grow"} ref={setNodeRef} sx={{ marginX: "auto" }}>
      <Card
        sx={{
          height: "calc( 100dvh - 172px )",
          backgroundColor: grey[300],
          paddingY: "4px",
          paddingX: 0,
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            py: 1,
            gap: 1,
            backgroundColor: grey[300],
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "left",
              px: 1,
              flex: 1,
              minWidth: 0,
            }}
            title={title}
          >
            {title}
          </Typography>
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <DashboardTableActions />
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            height: "calc( 100% - 60px )",
            overflowY: "auto",
            overflowX: "hidden",
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
            {items}
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
