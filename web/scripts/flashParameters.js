/* ******************************************************************* 
Copyright (C) 2024 takkaO

This program is licensed under the Affero General Public License (AGPL) v3.0.
You can redistribute it and/or modify it under the terms of the AGPL v3.0.
See the LICENSE file for details.

Author: takkaO
******************************************************************* */

"use strict";

function getParameters(deviceName) {
	switch (deviceName) {
		case "ESP32Devkit": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "4MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "M5Stack_Basic": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "4MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "M5Stack_Core2": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "M5Stack_CoreS3": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "M5Stack_Tough": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "M5StickC_Plus": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "4MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 1500000,
			}
			return parameters;
		}
		case "M5Atom_S3": {
			const parameters = {
				offset: {
					bootloader: 0x0,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "8MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 921600,
			}
			return parameters;
		}
		case "M5Station": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "16MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 1500000,
			}
			return parameters;
		}
		default:
			return undefined;
	}
}

export {
	getParameters,
}