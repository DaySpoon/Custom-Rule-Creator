import { world, system, WeatherType, ItemStack, MolangVariableMap, Player, BlockTypes, EffectTypes, EntityTypes, ItemTypes, WorldAfterEvents, EntityHurtAfterEvent, WorldBeforeEvents, Block, GameMode, DyeColor, Entity, EntityDamageCause, HudElement, HudElementsCount, EasingType, EffectType, DimensionTypes, DimensionType } from "@minecraft/server"
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui"
import { EntityMaxDistance, EntityMinDistance, PlayerMaxDistance, PlayerMinDistance, enableAddonStatus, mobLimit } from "./config";
import { pack } from "./Expansion_pack/Pack";
import { enableExpansionPack } from "./config";
// 弄らないでください
//定義
const Version = "β1.5"
const AddonName = "CRC"
let error = false;
export const rule = [
    "爆発したら",
    "ダメージを受けたら",
    "ジャンプしたら",
    "スニークしたら",
    "走ったら",
    "ブロックを破壊したら",
    "ブロックを置いたら",
    "ボタンを押したら",
    "メッセージを送ったら",
    "死んだら",
    "スポーンしたら",
    "エンティティを右クリックしたら",
    "ブロックを右クリックしたら",
    "レバーを動かしたら",
    "エンティティがスポーンしたら",
    "エフェクトが付与されたら",
    "ダメージを与えたら",
    "発射体がエンティティにヒットしたら",
    "エンティティに近づいたら",
    "エンティティが近づいたら",
    "エンティティ同士が近づいたら",
    "発射体がブロックにヒットしたら",
    "寝たら",
    "エモートしているなら",
    "水中なら",
    "落下しているなら",
    "泳いだら",
    "地面に触れたら",
    "天気が変わったら",
    "アイテムを使ったら",
    "アイテムを使い始めたら",
    "アイテムを使い終わったら",
    "アイテムがクールダウン中なら",
    "アイテムのクールダウンが終わったら",
    "ディメンションを移動したら",
    "登っていたら",
    "飛んでいたら",
    "エンティティが右クリックされたら",
    "エンティティを倒したら",
    "投擲物を発射したら",
    "視点の先にエンティティがいたら",
    "エンティティが視点を合わせられていたら",
    "上を見たら",
    "下を見たら",
    "プレイヤーがエモートしたら",
    "プレイヤーがゲームモードを変更したら",
    "奈落に落ちたら",
    "最高高度に達しているなら",
    "ターゲットにされているなら",
    "エンティティのターゲットなら",
    "頭上のブロックが空気なら",
    "頭上のブロックが空気じゃないなら",
    "ワールドに参加したら",
    "プレイヤーの操作が制御されているなら",
    "体力の数値が変動したら",
    "エンティティが読み込まれたら",
    "ブロックを爆発したら",
    "ブロックが爆発されたら",
    "イベントがトリガーしたら",
    "プレイヤーが退出したら",
    "エンティティがデスポーンしたら",
    "エンティティが爆発したブロックなら",
    "サーバーからのメッセージが返されたとき",
    "プレイヤーからメッセージが送られたとき",
    "10秒おきに",
    "30秒おきに",
    "60秒おきに"
]
export const rule2 = [
    "爆発",
    "死",
    "重力を加える",
    "ランダムなプレイヤーにテレポート",
    "ブロックを設置",
    "ダメージを与える",
    "エンティティをスポーン",
    "空にテレポート",
    "打ち上げる",
    "炎上させる",
    "エフェクトを付与する",
    "消滅させる",
    "隕石を降らす",
    "ホーミングさせる(プレイヤー以外)",
    "デスポーンさせる(プレイヤー以外)",
    "ランダムなブロックを設置",
    "エンティティを置き換える",
    "コマンドを実行する",
    "ランダムなアイテムをスポーンさせる",
    "向きをランダムにする",
    "ランダムなプレイヤーと位置を入れ替える",
    "時間を早送りにする",
    "時間を巻き戻しにする",
    "リスポーン地点に戻る",
    "ランダムなエフェクトを付与する",
    "テレポートする",
    "アイテムをスポーンさせる",
    "ランダムな範囲でテレポートする",
    "速度を加える(プレイヤー以外)",
    "パーティクルを表示する",
    "ランダムなパーティクルを表示する",
    "ランダムなエンティティをスポーン"
]
export let r = []
export let s = []
export let packs = []
export let packNames = []
let n;
if (enableExpansionPack) {
    n = pack.map(p => p.ruleDisplay)
    n.forEach(n => {
        r.push(`${n.nameSpace}:${n.name}`)
        s.push(`${n.name}`)
        packNames.push(`${n.nameSpace}`)
    })
    packs = packNames.filter((element, index) => {
        return packNames.indexOf(element) == index;
    })
}
export const random = EntityTypes.getAll().map((b) => b.id)
export const random2 = EffectTypes.getAll().map((b) => b.getName())
export const random3 = BlockTypes.getAll().map((b) => b.id)
export const random4 = ItemTypes.getAll().map((b) => b.id)
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
//セットアップ用
world.afterEvents.playerSpawn.subscribe((data) => {
    if (data.initialSpawn) {
        if (world.getDynamicProperty("CRC:rules") === undefined) {
            try {
                const datas = {
                    rule: [],
                    subRule: []
                }
                world.setDynamicProperty("CRC:rules", JSON.stringify(datas))
                world.setDynamicProperty("FallingBlock", false)
                world.setDynamicProperty("Item", false)
                world.setDynamicProperty("Xp", false)
                world.setDynamicProperty("EntityKill", true)
                world.setDynamicProperty("Stop", false)
                world.setDynamicProperty("void_detect", -64)
                world.setDynamicProperty("sky_detect", 320)
                world.setDynamicProperty("spawnY", 70)
                system.runTimeout(() => {
                    world.sendMessage(`§l§e[${AddonName} ${Version}] セットアップが完了しました！`)
                    world.sendMessage(`§l§e[${AddonName} ${Version}] 権限者が棒を持って右クリックすることでメニューが開けます。`)
                    data.player.playSound("random.levelup", { volume: 1, pitch: 1 })
                }, 40)
            } catch (e) {
                world.sendMessage(`§l§c[${AddonName} ${Version}] エラーが発生しました。下記のエラーをアドオン製作者に報告してください。\n\n${e}`)
            }
        }
        if (data.player.getDynamicProperty("indying") === true) {
            data.player.onScreenDisplay.resetHudElements()
            data.player.camera.clear()
            data.player.inputPermissions.movementEnabled = true
            data.player.setDynamicProperty("indying", false)
        }
        if (data.player.getDynamicProperty("indying2") === true) {
            data.player.onScreenDisplay.resetHudElements()
            data.player.camera.clear()
            data.player.setDynamicProperty("indying2", false)
        }
        system.runTimeout(() => {
            if (enableAddonStatus) {
                data.player.sendMessage(`§l§a[${AddonName} ${Version}] §r§a現在アドオンが導入されています。\n§a製作者のリンク: https://www.youtube.com/@user-dayspoonkarkar\n§aダウンロードリンク: https://github.com/DaySpoon/Custom-Rule-Creator/releases`)
            }
            data.player.sendMessage(`${enableExpansionPack ? `§l§2[${AddonName} ${Version}] §r§e拡張パック導入済：${packs.length}個のパックがあります` : ``}`)
        }, 40)
    }
})
//ここから下はシステムです
world.afterEvents.itemUse.subscribe(data => {
    let main = []
    let sub = []
    const item = data.itemStack.typeId
    const itemst = data.itemStack
    const sender = data.source
    if (item === "minecraft:stick" && sender.isOp()) {
        const dins = {
            a: "5",
            b: "g",
            c: "test5"
        }
        const test = {
            rule: [
                {
                    a: "0",
                    b: "a",
                    c: "test"
                },
                {
                    a: "1",
                    b: "g",
                    c: "test2"
                },
                {
                    a: "5",
                    b: "g",
                    c: "test5"
                }
            ]
        }
        const get = test.rule
        // console.warn(`${get}`)
        // console.warn(`${world.getDynamicProperty("CRC:rules")}`)
        let ui = new ActionFormData()
        ui.title("§l§aCustom Rule Creator")
        ui.body(`${enableExpansionPack ? `拡張パック導入済：${packs.length}個のパックがあります` : ``}`)
        ui.button("ルールリスト", "textures/ui/creative_icon")
        ui.button("セーブデータ", "textures/ui/copy")
        ui.button("設定", "textures/ui/icon_setting")
        ui.button("gui.close")
        ui.show(sender).then(({ selection, canceled }) => {
            if (canceled) return;
            let parse = [];
            const rules = rule.concat(r)
            const ruleNames = rule.concat(s)
            const old_rule = rule
            if (selection === 0) {
                let rule1;
                if (GetRulesRawData() !== undefined) {
                    rule1 = GetRulesRawData().rules
                    rule1.forEach((ru) => {
                        parse.push(ru)
                    })
                }
                else {
                    rule1 = 0;
                }
                let ui = new ActionFormData()
                ui.title("ルールリスト")
                ui.body(`決められてるルール:${parse.length}\n現時点で出来る組み合わせ:${rules.length * rule2.length}通り！`)
                ui.button("§aルールを作る", "textures/ui/color_plus")
                ui.button("§cルールを削除", "textures/ui/trash")
                ui.button("§eランダムなルール", "textures/ui/icon_random")
                for (let i = 0; i < rule1.length; i++) {
                    ui.button(`§l§2ルール${i + 1}\n§r§eもし${ruleNames[parse[i].if]}${rule2[parse[i].run]}`)
                }
                ui.show(sender).then(({ selection, canceled }) => {
                    if (canceled) return;
                    if (selection === 0) {
                        let ui = new ModalFormData()
                        ui.title("作成")
                        ui.dropdown("もし", rules)
                        ui.dropdown("これを実行", rule2)
                        ui.toggle("フィルター機能", false)
                        ui.slider("確率", 1, 100, 1, 100)
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            let rule = {
                                if: formValues[0],
                                run: formValues[1],
                                filter: {
                                    enable: formValues[2],
                                    except: false,
                                    entites: null
                                },
                                par: formValues[3],
                                id: password(6)
                            }
                            if (formValues[2] === true) {
                                let ui = new ModalFormData()
                                ui.title("フィルター機能")
                                ui.textField("エンティティId(複数追加可能)", "ex:minecraft:zombie,minecraft:creeper")
                                ui.toggle("上記のエンティティ以外を検知する", false)
                                ui.show(sender).then(({ formValues, canceled }) => {
                                    if (canceled) return;
                                    if (isNaN(formValues[0])) {
                                        const entites = formValues[0].split(",")
                                        let rand = random
                                        if (formValues[1] === true) {
                                            try {
                                                // entites.forEach((type) => {
                                                //     if (rand.find((t) => t === type)) {
                                                //         const i = rand.findIndex((t) => t === type)
                                                //         rand.splice(i, 1)
                                                //     }
                                                // })
                                                // rule.filter.entites = rand
                                                rule.filter.except = true
                                                rule.filter.entites = entites
                                                sender.sendMessage("§aフィルター登録をしました。")
                                                datase()
                                            } catch (e) {
                                                sender.sendMessage(`§cエラーが発生しました。`)
                                            }
                                        }
                                        else {
                                            try {
                                                rule.filter.entites = entites
                                                sender.sendMessage("§aフィルター登録をしました。")
                                                datase()
                                            } catch (e) {
                                                sender.sendMessage(`§cエラーが発生しました。`)
                                            }
                                        }
                                    }
                                    else {
                                        sender.sendMessage("§cエンティティIdを入力してください。")
                                    }
                                })
                            }
                            else {
                                datase()
                            }
                            function datase() {
                                if (old_rule.length > formValues[0]) {
                                    ruleData(sender, rule2[formValues[1]], rule)
                                }
                                else {
                                    if (enableExpansionPack === true) {
                                        let first = undefined
                                        if (world.getDynamicProperty("CRC:rules")) {
                                            first = JSON.parse(world.getDynamicProperty("CRC:rules"))
                                        }
                                        let i = formValues[0] - old_rule.length
                                        if (pack[i].ruleForm.enable) {
                                            pack[i].ruleForm.form(sender, first, formValues, rule2[formValues[1]], rule)
                                        }
                                        else {
                                            ruleData(sender, rule2[formValues[1]], rule)
                                        }
                                    }
                                    else {
                                        sender.sendMessage("§cエラーが発生しました。")
                                    }
                                }
                            }
                        })
                    }
                    else if (selection === 1) {
                        if (rule1.length) {
                            let data = []
                            for (let i = 0; i < rule1.length; i++) {
                                data.push(`ルール${i + 1} : もし${ruleNames[parse[i].if]}${rule2[parse[i].run]}`)
                            }
                            let ui = new ModalFormData()
                            ui.title("§c削除")
                            ui.dropdown("\n\n\n§c※送信を押すとすぐに削除されます。\n§rルールの削除", data)
                            ui.toggle("全てのルールを削除", false)
                            ui.show(sender).then(({ formValues, canceled }) => {
                                if (canceled) return;
                                if (formValues[1]) {
                                    const data = {
                                        rule: [],
                                        subRule: []
                                    }
                                    world.setDynamicProperty("CRC:rules", JSON.stringify(data))
                                    sender.sendMessage("§aルールを全て削除しました。")
                                }
                                else {
                                    let parse = rule1[formValues[0]]
                                    let dt = []
                                    let subrule = [];
                                    if (parse.run === 0 || parse.run === 2 || parse.run === 4 || parse.run === 5 || parse.run === 6 || parse.run === 8 || parse.run === 9 || parse.run === 10 || parse.run === 12 || parse.run === 13 || parse.run === 15 || parse.run === 16 || parse.run === 17 || parse.run === 21 || parse.run === 22 || parse.run === 25 || parse.run === 26 || parse.run === 27 || parse.run === 28 || parse.run === 29) {
                                        let subs;
                                        const sr = JSON.parse(world.getDynamicProperty("CRC:rules")).subRule
                                        sr.forEach((s) => {
                                            subrule.push(JSON.stringify(s))
                                        })
                                        if (parse.run === 0) subs = subrule.filter((tag, i) => tag.startsWith(`{"max`))
                                        if (parse.run === 2) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 4) subs = subrule.filter((tag, i) => tag.startsWith(`{"block`))
                                        if (parse.run === 5) subs = subrule.filter((tag, i) => tag.startsWith(`{"damage`))
                                        if (parse.run === 6) subs = subrule.filter((tag, i) => tag.startsWith(`{"spawn`))
                                        if (parse.run === 8) subs = subrule.filter((tag, i) => tag.startsWith(`{"max`))
                                        if (parse.run === 9) subs = subrule.filter((tag, i) => tag.startsWith(`{"time`))
                                        if (parse.run === 10) subs = subrule.filter((tag, i) => tag.startsWith(`{"effectId`))
                                        if (parse.run === 12) subs = subrule.filter((tag, i) => tag.startsWith(`{"imax`))
                                        if (parse.run === 13) subs = subrule.filter((tag, i) => tag.startsWith(`{"hmax`))
                                        if (parse.run === 15) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 16) subs = subrule.filter((tag, i) => tag.startsWith(`{"spawn`))
                                        if (parse.run === 17) subs = subrule.filter((tag, i) => tag.startsWith(`{"command`))
                                        if (parse.run === 18) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 21) subs = subrule.filter((tag, i) => tag.startsWith(`{"time`))
                                        if (parse.run === 22) subs = subrule.filter((tag, i) => tag.startsWith(`{"time`))
                                        if (parse.run === 25) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 26) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 27) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 28) subs = subrule.filter((tag, i) => tag.startsWith(`{"particle`))
                                        if (parse.run === 29) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                        subs.forEach((tag) => {
                                            dt.push(JSON.parse(tag))
                                        })
                                        const sub = dt.find((tag) => tag.id === parse.id)
                                        const maindatas = JSON.parse(world.getDynamicProperty("CRC:rules")).rule
                                        const subdatas = JSON.parse(world.getDynamicProperty("CRC:rules")).subRule
                                        const i = getIndex(subdatas, sub)
                                        subdatas.splice(i, 1)
                                        maindatas.splice(formValues[0], 1)
                                        const resultData = {
                                            rule: maindatas,
                                            subRule: subdatas
                                        }
                                        world.setDynamicProperty("CRC:rules", JSON.stringify(resultData))
                                        sender.sendMessage("§aルールを削除しました。")
                                    }
                                    else {
                                        const maindatas = JSON.parse(world.getDynamicProperty("CRC:rules")).rule
                                        const subdatas = JSON.parse(world.getDynamicProperty("CRC:rules")).subRule
                                        maindatas.splice(formValues[0], 1)
                                        const resultData = {
                                            rule: maindatas,
                                            subRule: subdatas
                                        }
                                        world.setDynamicProperty("CRC:rules", JSON.stringify(resultData))
                                        sender.sendMessage("§aルールを削除しました。")
                                    }
                                }
                            })
                        }
                        else {
                            sender.sendMessage("§cルールがありません！")
                        }
                    }
                    else if (selection === 2) {
                        let ui = new ModalFormData()
                        ui.title("§eランダムなルール")
                        ui.slider("作成する数", 1, 10, 1, 5)
                        ui.toggle("前のルールを全て削除してから作る", false)
                        ui.toggle("ランダムフィルター機能", false)
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            if (formValues[1]) {
                                const data = {
                                    rule: [],
                                    subRule: []
                                }
                                world.setDynamicProperty("CRC:rules", JSON.stringify(data))
                            }
                            for (let i = 0; i < formValues[0]; i++) {
                                let rule_obj;
                                if (formValues[2] === true) {
                                    let enti = []
                                    for (let i = 0; i < getRandom(2, getRandom(3, 20)); i++) {
                                        enti.push(random[getRandom(0, random.length - 1)])
                                    }
                                    rule_obj = {
                                        if: getRandom(0, rule.length - 1),
                                        run: getRandom(0, rule2.length - 1),
                                        filter: {
                                            enable: getRandomBool(),
                                            except: getRandomBool(),
                                            entites: enti
                                        },
                                        par: getRandom(1, 100),
                                        id: password(6)
                                    }
                                }
                                else {
                                    rule_obj = {
                                        if: getRandom(0, rule.length - 1),
                                        run: getRandom(0, rule2.length - 1),
                                        filter: {
                                            enable: false,
                                            except: false,
                                            entites: null
                                        },
                                        par: getRandom(1, 100),
                                        id: password(6)
                                    }
                                }
                                if (rule2[rule_obj.run] === "重力を加える") {
                                    let rule2_obj = {
                                        x: getRandom(-200, 200),
                                        w: getRandom(-200, 200),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ブロックを設置") {
                                    let rule2_obj = {
                                        block: random3[getRandom(0, random3.length - 1)],
                                        x: getRandom(-2, 2),
                                        y: getRandom(-2, 2),
                                        z: getRandom(-2, 2),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "エンティティをスポーン") {
                                    let rule2_obj = {
                                        spawn: random[getRandom(0, random.length - 1)],
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ダメージを与える") {
                                    let rule2_obj = {
                                        damage: getRandom(0, 40),
                                        causes: cause[getRandom(0, cause.length - 1)],
                                        entitytype: random[0, random.length - 1],
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "炎上させる") {
                                    let rule2_obj = {
                                        time: getRandom(1, 300),
                                        effect: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "エフェクトを付与する") {
                                    let rule2_obj = {
                                        effectId: random2[getRandom(0, random2.length - 1)],
                                        time: getRandom(1, 300),
                                        level: getRandom(1, 255),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "爆発") {
                                    let rule2_obj = {
                                        max: getRandom(6, 30),
                                        min: getRandom(0, 5),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "打ち上げる") {
                                    let rule2_obj = {
                                        max: getRandom(6, 30),
                                        min: getRandom(0, 5),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "隕石を降らす") {
                                    let rule2_obj = {
                                        imax: getRandom(7, 40),
                                        imin: getRandom(0, 6),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        mob: random[getRandom(0, random.length - 1)],
                                        x: getRandom(-200, 200),
                                        y: getRandom(-200, 200),
                                        z: getRandom(-200, 200),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ホーミングさせる(プレイヤー以外)") {
                                    let rule2_obj = {
                                        hmax: getRandom(6, 30),
                                        hmin: getRandom(0, 5),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ランダムなブロックを設置") {
                                    let rule2_obj = {
                                        x: getRandom(-2, 2),
                                        y: getRandom(-2, 2),
                                        z: getRandom(-2, 2),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "エンティティを置き換える") {
                                    let rule2_obj = {
                                        spawn: random[getRandom(0, random.length - 1)],
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "コマンドを実行する") {
                                    let rule2_obj = {
                                        command: `effect @s ${random2[getRandom(0, random2.length - 1)]} ${getRandom(1, 300)} ${getRandom(1, 255)}`,
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ランダムなアイテムをスポーンさせる") {
                                    let rule2_obj = {
                                        x: getRandom(-100, 100, true),
                                        y: getRandom(0, 320, true),
                                        z: getRandom(-100, 100, true),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "時間を早送りにする") {
                                    let rule2_obj = {
                                        time: getRandom(1, 10000, true),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "時間を巻き戻しにする") {
                                    if (canceled) return;
                                    let rule2_obj = {
                                        time: getRandom(1, 10000, true),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "テレポートする") {
                                    let rule2_obj = {
                                        x: getRandom(-5000, 5000, true),
                                        y: getRandom(-64, 320, true),
                                        z: getRandom(-5000, 5000, true),
                                        dimensiontype: DimensionTypes.getAll()[getRandom(0, DimensionTypes.getAll().length - 1)].typeId,
                                        keep: getRandomBool(),
                                        check: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "アイテムをスポーンさせる") {
                                    let rule2_obj = {
                                        x: getRandom(-100, 100, true),
                                        y: getRandom(0, 320, true),
                                        z: getRandom(-100, 100, true),
                                        item: random4[getRandom(0, random4.length - 1)],
                                        amount: getRandom(1, 64, true),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ランダムな範囲でテレポートする") {
                                    let rule2_obj = {
                                        x: getRandom(-100, 100, true),
                                        y: getRandom(-64, 320, true),
                                        z: getRandom(-100, 100, true),
                                        dimensiontype: DimensionTypes.getAll()[getRandom(0, DimensionTypes.getAll().length - 1)].typeId,
                                        keep: getRandomBool(),
                                        check: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "速度を加える(プレイヤー以外)") {
                                    let rule2_obj = {
                                        x: getRandom(-100, 100, false),
                                        y: getRandom(-100, 100, false),
                                        z: getRandom(-100, 100, false),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "パーティクルを表示する") {
                                    let rule2_obj = {
                                        particle: particles[getRandom(0, particles.length - 1)],
                                        x: getRandom(-10, 10),
                                        y: getRandom(-10, 10),
                                        z: getRandom(-10, 10),
                                        visible: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else if (rule2[rule_obj.run] === "ランダムなパーティクルを表示する") {
                                    let rule2_obj = {
                                        x: getRandom(-10, 10),
                                        y: getRandom(-10, 10),
                                        z: getRandom(-10, 10),
                                        visible: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    setter(rule_obj, rule2_obj)
                                }
                                else {
                                    if (world.getDynamicProperty("CRC:rules")) {
                                        let RawRule = JSON.parse(world.getDynamicProperty("CRC:rules"))
                                        let ruea = RawRule.rule
                                        ruea.push(rule_obj)
                                        const Rdata = {
                                            rule: ruea,
                                            subRule: RawRule.subRule
                                        }
                                        world.setDynamicProperty("CRC:rules", `${JSON.stringify(Rdata)}`)
                                    }
                                }
                                function setter(rule, rule2) {
                                    if (world.getDynamicProperty("CRC:rules")) {
                                        const d = JSON.parse(world.getDynamicProperty("CRC:rules"))
                                        const datarule = d.rule
                                        const datarule2 = d.subRule
                                        datarule2.push(rule2)
                                        datarule.push(rule)
                                        const data = {
                                            rule: datarule,
                                            subRule: datarule2
                                        }
                                        world.setDynamicProperty("CRC:rules", `${JSON.stringify(data)}`)
                                    }
                                }
                            }
                            sender.sendMessage(`§aルールを${formValues[0]}個作成しました。`)
                        })
                    }
                    else {
                        let ui = new ActionFormData()
                        ui.title(`ルール${selection - 2}`)
                        ui.body(`\nもし: ${ruleNames[parse[selection - 3].if]}\n実行: ${rule2[parse[selection - 3].run]}\n確率: ${parse[selection - 3].par}パーセント\nフィルター: ${parse[selection - 3].filter.enable}\n検知対象: ${parse[selection - 3].filter.entites !== null ? parse[selection - 3].filter.entites.join(",") : "none"}${parse[selection - 3].filter.except === true ? "以外" : ""}\n\n\n`)
                        // ui.button("ルールを変更する", "textures/ui/icon_setting")
                        ui.button("gui.close")
                        ui.show(sender).then(({ selection, canceled }) => {
                            if (canceled) return;
                            // if(selection === 0) {
                            //     let ui = new ModalFormData()
                            //     ui.title("変更")
                            //     ui.toggle("フィルター機能", parse[selection - 3].filter.enable)
                            //     ui.slider("確率", 1, 100, 1, parse[selection - 3].par)
                            //     ui.show(sender).then(({ formValues, canceled }) => {
                            //         if(canceled) return;
                            //         if(formValues[0] === true) {
                            //             let ui = new ModalFormData()
                            //             ui.title("フィルター機能")
                            //             ui.textField("エンティティId(複数追加可能)", "ex:minecraft:zombie,minecraft:creeper", parse[selection - 3].filter.entites !== null ? parse[selection - 3].filter.entites.join(",") : "")
                            //             ui.toggle("上記のエンティティ以外を検知する", parse[selection - 3].filter.except)
                            //             ui.show(sender).then(({ formValues, canceled }) => {
                            //                 if (canceled) return;
                            //                 if (isNaN(formValues[0])) {
                            //                     const entites = formValues[0].split(",")
                            //                     let rand = random
                            //                     if (formValues[1] === true) {
                            //                         try {
                            //                             // entites.forEach((type) => {
                            //                             //     if (rand.find((t) => t === type)) {
                            //                             //         const i = rand.findIndex((t) => t === type)
                            //                             //         rand.splice(i, 1)
                            //                             //     }
                            //                             // })
                            //                             // rule.filter.entites = rand
                            //                             parse[selection - 3].filter.except = true
                            //                             parse[selection - 3].filter.entites = entites
                            //                             sender.sendMessage("§aフィルター登録をしました。")
                            //                             setter()
                            //                         } catch (e) {
                            //                             sender.sendMessage(`§cエラーが発生しました。`)
                            //                         }
                            //                     }
                            //                     else {
                            //                         try {
                            //                             parse[selection - 3].filter.entites = entites
                            //                             sender.sendMessage("§aフィルター登録をしました。")
                            //                             datase()
                            //                         } catch (e) {
                            //                             sender.sendMessage(`§cエラーが発生しました。`)
                            //                         }
                            //                     }
                            //                 }
                            //                 else {
                            //                     sender.sendMessage("§cエンティティIdを入力してください。")
                            //                 }
                            //                 function datase() {
                            //                     if (old_rule.length > parse[selection - 3].if) {
                            //                         ruleData(sender, rule2[formValues[1]], rule)
                            //                     }
                            //                     else {
                            //                         if (enableExpansionPack === true) {
                            //                             let first = undefined
                            //                             if (world.getDynamicProperty("CRC:rules")) {
                            //                                 first = JSON.parse(world.getDynamicProperty("CRC:rules"))
                            //                             }
                            //                             let i = parse[selection - 3].if - old_rule.length
                            //                             if (pack[i].ruleForm.enable) {
                            //                                 pack[i].ruleForm.form(sender, first, formValues, rule2[parse[selection - 3].run], parse[selection - 3])
                            //                             }
                            //                             else {
                            //                                 ruleData(sender, rule2[parse[selection - 3].run], parse[selection - 3])
                            //                             }
                            //                         }
                            //                         else {
                            //                             sender.sendMessage("§cエラーが発生しました。")
                            //                         }
                            //                     }
                            //                 }
                            //             })
                            //         }
                            //     })
                            // }
                        })
                    }
                })
            }
            else if (selection === 1) {
                let ui = new ActionFormData()
                ui.title("セーブデータ")
                ui.body("ここではルールのデータをエクスポート、読み込みなどをします。\n注意点:エクスポートする際、設定>>クリエイター>>コンテンツログファイルの有効化をONにしてください。")
                ui.button("セーブデータを読み込む", "textures/ui/free_download_symbol")
                ui.button("データをエクスポート", "textures/servers/export")
                ui.button("gui.close")
                ui.show(sender).then(({ selection, canceled }) => {
                    if (canceled) return;
                    if (selection === 0) {
                        let ui = new ModalFormData()
                        ui.title("セーブデータの読み込み")
                        ui.textField("セーブデータコードの入力", "Save data code...")
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            if (formValues[0] !== undefined && formValues[0] !== "") {
                                try {
                                    let savedata = JSON.parse(formValues[0])
                                    const Description = savedata.SaveData.Description
                                    const Contents = savedata.SaveData.Contents
                                    const SaveData = savedata.SaveData
                                    if (savedata.SaveData.Description.DataName === "CRC") {
                                        if (savedata.SaveData.Contents.Obj.AllowLoad === true) {
                                            if (savedata.SaveData.Description.SaveDataVersion === Version) {
                                                if (SaveData.SaveDataCodeId.match(/(03[0-9a-f]{2})-([0-9a-f]{4})-([0-9a-f]{7})-([0-9a-f]{6})-([0-9a-f]{3}9)/)) {
                                                    if (SaveData.ObjectCode.startsWith("00")) {
                                                        if (SaveData.HandleId.length === 5 && !isNaN(SaveData.HandleId)) {
                                                            if (SaveData.LengthData > 0) {
                                                                if (SaveData.ObjData.RuleDatas.length) {
                                                                    let ok = false;
                                                                    SaveData.ObjData.RuleDatas.forEach((ruleData, i) => {
                                                                        if (ruleData.RuleDataObj.length === 20) {
                                                                            if (ruleData.Path < 100000 && ruleData.Path > -100000) {
                                                                                if (ruleData.UUID.match(/([0-9a-f]{8})-([0-9a-f]{4})-(4[0-9a-f]{3})-([0-9a-f]{4})-([0-9a-f]{12})/)) {
                                                                                    ok = true;
                                                                                }
                                                                                else {
                                                                                    ok = false;
                                                                                }
                                                                            }
                                                                            else {
                                                                                ok = false;
                                                                            }
                                                                        }
                                                                        else {
                                                                            ok = false;
                                                                        }
                                                                    })
                                                                    if (ok) {
                                                                        if (SaveData.ObjData.ObjectDataMemories.length) {
                                                                            let ok2 = false;
                                                                            SaveData.ObjData.ObjectDataMemories.forEach((Data, i) => {
                                                                                if (Data.objectData.startsWith(`{\"if\":`)) {
                                                                                    ok2 = true;
                                                                                }
                                                                                else {
                                                                                    ok2 = false;
                                                                                }
                                                                            })
                                                                            if (ok2) {
                                                                                if (SaveData.ObjData.RuleCodes.length) {
                                                                                    let ok3 = false;
                                                                                    SaveData.ObjData.RuleCodes.forEach((Data, i) => {
                                                                                        if (Data.DataCode === i) {
                                                                                            if (!isNaN(Data.RuleCode)) {
                                                                                                ok3 = true;
                                                                                            }
                                                                                            else {
                                                                                                ok3 = false;
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            ok3 = false;
                                                                                        }
                                                                                    })
                                                                                    if (ok3) {
                                                                                        if (SaveData.ObjData.CompletionCodes.length) {
                                                                                            let ok4 = false;
                                                                                            SaveData.ObjData.CompletionCodes.forEach((code, i) => {
                                                                                                if (code.DataCode === i) {
                                                                                                    if (code.CompletionCode.length === 6) {
                                                                                                        if (code.objCode.length === 11) {
                                                                                                            ok4 = true;
                                                                                                        }
                                                                                                        else {
                                                                                                            ok4 = false;
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        ok4 = false;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    ok4 = false;
                                                                                                }
                                                                                            })
                                                                                            if (ok4) {
                                                                                                if (Contents.serial.SaveID.length === 10) {
                                                                                                    if (Contents.serial.DataIds.Content.Ids.length) {
                                                                                                        let ok5 = false;
                                                                                                        Contents.serial.DataIds.Content.Ids.forEach((code, i) => {
                                                                                                            if (code.Root.startsWith(`Content.Ids.db.RootId.`)) {
                                                                                                                if (code.SerialNumber.length === 10) {
                                                                                                                    ok5 = true;
                                                                                                                }
                                                                                                                else {
                                                                                                                    ok5 = false;
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                ok5 = false;
                                                                                                            }
                                                                                                        })
                                                                                                        if (ok5) {
                                                                                                            if (Contents.serial.DataIds.Content.db.length) {
                                                                                                                let ok6 = false;
                                                                                                                Contents.serial.DataIds.Content.db.forEach((code, i) => {
                                                                                                                    if (code.RootId) {
                                                                                                                        if (code.dataContents.UUID.match(/([0-9a-f]{8})-([0-9a-f]{4})-(4[0-9a-f]{3})-([0-9a-f]{4})-([0-9a-f]{12})/)) {
                                                                                                                            if (code.dataContents.dbCode.length === 4) {
                                                                                                                                ok6 = true;
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                ok6 = false;
                                                                                                                            }
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            ok6 = false;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        ok6 = false;
                                                                                                                    }
                                                                                                                })
                                                                                                                if (ok6) {
                                                                                                                    SaveData.ObjData.ObjectDataMemories.forEach((ru) => {
                                                                                                                        parse.push(JSON.parse(ru.objectData))
                                                                                                                    })
                                                                                                                    let data = []
                                                                                                                    for (let i = 0; i < SaveData.ObjData.ObjectDataMemories.length; i++) {
                                                                                                                        data.push(`ルール${i + 1} : もし${rule[parse[i].if]}${rule2[parse[i].run]}\n`)
                                                                                                                    }
                                                                                                                    let ui = new MessageFormData()
                                                                                                                    ui.title("読み込む")
                                                                                                                    ui.body(`このセーブデータを読み込みますか？\nエクスポート日時:${Description.Create.year}年${Description.Create.month}月${Description.Create.date}日${Description.Create.Type.twoDigit.hour}時${Description.Create.Type.twoDigit.min}分${Description.Create.Type.twoDigit.sec}秒\n\nルール内容(${SaveData.ObjData.ObjectDataMemories.length}件):\n${data.join("")}`)
                                                                                                                    ui.button2("§a読み込む")
                                                                                                                    ui.button1("§cキャンセル")
                                                                                                                    ui.show(sender).then(({ selection, canceled }) => {
                                                                                                                        if (canceled) return;
                                                                                                                        if (selection === 1) {
                                                                                                                            SaveData.ObjData.ObjectDataMemories.forEach((ru) => {
                                                                                                                                if (ru.subData !== null) {
                                                                                                                                    set(sender, ru.objectData, ru.subData)
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    let RawRule = JSON.parse(world.getDynamicProperty("CRC:rules"))
                                                                                                                                    let ruea = RawRule.rule
                                                                                                                                    ruea.push(ru.objectData)
                                                                                                                                    const Rdata = {
                                                                                                                                        rule: ruea,
                                                                                                                                        subRule: RawRule.subRule
                                                                                                                                    }
                                                                                                                                    world.setDynamicProperty("CRC:rules", `${JSON.stringify(Rdata)}`)
                                                                                                                                }
                                                                                                                            })
                                                                                                                            sender.sendMessage("§a読み込みました")
                                                                                                                        }
                                                                                                                        else if (selection === 0) {
                                                                                                                            sender.sendMessage("§cキャンセルしました")
                                                                                                                        }
                                                                                                                        else {

                                                                                                                        }

                                                                                                                    })
                                                                                                                }
                                                                                                                else {
                                                                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                sender.sendMessage("§cエラー:予期しないコンテンツデータ")
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        sender.sendMessage("§cエラー:予期しないコンテンツデータ")
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                }
                                                                                            }
                                                                                            else {
                                                                                                sender.sendMessage("§cエラー:予期しないコンテンツデータ")
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        sender.sendMessage("§cエラー:予期しないObjデータ")
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                }
                                                                            }
                                                                            else {
                                                                                sender.sendMessage("§cエラー:予期しないObjデータ")
                                                                            }
                                                                        }
                                                                        else {
                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                        }
                                                                    }
                                                                    else {
                                                                        sender.sendMessage("§cエラー:予期しないObjデータ")
                                                                    }
                                                                }
                                                                else {
                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                }
                                                            }
                                                            else {
                                                                sender.sendMessage("§cエラー:無効なデータ")
                                                            }
                                                        }
                                                        else {
                                                            sender.sendMessage("§cエラー:無効なハンドルID")
                                                        }
                                                    }
                                                    else {
                                                        sender.sendMessage("§cエラー:無効なオブジェクトコード")
                                                    }
                                                }
                                                else {
                                                    sender.sendMessage("§cエラー:無効なセーブデータコードID")
                                                }
                                            }
                                            else {
                                                let ui = new MessageFormData
                                                ui.title("確認")
                                                ui.body(`このバージョンは最新ではありません。それでも読み込みますか？\n\n現在のアドオンのバージョン : ${Version}\nセーブデータバージョン : ${savedata.SaveData.Description.SaveDataVersion}`)
                                                ui.button2("§aはい")
                                                ui.button1("§cいいえ")
                                                ui.show(sender).then(({ selection, canceled }) => {
                                                    if (canceled) return;
                                                    if (selection === 1) {
                                                        if (SaveData.SaveDataCodeId.match(/(03[0-9a-f]{2})-([0-9a-f]{4})-([0-9a-f]{7})-([0-9a-f]{6})-([0-9a-f]{3}9)/)) {
                                                            if (SaveData.ObjectCode.startsWith("00")) {
                                                                if (SaveData.HandleId.length === 5 && !isNaN(SaveData.HandleId)) {
                                                                    if (SaveData.LengthData > 0) {
                                                                        if (SaveData.ObjData.RuleDatas.length) {
                                                                            let ok = false;
                                                                            SaveData.ObjData.RuleDatas.forEach((ruleData, i) => {
                                                                                if (ruleData.RuleDataObj.length === 20) {
                                                                                    if (ruleData.Path < 100000 && ruleData.Path > -100000) {
                                                                                        if (ruleData.UUID.match(/([0-9a-f]{8})-([0-9a-f]{4})-(4[0-9a-f]{3})-([0-9a-f]{4})-([0-9a-f]{12})/)) {
                                                                                            ok = true;
                                                                                        }
                                                                                        else {
                                                                                            ok = false;
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        ok = false;
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    ok = false;
                                                                                }
                                                                            })
                                                                            if (ok) {
                                                                                if (SaveData.ObjData.ObjectDataMemories.length) {
                                                                                    let ok2 = false;
                                                                                    SaveData.ObjData.ObjectDataMemories.forEach((Data, i) => {
                                                                                        if (Data.objectData.startsWith(`{\"if\":`)) {
                                                                                            ok2 = true;
                                                                                        }
                                                                                        else {
                                                                                            ok2 = false;
                                                                                        }
                                                                                    })
                                                                                    if (ok2) {
                                                                                        if (SaveData.ObjData.RuleCodes.length) {
                                                                                            let ok3 = false;
                                                                                            SaveData.ObjData.RuleCodes.forEach((Data, i) => {
                                                                                                if (Data.DataCode === i) {
                                                                                                    if (!isNaN(Data.RuleCode)) {
                                                                                                        ok3 = true;
                                                                                                    }
                                                                                                    else {
                                                                                                        ok3 = false;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    ok3 = false;
                                                                                                }
                                                                                            })
                                                                                            if (ok3) {
                                                                                                if (SaveData.ObjData.CompletionCodes.length) {
                                                                                                    let ok4 = false;
                                                                                                    SaveData.ObjData.CompletionCodes.forEach((code, i) => {
                                                                                                        if (code.DataCode === i) {
                                                                                                            if (code.CompletionCode.length === 6) {
                                                                                                                if (code.objCode.length === 11) {
                                                                                                                    ok4 = true;
                                                                                                                }
                                                                                                                else {
                                                                                                                    ok4 = false;
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                ok4 = false;
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            ok4 = false;
                                                                                                        }
                                                                                                    })
                                                                                                    if (ok4) {
                                                                                                        if (Contents.serial.SaveID.length === 10) {
                                                                                                            if (Contents.serial.DataIds.Content.Ids.length) {
                                                                                                                let ok5 = false;
                                                                                                                Contents.serial.DataIds.Content.Ids.forEach((code, i) => {
                                                                                                                    if (code.Root.startsWith(`Content.Ids.db.RootId.`)) {
                                                                                                                        if (code.SerialNumber.length === 10) {
                                                                                                                            ok5 = true;
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            ok5 = false;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        ok5 = false;
                                                                                                                    }
                                                                                                                })
                                                                                                                if (ok5) {
                                                                                                                    if (Contents.serial.DataIds.Content.db.length) {
                                                                                                                        let ok6 = false;
                                                                                                                        Contents.serial.DataIds.Content.db.forEach((code, i) => {
                                                                                                                            if (code.RootId) {
                                                                                                                                if (code.dataContents.UUID.match(/([0-9a-f]{8})-([0-9a-f]{4})-(4[0-9a-f]{3})-([0-9a-f]{4})-([0-9a-f]{12})/)) {
                                                                                                                                    if (code.dataContents.dbCode.length === 4) {
                                                                                                                                        ok6 = true;
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        ok6 = false;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    ok6 = false;
                                                                                                                                }
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                ok6 = false;
                                                                                                                            }
                                                                                                                        })
                                                                                                                        if (ok6) {
                                                                                                                            SaveData.ObjData.ObjectDataMemories.forEach((ru) => {
                                                                                                                                parse.push(JSON.parse(ru.objectData))
                                                                                                                            })
                                                                                                                            let data = []
                                                                                                                            for (let i = 0; i < SaveData.ObjData.ObjectDataMemories.length; i++) {
                                                                                                                                data.push(`ルール${i + 1} : もし${rule[parse[i].if]}${rule2[parse[i].run]}\n`)
                                                                                                                            }
                                                                                                                            let ui = new MessageFormData()
                                                                                                                            ui.title("読み込む")
                                                                                                                            ui.body(`このセーブデータを読み込みますか？\nエクスポート日時:${Description.Create.year}年${Description.Create.month}月${Description.Create.date}日${Description.Create.Type.twoDigit.hour}時${Description.Create.Type.twoDigit.min}分${Description.Create.Type.twoDigit.sec}秒\n\nルール内容(${SaveData.ObjData.ObjectDataMemories.length}件):\n${data.join("")}`)
                                                                                                                            ui.button2("§a読み込む")
                                                                                                                            ui.button1("§cキャンセル")
                                                                                                                            ui.show(sender).then(({ selection, canceled }) => {
                                                                                                                                if (canceled) return;
                                                                                                                                if (selection === 1) {
                                                                                                                                    SaveData.ObjData.ObjectDataMemories.forEach((ru) => {
                                                                                                                                        if (ru.subData !== null) {
                                                                                                                                            set(sender, ru.objectData, ru.subData)
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            let RawRule = JSON.parse(world.getDynamicProperty("CRC:rules"))
                                                                                                                                            let ruea = RawRule.rule
                                                                                                                                            ruea.push(ru.objectData)
                                                                                                                                            const Rdata = {
                                                                                                                                                rule: ruea,
                                                                                                                                                subRule: RawRule.subRule
                                                                                                                                            }
                                                                                                                                            world.setDynamicProperty("CRC:rules", `${JSON.stringify(Rdata)}`)
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                    sender.sendMessage("§a読み込みました")
                                                                                                                                }
                                                                                                                                else if (selection === 0) {
                                                                                                                                    sender.sendMessage("§cキャンセルしました")
                                                                                                                                }
                                                                                                                                else {

                                                                                                                                }

                                                                                                                            })
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        sender.sendMessage("§cエラー:予期しないコンテンツデータ")
                                                                                                                    }
                                                                                                                }
                                                                                                                else {
                                                                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                sender.sendMessage("§cエラー:予期しないコンテンツデータ")
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        sender.sendMessage("§cエラー:予期しないコンテンツデータ")
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                                }
                                                                                            }
                                                                                            else {
                                                                                                sender.sendMessage("§cエラー:予期しないObjデータ")
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                        }
                                                                                    }
                                                                                    else {
                                                                                        sender.sendMessage("§cエラー:予期しないObjデータ")
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                                }
                                                                            }
                                                                            else {
                                                                                sender.sendMessage("§cエラー:予期しないObjデータ")
                                                                            }
                                                                        }
                                                                        else {
                                                                            sender.sendMessage("§cエラー:無効なセーブデータ")
                                                                        }
                                                                    }
                                                                    else {
                                                                        sender.sendMessage("§cエラー:無効なデータ")
                                                                    }
                                                                }
                                                                else {
                                                                    sender.sendMessage("§cエラー:無効なハンドルID")
                                                                }
                                                            }
                                                            else {
                                                                sender.sendMessage("§cエラー:無効なオブジェクトコード")
                                                            }
                                                        }
                                                        else {
                                                            sender.sendMessage("§cエラー:無効なセーブデータコードID")
                                                        }
                                                    }
                                                    else if (selection === 0) {
                                                        sender.sendMessage("§aキャンセルしました。")
                                                    }
                                                    else {

                                                    }
                                                })
                                            }
                                        }
                                        else {
                                            sender.sendMessage(`§cそのセーブデータは読み込みを許可していません！`)
                                        }
                                    }
                                    else {
                                        sender.sendMessage("§cそれはこのアドオンで使えるセーブデータではありません！")
                                    }
                                } catch (e) {
                                    sender.sendMessage(`§c${e}\nそれは有効なセーブデータではありません！`)
                                }
                            }
                            else {
                                sender.sendMessage("§c有効なセーブデータを読み込んでください！")
                            }
                        })
                    }
                    else if (selection === 1) {
                        let rule1;
                        if (GetRulesRawData() !== undefined) {
                            rule1 = GetRulesRawData().rules
                            rule1.forEach((ru) => {
                                parse.push(ru)
                            })
                        }
                        else {
                            rule1 = 0;
                        }
                        if (rule1.length) {
                            let data = []
                            for (let i = 0; i < rule1.length; i++) {
                                data.push(`ルール${i + 1} : もし${rule[parse[i].if]}${rule2[parse[i].run]}\n`)
                            }
                            let ui = new MessageFormData()
                            ui.title("エクスポート")
                            ui.body(`現在のルールをエクスポートしますか?\nエクスポート後、セーブデータコードはコンテンツログファイルに記載されています。もし無い場合はもう一度エクスポートしてください。\n\nルール内容(${rule1.length}件):\n${data.join("")}`)
                            ui.button2("§aエクスポート")
                            ui.button1("§cいいえ")
                            ui.show(sender).then(({ selection, canceled }) => {
                                if (canceled) return;
                                if (selection === 1) {
                                    let nowTime = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
                                    let thour = twoDigit(nowTime.getHours());
                                    let tmin = twoDigit(nowTime.getMinutes());
                                    let tsec = twoDigit(nowTime.getSeconds());
                                    let hour = twoDigit(nowTime.getHours());
                                    let min = twoDigit(nowTime.getMinutes());
                                    let sec = twoDigit(nowTime.getSeconds());
                                    let today = new Date();
                                    let year = today.getFullYear();
                                    let month = today.getMonth() + 1;
                                    let date = today.getDate();
                                    let savedata = {
                                        SaveData: {
                                            Description: {
                                                SaveDataVersion: Version,
                                                DataName: "CRC",
                                                Create: {
                                                    year: year,
                                                    month: month,
                                                    date: date,
                                                    Type: {
                                                        twoDigit: {
                                                            hour: thour,
                                                            min: tmin,
                                                            sec: tsec
                                                        },
                                                        normal: {
                                                            hour: hour,
                                                            min: min,
                                                            sec: sec
                                                        }
                                                    }
                                                }
                                            },
                                            SaveDataCodeId: createSaveDataCodeId(),
                                            ObjectCode: `00${password(2)}`,
                                            HandleId: `${password(5)}`,
                                            LengthData: data.length,
                                            ObjData: {
                                                RuleDatas: [],
                                                ObjectDataMemories: [],
                                                RuleCodes: [],
                                                CompletionCodes: []
                                            },
                                            Contents: {
                                                OldVersion: false,
                                                Obj: {
                                                    AllowLoad: true
                                                },
                                                serial: {
                                                    SaveID: `${pass(10)}`,
                                                    DataIds: {
                                                        Content: {
                                                            Ids: [],
                                                            db: []
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    parse.forEach((rule, i) => {
                                        let sd = []
                                        let dll;
                                        if (rule.run === 0 || rule.run === 2 || rule.run === 4 || rule.run === 5 || rule.run === 6 || rule.run === 8 || rule.run === 9 || rule.run === 10 || rule.run === 12 || rule.run === 13 || rule.run === 15 || rule.run === 16 || rule.run === 17 || rule.run === 18 || rule.run === 21 || rule.run === 22 || parse.run === 25 || parse.run === 26 || parse.run === 27 || parse.run === 28 || parse.run === 29) {
                                            let subs = [];
                                            let subrule = [];
                                            const sr = JSON.parse(world.getDynamicProperty("CRC:rules")).subRule
                                            sr.forEach((s) => {
                                                subrule.push(JSON.stringify(s))
                                            })
                                            if (parse.run === 0) subs = subrule.filter((tag, i) => tag.startsWith(`{"max`))
                                            if (parse.run === 2) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            if (parse.run === 4) subs = subrule.filter((tag, i) => tag.startsWith(`{"block`))
                                            if (parse.run === 5) subs = subrule.filter((tag, i) => tag.startsWith(`{"damage`))
                                            if (parse.run === 6) subs = subrule.filter((tag, i) => tag.startsWith(`{"spawn`))
                                            if (parse.run === 8) subs = subrule.filter((tag, i) => tag.startsWith(`{"max`))
                                            if (parse.run === 9) subs = subrule.filter((tag, i) => tag.startsWith(`{"time`))
                                            if (parse.run === 10) subs = subrule.filter((tag, i) => tag.startsWith(`{"effectId`))
                                            if (parse.run === 12) subs = subrule.filter((tag, i) => tag.startsWith(`{"imax`))
                                            if (parse.run === 13) subs = subrule.filter((tag, i) => tag.startsWith(`{"hmax`))
                                            if (parse.run === 15) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            if (parse.run === 16) subs = subrule.filter((tag, i) => tag.startsWith(`{"spawn`))
                                            if (parse.run === 17) subs = subrule.filter((tag, i) => tag.startsWith(`{"command`))
                                            if (parse.run === 18) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            if (parse.run === 21) subs = subrule.filter((tag, i) => tag.startsWith(`{"time`))
                                            if (parse.run === 22) subs = subrule.filter((tag, i) => tag.startsWith(`{"time`))
                                            if (parse.run === 25) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            if (parse.run === 26) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            if (parse.run === 27) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            if (parse.run === 28) subs = subrule.filter((tag, i) => tag.startsWith(`{"particle`))
                                            if (parse.run === 29) subs = subrule.filter((tag, i) => tag.startsWith(`{"x`))
                                            subs.forEach((tag) => {
                                                sd.push(JSON.parse(tag))
                                            })
                                            dll = sd.find((tag) => tag.id === rule.id)
                                            savedata.SaveData.ObjData.ObjectDataMemories.push({
                                                objectData: JSON.stringify(rule),
                                                subData: JSON.stringify(dll)
                                            })
                                        }
                                        else {
                                            savedata.SaveData.ObjData.ObjectDataMemories.push({
                                                objectData: JSON.stringify(rule),
                                                subData: null
                                            })
                                        }
                                        savedata.SaveData.ObjData.RuleCodes.push({
                                            DataCode: i,
                                            RuleCode: rule.id
                                        })
                                        savedata.SaveData.ObjData.CompletionCodes.push({
                                            DataCode: i,
                                            CompletionCode: password(6),
                                            objCode: stringPassword(6) + "-" + password(4)
                                        })
                                        savedata.SaveData.ObjData.RuleDatas.push({
                                            RuleDataObj: id(20),
                                            Path: getRandom(-99999, 99999),
                                            UUID: createUuid()
                                        })
                                        const pas = pass(10)
                                        savedata.SaveData.Contents.serial.DataIds.Content.Ids.push({
                                            Root: `Content.Ids.db.RootId.${pas}`,
                                            SerialNumber: `${password(10)}`
                                        })
                                        savedata.SaveData.Contents.serial.DataIds.Content.db.push({
                                            RootId: pas,
                                            dataContents: {
                                                UUID: createUuid(),
                                                dbCode: `${password(1)}x${pass(2)}`
                                            }
                                        })
                                    })
                                    console.warn(`エクスポート完了: ${JSON.stringify(savedata)}`)
                                    sender.sendMessage(`§aエクスポートが完了しました。\nデータはコンテンツログファイルに保存されています。別のワールドで使う場合はデータをコピーしてセーブデータの読み込みをしてください。`)
                                    system.runTimeout(() => {
                                        console.warn(`エクスポート: 全体まで読み込みました`)
                                    }, 20)
                                }
                                else if (selection === 0) {
                                    sender.sendMessage("§aキャンセルしました。")
                                }
                                else {

                                }
                            })
                        }
                        else {
                            sender.sendMessage("§cルールデータがありません！")
                        }
                    }
                    else {

                    }
                })
            }
            else if (selection === 2) {
                let ui = new ActionFormData()
                ui.title("設定")
                ui.body(``)
                ui.button("ドロップアイテムのクリア", "textures/ui/creator_glyph_color")
                ui.button("Config設定", "textures/items/paper")
                if (enableExpansionPack) ui.button("開発者向けデバッグ", "textures/ui/icon_setting")
                ui.show(sender).then(({ selection, canceled }) => {
                    if (canceled) return;
                    if (selection === 0) {
                        try {
                            const entity = world.getDimension(sender.dimension.id).getEntities({ location: sender.location, maxDistance: 200 }).filter(e => e.typeId === "minecraft:item")
                            entity.forEach((e) => {
                                e.kill()
                            })
                            sender.sendMessage("§aドロップアイテムをkillしました")
                        } catch (e) {
                            sender.sendMessage("§cエラーが出たため、正常にアイテムをkillすることができませんでした")
                        }
                    }
                    if (selection === 1) {
                        let ui = new ModalFormData()
                        ui.title("Config設定")
                        ui.toggle("ブロックエンティティをイベント検知対象に含む", world.getDynamicProperty("FallingBlock"))
                        ui.toggle("アイテムをイベント検知対象に含む(危険！)", world.getDynamicProperty("Item"))
                        ui.toggle("経験値をイベント検知対象に含む(危険！)", world.getDynamicProperty("Xp"))
                        ui.toggle("一定のモブ数を超えたらkillする", world.getDynamicProperty("EntityKill"))
                        ui.slider("奈落判定の高さ", -70, 0, 1, world.getDynamicProperty("void_detect"))
                        ui.slider("最高高度判定の高さ", 2, 320, 1, world.getDynamicProperty("sky_detect"))
                        ui.slider("スポーン座標の高さ", -64, 320, 1, world.getDynamicProperty("spawnY"))
                        ui.toggle("イベントの停止", world.getDynamicProperty("Stop"))
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            world.setDynamicProperty("FallingBlock", formValues[0])
                            world.setDynamicProperty("Item", formValues[1])
                            world.setDynamicProperty("Xp", formValues[2])
                            world.setDynamicProperty("EntityKill", formValues[3])
                            world.setDynamicProperty("void_detect", formValues[4])
                            world.setDynamicProperty("sky_detect", formValues[5])
                            world.setDynamicProperty("spawnY", formValues[6])
                            world.setDynamicProperty("Stop", formValues[7])
                            sender.sendMessage("§a設定を保存しました")
                        })
                    }
                    if (selection === 2) {
                        let ui = new ActionFormData()
                        ui.title("開発者向けデバッグ")
                        ui.body(`AddonName: ${AddonName}\n\nversion: ${Version}\n\nruleData: "CRC:rules"\n\nProperty: ${world.getDynamicProperty("CRC:rules")}`)
                        ui.button("gui.close")
                        ui.show(sender)
                    }
                })
            }
            else {

            }
        })
    }
    else {

    }
})
system.runInterval(() => {
    if (world.getDynamicProperty("CRC:rules") !== undefined) {
        world.getPlayers().forEach(sender => {
            const first = JSON.parse(world.getDynamicProperty("CRC:rules"))
            const entity = sender.dimension.getEntities({ minDistance: PlayerMinDistance, maxDistance: PlayerMaxDistance, location: sender.location })
            const allentity = sender.dimension.getEntities()
            world.getDimension(sender.dimension.id).getEntities().forEach((e) => {
                try {
                    const entities = world.getDimension(e.dimension.id).getEntities({ minDistance: EntityMinDistance, maxDistance: EntityMaxDistance, location: e.location, closest: 1 })[0]
                    if (entities !== undefined) {
                        if (world.getDynamicProperty("FallingBlock") === true) {
                            if (entities.typeId !== "minecraft:item" && entities.typeId !== "minecraft:xp_orb") {
                                event(entities, first, 20)
                            }
                        }
                        if (world.getDynamicProperty("Item") === true) {
                            if (entities.typeId !== "minecraft:falling_block" && entities.typeId !== "minecraft:xp_orb") {
                                event(entities, first, 20)
                            }
                        }
                        if (world.getDynamicProperty("Xp") === true) {
                            if (entities.typeId !== "minecraft:item" && entities.typeId !== "minecraft:falling_block") {
                                event(entities, first, 20)
                            }
                        }
                        if (!world.getDynamicProperty("Xp") && !world.getDynamicProperty("FallingBlock") && !world.getDynamicProperty("Item")) {
                            if (entities.typeId !== "minecraft:item" && entities.typeId !== "minecraft:falling_block" && entities.typeId !== "minecraft:xp_orb") {
                                event(entities, first, 20)
                            }
                        }
                    }
                } catch (e) {

                }
            })
            entity.forEach((e) => {
                if (e !== undefined) {
                    if (world.getDynamicProperty("Item") === true) {
                        event(sender, first, 18)
                        event(e, first, 19)
                    }
                    else {
                        if (e.typeId !== "minecraft:item") {
                            event(sender, first, 18)
                            event(e, first, 19)
                        }
                    }
                }
            })
            allentity.forEach(entity => {
                if (entity.target !== undefined) {
                    event(entity.target, first, 48)
                    event(entity, first, 49)
                }
                if (entity.getEntitiesFromViewDirection().length) {
                    const entities = entity.getEntitiesFromViewDirection()
                    event(entity, first, 40)
                    entities.forEach(e => {
                        event(e.entity, first, 41)
                    })
                }
                if (entity.isSneaking) {
                    event(entity, first, 3)
                }
                if (entity.isSprinting) {
                    event(entity, first, 4)
                }
                if (entity.isSleeping) {
                    event(entity, first, 22)
                }
                if (entity.isInWater) {
                    event(entity, first, 24)
                }
                if (entity.isFalling) {
                    event(entity, first, 25)
                }
                if (entity.isSwimming) {
                    event(entity, first, 26)
                }
                if (entity.isOnGround) {
                    event(entity, first, 27)
                }
                if (entity.isClimbing) {
                    event(entity, first, 35)
                }
            })
            if (sender.isJumping) {
                event(sender, first, 2)
            }
            if (sender.isSneaking) {
                event(sender, first, 3)
            }
            if (sender.isSprinting) {
                event(sender, first, 4)
            }
            if (sender.isSleeping) {
                event(sender, first, 22)
            }
            if (sender.isEmoting) {
                event(sender, first, 23)
            }
            if (sender.isInWater) {
                event(sender, first, 24)
            }
            if (sender.isFalling) {
                event(sender, first, 25)
            }
            if (sender.isSwimming) {
                event(sender, first, 26)
            }
            if (sender.isOnGround) {
                event(sender, first, 27)
            }
            if (sender.isClimbing) {
                event(sender, first, 35)
            }
            if (sender.isFlying) {
                event(sender, first, 36)
            }
            if (sender.getEntitiesFromViewDirection().length) {
                const entities = sender.getEntitiesFromViewDirection()
                event(sender, first, 40)
                entities.forEach(e => {
                    event(e.entity, first, 41)
                })
            }
            if (Math.floor(sender.getRotation().x) <= -50) {
                event(sender, first, 42)
            }
            if (Math.floor(sender.getRotation().x) >= 50) {
                event(sender, first, 43)
            }
            if (sender.location.y <= world.getDynamicProperty("void_detect")) {
                event(sender, first, 46)
            }
            if (sender.location.y >= world.getDynamicProperty("sky_detect")) {
                event(sender, first, 47)
            }
            if (sender.target !== undefined) {
                event(sender.target, first, 48)
                event(sender, first, 49)
            }
            if (sender.dimension.getBlock({ x: sender.location.x, y: sender.location.y + 2, z: sender.location.z }).isAir) {
                event(sender, first, 50)
            }
            else {
                event(sender, first, 51)
            }
            if (enableExpansionPack === true) {
                try {
                    pack.forEach((p, i) => {
                        p.ruleDetect(sender, first, rule.length + i)
                    })
                } catch (e) {
                    if (error === false) {
                        error = true;
                        sender.sendMessage(`§c[Custom Rule Creator Pack Error] ${e}`)
                    }
                }
            }
            else {

            }
        })
    }
}, 1)
system.runInterval(() => {
    if (world.getDynamicProperty("CRC:rules") !== undefined) {
        for (const sender of world.getPlayers()) {
            const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
            event(sender, first, rule.length - 3)
        }
    }
}, 200)
system.runInterval(() => {
    if (world.getDynamicProperty("CRC:rules") !== undefined) {
        for (const sender of world.getPlayers()) {
            const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
            event(sender, first, rule.length - 2)
        }
    }
}, 600)
system.runInterval(() => {
    if (world.getDynamicProperty("CRC:rules") !== undefined) {
        for (const sender of world.getPlayers()) {
            const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
            event(sender, first, rule.length - 1)
        }
    }
}, 1200)
world.beforeEvents.explosion.subscribe(data => {
    const breaks = data.getImpactedBlocks()
    if (data.source !== undefined) {
        const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
        const sender = data.source
        breaks.forEach((block) => {
            event(sender, first, 61, undefined, undefined, block)
        })
        event(sender, first, 0)
    }
})
world.afterEvents.entityHurt.subscribe(data => {
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    const sender = data.hurtEntity
    const cause = data.damageSource.cause
    if (cause !== EntityDamageCause.selfDestruct) {
        event(sender, first, 1)
    }
})
world.beforeEvents.playerBreakBlock.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 5, undefined, undefined, data.block)
})
world.beforeEvents.playerPlaceBlock.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 6, undefined, undefined, data.block)
})
world.afterEvents.buttonPush.subscribe(data => {
    const sender = data.source
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 7, undefined, undefined, data.block)
})
world.afterEvents.chatSend.subscribe(data => {
    const sender = data.sender
    const targets = data.targets
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 8)
    if (targets !== undefined) {
        targets.forEach((player) => {
            event(player, first, 63)
        })
    }
})
world.afterEvents.entityDie.subscribe(data => {
    const sender = data.deadEntity
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 9)
    event(data.damageSource, first, 38)
})
world.afterEvents.playerSpawn.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 10)
    if (data.initialSpawn) {
        event(sender, first, 52)
    }
})
world.afterEvents.playerInteractWithEntity.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 11)
    event(data.target, first, 37)
})
world.afterEvents.playerInteractWithBlock.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 12, undefined, undefined, data.block)
})
world.afterEvents.leverAction.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 13)
})
world.afterEvents.entitySpawn.subscribe(data => {
    if (world.getDynamicProperty("Item") === true) {
        const sender = data.entity
        const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
        event(sender, first, 14)
    }
    else {
        if (data.entity.typeId !== "minecraft:item") {
            const sender = data.entity
            const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
            event(sender, first, 14)
        }
    }
})
world.afterEvents.effectAdd.subscribe(data => {
    const sender = data.entity
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 15)
})
world.afterEvents.entityHurt.subscribe(data => {
    if (data.damageSource.damagingEntity !== undefined) {
        const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
        const sender = data.damageSource.damagingEntity
        event(sender, first, 16)
    }
})
world.afterEvents.projectileHitEntity.subscribe(data => {
    const sender = data.projectile
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 17)
    event(data.source, first, 39)
})
world.afterEvents.projectileHitBlock.subscribe(data => {
    const sender = data.projectile
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 21, undefined, undefined, data.getBlockHit().block)
    event(data.source, first, 39)
})
world.afterEvents.weatherChange.subscribe(data => {
    const sender = world.getAllPlayers()[getRandom(0, world.getAllPlayers().length - 1, true)]
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 28)
})
world.afterEvents.itemUse.subscribe(data => {
    if (data.itemStack.typeId !== "minecraft:stick") {
        const sender = data.source
        const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
        event(sender, first, 29)
    }
})
world.afterEvents.itemStartUse.subscribe(data => {
    const sender = data.source
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 30)
})
world.afterEvents.itemStopUse.subscribe(data => {
    const sender = data.source
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 31)
})
world.afterEvents.itemReleaseUse.subscribe(data => {
    const sender = data.source
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 32)
})
world.afterEvents.itemCompleteUse.subscribe(data => {
    const sender = data.source
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 33)
})
world.afterEvents.playerDimensionChange.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 34)
})
world.afterEvents.playerEmote.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 44)
})
world.afterEvents.playerGameModeChange.subscribe(data => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 45)
})
world.afterEvents.playerInputPermissionCategoryChange.subscribe((data) => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 53)
})
world.afterEvents.entityHealthChanged.subscribe((data) => {
    const sender = data.entity
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 54)
})
world.afterEvents.entityLoad.subscribe((data) => {
    const sender = data.entity
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 55)
})
world.afterEvents.blockExplode.subscribe((data) => {
    const sender = data.source
    const object = data.block
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    if (sender !== undefined) {
        event(sender, first, 56)
        event(sender, first, 57, undefined, undefined, object)
    }
})
world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    try {
        const sender = data.entity
        const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
        event(sender, first, 58)
    } catch (e) { }
})
world.afterEvents.playerLeave.subscribe((data) => {
    const players = world.getAllPlayers()
    const sender = players[getRandom(0, players.length - 1)]
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 59)
})
world.beforeEvents.entityRemove.subscribe((data) => {
    const sender = data.removedEntity
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 60)
})
world.afterEvents.messageReceive.subscribe((data) => {
    const sender = data.player
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    event(sender, first, 62)
})
/**
* @param {Player} sender イベントのターゲット
* @param {Object} first オーナー
* @param {int} index イベントID 使用済: 0-66
* @param {String} variable データ比較用変数
* @param {any} variableData 固有データ変数
* @param {Entity | Block} data 検知別オブジェクト
*/
export function event(sender = Player.prototype, first = Object, index, variable = undefined, variableData = undefined, data = undefined) {
    if (first !== undefined) {
        if (world.getDynamicProperty("CRC:rules") !== undefined) {
            const rules = first.rule.filter((tag, i) => tag.if === index)
            let datas = []
            rules.forEach((tag, i) => {
                datas.push(tag)
            })
            try {
                if (world.getDimension(sender.dimension.id).getEntities({ location: sender.location, maxDistance: 100 }).length < mobLimit || !world.getDynamicProperty("EntityKill")) {
                    if (world.getDynamicProperty("Stop") === false) {
                        datas.forEach((rule => {
                            let v = false;
                            if (rule.hasOwnProperty(variable)) {
                                v = true;
                            }
                            let pars = getRandom(1, 100)
                            try {
                                if (rule.filter.enable === true) {
                                    if (rule.filter.except === true) {
                                        if (!rule.filter.entites.includes(sender.typeId)) {
                                            detect_true()
                                        }
                                    }
                                    else {
                                        if (rule.filter.entites.includes(sender.typeId)) {
                                            detect_true()
                                        }
                                    }
                                }
                                else {
                                    detect_true()
                                }
                                function detect_true() {
                                    if (JSON.stringify(rule[variable]) === JSON.stringify(variableData) || v === false) {
                                        system.run(() => {
                                            if (pars <= rule.par) {
                                                if (rule.run === 0) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"max":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data === undefined) {
                                                        sender.dimension.createExplosion({ x: sender.location.x, y: sender.location.y, z: sender.location.z }, getRandom(sub.min, sub.max), { causesFire: sub.fire, allowUnderwater: sub.water })
                                                    }
                                                    else {
                                                        data.dimension.createExplosion({ x: data.location.x, y: data.location.y, z: data.location.z }, getRandom(sub.min, sub.max), { causesFire: sub.fire, allowUnderwater: sub.water })
                                                    }
                                                }
                                                else if (rule.run === 1) {
                                                    sender.kill()
                                                }
                                                else if (rule.run === 2) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    const { x, y, z } = sender.getViewDirection()
                                                    sender.applyKnockback(x * -sub.x, z * -sub.x, sub.w * -sub.x, sub.x * 1)
                                                }
                                                else if (rule.run === 3) {
                                                    const players = world.getPlayers({ gameMode: GameMode.survival }).filter(p => p.name !== sender.name)
                                                    const target = players[getRandom(0, players.length - 1, true)]
                                                    const tagetLocation = target.location
                                                    world.getDimension(sender.dimension.id).playSound("mob.endermen.portal", sender.location)
                                                    sender.teleport(tagetLocation)
                                                }
                                                else if (rule.run === 4) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"block":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data === undefined) {
                                                        const { x, y, z } = sender.location
                                                        sender.dimension.setBlockType({ x: x + sub.x, y: y + sub.y, z: z + sub.z }, sub.block)
                                                    }
                                                    else {
                                                        data.dimension.setBlockType({ x: data.location.x + sub.x, y: data.location.y + sub.y, z: data.location.z + sub.z }, sub.block)
                                                    }
                                                }
                                                else if (rule.run === 5) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"damage":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    const entity = world.getDimension(sender.dimension.id).getEntities({ minDistance: 1, maxDistance: 100, location: sender.location, closest: 1, type: sub.entitytype })[0] ?? undefined
                                                    if (data === undefined) {
                                                        sender.applyDamage(sub.damage + sub.damage === 0 ? 0.01 : 0, { cause: sub.causes, damagingEntity: entity })
                                                    }
                                                    else {
                                                        sender.applyDamage(sub.damage + sub.damage === 0 ? 0.01 : 0, { cause: sub.causes, damagingEntity: entity, damagingProjectile: data })
                                                    }
                                                }
                                                else if (rule.run === 6) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"spawn":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data === undefined) {
                                                        const { x, y, z } = sender.location
                                                        sender.dimension.spawnEntity(sub.spawn, { x: x, y: y, z: z })
                                                    }
                                                    else {
                                                        data.dimension.spawnEntity(sub.spawn, { x: data.location.x, y: data.location.y, z: data.location.z })
                                                    }
                                                }
                                                else if (rule.run === 7) {
                                                    sender.teleport({ x: sender.location.x, y: sender.location.y + 300, z: sender.location.y })
                                                }
                                                else if (rule.run === 8) {
                                                    try {
                                                        let se = [];
                                                        first.subRule.forEach((s) => {
                                                            se.push(JSON.stringify(s))
                                                        })
                                                        const subs = se.filter((tag, i) => tag.startsWith(`{"max":`))
                                                        let subs2 = []
                                                        subs.forEach((tag, i) => {
                                                            subs2.push(JSON.parse(tag))
                                                        })
                                                        const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                        world.getDimension(sender.dimension.id).playSound("firework.launch", sender.location, { volume: 1, pitch: 0.5 })
                                                        let s = system.runInterval(() => {
                                                            const molang = new MolangVariableMap()
                                                            molang.setColorRGBA(`variable.color`, { red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() })
                                                            try {
                                                                sender.dimension.spawnParticle("minecraft:lava_particle", sender.location, molang)
                                                            } catch (e) {

                                                            }
                                                        })
                                                        system.runTimeout(() => {
                                                            try {
                                                                sender.dimension.createExplosion(sender.location, getRandom(sub.min, sub.max), { causesFire: sub.fire, allowUnderwater: sub.water })
                                                            } catch (e) {

                                                            }
                                                            system.clearRun(s)
                                                        }, 20)
                                                        sender.applyKnockback(0, 0, 5, 2)
                                                    } catch (e) {

                                                    }
                                                }
                                                else if (rule.run === 9) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"time":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    sender.setOnFire(sub.time, sub.effect)
                                                }
                                                else if (rule.run === 10) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"effectId":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    sender.addEffect(sub.effectId, sub.time * 20, { amplifier: sub.level })
                                                }
                                                else if (rule.run === 11) {
                                                    const { x, y, z } = sender.location
                                                    if (sender.typeId === "minecraft:player") {
                                                        if (sender.getDynamicProperty("indying") === false || !sender.getDynamicProperty("indying")) {
                                                            sender.setDynamicProperty("indying", true)
                                                            sender.inputPermissions.movementEnabled = false
                                                            sender.camera.fade({ fadeColor: { red: 1, green: 1, blue: 1 }, fadeTime: { fadeInTime: 3, holdTime: 1, fadeOutTime: 1.5 } })
                                                            sender.camera.setCamera("minecraft:free", { easeOptions: { easeType: EasingType.InQuart, easeTime: 3 }, facingLocation: { x: x, y: y + 100, z: z }, location: { x: x + 150, y: y + 160, z: z + 150 } })
                                                            sender.onScreenDisplay.hideAllExcept()
                                                            system.runTimeout(() => {
                                                                try {
                                                                    sender.dimension.spawnParticle(`minecraft:dragon_dying_explosion`, sender.location)
                                                                    world.getDimension(sender.dimension.id).playSound("random.pop", sender.location, { volume: 1, pitch: 0.5 })
                                                                    sender.teleport({ x: x, y: y + 100, z: z })
                                                                } catch (e) { }
                                                            }, 55)
                                                            system.runTimeout(() => {
                                                                try {
                                                                    sender.addEffect("invisibility", 100, { amplifier: 255, showParticles: false })
                                                                    sender.kill()
                                                                    system.runTimeout(() => {
                                                                        try {
                                                                            sender.onScreenDisplay.resetHudElements()
                                                                            sender.camera.clear()
                                                                            sender.inputPermissions.movementEnabled = true
                                                                            sender.setDynamicProperty("indying", false)
                                                                        } catch (e) {
                                                                        }
                                                                    }, 10)
                                                                } catch (e) {

                                                                }
                                                            }, 65)
                                                        }
                                                    }
                                                    else {
                                                        sender.dimension.spawnParticle(`minecraft:dragon_dying_explosion`, { x: x + 0.5, y: y + 0.5, z: z + 0.5 })
                                                        world.getDimension(sender.dimension.id).playSound("random.pop", { x: x + 0.5, y: y, z: z + 0.5 }, { volume: 1, pitch: 0.5 })
                                                        sender.teleport({ x: x, y: y + 100, z: z })
                                                        sender.addEffect("invisibility", 100, { amplifier: 255, showParticles: false })
                                                        system.runTimeout(() => {
                                                            try {
                                                                sender.kill()
                                                            } catch (e) {

                                                            }
                                                        }, 10)
                                                    }
                                                }
                                                else if (rule.run === 12) {
                                                    try {
                                                        let se = [];
                                                        first.subRule.forEach((s) => {
                                                            se.push(JSON.stringify(s))
                                                        })
                                                        const subs = se.filter((tag, i) => tag.startsWith(`{"imax":`))
                                                        let subs2 = []
                                                        subs.forEach((tag, i) => {
                                                            subs2.push(JSON.parse(tag))
                                                        })
                                                        const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                        const { x, y, z } = sender.location
                                                        const inseki = sender.dimension.spawnEntity(`${sub.mob}`, { x: x + getRandom(-80, 80), y: y + getRandom(70, 120), z: z + getRandom(-80, 80) })
                                                        system.runTimeout(() => {
                                                            const i = system.runInterval(() => {
                                                                if (inseki !== undefined) {
                                                                    try {
                                                                        if (inseki.isOnGround) {
                                                                            inseki.dimension.createExplosion({ x: inseki.location.x, y: inseki.location.y, z: inseki.location.z }, getRandom(sub.imax, sub.imin, false), { causesFire: sub.fire, allowUnderwater: sub.water })
                                                                            inseki.kill()
                                                                            system.clearRun(i)
                                                                        }
                                                                        else if (inseki.isFalling) {
                                                                            inseki.setOnFire(0.1, true)
                                                                            inseki.setRotation({ x: sender.getRotation().x + getRandom(-180, 180, true), y: sender.getRotation().y + getRandom(-180, 180, true) })
                                                                            inseki.applyImpulse({ x: inseki.getViewDirection().x * Number(sub.x), y: Number(sub.y), z: inseki.getViewDirection().z * Number(-sub.z) })
                                                                            const molang = new MolangVariableMap()
                                                                            molang.setColorRGBA(`variable.color`, { red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() })
                                                                            inseki.dimension.spawnParticle("minecraft:knockback_roar_particle", { x: inseki.location.x, y: inseki.location.y, z: inseki.location.z }, molang)
                                                                            inseki.dimension.spawnParticle("crc:inseki", { x: inseki.location.x, y: inseki.location.y, z: inseki.location.z })
                                                                            world.getDimension(sender.dimension.id).playSound("random.explode", inseki.location, { pitch: 0.5, volume: 100 })
                                                                        }
                                                                        else {
                                                                            system.clearRun(i)
                                                                        }
                                                                    } catch (e) {

                                                                    }
                                                                }
                                                                else {
                                                                    system.clearRun(i)
                                                                }
                                                            })
                                                            system.runTimeout(() => {
                                                                system.clearRun(i)
                                                            }, 30)
                                                        }, 2)
                                                    } catch (e) {

                                                    }
                                                }
                                                else if (rule.run === 13) {
                                                    try {
                                                        if (sender.typeId !== "minecraft:player") {
                                                            let e = true;
                                                            if (world.getDynamicProperty("Item") === false) {
                                                                if (sender.typeId !== "minecraft:item") {
                                                                    e = true
                                                                }
                                                                else {
                                                                    e = false;
                                                                }
                                                            }
                                                            if (e === true) {
                                                                let se = [];
                                                                first.subRule.forEach((s) => {
                                                                    se.push(JSON.stringify(s))
                                                                })
                                                                const subs = se.filter((tag, i) => tag.startsWith(`{"hmax":`))
                                                                let subs2 = []
                                                                subs.forEach((tag, i) => {
                                                                    subs2.push(JSON.parse(tag))
                                                                })
                                                                const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                                sender.applyImpulse({ x: 0, y: getRandom(1, 2.5), z: 0 })
                                                                world.getDimension(sender.dimension.id).playSound("firework.launch", sender.location, { volume: 1, pitch: 0.5 })
                                                                let a = system.runTimeout(() => {
                                                                    let s = system.runInterval(() => {
                                                                        if (sender !== undefined) {
                                                                            try {
                                                                                const entity = sender.dimension.getEntities({ closest: 1, minDistance: 0.5, location: sender.location })[0]
                                                                                if (entity !== undefined && entity.typeId !== sender.typeId) {
                                                                                    let vec = {
                                                                                        x: entity.location.x - sender.location.x,
                                                                                        y: entity.location.y - sender.location.y,
                                                                                        z: entity.location.z - sender.location.z
                                                                                    }
                                                                                    sender.applyImpulse(vec)
                                                                                    const molang = new MolangVariableMap()
                                                                                    molang.setColorRGBA(`variable.color`, { red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() })
                                                                                    sender.dimension.spawnParticle("minecraft:mobflame_single", { x: sender.location.x, y: sender.location.y, z: sender.location.z }, molang)
                                                                                    sender.dimension.spawnParticle("minecraft:knockback_roar_particle", { x: sender.location.x, y: sender.location.y, z: sender.location.z }, molang)
                                                                                    const target = sender.dimension.getEntities({ closest: 1, minDistance: 0.5, maxDistance: 2, location: sender.location })[0]
                                                                                    if (target !== undefined && target.typeId !== sender.typeId) {
                                                                                        system.clearRun(s)
                                                                                        sender.dimension.createExplosion(sender.location, getRandom(sub.hmax, sub.hmin, false), { causesFire: sub.fire, allowUnderwater: sub.water })
                                                                                        system.runTimeout(() => {
                                                                                            system.clearRun(s)
                                                                                        }, 20)
                                                                                    }
                                                                                    system.runTimeout(() => {
                                                                                        system.clearRun(s)
                                                                                    }, 100)
                                                                                }
                                                                                else {
                                                                                    system.clearRun(s)
                                                                                }
                                                                            } catch (e) {

                                                                            }
                                                                        }
                                                                        else {
                                                                            system.clearRun(s)
                                                                        }
                                                                    })
                                                                }, 20)
                                                                system.runTimeout(() => {
                                                                    system.clearRun(a)
                                                                }, 100)
                                                            }
                                                        }
                                                    } catch (e) {

                                                    }
                                                }
                                                else if (rule.run === 14) {
                                                    if (!entities.typeId === "minecraft:player") entities.remove()
                                                }
                                                else if (rule.run === 15) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data === undefined) {
                                                        const { x, y, z } = sender.location
                                                        sender.dimension.setBlockType({ x: x + sub.x, y: y + sub.y, z: z + sub.z }, `${random3[getRandom(0, random3.length - 1)]}`)
                                                    }
                                                    else {
                                                        data.dimension.setBlockType({ x: data.location.x + sub.x, y: data.location.y + sub.y, z: data.location.z + sub.z }, `${random3[getRandom(0, random3.length - 1)]}`)
                                                    }
                                                }
                                                else if (rule.run === 16) {
                                                    const { x, y, z } = sender.location
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"spawn":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    // if (data === undefined) {
                                                    if (sender.typeId === "minecraft:player") {
                                                        if (sender.getDynamicProperty("indying2") === false || !sender.getDynamicProperty("indying2")) {
                                                            sender.setDynamicProperty("indying2", true)
                                                            sender.camera.fade({ fadeColor: { red: 0, green: 0, blue: 0 }, fadeTime: { fadeInTime: 3, holdTime: 1, fadeOutTime: 1.5 } })
                                                            sender.camera.setCamera("minecraft:free", { easeOptions: { easeType: EasingType.InQuart, easeTime: 3 }, location: { x: x, y: y, z: z } })
                                                            sender.onScreenDisplay.hideAllExcept()
                                                            system.runTimeout(() => {
                                                                try {
                                                                    sender.dimension.spawnParticle(`minecraft:huge_explosion_emitter`, sender.location)
                                                                    world.getDimension(sender.dimension.id).playSound("random.explode", sender.location, { volume: 1, pitch: 0.5 })
                                                                    let asa = sender.location
                                                                    sender.teleport({ x: x, y: -64, z: z })
                                                                    system.runTimeout(() => {
                                                                        try {
                                                                            sender.dimension.spawnEntity(sub.spawn, asa)
                                                                            sender.kill()
                                                                            system.runTimeout(() => {
                                                                                try {
                                                                                    sender.onScreenDisplay.resetHudElements()
                                                                                    sender.camera.clear()
                                                                                    sender.setDynamicProperty("indying2", false)
                                                                                } catch (e) {
                                                                                }
                                                                            }, 10)
                                                                        } catch (e) {
                                                                        }
                                                                    }, 2)
                                                                } catch (e) {
                                                                }
                                                            }, 60)
                                                        }
                                                    }
                                                    else {
                                                        sender.dimension.spawnParticle(`minecraft:huge_explosion_emitter`, { x: x, y: y, z: z })
                                                        world.getDimension(sender.dimension.id).playSound("random.explode", { x: x, y: y, z: z }, { volume: 1, pitch: 0.5 })
                                                        sender.teleport({ x: x, y: -64, z: z })
                                                        system.runTimeout(() => {
                                                            try {
                                                                sender.kill()
                                                            } catch (e) {

                                                            }
                                                        }, 10)
                                                        sender.dimension.spawnEntity(sub.spawn, { x: x, y: y, z: z })
                                                    }
                                                    // }
                                                    // else {
                                                    //     sender.dimension.spawnParticle(`minecraft:huge_explosion_emitter`, { x: data.location.x, y: data.location.y, z: data.location.z })
                                                    //     world.getDimension(sender.dimension.id).playSound("random.explode", { x: data.location.x, y: data.location.y, z: data.location.z }, { volume: 1, pitch: 0.5 })
                                                    //     sender.dimension.spawnEntity(sub.spawn, { x: data.location.x + 0.5, y: data.location.y + 0.2, z: data.location.z + 0.5 })
                                                    // }
                                                }
                                                else if (rule.run === 17) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"command":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    sender.runCommandAsync(`${sub.command}`).catch((r) => { })
                                                }
                                                else if (rule.run === 18) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data !== undefined) {
                                                        const { x, y, z } = data.location
                                                        data.dimension.spawnItem(new ItemStack(`${random4[getRandom(0, random4.length - 1)]}`, getRandom(1, 64, true)), { x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) })
                                                    }
                                                    else {
                                                        const { x, y, z } = sender.location
                                                        sender.dimension.spawnItem(new ItemStack(`${random4[getRandom(0, random4.length - 1)]}`, getRandom(1, 64, true)), { x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) })
                                                    }
                                                }
                                                else if (rule.run === 19) {
                                                    sender.setRotation({ x: getRandom(-180, 90, false), y: getRandom(-180, 180, false) })
                                                }
                                                else if (rule.run === 20) {
                                                    const players = world.getPlayers({ gameMode: GameMode.survival }).filter(p => p.name !== sender.name)
                                                    const target = players[getRandom(0, players.length - 1, true)]
                                                    const location = sender.location
                                                    const tagetLocation = target.location
                                                    world.getDimension(sender.dimension.id).playSound("mob.endermen.portal", sender.location)
                                                    sender.teleport(tagetLocation, { dimension: target.dimension, rotation: target.getRotation(), facingLocation: target.getViewDirection() })
                                                    world.getDimension(target.dimension.id).playSound("mob.endermen.portal", target.location)
                                                    target.teleport(location, { dimension: sender.dimension, rotation: sender.getRotation(), facingLocation: sender.getViewDirection() })
                                                }
                                                else if (rule.run === 21) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"time":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if ((world.getTimeOfDay() + sub.time) < 24000) {
                                                        world.setTimeOfDay(world.getTimeOfDay() + sub.time)
                                                    }
                                                    else {
                                                        const day = (world.getTimeOfDay() + sub.time) - 24000
                                                        world.setTimeOfDay(day)
                                                    }
                                                }
                                                else if (rule.run === 22) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"time":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if ((world.getTimeOfDay() - sub.time) > 0) {
                                                        world.setTimeOfDay(world.getTimeOfDay() - sub.time)
                                                    }
                                                    else {
                                                        const day = (world.getTimeOfDay() - sub.time) + 24000
                                                        world.setTimeOfDay(day)
                                                    }
                                                }
                                                else if (rule.run === 23) {
                                                    const spawn = world.getDefaultSpawnLocation()
                                                    sender.teleport({ x: spawn.x + 0.5, y: world.getDynamicProperty("spawnY"), z: spawn.z + 0.5 })
                                                }
                                                else if (rule.run === 24) {
                                                    sender.addEffect(random2[getRandom(0, random2.length - 1)], getRandom(1, 300) * 20, { amplifier: getRandom(1, 255) })
                                                }
                                                else if (rule.run === 25) {
                                                    const { x, y, z } = sender.location
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (sender.typeId === "minecraft:player") {
                                                        world.getDimension(sender.dimension.id).playSound("mob.endermen.portal", sender.location)
                                                        sender.teleport({ x: sub.x + 0.5, y: sub.y, z: sub.z + 0.5 }, { dimension: DimensionTypes.get(sub.dimensiontype), rotation: sender.getRotation(), facingLocation: sender.getViewDirection(), checkForBlocks: sub.check })
                                                    }
                                                    else {
                                                        world.getDimension(sender.dimension.id).playSound("mob.endermen.portal", sender.location)
                                                        sender.teleport({ x: sub.x + 0.5, y: sub.y, z: sub.z + 0.5 }, { dimension: DimensionTypes.get(sub.dimensiontype), rotation: sender.getRotation(), facingLocation: sender.getViewDirection(), keepVelocity: sub.keep, checkForBlocks: sub.check })
                                                    }
                                                }
                                                else if (rule.run === 26) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data !== undefined) {
                                                        const { x, y, z } = data.location
                                                        data.dimension.spawnItem(new ItemStack(`${sub.item}`, sub.amount), { x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) })
                                                    }
                                                    else {
                                                        const { x, y, z } = sender.location
                                                        sender.dimension.spawnItem(new ItemStack(`${sub.item}`, sub.amount), { x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) })
                                                    }
                                                }
                                                else if (rule.run === 27) {
                                                    const { x, y, z } = sender.location
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (sender.typeId === "minecraft:player") {
                                                        world.getDimension(sender.dimension.id).playSound("mob.endermen.portal", sender.location)
                                                        sender.teleport({ x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) }, { dimension: DimensionTypes.get(sub.dimensiontype), rotation: sender.getRotation(), facingLocation: sender.getViewDirection(), checkForBlocks: sub.check })
                                                    }
                                                    else {
                                                        world.getDimension(sender.dimension.id).playSound("mob.endermen.portal", sender.location)
                                                        sender.teleport({ x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) }, { dimension: DimensionTypes.get(sub.dimensiontype), rotation: sender.getRotation(), facingLocation: sender.getViewDirection(), keepVelocity: sub.keep, checkForBlocks: sub.check })
                                                    }
                                                }
                                                else if (rule.run === 28) {
                                                    const { x, y, z } = sender.location
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    if (data !== undefined) {
                                                        if (data.typeId !== "minecraft:player" && typeof data === Entity) {
                                                            data.applyImpulse({ x: sub.x, y: sub.y, z: sub.z })
                                                        }
                                                    }
                                                    else {
                                                        if (sender.typeId !== "minecraft:player") {
                                                            sender.applyImpulse({ x: sub.x, y: sub.y, z: sub.z })
                                                        }
                                                    }
                                                }
                                                else if (rule.run === 29) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"particle":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    const direction = sender.getViewDirection()
                                                    const loc = {
                                                        x: sender.location.x + sub.x + direction.x,
                                                        y: sender.location.y + sub.y + direction.y,
                                                        z: sender.location.z + sub.z + direction.z
                                                    }
                                                    const molang = new MolangVariableMap()
                                                    molang.setColorRGBA('variable.color', {
                                                        red: Math.random(),
                                                        green: Math.random(),
                                                        blue: Math.random(),
                                                        alpha: Math.random()
                                                    });
                                                    if (sub.visible === false) {
                                                        sender.spawnParticle(sub.particle, loc, molang)
                                                    }
                                                    else {
                                                        sender.dimension.spawnParticle(sub.particle, loc, molang)
                                                    }
                                                }
                                                else if (rule.run === 30) {
                                                    let se = [];
                                                    first.subRule.forEach((s) => {
                                                        se.push(JSON.stringify(s))
                                                    })
                                                    const subs = se.filter((tag, i) => tag.startsWith(`{"x":`))
                                                    let subs2 = []
                                                    subs.forEach((tag, i) => {
                                                        subs2.push(JSON.parse(tag))
                                                    })
                                                    const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                    const direction = sender.getViewDirection()
                                                    const loc = {
                                                        x: sender.location.x + sub.x + direction.x,
                                                        y: sender.location.y + sub.y + direction.y,
                                                        z: sender.location.z + sub.z + direction.z
                                                    }
                                                    const molang = new MolangVariableMap()
                                                    molang.setColorRGBA('variable.color', {
                                                        red: Math.random(),
                                                        green: Math.random(),
                                                        blue: Math.random(),
                                                        alpha: Math.random()
                                                    });
                                                    if (sub.visible === false) {
                                                        sender.spawnParticle(particles[getRandom(0, particles.length - 1)], loc, molang)
                                                    }
                                                    else {
                                                        sender.dimension.spawnParticle(particles[getRandom(0, particles.length - 1)], loc, molang)
                                                    }
                                                }
                                                else if (rule.run === 31) {
                                                    if (data === undefined) {
                                                        const { x, y, z } = sender.location
                                                        sender.dimension.spawnEntity(random[getRandom(0, random.length - 1)], { x: x, y: y, z: z })
                                                    }
                                                    else {
                                                        data.dimension.spawnEntity(random[getRandom(0, random.length - 1)], { x: data.location.x, y: data.location.y, z: data.location.z })
                                                    }
                                                }
                                                else {

                                                }
                                            }
                                            else {
                                            }
                                        })
                                    }
                                    else {

                                    }
                                }
                            } catch (e) {

                            }
                        }))
                    }
                }
                else {
                    const entity = world.getDimension(sender.dimension.id).getEntities({ location: sender.location, minDistance: 1, maxDistance: 200 }).filter(e => e.typeId !== "minecraft:player")
                    system.run(() => {
                        try {
                            entity[getRandom(0, entity.length - 1, true)].remove();
                        } catch (e) { }
                    })
                }
            }
            catch (e) { }
        }
    }
}
function getRandom(min = 0, max = 5, floor = true) {
    if (floor) {
        let random = Math.floor(Math.random() * min + Math.random() * max)
        return random;
    }
    else {
        let random = Math.random() * min + Math.random() * max
        return random;
    }
}
function getRandomBool() {
    let random = Math.floor(Math.random() * 0 + Math.random() * 2)
    let bool = false;
    if (random === 0) {
        bool = true;
    }
    else {
        bool = false;
    }
    return bool;
}
function password(length = 10) {
    let password = "";
    let password_base = '0123456789';
    for (let i = 0; i < length; i++) {
        password += password_base.charAt(Math.floor(Math.random() * password_base.length));
    }
    return password;
}
system.beforeEvents.watchdogTerminate.subscribe(data => {
    data.cancel = true;
})
function createSaveDataCodeId() {

    return '03yx-yxxx-xxxxxxy-xxxxxx-xxx9'.replace(/[xy]/g, function (a) {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

}
function stringPassword(length = 10) {
    let password = "";
    let password_base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < length; i++) {
        password += password_base.charAt(Math.floor(Math.random() * password_base.length));
    }
    return password;
}
function pass(length = 10) {
    let password = "";
    let password_base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        password += password_base.charAt(Math.floor(Math.random() * password_base.length));
    }
    return password;
}
function id(length = 10) {
    let password = "";
    let password_base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.&#=@';
    for (let i = 0; i < length; i++) {
        password += password_base.charAt(Math.floor(Math.random() * password_base.length));
    }
    return password;
}
function createUuid() {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

}
function twoDigit(num) {
    let ret;
    if (num < 10)
        ret = "0" + num;
    else
        ret = num;
    return ret;
}
export function GetRulesRawData() {
    if (world.getDynamicProperty("CRC:rules")) {
        if (JSON.parse(world.getDynamicProperty("CRC:rules")).rule.length > 0) {
            const ruleData = {
                rules: JSON.parse(world.getDynamicProperty("CRC:rules")).rule,
                subRules: JSON.parse(world.getDynamicProperty("CRC:rules")).subRule,
            }
            return ruleData;
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
/**
* ルールを保存します
* @param {Player} sender ターゲット
* @param {String} runData 実行出力用変数
* @param {String} rule データ出力用変数
*/
export function ruleData(sender, runData, rule) {
    if (runData === "重力を加える") {
        let ui = new ModalFormData()
        ui.title("重力の設定")
        ui.textField("§cx座標(数字記入)", "Num")
        ui.textField("§ew座標(数字記入)", "Num")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1])) {
                let rule2 = {
                    x: formValues[0],
                    w: formValues[1],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "ブロックを設置") {
        let ui = new ModalFormData()
        ui.title("ブロックの設定")
        ui.textField("ブロック名", "stone")
        ui.textField("オフセット\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "-1")
        ui.textField("§9Z", "数値", "0")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[1]) && !isNaN(formValues[2]) && !isNaN(formValues[3])) {
                let rule2 = {
                    block: formValues[0],
                    x: Number(formValues[1]),
                    y: Number(formValues[2]),
                    z: Number(formValues[3]),
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "ダメージを与える") {
        let ui = new ModalFormData()
        ui.title("ダメージ量設定")
        ui.slider("ダメージ量", 0, 40, 1)
        ui.dropdown("ケース", cause, 24)
        ui.dropdown("タイプ", random)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                damage: formValues[0],
                causes: cause[formValues[1]],
                entitytype: random[formValues[2]],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "エンティティをスポーン") {
        let ui = new ModalFormData()
        ui.title("スポーンさせるエンティティ")
        ui.textField("エンティティID", "minecraft:zombie", "minecraft:")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (isNaN(formValues[0])) {
                let rule2 = {
                    spawn: formValues[0],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字は無効です！")
            }
        })
    }
    else if (runData === "炎上させる") {
        let ui = new ModalFormData()
        ui.title("炎上設定")
        ui.slider("継続時間", 1, 300, 1, 30)
        ui.toggle("エフェクト", false)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                time: formValues[0],
                effect: formValues[1],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "エフェクトを付与する") {
        let ui = new ModalFormData()
        ui.title("付与するエフェクト")
        ui.dropdown("エフェクトID", random2)
        ui.slider("継続時間", 1, 300, 1, 30)
        ui.slider("レベル", 1, 255, 1)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                effectId: random2[formValues[0]],
                time: formValues[1],
                level: formValues[2],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "爆発") {
        let ui = new ModalFormData()
        ui.title("爆発の設定")
        ui.slider("最小威力", 0, 200, 1)
        ui.slider("最大威力", 0, 200, 1)
        ui.toggle("火力", false)
        ui.toggle("水の貫通", false)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                max: formValues[0],
                min: formValues[1],
                fire: formValues[2],
                water: formValues[3],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "打ち上げる") {
        let ui = new ModalFormData()
        ui.title("打ち上げた時の爆発の設定")
        ui.slider("最小威力", 0, 200, 1)
        ui.slider("最大威力", 0, 200, 1)
        ui.toggle("火力", false)
        ui.toggle("水の貫通", false)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                max: formValues[0],
                min: formValues[1],
                fire: formValues[2],
                water: formValues[3],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "隕石を降らす") {
        let ui = new ModalFormData()
        ui.title("隕石の設定")
        ui.slider("最小威力", 0, 200, 1)
        ui.slider("最大威力", 0, 200, 1)
        ui.toggle("火力", false)
        ui.toggle("水の貫通", false)
        ui.textField("隕石となるエンティティ", "minecraft:", "minecraft:")
        ui.textField("速度(x)", "数値", "1")
        ui.textField("速度(y)", "数値", "-0.5")
        ui.textField("速度(z)", "数値", "1")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[5]) && !isNaN(formValues[6]) && !isNaN(formValues[7])) {
                let rule2 = {
                    imax: formValues[0],
                    imin: formValues[1],
                    fire: formValues[2],
                    water: formValues[3],
                    mob: formValues[4],
                    x: formValues[5],
                    y: formValues[6],
                    z: formValues[7],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "ホーミングさせる(プレイヤー以外)") {
        let ui = new ModalFormData()
        ui.title("ホーミングの設定")
        ui.slider("衝突時の最小威力", 0, 200, 1)
        ui.slider("衝突時の最大威力", 0, 200, 1)
        ui.toggle("火力", false)
        ui.toggle("水の貫通", false)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                hmax: formValues[0],
                hmin: formValues[1],
                fire: formValues[2],
                water: formValues[3],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "ランダムなブロックを設置") {
        let ui = new ModalFormData()
        ui.title("ブロックの設定")
        ui.textField("オフセット\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "-1")
        ui.textField("§9Z", "数値", "0")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                let rule2 = {
                    x: Number(formValues[0]),
                    y: Number(formValues[1]),
                    z: Number(formValues[2]),
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "エンティティを置き換える") {
        let ui = new ModalFormData()
        ui.title("置き換えるエンティティ")
        ui.textField("エンティティID", "minecraft:zombie", "minecraft:")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (isNaN(formValues[0])) {
                let rule2 = {
                    spawn: formValues[0],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字は無効です！")
            }
        })
    }
    else if (runData === "コマンドを実行する") {
        let ui = new ModalFormData()
        ui.title("実行するコマンド")
        ui.textField("コマンドの構文", "summon zombie ~~~", "")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (formValues[0] !== undefined) {
                let rule2 = {
                    command: formValues[0],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§cコマンドを入力してください！")
            }
        })
    }
    else if (runData === "ランダムなアイテムをスポーンさせる") {
        let ui = new ModalFormData()
        ui.title("ランダムなアイテムのスポーン設定")
        ui.textField("オフセット(範囲)\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "80")
        ui.textField("§9Z", "数値", "0")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                let rule2 = {
                    x: Number(formValues[0]),
                    y: Number(formValues[1]),
                    z: Number(formValues[2]),
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "時間を早送りにする") {
        let ui = new ModalFormData()
        ui.title("時間の設定")
        ui.slider("時間のスピード", 1, 2000, 1)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                time: formValues[0],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "時間を巻き戻しにする") {
        let ui = new ModalFormData()
        ui.title("時間の設定")
        ui.slider("時間のスピード", 1, 2000, 1)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            let rule2 = {
                time: formValues[0],
                id: rule.id
            }
            set(sender, rule, rule2)
        })
    }
    else if (runData === "テレポートする") {
        let ui = new ModalFormData()
        ui.title("テレポートの設定")
        ui.textField("座標\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "0")
        ui.textField("§9Z", "数値", "0")
        ui.dropdown("ディメンション", DimensionTypes.getAll().map(d => d.typeId), 1)
        ui.toggle("速度の保持", false)
        ui.toggle("テレポート先にブロックがあるか確認", false)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                let rule2 = {
                    x: Number(formValues[0]),
                    y: Number(formValues[1]),
                    z: Number(formValues[2]),
                    dimensiontype: DimensionTypes.getAll().map(d => d.typeId)[formValues[3]],
                    keep: formValues[4],
                    check: formValues[5],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "アイテムをスポーンさせる") {
        let ui = new ModalFormData()
        ui.title("アイテムのスポーン設定")
        ui.textField("オフセット(範囲)\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "80")
        ui.textField("§9Z", "数値", "0")
        ui.textField("アイテム名", "minecraft:diamond")
        ui.slider("個数", 1, 64, 1)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                if (formValues[4] !== undefined) {
                    let rule2 = {
                        x: Number(formValues[0]),
                        y: Number(formValues[1]),
                        z: Number(formValues[2]),
                        item: formValues[3],
                        amount: formValues[4],
                        id: rule.id
                    }
                    set(sender, rule, rule2)
                }
                else {
                    sender.sendMessage("§cアイテム名を入力してください！")
                }
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "ランダムな範囲でテレポートする") {
        let ui = new ModalFormData()
        ui.title("テレポートの設定")
        ui.textField("座標(範囲)\n§cX", "数値", "20")
        ui.textField("§aY", "数値", "0")
        ui.textField("§9Z", "数値", "20")
        ui.dropdown("ディメンション", DimensionTypes.getAll().map(d => d.typeId), 1)
        ui.toggle("速度の保持", false)
        ui.toggle("テレポート先にブロックがあるか確認", false)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                let rule2 = {
                    x: Number(formValues[0]),
                    y: Number(formValues[1]),
                    z: Number(formValues[2]),
                    dimensiontype: DimensionTypes.getAll().map(d => d.typeId)[formValues[3]],
                    keep: formValues[4],
                    check: formValues[5],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "速度を加える(プレイヤー以外)") {
        let ui = new ModalFormData()
        ui.title("速度の設定")
        ui.textField("§cx座標(数字記入)", "Num")
        ui.textField("§ey座標(数字記入)", "Num")
        ui.textField("§9z座標(数字記入)", "Num")
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                let rule2 = {
                    x: Number(formValues[0]),
                    y: Number(formValues[1]),
                    z: Number(formValues[2]),
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "パーティクルを表示する") {
        let ui = new ModalFormData()
        ui.title("パーティクルの設定")
        ui.textField("パーティクル名", "minecraft:")
        ui.textField("表示する相対座標\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "0")
        ui.textField("§9Z", "数値", "0")
        ui.toggle("全員に表示する", true)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (formValues[0] !== undefined) {
                if (!isNaN(formValues[1]) && !isNaN(formValues[2]) && !isNaN(formValues[3])) {
                    let rule2 = {
                        particle: formValues[0],
                        x: Number(formValues[1]),
                        y: Number(formValues[2]),
                        z: Number(formValues[3]),
                        visible: formValues[4],
                        id: rule.id
                    }
                    set(sender, rule, rule2)
                }
                else {
                    sender.sendMessage("§c数字で入力してください！")
                }
            }
            else {
                sender.sendMessage("§c文字を入力してください！")
            }
        })
    }
    else if (runData === "ランダムなパーティクルを表示する") {
        let ui = new ModalFormData()
        ui.title("ランダムなパーティクルの設定")
        ui.textField("表示する相対座標\n§cX", "数値", "0")
        ui.textField("§aY", "数値", "0")
        ui.textField("§9Z", "数値", "0")
        ui.toggle("全員に表示する", true)
        ui.show(sender).then(({ formValues, canceled }) => {
            if (canceled) return;
            if (!isNaN(formValues[0]) && !isNaN(formValues[1]) && !isNaN(formValues[2])) {
                let rule2 = {
                    x: Number(formValues[0]),
                    y: Number(formValues[1]),
                    z: Number(formValues[2]),
                    visible: formValues[3],
                    id: rule.id
                }
                set(sender, rule, rule2)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else {
        if (world.getDynamicProperty("CRC:rules")) {
            let RawRule = JSON.parse(world.getDynamicProperty("CRC:rules"))
            let ruea = RawRule.rule
            ruea.push(rule)
            const Rdata = {
                rule: ruea,
                subRule: RawRule.subRule
            }
            world.setDynamicProperty("CRC:rules", `${JSON.stringify(Rdata)}`)
            sender.sendMessage(`§aルールを作成しました。`)
        }
    }
}
function set(sender, rule, rule2) {
    if (world.getDynamicProperty("CRC:rules")) {
        const d = JSON.parse(world.getDynamicProperty("CRC:rules"))
        const datarule = d.rule
        const datarule2 = d.subRule
        datarule2.push(rule2)
        datarule.push(rule)
        const data = {
            rule: datarule,
            subRule: datarule2
        }
        world.setDynamicProperty("CRC:rules", `${JSON.stringify(data)}`)
        sender.sendMessage(`§aルールを作成しました。`)
    }
    else {
        const data = {
            rule: [rule],
            subRule: [rule2]
        }
        world.setDynamicProperty("CRC:rules", `${JSON.stringify(data)}`)
        sender.sendMessage(`§aルールを作成しました。`)
    }
}
export function getIndex(Object, GetIndexObject) {
    const result = Object.findIndex(a => JSON.stringify(a) === JSON.stringify(GetIndexObject))
    return result;
}