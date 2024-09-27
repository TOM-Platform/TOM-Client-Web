/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const DashboardRequestLiveData = $root.DashboardRequestLiveData = (() => {

    /**
     * Properties of a DashboardRequestLiveData.
     * @exports IDashboardRequestLiveData
     * @interface IDashboardRequestLiveData
     * @property {number} requestId DashboardRequestLiveData requestId
     * @property {string} requestStatus DashboardRequestLiveData requestStatus
     */

    /**
     * Constructs a new DashboardRequestLiveData.
     * @exports DashboardRequestLiveData
     * @classdesc Represents a DashboardRequestLiveData.
     * @implements IDashboardRequestLiveData
     * @constructor
     * @param {IDashboardRequestLiveData=} [properties] Properties to set
     */
    function DashboardRequestLiveData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DashboardRequestLiveData requestId.
     * @member {number} requestId
     * @memberof DashboardRequestLiveData
     * @instance
     */
    DashboardRequestLiveData.prototype.requestId = 0;

    /**
     * DashboardRequestLiveData requestStatus.
     * @member {string} requestStatus
     * @memberof DashboardRequestLiveData
     * @instance
     */
    DashboardRequestLiveData.prototype.requestStatus = "";

    /**
     * Creates a new DashboardRequestLiveData instance using the specified properties.
     * @function create
     * @memberof DashboardRequestLiveData
     * @static
     * @param {IDashboardRequestLiveData=} [properties] Properties to set
     * @returns {DashboardRequestLiveData} DashboardRequestLiveData instance
     */
    DashboardRequestLiveData.create = function create(properties) {
        return new DashboardRequestLiveData(properties);
    };

    /**
     * Encodes the specified DashboardRequestLiveData message. Does not implicitly {@link DashboardRequestLiveData.verify|verify} messages.
     * @function encode
     * @memberof DashboardRequestLiveData
     * @static
     * @param {IDashboardRequestLiveData} message DashboardRequestLiveData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DashboardRequestLiveData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.requestId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.requestStatus);
        return writer;
    };

    /**
     * Encodes the specified DashboardRequestLiveData message, length delimited. Does not implicitly {@link DashboardRequestLiveData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DashboardRequestLiveData
     * @static
     * @param {IDashboardRequestLiveData} message DashboardRequestLiveData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DashboardRequestLiveData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DashboardRequestLiveData message from the specified reader or buffer.
     * @function decode
     * @memberof DashboardRequestLiveData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DashboardRequestLiveData} DashboardRequestLiveData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DashboardRequestLiveData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DashboardRequestLiveData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.requestId = reader.int32();
                    break;
                }
            case 2: {
                    message.requestStatus = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("requestId"))
            throw $util.ProtocolError("missing required 'requestId'", { instance: message });
        if (!message.hasOwnProperty("requestStatus"))
            throw $util.ProtocolError("missing required 'requestStatus'", { instance: message });
        return message;
    };

    /**
     * Decodes a DashboardRequestLiveData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DashboardRequestLiveData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DashboardRequestLiveData} DashboardRequestLiveData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DashboardRequestLiveData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DashboardRequestLiveData message.
     * @function verify
     * @memberof DashboardRequestLiveData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DashboardRequestLiveData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.requestId))
            return "requestId: integer expected";
        if (!$util.isString(message.requestStatus))
            return "requestStatus: string expected";
        return null;
    };

    /**
     * Creates a DashboardRequestLiveData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DashboardRequestLiveData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DashboardRequestLiveData} DashboardRequestLiveData
     */
    DashboardRequestLiveData.fromObject = function fromObject(object) {
        if (object instanceof $root.DashboardRequestLiveData)
            return object;
        let message = new $root.DashboardRequestLiveData();
        if (object.requestId != null)
            message.requestId = object.requestId | 0;
        if (object.requestStatus != null)
            message.requestStatus = String(object.requestStatus);
        return message;
    };

    /**
     * Creates a plain object from a DashboardRequestLiveData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DashboardRequestLiveData
     * @static
     * @param {DashboardRequestLiveData} message DashboardRequestLiveData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DashboardRequestLiveData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.requestId = 0;
            object.requestStatus = "";
        }
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = message.requestId;
        if (message.requestStatus != null && message.hasOwnProperty("requestStatus"))
            object.requestStatus = message.requestStatus;
        return object;
    };

    /**
     * Converts this DashboardRequestLiveData to JSON.
     * @function toJSON
     * @memberof DashboardRequestLiveData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DashboardRequestLiveData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DashboardRequestLiveData
     * @function getTypeUrl
     * @memberof DashboardRequestLiveData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DashboardRequestLiveData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DashboardRequestLiveData";
    };

    return DashboardRequestLiveData;
})();

export { $root as default };
