# YRIT IoT Burner　WEB版

## About

工技セ製 IoT ファームウェア書き込みツールの Web 版です。  
ブラウザが Web Serial API に対応している必要があります。  
基本的には Chrome であれば問題ないと思います。

## How to install

```bash
npm i
npm run init-bossa-web
npm run build-bossa-web
npm run copy-modules
```

## Used libraries

|ライブラリ名|ライセンス|備考|
|---|---|---|
|[Alpine.js](https://alpinejs.dev/)|[MIT Lisence](https://github.com/alpinejs/alpine/blob/main/LICENSE.md)||
|[Bootstrap](https://getbootstrap.com/)|[MIT License](https://github.com/twbs/bootstrap/blob/main/LICENSE)||
|[Bootstrap Icons](https://icons.getbootstrap.com/)|[MIT License](https://github.com/twbs/icons/blob/main/LICENSE)||
|[SweetAlert2](https://sweetalert2.github.io/)|[MIT License](https://github.com/sweetalert2/sweetalert2/blob/main/LICENSE)||
|[ma-ku/bossa-web](https://github.com/ma-ku/bossa-web#readme)|[BSD 3-Clause License](https://github.com/ma-ku/bossa-web/blob/main/LICENSE)|[改変したもの](https://github.com/takkaO/bossa-web)を使用|
|[espressif/esptool-js](https://github.com/espressif/esptool-js)|[Apache License 2.0](https://github.com/espressif/esptool-js/blob/main/LICENSE)||
|[entronad/crypto-es](https://github.com/entronad/crypto-es)|[MIT License](https://github.com/entronad/crypto-es/blob/master/LICENSE)||
|[Marked](https://marked.js.org/)|[MIT License](https://github.com/markedjs/marked/blob/master/LICENSE.md)||
|[Animate.css](https://animate.style/) (v4.1.1)|[MIT License](https://github.com/animate-css/animate.css/blob/v4.1.1/LICENSE)|最新版ではライセンス変更の可能性有、注意|



## Reference

- [javascript - How to use JS Module for AlpineJS app to Static HTML - Stack Overflow](https://stackoverflow.com/questions/75872345/how-to-use-js-module-for-alpinejs-app-to-static-html)
- [alpinejs - npm](https://www.npmjs.com/package/alpinejs?activeTab=code)
- [ES Modules入門 - JavaScriptでモジュールを使う時代 - ICS MEDIA](https://ics.media/entry/16511/#%E5%A4%96%E9%83%A8js%E3%82%82%E6%89%B1%E3%81%88%E3%82%8B)
- [micro:bitをWeb Bluetooth APIで通信するときにハマったポイント - Androidのメモとか](https://relativelayout.hatenablog.com/entry/2018/02/03/013251)
- [javascript – レンダー変数は値の代わりに[オブジェクトObject]を表示します - コードログ](https://stackoverflow.com/questions/74164983/render-variable-shows-object-object-instead-of-its-value)
- [alpine.js - How to loop nested data in alpine? dynamic - Stack Overflow](https://stackoverflow.com/questions/74733165/how-to-loop-nested-data-in-alpine-dynamic)
- [CSS Page Transitions For A Better User Experience (50 Examples)](https://www.sliderrevolution.com/resources/css-page-transitions/)
- [html - How to center a flex container but left-align flex items - Stack Overflow](https://stackoverflow.com/questions/32802202/how-to-center-a-flex-container-but-left-align-flex-items)
- [CSS：iOSのSafariで overflow-x:hidden; が効かなかった時の対処方法 | PressStocker](https://pressstocker.com/ios-overflow-x/)
- [fetch - Alpine JS not correctly update x-model - Stack Overflow](https://stackoverflow.com/questions/62149988/alpine-js-not-correctly-update-x-model)
- [String と ArrayBuffer の相互変換 JavaScript](https://gist.github.com/kawanet/352a2ed1d1656816b2bc)
- [ESP Tool](https://espressif.github.io/esptool-js/)
- [Component properties in Alpine CSP - Hyvä Docs](https://docs.hyva.io/hyva-themes/writing-code/csp/alpine-csp-properties.html#select-and-multiple-select-inputs)
- [インポート属性 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import/with)
