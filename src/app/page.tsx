"use client";
import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import Heading from "@/components/home/Heading";
import SearchBar2 from "@/components/home/SearchBar2";
import Testimonial from "@/components/home/Testimonial";
import StateSpotLight from "@/components/home/StateSpotlight";
import TravelPoint from "@/components/home/TravelPoint";
import TopPopular from "@/components/home/TopPopular";
import OfferServices from "@/components/home/OfferService";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="flex items-center flex-col mt-6">
        <SearchBar />
        <Heading />
        <TopPopular />

        <StateSpotLight />
        <TravelPoint />
        <OfferServices />
      </div>

      <section className="max-w-5xl mx-auto px-4 mt-10">
        <SearchBar2 />
        <Testimonial />

        <Link href="/chatbot">
          <div className="fixed rounded-full shadow-md right-3 bottom-3 p-1 bg-radial from-white via-[#5198db] to-[#01417d]">
            <img src="./images/robo.png" className="h-16 w-16 relative bottom-2" />
          </div>
        </Link>
      </section>
    </div>
  );
}
