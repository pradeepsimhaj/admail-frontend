import ProtectedRoute from '@/components/ProtectedRoute';
import Domain from '@/components/Domain';
export default function Page() {
  return <ProtectedRoute><Domain /></ProtectedRoute>;
}
