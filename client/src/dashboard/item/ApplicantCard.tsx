import { memo, MouseEvent, useCallback, useMemo, useState } from "react";
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
import { useDraggable } from "@dnd-kit/core";
import {
  ApplicantCardType,
  ApplicantDataType,
} from "./types/ApplicantCardType";
import CardHeaderMenu from "./CardHeaderMenu";
import dayjs from "../../lib/dayjsSetup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeData } from "../../apis/api";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 8px;
  }
`);

function ApplicantCard({
  itemData: { id, name, way, date, isEvaluation, step },
}: ApplicantCardType) {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const mutateChangeEvaluation = useMutation({
    mutationKey: ["changeEvaluation"],
    mutationFn: changeData,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["applicant-list"] });
      setAnchorEl(null);
    },
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: open,
  });

  const style = useMemo(
    () =>
      transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            opacity: 0,
          }
        : undefined,
    [transform]
  );

  const handleClick = useCallback(() => {
    !open &&
      window.open(
        `https://interxlab.career.greetinghr.com/ko/interxlab`,
        "_blank"
      );
  }, [open]);

  const chipStyle = useMemo(
    () =>
      way === "recommendation"
        ? {
            color: "error" as const,
            label: "추천등록",
            sx: {
              borderRadius: "5px",
              height: "14px",
              fontSize: "10px",
              color: "white",
              paddingTop: 0,
            },
          }
        : {
            color: "info" as const,
            label: "직접등록",
            sx: {
              borderRadius: "5px",
              height: "14px",
              fontSize: "10px",
              color: "InfoText",
              paddingTop: 0,
            },
          },
    [way]
  );

  const statusText = isEvaluation ? "평가완료" : "평가중";
  const statusColor = isEvaluation ? "success" : "warning";

  const handleMutate = useCallback(
    (overrides: Partial<ApplicantDataType>) => {
      mutateChangeEvaluation.mutate({
        id,
        name,
        way,
        date,
        step,
        isEvaluation,
        ...overrides,
      });
    },
    [id, name, way, date, step, isEvaluation, mutateChangeEvaluation]
  );

  const handleChangeEvaluation = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      handleMutate({
        isEvaluation: true,
      });
    },
    [handleMutate]
  );

  const handlePassed = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      handleMutate({
        step: "passed",
        isEvaluation: true,
      });
    },
    [handleMutate]
  );

  return (
    <Card
      sx={{ marginY: 1, cursor: "grab", minHeight: 124, ...style }}
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
              disabledEvaluation={isEvaluation}
              disabledPassed={step === "passed"}
              handleChangeEvaluation={handleChangeEvaluation}
              handlePassed={handlePassed}
            />
          }
          sx={{ paddingX: 1.5, paddingY: 1 }}
        />
        <CardContentNoPadding sx={{ textAlign: "left", px: 1.5, pb: 1 }}>
          <Chip {...chipStyle} />
          <Stack direction={"row"} sx={{ my: "8px" }}>
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
              title={date}
            >
              {dayjs(date).fromNow()}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography fontSize={"12px"} lineHeight={"12px"} color={statusColor}>
            {statusText}
          </Typography>
        </CardContentNoPadding>
      </div>
    </Card>
  );
}

export default memo(ApplicantCard);
