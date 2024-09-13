import React from 'react';

const TableHeaders = () => {
  return (
    <div className="table w-full p-2">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="border-r p-2"></th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Key</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Value</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Description
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 text-center">
            <td className="p-2 border-r w-[40px]"></td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableHeaders;
