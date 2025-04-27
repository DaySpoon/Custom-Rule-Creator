import { Entity, EntityDamageCause, system, world } from "@minecraft/server"

// 内部定義
// 弄らないでください

/**
* 既に使用されているルールidリストを取得します。
* @returns ルールデータの範囲が記録された文字列を返します。
*/
export function getRuleIdList() {
    let id = []
    let id2 = []
    rule.sort((a,b) => a.ruleId - b.ruleId).forEach(ruleid => {
        id.push(ruleid.ruleId)
    })
    rule2.sort((a,b) => a.ruleId - b.ruleId).forEach(ruleid => {
        id2.push(ruleid.ruleId)
    })
    id.sort((a, b) => a - b)
    id2.sort((a, b) => a - b)
    return `id: ${id2[0]} ~ ${id2[id2.length - 1]} | ${id[0]} ~ ${id[id.length - 1]} 使用済`
}

/**
* ルールidの最後の値を取得します
* @returns 取得した値,要素値を返します
*/
export function getLastRuleId() {
    let id = []
    rule2.sort((a,b) => a.ruleId - b.ruleId).forEach(ruleid => {
        if(!ruleid.hasOwnProperty("pack")) id.push(ruleid.ruleId)
    })
    id.sort((a, b) => a - b)
    return {
        number: id[id.length - 1],
        index: id.length - 1
    }
}

export const cause = [
    EntityDamageCause.anvil,
    EntityDamageCause.blockExplosion,
    EntityDamageCause.campfire,
    EntityDamageCause.charging,
    EntityDamageCause.contact,
    EntityDamageCause.drowning,
    EntityDamageCause.entityAttack,
    EntityDamageCause.entityExplosion,
    EntityDamageCause.fall,
    EntityDamageCause.fallingBlock,
    EntityDamageCause.fire,
    EntityDamageCause.fireTick,
    EntityDamageCause.fireworks,
    EntityDamageCause.flyIntoWall,
    EntityDamageCause.freezing,
    EntityDamageCause.lava,
    EntityDamageCause.lightning,
    EntityDamageCause.magic,
    EntityDamageCause.magma,
    EntityDamageCause.none,
    EntityDamageCause.override,
    EntityDamageCause.piston,
    EntityDamageCause.projectile,
    EntityDamageCause.ramAttack,
    EntityDamageCause.selfDestruct,
    EntityDamageCause.sonicBoom,
    EntityDamageCause.soulCampfire,
    EntityDamageCause.stalactite,
    EntityDamageCause.stalagmite,
    EntityDamageCause.starve,
    EntityDamageCause.suffocation,
    EntityDamageCause.temperature,
    EntityDamageCause.thorns,
    EntityDamageCause.void,
    EntityDamageCause.wither,
]

export const particles = [
    "minecraft:arrow_spell_emitter",
    "minecraft:balloon_gas_particle	",
    "minecraft:basic_bubble_particle",
    "minecraft:basic_bubble_particle_manual",
    "minecraft:basic_crit_particle",
    "minecraft:basic_flame_particle	",
    "minecraft:basic_smoke_particle",
    "minecraft:bleach",
    "minecraft:bubble_column_bubble",
    "minecraft:bubble_column_down_particle",
    "minecraft:bubble_column_up_particle",
    "minecraft:camera_shoot_explosion",
    "minecraft:campfire_smoke_particle",
    "minecraft:campfire_tall_smoke_particle",
    "minecraft:cauldron_bubble_particle",
    "minecraft:cauldron_splash_particle",
    "minecraft:cauldron_spell_emitter",
    "minecraft:colored_flame_particle",
    "minecraft:conduit_particle",
    "minecraft:conduit_absorb_particle",
    "minecraft:conduit_attack_emitter",
    "minecraft:critical_hit_emitter",
    "minecraft:dolphin_move_particle",
    "minecraft:dragon_breath_fire",
    "minecraft:dragon_breath_lingering",
    "minecraft:dragon_breath_trail",
    "minecraft:dragon_death_explosion_emitter",
    "minecraft:dragon_destroy_block",
    "minecraft:dragon_dying_explosion",
    "minecraft:enchanting_table_particle",
    "minecraft:end_chest",
    "minecraft:endrod",
    "minecraft:elephant_tooth_paste_vapor_particle",
    "minecraft:evocation_fang_particle",
    "minecraft:evoker_spell",
    "minecraft:cauldron_explosion_emitter",
    "minecraft:death_explosion_emitter",
    "minecraft:egg_destroy_emitter",
    "minecraft:eyeofender_death_explode_particle",
    "minecraft:misc_fire_vapor_particle",
    "minecraft:explosion_particle",
    "minecraft:explosion_manual",
    "minecraft:eye_of_ender_bubble_particle",
    "minecraft:falling_border_dust_particle",
    "minecraft:falling_dust",
    "minecraft:falling_dust_concrete_powder_particle",
    "minecraft:falling_dust_dragon_egg_particle",
    "minecraft:falling_dust_gravel_particle",
    "minecraft:falling_dust_red_sand_particle",
    "minecraft:falling_dust_sand_particle",
    "minecraft:falling_dust_scaffolding_particle",
    "minecraft:falling_dust_top_snow_particle",
    "minecraft:fish_hook_particle",
    "minecraft:fish_pos_particle",
    "minecraft:guardian_attack_particle",
    "minecraft:guardian_water_move_particle",
    "minecraft:heart_particle",
    "minecraft:huge_explosion_lab_misc_emitter",
    "minecraft:huge_explosion_emitter",
    "minecraft:ice_evaporation_emitter",
    "minecraft:ink_emitter",
    "minecraft:knockback_roar_particle",
    "minecraft:lab_table_heatblock_dust_particle",
    "minecraft:lab_table_misc_mystical_particle",
    "minecraft:large_explosion",
    "minecraft:lava_drip_particle",
    "minecraft:lava_particle",
    "minecraft:llama_spit_smoke",
    "minecraft:magnesium_salts_emitter",
    "minecraft:mob_block_spawn_emitter",
    "minecraft:mob_portal",
    "minecraft:mobflame_single",
    "minecraft:mobspell_emitter",
    "minecraft:mycelium_dust_particle",
    "minecraft:note_particle",
    "minecraft:obsidian_glow_dust_particle",
    "minecraft:phantom_trail_particle",
    "minecraft:portal_directional",
    "minecraft:portal_east_west",
    "minecraft:portal_north_south",
    "minecraft:rain_splash_particle",
    "minecraft:redstone_ore_dust_particle",
    "minecraft:redstone_repeater_dust_particle",
    "minecraft:redstone_torch_dust_particle",
    "minecraft:rising_border_dust_particle",
    "minecraft:shulker_bullet",
    "minecraft:silverfish_grief_emitter",
    "minecraft:sparkler_emitter",
    "minecraft:splash_spell_emitter",
    "minecraft:sponge_absorb_water_particle",
    "minecraft:squid_flee_particle",
    "minecraft:squid_ink_bubble",
    "minecraft:squid_move_particle",
    "minecraft:stunned_emitter",
    "minecraft:totem_particle",
    "minecraft:totem_manual",
    "minecraft:underwater_torch_particle",
    "minecraft:villager_angry",
    "minecraft:villager_happy",
    "minecraft:water_drip_particle",
    "minecraft:water_evaporation_actor_emitter",
    "minecraft:water_evaporation_bucket_emitter",
    "minecraft:water_evaporation_manual",
    "minecraft:water_splash_particle_manual",
    "minecraft:water_splash_particle",
    "minecraft:water_wake_particle",
    "minecraft:wither_boss_invulnerable"
]

export const rule = [
    {
        displayName: "無効",
        nameSpace: "CRC",
        ruleId: 999,
        visible: true,
        type: {
            special: true
        }
    },
    {
        displayName: "爆発したら",
        nameSpace: "CRC",
        ruleId: 1000,
        visible: true,
        type: {}
    },
    {
        displayName: "ダメージを受けたら",
        nameSpace: "CRC",
        ruleId: 1001,
        visible: true,
        type: {}
    },
    {
        displayName: "ジャンプしたら",
        nameSpace: "CRC",
        ruleId: 1002,
        visible: true,
        type: {}
    },
    {
        displayName: "スニークしたら",
        nameSpace: "CRC",
        ruleId: 1003,
        visible: true,
        type: {}
    },
    {
        displayName: "走ったら",
        nameSpace: "CRC",
        ruleId: 1004,
        visible: true,
        type: {}
    },
    {
        displayName: "ブロックを破壊したら",
        nameSpace: "CRC",
        ruleId: 1005,
        visible: true,
        type: {}
    },
    {
        displayName: "ブロックを置いたら",
        nameSpace: "CRC",
        ruleId: 1006,
        visible: true,
        type: {}
    },
    {
        displayName: "ボタンを押したら",
        nameSpace: "CRC",
        ruleId: 1007,
        visible: true,
        type: {}
    },
    {
        displayName: "メッセージを送ったら",
        nameSpace: "CRC",
        ruleId: 1008,
        visible: true,
        type: {}
    },
    {
        displayName: "死んだら",
        nameSpace: "CRC",
        ruleId: 1009,
        visible: true,
        type: {}
    },
    {
        displayName: "スポーンしたら",
        nameSpace: "CRC",
        ruleId: 1010,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティを右クリックしたら",
        nameSpace: "CRC",
        ruleId: 1011,
        visible: true,
        type: {}
    },
    {
        displayName: "ブロックを右クリックしたら",
        nameSpace: "CRC",
        ruleId: 1012,
        visible: true,
        type: {}
    },
    {
        displayName: "レバーをオンにしたら",
        nameSpace: "CRC",
        ruleId: 1013,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティがスポーンしたら",
        nameSpace: "CRC",
        ruleId: 1014,
        visible: true,
        type: {}
    },
    {
        displayName: "エフェクトが付与されたら",
        nameSpace: "CRC",
        ruleId: 1015,
        visible: true,
        type: {}
    },
    {
        displayName: "ダメージを与えたら",
        nameSpace: "CRC",
        ruleId: 1016,
        visible: true,
        type: {}
    },
    {
        displayName: "発射体がエンティティにヒットしたら",
        nameSpace: "CRC",
        ruleId: 1017,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティに近づいたら",
        nameSpace: "CRC",
        ruleId: 1018,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティが近づいたら",
        nameSpace: "CRC",
        ruleId: 1019,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティ同士が近づいたら",
        nameSpace: "CRC",
        ruleId: 1020,
        visible: true,
        type: {}
    },
    {
        displayName: "発射体がブロックにヒットしたら",
        nameSpace: "CRC",
        ruleId: 1021,
        visible: true,
        type: {}
    },
    {
        displayName: "寝たら",
        nameSpace: "CRC",
        ruleId: 1022,
        visible: true,
        type: {}
    },
    {
        displayName: "エモートしているなら",
        nameSpace: "CRC",
        ruleId: 1023,
        visible: true,
        type: {}
    },
    {
        displayName: "水中なら",
        nameSpace: "CRC",
        ruleId: 1024,
        visible: true,
        type: {}
    },
    {
        displayName: "落下しているなら",
        nameSpace: "CRC",
        ruleId: 1025,
        visible: true,
        type: {}
    },
    {
        displayName: "泳いだら",
        nameSpace: "CRC",
        ruleId: 1026,
        visible: true,
        type: {}
    },
    {
        displayName: "地面に触れたら",
        nameSpace: "CRC",
        ruleId: 1027,
        visible: true,
        type: {}
    },
    {
        displayName: "天気が変わったら",
        nameSpace: "CRC",
        ruleId: 1028,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムを使ったら",
        nameSpace: "CRC",
        ruleId: 1029,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムを使い始めたら",
        nameSpace: "CRC",
        ruleId: 1030,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムを使い終わったら",
        nameSpace: "CRC",
        ruleId: 1031,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムがクールダウン中なら",
        nameSpace: "CRC",
        ruleId: 1032,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムのクールダウンが終わったら",
        nameSpace: "CRC",
        ruleId: 1033,
        visible: true,
        type: {}
    },
    {
        displayName: "ディメンションを移動したら",
        nameSpace: "CRC",
        ruleId: 1034,
        visible: true,
        type: {}
    },
    {
        displayName: "登っていたら",
        nameSpace: "CRC",
        ruleId: 1035,
        visible: true,
        type: {}
    },
    {
        displayName: "飛んでいたら",
        nameSpace: "CRC",
        ruleId: 1036,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティが右クリックされたら",
        nameSpace: "CRC",
        ruleId: 1037,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティを倒したら",
        nameSpace: "CRC",
        ruleId: 1038,
        visible: true,
        type: {}
    },
    {
        displayName: "投擲物を発射したら",
        nameSpace: "CRC",
        ruleId: 1039,
        visible: true,
        type: {}
    },
    {
        displayName: "視点の先にエンティティがいたら",
        nameSpace: "CRC",
        ruleId: 1040,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティが視点を合わせられていたら",
        nameSpace: "CRC",
        ruleId: 1041,
        visible: true,
        type: {}
    },
    {
        displayName: "上を見たら",
        nameSpace: "CRC",
        ruleId: 1042,
        visible: true,
        type: {}
    },
    {
        displayName: "下を見たら",
        nameSpace: "CRC",
        ruleId: 1043,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーがエモートしたら",
        nameSpace: "CRC",
        ruleId: 1044,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーがゲームモードを変更したら",
        nameSpace: "CRC",
        ruleId: 1045,
        visible: true,
        type: {}
    },
    {
        displayName: "奈落に落ちたら",
        nameSpace: "CRC",
        ruleId: 1046,
        visible: true,
        type: {}
    },
    {
        displayName: "最高高度に達しているなら",
        nameSpace: "CRC",
        ruleId: 1047,
        visible: true,
        type: {}
    },
    {
        displayName: "ターゲットにされているなら",
        nameSpace: "CRC",
        ruleId: 1048,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティのターゲットなら",
        nameSpace: "CRC",
        ruleId: 1049,
        visible: true,
        type: {}
    },
    {
        displayName: "頭上のブロックが空気なら",
        nameSpace: "CRC",
        ruleId: 1050,
        visible: true,
        type: {}
    },
    {
        displayName: "頭上のブロックが空気じゃないなら",
        nameSpace: "CRC",
        ruleId: 1051,
        visible: true,
        type: {}
    },
    {
        displayName: "ワールドに参加したら",
        nameSpace: "CRC",
        ruleId: 1052,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御が変動したなら",
        nameSpace: "CRC",
        ruleId: 1053,
        visible: true,
        type: {}
    },
    {
        displayName: "体力の数値が変動したら",
        nameSpace: "CRC",
        ruleId: 1054,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティが読み込まれたら",
        nameSpace: "CRC",
        ruleId: 1055,
        visible: true,
        type: {}
    },
    {
        displayName: "ブロックを爆発したら",
        nameSpace: "CRC",
        ruleId: 1056,
        visible: true,
        type: {}
    },
    {
        displayName: "ブロックが爆発されたら",
        nameSpace: "CRC",
        ruleId: 1057,
        visible: true,
        type: {}
    },
    {
        displayName: "イベントがトリガーしたら",
        nameSpace: "CRC",
        ruleId: 1058,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーが退出したら",
        nameSpace: "CRC",
        ruleId: 1059,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティがデスポーンしたら",
        nameSpace: "CRC",
        ruleId: 1060,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティが爆発したブロックなら",
        nameSpace: "CRC",
        ruleId: 1061,
        visible: true,
        type: {}
    },
    {
        displayName: "サーバーからのメッセージが返されたとき",
        nameSpace: "CRC",
        ruleId: 1062,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーからメッセージが送られたとき",
        nameSpace: "CRC",
        ruleId: 1063,
        visible: true,
        type: {}
    },
    {
        displayName: "ピストンが起動したら",
        nameSpace: "CRC",
        ruleId: 1064,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムを使い始めた際にブロックに触れていたら",
        nameSpace: "CRC",
        ruleId: 1065,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムを使い終わった際にブロックに触れていたら",
        nameSpace: "CRC",
        ruleId: 1066,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーが移動したら",
        nameSpace: "CRC",
        ruleId: 1067,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーが移動していなかったら",
        nameSpace: "CRC",
        ruleId: 1068,
        visible: true,
        type: {}
    },
    {
        displayName: "イベントがキャンセルされたら",
        nameSpace: "CRC",
        ruleId: 1069,
        visible: true,
        type: {}
    },
    {
        displayName: "デバイスがコンソールなら",
        nameSpace: "CRC",
        ruleId: 1070,
        visible: true,
        type: {}
    },
    {
        displayName: "デバイスがデスクトップなら",
        nameSpace: "CRC",
        ruleId: 1071,
        visible: true,
        type: {}
    },
    {
        displayName: "デバイスがモバイルなら",
        nameSpace: "CRC",
        ruleId: 1072,
        visible: true,
        type: {}
    },
    {
        displayName: "視点の先にブロックがあるなら",
        nameSpace: "CRC",
        ruleId: 1073,
        visible: true,
        type: {}
    },
    {
        displayName: "操作機種をゲームパッドに変更したら",
        nameSpace: "CRC",
        ruleId: 1074,
        visible: true,
        type: {}
    },
    {
        displayName: "操作機種をキーボードマウスに変更したら",
        nameSpace: "CRC",
        ruleId: 1075,
        visible: true,
        type: {}
    },
    {
        displayName: "操作機種をコントローラーに変更したら",
        nameSpace: "CRC",
        ruleId: 1076,
        visible: true,
        type: {}
    },
    {
        displayName: "操作機種をタッチに変更したら",
        nameSpace: "CRC",
        ruleId: 1077,
        visible: true,
        type: {}
    },
    {
        displayName: "ジャンプボタンが押されたなら",
        nameSpace: "CRC",
        ruleId: 1078,
        visible: true,
        type: {}
    },
    {
        displayName: "スニークボタンが押されたなら",
        nameSpace: "CRC",
        ruleId: 1079,
        visible: true,
        type: {}
    },
    {
        displayName: "ジャンプボタンが離されたなら",
        nameSpace: "CRC",
        ruleId: 1080,
        visible: true,
        type: {}
    },
    {
        displayName: "スニークボタンが離されたなら",
        nameSpace: "CRC",
        ruleId: 1081,
        visible: true,
        type: {}
    },
    {
        displayName: "最後に使った操作がゲームパッドなら",
        nameSpace: "CRC",
        ruleId: 1082,
        visible: true,
        type: {}
    },
    {
        displayName: "最後に使った操作がキーボードマウスなら",
        nameSpace: "CRC",
        ruleId: 1083,
        visible: true,
        type: {}
    },
    {
        displayName: "最後に使った操作がコントローラーなら",
        nameSpace: "CRC",
        ruleId: 1084,
        visible: true,
        type: {}
    },
    {
        displayName: "最後に使った操作がタッチなら",
        nameSpace: "CRC",
        ruleId: 1085,
        visible: true,
        type: {}
    },
    {
        displayName: "タッチ入力がタッチバーに影響するなら",
        nameSpace: "CRC",
        ruleId: 1086,
        visible: true,
        type: {}
    },
    {
        displayName: "ジャンプボタンが押されているなら",
        nameSpace: "CRC",
        ruleId: 1087,
        visible: true,
        type: {}
    },
    {
        displayName: "ジャンプボタンが押されていないなら",
        nameSpace: "CRC",
        ruleId: 1088,
        visible: true,
        type: {}
    },
    {
        displayName: "スニークボタンが押されているなら",
        nameSpace: "CRC",
        ruleId: 1089,
        visible: true,
        type: {}
    },
    {
        displayName: "スニークボタンが押されていないなら",
        nameSpace: "CRC",
        ruleId: 1090,
        visible: true,
        type: {}
    },
    {
        displayName: "オーバーワールドにいるなら",
        nameSpace: "CRC",
        ruleId: 1091,
        visible: true,
        type: {}
    },
    {
        displayName: "ネザーにいるなら",
        nameSpace: "CRC",
        ruleId: 1092,
        visible: true,
        type: {}
    },
    {
        displayName: "エンドにいるなら",
        nameSpace: "CRC",
        ruleId: 1093,
        visible: true,
        type: {}
    },
    {
        displayName: "ワールドが読み込まれたら",
        nameSpace: "CRC",
        ruleId: 1094,
        visible: true,
        type: {}
    },
    {
        displayName: "ゲームルールが変更されたら",
        nameSpace: "CRC",
        ruleId: 1095,
        visible: true,
        type: {}
    },
    {
        displayName: "感圧版が押されたら",
        nameSpace: "CRC",
        ruleId: 1096,
        visible: true,
        type: {}
    },
    {
        displayName: "感圧版から離れたら",
        nameSpace: "CRC",
        ruleId: 1097,
        visible: true,
        type: {}
    },
    {
        displayName: "トリップワイヤーを起動したら",
        nameSpace: "CRC",
        ruleId: 1098,
        visible: true,
        type: {}
    },
    {
        displayName: "トリップワイヤーから離れたら",
        nameSpace: "CRC",
        ruleId: 1099,
        visible: true,
        type: {}
    },
    {
        displayName: "レバーをオフにしたら",
        nameSpace: "CRC",
        ruleId: 1100,
        visible: true,
        type: {}
    },
    {
        displayName: "ターゲットブロックにヒットしたら",
        nameSpace: "CRC",
        ruleId: 1101,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムをドロップしたら",
        nameSpace: "CRC",
        ruleId: 1102,
        visible: true,
        type: {}
    },
    {
        displayName: "経験値が変動したら",
        nameSpace: "CRC",
        ruleId: 1103,
        visible: true,
        type: {}
    },
    {
        displayName: "アイテムが釣れたら",
        nameSpace: "CRC",
        ruleId: 1104,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーが釣ったら",
        nameSpace: "CRC",
        ruleId: 1105,
        visible: true,
        type: {}
    },
    {
        displayName: "釣れなかったら",
        nameSpace: "CRC",
        ruleId: 1106,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーがエンティティから降りたら",
        nameSpace: "CRC",
        ruleId: 1107,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティからプレイヤーが降りたら",
        nameSpace: "CRC",
        ruleId: 1108,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーがエンティティに乗ったら",
        nameSpace: "CRC",
        ruleId: 1109,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティにプレイヤーが乗ったら",
        nameSpace: "CRC",
        ruleId: 1110,
        visible: true,
        type: {}
    },
    {
        displayName: "初動がWキーなら",
        nameSpace: "CRC",
        ruleId: 1111,
        visible: true,
        type: {}
    },
    {
        displayName: "初動がSキーなら",
        nameSpace: "CRC",
        ruleId: 1112,
        visible: true,
        type: {}
    },
    {
        displayName: "初動がAキーなら",
        nameSpace: "CRC",
        ruleId: 1113,
        visible: true,
        type: {}
    },
    {
        displayName: "初動がDキーなら",
        nameSpace: "CRC",
        ruleId: 1114,
        visible: true,
        type: {}
    },
    {
        displayName: "初動がSHIFTキーなら",
        nameSpace: "CRC",
        ruleId: 1115,
        visible: true,
        type: {}
    },
    {
        displayName: "初動がSPACEキーなら",
        nameSpace: "CRC",
        ruleId: 1116,
        visible: true,
        type: {}
    },
    {
        displayName: "初動からWキーが押され続けているなら",
        nameSpace: "CRC",
        ruleId: 1117,
        visible: true,
        type: {}
    },
    {
        displayName: "初動からSキーが押され続けているなら",
        nameSpace: "CRC",
        ruleId: 1118,
        visible: true,
        type: {}
    },
    {
        displayName: "初動からAキーが押され続けているなら",
        nameSpace: "CRC",
        ruleId: 1119,
        visible: true,
        type: {}
    },
    {
        displayName: "初動からDキーが押され続けているなら",
        nameSpace: "CRC",
        ruleId: 1120,
        visible: true,
        type: {}
    },
    {
        displayName: "初動からSHIFTキーが押され続けているなら",
        nameSpace: "CRC",
        ruleId: 1121,
        visible: true,
        type: {}
    },
    {
        displayName: "初動からSPACEキーが押され続けているなら",
        nameSpace: "CRC",
        ruleId: 1122,
        visible: true,
        type: {}
    },
    {
        displayName: "エンティティのタグリストが変化したら",
        nameSpace: "CRC",
        ruleId: 1123,
        visible: true,
        type: {}
    },
    {
        displayName: "チェスト単体を開こうとしたら",
        nameSpace: "CRC",
        ruleId: 1124,
        visible: true,
        type: {}
    },
    {
        displayName: "チェスト単体を開こうとしたら(初動)",
        nameSpace: "CRC",
        ruleId: 1125,
        visible: true,
        type: {}
    },
    {
        displayName: "連結チェスト(一番目)を開こうとしたら(初動)",
        nameSpace: "CRC",
        ruleId: 1126,
        visible: true,
        type: {}
    },
    {
        displayName: "連結チェスト(二番目)を開こうとしたら(初動)",
        nameSpace: "CRC",
        ruleId: 1127,
        visible: true,
        type: {}
    },
    {
        displayName: "連結チェスト(一番目)を開こうとしたら",
        nameSpace: "CRC",
        ruleId: 1128,
        visible: true,
        type: {}
    },
    {
        displayName: "連結チェスト(二番目)を開こうとしたら",
        nameSpace: "CRC",
        ruleId: 1129,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(カメラ)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1130,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(降車)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1131,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(乗車)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1132,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(ジャンプ)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1133,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(WASD)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1134,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(S)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1135,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(W)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1136,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(A)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1137,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(D)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1138,
        visible: true,
        type: {}
    },
    {
        displayName: "プレイヤーの操作の制御(動き)が変動したなら",
        nameSpace: "CRC",
        ruleId: 1139,
        visible: true,
        type: {}
    },
    {
        displayName: "前の天候が晴れだったら",
        nameSpace: "CRC",
        ruleId: 1140,
        visible: true,
        type: {}
    },
    {
        displayName: "前の天候が雨だったら",
        nameSpace: "CRC",
        ruleId: 1141,
        visible: true,
        type: {}
    },
    {
        displayName: "前の天候が雷雨だったら",
        nameSpace: "CRC",
        ruleId: 1142,
        visible: true,
        type: {}
    },
    {
        displayName: "変化後の天候が晴れだったら",
        nameSpace: "CRC",
        ruleId: 1143,
        visible: true,
        type: {}
    },
    {
        displayName: "変化後の天候が雨だったら",
        nameSpace: "CRC",
        ruleId: 1144,
        visible: true,
        type: {}
    },
    {
        displayName: "変化後の天候が雷雨だったら",
        nameSpace: "CRC",
        ruleId: 1145,
        visible: true,
        type: {}
    },
    {
        displayName: "メモリ優先度が「低」だったら",
        nameSpace: "CRC",
        ruleId: 1146,
        visible: true,
        type: {}
    },
    {
        displayName: "メモリ優先度が「通常以下」だったら",
        nameSpace: "CRC",
        ruleId: 1147,
        visible: true,
        type: {}
    },
    {
        displayName: "メモリ優先度が「通常」だったら",
        nameSpace: "CRC",
        ruleId: 1148,
        visible: true,
        type: {}
    },
    {
        displayName: "メモリ優先度が「通常以上」だったら",
        nameSpace: "CRC",
        ruleId: 1149,
        visible: true,
        type: {}
    },
    {
        displayName: "メモリ優先度が「高」だったら",
        nameSpace: "CRC",
        ruleId: 1150,
        visible: true,
        type: {}
    },
    {
        displayName: "グラフィックが「シンプル」だったら",
        nameSpace: "CRC",
        ruleId: 1151,
        visible: true,
        type: {}
    },
    {
        displayName: "グラフィックが「遅延」だったら",
        nameSpace: "CRC",
        ruleId: 1152,
        visible: true,
        type: {}
    },
    {
        displayName: "グラフィックが「レイトレーシング」だったら",
        nameSpace: "CRC",
        ruleId: 1153,
        visible: true,
        type: {}
    },
    {
        displayName: "グラフィックが「ファンシー」だったら",
        nameSpace: "CRC",
        ruleId: 1154,
        visible: true,
        type: {}
    },
    {
        displayName: "権限が付与されているなら",
        nameSpace: "CRC",
        ruleId: 1155,
        visible: true,
        type: {}
    },
    {
        displayName: "権限が付与されていないなら",
        nameSpace: "CRC",
        ruleId: 1156,
        visible: true,
        type: {}
    },
    {
        displayName: "晴れなら",
        nameSpace: "CRC",
        ruleId: 1157,
        visible: true,
        type: {}
    },
    {
        displayName: "雨なら",
        nameSpace: "CRC",
        ruleId: 1158,
        visible: true,
        type: {}
    },
    {
        displayName: "雷雨なら",
        nameSpace: "CRC",
        ruleId: 1159,
        visible: true,
        type: {}
    },
    {
        displayName: "満月なら",
        nameSpace: "CRC",
        ruleId: 1160,
        visible: true,
        type: {}
    },
    {
        displayName: "更待月なら",
        nameSpace: "CRC",
        ruleId: 1161,
        visible: true,
        type: {}
    },
    {
        displayName: "上限の月なら",
        nameSpace: "CRC",
        ruleId: 1162,
        visible: true,
        type: {}
    },
    {
        displayName: "有明月なら",
        nameSpace: "CRC",
        ruleId: 1163,
        visible: true,
        type: {}
    },
    {
        displayName: "新月なら",
        nameSpace: "CRC",
        ruleId: 1164,
        visible: true,
        type: {}
    },
    {
        displayName: "三日月なら",
        nameSpace: "CRC",
        ruleId: 1165,
        visible: true,
        type: {}
    },
    {
        displayName: "下弦の月なら",
        nameSpace: "CRC",
        ruleId: 1166,
        visible: true,
        type: {}
    },
    {
        displayName: "十三夜なら",
        nameSpace: "CRC",
        ruleId: 1167,
        visible: true,
        type: {}
    },
    {
        displayName: "エフェクトが一つでも付与されていたら",
        nameSpace: "CRC",
        ruleId: 1168,
        visible: true,
        type: {}
    },
    {
        displayName: "エフェクトが一つでも付与されていなかったら",
        nameSpace: "CRC",
        ruleId: 1169,
        visible: true,
        type: {}
    },
    // {
    //     displayName: "足元のブロックが空気なら",
    //     nameSpace: "CRC",
    //     ruleId: 1069,
    //     visible: false,
    //     type: {}
    // },
    // {
    //     displayName: "足元のブロックが空気じゃないなら",
    //     nameSpace: "CRC",
    //     ruleId: 1070,
    //     visible: false,
    //     type: {}
    // },
    // {
    //     displayName: "東を見たら",
    //     nameSpace: "CRC",
    //     ruleId: 1069,
    //     visible: true,
    //     type: {}
    // },
    // {
    //     displayName: "西を見たら",
    //     nameSpace: "CRC",
    //     ruleId: 1070,
    //     visible: true,
    //     type: {}
    // },
    // {
    //     displayName: "南を見たら",
    //     nameSpace: "CRC",
    //     ruleId: 1071,
    //     visible: true,
    //     type: {}
    // },
    // {
    //     displayName: "北を見たら",
    //     nameSpace: "CRC",
    //     ruleId: 1072,
    //     visible: true,
    //     type: {}
    // },
    {
        displayName: "10秒おきに",
        nameSpace: "CRC",
        ruleId: 1170,
        visible: true,
        type: {}
    },
    {
        displayName: "30秒おきに",
        nameSpace: "CRC",
        ruleId: 1171,
        visible: true,
        type: {}
    },
    {
        displayName: "60秒おきに",
        nameSpace: "CRC",
        ruleId: 1172,
        visible: true,
        type: {}
    },
    {
        displayName: "5分おきに",
        nameSpace: "CRC",
        ruleId: 1173,
        visible: true,
        type: {}
    },
    {
        displayName: "10分おきに",
        nameSpace: "CRC",
        ruleId: 1174,
        visible: true,
        type: {}
    },
    {
        displayName: "30分おきに",
        nameSpace: "CRC",
        ruleId: 1175,
        visible: true,
        type: {}
    },
    {
        displayName: "Empty rule",
        nameSpace: "CRC",
        ruleId: 1176,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 2",
        nameSpace: "CRC",
        ruleId: 1177,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 3",
        nameSpace: "CRC",
        ruleId: 1178,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 4",
        nameSpace: "CRC",
        ruleId: 1179,
        visible: false,
        type: {}
    }
]
export const rule2 = [
    {
        displayName: "爆発",
        nameSpace: "CRC",
        ruleId: 0,
        visible: true,
        existsubData: true,
        ruleDataJSON: `max`
    },
    {
        displayName: "死",
        nameSpace: "CRC",
        ruleId: 1,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "重力を加える",
        nameSpace: "CRC",
        ruleId: 2,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "ランダムなプレイヤーにテレポート",
        nameSpace: "CRC",
        ruleId: 3,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ブロックを設置",
        nameSpace: "CRC",
        ruleId: 4,
        visible: true,
        existsubData: true,
        ruleDataJSON: `block`
    },
    {
        displayName: "ダメージを与える",
        nameSpace: "CRC",
        ruleId: 5,
        visible: true,
        existsubData: true,
        ruleDataJSON: `damage`
    },
    {
        displayName: "エンティティをスポーン",
        nameSpace: "CRC",
        ruleId: 6,
        visible: true,
        existsubData: true,
        ruleDataJSON: `spawn`
    },
    {
        displayName: "空にテレポート",
        nameSpace: "CRC",
        ruleId: 7,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "打ち上げる",
        nameSpace: "CRC",
        ruleId: 8,
        visible: true,
        existsubData: true,
        ruleDataJSON: `max`
    },
    {
        displayName: "炎上させる",
        nameSpace: "CRC",
        ruleId: 9,
        visible: true,
        existsubData: true,
        ruleDataJSON: `time`
    },
    {
        displayName: "エフェクトを付与する",
        nameSpace: "CRC",
        ruleId: 10,
        visible: true,
        existsubData: true,
        ruleDataJSON: `effectId`
    },
    {
        displayName: "消滅させる",
        nameSpace: "CRC",
        ruleId: 11,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "隕石を降らす",
        nameSpace: "CRC",
        ruleId: 12,
        visible: true,
        existsubData: true,
        ruleDataJSON: `imax`
    },
    {
        displayName: "ホーミングさせる(プレイヤー以外)",
        nameSpace: "CRC",
        ruleId: 13,
        visible: true,
        existsubData: true,
        ruleDataJSON: `hmax`
    },
    {
        displayName: "デスポーンさせる(プレイヤー以外)",
        nameSpace: "CRC",
        ruleId: 14,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなブロックを設置",
        nameSpace: "CRC",
        ruleId: 15,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "エンティティを置き換える",
        nameSpace: "CRC",
        ruleId: 16,
        visible: true,
        existsubData: true,
        ruleDataJSON: `spawn`
    },
    {
        displayName: "コマンドを実行する",
        nameSpace: "CRC",
        ruleId: 17,
        visible: true,
        existsubData: true,
        ruleDataJSON: `command`
    },
    {
        displayName: "ランダムなアイテムをスポーンさせる",
        nameSpace: "CRC",
        ruleId: 18,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "向きをランダムにする",
        nameSpace: "CRC",
        ruleId: 19,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなプレイヤーと位置を入れ替える",
        nameSpace: "CRC",
        ruleId: 20,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "時間を早送りにする",
        nameSpace: "CRC",
        ruleId: 21,
        visible: true,
        existsubData: true,
        ruleDataJSON: `time`
    },
    {
        displayName: "時間を巻き戻しにする",
        nameSpace: "CRC",
        ruleId: 22,
        visible: true,
        existsubData: true,
        ruleDataJSON: `time`
    },
    {
        displayName: "リスポーン地点に戻る",
        nameSpace: "CRC",
        ruleId: 23,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなエフェクトを付与する",
        nameSpace: "CRC",
        ruleId: 24,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "テレポートする",
        nameSpace: "CRC",
        ruleId: 25,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "アイテムをスポーンさせる",
        nameSpace: "CRC",
        ruleId: 26,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "ランダムな範囲でテレポートする",
        nameSpace: "CRC",
        ruleId: 27,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "速度を加える(プレイヤー以外)",
        nameSpace: "CRC",
        ruleId: 28,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: "パーティクルを表示する",
        nameSpace: "CRC",
        ruleId: 29,
        visible: true,
        existsubData: true,
        ruleDataJSON: `particle`
    },
    {
        displayName: "ランダムなパーティクルを表示する",
        nameSpace: "CRC",
        ruleId: 30,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなエンティティをスポーン",
        nameSpace: "CRC",
        ruleId: 31,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "エンティティをミサイルにする",
        nameSpace: "CRC",
        ruleId: 32,
        visible: true,
        existsubData: true,
        ruleDataJSON: `imax`
    },
    {
        displayName: "イベントをキャンセルする",
        nameSpace: "CRC",
        ruleId: 33,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "メッセージを送信する",
        nameSpace: "CRC",
        ruleId: 34,
        visible: true,
        existsubData: true,
        ruleDataJSON: `message`
    },
    {
        displayName: "ルールをランダムで作成する",
        nameSpace: "CRC",
        ruleId: 35,
        visible: true,
        existsubData: true,
        ruleDataJSON: `amount`
    },
    {
        displayName: "ルールをランダムで削除する",
        nameSpace: "CRC",
        ruleId: 36,
        visible: true,
        existsubData: true,
        ruleDataJSON: `amount`
    },
    {
        displayName: "ネームタグを変更する",
        nameSpace: "CRC",
        ruleId: 37,
        visible: true,
        existsubData: true,
        ruleDataJSON: `name`
    },
    {
        displayName: "雷を落とす",
        nameSpace: "CRC",
        ruleId: 38,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなプレイヤーとのインベントリーを入れ替える",
        nameSpace: "CRC",
        ruleId: 39,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなプレイヤーとの視界のブロックを入れ替える",
        nameSpace: "CRC",
        ruleId: 40,
        visible: true,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "溶岩を上に設置",
        nameSpace: "CRC",
        ruleId: 41,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "投擲物を飛ばす",
        nameSpace: "CRC",
        ruleId: 42,
        visible: true,
        existsubData: true,
        ruleDataJSON: `entity`
    },
    {
        displayName: "騎乗させる",
        nameSpace: "CRC",
        ruleId: 43,
        visible: true,
        existsubData: true,
        ruleDataJSON: `entity`
    },
    {
        displayName: "構造物を生成する",
        nameSpace: "CRC",
        ruleId: 44,
        visible: true,
        existsubData: false,
        ruleDataJSON: `x`
    },
    {
        displayName: "入力速度方向に飛ばす",
        nameSpace: "CRC",
        ruleId: 45,
        visible: true,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: {translate: 'commands.origin.server'},
        nameSpace: "CRC",
        ruleId: 46,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "ランダムなストラクチャーを設置",
        nameSpace: "CRC",
        ruleId: 47,
        visible: false,
        existsubData: true,
        ruleDataJSON: `x`
    },
    {
        displayName: {translate: 'potion.harm'},
        nameSpace: "CRC",
        ruleId: 48,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "Unused rule 48",
        nameSpace: "CRC",
        ruleId: 49,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "Unused rule 49",
        nameSpace: "CRC",
        ruleId: 50,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "Unused rule 50",
        nameSpace: "CRC",
        ruleId: 51,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "デバッグ",
        nameSpace: "CRC",
        ruleId: -1,
        visible: false,
        existsubData: true,
        ruleDataJSON: `max`
    },
    {
        displayName: "テスト",
        nameSpace: "CRC",
        ruleId: -2,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "無効",
        nameSpace: "CRC",
        ruleId: -3,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "もし",
        nameSpace: "CRC",
        ruleId: -4,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "かつ",
        nameSpace: "CRC",
        ruleId: -5,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "なら",
        nameSpace: "CRC",
        ruleId: -6,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "実行",
        nameSpace: "CRC",
        ruleId: -7,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "プレイヤー",
        nameSpace: "CRC",
        ruleId: -8,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "エンティティ",
        nameSpace: "CRC",
        ruleId: -9,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
    {
        displayName: "無効",
        nameSpace: "CRC",
        ruleId: -10,
        visible: false,
        existsubData: false,
        ruleDataJSON: null
    },
]
export const rulesData = {
    name: rule.map((r) => r.displayName),
    displayName: rule.filter(r => r.visible === true && !r.type.hasOwnProperty("special")).map((r) => r.displayName),
    displayNameId: rule.filter(r => r.visible === true && !r.type.hasOwnProperty("special")).map((r) => r.ruleId),
    id: rule.map((r) => r.ruleId),
    visible: rule.filter((r) => r.visible === true && !r.type.hasOwnProperty("special")).map((r) => r.visible),
    Allvisible: rule.filter((r) => !r.type.hasOwnProperty("special")).map((r) => r.visible),
    specialDisplayName: rule.filter(r => r.visible === true).map((r) => r.displayName)
}
export const rules2Data = {
    name: rule2.map((r) => r.displayName),
    displayName: rule2.filter(r => r.visible === true).map((r) => r.displayName),
    displayNameId: rule2.filter(r => r.visible === true).map((r) => r.ruleId),
    id: rule2.map((r) => r.ruleId),
    visible: rule2.filter((r) => r.visible === true).map((r) => r.visible),
    Allvisible: rule2.map((r) => r.visible)
}