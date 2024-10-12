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
        displayName: "レバーを動かしたら",
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
        displayName: "プレイヤーの操作が制御されているなら",
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
        displayName: "アイテムを使った際にブロックに触れていたら",
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
        ruleId: 1070,
        visible: true,
        type: {}
    },
    {
        displayName: "30秒おきに",
        nameSpace: "CRC",
        ruleId: 1071,
        visible: true,
        type: {}
    },
    {
        displayName: "60秒おきに",
        nameSpace: "CRC",
        ruleId: 1072,
        visible: true,
        type: {}
    },
    {
        displayName: "Empty rule",
        nameSpace: "CRC",
        ruleId: 1076,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 2",
        nameSpace: "CRC",
        ruleId: 1077,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 3",
        nameSpace: "CRC",
        ruleId: 1078,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 4",
        nameSpace: "CRC",
        ruleId: 1079,
        visible: false,
        type: {}
    },
    {
        displayName: "Empty rule 5",
        nameSpace: "CRC",
        ruleId: 1080,
        visible: false,
        type: {}
    }
]
export const rule2 = [
    {
        displayName: "爆発",
        nameSpace: "CRC",
        ruleId: 0,
        visible: true
    },
    {
        displayName: "死",
        nameSpace: "CRC",
        ruleId: 1,
        visible: true
    },
    {
        displayName: "重力を加える",
        nameSpace: "CRC",
        ruleId: 2,
        visible: true
    },
    {
        displayName: "ランダムなプレイヤーにテレポート",
        nameSpace: "CRC",
        ruleId: 3,
        visible: true
    },
    {
        displayName: "ブロックを設置",
        nameSpace: "CRC",
        ruleId: 4,
        visible: true
    },
    {
        displayName: "ダメージを与える",
        nameSpace: "CRC",
        ruleId: 5,
        visible: true
    },
    {
        displayName: "エンティティをスポーン",
        nameSpace: "CRC",
        ruleId: 6,
        visible: true
    },
    {
        displayName: "空にテレポート",
        nameSpace: "CRC",
        ruleId: 7,
        visible: true
    },
    {
        displayName: "打ち上げる",
        nameSpace: "CRC",
        ruleId: 8,
        visible: true
    },
    {
        displayName: "炎上させる",
        nameSpace: "CRC",
        ruleId: 9,
        visible: true
    },
    {
        displayName: "エフェクトを付与する",
        nameSpace: "CRC",
        ruleId: 10,
        visible: true
    },
    {
        displayName: "消滅させる",
        nameSpace: "CRC",
        ruleId: 11,
        visible: true
    },
    {
        displayName: "隕石を降らす",
        nameSpace: "CRC",
        ruleId: 12,
        visible: true
    },
    {
        displayName: "ホーミングさせる(プレイヤー以外)",
        nameSpace: "CRC",
        ruleId: 13,
        visible: true
    },
    {
        displayName: "デスポーンさせる(プレイヤー以外)",
        nameSpace: "CRC",
        ruleId: 14,
        visible: true
    },
    {
        displayName: "ランダムなブロックを設置",
        nameSpace: "CRC",
        ruleId: 15,
        visible: true
    },
    {
        displayName: "エンティティを置き換える",
        nameSpace: "CRC",
        ruleId: 16,
        visible: true
    },
    {
        displayName: "コマンドを実行する",
        nameSpace: "CRC",
        ruleId: 17,
        visible: true
    },
    {
        displayName: "ランダムなアイテムをスポーンさせる",
        nameSpace: "CRC",
        ruleId: 18,
        visible: true
    },
    {
        displayName: "向きをランダムにする",
        nameSpace: "CRC",
        ruleId: 19,
        visible: true
    },
    {
        displayName: "ランダムなプレイヤーと位置を入れ替える",
        nameSpace: "CRC",
        ruleId: 20,
        visible: true
    },
    {
        displayName: "時間を早送りにする",
        nameSpace: "CRC",
        ruleId: 21,
        visible: true
    },
    {
        displayName: "時間を巻き戻しにする",
        nameSpace: "CRC",
        ruleId: 22,
        visible: true
    },
    {
        displayName: "リスポーン地点に戻る",
        nameSpace: "CRC",
        ruleId: 23,
        visible: true
    },
    {
        displayName: "ランダムなエフェクトを付与する",
        nameSpace: "CRC",
        ruleId: 24,
        visible: true
    },
    {
        displayName: "テレポートする",
        nameSpace: "CRC",
        ruleId: 25,
        visible: true
    },
    {
        displayName: "アイテムをスポーンさせる",
        nameSpace: "CRC",
        ruleId: 26,
        visible: true
    },
    {
        displayName: "ランダムな範囲でテレポートする",
        nameSpace: "CRC",
        ruleId: 27,
        visible: true
    },
    {
        displayName: "速度を加える(プレイヤー以外)",
        nameSpace: "CRC",
        ruleId: 28,
        visible: true
    },
    {
        displayName: "パーティクルを表示する",
        nameSpace: "CRC",
        ruleId: 29,
        visible: true
    },
    {
        displayName: "ランダムなパーティクルを表示する",
        nameSpace: "CRC",
        ruleId: 30,
        visible: true
    },
    {
        displayName: "ランダムなエンティティをスポーン",
        nameSpace: "CRC",
        ruleId: 31,
        visible: true
    },
    {
        displayName: "エンティティをミサイルにする",
        nameSpace: "CRC",
        ruleId: 32,
        visible: true
    },
    {
        displayName: "イベントをキャンセルする",
        nameSpace: "CRC",
        ruleId: 33,
        visible: true
    },
    {
        displayName: "メッセージを送信する",
        nameSpace: "CRC",
        ruleId: 34,
        visible: true
    },
    {
        displayName: "Empty rule",
        nameSpace: "CRC",
        ruleId: 35,
        visible: false
    },
    {
        displayName: "Empty rule 2",
        nameSpace: "CRC",
        ruleId: 36,
        visible: false
    },
    {
        displayName: "Empty rule 3",
        nameSpace: "CRC",
        ruleId: 37,
        visible: false
    },
    {
        displayName: "雷を落とす",
        nameSpace: "CRC",
        ruleId: 38,
        visible: false
    },
    {
        displayName: "Unused rule 38",
        nameSpace: "CRC",
        ruleId: 39,
        visible: false
    },
    {
        displayName: "Unused rule 39",
        nameSpace: "CRC",
        ruleId: 40,
        visible: false
    },
    {
        displayName: "溶岩を上に設置",
        nameSpace: "CRC",
        ruleId: 41,
        visible: false
    },
    {
        displayName: "Unused rule 41",
        nameSpace: "CRC",
        ruleId: 42,
        visible: false
    },
    {
        displayName: "Unused rule 42",
        nameSpace: "CRC",
        ruleId: 43,
        visible: false
    },
    {
        displayName: "Unused rule 43",
        nameSpace: "CRC",
        ruleId: 44,
        visible: false
    },
    {
        displayName: {translate: 'book.finalizeButton'},
        nameSpace: "CRC",
        ruleId: 45,
        visible: false
    },
    {
        displayName: {translate: 'commands.origin.server'},
        nameSpace: "CRC",
        ruleId: 46,
        visible: false
    },
    {
        displayName: "Unused rule 46",
        nameSpace: "CRC",
        ruleId: 47,
        visible: false
    },
    {
        displayName: {translate: 'potion.harm'},
        nameSpace: "CRC",
        ruleId: 48,
        visible: false
    },
    {
        displayName: "Unused rule 48",
        nameSpace: "CRC",
        ruleId: 49,
        visible: false
    },
    {
        displayName: "Unused rule 49",
        nameSpace: "CRC",
        ruleId: 50,
        visible: false
    },
    {
        displayName: "Unused rule 50",
        nameSpace: "CRC",
        ruleId: 51,
        visible: false
    },
    {
        displayName: "デバッグ",
        nameSpace: "CRC",
        ruleId: -1,
        visible: false
    },
    {
        displayName: "テスト",
        nameSpace: "CRC",
        ruleId: -2,
        visible: false
    },
    {
        displayName: "無効",
        nameSpace: "CRC",
        ruleId: -3,
        visible: false
    },
    {
        displayName: "もし",
        nameSpace: "CRC",
        ruleId: -4,
        visible: false
    },
    {
        displayName: "かつ",
        nameSpace: "CRC",
        ruleId: -5,
        visible: false
    },
    {
        displayName: "なら",
        nameSpace: "CRC",
        ruleId: -6,
        visible: false
    },
    {
        displayName: "実行",
        nameSpace: "CRC",
        ruleId: -7,
        visible: false
    },
    {
        displayName: "プレイヤー",
        nameSpace: "CRC",
        ruleId: -8,
        visible: false
    },
    {
        displayName: "エンティティ",
        nameSpace: "CRC",
        ruleId: -9,
        visible: false
    },
    {
        displayName: "無効",
        nameSpace: "CRC",
        ruleId: -10,
        visible: false
    },
]
export const rulesData = {
    name: rule.map((r) => r.displayName),
    displayName: rule.filter(r => r.visible === true && !r.type.hasOwnProperty("special")).map((r) => r.displayName),
    id: rule.map((r) => r.ruleId),
    visible: rule.filter((r) => r.visible === true && !r.type.hasOwnProperty("special")).map((r) => r.visible),
    Allvisible: rule.filter((r) => !r.type.hasOwnProperty("special")).map((r) => r.visible),
    specialDisplayName: rule.filter(r => r.visible === true).map((r) => r.displayName)
}
export const rules2Data = {
    name: rule2.map((r) => r.displayName),
    displayName: rule2.filter(r => r.visible === true).map((r) => r.displayName),
    id: rule2.map((r) => r.ruleId),
    visible: rule2.filter((r) => r.visible === true).map((r) => r.visible),
    Allvisible: rule2.map((r) => r.visible)
}