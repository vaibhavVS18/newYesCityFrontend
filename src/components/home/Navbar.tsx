'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <nav className="flex items-center justify-between pl-20 pr-15 h-[100px] fixed w-full z-20">
        <div>
          <Image
            src="/images/logo.png"
            alt="Logo"
            height={100}
            width={120}
          />
        </div>

        <div className="flex h-[42px] items-center gap-5 ">
          <Link
            href="/"
            className={`font-medium text-[19.8px] leading-[26.4px] p-1 border-b-3 transition-all duration-300 ${
              pathname === '/' ? 'border-[#1E88E5] text-[#1E88E5]' : 'border-transparent hover:border-black'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-medium text-[19.8px] leading-[26.4px] p-1 border-b-3 transition-all duration-300 ${
              pathname === '/about' ? 'border-[#1E88E5] text-[#1E88E5]' : 'border-transparent hover:border-black'
            }`}
          >
            About
          </Link>



          <Link
            href="/contact"
            className={`font-medium text-[19.8px] leading-[26.4px] p-1 border-b-3 transition-all duration-300 ${
              pathname === '/contact' ? 'border-[#1E88E5] text-[#1E88E5]' : 'border-transparent hover:border-black'
            }`}
          >
            Contact
          </Link>

          <Link href="/login">
  <button
    className="bg-[#0088FF] text-white w-[77.6px] h-[39.2px] border-[2px] border-black font-bold cursor-pointer rounded-[1098.9px] flex items-center justify-center transition transform duration-150 active:scale-95 active:bg-[#006fd1]"
  >
    Login
  </button>
</Link>

        </div>
      </nav>
    </>
  )
}
