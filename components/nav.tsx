"use client";
import { useAppContext } from "@/hooks/useAppContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types/user";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

const Nav = () => {
  const router = useRouter();
  const { isDark, setIsDark, isList, setIsList, user, setUser, videos } =
    useAppContext();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    router.push("/login");
  }, [router]);

  const logOut = () => {
    const resetUser: UserProps = { userName: "", password: "" };
    setUser(resetUser);
    router.push("/login");
  };

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    setShowSettings(false);
  };

  const toggleList = () => {
    setIsList(!isList);
    setShowSettings(false);
  };

  const getNavItems = (user: string): React.ReactNode => {
    if (!user)
      return (
        <div className="w-full flex">
          <p className="flex-1 text-center hidden xs:block">
            Welcome to Video Player
          </p>
          <Link href="/login">Login</Link>
        </div>
      );

    return (
      <div className="flex w-full">
        <div className="flex-1 space-x-4">
          <Link href="/">Home</Link>
        </div>
        <Link href="/login" onClick={logOut}>
          Logout
        </Link>
      </div>
    );
  };

  const getSettings = (): React.ReactNode => {
    const itemsClasses =
      "w-full pl-8 py-1 my-1 hover:cursor-pointer hover:bg-m-hover";

    return (
      <>
        <Button
          className="relative pl-4"
          defaultStyles
          onClick={() => setShowSettings(true)}
        >
          <Cog6ToothIcon width={20} />
        </Button>
        {showSettings && (
          <div
            className={`flex flex-col absolute top-10 right-2 w-32 border border-gray-400 rounded-lg`}
            style={{ backgroundColor: "rgb(var(--bg-main))" }}
            onMouseLeave={() => setShowSettings(false)}
          >
            <div onClick={toggleTheme} className={itemsClasses}>
              {isDark ? "Light" : "Dark"}{" "}
            </div>
            {user.userName && videos && videos.length > 0 && (
              <div onClick={toggleList} className={itemsClasses}>
                {isList ? "Card" : "List"}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <nav className="sticky w-full flex items-center px-4 py-2 space-x-1 z-10 border-b border-gray-500">
      <div className="flex-1">
        <div className="w-full flex items-center gap-6">
          <Image
            priority
            src="/images/FULL_LOGO_COLOR.png"
            alt="Logo"
            width={120}
            height={33}
          />
          {getNavItems(user.userName)}
          {getSettings()}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
