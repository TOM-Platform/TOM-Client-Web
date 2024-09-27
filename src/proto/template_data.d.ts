import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a TemplateData. */
export interface ITemplateData {

    /** TemplateData text */
    text?: (string|null);

    /** TemplateData image */
    image?: (Uint8Array|null);

    /** TemplateData audioPath */
    audioPath?: (string|null);
}

/** Represents a TemplateData. */
export class TemplateData implements ITemplateData {

    /**
     * Constructs a new TemplateData.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITemplateData);

    /** TemplateData text. */
    public text: string;

    /** TemplateData image. */
    public image: Uint8Array;

    /** TemplateData audioPath. */
    public audioPath: string;

    /**
     * Creates a new TemplateData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TemplateData instance
     */
    public static create(properties?: ITemplateData): TemplateData;

    /**
     * Encodes the specified TemplateData message. Does not implicitly {@link TemplateData.verify|verify} messages.
     * @param message TemplateData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITemplateData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TemplateData message, length delimited. Does not implicitly {@link TemplateData.verify|verify} messages.
     * @param message TemplateData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITemplateData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TemplateData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TemplateData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TemplateData;

    /**
     * Decodes a TemplateData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TemplateData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TemplateData;

    /**
     * Verifies a TemplateData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TemplateData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TemplateData
     */
    public static fromObject(object: { [k: string]: any }): TemplateData;

    /**
     * Creates a plain object from a TemplateData message. Also converts values to other types if specified.
     * @param message TemplateData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TemplateData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TemplateData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for TemplateData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
