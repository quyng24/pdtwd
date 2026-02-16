"use client";
import { FadeIn } from "./animation";
import CardBase from "./CardBase";
import { useEffect, useState } from "react";
import { ActivitiesFirebase } from "../types/type";
import { getDataActivities } from "../lib/apiActivities";
import { dataCardActivities } from "../store/dataMock";

export default function ClbActivities() {
  const [activities, setActivities] = useState<ActivitiesFirebase[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataActivities();
        const normalizedData: ActivitiesFirebase[] = Array.isArray(data)
          ? (data as ActivitiesFirebase[])
          : dataCardActivities;

        const sortedByLatest = [...normalizedData].sort((a, b) => {
          const aTime =
            typeof a.createdAt === "string"
              ? Date.parse(a.createdAt)
              : typeof a.createdAt === "number"
              ? a.createdAt
              : a.createdAt?.toDate?.().getTime?.() ?? 0;
          const bTime =
            typeof b.createdAt === "string"
              ? Date.parse(b.createdAt)
              : typeof b.createdAt === "number"
              ? b.createdAt
              : b.createdAt?.toDate?.().getTime?.() ?? 0;
          return bTime - aTime;
        });
        
        setActivities(sortedByLatest.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {activities.map((item, idx) => (
        <div key={idx} className="w-full">
          <FadeIn direction="up" delay={0}>
            <CardBase
              img={item.image}
              title={item.title}
              description={item.description}
            />
          </FadeIn>
        </div>
      ))}
    </div>
  );
}
