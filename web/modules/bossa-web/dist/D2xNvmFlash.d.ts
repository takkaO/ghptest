import { Flash } from './flash.js';
import { SamBA } from './samba.js';
export declare class D2xNvmFlash extends Flash {
    protected _eraseAuto: boolean;
    constructor(samba: SamBA, name: string, pages: number, size: number, user: number, stack: number);
    protected get NVM_UR_SIZE(): number;
    protected erase(offset: number, size: number): Promise<void>;
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
    readUserRow(userRow: Uint8Array): Promise<void>;
    writeOptions(): Promise<void>;
    writePage(page: number): Promise<void>;
    waitReady(): Promise<void>;
    readPage(page: number, buf: Uint8Array): Promise<void>;
    readReg(reg: number): Promise<number>;
    writeReg(reg: number, value: number): Promise<void>;
    command(cmd: number): Promise<void>;
    writeBuffer(dst_addr: number, size: number): Promise<void>;
}
