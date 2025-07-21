import ProtectedRoute from '@/components/ProtectedRoute';
import Campaign from '@/components/Campaign';
export default function Page() {
  return <ProtectedRoute><Campaign /></ProtectedRoute>;
}