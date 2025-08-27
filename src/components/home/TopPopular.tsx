"use client";
import Image from "next/image";

export default function TopPopular() {
  return (

    <>
    <div className="flex items-center justify-center mt-50">
      <div className=" flex justify-center items-center">
         <div className="flex relative gap-7 ">
          
            <Image
          src="/images/image 9.png"
          height={1089}
          width={1089}
          alt="image 9"
          className="absolute bottom-[-99px] left-30 "/>

 <div className="flex items-center justify-center">
  <div className="w-[331px] h-[302px] ">
    <span className="text-[56px] text-black font-[500] leading-[100%]">Travel </span>
    <span className="text-[64px] leading-[100%] text-[#1E88E5] font-[500]">Top Popular </span>
    <span className="text-[56px] leading-[100%] text-black font-[500]">Destination of </span>
    <span className="text-[64px] leading-[100%] text-[#1E88E5] font-[500]">YesCity</span>
  </div>
</div>

       

        <div className="z-5 relative top-10 flex flex-col gap-3">
           <Image
          src="/images/paper airplane.png"
          height={135}
          width={202}
          alt="paper airplane"
          className="absolute right-[-175px] top-[-66px] z-5"/>
                    <Image
          src="/images/rectangle 33.png"
          height={262}
          width={284}
          alt="rectangle 33"
          className="relative left-[30px]"/>
           <div className="w-[202px] h-[50.26px] relative left-5 botom-26">
                      <h1 className="font-bold text-[32px] leading-[15px] text-white relative bottom-25 left-8">VARANASI</h1>
                      <div className="absolute right-[-75px] bottom-32 flex ">
                        <h1 className='text-[20px] leading-[15px] text-white font-bold'>
                    4.8
          
                        </h1>
                        <Image src="/images/star g 1.png"
                          width={24.16}
                          height={16.95}
                          alt="star g 1.png"/>
                                    </div>
                      <p className="text-[13px] font-bold leading-[15px] text-white relative bottom-20 left-8">
India’s eternal heartbeat and spiritual soul</p>
                      </div>

          <div className=" relative">
             <Image
          src="/images/paper plane.png"
          height={80}
          width={80}
          alt="paper plane"
          className="absolute right-[-35px] top-[-20px]"
          />
          
           <Image
          src="/images/hyderabad2.png"
          height={323}
          width={329}
          alt="hyderabad2"
          className="rounded-[30px]" />
            <div className=" w-[202px] h-[50.26px] absolute left-3 bottom-[-30px]">
                      <h1 className="font-bold text-[32px] leading-[15px] text-white relative bottom-25 left-8">HYDERABAD</h1>
                      <div className="absolute right-[-75px] bottom-32 flex ">
                        <h1 className='text-[20px] leading-[15px] text-white font-bold'>
                    4.6
          
                        </h1>
                        <Image src="/images/star g 1.png"
                          width={24.16}
                          height={16.95}
                          alt="star g 1.png"/>
                                    </div>
                      <p className="text-[13px] font-bold leading-[15px] text-white relative bottom-20 left-8">City of pearls, palaces, and perfect biryani</p>
                      </div>




          </div>
          
        </div>
        <div className=" relative top-35 z-5">
              <Image
          src="/images/location.png"
          height={56}
          width={197}
          alt="location"
          className="absolute right-[-35px] top-[-20px]"
          />
           <Image
          src="/images/rectangle 34.png"
          height={415}
          width={297}
          alt="rectangle 34"
          className="rounded-[30px]" />


           <div className="w-[202px] h-[50.26px] absolute left-0 bottom-45">
                      <h1 className="font-bold text-[32px] leading-[15px] text-white relative bottom-25 left-8">AGRA</h1>
                      <div className="absolute right-[-75px] bottom-32 flex ">
                        <h1 className='text-[20px] leading-[15px] text-white font-bold'>
                    4.8
          
                        </h1>
                        <Image src="/images/star g 1.png"
                          width={24.16}
                          height={16.95}
                          alt="star g 1.png"/>
                                    </div>
                      <p className="text-[13px] font-bold leading-[15px] text-white relative bottom-20 left-8">Witness the legacy of the Mughals in every corner</p>
                      </div>

          </div>

              
          </div>
      </div>
    </div>
    </>
  )
}