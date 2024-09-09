import { database } from "@/app/firebaseConfig";
import { ref, set, push, get, update, remove } from "@firebase/database";

const APPLICATIONS_PATH = "applications";

const applicationsService = {
  // Create a new application
  add: async (application: {
    startup_name: string;
    full_name: string;
    email: string;
    phone: string;
    city: string;
    startup_description: string;
    startup_stage: string;
  }) => {
    const applicationsRef = ref(database, APPLICATIONS_PATH);
    const newApplicationRef = push(applicationsRef);
    await set(newApplicationRef, application);
    return newApplicationRef;
  },

  
};

export default applicationsService;
