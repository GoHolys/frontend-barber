"use client";

import Link from "next/link";
import React from "react";

interface TableDeleteButtonProps {
  appointmentId: number;
}

export default function TableViewRecordButton({
  appointmentId,
}: TableDeleteButtonProps) {
  return (
    <button className="text-green-500 hover:text-green-700 mr-2">
      <Link href={`/appointment/${appointmentId}`}>View Record</Link>
    </button>
  );
}
