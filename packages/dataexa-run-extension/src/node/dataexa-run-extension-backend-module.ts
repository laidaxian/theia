import { ContainerModule } from "inversify";
import { ConnectionHandler, JsonRpcConnectionHandler } from "@theia/core/lib/common";
import { RunLogServicePath, RunLogService } from "../common/run-log-service-protocol";
import { RunLogServiceImpl } from "./run-log-service-protocol-impl";
import { PythonRunServer } from './dataexa/python-run-server';
export default new ContainerModule(bind => {
    bind(PythonRunServer).toSelf();
    bind(RunLogService).to(RunLogServiceImpl).inSingletonScope();
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(RunLogServicePath, () =>
            ctx.container.get(RunLogService)
        )
    ).inSingletonScope();
});