import {Client , Account , Databases, Storage} from 'appwrite'

const client = new Client()
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);
    
export const account = new Account(client)
export const databases = new Databases(client);
export const storage = new Storage(client)
