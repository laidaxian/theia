export const RunLogServicePath = '/services/run-log';

export const RunLogService = Symbol("MyPackageService");

export interface logResultObj {
    logContent: string[],
    flowLog: {
        log: string,
        status: number
    }
}

export interface logStateObj {
    code: number,
    object: string
}

export interface RunLogService {
    startRun(uri: string): Promise<logStateObj>;
    getNewLogs(logId: string, userId: number): Promise<logResultObj>;
}