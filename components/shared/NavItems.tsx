"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

interface NavItemsProps {
  onItemSelected?: () => void;
}

const NavItems = ({ onItemSelected }: NavItemsProps) => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  const links = useMemo(() => {
    if (!isLoaded) return [];

    const dynamicLink = user?.id
      ? { label: "My Courses", route: "/registration" }
      : { label: "All Courses", route: "/courses" };

    return [
      dynamicLink,
      { label: "About Us", route: "/about" },
      { label: "Contact Us", route: "/contact" },
    ];
  }, [user, isLoaded]);

  if (!isLoaded) return null;

  return (
    <ul className="flex flex-col lg:flex-row w-full lg:w-auto font-sans font-medium tracking-wide">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.route);

        return (
          <li key={link.route} className="w-full lg:w-auto">
            <Link
              href={link.route}
              prefetch={true}
              onClick={onItemSelected}
              className={`
                block w-full lg:w-auto px-4 py-2 rounded transition-colors
                ${
                  isActive
                    ? "bg-maroon text-white lg:bg-transparent lg:text-white border-b-2 font-semibold"
                    : "text-maroon lg:text-white hover:border-b-2 hover:bg-maroon/10"
                }
              `}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
