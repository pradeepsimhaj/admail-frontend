import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { loggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/admailpro-logo.png" alt="AdMailPro Logo" width={30} height={30} className="h-6 mr-2" />
        <span className="font-bold text-black">AdMailPro</span>
      </div>
      <div className="flex space-x-6 items-center">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Campaigns</Link>
        <Link href="/reports" className="text-gray-700 hover:text-blue-600">Templates</Link>
        <div>
        {!loggedIn ? (
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
        ) : (
          <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
        )}
      </div>
      </div>
    </nav>
  );
}