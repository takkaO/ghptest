/* ******************************************************************* 
Copyright (C) 2024 takkaO

This program is licensed under the Affero General Public License (AGPL) v3.0.
You can redistribute it and/or modify it under the terms of the AGPL v3.0.
See the LICENSE file for details.

Author: takkaO
******************************************************************* */

"use strict";

function wait(timeout) {
	return new Promise((resolve, reject) => setTimeout(resolve, timeout));
}

function createEnum(values) {
	const enumObject = {};
	let i = 0;
	for (const val of values) {
		enumObject[val] = i;
		i += 1;
	}
	return Object.freeze(enumObject);
}

function largeBufferToString(buf) {
	let tmp = [];
	const packetLength = 1024;
	for (var i = 0; i < buf.byteLength; i += packetLength) {
		tmp.push(
			String.fromCharCode.apply(
				"",
				buf.slice(i, i + packetLength))
		);
	}
	return tmp.join("");
}

export {
	wait,
	createEnum,
	largeBufferToString
};