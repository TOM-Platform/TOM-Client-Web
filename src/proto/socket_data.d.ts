import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a SocketData. */
export interface ISocketData {

    /** SocketData dataType */
    dataType?: (number|null);

    /** SocketData data */
    data?: (Uint8Array|null);
}

/** Represents a SocketData. */
export class SocketData implements ISocketData {

    /**
     * Constructs a new SocketData.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISocketData);

    /** SocketData dataType. */
    public dataType: number;

    /** SocketData data. */
    public data: Uint8Array;

    /**
     * Creates a new SocketData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SocketData instance
     */
    public static create(properties?: ISocketData): SocketData;

    /**
     * Encodes the specified SocketData message. Does not implicitly {@link SocketData.verify|verify} messages.
     * @param message SocketData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISocketData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SocketData message, length delimited. Does not implicitly {@link SocketData.verify|verify} messages.
     * @param message SocketData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISocketData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SocketData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SocketData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SocketData;

    /**
     * Decodes a SocketData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SocketData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SocketData;

    /**
     * Verifies a SocketData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SocketData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SocketData
     */
    public static fromObject(object: { [k: string]: any }): SocketData;

    /**
     * Creates a plain object from a SocketData message. Also converts values to other types if specified.
     * @param message SocketData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SocketData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SocketData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SocketData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
