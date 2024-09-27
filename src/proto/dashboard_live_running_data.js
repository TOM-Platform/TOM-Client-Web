/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const DashboardLiveRunningData = $root.DashboardLiveRunningData = (() => {

    /**
     * Properties of a DashboardLiveRunningData.
     * @exports IDashboardLiveRunningData
     * @interface IDashboardLiveRunningData
     * @property {number|Long} timestamp DashboardLiveRunningData timestamp
     * @property {number|Long} startTime DashboardLiveRunningData startTime
     * @property {number} calories DashboardLiveRunningData calories
     * @property {number} heartRate DashboardLiveRunningData heartRate
     * @property {number} distance DashboardLiveRunningData distance
     * @property {number} speed DashboardLiveRunningData speed
     * @property {number} avgSpeed DashboardLiveRunningData avgSpeed
     * @property {number} bearing DashboardLiveRunningData bearing
     * @property {number} currLat DashboardLiveRunningData currLat
     * @property {number} currLng DashboardLiveRunningData currLng
     */

    /**
     * Constructs a new DashboardLiveRunningData.
     * @exports DashboardLiveRunningData
     * @classdesc Represents a DashboardLiveRunningData.
     * @implements IDashboardLiveRunningData
     * @constructor
     * @param {IDashboardLiveRunningData=} [properties] Properties to set
     */
    function DashboardLiveRunningData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DashboardLiveRunningData timestamp.
     * @member {number|Long} timestamp
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * DashboardLiveRunningData startTime.
     * @member {number|Long} startTime
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * DashboardLiveRunningData calories.
     * @member {number} calories
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.calories = 0;

    /**
     * DashboardLiveRunningData heartRate.
     * @member {number} heartRate
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.heartRate = 0;

    /**
     * DashboardLiveRunningData distance.
     * @member {number} distance
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.distance = 0;

    /**
     * DashboardLiveRunningData speed.
     * @member {number} speed
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.speed = 0;

    /**
     * DashboardLiveRunningData avgSpeed.
     * @member {number} avgSpeed
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.avgSpeed = 0;

    /**
     * DashboardLiveRunningData bearing.
     * @member {number} bearing
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.bearing = 0;

    /**
     * DashboardLiveRunningData currLat.
     * @member {number} currLat
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.currLat = 0;

    /**
     * DashboardLiveRunningData currLng.
     * @member {number} currLng
     * @memberof DashboardLiveRunningData
     * @instance
     */
    DashboardLiveRunningData.prototype.currLng = 0;

    /**
     * Creates a new DashboardLiveRunningData instance using the specified properties.
     * @function create
     * @memberof DashboardLiveRunningData
     * @static
     * @param {IDashboardLiveRunningData=} [properties] Properties to set
     * @returns {DashboardLiveRunningData} DashboardLiveRunningData instance
     */
    DashboardLiveRunningData.create = function create(properties) {
        return new DashboardLiveRunningData(properties);
    };

    /**
     * Encodes the specified DashboardLiveRunningData message. Does not implicitly {@link DashboardLiveRunningData.verify|verify} messages.
     * @function encode
     * @memberof DashboardLiveRunningData
     * @static
     * @param {IDashboardLiveRunningData} message DashboardLiveRunningData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DashboardLiveRunningData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.startTime);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.calories);
        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.heartRate);
        writer.uint32(/* id 5, wireType 5 =*/45).float(message.distance);
        writer.uint32(/* id 6, wireType 5 =*/53).float(message.speed);
        writer.uint32(/* id 7, wireType 5 =*/61).float(message.avgSpeed);
        writer.uint32(/* id 8, wireType 0 =*/64).int32(message.bearing);
        writer.uint32(/* id 9, wireType 1 =*/73).double(message.currLat);
        writer.uint32(/* id 10, wireType 1 =*/81).double(message.currLng);
        return writer;
    };

    /**
     * Encodes the specified DashboardLiveRunningData message, length delimited. Does not implicitly {@link DashboardLiveRunningData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DashboardLiveRunningData
     * @static
     * @param {IDashboardLiveRunningData} message DashboardLiveRunningData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DashboardLiveRunningData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DashboardLiveRunningData message from the specified reader or buffer.
     * @function decode
     * @memberof DashboardLiveRunningData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DashboardLiveRunningData} DashboardLiveRunningData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DashboardLiveRunningData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DashboardLiveRunningData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.timestamp = reader.int64();
                    break;
                }
            case 2: {
                    message.startTime = reader.int64();
                    break;
                }
            case 3: {
                    message.calories = reader.int32();
                    break;
                }
            case 4: {
                    message.heartRate = reader.int32();
                    break;
                }
            case 5: {
                    message.distance = reader.float();
                    break;
                }
            case 6: {
                    message.speed = reader.float();
                    break;
                }
            case 7: {
                    message.avgSpeed = reader.float();
                    break;
                }
            case 8: {
                    message.bearing = reader.int32();
                    break;
                }
            case 9: {
                    message.currLat = reader.double();
                    break;
                }
            case 10: {
                    message.currLng = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("timestamp"))
            throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
        if (!message.hasOwnProperty("startTime"))
            throw $util.ProtocolError("missing required 'startTime'", { instance: message });
        if (!message.hasOwnProperty("calories"))
            throw $util.ProtocolError("missing required 'calories'", { instance: message });
        if (!message.hasOwnProperty("heartRate"))
            throw $util.ProtocolError("missing required 'heartRate'", { instance: message });
        if (!message.hasOwnProperty("distance"))
            throw $util.ProtocolError("missing required 'distance'", { instance: message });
        if (!message.hasOwnProperty("speed"))
            throw $util.ProtocolError("missing required 'speed'", { instance: message });
        if (!message.hasOwnProperty("avgSpeed"))
            throw $util.ProtocolError("missing required 'avgSpeed'", { instance: message });
        if (!message.hasOwnProperty("bearing"))
            throw $util.ProtocolError("missing required 'bearing'", { instance: message });
        if (!message.hasOwnProperty("currLat"))
            throw $util.ProtocolError("missing required 'currLat'", { instance: message });
        if (!message.hasOwnProperty("currLng"))
            throw $util.ProtocolError("missing required 'currLng'", { instance: message });
        return message;
    };

    /**
     * Decodes a DashboardLiveRunningData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DashboardLiveRunningData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DashboardLiveRunningData} DashboardLiveRunningData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DashboardLiveRunningData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DashboardLiveRunningData message.
     * @function verify
     * @memberof DashboardLiveRunningData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DashboardLiveRunningData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
            return "timestamp: integer|Long expected";
        if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
            return "startTime: integer|Long expected";
        if (!$util.isInteger(message.calories))
            return "calories: integer expected";
        if (!$util.isInteger(message.heartRate))
            return "heartRate: integer expected";
        if (typeof message.distance !== "number")
            return "distance: number expected";
        if (typeof message.speed !== "number")
            return "speed: number expected";
        if (typeof message.avgSpeed !== "number")
            return "avgSpeed: number expected";
        if (!$util.isInteger(message.bearing))
            return "bearing: integer expected";
        if (typeof message.currLat !== "number")
            return "currLat: number expected";
        if (typeof message.currLng !== "number")
            return "currLng: number expected";
        return null;
    };

    /**
     * Creates a DashboardLiveRunningData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DashboardLiveRunningData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DashboardLiveRunningData} DashboardLiveRunningData
     */
    DashboardLiveRunningData.fromObject = function fromObject(object) {
        if (object instanceof $root.DashboardLiveRunningData)
            return object;
        let message = new $root.DashboardLiveRunningData();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.startTime != null)
            if ($util.Long)
                (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
            else if (typeof object.startTime === "string")
                message.startTime = parseInt(object.startTime, 10);
            else if (typeof object.startTime === "number")
                message.startTime = object.startTime;
            else if (typeof object.startTime === "object")
                message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
        if (object.calories != null)
            message.calories = object.calories | 0;
        if (object.heartRate != null)
            message.heartRate = object.heartRate | 0;
        if (object.distance != null)
            message.distance = Number(object.distance);
        if (object.speed != null)
            message.speed = Number(object.speed);
        if (object.avgSpeed != null)
            message.avgSpeed = Number(object.avgSpeed);
        if (object.bearing != null)
            message.bearing = object.bearing | 0;
        if (object.currLat != null)
            message.currLat = Number(object.currLat);
        if (object.currLng != null)
            message.currLng = Number(object.currLng);
        return message;
    };

    /**
     * Creates a plain object from a DashboardLiveRunningData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DashboardLiveRunningData
     * @static
     * @param {DashboardLiveRunningData} message DashboardLiveRunningData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DashboardLiveRunningData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.startTime = options.longs === String ? "0" : 0;
            object.calories = 0;
            object.heartRate = 0;
            object.distance = 0;
            object.speed = 0;
            object.avgSpeed = 0;
            object.bearing = 0;
            object.currLat = 0;
            object.currLng = 0;
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            if (typeof message.startTime === "number")
                object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
            else
                object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
        if (message.calories != null && message.hasOwnProperty("calories"))
            object.calories = message.calories;
        if (message.heartRate != null && message.hasOwnProperty("heartRate"))
            object.heartRate = message.heartRate;
        if (message.distance != null && message.hasOwnProperty("distance"))
            object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
        if (message.speed != null && message.hasOwnProperty("speed"))
            object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
        if (message.avgSpeed != null && message.hasOwnProperty("avgSpeed"))
            object.avgSpeed = options.json && !isFinite(message.avgSpeed) ? String(message.avgSpeed) : message.avgSpeed;
        if (message.bearing != null && message.hasOwnProperty("bearing"))
            object.bearing = message.bearing;
        if (message.currLat != null && message.hasOwnProperty("currLat"))
            object.currLat = options.json && !isFinite(message.currLat) ? String(message.currLat) : message.currLat;
        if (message.currLng != null && message.hasOwnProperty("currLng"))
            object.currLng = options.json && !isFinite(message.currLng) ? String(message.currLng) : message.currLng;
        return object;
    };

    /**
     * Converts this DashboardLiveRunningData to JSON.
     * @function toJSON
     * @memberof DashboardLiveRunningData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DashboardLiveRunningData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DashboardLiveRunningData
     * @function getTypeUrl
     * @memberof DashboardLiveRunningData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DashboardLiveRunningData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DashboardLiveRunningData";
    };

    return DashboardLiveRunningData;
})();

export { $root as default };
