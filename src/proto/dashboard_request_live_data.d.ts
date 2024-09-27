import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a DashboardRequestLiveData. */
export interface IDashboardRequestLiveData {

    /** DashboardRequestLiveData requestId */
    requestId: number;

    /** DashboardRequestLiveData requestStatus */
    requestStatus: string;
}

/** Represents a DashboardRequestLiveData. */
export class DashboardRequestLiveData implements IDashboardRequestLiveData {

    /**
     * Constructs a new DashboardRequestLiveData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDashboardRequestLiveData);

    /** DashboardRequestLiveData requestId. */
    public requestId: number;

    /** DashboardRequestLiveData requestStatus. */
    public requestStatus: string;

    /**
     * Creates a new DashboardRequestLiveData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DashboardRequestLiveData instance
     */
    public static create(properties?: IDashboardRequestLiveData): DashboardRequestLiveData;

    /**
     * Encodes the specified DashboardRequestLiveData message. Does not implicitly {@link DashboardRequestLiveData.verify|verify} messages.
     * @param message DashboardRequestLiveData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDashboardRequestLiveData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DashboardRequestLiveData message, length delimited. Does not implicitly {@link DashboardRequestLiveData.verify|verify} messages.
     * @param message DashboardRequestLiveData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDashboardRequestLiveData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DashboardRequestLiveData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DashboardRequestLiveData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DashboardRequestLiveData;

    /**
     * Decodes a DashboardRequestLiveData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DashboardRequestLiveData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DashboardRequestLiveData;

    /**
     * Verifies a DashboardRequestLiveData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DashboardRequestLiveData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DashboardRequestLiveData
     */
    public static fromObject(object: { [k: string]: any }): DashboardRequestLiveData;

    /**
     * Creates a plain object from a DashboardRequestLiveData message. Also converts values to other types if specified.
     * @param message DashboardRequestLiveData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DashboardRequestLiveData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DashboardRequestLiveData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DashboardRequestLiveData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
