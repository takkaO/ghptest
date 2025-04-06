import { SamBA } from './samba.js';
import { Flash } from './flash.js';
export declare class FlashOffsetError extends Error {
    constructor(msg?: string | undefined);
}
export declare class FileSizeError extends Error {
    constructor(msg?: string | undefined);
}
export interface FlasherObserver {
    onStatus(message: string): void;
    onProgress(num: number, div: number): void;
}
export declare class Flasher {
    constructor(samba: SamBA, flash: Flash, observer: FlasherObserver);
    protected _samba: SamBA;
    protected _flash: Flash;
    protected _observer: FlasherObserver;
    erase(foffset: number): Promise<void>;
    write(data: Uint8Array, foffset: number): Promise<void>;
    verify(data: Uint8Array, foffset: number): Promise<void>;
}
