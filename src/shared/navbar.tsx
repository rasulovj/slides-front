"use client";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl italic font-semibold">SlideMind</span>
        </Link>

        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="#features" className="hover:text-blue-600 transition">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-blue-600 transition">
            Pricing
          </Link>
          <Link href="#about" className="hover:text-blue-600 transition">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
