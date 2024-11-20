/* ******************************************************************* 
Copyright (C) 2024 takkaO

This program is licensed under the Affero General Public License (AGPL) v3.0.
You can redistribute it and/or modify it under the terms of the AGPL v3.0.
See the LICENSE file for details.

Author: takkaO
******************************************************************* */

"use strict";

import Alpine from "../modules/alpinejs/dist/module.esm.min.js"
import Swal from "../modules/sweetalert2/src/sweetalert2.js"
import * as BossaWeb from "../modules/bossa-web/dist/bossa-web.js"
import * as EspTool from "../modules/esptool-js/bundle.js"
import * as Utils from "./utils.js"
import * as FlashParameters from "./flashParameters.js"
import CryptoES from "../modules/crypto-es/lib/index.js"
import { marked } from "../modules/marked/lib/marked.esm.js"

const FLASH_ERROR = Utils.createEnum([
	"NONE",
	"FW_FETCH",
	"CANCELED",
	"OPEN_SERIAL_PORT",
	"INVALID_BOOTLOADER",
	"INVALID_DEVICE_FAMILY",
	"FAILED_WRITE",
]);

// 書き込み中のページ遷移時に警告を出す
function windowUnloadHandler(e) {
	e.preventDefault();
	e.returnValue = "";
}

document.addEventListener('alpine:init', () => {
	Alpine.data('app', () => ({
		firmwareInfo: {},				// ファームウェア情報が入った JSON オブジェクト
		selectedDeviceName: "Unknown",	// 選択中のデバイス名
		selectableFirmwareName: [],		// 選択可能な FW 名のリスト
		selectedFirmware: "",			// 選択された FW 名
		selectableFirmwareVersion: [],	// 選択可能な FW バージョンのリスト
		selectedVersion: "",			// 選択された FW バージョン
		flashWriting: false,			// 書中込み動作中のフラグ
		disableAllForms: false,			// 全ての入力フォームを無効化するフラグ
		writingProgress: 50,			// 書き込み進捗率
		writingProgressMessage: "",		// 書き込み中のメッセージ
		existChangeLog: false,			// 変更履歴ファイルが存在するかどうかのフラグ
		changeLogHoverMessage: "",		// 変更履歴ボタンにホバーしたときのメッセージ
		changeLogHtml: "",				// 変更履歴の html 文字列

		async init() {
			console.log("Ready!");

			let response = await fetch("./firmwares.json")
				.catch((err) => {
					// ネットワークエラー
					console.log("err", err);
				});

			this.firmwareInfo = await response.json();
			// console.log(this.firmwareInfo);
		},

		async checkChangeLog(selectedDeviceName, selectedFirmware) {
			let respChangelog = await fetch(
				`./firmwares/${selectedDeviceName}/${selectedFirmware}/CHANGELOG.md`
			).then((response) => {
				if (!response.ok) {
					return undefined;
				}
				return response;
			}).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				return undefined;
			});

			if (respChangelog === undefined) {
				this.existChangeLog = false;
				this.changeLogHoverMessage = "FWの変更履歴を表示する\n（変更履歴ファイルが見つかりません）";
				this.changeLogHtml = "";
			}
			else {
				this.existChangeLog = true;
				this.changeLogHoverMessage = "FWの変更履歴を表示する";
				this.changeLogHtml = marked.parse(await respChangelog.text());
			}
		},

		async changeTargetFirmware() {
			// 選択可能なバージョンをファームウェアに合わせて変更
			this.selectableFirmwareVersion = this.firmwareInfo[this.selectedDeviceName][this.selectedFirmware];

			// 描画が完了してから初期選択要素を設定する
			this.$nextTick(() => {
				this.selectedVersion = this.selectableFirmwareVersion.at(-1);	// 最後の要素を選択状態に
			});

			// CHANGELOG.md の確認
			await this.checkChangeLog(this.selectedDeviceName, this.selectedFirmware);
		},

		async goFirmwareSelectPage(deviceName) {
			this.selectedDeviceName = deviceName;

			this.$refs.page1.classList.add("slide");
			this.$refs.page2.classList.add("slide");

			// 選択可能なファームウェアをセット
			this.selectableFirmwareName = Object.keys(this.firmwareInfo[this.selectedDeviceName]);
			// IoT_Device があればそれを選択、なければ最後の要素を選択状態に
			this.selectedFirmware = this.selectableFirmwareName.at(this.selectableFirmwareName.indexOf("IoT_Device"));

			// CHANGELOG.md の確認
			await this.checkChangeLog(this.selectedDeviceName, this.selectedFirmware);

			// 選択可能なバージョンをファームウェアに合わせてセット
			this.selectableFirmwareVersion = this.firmwareInfo[this.selectedDeviceName][this.selectedFirmware];
			this.selectedVersion = this.selectableFirmwareVersion.at(-1);	// 最後の要素を選択状態に
		},

		goDeviceSelectPage() {
			this.$refs.page2.classList.remove("slide");
			this.$refs.page1.classList.remove("slide");
		},

		async runFirmwareWrite() {
			console.log("Running OK");

			if (navigator.serial === undefined) {
				// 試験的機能なので、ブラウザが対応していない場合は終了
				Swal.fire({
					title: "残念！",
					text: "このブラウザでは Web Serial がサポートされていないようです",
					icon: "error",
					confirmButtonText: 'OK'
				});
				return;
			}

			let respDfuOperate = await fetch(
				`./images/DFU_Mode/${this.selectedDeviceName}.webp`
			).then((response) => {
				if (!response.ok) {
					return false;
				}
				return true;
			}).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				console.log("Main: ", err);
				return undefined;
			});

			if (respDfuOperate === true) {
				let userReady = await Swal.fire({
					title: "書き込む前に！",
					html: /* html */ `
						<p style="text-align: left;">
							デバイスを書き込みモードにする必要があります。<br>
							下記の動画を参考にデバイスを操作し、書き込みモードにしてください。
							準備が完了したら 「準備完了」 ボタンを押してください。
						</p>
						<img class="dfu-animation" src="./images/DFU_Mode/${this.selectedDeviceName}.webp">
					`,
					// icon: "error",
					confirmButtonText: '準備完了！',
					showCancelButton: true,
					cancelButtonText: "キャンセル"
				});

				if (userReady.isConfirmed === false) {
					// ユーザ操作による処理の中断
					console.log("Canceled by user operation.");
					return;
				}
			}

			this.disableAllForms = true;	// 全てのフォームを無効化

			this.writingProgress = 0;
			this.writingProgressMessage = "初期化中";

			const parameters = FlashParameters.getParameters(this.selectedDeviceName);
			let errNo = FLASH_ERROR.CANCELED;
			switch (this.selectedDeviceName) {
				case "WioTerminal": {
					errNo = await this.writeToWioTerminal();
					break;
				}
				case "ESP32Devkit":
				// Fallthrough
				case "M5Stack_Basic":
				// Fallthrough
				case "M5Stack_Core2":
				// Fallthrough
				case "M5Stack_CoreS3":
				// Fallthrough
				case "M5Stack_Tough":
				// Fallthrough
				case "M5StickC_Plus":
				// Fallthrough
				case "M5StickC_Plus2":
				// Fallthrough
				case "M5Atom_S3":
				// Fallthrough
				case "M5Station":
					errNo = await this.writeToEsp32(parameters);
					break;
				default:
					console.log("Unsupported device.");
					break;
			}

			window.removeEventListener("beforeunload", windowUnloadHandler);
			this.flashWriting = false;
			this.disableAllForms = false;	// 全てのフォームを無効化を解除

			let showAlert = true;
			let alert = { title: "Error!", html: "Unknown", icon: "error" };
			switch (errNo) {
				case FLASH_ERROR.NONE:
					alert.title = "成功！";
					alert.icon = "success";
					alert.html = "プログラムの書き込みが正常に完了しました。<br>";
					alert.html += "デバイスが起動しないときはリセットボタンを押してください。";
					break;
				case FLASH_ERROR.CANCELED:
					showAlert = false;
					break;
				case FLASH_ERROR.FW_FETCH:
					alert.title = "失敗！";
					alert.icon = "error";
					alert.html = "書き込むプログラムの取得に失敗しました";
					break;
				case FLASH_ERROR.OPEN_SERIAL_PORT:
					alert.title = "失敗！";
					alert.icon = "error";
					alert.html = "シリアルポートの接続に失敗しました";
					break;
				case FLASH_ERROR.INVALID_BOOTLOADER:
					alert.title = "失敗！";
					alert.icon = "error";
					alert.html = "ブートローダ検証に失敗しました。<br>";
					alert.html += "デバイス選択が間違っていませんか？";
					break;
				case FLASH_ERROR.INVALID_DEVICE_FAMILY:
					alert.title = "失敗！";
					alert.icon = "error";
					alert.html = "デバイスファミリの検証に失敗しました。<br>";
					alert.html += "デバイス選択が間違っていませんか？";
					break;
				case FLASH_ERROR.FAILED_WRITE:
					alert.title = "失敗！";
					alert.icon = "error";
					alert.html = "書き込みに失敗しました";
					break;
				default:
					break;
			}

			if (showAlert) {
				Swal.fire({
					title: alert.title,
					html: alert.html,
					icon: alert.icon,
					confirmButtonText: 'OK'
				});
			}
		},

		async writeToEsp32(parameters) {
			// 接続デバイスの探索と選択
			let serialPort = await navigator.serial.requestPort(
			).catch((err) => {
				console.log(err);
			});

			if (serialPort === undefined) {
				console.log("The 'requestPort' process was cancelled by user action.");
				return FLASH_ERROR.CANCELED;
			}
			this.flashWriting = true;
			window.addEventListener("beforeunload", windowUnloadHandler);

			const NEED_TRACE = false;
			let transport = new EspTool.Transport(serialPort, NEED_TRACE);

			const espLoaderTerminal = {
				clean() {

				},
				writeLine(data) {
					console.log("=> ", data);
				},
				write(data) {
					console.log("> ", data);
				}
			};

			console.log(parameters.baudrate);
			const loaderFlashOptions = {
				transport,
				baudrate: parameters.baudrate, //921600,
				teraminal: espLoaderTerminal,
				debugLogging: false
			};
			let espLoader = new EspTool.ESPLoader(loaderFlashOptions);

			this.writingProgressMessage = "デバイス情報取得中";
			try {
				let chip = await espLoader.main();
				console.log(chip);
			} catch (err) {
				console.log(err);
				return FLASH_ERROR.OPEN_SERIAL_PORT;
			}

			/// chip の規則が結構アバウトなので、スクリーニングは難しそう

			this.writingProgressMessage = "ファームウェア取得中";

			// ファームウェアの取得
			const relBootloaderUrl = `./firmwares/${this.selectedDeviceName}/${this.selectedFirmware}/${this.selectedVersion}/${this.selectedFirmware}.ino.bootloader.bin`;
			const relPartitionsUrl = `./firmwares/${this.selectedDeviceName}/${this.selectedFirmware}/${this.selectedVersion}/${this.selectedFirmware}.ino.partitions.bin`;
			const relMainBinaryUrl = `./firmwares/${this.selectedDeviceName}/${this.selectedFirmware}/${this.selectedVersion}/${this.selectedFirmware}.ino.bin`;
			const relBootApp0Url = `./firmwares/${this.selectedDeviceName}/${this.selectedFirmware}/${this.selectedVersion}/boot_app0.bin`;

			let respMain = await fetch(
				relMainBinaryUrl
			).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				console.log("Main: ", err);
				return undefined;
			});

			let respBootloader = await fetch(
				relBootloaderUrl
			).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				console.log("Bootloader: ", err);
				return undefined;
			});

			let respPartitions = await fetch(
				relPartitionsUrl
			).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				console.log("Partitions: ", err);
				return undefined;
			});

			let respBootApp0 = await fetch(
				relBootApp0Url
			).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				console.log("BootApp0: ", err);
				return undefined;
			});

			if (respBootloader === undefined ||
				respPartitions === undefined ||
				respMain === undefined ||
				respBootApp0 === undefined
			) {
				console.log("Unknown network error.");
				await transport.disconnect();
				//await serialPort.close();
				return FLASH_ERROR.FW_FETCH;
			}

			const mainBinary = Utils.largeBufferToString(new Uint8Array(await respMain.arrayBuffer()));
			const bootloaderBinary = Utils.largeBufferToString(new Uint8Array(await respBootloader.arrayBuffer()));
			const partitionsBinary = Utils.largeBufferToString(new Uint8Array(await respPartitions.arrayBuffer()));
			const bootApp0_Binary = Utils.largeBufferToString(new Uint8Array(await respBootApp0.arrayBuffer()));

			const fileArray = [
				{ data: bootloaderBinary, address: parameters.offset["bootloader"] },
				{ data: partitionsBinary, address: parameters.offset["partitions"] },
				{ data: bootApp0_Binary, address: parameters.offset["boot_app0"] },
				{ data: mainBinary, address: parameters.offset["main"] }
			];

			this.writingProgress = 5;

			// 書き込みオプションとコールバックを宣言
			const flashOptions = {
				fileArray: fileArray,
				flashSize: ((parameters.flashSize === undefined) ? "keep" : parameters.flashSize),
				flashFreq: ((parameters.flashFreq === undefined) ? "keep" : parameters.flashFreq),
				flashMode: ((parameters.flashMode === undefined) ? "keep" : parameters.flashMode),
				eraseAll: false,
				compress: true,
				debugLogging: false,
				reportProgress: (fileIndex, written, total) => {
					console.log("Progress: ", fileIndex, Math.trunc((written / total) * 100));
					switch (fileIndex) {
						case 0:
							this.writingProgress = 6;
							break;
						case 1:
							this.writingProgress = 8;
							break;
						case 2:
							this.writingProgress = 10;
							break;
						default:
							this.writingProgress = (((written / total) * 100) - 10) < 0 ? 10 : Math.trunc((written / total) * 100);
							break;
					}
				},
				calculateMD5Hash: (image) => {
					CryptoES.MD5(CryptoES.enc.Latin1.parse(image))
				},
			};

			this.writingProgressMessage = "プログラム書き込み中";

			// 書き込み開始
			try {
				await espLoader.writeFlash(flashOptions);
			} catch (err) {
				console.log(err);
				await transport.disconnect();
				//await serialPort.close();
				return FLASH_ERROR.FAILED_WRITE;
			}

			try {
				// デバイスを再起動
				this.writingProgressMessage = "デバイスの再起動中";
				await espLoader.hardReset();
				await Utils.wait(500);
				await espLoader.hardReset();	// 失敗することがあるので２回実行

				// デバイスを切断
				// タイミングによってはリセット時に切断されるのでハンドリングする
				await transport.disconnect();
				//await serialPort.close();
			} catch (err) {
				console.log(err);
			}

			await Utils.wait(2000);
			return FLASH_ERROR.NONE;
		},

		async writeToWioTerminal() {
			// DFU モードへ切り替える案内

			// 接続デバイスの探索と選択
			let serialPort = await navigator.serial.requestPort(
			).catch((err) => {
				console.log(err);
			});

			if (serialPort === undefined) {
				console.log("The 'requestPort' process was cancelled by user action.");
				return FLASH_ERROR.CANCELED;
			}
			this.flashWriting = true;
			window.addEventListener("beforeunload", windowUnloadHandler);

			/// DFU モードに切り替えるコード
			/// ポート番号が変わるので手動切り替え推奨
			// console.log("Open serial port as 1200bps.");
			// await serialPort.open({
			// 	dataBits: 8,
			// 	stopBits: 1,
			// 	parity: 'none',
			// 	bufferSize: 63,
			// 	flowControl: 'hardware',
			// 	baudRate: 1200
			// });
			// await mySleep(1000);
			// console.log("Closing serial port.");
			// await serialPort.close();
			// await mySleep(1000);
			// console.log("DONE.");
			// await mySleep(5000);

			this.writingProgressMessage = "ファームウェア取得中";

			// ファームウェアの取得
			const relativeUrl = `./firmwares/${this.selectedDeviceName}/${this.selectedFirmware}/${this.selectedVersion}/${this.selectedFirmware}.ino.bin`;
			let response = await fetch(
				relativeUrl
			).catch((err) => {
				// ネットワークエラー
				// 表示できてる時点でこのエラーは発生しないはず
				console.log(err);
				return undefined;
			});

			if (response === undefined) {
				console.log("Unknown network error.");
				return FLASH_ERROR.FW_FETCH;
			}
			const firmwareBinary = new Uint8Array(await response.arrayBuffer());
			this.writingProgress = 5;	// パーセンテージが見づらいので 5% からスタート

			this.writingProgressMessage = "シリアルポート接続中";

			// シリアルポート接続
			let samba = new BossaWeb.SamBA(serialPort, {
				logger: console,
				debug: true
			});
			try {
				console.log("Connecting to serial port...");
				await samba.connect();
			} catch (error) {
				console.log(error);
				await samba.disconnect();
				await serialPort.close();
				return FLASH_ERROR.OPEN_SERIAL_PORT;
			}
			this.writingProgress = 6;

			this.writingProgressMessage = "デバイスの検証中";

			// デバイスが正常なものか識別
			console.log("Read bootloader version...");
			let versionInfo = await samba.readVersion();
			// この正規表現は Wio Terminal にしか合致しない可能性があるので注意
			const expectedVersionInfoRegex = /v\d+\.\d+ \[Arduino:.*\] .* \d+ \d+ .*/;
			if (expectedVersionInfoRegex.test(versionInfo) === false) {
				console.log("Failed to device validation.");
				await samba.disconnect();
				await serialPort.close();
				return FLASH_ERROR.INVALID_BOOTLOADER;
			}
			console.log(versionInfo);
			this.writingProgress = 7;

			this.writingProgressMessage = "デバイスファミリの検証中";

			// デバイスファミリがサポートしているものか検証
			console.log("Create device...");
			let device = new BossaWeb.Device(samba);
			await device.create().catch((err) => {
				console.log(err);
			});
			this.writingProgress = 8;

			if (BossaWeb.Family[device.family] === "FAMILY_NONE") {
				console.log("Failed to identify device family.");
				await samba.disconnect();
				await serialPort.close();
				return FLASH_ERROR.INVALID_DEVICE_FAMILY;
			}
			console.log("Device family:", BossaWeb.Family[device.family]);
			this.writingProgress = 10;

			// 書き込み中のコールバックを宣言
			const callbackProgress = {
				onStatus: function (msg) {
					console.log("Status: ", msg);
				},
				onProgress: (current, total) => {
					console.log(`Progress: ${current}/${total}`);

					if (((current / total) * 100) > 10) {
						this.writingProgressMessage = "プログラム書き込み中";
					}
					this.writingProgress = (((current / total) * 100) - 10) < 0 ? 10 : Math.trunc((current / total) * 100);
				}
			};

			this.writingProgressMessage = "プログラム書き込み準備中";
			let flasher = new BossaWeb.Flasher(
				samba,
				device.flash,
				callbackProgress
			);
			const OFFSET = 0x00004000;	// Arduino ?

			// 書き込み開始
			await flasher.erase(OFFSET);
			await flasher.write(firmwareBinary, OFFSET);
			this.writingProgress = 100;

			try {
				// デバイスを再起動
				this.writingProgressMessage = "デバイスの再起動中";
				await device.reset();

				// デバイスを切断
				// タイミングによってはリセット時に切断されるのでハンドリングする
				await samba.disconnect();
				await serialPort.close();
			} catch (err) {
				console.log(err);
			}

			await Utils.wait(2000);
			return FLASH_ERROR.NONE;
		},

		showChangeLog() {
			if (this.existChangeLog === false) {
				// 本来ここには入らないハズ
				return;
			}

			Swal.fire({
				showClass: {
					popup: `
					  animate__animated
					  animate__fadeIn
					  animate__faster
					`
				},
				hideClass: {
					popup: `
					  animate__animated
					  animate__fadeOut
					  animate__faster
					`
				},
				customClass: {
					popup: "changelog-popup",
					htmlContainer: "changelog-body",
				},
				html: this.changeLogHtml,
				// width: "90vw",
				// icon: "error",
				confirmButtonText: '閉じる'
			});
		},

		// test() {
		// 	console.log(this.selectableFirmwareVersion);
		// 	console.log(this.selectedVersion);
		// },

		aboutThisSite() {
			let html = /*html*/`
				<p class="text-start">この Web サイト（以下、当サイト）は研究・実験のために作成されたサイトです。
				当サイトを利用して発生した、いかなるトラブルに対しても補償はいたしません。</p>
				<p>自己責任にてご利用ください。</p>
			`;
			Swal.fire({
				title: "このサイトについて",
				html: html,
				icon: "info",
				confirmButtonText: '閉じる',
				confirmButtonColor: "#6c757d"
			});
		}
	}));
})

window.Alpine = Alpine;
Alpine.start();