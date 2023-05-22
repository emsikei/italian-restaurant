/* eslint-disable no-use-before-define */
import fs from 'fs';

export default class Logger {
    private static instance: Logger;

    private logFilePath: string;

    private constructor() {
        this.logFilePath = 'logs.txt';
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }

    public log(message: string): void {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;

        fs.appendFile(this.logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }
}
