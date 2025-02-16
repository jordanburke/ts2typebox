"use strict";
/*--------------------------------------------------------------------------

@typebox/codegen

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsDoc = void 0;
/** JSDoc Property Parser */
var JsDoc;
(function (JsDoc) {
    function DecodeWithNonQuotedProperties(content) {
        const parseFunction = new Function(`return (${content});`);
        return parseFunction();
    }
    function Decode(content) {
        try {
            return DecodeWithNonQuotedProperties(content);
        }
        catch {
            return content;
        }
    }
    function* ParseValue(key, content) {
        for (let i = 0; i < content.length; i++) {
            if (content[i] === "\n" || content[i] === "-") {
                const value = content.slice(0, i).trim();
                const rest = content.slice(i);
                yield [key, Decode(value)];
                return yield* ParseContent(rest);
            }
        }
    }
    function* ParseKey(content) {
        for (let i = 1; i < content.length; i++) {
            if (content[i] === " ") {
                const key = content.slice(1, i);
                const rest = content.slice(i).trimStart();
                return yield* ParseValue(key, rest);
            }
        }
    }
    function* ParseContent(content) {
        for (let i = 0; i < content.length; i++) {
            if (content[i] === "@") {
                return yield* ParseKey(content.slice(i));
            }
        }
    }
    function Parse(content) {
        const properties = [...ParseContent(content)];
        return properties.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    }
    JsDoc.Parse = Parse;
})(JsDoc || (exports.JsDoc = JsDoc = {}));
//# sourceMappingURL=jsdoc.js.map