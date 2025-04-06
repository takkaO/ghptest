/// <reference types="w3c-web-serial" />
export declare type LoaderOptions = {
    flashSize: number;
    logger: Logger;
    debug: boolean;
    trace: boolean;
};
export interface Logger {
    debug(message?: unknown, ...optionalParams: unknown[]): void;
    log(message?: unknown, ...optionalParams: unknown[]): void;
    error(message?: unknown, ...optionalParams: unknown[]): void;
}
export declare class SamBAError extends Error {
    constructor(msg: string);
}
export declare class SamBA {
    private options;
    private serialPort;
    private closed;
    private readLoopPromise;
    private serialReader;
    private inputBuffer;
    private _canChipErase;
    private _canWriteBuffer;
    private _canChecksumBuffer;
    private _canProtect;
    private _readBufferSize;
    get canChecksumBuffer(): boolean;
    get canProtect(): boolean;
    get canChipErase(): boolean;
    get canWriteBuffer(): boolean;
    get writeBufferSize(): number;
    constructor(serialPort: SerialPort, options?: Partial<LoaderOptions>);
    private get logger();
    checksumBuffer(start_addr: number, size: number): Promise<number>;
    checksumBufferSize(): number;
    checksumCalc(c: number, crc: number): number;
    chipErase(start_addr: number): Promise<void>;
    writeBuffer(src_addr: number, dst_addr: number, size: number): Promise<void>;
    /**
     * Send a byte stream to the device
     */
    private writeToStream;
    private hex;
    writeByte(addr: number, value: number): void;
    readByte(addr: number): Promise<number>;
    writeWord(addr: number, value: number): Promise<void>;
    readWord(addr: number): Promise<number>;
    write(addr: number, buffer: Uint8Array, size?: number): Promise<void>;
    read(addr: number, buffer: Uint8Array, size: number): Promise<void>;
    go(addr: number): Promise<void>;
    /**
     * @param rebootWaitMs how long it may take to reboot
     * Start the read loop up.
     */
    connect(rebootWaitMs?: number): Promise<void>;
    private _connect;
    setBinaryMode(): Promise<Uint8Array | null>;
    /**
     * Read the Arduino version information from the board
     *
     * @returns A promise providing the version string
     */
    readVersion(): Promise<string>;
    private decodeResponse;
    private sendCommand;
    /**
     * Change the baud rate for the serial port.
     */
    setBaudRate(baud: number): Promise<void>;
    /**
     * Shutdown the read loop.
     */
    disconnect(): Promise<void>;
    private _sendCommandBuffer;
    private readBuffer;
    private readLoop;
}
