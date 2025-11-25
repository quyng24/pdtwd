import {collection, getDocs} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { dataCardActivities } from "../types/type";

export const getDataActivities = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "activities"));
        const data = querySnapshot.docs.map(doc => doc.data());
        return data;
    } catch {
        return dataCardActivities
    }
}