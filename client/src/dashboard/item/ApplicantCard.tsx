import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ApplicantCardType } from "./types/ApplicantCardType";
import { useDraggable } from "@dnd-kit/core";
import CardHeaderMenu from "./CardHeaderMenu";
import { useCallback, useState } from "react";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 8px;
  }
`);

export default function ApplicantCard({
  itemData: { id, name, way, date, isEvaluation },
}: ApplicantCardType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: open,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: 0,
      }
    : undefined;

  const handleClick = useCallback(() => {
    !open &&
      window.open(
        `https://interxlab.career.greetinghr.com/ko/interxlab`,
        "_blank"
      );
  }, [open]);

  return (
    <Card
      sx={{ marginY: 1, cursor: "grab", ...style }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div onClick={handleClick}>
        <CardHeader
          title={name}
          slotProps={{
            title: { fontSize: 12, fontWeight: 500, textAlign: "left" },
          }}
          action={
            <CardHeaderMenu
              id={id}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              open={open}
            />
          }
          sx={{ paddingX: 1.5, paddingY: 1 }}
        />
        <CardContentNoPadding
          sx={{ textAlign: "left", paddingX: 1.5, paddingBottom: 1 }}
        >
          <Chip
            color={way === "recommendation" ? "error" : "info"}
            label={way === "recommendation" ? "추천등록" : "직접등록"}
            variant="filled"
            sx={{
              borderRadius: "5px",
              height: "14px",
              fontSize: "10px",
              color: way === "recommendation" ? "white" : "InfoText",
              paddingTop: 0,
            }}
          />
          <Stack direction={"row"} sx={{ marginY: "8px" }}>
            <AccessTimeIcon
              sx={{
                fontSize: "10px",
                lineHeight: "10px",
                paddingRight: "2px",
                color: "#00000061",
              }}
            />
            <Typography
              fontSize={"10px"}
              lineHeight={"10px"}
              color="textDisabled"
            >
              {date}
            </Typography>
          </Stack>
          <Divider sx={{ marginY: 1 }} />
          <Typography
            fontSize={"12px"}
            lineHeight={"12px"}
            color={isEvaluation ? "success" : "warning"}
          >
            {isEvaluation ? "평가완료" : "평가중"}
          </Typography>
        </CardContentNoPadding>
      </div>
    </Card>
  );
}
