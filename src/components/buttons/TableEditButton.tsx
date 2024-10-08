"use client";

import Link from "next/link";
import React from "react";

interface TableDeleteButtonProps {
  appointmentId: number;
}

export default function TableEditButton({
  appointmentId,
}: TableDeleteButtonProps) {
  return (
    <button
      className="text-blue-500 hover:text-blue-700 mr-2"
    >
      <Link href={`/appointment/edit/${appointmentId}`}>Edit</Link>
    </button>
  );
}
