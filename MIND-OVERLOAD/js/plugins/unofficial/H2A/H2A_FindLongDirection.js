//=============================================================================
// H2A_FindLongDirection.js
// by Had2Apps
// Version: 1.0
//=============================================================================

var H2APG = H2APG || {};

/*:
 * @plugindesc 経路探索関数の探索上限を引き上げます。
 * @author Had2Apps
 *
 * @param Search Limit
 * @desc 経路探索関数に使用される探索歩数の上限を設定します。(12)
 * @default 12
 *
 * @help
 *
 * 移動ルートの指定→スクリプト
 *
 * ・指定座標に向かって最短距離を１歩づつ歩く
 * this.moveStraight(this.findDirectionTo(X座標,Y座標));
 *
 * ・指定イベントに向かって最短距離を１歩づつ歩く
 * this.moveStraight(this.findDirectionTo($gameMap._events[イベントID].x,$gameMap._events[イベントID].y));
 *
 * ・イベント中でない時、指定座標に向かって最短距離を１歩づつ歩く
 * if(!$gameMap.isEventRunning())this.moveStraight(this.findDirectionTo(X座標,Y座標));
 *
 */

H2APG.Parameters = PluginManager.parameters('H2A_FindLongDirection');
H2APG.Param = H2APG.Param || {};

H2APG.Param.SearchLimit = Number(H2APG.Parameters['Search Limit']);

(function() {

Game_Character.prototype.searchLimit = function() {
    return H2APG.Param.SearchLimit;
};

})();
