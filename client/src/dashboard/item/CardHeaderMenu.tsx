import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Dispatch,
  memo,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData } from "../../apis/api";

interface CardHeaderMenuProps {
  id: number;
  anchorEl: null | HTMLElement;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  open: boolean;
  disabledEvaluation: boolean;
  disabledPassed: boolean;
  handleChangeEvaluation: MouseEventHandler;
  handlePassed: MouseEventHandler;
}

type DividerItem = { type: "divider" };

type MenuActionItem = {
  type?: "item";
  icon: ReactNode;
  label: string;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  sx?: object;
  disabled?: boolean;
};

type MenuItemType = DividerItem | MenuActionItem;

const isDivider = (item: MenuItemType): item is DividerItem =>
  item.type === "divider";

function CardHeaderMenu({
  id,
  anchorEl,
  setAnchorEl,
  open,
  disabledEvaluation,
  disabledPassed,
  handleChangeEvaluation,
  handlePassed,
}: CardHeaderMenuProps) {
  const queryClient = useQueryClient();

  const mutateDelete = useMutation({
    mutationKey: ["deleteData"],
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["applicant-list"] });
      setAnchorEl(null);
    },
  });

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      setAnchorEl(null);
    },
    [setAnchorEl]
  );

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();
      mutateDelete.mutate(id);
    },
    [mutateDelete, id]
  );

  const menuItems: MenuItemType[] = useMemo(
    () => [
      { icon: <LockOutlineIcon />, label: "지원자 비공개" },
      { type: "divider" },
      { icon: <FolderZipIcon />, label: "모든 지원 서류 다운로드" },
      { icon: <PictureAsPdfIcon />, label: "지원자 정보 다운로드" },
      { icon: <EmailIcon />, label: "메일 쓰기" },
      { icon: <PhoneAndroidIcon />, label: "문자 보내기" },
      {
        icon: <HowToRegIcon />,
        label: "평가 배정",
        disabled: disabledEvaluation,
        onClick: handleChangeEvaluation,
      },
      { type: "divider" },
      {
        icon: <SportsScoreIcon />,
        label: "최종 합격",
        disabled: disabledPassed,
        onClick: handlePassed,
      },
      { type: "divider" },
      {
        icon: <DoDisturbAltIcon />,
        label: "불합격 처리",
        onClick: handleDelete,
        sx: { color: "red", disable: true },
      },
    ],
    [
      handleDelete,
      disabledEvaluation,
      disabledPassed,
      handleChangeEvaluation,
      handlePassed,
    ]
  );

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ color: "grey" }}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={String(id)}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": String(id),
          },
        }}
      >
        {menuItems.map((item, index) =>
          isDivider(item) ? (
            <Divider key={`divider-${index}`} />
          ) : (
            <MenuItem
              key={item.label}
              onClick={item.onClick ?? handleClose}
              sx={item.sx}
              disabled={item.disabled}
            >
              <ListItemIcon sx={item.sx}>{item.icon}</ListItemIcon>
              <ListItemText sx={item.sx}>{item.label}</ListItemText>
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
}

export default memo(CardHeaderMenu);
