import { injectable } from 'inversify';
import { LogHttpServer } from './log-http-server';
import { logResultObj, logStateObj } from '../../common/run-log-service-protocol';

const LogHttpServerInst: LogHttpServer = new LogHttpServer();

@injectable()
export class PythonRunServer {
  private static state: string = 'stop';
  private logList: string[] = [];

  public async startRun(uri: string): Promise<logStateObj> {
    const options = {
      type: 'post',
      options: {
        uri
      }
    };
    this.logList = [];
    return JSON.parse(await LogHttpServerInst.startRun(options));
  }

  public async getNewLogs(logId: string, userId: number): Promise<logResultObj> {
    const options = {
      type: 'post',
      options: {
        logId,
        userId,
        offset: this.getOffSet()
      }
    };
    let logs = JSON.parse(await LogHttpServerInst.readLog(options));
    this.addLog(logs.logContent);
    return logs;
  }

  public getAllLogs(): string[] {
    return this.logList;
  }

  public addLog(log: string[] | undefined): void {
    if (log) {
      this.logList.push(...log);
    }
  }

  getOffSet(): number {
    return this.logList.length
  }

  public getRunState(): string {
    return PythonRunServer.state;
  }
}

