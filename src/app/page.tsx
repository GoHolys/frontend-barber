import React from "react";
import axios from "axios";
import Table from "@/components/Table";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteAppointmentAction } from "./actions/appointments/appointment";
import { revalidatePath } from "next/cache";

interface Appointment {
  id: number;
  firstName: string;
  time: string;
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

async function getUserData() {
  try {
    const response = await axios.get<Appointment[]>(
      "http://www.localhost:8000/appointment"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

const handleEdit = async (id: number) => {
  "use server";
  redirect(`/edit-appointment/${id}`);
};

const handleDelete = async (id: number) => {
  "use server";
  await deleteAppointmentAction(id);
  revalidatePath("");
};

export default async function UserTable() {
  const users = await getUserData();

  return (
    <div className="flex flex-col items-center">
      <div className="flex mt-5 gap-x-5 justify-center items-center">
        <h1 className="text-2xl">Dog Barber Appointment List</h1>
        <Link href="/add-appointment">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
            Add appointment
          </button>
        </Link>
      </div>
      <div className="w-full max-w-4xl mt-10">
        <Table
          data={users}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
