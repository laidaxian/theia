/**
 * Generated using theia-extension-generator
 */

import { DataexaRunExtensionCommandContribution, DataexaRunExtensionMenuContribution } from './dataexa-run-extension-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';
import { RunLogServicePath, RunLogService } from '../common/run-log-service-protocol';
import { OutputLogChannel } from './output-log-chanel';
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    
    bind(CommandContribution).to(DataexaRunExtensionCommandContribution);
    bind(OutputLogChannel).toSelf();
    bind(MenuContribution).to(DataexaRunExtensionMenuContribution);
    
    bind(RunLogService).toDynamicValue(ctx => {
        const provider = ctx.container.get(WebSocketConnectionProvider);
        return provider.createProxy<RunLogService>(RunLogServicePath);
    }).inSingletonScope();
});