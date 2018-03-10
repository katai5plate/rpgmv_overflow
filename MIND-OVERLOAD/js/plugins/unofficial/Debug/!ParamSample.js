/*:
 * @plugindesc パラメータに指定できるオプションのサンプルです。
 * @author JunoSakura
 * @help
 * ============================================================================
 * This plugin is released under the WTFPL.
 *
 * ## データ型について
 * 従来通り、値はすべて文字列として保存されます。
 * false の扱いに注意してください。
 *
 * ## number について
 * 自然数のみ選択できます。最大値は 9,007,199,254,740,992 (2^53) です。
 * JavaScript で安全に扱える最大値は 9,007,199,254,740,991 (2^53-1) です。
 * Number.isSafeInteger() で安全な値か確認できます。
 *
 * ## file について
 * dir 以下のファイルパスまたはフォルダパスを取得します。拡張子は含みません。
 * 未使用ファイルの処理に対応するには require を使用してください。
 * img, audio 以下の子フォルダは新規フォルダを参照できます。
 * img, audio 以外の親フォルダは参照できません。
 *
 * ## データベースについて
 * 以下のデータベースを参照できます。
 * 　　変数, スイッチ, アクター, 職業, スキル, アイテム, 武器, 防具,
 * 　　敵キャラ, 敵グループ, ステート, アニメーション, タイルセット
 * 以下のデータベースは参照できません。
 * 　　コモンイベント, システム , タイプ, 用語, マップ, イベント
 *
 * ============================================================================
 * @param string
 * @type string
 * @default
 *
 * @param number
 * @type number
 * @default 0
 *
 * @param boolean
 * @type boolean
 * @default false
 *
 * @param -------------------------
 *
 * @param file
 * @type file
 * @require 1
 * @default img/animations
 *
 * @param file img
 * @type file
 * @require 1
 * @dir img
 * @default animations
 *
 * @param file img/animations
 * @type file
 * @require 1
 * @dir img/animations
 * @default
 *
 * @param file audio
 * @type file
 * @require 1
 * @dir audio
 * @default bgm
 *
 * @param file audio/bgm
 * @type file
 * @require 1
 * @dir audio/bgm
 * @default
 *
 * @param -------------------------
 *
 * @param variable
 * @type variable
 * @default 0
 *
 * @param switch
 * @type switch
 * @default 0
 *
 * @param actor
 * @type actor
 * @default 0
 *
 * @param class
 * @type class
 * @default 0
 *
 * @param skill
 * @type skill
 * @default 0
 *
 * @param item
 * @type item
 * @default 0
 *
 * @param weapon
 * @type weapon
 * @default 0
 *
 * @param armor
 * @type armor
 * @default 0
 *
 * @param enemy
 * @type enemy
 * @default 0
 *
 * @param troop
 * @type troop
 * @default 0
 *
 * @param state
 * @type state
 * @default 0
 *
 * @param animation
 * @type animation
 * @default 0
 *
 * @param tileset
 * @type tileset
 * @default 0
 *
 * @param -------------------------
 *
 * @param common
 * @type common
 * @default 参照できません
 *
 * @param system
 * @type system
 * @default 参照できません
 *
 * @param type
 * @type type
 * @default 参照できません
 *
 * @param term
 * @type term
 * @default 参照できません
 *
 * @param map
 * @type map
 * @default 参照できません
 *
 * @param event
 * @type event
 * @default 参照できません
 */
