"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDelete = exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const default_json_1 = __importDefault(require("../config/default.json"));
const fileSizeLimit = 5 * 1024 * 1024;
const acceptedImageExtensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
const upload = (0, multer_1.default)({
    limits: {
        fileSize: fileSizeLimit
    },
    fileFilter: (req, file, cb) => {
        if (acceptedImageExtensions.some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        }
        return cb(new Error('Only ' + acceptedImageExtensions.join(", ") + ' files are allowed!'));
    },
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            let path = default_json_1.default.file.path;
            cb(null, path);
        },
        filename: function (req, file, cb) {
            let i = file.originalname.lastIndexOf('.');
            let ext = (i < 0) ? '.jpg' : file.originalname.substring(i);
            cb(null, new Date().getTime().toString() + ext);
        }
    })
});
const fileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let folderName = req.body.folderName;
    const uploadFile = upload.single("file");
    yield uploadFile(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return next(error);
        if (!req.file)
            return res.status(400).json({ message: 'File uploading failed.' });
        let body = {
            file: req.file,
            folder: folderName
        };
        const { uploadFile } = yield Promise.resolve().then(() => __importStar(require('../helper/firebase')));
        let result = yield uploadFile(body);
        if (!!result && Array.isArray(result) && result.length > 0) {
            fs.unlinkSync(req.file.path);
            req.body.file = result[0];
            return next();
        }
        fs.unlinkSync(req.file.path);
        res.status(400).json({ message: 'File uploading failed.' });
    }));
});
exports.fileUpload = fileUpload;
const fileDelete = (filename, foldername) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteFile } = yield Promise.resolve().then(() => __importStar(require('../helper/firebase')));
    yield deleteFile(filename, foldername);
});
exports.fileDelete = fileDelete;
//# sourceMappingURL=upload.js.map