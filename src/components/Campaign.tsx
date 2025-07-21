import Navbar from "./CampaignNavbar";
import { useState } from "react";

export default function Campaign() {
  const [format, setFormat] = useState<"Email" | "HTML">("Email");

  const handleFormatChange = (newFormat: "Email" | "HTML") => {
    setFormat(newFormat);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white mt-6 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Compose Campaign</h1>
        <label className="block text-gray-700 font-semibold mb-2">Subject</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
        />
        <div className="mb-5">
          <span
            className={`mr-4 cursor-pointer ${format === "Email" ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" : "text-gray-700"}`}
            onClick={() => handleFormatChange("Email")}
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleFormatChange("Email")}
            role="button"
            aria-label="Select Email format"
          >
            Email
          </span>
          <span
            className={`cursor-pointer ${format === "HTML" ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" : "text-gray-700"}`}
            onClick={() => handleFormatChange("HTML")}
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleFormatChange("HTML")}
            role="button"
            aria-label="Select HTML format"
          >
            HTML
          </span>
        </div>
        {format === "Email" ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            rows={6}
            placeholder="Enter email body..."
          ></textarea>
        ) : (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            rows={6}
            placeholder="Enter HTML content..."
          ></textarea>
        )}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}