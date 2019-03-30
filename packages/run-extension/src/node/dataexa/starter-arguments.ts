/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

enum DEFAULT_ARG {
    APP_PORT = 3000,
    SERVER_PORT = 8080,
    HOST_NAME = 'localhost'
}

const START_ARG_LIST: Args[] = getProcessArguments();

function getArgs(): string[] {
    return process.argv;
}

export interface Args {
    key: string,
    value?: string | number
}

export function getArg(key: string): string | number | undefined {
    const arg_target = findArg(START_ARG_LIST, key);
    if (arg_target) {
        return arg_target.value;
    }

    switch (key) {
        case '--port':
            return DEFAULT_ARG.APP_PORT;
        case '--server-port':
            return DEFAULT_ARG.SERVER_PORT;
        case '--hostname':
            return DEFAULT_ARG.HOST_NAME;
    }
    return undefined;
}

export function findArg(argList: Args[], key: string): Args | undefined {
    return argList.find(function (r: Args) {
        return r.key === key;
    });
}

export function getProcessArguments(): Args[] {

    let argsList: Args[];
    let markIndex: number;

    // 初始化参数数组
    argsList = [];
    // 标记需要跳过的index
    markIndex = -1;

    const allArgs = getArgs();

    allArgs.forEach(function (arg: string, index: number) {
        if (markIndex === index) {
            return;
        }
        switch (arg) {
            case '--port':
            case '--server-port':
            case '--hostname':
                argsList.push({
                    key: arg,
                    value: allArgs[index + 1]
                });
                markIndex = index + 1;
                return;
        }
        return argsList.push({
            key: arg
        });
    });

    return argsList;
}
