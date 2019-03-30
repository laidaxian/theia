import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";

import { MAIN_MENU_BAR } from '@theia/core/lib/common/menu';

import { EditorManager, TextEditor } from '@theia/editor/lib/browser';
import { OutputLogChannel } from './output-log-chanel';
export enum LogType {
    Info,
    Error
}

export interface LogPart {
    data: string;
    type: LogType;
}

export const DataexaRunExtensionCommand = {
    id: 'DataexaRunExtension.command',
    label: "RUN IN GPU"
};

export const DataexaRunExtensionMenus = [...MAIN_MENU_BAR, '6_run'];

@injectable()
export class DataexaRunExtensionCommandContribution implements CommandContribution {

    public OUTPUT_CHANNEL_NAME = 'dataexa-run-in-gpu-log';

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(EditorManager) protected readonly editorManager: EditorManager,
        @inject(OutputLogChannel) protected readonly outputLogChannel: OutputLogChannel
    ) {

    }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(DataexaRunExtensionCommand, {
            execute: () => {
                const edit = this.getCurrentEditor();
                if (edit) {
                    const curUri = edit.uri.path.toString();
                    // const curUri = FileUri.fsPath(edit.uri);

                    this.outputLogChannel.showLogConsole();
                    this.outputLogChannel.startLogOutput(curUri, this.messageService);
                }

            }
        });
    }

    outPutLogs(uri: string): void {
        setInterval
    }

    protected getCurrentEditor(): TextEditor | undefined {
        const activeEditor = this.editorManager.currentEditor;
        if (activeEditor) {
            return activeEditor.editor;
        }
        return undefined;
    }

}

@injectable()
export class DataexaRunExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {

        menus.registerSubmenu(DataexaRunExtensionMenus, 'Run');

        menus.registerMenuAction(DataexaRunExtensionMenus, {
            commandId: DataexaRunExtensionCommand.id,
            label: 'RUN IN GPU'
        });
    }
}

