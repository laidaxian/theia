import { OutputChannel, OutputChannelManager } from '@theia/output/lib/common/output-channel';
import { OutputContribution } from '@theia/output/lib/browser/output-contribution';
import { inject, injectable } from 'inversify';
import { RunLogService } from '../common/run-log-service-protocol';

export enum LogType {
  Info,
  Error
}

export interface LogPart {
  data: string;
  type: LogType;
}

@injectable()
export class OutputLogChannel {

  public OUTPUT_CHANNEL_NAME = 'dataexa-run-in-gpu-log';

  private channel: OutputChannel;

  private logTimer: any | undefined;

  public logState: string;

  constructor(
    @inject(OutputContribution) private readonly outputContribution: OutputContribution,
    @inject(OutputChannelManager) private readonly outputChannelManager: OutputChannelManager,
    @inject(RunLogService) protected readonly runLogService: RunLogService
  ) {
    this.channel = this.outputChannelManager.getChannel(this.OUTPUT_CHANNEL_NAME);
    this.logState = 'stop';
  }

  showLogConsole(): void {
    this.outputContribution.openView({ reveal: true }).then(view => {
      view.activate();
    });
  }

  async startLogOutput(uri: string, messageService: any): Promise<void> {
    if (this.logState === 'running') {
      messageService.warn('程序正在运行，请不要重复点击');
      return
    }
    this.channel.clear();
    let logStateObj = await this.runLogService.startRun(uri);

    if (logStateObj.code === 0) {
      this.logState = 'running';
      messageService.info('run in GPU start!');

      let logId = logStateObj.object;

      let filePathList = uri.split('/');

      const userId: number = +filePathList[1];

      this.logTimer = setInterval(async () => {

        const logInfoObj = await this.runLogService.getNewLogs(logId, userId);

        switch (logInfoObj.flowLog.status) {
          case 1:
            this.logState = 'completed';
            messageService.info('run task has completed');
            clearInterval(this.logTimer);
            break;
          case -1:
            this.logState = 'failed';
            messageService.info('run task is failed');
            clearInterval(this.logTimer);
            break;
        }

        if (logInfoObj) {
          logInfoObj.logContent.forEach(l => this.channel.appendLine(l));
        }

      }, 1000);
    } else {
      messageService.error('Can not start run task!');
    }
  }

}
