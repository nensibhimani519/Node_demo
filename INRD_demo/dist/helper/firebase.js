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
exports.deleteFile = exports.uploadFile = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const default_json_1 = __importDefault(require("../config/default.json"));
let serviceAccount = default_json_1.default.firebase;
const storageBucketUrl = default_json_1.default.storageBucketUrl;
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount),
    storageBucket: storageBucketUrl
});
let bucket = firebase_admin_1.default.storage().bucket();
const uploadFile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield bucket.upload(body.file.path, { destination: body.folder + '/' + body.file.filename });
        if (res) {
            let data = res[0];
            if (data) {
                let url = yield data.getSignedUrl({
                    action: 'read',
                    expires: '01-01-3000'
                });
                return url;
            }
        }
    }
    catch (e) {
        return null;
    }
});
exports.uploadFile = uploadFile;
const deleteFile = (filename, foldername) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let urlArray = filename.split('?');
        let uriArray = urlArray[0].split('/');
        let fileName = uriArray[uriArray.length - 1];
        if (fileName != null) {
            yield bucket.file(foldername + '/' + fileName).delete();
            return true;
        }
    }
    catch (e) {
        return false;
    }
});
exports.deleteFile = deleteFile;
//# sourceMappingURL=firebase.js.map