import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/pages/admin/components/Layout";

const ProtectedAdminLayout = () => {
  const { user } = useAuth();

  console.log("ProtectedAdminLayout - User:", user);

  if (user === null) {
    return <p>Loading...</p>;
  }

  if (user?.role !== "admin") {
    console.warn("Access denied: Not an admin");
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedAdminLayout;
