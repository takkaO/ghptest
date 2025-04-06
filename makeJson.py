# Copyright (c) 2024 takkaO
# Licensed under the MIT License. See LICENSE file for details.

import os
import glob
import json
import re
from functools import cmp_to_key

def versionCompareTo(a: str, b:str):
	if a == b:
		return 0
	
	# バージョン表記を分割
	exp = re.compile(r"[a-zA-Z]|\d+")
	aUnit = exp.findall(a)
	bUnit = exp.findall(b)
	# 探索範囲を短いほうに合わせる
	limit = min(len(aUnit), len(bUnit))

	for i in range(limit):
		# 数値でソートできるかトライ
		if (aUnit[i].isdigit() is True) and (bUnit[i].isdigit() is True):
			if int(aUnit[i]) < int(bUnit[i]):
				return -1
			if int(aUnit[i]) > int(bUnit[i]):
				return 1
		
		# 文字列でソートできるかトライ
		if aUnit[i] < bUnit[i]:
			return -1
		elif aUnit[i] > bUnit[i]:
			return 1
	
	if len(aUnit) < len(bUnit):
		return -1
	if len(aUnit) > len(bUnit):
		return 1
	
	return 0

def main():
	result = {}
	BASE_PATH = "web/firmware"
	devices = sorted(map(os.path.normpath, glob.glob("*/", root_dir=BASE_PATH)))
	for device in devices:
		firmware_list = sorted(map(os.path.normpath, glob.glob("*/", root_dir=os.path.join(BASE_PATH, device))))
		result[device] = {}
		for firmware in firmware_list:
			versions = list(map(os.path.normpath, glob.glob("*/", root_dir=os.path.join(BASE_PATH, device, firmware))))
			result[device][firmware] = sorted(versions, key=cmp_to_key(versionCompareTo))
	
	with open("./web/firmware.json", 'w') as f:
		json.dump(result, f, indent=2)

if __name__ == "__main__":
	main()
	#versionCompareTo("v1.20.3", "")