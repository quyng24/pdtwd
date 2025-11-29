"use client"
import { FadeIn } from "./animation";
import CardBase from "./CardBase";
import { useEffect, useState } from "react";
import { getDataActivities } from "../lib/apiActivities";
import { Activity, dataCardActivities } from "../types/type";
import { base64ToBlobUrl } from "../lib/convertBase64";

export default function ClbActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataActivities();
        const formattedData = response as Activity[];
        if (formattedData.length > 0) {
          const latestActivities = [...formattedData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
          const optimizedList = latestActivities.map(item => ({...item, img: base64ToBlobUrl(item.image)}));
          setActivities(optimizedList);
        } else {
          setActivities(dataCardActivities);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between items-center flex-wrap gap-20 md:gap-8">
      {activities.map((item, idx) => (
        <div key={idx} className="w-full sm:w-[48%] md:w-[30%]">
          <FadeIn direction="up" delay={0}>
            <CardBase
              img={item.image || "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg"}
              title={item.title}
              description={item.description}
            />
          </FadeIn>
        </div>
      ))}
    </div>
  )
}