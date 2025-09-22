"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "./sidebar-content"

export function MobileSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-50 bg-green-700 border-green-600 text-white hover:bg-green-600 transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80 border-r-green-600">
          <div className="relative h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-green-600/20 transition-all duration-300 ease-in-out"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
            <SidebarContent onItemClick={() => setIsMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
