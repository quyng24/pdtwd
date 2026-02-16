import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { FormDataType } from "../types/type";
import { dataCardActivities } from "../store/dataMock";

export const getDataActivities = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "activities"));
        const data = querySnapshot.docs.map(doc => doc.data());
        return data;
    } catch {
        return dataCardActivities
    }
}

export const createDataActivities = async (data: FormDataType) => {
    try {
        const payload = {
            title: data.title.trim(),
            description: data.description.trim(),
            image: data.image_base64,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "activities"), payload);
        return { status: "success", id: docRef.id };
    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Thêm dữ liệu thất bại",
        };
    }
};
