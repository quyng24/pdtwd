"use client";
import { FadeIn } from "./animation";
import CardBase from "./CardBase";
import { useEffect, useState } from "react";
import { Activity, dataCardActivities } from "../types/type";
import { getActivities } from "../services/activities";
import { API_BASE } from "../services/api";

export default function ClbActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivities();
        let processedData = [];
        if (data.length < 3) processedData = dataCardActivities
        else if (data.length >= 3 && data.length < 6) processedData = data.slice(0, 3);
        else if (data.length >= 6) processedData = data.slice(0, 6);
        
        setActivities(processedData);
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
