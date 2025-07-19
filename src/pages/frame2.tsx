import ProtectedRoute from '@/components/ProtectedRoute';
import Frame2 from '@/components/Frame2';
export default function Page() {
  return <ProtectedRoute><Frame2 /></ProtectedRoute>;
}