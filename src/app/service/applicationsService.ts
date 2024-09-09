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

  // Get all applications
  getAll: async () => {
    const applicationsRef = ref(database, APPLICATIONS_PATH);
    const snapshot = await get(applicationsRef);
    return snapshot.val();
  },

  // Update an application by id
  update: async (id: string, updatedApplication: object) => {
    const applicationRef = ref(database, `${APPLICATIONS_PATH}/${id}`);
    await update(applicationRef, updatedApplication);
  },

  // Delete an application by id
  delete: async (id: string) => {
    const applicationRef = ref(database, `${APPLICATIONS_PATH}/${id}`);
    await remove(applicationRef);
  }
};

export default applicationsService;
