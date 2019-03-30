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
import { FileStat } from '../common/filesystem';
import { urlConfig } from './base-url';
const syncRequest = util.promisify(request);
export class FileHttpServer extends HttpServer {
    sendRequest(options: RequestOptions, mt: string): Promise<any> {
        return syncRequest({
            url: urlConfig.baseUrl + '/' + mt,
            method: options.type,
            form: options.options
        });
    }

    async readFile(options: RequestOptions): Promise<string> {
        try {
            const response = await this.sendRequest(options, 'readFile');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async readdir(options: RequestOptions): Promise<string[]> {
        try {
            const response = await this.sendRequest(options, 'readDir');
            return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async writeFile(options: RequestOptions): Promise<any> {
        try {
            const response = await this.sendRequest(options, 'writeFile');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async stat(options: RequestOptions): Promise<FileStat | undefined> {
        try {
            const response = await this.sendRequest(options, 'getFileStat');
            if (response.body === '') {
                return undefined;
            }
            return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async mkdirs(options: RequestOptions): Promise<any> {
        try {
            const response = await this.sendRequest(options, 'mkdirs');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async access(options: RequestOptions): Promise<boolean> {
        try {
            const response = await this.sendRequest(options, 'getAccess');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async remove(options: RequestOptions): Promise<any> {
        try {
            const response = await this.sendRequest(options, 'remove');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async pathExists(options: RequestOptions): Promise<boolean> {
        try {
            const response = await this.sendRequest(options, 'uriExists');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async rmdir(options: RequestOptions): Promise<any> {
        try {
            const response = await this.sendRequest(options, 'rmDir');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async copy(options: RequestOptions): Promise<any> {
        try {
            const response = await this.sendRequest(options, 'copy');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

    async utimes(options: RequestOptions): Promise<any> {
        try {
            const response = await this.sendRequest(options, 'utimes');
            return Promise.resolve(response.body);
        } catch (e) {
            throw e;
        }
    }

}
