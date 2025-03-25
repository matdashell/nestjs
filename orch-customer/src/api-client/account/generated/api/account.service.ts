/**
 * API Title
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Injectable, Optional } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, from, of, switchMap } from 'rxjs';
import { AccountResponse } from '../model/accountResponse';
import { Configuration } from '../configuration';
import { COLLECTION_FORMATS } from '../variables';


@Injectable()
export class AccountService {

    protected basePath = 'http://localhost';
    public defaultHeaders: Record<string,string> = {};
    public configuration = new Configuration();
    protected httpClient: HttpService;

    constructor(httpClient: HttpService, @Optional() configuration: Configuration) {
        this.configuration = configuration || this.configuration;
        this.basePath = configuration?.basePath || this.basePath;
        this.httpClient = configuration?.httpClient || httpClient;
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        return consumes.includes(form);
    }

    /**
     * 
     * 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     * @param {*} [getAccountByUserIdOpts.config] Override http request option.
     */
    public getAccountByUserId(userId: number, getAccountByUserIdOpts?: { config?: AxiosRequestConfig }): Observable<AxiosResponse<AccountResponse>>;
    public getAccountByUserId(userId: number, getAccountByUserIdOpts?: { config?: AxiosRequestConfig }): Observable<any> {
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getAccountByUserId.');
        }

        let headers = {...this.defaultHeaders};

        let accessTokenObservable: Observable<any> = of(null);

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return accessTokenObservable.pipe(
            switchMap((accessToken) => {
                if (accessToken) {
                    headers['Authorization'] = `Bearer ${accessToken}`;
                }

                return this.httpClient.get<AccountResponse>(`${this.basePath}/account/user/${encodeURIComponent(String(userId))}`,
                    {
                        withCredentials: this.configuration.withCredentials,
                        ...getAccountByUserIdOpts?.config,
                        headers: {...headers, ...getAccountByUserIdOpts?.config?.headers},
                    }
                );
            })
        );
    }
    /**
     * 
     * 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     * @param {*} [postAccountOpts.config] Override http request option.
     */
    public postAccount(userId: number, postAccountOpts?: { config?: AxiosRequestConfig }): Observable<AxiosResponse<AccountResponse>>;
    public postAccount(userId: number, postAccountOpts?: { config?: AxiosRequestConfig }): Observable<any> {
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling postAccount.');
        }

        let headers = {...this.defaultHeaders};

        let accessTokenObservable: Observable<any> = of(null);

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return accessTokenObservable.pipe(
            switchMap((accessToken) => {
                if (accessToken) {
                    headers['Authorization'] = `Bearer ${accessToken}`;
                }

                return this.httpClient.post<AccountResponse>(`${this.basePath}/account/user/${encodeURIComponent(String(userId))}`,
                    null,
                    {
                        withCredentials: this.configuration.withCredentials,
                        ...postAccountOpts?.config,
                        headers: {...headers, ...postAccountOpts?.config?.headers},
                    }
                );
            })
        );
    }
}
