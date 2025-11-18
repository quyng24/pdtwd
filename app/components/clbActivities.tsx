import { FadeIn } from "./animation";
import imgCard1 from "@/app/images/web-twd1.jpg"
import imgCard2 from "@/app/images/web-twd2.jpg"
import imgCard3 from "@/app/images/web-twd3.jpg"
import CardBase from "./CardBase";

export default function ClbActivities() {
    const dataCard = [
    {
      img: imgCard1,
      title: "Lớp tham gia kì thi lên đai",
      des: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    },
    {
      img: imgCard2,
      title: "Lớp tham gia kì thi lên đai",
      des: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    },
    {
      img: imgCard3,
      title: "Lớp tham gia kì thi lên đai",
      des: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    },
  ];
    return (
      <div className="flex justify-between items-center flex-wrap gap-20 md:gap-8">
        {dataCard.map((item, idx) => (
          <div key={idx} className="w-full sm:w-[48%] md:w-[30%]">
            <FadeIn direction="up" delay={0}>
              <CardBase
                img={item.img}
                title={item.title}
                description={item.des}
              />
            </FadeIn>
          </div>
        ))}
      </div>
    )
}