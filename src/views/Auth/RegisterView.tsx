import Register from "../../components/Register";

export const RegisterView = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl"> {/* Changed from max-w-md to max-w-4xl to accommodate the wider form */}
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};
