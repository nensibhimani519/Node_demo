import admin from "firebase-admin";
import { initializeApp, cert } from 'firebase-admin/app';
import config from "../config/default.json";

let serviceAccount: any = config.firebase;
const storageBucketUrl: string = config.storageBucketUrl;

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: storageBucketUrl
});

let bucket = admin.storage().bucket();

export const uploadFile = async (body: any) => {
    try {
        let res: any = await bucket.upload(body.file.path, { destination: body.folder + '/' + body.file.filename });
        if (res) {
            let data = res[0];
            if (data) {
                let url = await data.getSignedUrl({
                    action: 'read',
                    expires: '01-01-3000'
                });
                return url;
            }
        }
    }
    catch (e) { return null }
};

export const deleteFile = async (filename: string, foldername: string) => {
    try {
        let urlArray: string[] = filename.split('?');
        
        let uriArray: string[] = urlArray[0].split('/');
        
        let fileName: string = uriArray[uriArray.length - 1];
        if (fileName != null) {
            await bucket.file(foldername + '/' + fileName).delete();
            return true;
        }
    } catch (e) {
        return false;
    }
};