import { Applet } from "./applet.js";
import { SamBA } from "./samba.js";
export declare class WordCopyApplet extends Applet {
    constructor(samba: SamBA, addr: number);
    setDstAddr(dstAddr: number): Promise<void>;
    setSrcAddr(srcAddr: number): Promise<void>;
    setWords(words: number): Promise<void>;
}
