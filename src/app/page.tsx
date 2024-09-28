import FilterSection from "@/components/FilterSection";
import Table from "@/components/Table";
import axios from "axios";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";
import { deleteAppointmentAction } from "./actions/appointments/appointment";

export interface Appointment {
  id: number;
  time: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  firstName: string;
}

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

const columns: Column<Appointment>[] = [
  { header: "ID", accessor: "id" },
  { header: "First Name", accessor: "firstName" },
  {
    header: "Time",
    accessor: "time",
    render: (appointment) => new Date(appointment.time).toLocaleString(),
  },
  { header: "Actions", accessor: "firstName" },
];

const handleDelete = async (id: number) => {
  "use server";
  await deleteAppointmentAction(id);
  revalidatePath("");
};

async function getAppointments(searchParams: Record<string, string>) {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/appointment/filter`,
      {
        params: searchParams,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

export default async function Appointments({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const appointments = await getAppointments(searchParams);

  return (
    <div className="flex flex-col items-center">
      <div className="flex mt-5 gap-x-5 justify-center items-center">
        <h1 className="text-2xl">Dog Barber Appointment List</h1>
        <Link href="/appointment/add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
            Add appointment
          </button>
        </Link>
      </div>
      <FilterSection />
      <div className="w-full max-w-4xl mt-10 mx-auto">
        <Table
          data={appointments}
          columns={columns}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
