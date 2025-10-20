import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ApplicantListResponseType,
  changeStep,
  getApplicantData,
} from "../../apis/api";
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
    setSearchInput,
    setSearchOption,
    setActiveItem,
  } = useDashboardStore();

  const [debouncedSearchText, setDebouncedSearchText] = useState<
    string | undefined
  >(searchInput);

  const { data: responseData, refetch } = useQuery({
    queryKey: ["applicant-list", debouncedSearchText],
    queryFn: () =>
      getApplicantData(
        debouncedSearchText
          ? { searchText: debouncedSearchText, searchOption: searchOption }
          : undefined
      ),
  });

  const [data, setData] = useState<ApplicantListResponseType | undefined>(
    responseData
  );

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchText(searchInput), 500);
    handler();
    return () => handler.cancel();
  }, [searchInput]);

  useEffect(() => {
    setData(responseData);
  }, [responseData]);

  const mutateChangeStep = useMutation({
    mutationFn: changeStep,
    mutationKey: ["changeStep"],
    onSuccess: () => {
      setActiveItem(null);
      refetch();
    },
  });

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(Number(active.id));
  }, []);

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

  return {
    data,
    activeItem,
    searchInput,
    searchOption,
    handleChangeSearchInput,
    handleChangeSearchOption,
    handleDragStart,
    handleDragEnd,
  };
}
