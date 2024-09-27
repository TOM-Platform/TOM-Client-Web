/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const RequestData = $root.RequestData = (() => {

    /**
     * Properties of a RequestData.
     * @exports IRequestData
     * @interface IRequestData
     * @property {string|null} [detail] RequestData detail
     */

    /**
     * Constructs a new RequestData.
     * @exports RequestData
     * @classdesc Represents a RequestData.
     * @implements IRequestData
     * @constructor
     * @param {IRequestData=} [properties] Properties to set
     */
    function RequestData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RequestData detail.
     * @member {string} detail
     * @memberof RequestData
     * @instance
     */
    RequestData.prototype.detail = "";

    /**
     * Creates a new RequestData instance using the specified properties.
     * @function create
     * @memberof RequestData
     * @static
     * @param {IRequestData=} [properties] Properties to set
     * @returns {RequestData} RequestData instance
     */
    RequestData.create = function create(properties) {
        return new RequestData(properties);
    };

    /**
     * Encodes the specified RequestData message. Does not implicitly {@link RequestData.verify|verify} messages.
     * @function encode
     * @memberof RequestData
     * @static
     * @param {IRequestData} message RequestData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.detail != null && Object.hasOwnProperty.call(message, "detail"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.detail);
        return writer;
    };

    /**
     * Encodes the specified RequestData message, length delimited. Does not implicitly {@link RequestData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RequestData
     * @static
     * @param {IRequestData} message RequestData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RequestData message from the specified reader or buffer.
     * @function decode
     * @memberof RequestData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RequestData} RequestData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RequestData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.detail = reader.string();
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
     * Decodes a RequestData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RequestData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RequestData} RequestData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RequestData message.
     * @function verify
     * @memberof RequestData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RequestData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.detail != null && message.hasOwnProperty("detail"))
            if (!$util.isString(message.detail))
                return "detail: string expected";
        return null;
    };

    /**
     * Creates a RequestData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RequestData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RequestData} RequestData
     */
    RequestData.fromObject = function fromObject(object) {
        if (object instanceof $root.RequestData)
            return object;
        let message = new $root.RequestData();
        if (object.detail != null)
            message.detail = String(object.detail);
        return message;
    };

    /**
     * Creates a plain object from a RequestData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RequestData
     * @static
     * @param {RequestData} message RequestData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RequestData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.detail = "";
        if (message.detail != null && message.hasOwnProperty("detail"))
            object.detail = message.detail;
        return object;
    };

    /**
     * Converts this RequestData to JSON.
     * @function toJSON
     * @memberof RequestData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RequestData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RequestData
     * @function getTypeUrl
     * @memberof RequestData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RequestData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RequestData";
    };

    return RequestData;
})();

export { $root as default };
