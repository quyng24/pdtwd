"use client";
import { FadeIn } from "./animation";
import CardBase from "./CardBase";
import { useEffect, useState } from "react";
import { getDataActivities } from "../lib/apiActivities";
import { Activity, dataCardActivities } from "../types/type";
import { base64ToBlobUrl } from "../lib/convertBase64";
import { getActivities } from "../services/activities";
import { API_BASE } from "../services/api";

export default function ClbActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = getActivities();
        console.log(data, API_BASE);
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
              img={
                item.image ||
                "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg"
              }
              title={item.title}
              description={item.description}
            />
          </FadeIn>
        </div>
      ))}
    </div>
  );
}
