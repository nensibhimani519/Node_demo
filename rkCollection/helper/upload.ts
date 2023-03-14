import multer from "multer";
import { NextFunction, Request, Response } from "express";
import config from "config";
import fs from "fs";

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
        destination: function (req, file, cb) {
                  cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix+file.originalname)
        }
    })
});

export const fileUpload = async (req: Request, res: Response, next: NextFunction) => {
    const uploadFile: any = upload.single("image");
    await uploadFile(req, res, async (error: any) => {
        
        if (error) { return next(error); }
        req.body.image = req.file?.filename;
        next();
    });
};

export const deleteImage = (filename: string) => {
    let url: string = config.get('file.path') + filename;
    if (filename !== undefined && fs.existsSync(url)) {
        fs.unlinkSync(url);
    }
};