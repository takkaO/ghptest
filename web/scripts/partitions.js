/* ******************************************************************* 
Copyright (C) 2024 takkaO

This program is licensed under the Affero General Public License (AGPL) v3.0.
You can redistribute it and/or modify it under the terms of the AGPL v3.0.
See the LICENSE file for details.

Author: takkaO
******************************************************************* */

"use strict";

function getOffset(deviceName) {
	switch (deviceName) {
		case "ESP32Devkit": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5Stack_Basic": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5Stack_Core2": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5Stack_CoreS3": {
			const offset = {
				"bootloader": 0x0,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5Stack_Tough": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5StickC_Plus": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5Atom_S3": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		case "M5Station": {
			const offset = {
				"bootloader": 0x1000,
				"partitions": 0x8000,
				"boot_app0": 0xe000,
				"main": 0x10000
			}
			return offset;
		}
		default:
			return undefined;
	}
}

export {
	getOffset,
}