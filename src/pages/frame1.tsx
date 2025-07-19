import ProtectedRoute from '@/components/ProtectedRoute';
import Frame1 from '@/components/Frame1';
export default function Page() {
  return <ProtectedRoute><Frame1 /></ProtectedRoute>;
}