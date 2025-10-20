import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertSharpIcon from "@mui/icons-material/SwapVertSharp";
import AddApplicantDialog from "../dashboard/dialog/AddApplicantDialog";
import useDashboard from "../dashboard/hook/useDashboard";
import SortApplicantDialog from "../dashboard/dialog/SortApplicantDialog";
import { memo, useMemo } from "react";

function SearchBar() {
  const {
    searchInput,
    searchOption,
    sortOrientation,
    handleChangeSearchInput,
    handleChangeSearchOption,
    handleChangeSortOrientation,
  } = useDashboard();

  const SearchInput = useMemo(
    () =>
      searchOption === "name" ? (
        <OutlinedInput
          size="small"
          placeholder="이름을 입력하세요"
          value={searchInput}
          onChange={handleChangeSearchInput}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ width: 200 }}
        />
      ) : (
        <FormControl>
          <RadioGroup
            row
            defaultValue={"all"}
            onChange={handleChangeSearchInput}
          >
            <FormControlLabel value="all" control={<Radio />} label="전체" />
            <FormControlLabel
              value="self"
              control={<Radio />}
              label="직접 등록"
            />
            <FormControlLabel
              value="recommendation"
              control={<Radio />}
              label="추천 등록"
            />
          </RadioGroup>
        </FormControl>
      ),
    [searchOption, searchInput, handleChangeSearchInput]
  );

  return (
    <Stack direction={"row"} spacing={2} sx={{ marginY: 1 }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id={"search-selector-label"}>검색 유형</InputLabel>
        <Select
          labelId="search-selector-label"
          size="small"
          label="검색 유형"
          value={searchOption}
          onChange={handleChangeSearchOption}
        >
          <MenuItem value={"name"}>평가 대상</MenuItem>
          <MenuItem value={"way"}>등록 유형</MenuItem>
        </Select>
      </FormControl>
      {SearchInput}
      <Stack
        direction={"row"}
        sx={{ marginY: 1, alignItems: "center" }}
        spacing={1}
      >
        <AddApplicantDialog />
        <SortApplicantDialog />
        <IconButton
          onClick={handleChangeSortOrientation}
          color="primary"
          title={sortOrientation === "asc" ? "오름차순" : "내림차순"}
        >
          <SwapVertSharpIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default memo(SearchBar);
