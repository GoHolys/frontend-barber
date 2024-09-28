import React from "react";
import TableEditButton from "./buttons/TableEditButton";
import TableDeleteButton from "./buttons/TableDeleteButton";
import { auth } from "@/auth";

interface ActionsComponentProps {
  userId: number;
  appointmentId: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export default async function ActionsComponent({
  userId,
  appointmentId,
  handleDelete,
  handleEdit,
}: ActionsComponentProps) {
  const session = await auth();

  return (
    <>
      {session?.user.id === userId && (
        <>
          <TableEditButton
            appointmentId={appointmentId}
            handleEdit={handleEdit}
          />
          <TableDeleteButton
            appointmentId={appointmentId}
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  );
}
