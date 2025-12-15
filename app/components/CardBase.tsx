"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { API_BASE } from "../services/api";

type CardProps = {
  img?: string;
  title?: string;
  description: string;
};

export default function NewsCard({ img, title, description }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="
        w-full bg-white rounded overflow-hidden shadow-lg 
        max-w-sm mx-auto hover:shadow-xl transition-all duration-300 
        flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
        <Image
          src={img as string}
          alt={title || "image"}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/70 pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        {/* TITLE */}
        <motion.h2
          initial={false}
          animate={{ height: expanded ? "auto" : 30 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold text-gray-900 overflow-hidden"
        >
          <span className={!expanded ? "line-clamp-1" : ""}>{title}</span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={false}
          animate={{ height: expanded ? "auto" : 66 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-700 mt-2 overflow-hidden"
        >
          <span className={!expanded ? "line-clamp-3" : ""}>{description}</span>
        </motion.p>

        {/* BUTTON */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            mt-3 text-blue-600 text-sm font-medium 
            hover:underline self-start
          "
        >
          {expanded ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
}
