/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const TemplateData = $root.TemplateData = (() => {

    /**
     * Properties of a TemplateData.
     * @exports ITemplateData
     * @interface ITemplateData
     * @property {string|null} [text] TemplateData text
     * @property {Uint8Array|null} [image] TemplateData image
     * @property {string|null} [audioPath] TemplateData audioPath
     */

    /**
     * Constructs a new TemplateData.
     * @exports TemplateData
     * @classdesc Represents a TemplateData.
     * @implements ITemplateData
     * @constructor
     * @param {ITemplateData=} [properties] Properties to set
     */
    function TemplateData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TemplateData text.
     * @member {string} text
     * @memberof TemplateData
     * @instance
     */
    TemplateData.prototype.text = "";

    /**
     * TemplateData image.
     * @member {Uint8Array} image
     * @memberof TemplateData
     * @instance
     */
    TemplateData.prototype.image = $util.newBuffer([]);

    /**
     * TemplateData audioPath.
     * @member {string} audioPath
     * @memberof TemplateData
     * @instance
     */
    TemplateData.prototype.audioPath = "";

    /**
     * Creates a new TemplateData instance using the specified properties.
     * @function create
     * @memberof TemplateData
     * @static
     * @param {ITemplateData=} [properties] Properties to set
     * @returns {TemplateData} TemplateData instance
     */
    TemplateData.create = function create(properties) {
        return new TemplateData(properties);
    };

    /**
     * Encodes the specified TemplateData message. Does not implicitly {@link TemplateData.verify|verify} messages.
     * @function encode
     * @memberof TemplateData
     * @static
     * @param {ITemplateData} message TemplateData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TemplateData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
        if (message.image != null && Object.hasOwnProperty.call(message, "image"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.image);
        if (message.audioPath != null && Object.hasOwnProperty.call(message, "audioPath"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.audioPath);
        return writer;
    };

    /**
     * Encodes the specified TemplateData message, length delimited. Does not implicitly {@link TemplateData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TemplateData
     * @static
     * @param {ITemplateData} message TemplateData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TemplateData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TemplateData message from the specified reader or buffer.
     * @function decode
     * @memberof TemplateData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TemplateData} TemplateData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TemplateData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.TemplateData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.text = reader.string();
                    break;
                }
            case 2: {
                    message.image = reader.bytes();
                    break;
                }
            case 3: {
                    message.audioPath = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TemplateData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TemplateData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TemplateData} TemplateData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TemplateData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TemplateData message.
     * @function verify
     * @memberof TemplateData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TemplateData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        if (message.image != null && message.hasOwnProperty("image"))
            if (!(message.image && typeof message.image.length === "number" || $util.isString(message.image)))
                return "image: buffer expected";
        if (message.audioPath != null && message.hasOwnProperty("audioPath"))
            if (!$util.isString(message.audioPath))
                return "audioPath: string expected";
        return null;
    };

    /**
     * Creates a TemplateData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TemplateData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TemplateData} TemplateData
     */
    TemplateData.fromObject = function fromObject(object) {
        if (object instanceof $root.TemplateData)
            return object;
        let message = new $root.TemplateData();
        if (object.text != null)
            message.text = String(object.text);
        if (object.image != null)
            if (typeof object.image === "string")
                $util.base64.decode(object.image, message.image = $util.newBuffer($util.base64.length(object.image)), 0);
            else if (object.image.length >= 0)
                message.image = object.image;
        if (object.audioPath != null)
            message.audioPath = String(object.audioPath);
        return message;
    };

    /**
     * Creates a plain object from a TemplateData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TemplateData
     * @static
     * @param {TemplateData} message TemplateData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TemplateData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.text = "";
            if (options.bytes === String)
                object.image = "";
            else {
                object.image = [];
                if (options.bytes !== Array)
                    object.image = $util.newBuffer(object.image);
            }
            object.audioPath = "";
        }
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        if (message.image != null && message.hasOwnProperty("image"))
            object.image = options.bytes === String ? $util.base64.encode(message.image, 0, message.image.length) : options.bytes === Array ? Array.prototype.slice.call(message.image) : message.image;
        if (message.audioPath != null && message.hasOwnProperty("audioPath"))
            object.audioPath = message.audioPath;
        return object;
    };

    /**
     * Converts this TemplateData to JSON.
     * @function toJSON
     * @memberof TemplateData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TemplateData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for TemplateData
     * @function getTypeUrl
     * @memberof TemplateData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    TemplateData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/TemplateData";
    };

    return TemplateData;
})();

export { $root as default };
