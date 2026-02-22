import Image from "next/image"

import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { FadeIn } from "@/components/common/animation"
import OverView from "@/components/OverView"
import ClbActivities from "@/components/clbActivities"
import Contact from "@/components/Contact"

export default function Homepage() {
    return (
        <main className="bg-[#DBF4FE] w-screen">
            <Navbar></Navbar>

            {/* Section1 hero section */}
            <section
                id="hero"
                className="relative min-h-screen overflow-hidden bg-[#244067] text-white"
            >
                <div className="absolute inset-0">
                    <Image
                        src="/images/herosection-v2.jpg"
                        alt="Panda Taekwondo Hero"
                        fill
                        priority
                        className="object-cover object-top opacity-40"
                    />
                </div>

                <div className="absolute inset-0 bg-linear-to-r from-[#04080f]/70 via-[#091b31]/50 to-[#0d223c]/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(22,119,255,0.3),transparent_42%)]" />

                <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28 sm:px-10 md:px-14 lg:px-20">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#DBF4FE] backdrop-blur-sm sm:text-sm">
                            Taekwondo Chuyên Nghiệp
                        </span>

                        <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                            Panda
                            <br />
                            Taekwondo
                        </h1>

                        <p className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg md:text-xl">
                            Panda Taekwondo – Kỷ luật tạo chiến binh.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <a
                                href="https://forms.gle/fkx7VL47VDwkHZDR7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full bg-[#1677ff] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_12px_34px_rgba(22,119,255,0.4)] transition hover:-translate-y-0.5 hover:bg-[#1f85ff]"
                            >
                                Đăng ký tập luyện
                            </a>
                            <a
                                href="#introduce"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
                            >
                                Khám phá CLB
                            </a>
                        </div>

                        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="rounded border border-white/20 bg-white/[0.07] px-5 py-4 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-[#7EC8FF]">5+</p>
                                <p className="mt-1 text-xs uppercase tracking-widest text-white/65">
                                    Năm huấn luyện
                                </p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/[0.07] px-5 py-4 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-[#7EC8FF]">30+</p>
                                <p className="mt-1 text-xs uppercase tracking-widest text-white/65">
                                    Học viên đã tham gia
                                </p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/[0.07] px-5 py-4 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-[#7EC8FF]">100%</p>
                                <p className="mt-1 text-xs uppercase tracking-widest text-white/65">
                                    Tập trung kỹ luật
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Section2 Overview clb */}
            <section id="introduce" className="w-full px-10 sm:px-16 md:px-20 py-20">
                <FadeIn direction="down"><h2 className="text-3xl text-black sm:text-4xl md:text-5xl font-bold text-center mb-20 md:mb-40">Tổng quan về CLB</h2></FadeIn>
                <OverView />
            </section>

            {/* Section3 activities of clb */}
            <section id="work" className="w-full px-10 sm:px-16 md:px-20 py-20">
                <FadeIn direction="down"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-40">Hoạt động của CLB</h2></FadeIn>
                <ClbActivities />
            </section>

            {/* Section4 contact */}
            <section id="register" className="px-10 sm:px-16 md:px-20 py-20">
                <FadeIn direction="down"><h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold mb-10 md:mb-5">Thông tin liên hệ Panda Taekwondo</h2></FadeIn>
                <Contact />
            </section>

            {/* Footer */}
            <Footer />
        </main>
    )
}