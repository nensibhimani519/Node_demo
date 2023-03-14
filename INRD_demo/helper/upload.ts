import multer from "multer";
import * as fs from 'fs';
import { NextFunction, Request, Response } from "express";
import config from "../config/default.json";

const fileSizeLimit: number = 5 * 1024 * 1024;
const acceptedImageExtensions: Array<string> = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

const upload = multer({
    limits: {
        fileSize: fileSizeLimit
    },
    fileFilter: (req, file, cb) => {
        if (acceptedImageExtensions.some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        } return cb(new Error('Only ' + acceptedImageExtensions.join(", ") + ' files are allowed!'));
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path: any = config.file.path;
            cb(null, path);
        },
        filename: function (req, file, cb) {
            let i: number = file.originalname.lastIndexOf('.');
            let ext: string = (i < 0) ? '.jpg' : file.originalname.substring(i);
            cb(null, new Date().getTime().toString() + ext);
        }
    })
});

export const fileUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let folderName: string = req.body.folderName;
    const uploadFile: any = upload.single("file");
    await uploadFile(req, res, async (error: any) => {
        if (error)  return next(error);
        if (!req.file) return res.status(400).json({ message: 'File uploading failed.' });
        let body: any = {
            file: req.file,
            folder: folderName
        };

        const { uploadFile } = await import('../helper/firebase');
        let result = await uploadFile(body);

        if (!!result && Array.isArray(result) && result.length > 0) {
            fs.unlinkSync(req.file.path);
            req.body.file = result[0];
            return next();
        }
        fs.unlinkSync(req.file.path);
        res.status(400).json({ message: 'File uploading failed.' });
    });
};

export const fileDelete = async (filename: string, foldername: string): Promise<void> => {
    const { deleteFile } = await import('../helper/firebase');
    await deleteFile(filename, foldername);
};