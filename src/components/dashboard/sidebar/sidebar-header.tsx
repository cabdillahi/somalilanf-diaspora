import Image from "next/image";

export function SidebarHeader() {
  return (
    <div className="p-6 border-b border-green-600/30">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12  rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105">
          <Image
            src={"/somalilandlogo.png"}
            width={300}
            height={300}
            alt="somalialnd-logo"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold leading-tight">
            Ministry Of Foreign Affairs &<br />
            International Cooperation
          </h1>
          <p className="text-xs text-green-200 mt-1">Republic of Somaliland</p>
        </div>
      </div>
    </div>
  );
}
