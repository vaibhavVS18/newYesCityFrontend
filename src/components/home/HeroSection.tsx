"use cleint";
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
    <div className="flex justify-center pt-40">
      <div className="flex justify-center gap-8  ">
      <div className="relative">
<div className="flex bg-[#D9D9D903] backdrop-blur-md p-5 absolute z-[5] 
  h-[220px] w-[450px] rounded-[30px] border border-[#8CA0DB] 
  shadow-[0_0_40px_rgba(255,255,255,1)]">

              <div className="flex flex-col justify-center pl-5 gap-2">
                <h1
                  className="text-[56px] font-normal leading-[60px] align-middle text-white"
                  style={{
                    WebkitTextStroke: "1px black",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // adds subtle shadow
                  }}
                >
                  One-Stop TravelHub
                </h1>


                <button className="h-[54px] w-[174px] text-[24px] bg-white rounded-[999px] border-[2px] border-gray-700 text-gray-400 cursor-pointer shadow-inner shadow-gray-400/50">
                  Explore Now
                </button>
              </div>
              <div className="flex h-30 w-30 absolute right-5 top-7 opacity-85">
                <Image

                  src="/images/bubble.png"
                  alt="water drop"
                  height={40}
                  width={40}
                  className="relative left-8 -top-4 w-25 h-25"
                />
                <Image

                  src="/images/bubble.png"
                  alt="water drop"
                  height={29.14}
                  width={33.86}
                  className='absolute top-14 left-5'
                />
                <Image

                  src="/images/bubble.png"
                  alt="water drop"
                  height={46.51}
                  width={40.02}
                  className='absolute top-17 left-12'
                />



              </div>


            </div>
            <div className="flex gap-5 relative top-[29%]">
              <Image
                src="/images/G-Hyderabad card.png"
                alt="hyderabad"
                height={144}  // px
                width={167}
                className="pt-20 mt-1"
              />

              <Image
                src="/images/rectangle 38.png"
                alt="rectangle 38"
                height={239}  // px
                width={232}   // px

              />
            </div>


          </div>
          <div className="relative top-3">
            <Image
              src="/images/agra.png"
              alt="Logo"
              height={331}  // px
              width={297}   // px
            />
            <div className="w-[202px] h-[50.26px] relative">
              <h1 className="font-bold text-[32px] leading-[15px] text-white relative bottom-25 left-8">AGRA</h1>
              <div className="absolute right-[-75px] bottom-32 flex ">
                <h1 className='text-[20px] leading-[15px] text-white font-bold'>
                  4.8

                </h1>
                <Image src="/images/star g 1.png"
                  width={24.16}
                  height={16.95}
                  alt="star g 1.png" />
              </div>
              <p className="text-[13px] font-bold leading-[15px] text-white relative bottom-20 left-8">Witness the legacy of the Mughals in every corner</p>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}