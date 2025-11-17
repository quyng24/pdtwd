import Modal from "@/app/components/Modal"
import Image from "next/image"

export default function InfoPage() {
  return (
    <Modal>
      <h2 className="text-xl font-bold mb-3">Quét mã QR liên hệ qua Zalo để nhận tư vấn</h2>
      <Image src="/images/qr-pham-thanh-nhan.jpg" alt="Mã QR Phạm Thanh Nhàn" width={400} height={400} />
    </Modal>
  )
}
