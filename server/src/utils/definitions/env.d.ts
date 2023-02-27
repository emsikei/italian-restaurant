declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV: string;
            readonly MONGO_URL: string;
            readonly PORT: number;
            readonly CLOUDINARY_CLOUD_NAME: string;
            readonly CLOUDINARY_API_KEY: string;
            readonly CLOUDINARY_API_SECRET: string;
            readonly JWT_ACCESS_SECRET: string;
            readonly SMTP_HOST: string;
            readonly SMTP_PORT: number;
            readonly SMTP_USER: string;
            readonly SMTP_PASSWORD: string;
            readonly API_URL: string;
            readonly CLIENT_URL: string;
            readonly ADMIN_NAME: string;
            readonly ADMIN_EMAIL: string;
            readonly ADMIN_PASSWORD: string;
        }
    }
}

export {};
