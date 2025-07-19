import ProtectedRoute from '@/components/ProtectedRoute';
import Frame4 from '@/components/Frame4';
export default function Page() {
  return <ProtectedRoute><Frame4 /></ProtectedRoute>;
}