
import { AdminAuth } from "@/components/AdminAuth";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      {/* Greek Flag Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 18'%3E%3Cpath fill='%23005BAE' d='M0 0h27v2H0zM0 4h27v2H0zM0 8h27v2H0zM0 12h27v2H0zM0 16h27v2H0z'/%3E%3Cpath fill='%23FFFFFF' d='M0 2h27v2H0zM0 6h27v2H0zM0 10h27v2H0zM0 14h27v2H0z'/%3E%3Crect fill='%23005BAE' width='12' height='12'/%3E%3Cpath fill='%23FFFFFF' d='M5 0h2v12H5zM0 5h12v2H0z'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2" style={{ fontFamily: 'serif' }}>
            ARTEMIS
          </h1>
          <p className="text-blue-700 text-sm font-medium">Admin Login</p>
        </div>
        
        <AdminAuth 
          onAuthenticated={() => {
            window.location.href = '/';
          }}
          onClose={() => {
            window.location.href = '/';
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
