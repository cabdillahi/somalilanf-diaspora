import { Card } from "@/components/ui/card";

export function WelcomeSection() {
  return (
    <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
      <div className="">
        <div>
          <h2 className="text-xl font-semibold mb-1">Welcome Back !</h2>
          <p className="text-sm opacity-90">Somaliland Diaspora Admin Portal</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm opacity-90">. v1.2</span>
        </div>

        <div className="text-xs opacity-75"> . Last login 2025-09-01</div>
      </div>
    </Card>
  );
}
