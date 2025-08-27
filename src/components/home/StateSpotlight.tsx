"use client";
import Image from "next/image";

export default function StateSpotlight() {
  return (
    <>
      <div className=" h-[140px] w-[1000px] mt-30 relative ">
        <h1 className="font-[500] text-[30px] text-black">Not sure where to go next?</h1>
        <p className="text-[24px] font-[400]">Let YesCity guide you with curated travel spots loved by explorers like you</p>
      </div>
      <div className="flex justify-center items-center mt-20 ">
        <div className="flex justify-center items-center  w-[900px] h-[665px] relative ">
          <div className="flex  flex-col absolute top-0 z-7 left-[25px]">
           
             <Image
                      src="/images/rectangle 40.png"
                      height={223}
                      width={243}
                      alt="rectangle 40"
                      className="rounded-[90px] relative bottom-18"
                    />
                    <p className="font-bold relative bottom-33 left-11 text-white text-[20px] leading-[15px]">Isha yoga temple</p>
                      
              <Image
                      src="/images/rectangle 37.png"
                    height={282}
                      width={243}
                       alt="rectangle 37"
                        className="rounded-[40px]"/>
                        <p className="font-bold text-[20px] relative bottom-15 left-11 text-white  leading-[15px]">Rameshwaram</p>
                               
            
          </div>
          <div className="flex  flex-col absolute right-0 top-0">
             <Image
                      src="/images/rectangle 36.png"
                    height={385}
                      width={705}
                       alt="rectangle 36"
                        className="rounded-[30px]"/>

                      
               <Image
                      src="/images/rectangle 39.png"
                    height={381}
                      width={327}
                       alt="rectangle 39" 
                        className=" absolute right-5 top-10"/>
                        <p className="font-bold text-[36px] absolute top-25  text-white right-[80px] leading-[15px] inline">Tamil Nadu</p>

                         <Image
                      src="/images/tamilnadu card.png"
                    height={381}
                      width={327}
                       alt="tamilnadu card"
                        className="relative left-31 z-8 bottom-10"/>



              
               <Image
                      src="/images/Rameshwaram.png"
                    height={381}
                      width={327}
                       alt="rameshwaram"
                        className="rounded-[20px] absolute right-[-40px] bottom-0"/>
                        <p className="font-bold text-[40px] absolute bottom-70 right-[10px] text-white leading-[15px] inline-block">Kanyakumari</p>
            
        </div>
      </div>
      </div>
      </>
  );
}
