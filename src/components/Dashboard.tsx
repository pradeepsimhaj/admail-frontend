import Navbar from "./Navbar";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  
  const features = [
    {
      icon: "📤",
      title: "Upload CSV",
      desc: "Easily upload your contact lists in CSV format",
      onClick: () => router.push("/upload"),
    },
    {
      icon: "📋",
      title: "Manage Subdomains",
      desc: "Add subdomains and adjust sending load",
      onClick: () => router.push("/domain"),
    },
    {
      icon: "📈",
      title: "Track Performance",
      desc: "Monitor delivery, bounces, and opens",
      onClick: () => router.push("/track-performance"),
    },
    {
      icon: "📝",
      title: "Compose Campaign",
      desc: "Manage your mail component",
      onClick: () => router.push("/campaign"),
    },
  ];

  const domains = [
    { domain: "sub1.example.com", ip: "102.0.2.1", isActive: true },
    { domain: "sub2.example.com", ip: "182.0.2.2", isActive: false },
    { domain: "sub3.example.com", ip: "102.0.2.3", isActive: true },
  ];

  return (
    <div className="min-h-screen p-6">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-lg max-w-8xl mx-auto mt-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Streamlined Email Delivery</h1>
          <p className="text-gray-600 text-sm">
            Upload your email lists, optimize subdomain load, and track campaigns with ease
          </p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Feature Icons Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {features.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center text-center border border-blue-300 rounded-xl p-5 w-52 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="bg-blue-100 p-4 rounded-full text-3xl text-blue-600 mb-3">
                {item.icon}
              </div>
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              <p className="text-gray-600 text-xs">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Table Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Optimize Subdomain Status</h2>

        {/* Table */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-3 font-semibold text-gray-700 border-b pb-2 mb-4">
            <div>Domain</div>
            <div>IP Address</div>
            <div>Status</div>
          </div>

          {domains.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 items-center text-sm text-gray-700 py-3 border-b"
            >
              <div>{item.domain}</div>
              <div>{item.ip}</div>
              <div className="flex items-center">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${
                    item.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <span className={item.isActive ? 'text-green-600' : 'text-red-600'}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
