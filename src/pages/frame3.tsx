import ProtectedRoute from '@/components/ProtectedRoute';
import Frame3 from '@/components/Frame3';
export default function Page() {
  return <ProtectedRoute><Frame3 /></ProtectedRoute>;
}