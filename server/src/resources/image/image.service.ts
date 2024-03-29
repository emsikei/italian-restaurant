import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import fs from 'fs';

import cloudinary from '@/config/cloudinary';
import HttpException from '@/utils/exceptions/http.exception';

interface IUploadResult {
    secureUrl: string;
    publicId: string;
}

interface IImageUploader {
    uploadImage(filename: string, folder: string): Promise<IUploadResult>;
    destroyImage(publicId: string, folder: string): Promise<string>;
}

interface ILocalImageDeleter {
    deleteImageLocally(imageName: string): void;
}

export class ImageService implements IImageUploader, ILocalImageDeleter {
    public async uploadImage(filename: string, folder: string): Promise<IUploadResult> {
        try {
            await sharp(`./src/uploads/${filename}`)
                .resize({ width: 1000 })
                .webp({ quality: 80 })
                .toFile(`./src/uploads/${filename}.webp`);

            const publicId = uuidv4();

            const uploadResponse = await cloudinary.uploader.upload(`./src/uploads/${filename}.webp`, {
                public_id: publicId,
                folder: `/ir/${folder}/`,
                resource_type: 'raw',
            });

            this.deleteImageLocally(filename);
            this.deleteImageLocally(`${filename}.webp`);

            return { secureUrl: uploadResponse.secure_url, publicId };
        } catch (error: any) {
            throw new HttpException(error.status, error.message);
        }
    }

    public async destroyImage(publicId: string, folder: string): Promise<string> {
        try {
            const { result } = await cloudinary.uploader.destroy(`${folder}${publicId}.webp`, { resource_type: 'raw' });

            return result;
        } catch (error: any) {
            throw new HttpException(error.status, error.message);
        }
    }

    public deleteImageLocally(imageName: string): void {
        const filePath = path.resolve('./src/uploads', imageName);
        fs.unlink(filePath, (err) => {
            if (err) {
                throw new HttpException(500, 'Internal Error');
            }
        });
    }
}
