"use client";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="">
      <nav className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between w-full mb-5">
          <div>
            <Link href={"/"}>
              <Image
                className="w-32 sm:w-[150px] "
                src={"/logo.png"}
                width={150}
                height={150}
                alt="logo"
                priority
              />
            </Link>
          </div>
          <div className="sm:hidden">
            {open ? (
              <X
                size={30}
                className="text-xl text-primary cursor-pointer  "
                onClick={() => setOpen(!open)}
              />
            ) : (
              <AlignJustify
                size={30}
                className="text-xl text-primary cursor-pointer  "
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>
        <div className="gap-8 md:gap-14 lg:gap-20 hidden sm:flex ">
          <Link className="text-2xl text-primary" href={"/"}>
            Home
          </Link>
          <Link className="text-2xl text-primary" href={"/bill"}>
            Bill
          </Link>
          <Link className="text-2xl text-primary" href={"/dashboard"}>
            Dashboard
          </Link>
        </div>
        {open && (
          <div className="flex flex-col gap-2  w-full  px- py-5 bg-background rounded-t-md   ">
            <Link
              onClick={() => setOpen(!open)}
              className="text-xl text-primary"
              href={"/"}
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(!open)}
              className="text-xl text-primary"
              href={"/bill"}
            >
              Bill
            </Link>
            <Link
              onClick={() => setOpen(!open)}
              className="text-xl text-primary"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
