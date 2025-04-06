import { SamBA } from "./samba.js";
import { Flash } from './flash.js';
export declare enum Family {
    FAMILY_NONE = 0,
    FAMILY_SAM7S = 1,
    FAMILY_SAM7SE = 2,
    FAMILY_SAM7X = 3,
    FAMILY_SAM7XC = 4,
    FAMILY_SAM7L = 5,
    FAMILY_SAM3N = 6,
    FAMILY_SAM3S = 7,
    FAMILY_SAM3U = 8,
    FAMILY_SAM3X = 9,
    FAMILY_SAM3A = 10,
    FAMILY_SAM4S = 11,
    FAMILY_SAM4E = 12,
    FAMILY_SAM9XE = 13,
    FAMILY_SAMD21 = 14,
    FAMILY_SAMR21 = 15,
    FAMILY_SAML21 = 16,
    FAMILY_SAMD51 = 17,
    FAMILY_SAME51 = 18,
    FAMILY_SAME53 = 19,
    FAMILY_SAME54 = 20,
    FAMILY_SAME70 = 21,
    FAMILY_SAMS70 = 22,
    FAMILY_SAMV70 = 23,
    FAMILY_SAMV71 = 24
}
export declare class DeviceUnsupportedError extends Error {
    constructor(msg?: string | undefined);
}
export declare class Device {
    private _samba;
    private _flash;
    private _family;
    private _uniqueId;
    constructor(samba: SamBA);
    create(): Promise<void>;
    reset(): Promise<void>;
    get family(): Family;
    get flash(): Flash | undefined;
    get chipUniqueId(): string | undefined;
    private readChipUniqueId;
    private readChipId;
}
