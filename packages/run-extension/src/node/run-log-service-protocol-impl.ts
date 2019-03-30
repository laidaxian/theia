import { injectable, inject } from "inversify";
import { RunLogService, logResultObj, logStateObj } from "../common/run-log-service-protocol";
import { PythonRunServer } from './dataexa/python-run-server';


@injectable()
export class RunLogServiceImpl implements RunLogService {
    
    constructor(
        @inject(PythonRunServer) protected readonly PythonRunServer: PythonRunServer
    ){}

    getNewLogs(logId: string, userId: number): Promise<logResultObj> {
        return this.PythonRunServer.getNewLogs(logId, userId);
    }

    startRun(uri: string): Promise<logStateObj> {
        return this.PythonRunServer.startRun(uri);
    }
}