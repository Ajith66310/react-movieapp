import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp path="/register" routing="path" signInUrl="/login" />
    </div>
  );
}
