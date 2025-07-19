import Navbar from "./Navbar";

export default function Frame3() {
  const data = [
    { subdomain: 'mail.domain.com', ip: '192.0.2.1' },
    { subdomain: 'smtp.domain.com', ip: '192.0.2.2' },
    { subdomain: 'bounce.domain.com', ip: '192.0.2.3' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-6 mt-5 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">Manage Subdomains</h1>
        <input
          type="text"
          placeholder="domainname.com"
          className="w-full mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-gray-900 font-semibold">Subdomain</th>
              <th className="py-2 text-gray-900 font-semibold">IP Address</th>
              <th className="py-2 text-gray-600 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
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
      </div>
    </div>
  );
}