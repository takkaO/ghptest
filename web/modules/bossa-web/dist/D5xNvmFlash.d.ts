import { Flash } from './flash.js';
import { SamBA } from './samba.js';
export declare class FlashEraseError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FlashCmdError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FlashPageError extends Error {
    constructor(msg?: string | undefined);
}
export declare class D5xNvmFlash extends Flash {
    protected _eraseAuto: boolean;
    constructor(samba: SamBA, name: string, pages: number, size: number, user: number, stack: number);
    protected get NVM_UP_SIZE(): number;
    protected erase(offset: number, size: number): Promise<void>;
    waitReady(): Promise<void>;
    eraseAll(offset: number): Promise<void>;
    get eraseAuto(): boolean;
    set eraseAuto(enable: boolean);
    getLockRegions(): Promise<Array<boolean>>;
    getSecurity(): Promise<boolean>;
    getBod(): Promise<boolean>;
    canBod(): boolean;
    getBor(): Promise<boolean>;
    canBor(): boolean;
    getBootFlash(): boolean;
    canBootFlash(): boolean;
    readUserPage(userRow: Uint8Array): Promise<void>;
    writeOptions(): Promise<void>;
    writePage(page: number): Promise<void>;
    readPage(page: number, buf: Uint8Array): Promise<void>;
    readRegU16(reg: number): Promise<number>;
    writeRegU16(reg: number, value: number): Promise<void>;
    readRegU32(reg: number): Promise<number>;
    writeRegU32(reg: number, value: number): Promise<void>;
    command(cmd: number): Promise<void>;
    writeBuffer(dst_addr: number, size: number): Promise<void>;
}
