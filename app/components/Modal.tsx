"use client"

import { useRouter } from "next/navigation"

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // Khi người dùng click ra ngoài, quay về trang /
  const closeModal = () => router.push("/", { scroll: false })

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <button
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={closeModal}
        >
          Đóng
        </button>
      </div>
    </div>
  )
}
