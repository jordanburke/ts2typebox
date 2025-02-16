import minimist from "minimist";
declare const readCliOptions: () => minimist.ParsedArgs;
/**
 * This functions is executed when running schema2typebox via the cli.
 *
 * @param getCliOptionsFn This function was added to be able to overwrite the
 * default behaviour of reading in the cli options in order to make them easily
 * testable by bassing a custom readCliOptions function.
 */
export declare const runCli: (getCliOptionsFn?: typeof readCliOptions) => Promise<boolean | (NodeJS.WriteStream & {
    fd: 1;
}) | import("fs").WriteStream>;
/**
 * Declaring this as function in order to make it better testable.
 * Using an object to be able to mock it and track its usage.
 */
export declare const getHelpText: {
    run: () => string;
};
export {};
