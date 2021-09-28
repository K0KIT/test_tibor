 /*------------------------------------------

	File Name:		/js/script.js
	Author:         Yoshi.Y
	Last Modified	2012/09/03
	Script Info:	basic javascript library

------------------------------------------ */

/*===================== 目次 ==========================

	00.グローバル変数設定
	1.フォントサイズ変更ボタン実装
	2.画像ロールオーバー設定
	3.スムーススクロール設定
	4.copyrightの日付出力

======================================================*/

/*======================================================

	■00.グローバル変数設定

======================================================*/

// 1.フォントサイズ変更ボタン実装　にて利用
var FontCookieName 	= "font";
var FontCSS_Path 	= "https://www.jbatibor.or.jp/css/"; //フォントサイズ指定CSS格納ディレクトリパス(通常フルパスで指定)
var FontCSS_Target 	= "#fontsize";				//フォントサイズ指定CSSを指定するタグID


/*======================================================

	■1.フォントサイズ変更ボタン実装

======================================================*/

$(document).ready( function(){

	var defaultCssName = "fontsize_m.css";	//デフォルトCSSの名称

	var fontpath = ($.cookie(FontCookieName) == null)? FontCSS_Path + defaultCssName : $.cookie(FontCookieName);
	$( FontCSS_Target ).attr({href:fontpath});
});

// フォントサイズ変更ボタン
function switchFontsize( cssname ) {

	var cssurl = FontCSS_Path + cssname + '.css';
	$( FontCSS_Target ).attr({href: cssurl });
	$.cookie( FontCookieName, cssurl,{
		domain	: location.hostname,
		path 	: '/',
		expires : 7
	});
}


/*======================================================

	■2.画像ロールオーバー設定

======================================================*/
function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");
		for( var i=0; i < images.length; i++ ) {
			if(images[i].getAttribute("src").match("_off.")){
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
				}
			}
		}
	}
}
if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}

/*======================================================

	■3.スムーススクロール設定

	* スムーススクロールする要素には class='scroll' を指定

======================================================*/

	//初期は非表示
$("#pagetop").hide();
 
$(function () {
    $(window).scroll(function () {
        //100pxスクロールしたら
        if ($(this).scrollTop() > 100) {
            //フェードインで表示
            $('#pagetop').fadeIn();
        } else {
            $('#pagetop').fadeOut();
        }
    });
    //ここからクリックイベント
    $('#pagetop a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});


$(function(){
	//対象アンカーのセレクタ指定　スムーススクロールさせるアンカーには'scroll'を指定
	var anchor = 'a.scroll';	// ex)'a[href^=#]' という指定で、#で始まるアンカーを全て対象にする
	var second = 300;			// スクロールの速度(ミリ秒)、もしくは"slow","normal","fast"の3つ

	$( anchor ).click(function() {
		var speed = second; // スクロールの速度(ミリ秒)
		var href= $(this).attr( 'href' ); // アンカーの値取得
		var target = $(href == '#' || href === '' ? 'html' : href); // 移動先を取得
		var position = target.offset().top;//移動先を数値で取得
		var easing = 'swing'; //jqueryのデフォルトで使用できるのは"linear","swing"の2つ

		$($.browser.safari ? 'body' : 'html').animate( {scrollTop:position}, speed, easing );
		return false;
	});
});


/*=============================================

	■4.copyrightの日付表示
	WriteCopyYear

	* how to use
	<span id="target"></script>

=============================================*/
//function WriteCopyYear(){document.write(new Date().getFullYear());}
$(function(){
	var target = "#wright_copyyear";//出力先タグのID名
	$( target ).text( new Date().getFullYear() );
});
