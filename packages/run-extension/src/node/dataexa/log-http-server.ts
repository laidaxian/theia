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
import { HttpServer, RequestOptions } from './http-server';
import * as request from 'request';
import * as  util from 'util';
import { urlConfig } from './base-url';
// import { logResultObj } from '../../common/run-log-service-protocol';
const syncRequest = util.promisify(request);


export class LogHttpServer extends HttpServer {

    sendRequest(options: RequestOptions, mt: string): Promise<any> {
        return syncRequest({
            url: urlConfig.baseUrl + '/' + mt,
            method: options.type,
            form: options.options
        }, undefined);
    }

    async startRun(options: RequestOptions): Promise<string> {
        try {
            const response = await this.sendRequest(options, 'run');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async readLog(options: RequestOptions): Promise<string> {
        try {
            const response = await this.sendRequest(options, 'readLog');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

}
