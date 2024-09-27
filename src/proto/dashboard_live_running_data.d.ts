import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a DashboardLiveRunningData. */
export interface IDashboardLiveRunningData {

    /** DashboardLiveRunningData timestamp */
    timestamp: (number|Long);

    /** DashboardLiveRunningData startTime */
    startTime: (number|Long);

    /** DashboardLiveRunningData calories */
    calories: number;

    /** DashboardLiveRunningData heartRate */
    heartRate: number;

    /** DashboardLiveRunningData distance */
    distance: number;

    /** DashboardLiveRunningData speed */
    speed: number;

    /** DashboardLiveRunningData avgSpeed */
    avgSpeed: number;

    /** DashboardLiveRunningData bearing */
    bearing: number;

    /** DashboardLiveRunningData currLat */
    currLat: number;

    /** DashboardLiveRunningData currLng */
    currLng: number;
}

/** Represents a DashboardLiveRunningData. */
export class DashboardLiveRunningData implements IDashboardLiveRunningData {

    /**
     * Constructs a new DashboardLiveRunningData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDashboardLiveRunningData);

    /** DashboardLiveRunningData timestamp. */
    public timestamp: (number|Long);

    /** DashboardLiveRunningData startTime. */
    public startTime: (number|Long);

    /** DashboardLiveRunningData calories. */
    public calories: number;

    /** DashboardLiveRunningData heartRate. */
    public heartRate: number;

    /** DashboardLiveRunningData distance. */
    public distance: number;

    /** DashboardLiveRunningData speed. */
    public speed: number;

    /** DashboardLiveRunningData avgSpeed. */
    public avgSpeed: number;

    /** DashboardLiveRunningData bearing. */
    public bearing: number;

    /** DashboardLiveRunningData currLat. */
    public currLat: number;

    /** DashboardLiveRunningData currLng. */
    public currLng: number;

    /**
     * Creates a new DashboardLiveRunningData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DashboardLiveRunningData instance
     */
    public static create(properties?: IDashboardLiveRunningData): DashboardLiveRunningData;

    /**
     * Encodes the specified DashboardLiveRunningData message. Does not implicitly {@link DashboardLiveRunningData.verify|verify} messages.
     * @param message DashboardLiveRunningData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDashboardLiveRunningData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DashboardLiveRunningData message, length delimited. Does not implicitly {@link DashboardLiveRunningData.verify|verify} messages.
     * @param message DashboardLiveRunningData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDashboardLiveRunningData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DashboardLiveRunningData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DashboardLiveRunningData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DashboardLiveRunningData;

    /**
     * Decodes a DashboardLiveRunningData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DashboardLiveRunningData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DashboardLiveRunningData;

    /**
     * Verifies a DashboardLiveRunningData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DashboardLiveRunningData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DashboardLiveRunningData
     */
    public static fromObject(object: { [k: string]: any }): DashboardLiveRunningData;

    /**
     * Creates a plain object from a DashboardLiveRunningData message. Also converts values to other types if specified.
     * @param message DashboardLiveRunningData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DashboardLiveRunningData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DashboardLiveRunningData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DashboardLiveRunningData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
