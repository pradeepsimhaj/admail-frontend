import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/components/Dashboard';
export default function Page() {
  return <ProtectedRoute><Dashboard /></ProtectedRoute>;
}
