/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const SocketData = $root.SocketData = (() => {

    /**
     * Properties of a SocketData.
     * @exports ISocketData
     * @interface ISocketData
     * @property {number|null} [dataType] SocketData dataType
     * @property {Uint8Array|null} [data] SocketData data
     */

    /**
     * Constructs a new SocketData.
     * @exports SocketData
     * @classdesc Represents a SocketData.
     * @implements ISocketData
     * @constructor
     * @param {ISocketData=} [properties] Properties to set
     */
    function SocketData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SocketData dataType.
     * @member {number} dataType
     * @memberof SocketData
     * @instance
     */
    SocketData.prototype.dataType = 0;

    /**
     * SocketData data.
     * @member {Uint8Array} data
     * @memberof SocketData
     * @instance
     */
    SocketData.prototype.data = $util.newBuffer([]);

    /**
     * Creates a new SocketData instance using the specified properties.
     * @function create
     * @memberof SocketData
     * @static
     * @param {ISocketData=} [properties] Properties to set
     * @returns {SocketData} SocketData instance
     */
    SocketData.create = function create(properties) {
        return new SocketData(properties);
    };

    /**
     * Encodes the specified SocketData message. Does not implicitly {@link SocketData.verify|verify} messages.
     * @function encode
     * @memberof SocketData
     * @static
     * @param {ISocketData} message SocketData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SocketData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.dataType);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
        return writer;
    };

    /**
     * Encodes the specified SocketData message, length delimited. Does not implicitly {@link SocketData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SocketData
     * @static
     * @param {ISocketData} message SocketData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SocketData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SocketData message from the specified reader or buffer.
     * @function decode
     * @memberof SocketData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SocketData} SocketData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SocketData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SocketData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.dataType = reader.int32();
                    break;
                }
            case 2: {
                    message.data = reader.bytes();
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
     * Decodes a SocketData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SocketData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SocketData} SocketData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SocketData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SocketData message.
     * @function verify
     * @memberof SocketData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SocketData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.dataType != null && message.hasOwnProperty("dataType"))
            if (!$util.isInteger(message.dataType))
                return "dataType: integer expected";
        if (message.data != null && message.hasOwnProperty("data"))
            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                return "data: buffer expected";
        return null;
    };

    /**
     * Creates a SocketData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SocketData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SocketData} SocketData
     */
    SocketData.fromObject = function fromObject(object) {
        if (object instanceof $root.SocketData)
            return object;
        let message = new $root.SocketData();
        if (object.dataType != null)
            message.dataType = object.dataType | 0;
        if (object.data != null)
            if (typeof object.data === "string")
                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
            else if (object.data.length >= 0)
                message.data = object.data;
        return message;
    };

    /**
     * Creates a plain object from a SocketData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SocketData
     * @static
     * @param {SocketData} message SocketData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SocketData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.dataType = 0;
            if (options.bytes === String)
                object.data = "";
            else {
                object.data = [];
                if (options.bytes !== Array)
                    object.data = $util.newBuffer(object.data);
            }
        }
        if (message.dataType != null && message.hasOwnProperty("dataType"))
            object.dataType = message.dataType;
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
        return object;
    };

    /**
     * Converts this SocketData to JSON.
     * @function toJSON
     * @memberof SocketData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SocketData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SocketData
     * @function getTypeUrl
     * @memberof SocketData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SocketData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SocketData";
    };

    return SocketData;
})();

export { $root as default };
