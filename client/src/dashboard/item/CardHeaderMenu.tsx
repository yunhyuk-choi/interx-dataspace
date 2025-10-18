import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Dispatch, memo, MouseEvent, SetStateAction, useCallback } from "react";
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
}

function CardHeaderMenu({
  id,
  anchorEl,
  setAnchorEl,
  open,
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LockOutlineIcon />
          </ListItemIcon>
          <ListItemText>지원자 비공개</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FolderZipIcon />
          </ListItemIcon>
          <ListItemText>모든 지원 서류 다운로드</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <ListItemText>지원자 정보 다운로드</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>메일 쓰기</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PhoneAndroidIcon />
          </ListItemIcon>
          <ListItemText>문자 보내기</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HowToRegIcon />
          </ListItemIcon>
          <ListItemText>평가 배정</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SportsScoreIcon />
          </ListItemIcon>
          <ListItemText>최종 합격</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
          <ListItemIcon>
            <DoDisturbAltIcon />
          </ListItemIcon>
          <ListItemText>불합격 처리</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default memo(
  CardHeaderMenu,
  (prevProps, nextProps) => prevProps.open === nextProps.open
);
