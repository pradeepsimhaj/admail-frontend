
import Navbar from "./Navbar";

export default function Frame1() {
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
        <div className="flex justify-around text-center mb-8">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-2">
              <span className="text-blue-600">📤</span>
            </div>
            <p className="text-gray-700 text-xs">Upload CSV<br />Easily upload your<br />contact lists in CSV format</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-2">
              <span className="text-blue-600">📋</span>
            </div>
            <p className="text-gray-700 text-xs">Manage Subdomains<br />Add subdomains and<br />adjust sending load</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-2">
              <span className="text-blue-600">📈</span>
            </div>
            <p className="text-gray-700 text-xs">Track Performance<br />Monitor delivery,<br />bounces, and opens</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Optimize Subdomain Load</h2>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Domain</span>
          <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300">Add</button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <span className="block text-sm font-semibold text-gray-700">sub1.example.com</span>
              <span className="block text-xs text-gray-500">102.0.2.1</span>
            </div>
            <div className="w-1/2">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2" style={{ width: '20%' }}></div>
              </div>
            </div>
            <span className="text-sm text-gray-600">20%</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <span className="block text-sm font-semibold text-gray-700">sub2.example.com</span>
              <span className="block text-xs text-gray-500">182.0.2.2</span>
            </div>
            <div className="w-1/2">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2" style={{ width: '90%' }}></div>
              </div>
            </div>
            <span className="text-sm text-gray-600">90%</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <span className="block text-sm font-semibold text-gray-700">sub3.example.com</span>
              <span className="block text-xs text-gray-500">102.0.2.3</span>
            </div>
            <div className="w-1/2">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2" style={{ width: '30%' }}></div>
              </div>
            </div>
            <span className="text-sm text-gray-600">30%</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}