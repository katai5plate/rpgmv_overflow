//=============================================================================
// H2A_SetSwitchOn.js
// by Had2Apps
// Version: 1.0
//=============================================================================

var H2APG = H2APG || {};

/*:
 * @plugindesc ゲーム開始時に指定のスイッチをONにします。
 * @author Had2Apps
 *
 * @param Switch ID
 * @desc スイッチのIDを指定します。(1)
 * @default 1
 *
 * @help
 *
 * コモンイベントを最初から起動する時のためのプラグインです。
 *
 */

H2APG.Parameters = PluginManager.parameters('H2A_SetSwitchOn');
H2APG.Param = H2APG.Param || {};

H2APG.Param.WakeUpSwitchID = Number(H2APG.Parameters['Switch ID']);

(function () {
	DataManager.setupNewGame = function() {
		this.createGameObjects();
		this.selectSavefileForNewGame();
		$gameParty.setupStartingMembers();
		$gamePlayer.reserveTransfer($dataSystem.startMapId,
			$dataSystem.startX, $dataSystem.startY);
		Graphics.frameCount = 0;
		
		$gameSwitches.setValue(H2APG.Param.WakeUpSwitchID,true);
	};
})();