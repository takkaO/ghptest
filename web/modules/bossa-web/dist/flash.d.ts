import { WordCopyApplet } from './wordcopyapplet.js';
import { SamBA } from './samba.js';
export declare class FlashConfigError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FlashRegionError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FlashEraseError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FlashCmdError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FlashPageError extends Error {
    constructor(msg?: string | undefined);
}
declare class FlashOption<T> {
    constructor(value: T);
    set(value: T): void;
    get(): T;
    isDirty(): boolean;
    private _value;
    private _dirty;
}
/**
 *
 */
export declare abstract class Flash {
    /**
     * Create a flasher
     *
     * @param samba SamBA instance handling IO with board
     * @param name Name of the board
     * @param addr Flash base address
     * @param pages Number of pages
     * @param size Page size in bytes
     * @param planes Number of flash planes
     * @param lockRegions Number of flash lock regions
     * @param user Address in SRAM where the applet and buffers will be placed
     * @param stack Address in SRAM where the applet stack will be placed
     */
    constructor(samba: SamBA, name: string, addr: number, pages: number, size: number, planes: number, lockRegions: number, user: number, stack: number);
    protected _samba: SamBA;
    protected _name: string;
    protected _addr: number;
    protected _pages: number;
    protected _size: number;
    protected _planes: number;
    protected _lockRegions: number;
    protected _user: number;
    protected _stack: number;
    protected _prepared: boolean;
    abstract set eraseAuto(enable: boolean);
    get address(): number;
    get pageSize(): number;
    get numPages(): number;
    get numPlanes(): number;
    get totalSize(): number;
    get lockRegions(): number;
    abstract eraseAll(offset: number): void;
    abstract getLockRegions(): Promise<Array<boolean>>;
    setLockRegions(regions: Array<boolean>): void;
    abstract getSecurity(): Promise<boolean>;
    setSecurity(): void;
    abstract getBod(): Promise<boolean>;
    setBod(enable: boolean): void;
    abstract canBod(): boolean;
    abstract getBor(): Promise<boolean>;
    setBor(enable: boolean): void;
    abstract canBor(): boolean;
    abstract getBootFlash(): boolean;
    setBootFlash(enable: boolean): void;
    abstract canBootFlash(): boolean;
    abstract writeOptions(): void;
    abstract writePage(page: number): void;
    abstract readPage(page: number, buf: Uint8Array): Promise<void>;
    writeBuffer(dst_addr: number, size: number): Promise<void>;
    loadBuffer(data: Uint8Array, offset?: number, bufferSize?: number): Promise<void>;
    prepareApplet(): Promise<void>;
    protected _wordCopy: WordCopyApplet;
    protected _bootFlash: FlashOption<boolean>;
    protected _regions: FlashOption<Array<boolean>>;
    protected _bod: FlashOption<boolean>;
    protected _bor: FlashOption<boolean>;
    protected _security: FlashOption<boolean>;
    protected _onBufferA: boolean;
    protected _pageBufferA: number;
    protected _pageBufferB: number;
}
export {};
