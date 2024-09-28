import React from "react";
import ActionsComponent from "./ActionsComponent";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

function Table<T>({ data, columns, handleDelete, handleEdit }: TableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${String(column.accessor)}`}
                  className="px-5 py-5 border-b border-gray-200 text-sm"
                >
                  <div className="flex items-center">
                    <div className="ml-3">
                      {column.header === "Actions" ? (
                        <>
                          <ActionsComponent
                            appointmentId={item.id}
                            userId={item.userId}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                          />
                        </>
                      ) : (
                        <p className="text-gray-900 whitespace-no-wrap">
                          {column.render
                            ? column.render(item)
                            : String(item[column.accessor as keyof T])}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
