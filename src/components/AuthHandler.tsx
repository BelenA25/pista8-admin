import { FC, ReactNode } from "react";

interface AuthHandlerProps {
  loading: boolean;
  user: any;
  children: ReactNode;
}

const AuthHandler: FC<AuthHandlerProps> = ({ loading, user, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">No está registrado</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthHandler;
