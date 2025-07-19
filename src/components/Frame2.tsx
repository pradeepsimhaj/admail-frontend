import Navbar from "./Navbar";

export default function Frame2() {
  return (
    <div className="p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-8 mt-5 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-black mb-2">Upload CSV</h1>
        <p className="text-md mb-8 mt-3 max-w-xs mx-auto text-gray-600">
          Add lists of email addresses by uploading a CSV file
        </p>
        <div className="border-2 border-dashed border-gray-300 p-10 text-center rounded-lg bg-gray-50">
          <div className="flex justify-center mb-6">
            <span className="bg-blue-100 p-4 rounded-full inline-block">
              <svg className="text-blue-600 w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zm3 16H7v-2h9v2zm0-4H7v-2h9v2zm0-4H7V8h8v2h2v2z"/>
              </svg>
            </span>
          </div>
          <p className="text-blue-600 font-semibold mb-4">CSV</p>
          <p className="text-gray-500 text-sm mb-6">
            Drag and drop or click to upload
            <br />
            CSV (Comma Separated Values) with email column
          </p>
          <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
            Upload
            <input
              type="file"
              name="upload"
              className="hidden"
              accept=".csv"
            />
          </label>
        </div>
      </div>
    </div>
  );
}