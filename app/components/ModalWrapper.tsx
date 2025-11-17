"use client"

import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import Modal from "./Modal"

type ModalWarpperProps = {
    children: ReactNode,
    className?: string
}

export default function ModalWrapper({children, className}: ModalWarpperProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  // Nếu đường dẫn là /info → mở modal
  useEffect(() => {
    setShow(pathname === "/info")
  }, [pathname])

  return (
    <>
        <div onClick={() => router.push("/info", { scroll: false })} className={className}>
            {children}
        </div>

      {show && (
        <Modal>
          <h2 className="text-xl font-bold mb-3">Thông tin cố định</h2>
          <p>
            Đây là nội dung cố định trong modal.  
            Nếu bạn tải lại trang /info, vẫn có HTML sẵn cho SEO.
          </p>
          <button
            className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => router.back()}
          >
            Đóng
          </button>
        </Modal>
      )}
    </>
  )
}
