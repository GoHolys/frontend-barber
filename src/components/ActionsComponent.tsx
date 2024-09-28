import React from "react";
import TableEditButton from "./buttons/TableEditButton";
import TableDeleteButton from "./buttons/TableDeleteButton";
import { auth } from "@/auth";
import TableViewRecordButton from "./buttons/TableViewRecordButton";
import { Appointment } from "@/app/page";

interface ActionsComponentProps {
  item: Appointment;
  handleDelete: (id: number) => Promise<void>;
}

export default async function ActionsComponent({
  item,
  handleDelete,
}: ActionsComponentProps) {
  const session = await auth();

  return (
    <>
      {session?.user.id === item.userId && (
        <>
          <TableEditButton appointmentId={item.id} />
          <TableDeleteButton
            appointmentId={item.id}
            handleDelete={handleDelete}
          />
          <TableViewRecordButton appointmentId={item.id} />
        </>
      )}
    </>
  );
}
