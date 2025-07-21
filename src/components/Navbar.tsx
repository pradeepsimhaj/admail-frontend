// import Link from 'next/link';
// import Image from 'next/image';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/router';

// export default function Navbar() {
//   const { loggedIn, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//     if (confirm('Are you sure you want to logout?')) {
//       logout(); // Updates loggedIn state and localStorage
//       router.push('/login');
//     }
//   };

//   return (
//     <>
//       <div className="bg-white shadow p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <Image
//             src="/admailpro-logo.png"
//             alt="AdMailPro Logo"
//             width={26}
//             height={26}
//             className="h-6 mr-2"
//           />
//           <span className="font-bold text-black">AdMailPro</span>
//         </div>
//             {!loggedIn ? (
//               <Link
//                 href="/login"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Login
//               </Link>
//             ) : (
//               <div className="flex items-center">
//         <div className="flex space-x-6 items-center">
//           <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
//             Dashboard
//           </Link>
//           <Link href="/reports" className="text-gray-700 hover:text-blue-600">
//             Reports
//           </Link>
//           <div>
//               <button
//                 onClick={handleLogout}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Logout
//               </button>
//             </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { loggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      
      {/* Left: Logo and Company Name */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <Image
          src="/admailpro-logo.png"
          alt="AdMailPro Logo"
          width={26}
          height={26}
          className="h-6 w-6 mr-2"
        />
        <span className="text-lg font-semibold text-gray-800">AdMailPro</span>
      </div>

      {/* Center: Heading (only when not logged in) */}
      {!loggedIn && (
        <div className="text-xl font-bold text-gray-700">AdMailPro</div>
      )}

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        {!loggedIn ? (
          <div
            onClick={() => navigate('/login')}
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </div>
        ) : (
          <>
            <div
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </div>
            <div
              onClick={() => navigate('/reports')}
              className="cursor-pointer text-gray-700 hover:text-blue-600"
            >
              Reports
            </div>
            <div
              onClick={handleLogout}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
}
