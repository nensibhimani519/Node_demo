import crypto from "crypto";
import config from "config";


export const encrypt = (text: string) => {
    let cipher = crypto.createCipher(
        config.get("alogirithm"),
        config.get("encryptionKey")
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

export const decrypt = async (text: string): Promise<string> => {
    let decipher = crypto.createDecipher(
        config.get("alogirithm"),
        config.get("encryptionKey")
    );
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};