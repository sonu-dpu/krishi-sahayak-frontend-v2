import React from "react";

const images = [
  { src: "/images/farmer1.jpg", alt: "Farmer in field" },
  { src: "/images/farmer2.jpg", alt: "Farmer with crops" },
  { src: "/images/farmer3.jpg", alt: "Farmer with tractor" },
  { src: "/images/framer4.jpg", alt: "Farmer at sunset" },
  { src: "/images/farmer5.jpg", alt: "Farmer harvested yields" },
];

export function FarmerImageGrid({
 
  children,
}: {

  children?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full w-full p-4 lg:p-6">
          <div className="col-span-1 flex flex-col gap-6 h-full pt-10">
            <div className="relative flex-[2] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="relative flex-[3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-6 h-full">
            <div className="relative flex-[3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[4].src}
                alt={images[4].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="relative flex-[2] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[3].src}
                alt={images[3].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
          <div className="hidden md:flex col-span-1 flex-col gap-6 h-full pt-20">
             <div className="relative flex-[2] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="relative flex-[2] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
          <div className="hidden lg:flex col-span-1 flex-col gap-6 h-full">
            <div className="relative flex-[1] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="relative flex-[2] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={images[3].src}
                alt={images[3].alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>
        {/* Advanced Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-20" />
      </div>

      <div className="absolute top-8 left-8 z-30 flex items-center text-lg font-medium">
        <span className="text-white bg-black/40 p-2 rounded-lg font-bold text-3xl tracking-tight hidden md:block">
          Krishi Sahayak
        </span>
      </div>

      <div className="relative z-30 w-full flex flex-col items-center justify-center px-4">
        {children}
      </div>

    
    </div>
  );
}
