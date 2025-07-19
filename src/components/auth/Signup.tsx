export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        <input type="text" placeholder="Name" className="w-full p-2 mb-4 border" />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}