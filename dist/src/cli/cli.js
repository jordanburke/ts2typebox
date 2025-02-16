"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpText = exports.runCli = void 0;
const node_fs_1 = require("node:fs");
const node_stream_1 = require("node:stream");
const minimist_1 = __importDefault(require("minimist"));
const package_json_1 = __importDefault(require("../../package.json"));
const programmatic_usage_1 = require("../programmatic-usage");
const readCliOptions = () => {
    return (0, minimist_1.default)(process.argv.slice(2), {
        alias: {
            input: "i",
            output: "o",
            help: "h",
        },
        default: {
            input: "types.ts",
            output: "generated-types.ts",
        },
    });
};
/**
 * This functions is executed when running schema2typebox via the cli.
 *
 * @param getCliOptionsFn This function was added to be able to overwrite the
 * default behaviour of reading in the cli options in order to make them easily
 * testable by bassing a custom readCliOptions function.
 */
const runCli = async (getCliOptionsFn = readCliOptions) => {
    const args = getCliOptionsFn();
    // TODO: narrow condition.
    if (args.help) {
        return process.stdout.write(exports.getHelpText.run());
    }
    const inputPath = process.cwd() + `/${args.input ?? "schema.json"}`;
    const inputFileAsString = (0, node_fs_1.readFileSync)(inputPath, "utf-8");
    const typeboxCode = await (0, programmatic_usage_1.ts2typebox)({
        input: inputFileAsString,
        disableAutogenComment: args["disable-autogen-comment"],
        skipTypeCreation: args["skip-type-creation"],
    });
    const generatedCodeStream = node_stream_1.Readable.from(typeboxCode.split(/(\r\n|\r|\n)/));
    if (args["output-stdout"]) {
        return generatedCodeStream.pipe(process.stdout);
    }
    const outputPath = process.cwd() + `/${args.output ?? "generated-typebox.ts"}`;
    return generatedCodeStream.pipe((0, node_fs_1.createWriteStream)(outputPath));
};
exports.runCli = runCli;
/**
 * Declaring this as function in order to make it better testable.
 * Using an object to be able to mock it and track its usage.
 */
exports.getHelpText = {
    run: () => {
        return `
    ts2typebox generates TypeBox code from Typescript code.
    Version: ${package_json_1.default.version}

    Usage:

    ts2typebox [ARGUMENTS]

    Arguments:

    -h, --help
       Displays this menu.

    -i, --input
       Specifies the relative path to the file containing the typescript types
       that will be used to generated typebox types. Defaults to "types.ts".

    -o, --output
       Specifies the relative path to generated file that will contain the
       typebox types. Defaults to "generated-types.ts".

    --output-stdout
       Does not generate an output file and prints the generated code to stdout
       instead. Has precedence over -o/--output.

    --disable-autogen-comment
       When used, it does not add the comment at the beginning of the generated
       file which is stating that the code was automatically generated.

    --skip-type-creation
      When used, strips all types from the generated code. This can be helpful
      if you want to use your Typescript types inside your input file (which
      probably contains comments) as source of truth and still use the generated
      TypeBox code (schema validators) to validate data based on these types.
      When using this option you probably want to also provide a custom
      transformValue function since two same symbols can't be imported from two
      different files. For an example take a look inside the repo under
      ./examples/skip-type-creation.

    Additional:

    Transformations

    You can adapt the names of the generated types (as well as the names of the
    generated values) using custom transformation functions which take a string
    as an input and return a string as their output. These will run on each of
    the generated types and values, respectively. Please take a look inside the
    repo under ./examples/transform-value-transform-type for an example of this.

    Formatting

    The generated output is formatted based on the prettier config inside your
    repo (or the default one, if you don't have one).
   `;
    },
};
//# sourceMappingURL=cli.js.map