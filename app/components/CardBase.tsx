"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type CardProps = {
  img?: string;
  title?: string;
  description: string;
};

export default function NewsCard({ img, title, description }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldShowToggle = (description || "").length > 120;

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-sm ring-1 ring-black/[0.02] backdrop-blur-sm"
    >
      <div className="relative h-60 w-full overflow-hidden md:h-64 lg:h-72">
        <Image
          src={img as string}
          alt={title || "image"}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-md">
          New Update
        </div>
      </div>

      <div className="flex min-h-[208px] flex-col p-5">
        <motion.div
          initial={false}
          animate={{ maxHeight: expanded ? 140 : 64 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <h2
            className={`text-lg font-semibold leading-8 text-slate-900 md:text-xl ${!expanded ? "line-clamp-2" : ""}`}
          >
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ maxHeight: expanded ? 400 : 72 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-2 overflow-hidden"
        >
          <p
            className={`text-sm leading-6 text-slate-600 ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {description}
          </p>
        </motion.div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
            Panda Taekwondo
          </span>
          {shouldShowToggle && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
            >
              {expanded ? "Ẩn bớt" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
