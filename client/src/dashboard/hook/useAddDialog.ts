import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { addData } from "../../apis/api";
import { ApplicantDataType } from "../item/types/ApplicantCardType";

type FormDataType = {
  name: string;
  date: string;
};

export default function useAddDialog() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const defaultDate = dayjs().format(`YYYY-MM-DD`);
  const mutateAdd = useMutation({
    mutationKey: ["addData"],
    mutationFn: addData,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["applicant-list"] });
      handleClose();
    },
  });

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries()) as FormDataType;
      const reqData: Omit<ApplicantDataType, "id"> = {
        ...formJson,
        way: "recommendation",
        step: "support",
        isEvaluation: false,
        date: dayjs(formJson.date).format("YYYY.MM.DD"),
      };
      mutateAdd.mutate(reqData);
    },
    [mutateAdd]
  );

  return { open, defaultDate, handleClickOpen, handleClose, handleSubmit };
}
