/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Unique identifier for GufeTokenizables in state store.
 *
 * For this object, `org`, `campaign`, and `project` cannot contain wildcards.
 * In other words, the Scope of a ScopedKey must be *specific*.
 */
export type ScopedKey = {
    /**
     * Generic GufeKey object
     */
    gufe_key: Record<string, any>;
    org: string;
    campaign: string;
    project: string;
};

