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
// import { FileStat } from '../common/filesystem';
import { urlConfig } from './base-url';
import * as fs from 'fs-extra';
// import * as qs from 'querystring';
const syncRequest = util.promisify(request);
export class FileHttpServer extends HttpServer {
    sendRequest(options: RequestOptions, mt: string): Promise<any> {
        return syncRequest({
            url: urlConfig.baseUrl + '?method=' + mt + '&param=' + JSON.stringify(options.options),
            method: options.type,
        });
    }

    async readFile(options: RequestOptions): Promise<string> {
        try {
            // const content = await fs.readFile(<string>options.options.uri, { encoding: <string>options.options.encoding });
            // return content;
            const response = await this.sendRequest(options, 'readFile');
            return Promise.resolve(response.body);
        } catch (e) {
            return Promise.resolve('');
        }
    }

    async readdir(options: RequestOptions): Promise<string[]> {
        try {
            const content = await fs.readdir(<string>options.options.uri);
            return content;
            // const response = await this.sendRequest(options, 'readdir');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async writeFile(options: RequestOptions): Promise<any> {
        try {
            const content = await fs.writeFile(<string>options.options.uri, <string>options.options.content, { encoding: <string>options.options.encoding });
            return content;
            // const response = await this.sendRequest(options, 'writeFile');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async stat(options: RequestOptions): Promise<any> {
        try {
            const stat = await fs.stat(<string>options.options.uri);
            return stat;
            // const response = await this.sendRequest(options, 'stat');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async mkdirs(options: RequestOptions): Promise<any> {
        try {
            const stat = await fs.mkdirs(<string>options.options.uri);
            return stat;
            // const response = await this.sendRequest(options, 'mkdirs');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async access(options: RequestOptions): Promise<boolean> {
        try {
            return true;
            // const response = await this.sendRequest(options, 'access');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async remove(options: RequestOptions): Promise<any> {
        try {
            const stat = await fs.remove(<string>options.options.uri);
            return stat;
            // const response = await this.sendRequest(options, 'remove');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async pathExists(options: RequestOptions): Promise<boolean> {
        try {
            return true;
            // const response = await this.sendRequest(options, 'pathExists');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async rmdir(options: RequestOptions): Promise<any> {
        try {
            const stat = await fs.rmdir(<string>options.options.uri);
            return stat;
            // const response = await this.sendRequest(options, 'rmdir');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async copy(options: RequestOptions): Promise<any> {
        try {
            const stat = await fs.copy(<string>options.options.sourceUri, <string>options.options.targetUri);
            return stat;
            // const response = await this.sendRequest(options, 'copy');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

    async utimes(options: RequestOptions): Promise<any> {
        try {
            const stat = await fs.utimes(<string>options.options.uri, <number>options.options.utime, <number>options.options.utime);
            return stat;
            // const response = await this.sendRequest(options, 'utimes');
            // return Promise.resolve(JSON.parse(response.body));
        } catch (e) {
            throw e;
        }
    }

}
