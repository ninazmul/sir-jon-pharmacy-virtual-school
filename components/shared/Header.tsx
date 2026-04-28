"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { LogIn, Shield } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ISettingSafe } from "@/lib/database/models/setting.model";
import { getSetting, isAdmin } from "@/lib/actions";
import { getUserByClerkId, getUserEmailById } from "@/lib/actions/user.actions";

interface HeaderProps {
  openSearch: () => void;
}

export default function Header({ openSearch }: HeaderProps) {
  const { user } = useUser();

  const [adminStatus, setAdminStatus] = useState(false);
  const [settings, setSettings] = useState<ISettingSafe | null>(null);

  // Fetch settings once
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const setting = await getSetting();
        setSettings(setting);
      } catch (err) {
        console.error("Settings load failed", err);
      }
    };

    fetchSettings();
  }, []);

  // Fetch admin status once when user loads
  useEffect(() => {
    if (!user?.id) {
      setAdminStatus(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userID = await getUserByClerkId(user.id);
        const email = await getUserEmailById(userID);
        const admin = await isAdmin(email);

        setAdminStatus(admin);
      } catch {
        setAdminStatus(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <header className="bg-maroon text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-20 md:w-32 h-12 rounded-md overflow-hidden">
            <Image
              src={settings?.logo || "/assets/images/logo.png"}
              fill
              className="object-contain"
              alt={settings?.name || "Logo"}
              priority
            />
          </div>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-grow max-w-md">
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-4 py-2 w-full rounded-full border border-white/40 text-white/80 hover:border-white hover:text-white transition"
          >
            <FaMagnifyingGlass />{" "}
            <span className="text-sm">Search courses...</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex flex-grow justify-center">
          <NavItems />
        </nav>

        <div className="flex items-center gap-3">
          {/* Auth */}
          <div className="flex items-center gap-3">
            <SignedIn>
              {adminStatus && (
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-maroon hover:bg-primary hover:text-white rounded-full font-semibold"
                >
                  <Link
                    href="/dashboard"
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    <Shield size={16} />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </Button>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Button
                asChild
                size="sm"
                className="bg-white text-maroon hover:bg-primary hover:text-white rounded-full font-semibold"
              >
                <Link href="/sign-in" className="flex items-center gap-1">
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
            </SignedOut>
          </div>

          {/* Mobile */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
