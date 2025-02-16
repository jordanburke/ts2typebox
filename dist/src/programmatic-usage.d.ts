export type Ts2TypeboxOptions = {
    /**
     * The given Typescript code as utf-8 encoded string.
     */
    input: string;
    /**
     * Removes the comment at the beginning of the generated typebox code which
     * mentions that the code was auto generated and should not be changed since
     * there is a high risk that changes might get lost.
     */
    disableAutogenComment?: true;
    /**
     * Skips the creation of types in the generated file. Only creates the typebox
     * validators containing the JSON schemas based on your typescript types. See
     * the output of ts2typebox -h for more info.
     */
    skipTypeCreation?: boolean;
};
/**
 * Use this function for programmatic usage of ts2typebox. The options are typed
 * and commented.
 *
 * @returns The generated types as string if (outputStdout was set) or undefined
 * otherwise.
 *
 * @throws Error
 **/
export declare const ts2typebox: ({ input, disableAutogenComment, skipTypeCreation, }: Ts2TypeboxOptions) => Promise<string>;
/**
 * Declaring this as function in order to make it better testable.
 * Using an object to be able to mock it and track its usage.
 */
export declare const getHelpText: {
    run: () => string;
};
/**
 * Declaring this as an object with a function in order to make it better
 * testable with mocks. Allows for tracking the call count.
 */
export declare const addCommentThatCodeIsGenerated: {
    run: (code: string) => string;
};
