"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { ISettingSafe } from "@/lib/database/models/setting.model";
import { getSetting } from "@/lib/actions/setting.actions";
import NavItems from "./NavItems";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ISettingSafe | null>(null);

  useEffect(() => {
    (async () => {
      const setting = await getSetting();
      setSettings(setting);
    })();
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <nav className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger */}
        <SheetTrigger className="align-middle">
          <Menu
            size={32}
            className="text-white hover:text-primary transition"
          />
        </SheetTrigger>

        {/* Drawer Content */}
        <SheetContent
          side="left"
          className="flex flex-col gap-8 bg-white text-primary w-11/12 shadow-lg"
        >
          {/* Logo */}
          <div className="flex items-center justify-center py-4 border-b border-primary/20">
            <div className="relative w-28 h-12">
              <Image
                src={settings?.logo || "/assets/images/logo.png"}
                fill
                className="object-contain"
                alt={settings?.name || "Logo"}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-4 px-4">
            <NavItems onItemSelected={handleClose} />
          </div>

          {/* Footer */}
          <div className="mt-auto px-4 py-6 text-center text-sm text-primary/70 border-t border-primary/20">
            © {new Date().getFullYear()} {settings?.name || "Virtual School"}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
