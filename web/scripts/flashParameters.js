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
		case "esp32_devkit": {
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
		case "m5stack_basic": {
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
		case "m5stack_core2": {
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
		case "m5stack_core_s3": {
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
		case "m5stack_core_s3_se": {
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
				baudrate: 1500000, //921600,
			}
			return parameters;
		}
		case "m5stack_tough": {
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
		case "m5stick_c_plus": {
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
		case "m5stick_c_plus2": {
			const parameters = {
				offset: {
					bootloader: 0x1000,
					partitions: 0x8000,
					boot_app0: 0xe000,
					main: 0x10000
				},
				flashSize: "8MB",
				flashMode: "DIO",
				flashFreq: "80m",
				baudrate: 1500000,
			}
			return parameters;
		}
		case "m5stack_atom_s3": {
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
		case "m5stack_atom_s3r": {
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
		case "m5station": {
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
		case "lilygo_t_display_s3_pro": {
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
		default:
			return undefined;
	}
}

export {
	getParameters,
}