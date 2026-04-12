import React from "react";

export default function Loader({ text = "Loading wisdom..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 px-8">
      {/* Om symbol with gentle pulse */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#B8860B]/40 border-r-[#D4A843]/30 animate-[spin-slow_1.5s_linear_infinite]" />
        <div className="absolute inset-2 flex items-center justify-center text-2xl text-[#B8860B]/70">
          ॐ
        </div>
      </div>
      <p className="text-[#8A8580] text-sm tracking-wide">
        {text}
      </p>
    </div>
  );
}
