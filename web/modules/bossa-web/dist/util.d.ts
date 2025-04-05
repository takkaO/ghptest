export declare function sleep(ms: number): Promise<void>;
export declare class Uint8Buffer {
    private readOffset;
    private writeOffset;
    private size;
    private _buffer;
    private _view;
    constructor(size?: number);
    get length(): number;
    shift(): number | undefined;
    private grow;
    fill(element: number, length?: number): void;
    private ensure;
    private pushBytes;
    reset(): void;
    push(...bytes: number[]): void;
    copy(bytes: Uint8Array): void;
    view(): Uint8Array;
}
export declare function toByteArray(str: string): Uint8Array;
export declare function toHex(value: number, size?: number): string;
