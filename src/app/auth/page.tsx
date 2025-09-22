import { LoginForm } from "@/components/pages/auth/login-form";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* image side */}
      <div className="relative lg:flex-1 h-64 lg:h-screen overflow-hidden bg-black/40">
        <Image fill src={"/auth_image.png"} alt="auth_image" />
      </div>

      {/* form side */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg bg-white flex items-center justify-center p-6 lg:p-1">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
