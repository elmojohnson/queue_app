import {db} from "../../utils/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useCredentials } from "../user/useCredentials";

export const useViewRoom = async (id) =>{
    let room;
    const credentials = await useCredentials();

    const roomRef = doc(db, "rooms", id);
    const docSnap = await getDoc(roomRef);

    if(docSnap.exists()) {
        room = docSnap.data();
    } else {
        room = null; 
    }

    return room;

}