"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CardProps = {
  img?: string;
  title?: string;
  description: string;
};

export default function NewsCard({ img, title, description }: CardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-white rounded overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-300 flex flex-col">
      
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="bg-cover bg-center w-full h-full transform transition-transform duration-500 hover:scale-105"
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">

        {/* Title (Clamped 1 line → Expand full) */}
        <motion.h2
          initial={false}
          animate={{ height: expanded ? "auto" : 30 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold text-gray-900 overflow-hidden"
        >
          <span className={`${!expanded ? "line-clamp-1" : ""}`}>
            {title}
          </span>
        </motion.h2>

        {/* Description (Clamped 3 lines → Expand full) */}
        <motion.p
          initial={false}
          animate={{ height: expanded ? "auto" : 66 }} 
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-700 mt-2 overflow-hidden"
        >
          <span className={`${!expanded ? "line-clamp-3" : ""}`}>
            {description}
          </span>
        </motion.p>

        {/* Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-blue-600 text-sm font-medium hover:underline self-start"
        >
          {expanded ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
}
