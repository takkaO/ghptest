import { SamBA } from "./samba.js";
export declare abstract class Applet {
    /**
     * Create a flasher
     *
     * @param samba SamBA instance handling IO with board
     * @param addr Flash base address
     * @param size Page size in bytes
     * @param user Address in SRAM where the applet and buffers will be placed
     */
    constructor(samba: SamBA, addr: number, code: Uint8Array, size: number, start: number, stack: number, reset: number);
    get size(): number;
    get addr(): number;
    protected _samba: SamBA;
    protected _addr: number;
    protected _size: number;
    protected _start: number;
    protected _stack: number;
    protected _reset: number;
    protected _code: Uint8Array;
    protected _installed: boolean;
    protected checkInstall(): Promise<void>;
    setStack(stack: number): Promise<void>;
    run(): Promise<void>;
    runv(): Promise<void>;
}
