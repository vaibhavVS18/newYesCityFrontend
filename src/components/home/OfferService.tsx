"use client";
import Image from "next/image";

export default function OfferService() {
  return (
    <>
    <div className="flex items-center justify-center mt-5">
        <div className="flex items-start  flex-col gap-3 ">
          <div className="w-[434px] h-[101px]">
                    <h1 className="text-[48px] font-bold text-[#1E88E5] leading-[100%]">We offer best services</h1>
                    </div>

          <div className="w-[437px] h-[44px]">
            <p className="text-[15px] font-light leading-[100%]">YesCity, we offer flexible, personalized travel services designed to match your style, pace, and budget. Your journey, your way</p>
          </div>
          
        <button className="w-[336px] h-[71px] pl-10  cursor-pointer rounded-[10px]  flex items-center justify-start gap-7 bg-[#0E2569] text-[22px ] text-white font-semibold relative ">
          <Image src="/images/calendar.png"
          height={47}
          width={47}
          alt="calendar"
          />
   Schedule your trip
        </button>
                <button className="w-[336px] h-[71px] pl-10 cursor-pointer rounded-[10px]  flex items-center justify-start gap-7 bg-[#0E2569] text-[22px ] text-white font-semibold relative ">
          <Image src="/images/Coupon.png"
          height={47}
          width={47}
          alt="Coupon"
          />
   Get discount coupons
        </button>

            
    
        </div>

        <div className="relative flex left-10">
           <Image src="/images/rectangle 43.png"
          height={359}
          width={694}
          alt="rectangle 43"

          />
           <Image src="/images/travel.png"
          height={268.61}
          width={576.88}
          alt="travel"
          className="absolute top-1 z-4 left-10" 
          />
           <Image src="/images/suitcase blue.png"
          height={431.68}
          width={320.68}
          alt="suitcase blue"
          className="absolute top-3 left-[-55px]"
          />

        </div>
    </div>
    </>
  );
}
