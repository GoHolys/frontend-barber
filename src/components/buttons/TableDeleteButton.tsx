"use client";

import React from "react";

interface TableDeleteButtonProps {
  appointmentId: number;
  handleDelete: (id: number) => void;
}

export default function TableDeleteButton({
  appointmentId,
  handleDelete,
}: TableDeleteButtonProps) {
  return (
    <button
      onClick={() => handleDelete(appointmentId)}
      className="text-red-500 hover:text-red-700 mr-2"
    >
      Delete
    </button>
  );
}
