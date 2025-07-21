// import { useEffect, useMemo, useState } from "react";
// import Navbar from "./Navbar";
// import Spinner from "../components/Spinner"; // Adjusted for your folder structure

// interface SubdomainData {
//   subdomain: string;
//   ip: string;
// }

// export default function Frame3() {

//   const allData: SubdomainData[] = useMemo(
//     () =>
//       Array.from({ length: 100 }, (_, i) => ({
//         subdomain: `sub${i + 1}.domain.com`,
//         ip: `192.0.2.${(i % 254) + 1}`,
//       })),
//     []
//   );

//   const [filteredData, setFilteredData] = useState<SubdomainData[]>(allData);
//   const [search, setSearch] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(20);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handleSearch = () => {
//     setLoading(true);
//     setTimeout(() => {
//       const lower = search.toLowerCase();
//       const result = allData.filter(
//         (item) =>
//           item.subdomain.toLowerCase().includes(lower) ||
//           item.ip.toLowerCase().includes(lower)
//       );
//       setFilteredData(result);
//       setCurrentPage(1);
//       setLoading(false);
//     }, 800);
//   };

//   useEffect(() => {
//     const lower = search.toLowerCase();
//     const result = allData.filter(
//       (item) =>
//         item.subdomain.toLowerCase().includes(lower) ||
//         item.ip.toLowerCase().includes(lower)
//     );
//     setFilteredData(result);
//     setCurrentPage(1);
//   }, [search, allData]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Navbar />
//       <div className="max-w-4xl mx-auto bg-white p-6 mt-5 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-black">Manage Subdomains</h1>
//           <button className="bg-green-600 text-black px-6 py-3 rounded-lg hover:bg-green-700 p-3 font-bold">
//             Add
//           </button>
//         </div>

//         <div className="flex gap-3 mb-4">
//           <input
//             type="text"
//             placeholder="Search subdomain or IP..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-10">
//             <Spinner />
//           </div>
//         ) : (
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="py-2 text-gray-900 font-semibold">Subdomain</th>
//                 <th className="py-2 text-gray-900 font-semibold">IP Address</th>
//                 <th className="py-2 text-gray-600 font-semibold"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item, idx) => (
//                 <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="py-3 text-gray-800">{item.subdomain}</td>
//                   <td className="py-3 text-gray-800">{item.ip}</td>
//                   <td className="py-3">
//                     <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Pagination Controls */}
//         <div className="flex justify-between items-center mt-6">
//           <div>
//             <label className="mr-2 text-sm text-gray-700">Rows per page:</label>
//             <select
//               value={itemsPerPage}
//               onChange={(e) => setItemsPerPage(Number(e.target.value))}
//               className="border border-gray-300 rounded px-2 py-1"
//             >
//               {[20, 40, 60, 80, 100].map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import Spinner from "../components/Spinner"; // Adjusted for your folder structure

interface SubdomainData {
  subdomain: string;
  ip: string;
}

export default function Domain() {
  const allData: SubdomainData[] = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        subdomain: `sub${i + 1}.domain.com`,
        ip: `192.0.2.${(i % 254) + 1}`,
      })),
    []
  );

  const [filteredData, setFilteredData] = useState<SubdomainData[]>(allData);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const [showModal, setShowModal] = useState(false);
  const [newSubdomain, setNewSubdomain] = useState("");
  const [newIP, setNewIP] = useState("");

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const lower = search.toLowerCase();
      const result = allData.filter(
        (item) =>
          item.subdomain.toLowerCase().includes(lower) ||
          item.ip.toLowerCase().includes(lower)
      );
      setFilteredData(result);
      setCurrentPage(1);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const lower = search.toLowerCase();
    const result = allData.filter(
      (item) =>
        item.subdomain.toLowerCase().includes(lower) ||
        item.ip.toLowerCase().includes(lower)
    );
    setFilteredData(result);
    setCurrentPage(1);
  }, [search, allData]);

  const resetForm = () => {
    setNewSubdomain("");
    setNewIP("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-6 mt-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Manage Subdomains</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-black px-6 py-3 rounded-lg hover:bg-green-700 p-3 font-bold"
          >
            Add
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search subdomain or IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 text-gray-900 font-semibold">Subdomain</th>
                <th className="py-2 text-gray-900 font-semibold">IP Address</th>
                <th className="py-2 text-gray-600 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 text-gray-800">{item.subdomain}</td>
                  <td className="py-3 text-gray-800">{item.ip}</td>
                  <td className="py-3">
                    <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <label className="mr-2 text-sm text-gray-700">Rows per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {[20, 40, 60, 80, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md relative z-50 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Domain with IP Address</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Subdomain</label>
        <input
          type="text"
          value={newSubdomain}
          onChange={(e) => setNewSubdomain(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">IP Address</label>
        <input
          type="text"
          value={newIP}
          onChange={(e) => setNewIP(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            resetForm();
            setShowModal(false);
          }}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (newSubdomain && newIP) {
              const newEntry = { subdomain: newSubdomain, ip: newIP };
              setFilteredData((prev) => [newEntry, ...prev]);
              resetForm();
              setShowModal(false);
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}