//=============================================================================
// H2A_FixPixiFilter.js
// by Had2Apps
// Version: 1.0
//=============================================================================

var H2APG = H2APG || {};

/*:
 * @plugindesc バージョン1.3.0でPixiのフィルターが使えないバグを直します。
 * @author Had2Apps
 *
 * @help
 * 
 * たとえばこうするとブラー効果になる。
 * 
 * var f = new PIXI.filters.BlurFilter();
 * f.blur = 10;
 * SceneManager._scene.filters = [f];
 * 
 * 
 * バグ解決の経緯は以下URL参照。有志の方々に感謝です。
 * http://tm.lucky-duet.com/viewtopic.php?f=23&t=1689
 */

(function () {
	PIXI.tilemap.RectTileLayer.prototype.calculateBounds = function (){}
})();