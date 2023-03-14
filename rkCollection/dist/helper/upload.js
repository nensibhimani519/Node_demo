"use strict";
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
exports.deleteImage = exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("config"));
const fs_1 = __importDefault(require("fs"));
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
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + file.originalname);
        }
    })
});
const fileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadFile = upload.single("image");
    yield uploadFile(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (error) {
            return next(error);
        }
        req.body.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        next();
    }));
});
exports.fileUpload = fileUpload;
const deleteImage = (filename) => {
    let url = config_1.default.get('file.path') + filename;
    if (filename !== undefined && fs_1.default.existsSync(url)) {
        fs_1.default.unlinkSync(url);
    }
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=upload.js.map