import {Client , Account , Databases, Storage} from 'appwrite'

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6481f641e4ce0ba7f339');
    
export const account = new Account(client)
export const databases = new Databases(client);
export const storage = new Storage(client)
