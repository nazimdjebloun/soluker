"use client";

import Link from "next/link";

export default function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm ">
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-5">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div>
                <h1 className="text-2xl font-bold text-olive tracking-wide">
                  soluker
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
