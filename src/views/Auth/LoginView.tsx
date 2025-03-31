import Login from "../../components/Login";

export const LoginView = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};
