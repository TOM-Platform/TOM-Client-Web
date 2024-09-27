import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a RequestData. */
export interface IRequestData {

    /** RequestData detail */
    detail?: (string|null);
}

/** Represents a RequestData. */
export class RequestData implements IRequestData {

    /**
     * Constructs a new RequestData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRequestData);

    /** RequestData detail. */
    public detail: string;

    /**
     * Creates a new RequestData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RequestData instance
     */
    public static create(properties?: IRequestData): RequestData;

    /**
     * Encodes the specified RequestData message. Does not implicitly {@link RequestData.verify|verify} messages.
     * @param message RequestData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRequestData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RequestData message, length delimited. Does not implicitly {@link RequestData.verify|verify} messages.
     * @param message RequestData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRequestData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RequestData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RequestData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RequestData;

    /**
     * Decodes a RequestData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RequestData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RequestData;

    /**
     * Verifies a RequestData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RequestData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RequestData
     */
    public static fromObject(object: { [k: string]: any }): RequestData;

    /**
     * Creates a plain object from a RequestData message. Also converts values to other types if specified.
     * @param message RequestData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RequestData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RequestData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RequestData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
