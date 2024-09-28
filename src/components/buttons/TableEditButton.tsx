"use client";

import Link from "next/link";
import React from "react";

interface TableDeleteButtonProps {
  appointmentId: number;
  handleEdit: (id: number) => void;
}

export default function TableEditButton({
  appointmentId,
  handleEdit,
}: TableDeleteButtonProps) {
  return (
    <button
      onClick={() => handleEdit(appointmentId)}
      className="text-blue-500 hover:text-blue-700 mr-2"
    >
      <Link href={`/edit/${appointmentId}`}>Edit</Link>
    </button>
  );
}
