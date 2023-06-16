import { ID, Query } from "appwrite";
import { databases, storage } from "../../Appwrite/AppwriteConfig";

const databaseId = import.meta.env.VITE_DATABASE_ID
const usersCollectionId = import.meta.env.VITE_USERS_COLLECTION_ID
const usersBucketId = import.meta.env.VITE_USERS_BUCKET_ID
const passwordCollectionId = import.meta.env.VITE_PASSWORD_COLLECTION_ID

export async function createUserOnDb(user){
    var user = {
        id : user.$id,
        email : user.email,
        name : user.name,
        isImageUploaded : false,
    }
    const createdUser = await databases.createDocument(databaseId , usersCollectionId , ID.unique() , user)
    return createdUser;
}

export async function getUserByEmail(email){
    const user = await databases.listDocuments(databaseId , usersCollectionId , [Query.equal('email' , email)])
    return user;
}

export async function uploadImageToBucket(user , file){
    const uniqueId = ID.unique()
    var uploadedFile
    try{
        uploadedFile = await storage.createFile(usersBucketId,uniqueId,file)
    }catch(error){
        console.log(error)
    }
    const updatedUser = await databases.updateDocument(databaseId , usersCollectionId , user.$id , {
        ImageId : uploadedFile.$id,
        isImageUploaded : true
    })
}

export async function getCredentialsOfUser(email){
    const credentils = await databases.listDocuments(databaseId , passwordCollectionId , [Query.equal('user' , email)])
    return credentils
}

export async function createCredentailsForUser(credentialObj){
    const credentil = await databases.createDocument(databaseId , passwordCollectionId , ID.unique() , credentialObj)
    return credentil
}

export async function getACredential(credentialId){
    const credential = await databases.getDocument(databaseId , passwordCollectionId , credentialId)
    return credential;
}

export async function deleteACredential(credentialId){
    await databases.deleteDocument(databaseId , passwordCollectionId , credentialId)
}

