"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CardProps = {
  img?: string;
  title?: string;
  description: string;
  link?: string;
};

export default function NewsCard({
  img,
  title,
  description,
}: CardProps) {
  const [expanded, setExpanded] = useState(false);

  // detect mô tả dài hay ngắn
  const isLong = description.length > 80;

  return (
    <div className="w-full bg-white rounded overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300">
      {/* IMAGE */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="bg-cover bg-center w-full h-full transform transition-transform duration-500 hover:scale-105"
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70 pointer-events-none"></div>
      </div>

      {/* CONTENT */}
      <div className="p-6 relative">

        {/* CASE: mô tả ngắn -> không animation */}
        {!isLong && <h2 className={`text-xl md:text-2xl font-semibold text-gray-900 mb-2 ${expanded ? "" : 'line-clamp-1'}`}>{title}</h2>}

        {/* CASE: mô tả dài -> animation height ONLY */}
        {isLong && (
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 32 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <h2 className={`text-xl md:text-2xl font-semibold text-gray-900 mb-2 ${expanded ? "" : 'line-clamp-1'}`}>{title}</h2>
          </motion.div>
        )}


        {/* CASE: mô tả ngắn -> không animation */}
        {!isLong && <p className="text-sm text-gray-600 min-h-[2.6rem]">{description}</p>}

        {/* CASE: mô tả dài -> animation height ONLY */}
        {isLong && (
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 40 }} // 60px ≈ 3 dòng
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-600 min-h-[2.6rem]">{description}</p>
          </motion.div>
        )}


        {/* ACTION BUTTONS */}
        <div className="mt-3 flex items-center justify-between">
          {/* chỉ hiện khi mô tả dài */}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 font-medium text-sm hover:underline absolute bottom-0 left-[40%]"
            >
              {expanded ? "Ẩn bớt" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
