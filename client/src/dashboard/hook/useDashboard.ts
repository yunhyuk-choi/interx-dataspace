import { useMutation, useQuery } from "@tanstack/react-query";
import { changeData, getApplicantData } from "../../apis/api";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { DataType } from "../table/types/DashboardTableType";
import { debounce } from "lodash";
import { useDashboardStore } from "../store/dashboardStore";
import { SelectChangeEvent } from "@mui/material";

export const STEPS: DataType[] = [
  "support",
  "screen-call",
  "first-interview",
  "coding-test",
  "second-interview",
  "salary-negotiation",
  "passed",
];

export default function useDashboard() {
  const {
    searchInput,
    searchOption,
    activeItem,
    sortOption,
    sortOrientation,
    setSearchInput,
    setSearchOption,
    setSortOption,
    toggleSortOrientation,
    setActiveItem,
  } = useDashboardStore();

  const [debouncedSearchText, setDebouncedSearchText] = useState<
    string | undefined
  >(searchInput);

  const { data, refetch } = useQuery({
    queryKey: [
      "applicant-list",
      debouncedSearchText,
      sortOption,
      sortOrientation,
    ],
    queryFn: () =>
      getApplicantData(
        debouncedSearchText
          ? {
              searchText: debouncedSearchText,
              searchOption,
              sortOption,
              sortOrientation,
            }
          : {
              sortOption,
              sortOrientation,
            }
      ),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchText(searchInput), 500);
    handler();
    return () => handler.cancel();
  }, [searchInput]);

  const mutateChangeStep = useMutation({
    mutationFn: changeData,
    mutationKey: ["changeStep"],
    onSuccess: () => {
      setActiveItem(null);
      refetch();
    },
  });

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      setActiveItem(Number(active.id));
    },
    [setActiveItem]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) {
        setActiveItem(null);
        return;
      }

      if (active.id !== over.id && data) {
        const sourceKey: DataType | undefined = Object.keys(data).find((key) =>
          data[key as DataType].some((item) => item.id === active.id)
        ) as DataType;
        const targetKey = STEPS.includes(over.id as DataType)
          ? (over.id as DataType)
          : null;

        if (!sourceKey || !targetKey) return;

        const activeItemData = data[sourceKey].find(
          (i) => i.id === Number(active.id)
        );
        activeItemData &&
          mutateChangeStep.mutate({ ...activeItemData, step: targetKey });
        return;
      }
      return;
    },
    [setActiveItem, data, mutateChangeStep]
  );

  const handleChangeSearchInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.currentTarget.value);
    },
    [setSearchInput]
  );

  const handleChangeSearchOption = useCallback(
    (e: SelectChangeEvent) => {
      setSearchOption(e.target.value);
    },
    [setSearchOption]
  );

  const handleChangeSortOption = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSortOption(e.currentTarget.value);
      console.log("handler", e.currentTarget.value);
    },
    [setSortOption]
  );

  const handleChangeSortOrientation = useCallback(() => {
    toggleSortOrientation();
  }, [toggleSortOrientation]);

  return {
    data,
    activeItem,
    searchInput,
    searchOption,
    sortOption,
    sortOrientation,
    handleChangeSearchInput,
    handleChangeSearchOption,
    handleChangeSortOption,
    handleChangeSortOrientation,
    handleDragStart,
    handleDragEnd,
  };
}
