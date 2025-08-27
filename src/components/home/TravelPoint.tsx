"use client";
import Image from "next/image";

export default function TravelPoint() {
  return (
   <>
   <div className="flex justify-start flex-col ">
    <div className="w-[434px] h-[55px] flex flex-col gap-2">
      <h1 className="text-[40px] font-bold leading-[100%] text-[#1E88E5]">Travel point</h1>
      <p className="text-[20px] leading-[100%] font-medium">We helping you find your <span className="font-bold">Dream Location</span></p>

    </div>
    <div className="w-[900px] h-[665px] flex flex-col relative mt-20 ">
      <div className="flex relative ">
        <Image src="/images/background rectangle.png"
        
        height={124}
        width={310}
        alt="background rectangle" 
        className="absolute top-8 left-8 z-3"/>
        <p className="absolute top-18  left-22   text-[36px] leading-[100%] font-bold text-white z-3">Hyderabad</p>

                <Image src="/images/city.png"
        
        height={385}
        width={705}
        alt="city" 
        className="absolute"/>

        <div className="w-[297px] h-[185px] rounded-[30px] border-white border-[10px] bg-[#0E2569] absolute right-10">
          <h1 className="font-bold leading-[100%] w-[222px] h-[138px] text-white text-[20px] relative top-5 left-6">Hyderabad, <span className="font-light text-[20px] leading-[100%]">the capital of Telangana, is a city brimming with history, culture, and modernizationl</span></h1>
          <button className="w-[91px] h-[30px] rounded-[20px] text-[12px] text-[#0E2569] leading-[100%] bg-white absolute right-2 bottom-2">View more</button>
        </div>



      </div>
      <div className="flex relative">
         <Image src="/images/charminar.png"
        
        height={282}
        width={243}
        alt="charminar" 
        className="absolute top-60 left-[-70px] z-3"/>
         <p className="absolute z-3 top-77 left-[6px] text-white font-bold text-[20px] leading-[100%]">Charminar</p>

          <Image src="/images/golconda.png"
        
        height={157}
        width={317.47}
        alt="golconda" 
        className="absolute left-50 top-77"/>
        <p className="absolute text-white z-5 font-bold text-[36px] leading-[15px] top-85 left-70">Golconda</p>


        <Image src="/images/ramoji city.png"
        
        height={286}
        width={272}
        alt="ramoji city" 
        className="absolute top-60 right-15"/>
        <p className="absolute top-118 right-30 text-white font-bold leading-[100%] z-5 text-[20px]">Ramoji FilmCity</p>

      </div>
    </div>
    
   </div> 
    </>
  );
}
