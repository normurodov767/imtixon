"use client";
import React from "react";
import "./style.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { User } from "@/interface/User";

function Navbar() {
  const token = localStorage.getItem('token');
  const pathname = usePathname();
  const { data, loading, error, statusofuser, SetStatusOfUser } = useFetch<User>('profile/me');
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/");
    SetStatusOfUser(true);
  };

  return (
    <div className="flex justify-between p-6 bg-rose-600 text-white">
      <Link href={"/"} className="text-xl font-semibold hover:text-rose-100 transition-all">
        Library Admin
      </Link>
      <div className="flex gap-6 items-center">
        {!token ? (
          <div className="flex gap-6">
            <Link
              className={`${pathname === "/register" ? "text-rose-100" : "hover:text-rose-200"} transition-colors`}
              href={"/register"}
            >
              Register
            </Link>
            <Link
              className={`${pathname === "/login" ? "text-rose-100" : "hover:text-rose-200"} transition-colors`}
              href={"/login"}
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <Link
              className={`${pathname === "/books" ? "text-rose-100" : "hover:text-rose-200"} transition-colors`}
              href={"/books"}
            >
              Books
            </Link>
            <Link
              className={`${pathname === "/libraries" ? "text-rose-100" : "hover:text-rose-200"} transition-colors`}
              href={"/libraries"}
            >
              Libraries
            </Link>
            <button
              onClick={logOut}
              className={`${pathname === "/" ? "text-rose-100" : "hover:text-rose-200"} transition-colors`}
            >
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
