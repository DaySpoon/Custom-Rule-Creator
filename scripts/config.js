import { GameMode } from "@minecraft/server";
//このアドオンの色々な設定です。変数の型が違うとエラーが起こります。

// アドオン拡張機能設定
const enableExpansionPack = false; // 真偽値

// アドオン基本設定
const mobLimit = 120; // 整数値
const PlayerMaxDistance = 2.25; //浮動小数点
const PlayerMinDistance = 0.5; //浮動小数点
const EntityMaxDistance = 2; //浮動小数点
const EntityMinDistance = 0.5; //浮動小数点
const ExcludeGameModes = [GameMode.creative, GameMode.spectator] //配列(文字列)

//その他設定
const EmergencySystemControl = true //真偽値 
const enableAddonStatus = true; // 真偽値
const maxDetectedTriggerTime = 300; //整数値(60以上の値に設定してください)
const maxCreateRule = 100; //整数値
const interval = 1; //浮動小数点

export {
    enableExpansionPack,
    mobLimit,
    PlayerMaxDistance,
    EntityMaxDistance,
    PlayerMinDistance,
    EntityMinDistance,
    enableAddonStatus,
    maxDetectedTriggerTime,
    EmergencySystemControl,
    maxCreateRule,
    interval,
    ExcludeGameModes
}