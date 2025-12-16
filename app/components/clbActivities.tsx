"use client";
import { FadeIn } from "./animation";
import CardBase from "./CardBase";
import { useEffect, useState } from "react";
import { Activity } from "../types/type";
import { getActivities } from "../services/activities";
import { API_BASE } from "../services/api";

export default function ClbActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivities();
        console.log(data);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching data", error);
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
              img={`${API_BASE}${item.img_url}`}
              title={item.title}
              description={item.description}
            />
          </FadeIn>
        </div>
      ))}
    </div>
  );
}
