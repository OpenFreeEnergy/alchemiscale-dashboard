/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_action_tasks_networks__network_scoped_key__tasks_action_post } from '../models/Body_action_tasks_networks__network_scoped_key__tasks_action_post';
import type { Body_add_task_restart_patterns_networks__network_scoped_key__restartpatterns_add_post } from '../models/Body_add_task_restart_patterns_networks__network_scoped_key__restartpatterns_add_post';
import type { Body_cancel_tasks_networks__network_scoped_key__tasks_cancel_post } from '../models/Body_cancel_tasks_networks__network_scoped_key__tasks_cancel_post';
import type { Body_create_tasks_transformations__transformation_scoped_key__tasks_post } from '../models/Body_create_tasks_transformations__transformation_scoped_key__tasks_post';
import type { Body_create_transformations_tasks_bulk_transformations_tasks_create_post } from '../models/Body_create_transformations_tasks_bulk_transformations_tasks_create_post';
import type { Body_get_access_token_token_post } from '../models/Body_get_access_token_token_post';
import type { Body_get_network_actioned_tasks_networks__network_scoped_key__tasks_actioned_post } from '../models/Body_get_network_actioned_tasks_networks__network_scoped_key__tasks_actioned_post';
import type { Body_get_networks_actioned_tasks_bulk_networks_tasks_actioned_post } from '../models/Body_get_networks_actioned_tasks_bulk_networks_tasks_actioned_post';
import type { Body_get_networks_state_bulk_networks_state_get_post } from '../models/Body_get_networks_state_bulk_networks_state_get_post';
import type { Body_get_networks_status_bulk_networks_status_post } from '../models/Body_get_networks_status_bulk_networks_status_post';
import type { Body_get_networks_weight_bulk_networks_weight_get_post } from '../models/Body_get_networks_weight_bulk_networks_weight_get_post';
import type { Body_get_task_actioned_networks_tasks__task_scoped_key__networks_actioned_post } from '../models/Body_get_task_actioned_networks_tasks__task_scoped_key__networks_actioned_post';
import type { Body_get_task_restart_patterns_bulk_networks_restartpatterns_get_post } from '../models/Body_get_task_restart_patterns_bulk_networks_restartpatterns_get_post';
import type { Body_remove_task_restart_patterns_networks__network_scoped_key__restartpatterns_remove_post } from '../models/Body_remove_task_restart_patterns_networks__network_scoped_key__restartpatterns_remove_post';
import type { Body_set_networks_state_bulk_networks_state_set_post } from '../models/Body_set_networks_state_bulk_networks_state_set_post';
import type { Body_set_networks_weight_bulk_networks_weight_set_post } from '../models/Body_set_networks_weight_bulk_networks_weight_set_post';
import type { Body_set_task_restart_patterns_max_retries_networks__network_scoped_key__restartpatterns_maxretries_post } from '../models/Body_set_task_restart_patterns_max_retries_networks__network_scoped_key__restartpatterns_maxretries_post';
import type { Body_tasks_priority_get_bulk_tasks_priority_get_post } from '../models/Body_tasks_priority_get_bulk_tasks_priority_get_post';
import type { Body_tasks_priority_set_bulk_tasks_priority_set_post } from '../models/Body_tasks_priority_set_bulk_tasks_priority_set_post';
import type { Body_tasks_status_get_bulk_tasks_status_get_post } from '../models/Body_tasks_status_get_bulk_tasks_status_get_post';
import type { Body_tasks_status_set_bulk_tasks_status_set_post } from '../models/Body_tasks_status_set_bulk_tasks_status_set_post';
import type { ScopedKey } from '../models/ScopedKey';
import type { Token } from '../models/Token';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get Access Token
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static getAccessTokenTokenPost(
        formData: Body_get_access_token_token_post,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ping
     * @returns any Successful Response
     * @throws ApiError
     */
    public static pingPingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ping',
        });
    }
    /**
     * Info
     * @returns any Successful Response
     * @throws ApiError
     */
    public static infoInfoGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/info',
        });
    }
    /**
     * Check
     * @returns any Successful Response
     * @throws ApiError
     */
    public static checkCheckGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/check',
        });
    }
    /**
     * List Scopes
     * @param identityIdentifier
     * @returns string Successful Response
     * @throws ApiError
     */
    public static listScopesIdentitiesIdentityIdentifierScopesGet(
        identityIdentifier: any,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identities/{identity_identifier}/scopes',
            path: {
                'identity_identifier': identityIdentifier,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Check Existence
     * @param scopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static checkExistenceExistsScopedKeyGet(
        scopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exists/{scoped_key}',
            path: {
                'scoped_key': scopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Network
     * @returns ScopedKey Successful Response
     * @throws ApiError
     */
    public static createNetworkNetworksPost(): CancelablePromise<ScopedKey> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks',
        });
    }
    /**
     * Query Networks
     * @param name
     * @param state
     * @param org
     * @param campaign
     * @param project
     * @returns any Successful Response
     * @throws ApiError
     */
    public static queryNetworksNetworksGet(
        name?: string,
        state?: string,
        org?: string,
        campaign?: string,
        project?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks',
            query: {
                'name': name,
                'state': state,
                'org': org,
                'campaign': campaign,
                'project': project,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Networks State
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setNetworksStateBulkNetworksStateSetPost(
        requestBody: Body_set_networks_state_bulk_networks_state_set_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/state/set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Networks State
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworksStateBulkNetworksStateGetPost(
        requestBody: Body_get_networks_state_bulk_networks_state_get_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/state/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Query Transformations
     * @param name
     * @param org
     * @param campaign
     * @param project
     * @returns any Successful Response
     * @throws ApiError
     */
    public static queryTransformationsTransformationsGet(
        name?: string,
        org?: string,
        campaign?: string,
        project?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations',
            query: {
                'name': name,
                'org': org,
                'campaign': campaign,
                'project': project,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Query Chemicalsystems
     * @param name
     * @param org
     * @param campaign
     * @param project
     * @returns any Successful Response
     * @throws ApiError
     */
    public static queryChemicalsystemsChemicalsystemsGet(
        name?: string,
        org?: string,
        campaign?: string,
        project?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chemicalsystems',
            query: {
                'name': name,
                'org': org,
                'campaign': campaign,
                'project': project,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network Transformations
     * @param networkScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworkTransformationsNetworksNetworkScopedKeyTransformationsGet(
        networkScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}/transformations',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation Networks
     * @param transformationScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationNetworksTransformationsTransformationScopedKeyNetworksGet(
        transformationScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/networks',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network Chemicalsystems
     * @param networkScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworkChemicalsystemsNetworksNetworkScopedKeyChemicalsystemsGet(
        networkScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}/chemicalsystems',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Chemicalsystem Networks
     * @param chemicalsystemScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getChemicalsystemNetworksChemicalsystemsChemicalsystemScopedKeyNetworksGet(
        chemicalsystemScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chemicalsystems/{chemicalsystem_scoped_key}/networks',
            path: {
                'chemicalsystem_scoped_key': chemicalsystemScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation Chemicalsystems
     * @param transformationScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationChemicalsystemsTransformationsTransformationScopedKeyChemicalsystemsGet(
        transformationScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/chemicalsystems',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Chemicalsystem Transformations
     * @param chemicalsystemScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getChemicalsystemTransformationsChemicalsystemsChemicalsystemScopedKeyTransformationsGet(
        chemicalsystemScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chemicalsystems/{chemicalsystem_scoped_key}/transformations',
            path: {
                'chemicalsystem_scoped_key': chemicalsystemScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network
     * @param networkScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworkNetworksNetworkScopedKeyGet(
        networkScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation
     * @param transformationScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationTransformationsTransformationScopedKeyGet(
        transformationScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Chemicalsystem
     * @param chemicalsystemScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getChemicalsystemChemicalsystemsChemicalsystemScopedKeyGet(
        chemicalsystemScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chemicalsystems/{chemicalsystem_scoped_key}',
            path: {
                'chemicalsystem_scoped_key': chemicalsystemScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Tasks
     * @param transformationScopedKey
     * @param requestBody
     * @returns string Successful Response
     * @throws ApiError
     */
    public static createTasksTransformationsTransformationScopedKeyTasksPost(
        transformationScopedKey: any,
        requestBody: Body_create_tasks_transformations__transformation_scoped_key__tasks_post,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/transformations/{transformation_scoped_key}/tasks',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation Tasks
     * @param transformationScopedKey
     * @param _extends
     * @param returnAs
     * @param status
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationTasksTransformationsTransformationScopedKeyTasksGet(
        transformationScopedKey: any,
        _extends?: string,
        returnAs: string = 'list',
        status?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/tasks',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            query: {
                'extends': _extends,
                'return_as': returnAs,
                'status': status,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Transformations Tasks
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createTransformationsTasksBulkTransformationsTasksCreatePost(
        requestBody: Body_create_transformations_tasks_bulk_transformations_tasks_create_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/transformations/tasks/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Query Tasks
     * @param status
     * @param org
     * @param campaign
     * @param project
     * @returns any Successful Response
     * @throws ApiError
     */
    public static queryTasksTasksGet(
        status?: string,
        org?: string,
        campaign?: string,
        project?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks',
            query: {
                'status': status,
                'org': org,
                'campaign': campaign,
                'project': project,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network Tasks
     * @param networkScopedKey
     * @param status
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworkTasksNetworksNetworkScopedKeyTasksGet(
        networkScopedKey: any,
        status?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}/tasks',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            query: {
                'status': status,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Networks
     * @param taskScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTaskNetworksTasksTaskScopedKeyNetworksGet(
        taskScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{task_scoped_key}/networks',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Scope Status
     * @param scope
     * @param networkState
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getScopeStatusScopesScopeStatusGet(
        scope: any,
        networkState?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/scopes/{scope}/status',
            path: {
                'scope': scope,
            },
            query: {
                'network_state': networkState,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network Status
     * @param networkScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworkStatusNetworksNetworkScopedKeyStatusGet(
        networkScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}/status',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Networks Status
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getNetworksStatusBulkNetworksStatusPost(
        requestBody: Body_get_networks_status_bulk_networks_status_post,
    ): CancelablePromise<Array<Record<string, number>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/status',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation Status
     * @param transformationScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationStatusTransformationsTransformationScopedKeyStatusGet(
        transformationScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/status',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network Actioned Tasks
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworkActionedTasksNetworksNetworkScopedKeyTasksActionedPost(
        networkScopedKey: any,
        requestBody: Body_get_network_actioned_tasks_networks__network_scoped_key__tasks_actioned_post,
    ): CancelablePromise<(Record<string, number> | Array<string>)> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/tasks/actioned',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Networks Actioned Tasks
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNetworksActionedTasksBulkNetworksTasksActionedPost(
        requestBody: Body_get_networks_actioned_tasks_bulk_networks_tasks_actioned_post,
    ): CancelablePromise<Array<(Record<string, number> | Array<string>)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/tasks/actioned',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Actioned Networks
     * @param taskScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTaskActionedNetworksTasksTaskScopedKeyNetworksActionedPost(
        taskScopedKey: any,
        requestBody: Body_get_task_actioned_networks_tasks__task_scoped_key__networks_actioned_post,
    ): CancelablePromise<(Record<string, number> | Array<string>)> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{task_scoped_key}/networks/actioned',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Action Tasks
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static actionTasksNetworksNetworkScopedKeyTasksActionPost(
        networkScopedKey: any,
        requestBody: Body_action_tasks_networks__network_scoped_key__tasks_action_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/tasks/action',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Network Weight
     * @param networkScopedKey
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getNetworkWeightNetworksNetworkScopedKeyWeightGet(
        networkScopedKey: any,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}/weight',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Network Weight
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setNetworkWeightNetworksNetworkScopedKeyWeightPost(
        networkScopedKey: any,
        requestBody: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/weight',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Networks Weight
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getNetworksWeightBulkNetworksWeightGetPost(
        requestBody: Body_get_networks_weight_bulk_networks_weight_get_post,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/weight/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Networks Weight
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setNetworksWeightBulkNetworksWeightSetPost(
        requestBody: Body_set_networks_weight_bulk_networks_weight_set_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/weight/set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Cancel Tasks
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static cancelTasksNetworksNetworkScopedKeyTasksCancelPost(
        networkScopedKey: any,
        requestBody: Body_cancel_tasks_networks__network_scoped_key__tasks_cancel_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/tasks/cancel',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Tasks Priority Get
     * @param requestBody
     * @returns number Successful Response
     * @throws ApiError
     */
    public static tasksPriorityGetBulkTasksPriorityGetPost(
        requestBody: Body_tasks_priority_get_bulk_tasks_priority_get_post,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/tasks/priority/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Tasks Priority Set
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tasksPrioritySetBulkTasksPrioritySetPost(
        requestBody: Body_tasks_priority_set_bulk_tasks_priority_set_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/tasks/priority/set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Tasks Status Get
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tasksStatusGetBulkTasksStatusGetPost(
        requestBody: Body_tasks_status_get_bulk_tasks_status_get_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/tasks/status/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Tasks Status Set
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tasksStatusSetBulkTasksStatusSetPost(
        requestBody: Body_tasks_status_set_bulk_tasks_status_set_post,
    ): CancelablePromise<Array<(string | null)>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/tasks/status/set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Task Status
     * @param taskScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setTaskStatusTasksTaskScopedKeyStatusPost(
        taskScopedKey: any,
        requestBody: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{task_scoped_key}/status',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Status
     * @param taskScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTaskStatusTasksTaskScopedKeyStatusGet(
        taskScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{task_scoped_key}/status',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Transformation
     * @param taskScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTaskTransformationTasksTaskScopedKeyTransformationGet(
        taskScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{task_scoped_key}/transformation',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Task Restart Patterns
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addTaskRestartPatternsNetworksNetworkScopedKeyRestartpatternsAddPost(
        networkScopedKey: string,
        requestBody: Body_add_task_restart_patterns_networks__network_scoped_key__restartpatterns_add_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/restartpatterns/add',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Task Restart Patterns
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static removeTaskRestartPatternsNetworksNetworkScopedKeyRestartpatternsRemovePost(
        networkScopedKey: string,
        requestBody: Body_remove_task_restart_patterns_networks__network_scoped_key__restartpatterns_remove_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/restartpatterns/remove',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Clear Task Restart Patterns
     * @param networkScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static clearTaskRestartPatternsNetworksNetworkScopedKeyRestartpatternsClearGet(
        networkScopedKey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/networks/{network_scoped_key}/restartpatterns/clear',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Restart Patterns
     * @param requestBody
     * @returns any[] Successful Response
     * @throws ApiError
     */
    public static getTaskRestartPatternsBulkNetworksRestartpatternsGetPost(
        requestBody: Body_get_task_restart_patterns_bulk_networks_restartpatterns_get_post,
    ): CancelablePromise<Record<string, Array<any[]>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bulk/networks/restartpatterns/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Task Restart Patterns Max Retries
     * @param networkScopedKey
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setTaskRestartPatternsMaxRetriesNetworksNetworkScopedKeyRestartpatternsMaxretriesPost(
        networkScopedKey: string,
        requestBody: Body_set_task_restart_patterns_max_retries_networks__network_scoped_key__restartpatterns_maxretries_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/networks/{network_scoped_key}/restartpatterns/maxretries',
            path: {
                'network_scoped_key': networkScopedKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation Results
     * @param transformationScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationResultsTransformationsTransformationScopedKeyResultsGet(
        transformationScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/results',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Transformation Failures
     * @param transformationScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTransformationFailuresTransformationsTransformationScopedKeyFailuresGet(
        transformationScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/failures',
            path: {
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Protocoldagresult
     * @param protocoldagresultrefScopedKey
     * @param route
     * @param transformationScopedKey
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getProtocoldagresultTransformationsTransformationScopedKeyRouteProtocoldagresultrefScopedKeyGet(
        protocoldagresultrefScopedKey: any,
        route: any,
        transformationScopedKey: any,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/transformations/{transformation_scoped_key}/{route}/{protocoldagresultref_scoped_key}',
            path: {
                'protocoldagresultref_scoped_key': protocoldagresultrefScopedKey,
                'route': route,
                'transformation_scoped_key': transformationScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Results
     * @param taskScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTaskResultsTasksTaskScopedKeyResultsGet(
        taskScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{task_scoped_key}/results',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Task Failures
     * @param taskScopedKey
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTaskFailuresTasksTaskScopedKeyFailuresGet(
        taskScopedKey: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{task_scoped_key}/failures',
            path: {
                'task_scoped_key': taskScopedKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Network Strategy
     * Set a Strategy for the given AlchemicalNetwork.
     *
     * Expected request body:
     * {
         * "strategy": {...},  // GUFE strategy object, or null to remove
         * "max_tasks_per_transformation": 3,
         * "task_scaling": "exponential",
         * "mode": "partial",
         * "sleep_interval": 3600
         * }
         * @param networkScopedKey
         * @returns any Successful Response
         * @throws ApiError
         */
        public static setNetworkStrategyNetworksNetworkScopedKeyStrategyPost(
            networkScopedKey: any,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/networks/{network_scoped_key}/strategy',
                path: {
                    'network_scoped_key': networkScopedKey,
                },
                errors: {
                    422: `Validation Error`,
                },
            });
        }
        /**
         * Get Network Strategy
         * Get the Strategy for the given AlchemicalNetwork.
         * @param networkScopedKey
         * @returns any Successful Response
         * @throws ApiError
         */
        public static getNetworkStrategyNetworksNetworkScopedKeyStrategyGet(
            networkScopedKey: string,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/networks/{network_scoped_key}/strategy',
                path: {
                    'network_scoped_key': networkScopedKey,
                },
                errors: {
                    422: `Validation Error`,
                },
            });
        }
        /**
         * Get Network Strategy State
         * Get the StrategyState for the given AlchemicalNetwork.
         * @param networkScopedKey
         * @returns any Successful Response
         * @throws ApiError
         */
        public static getNetworkStrategyStateNetworksNetworkScopedKeyStrategyStateGet(
            networkScopedKey: string,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/networks/{network_scoped_key}/strategy/state',
                path: {
                    'network_scoped_key': networkScopedKey,
                },
                errors: {
                    422: `Validation Error`,
                },
            });
        }
        /**
         * Get Network Strategy Status
         * Get the status of the Strategy for the given AlchemicalNetwork.
         * @param networkScopedKey
         * @returns any Successful Response
         * @throws ApiError
         */
        public static getNetworkStrategyStatusNetworksNetworkScopedKeyStrategyStatusGet(
            networkScopedKey: string,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/networks/{network_scoped_key}/strategy/status',
                path: {
                    'network_scoped_key': networkScopedKey,
                },
                errors: {
                    422: `Validation Error`,
                },
            });
        }
        /**
         * Set Network Strategy Awake
         * Set the Strategy status to 'awake' for the given AlchemicalNetwork.
         * @param networkScopedKey
         * @returns any Successful Response
         * @throws ApiError
         */
        public static setNetworkStrategyAwakeNetworksNetworkScopedKeyStrategyAwakePost(
            networkScopedKey: string,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/networks/{network_scoped_key}/strategy/awake',
                path: {
                    'network_scoped_key': networkScopedKey,
                },
                errors: {
                    422: `Validation Error`,
                },
            });
        }
    }
