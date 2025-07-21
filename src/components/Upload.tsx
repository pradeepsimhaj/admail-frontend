import Navbar from "./Navbar";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useState } from "react";

type FileData = {
  name: string;
  url: string;
};


export default function Upload() {
  const sampleFiles: FileData[] = [
    { name: "Users with Full Info (CSV)", url: "/excel/users-full.csv" },
    { name: "Simple Emails List (CSV)", url: "/excel/simple-emails.csv" },
    { name: "Mixed Fields (CSV)", url: "/excel/mixed-users.csv" },
  ];

  const [previewData, setPreviewData] = useState<string[][]>([]);
  const [previewFileName, setPreviewFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<number | null>(null);
  const [newUser, setNewUser] = useState<string[]>([]);

  const handlePreview = async (file: FileData) => {
    setPreviewFileName(file.name);

    const res = await fetch(file.url);
    const blob = await res.blob();
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;

      if (file.url.endsWith(".csv")) {
        const parsed = Papa.parse(data as string, { header: false });
        setPreviewData(parsed.data as string[][]);
      } else if (file.url.endsWith(".xlsx")) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsed = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setPreviewData(parsed as string[][]);
      }

      setEditRow(null);
      setNewUser([]);
      setIsModalOpen(true);
    };

    if (file.url.endsWith(".csv")) {
      reader.readAsText(blob);
    } else {
      reader.readAsBinaryString(blob);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewData([]);
    setPreviewFileName(null);
  };

  const handleDeleteRow = (index: number) => {
    const updated = [...previewData];
    updated.splice(index, 1);
    setPreviewData(updated);
  };

  const handleEditCell = (value: string, row: number, col: number) => {
    const updated = [...previewData];
    updated[row][col] = value;
    setPreviewData(updated);
  };

  const handleAddUser = () => {
    if (newUser.length === previewData[0]?.length) {
      setPreviewData([...previewData, newUser]);
      setNewUser([]);
    }
  };

  const handleNewUserInput = (value: string, col: number) => {
    const updated = [...newUser];
    updated[col] = value;
    setNewUser(updated);
  };

  const handleDownloadUpdated = () => {
    if (!previewData.length || !previewFileName) return;

    const fileExtension = previewFileName.includes(".csv") ? ".csv" : ".xlsx";
    const fileName = `updated-${previewFileName.replace(/\.[^/.]+$/, "")}${fileExtension}`;

    if (fileExtension === ".csv") {
      // Convert previewData to CSV
      const csv = Papa.unparse(previewData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (fileExtension === ".xlsx") {
      // Convert previewData to XLSX
      const worksheet = XLSX.utils.aoa_to_sheet(previewData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, fileName);
    }
  };

  return (
    <div className="p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-8 mt-5 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-black mb-2">Upload CSV</h1>
        <p className="text-md mb-8 mt-3 max-w-xs mx-auto text-gray-600">
          Add lists of email addresses by uploading a CSV file
        </p>
        <div className="border-2 border-dashed border-gray-300 p-10 text-center rounded-lg bg-gray-50">
          <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
            Upload
            <input type="file" className="hidden" accept=".csv,.xlsx" />
          </label>
        </div>

        {/* Sample Files */}
        <div className="mt-10 text-left">
          <h2 className="text-xl font-semibold mb-4">Example Files:</h2>
          <ul className="space-y-2">
            {sampleFiles.map((file, index) => (
              <li key={index}>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handlePreview(file)}
                >
                  📄 {file.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewFileName}</h3>
              <button
                className="text-red-500 hover:text-red-700 text-xl"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            {/* Table */}
            <div className="overflow-auto border rounded">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {previewData[0]?.map((_, i) => (
                      <th key={i} className="px-3 py-2 border font-semibold">
                        {previewData[0][i]}
                      </th>
                    ))}
                    <th className="px-3 py-2 border font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="px-3 py-2 border-r">
                          {editRow === rowIndex + 1 ? (
                            <input
                              className="border px-1 py-0.5 w-full"
                              value={cell}
                              onChange={(e) =>
                                handleEditCell(
                                  e.target.value,
                                  rowIndex + 1,
                                  colIndex
                                )
                              }
                            />
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                      <td className="px-2 py-2 flex gap-2">
                        {editRow === rowIndex + 1 ? (
                          <button
                            onClick={() => setEditRow(null)}
                            className="text-green-600 hover:underline"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditRow(rowIndex + 1)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteRow(rowIndex + 1)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Add New User Row */}
                  {previewData[0] && (
                    <tr className="bg-gray-50">
                      {previewData[0].map((_, i) => (
                        <td key={i} className="px-3 py-2 border">
                          <input
                            className="border px-1 py-0.5 w-full"
                            value={newUser[i] || ""}
                            onChange={(e) =>
                              handleNewUserInput(e.target.value, i)
                            }
                            placeholder={`Enter ${previewData[0][i]}`}
                          />
                        </td>
                      ))}
                      <td>
                        <button
                          onClick={handleAddUser}
                          className="bg-blue-600 text-white px-3 py-1 ml-5 rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal Footer with Buttons */}
            <div className="mt-6 text-right flex gap-4 justify-end">
              <label className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                Upload
                <input type="file" className="hidden" accept=".csv,.xlsx" />
              </label>
              <a
                href={
                  sampleFiles.find((f) => f.name === previewFileName)?.url || "#"
                }
                download
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download Original
              </a>
              <button
                onClick={handleDownloadUpdated}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download Updated
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}











// import Navbar from "./Navbar";
// import Papa from "papaparse";
// import * as XLSX from "xlsx";
// import { useState } from "react";

// type FileData = {
//   name: string;
//   url: string;
// };

// export default function Frame2() {
//   const sampleFiles: FileData[] = [
//     { name: "Users with Full Info (CSV)", url: "/excel/users-full.csv" },
//     { name: "Simple Emails List (CSV)", url: "/excel/simple-emails.csv" },
//     { name: "Mixed Fields (CSV)", url: "/excel/mixed-users.csv" },
//   ];

//   const [previewData, setPreviewData] = useState<string[][]>([]);
//   const [previewFileName, setPreviewFileName] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editRow, setEditRow] = useState<number | null>(null);
//   const [newUser, setNewUser] = useState<string[]>([]);
//   const [originalFileUrl, setOriginalFileUrl] = useState<string>("");

//   const handlePreview = async (file: FileData) => {
//     setPreviewFileName(file.name);
//     setOriginalFileUrl(file.url);

//     const res = await fetch(file.url);
//     const blob = await res.blob();
//     const reader = new FileReader();

//     reader.onload = () => {
//       const data = reader.result;

//       if (file.url.endsWith(".csv")) {
//         const parsed = Papa.parse(data as string, { header: false });
//         setPreviewData(parsed.data as string[][]);
//       } else if (file.url.endsWith(".xlsx")) {
//         const workbook = XLSX.read(data, { type: "binary" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const parsed = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//         setPreviewData(parsed as string[][]);
//       }

//       setEditRow(null);
//       setNewUser([]);
//       setIsModalOpen(true);
//     };

//     if (file.url.endsWith(".csv")) {
//       reader.readAsText(blob);
//     } else {
//       reader.readAsBinaryString(blob);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setPreviewData([]);
//     setPreviewFileName(null);
//     setOriginalFileUrl("");
//   };

//   const handleDeleteRow = (index: number) => {
//     const updated = [...previewData];
//     updated.splice(index, 1);
//     setPreviewData(updated);
//   };

//   const handleEditCell = (value: string, row: number, col: number) => {
//     const updated = [...previewData];
//     updated[row][col] = value;
//     setPreviewData(updated);
//   };

//   const handleAddUser = () => {
//     if (newUser.length === previewData[0]?.length) {
//       setPreviewData([...previewData, newUser]);
//       setNewUser([]);
//     }
//   };

//   const handleNewUserInput = (value: string, col: number) => {
//     const updated = [...newUser];
//     updated[col] = value;
//     setNewUser(updated);
//   };

//   const handleDownloadUpdated = () => {
//     const csv = Papa.unparse(previewData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const tempLink = document.createElement("a");
//     tempLink.href = url;
//     tempLink.setAttribute("download", "updated-data.csv");
//     document.body.appendChild(tempLink);
//     tempLink.click();
//     document.body.removeChild(tempLink);
//   };

//   return (
//     <div className="p-6">
//       <Navbar />
//       <div className="max-w-2xl mx-auto bg-white p-8 mt-5 rounded-lg shadow-md text-center">
//         <h1 className="text-3xl font-bold text-black mb-2">Upload CSV</h1>
//         <p className="text-md mb-8 mt-3 max-w-xs mx-auto text-gray-600">
//           Add lists of email addresses by uploading a CSV file
//         </p>
//         <div className="border-2 border-dashed border-gray-300 p-10 text-center rounded-lg bg-gray-50">
//           <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
//             Upload
//             <input type="file" className="hidden" accept=".csv,.xlsx" />
//           </label>
//         </div>

//         {/* Sample Files */}
//         <div className="mt-10 text-left">
//           <h2 className="text-xl font-semibold mb-4">Example Files:</h2>
//           <ul className="space-y-2">
//             {sampleFiles.map((file, index) => (
//               <li key={index}>
//                 <button
//                   className="text-blue-600 hover:underline"
//                   onClick={() => handlePreview(file)}
//                 >
//                   📄 {file.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">{previewFileName}</h3>
//               <button
//                 className="text-red-500 hover:text-red-700 text-xl"
//                 onClick={closeModal}
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Table */}
//             <div className="overflow-auto border rounded">
//               <table className="min-w-full text-sm border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     {previewData[0]?.map((_, i) => (
//                       <th key={i} className="px-3 py-2 border font-semibold">
//                         {previewData[0][i]}
//                       </th>
//                     ))}
//                     <th className="px-3 py-2 border font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previewData.slice(1).map((row, rowIndex) => (
//                     <tr key={rowIndex} className="border-b">
//                       {row.map((cell, colIndex) => (
//                         <td key={colIndex} className="px-3 py-2 border-r">
//                           {editRow === rowIndex + 1 ? (
//                             <input
//                               className="border px-1 py-0.5 w-full"
//                               value={cell}
//                               onChange={(e) =>
//                                 handleEditCell(
//                                   e.target.value,
//                                   rowIndex + 1,
//                                   colIndex
//                                 )
//                               }
//                             />
//                           ) : (
//                             cell
//                           )}
//                         </td>
//                       ))}
//                       <td className="px-2 py-2 flex gap-2">
//                         {editRow === rowIndex + 1 ? (
//                           <button
//                             onClick={() => setEditRow(null)}
//                             className="text-green-600 hover:underline"
//                           >
//                             Save
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => setEditRow(rowIndex + 1)}
//                             className="text-blue-600 hover:underline"
//                           >
//                             Edit
//                           </button>
//                         )}
//                         <button
//                           onClick={() => handleDeleteRow(rowIndex + 1)}
//                           className="text-red-600 hover:underline"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}

//                   {/* Add New User Row */}
//                   {previewData[0] && (
//                     <tr className="bg-gray-50">
//                       {previewData[0].map((_, i) => (
//                         <td key={i} className="px-3 py-2 border">
//                           <input
//                             className="border px-1 py-0.5 w-full"
//                             value={newUser[i] || ""}
//                             onChange={(e) =>
//                               handleNewUserInput(e.target.value, i)
//                             }
//                             placeholder={`Enter ${previewData[0][i]}`}
//                           />
//                         </td>
//                       ))}
//                       <td>
//                         <button
//                           onClick={handleAddUser}
//                           className="bg-blue-600 text-white px-3 py-1 ml-5 rounded hover:bg-blue-700"
//                         >
//                           Add
//                         </button>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex justify-between items-center">
//               <button className="bg-gray-300 px-4 py-2 rounded text-gray-700 cursor-not-allowed">
//                 Upload
//               </button>
//               <div className="flex gap-3">
//                 <a
//                   href={originalFileUrl || "#"}
//                   download
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Download Original
//                 </a>
//                 <button
//                   onClick={handleDownloadUpdated}
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Download Updated
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
