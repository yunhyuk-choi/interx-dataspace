import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import useDashboard from "../hook/useDashboard";
import useAddDialog from "../hook/useAddDialog";
import { useMemo } from "react";

export default function SortApplicantDialog() {
  const { sortOption, handleChangeSortOption } = useDashboard();
  const { open, handleClickOpen, handleClose } = useAddDialog();

  const sortOptionTitle = useMemo(() => {
    switch (sortOption) {
      case "date":
        return "정렬: 지원일자순";
      case "name":
        return "정렬: 이름순";
      case "id":
        return "정렬: 등록순";
    }
  }, [sortOption]);

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        color="primary"
        title={sortOptionTitle}
      >
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>정렬</DialogTitle>
        <DialogContent>
          <DialogContentText>정렬 기준 속성을 선택하세요.</DialogContentText>
          <FormControl id="sort-option">
            <RadioGroup
              defaultValue={sortOption}
              onChange={handleChangeSortOption}
              id="sortOption"
            >
              <FormControlLabel
                value="date"
                control={<Radio />}
                label="지원일자순"
              />
              <FormControlLabel
                value="name"
                control={<Radio />}
                label="이름순"
              />
              <FormControlLabel value="id" control={<Radio />} label="등록순" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
