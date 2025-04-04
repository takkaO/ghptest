/* ******************************************************************* 
Copyright (C) 2024 takkaO

This program is licensed under the Affero General Public License (AGPL) v3.0.
You can redistribute it and/or modify it under the terms of the AGPL v3.0.
See the LICENSE file for details.

Author: takkaO
******************************************************************* */

"use strict";

import Alpine from "./modules/alpinejs/dist/module.esm.min.js"

document.addEventListener('alpine:init', () => {
	Alpine.data('app', () => ({
		serialPortList: {},				// 選択可能なシリアルポートのオブジェクトリスト
		selectedSerialPortIndex: undefined,	// 選択された

		async init() {
			console.log("Ready!");
			this.serialPortList = await window.api.requestSerialPortList();
			//console.log(this.serialPortList);
			if (this.serialPortList && this.serialPortList.length > 0) {
				this.$nextTick(() => {
					this.selectedSerialPortIndex = 0;
				});
			}
		},

		async onClickSelect() {
			// 決定ボタンクリック
			let portInfo = undefined;
			if (this.selectedSerialPortIndex !== undefined) {
				let serialPort = this.serialPortList[this.selectedSerialPortIndex];
				portInfo = JSON.parse(JSON.stringify(serialPort));
			}

			let ret = await window.api.returnSelectedSerialPort(portInfo);
			window.close();
		},

		async onClickCancel() {
			// キャンセルボタンクリック
			let ret = await window.api.returnSelectedSerialPort(
				undefined
			);
			window.close();
		},

		/* 以下表示更新用（For Alpine CSP） */
		onChangeSelectedSerialPort() {
			this.selectedSerialPortIndex = Number(this.$el.value);
		},

		isSelectedPort() {
			return (this.selectedSerialPortIndex === this.index);
		},

		getDisplaySelectablePortText() {
			return `【${this.port.portName}】 ${this.port.displayName}`
		}

	}));
});

window.Alpine = Alpine;
Alpine.start();