import ProtectedRoute from '@/components/ProtectedRoute';
import Upload from '@/components/Upload';
export default function Page() {
  return <ProtectedRoute><Upload /></ProtectedRoute>;
}
