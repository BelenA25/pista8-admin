import {database} from  "@/app/firebaseConfig";
import {ref, push, set} from "@firebase/database"

const FOUNDERS_PATH =  "founders"


const foundersService = {
    add: async (founder: {

       name: string;
       imageUrl: string;
       link: string;
       iconSize: string;
    }) => {
        const founderRef = ref(database, FOUNDERS_PATH);
        const newFounderRef = push(founderRef);
        await set(newFounderRef, founder);
        return newFounderRef;
    } 
}

export default foundersService;