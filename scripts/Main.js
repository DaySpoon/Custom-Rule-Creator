import { world, system, WeatherType, ItemStack, MolangVariableMap, Player, BlockTypes, EffectTypes, EntityTypes, ItemTypes, WorldAfterEvents, EntityHurtAfterEvent, WorldBeforeEvents, Block, GameMode } from "@minecraft/server"
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui"
import { EntityMaxDistance, EntityMinDistance, PlayerMaxDistance, PlayerMinDistance, mobLimit } from "./config";
import { pack } from "./Expansion_pack/Pack";
import { enableExpansionPack } from "./config";
// 弄らないでください
//定義
const Version = "α1.0"
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
    "エモートしたら",
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
//セットアップ用
world.afterEvents.playerSpawn.subscribe((data) => {
    if (data.initialSpawn) {
        if (data.player.id === '-4294967295' && !data.player.hasTag("owner")) {
            world.sendMessage("§l§a[CRC] セットアップが完了しました！")
            data.player.addTag("owner")
        }
        if (!world.getDynamicProperty("FallingBlock")) {
            world.setDynamicProperty("FallingBlock", false)
        }
        if (!world.getDynamicProperty("Item")) {
            world.setDynamicProperty("Item", false)
        }
        if (!world.getDynamicProperty("Xp")) {
            world.setDynamicProperty("Xp", false)
        }
        if (!world.getDynamicProperty("EntityKill")) {
            world.setDynamicProperty("EntityKill", true)
        }
        if (!world.getDynamicProperty("Stop")) {
            world.setDynamicProperty("Stop", false)
        }
        data.player.sendMessage(`${enableExpansionPack ? `§e拡張パック導入済：${packs.length}個のパックがあります` : ``}`)
    }
})
//ここから下はシステムです
world.afterEvents.itemUse.subscribe(data => {
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    let main = []
    let sub = []
    const item = data.itemStack.typeId
    const itemst = data.itemStack
    const sender = data.source
    if (item === "minecraft:stick" && sender.isOp()) {
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
                const rule1 = first.getTags().filter((tag, i) => tag.startsWith(`{"if`))
                rule1.forEach((ru) => {
                    parse.push(JSON.parse(ru))
                })
                let ui = new ActionFormData()
                ui.title("ルールリスト")
                ui.body(`決められてるルール:${first.getTags().filter((tag, i) => tag.startsWith(`{"if`)).length}\n現時点で出来る組み合わせ:${rules.length * rule2.length}通り！`)
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
                        ui.slider("確率", 1, 100, 1, 100)
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            let rule = {
                                if: formValues[0],
                                run: formValues[1],
                                par: formValues[2],
                                id: password(6)
                            }
                            if (old_rule.length > formValues[0]) {
                                ruleData()
                            }
                            else {
                                if (enableExpansionPack === true) {
                                    let i = formValues[0] - old_rule.length
                                    if (pack[i].ruleForm.enable) {
                                        pack[i].ruleForm.form(sender, first, formValues, rule2[formValues[1]], rule)
                                    }
                                    else {
                                        ruleData()
                                    }
                                }
                                else {
                                    sender.sendMessage("§cエラーが発生しました。")
                                }
                            }
                            function ruleData() {
                                if (rule2[formValues[1]] === "重力を加える") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字で入力してください！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "ブロックを設置") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字で入力してください！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "ダメージを与える") {
                                    let ui = new ModalFormData()
                                    ui.title("炎上設定")
                                    ui.slider("ダメージ量", 1, 40, 1)
                                    ui.show(sender).then(({ formValues, canceled }) => {
                                        if (canceled) return;
                                        let rule2 = {
                                            damage: formValues[0],
                                            id: rule.id
                                        }
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "エンティティをスポーン") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字は無効です！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "炎上させる") {
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
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "エフェクトを付与する") {
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
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "爆発") {
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
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "打ち上げる") {
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
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "隕石を降らす") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字で入力してください！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "ホーミングさせる(プレイヤー以外)") {
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
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "ランダムなブロックを設置") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字で入力してください！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "エンティティを置き換える") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字は無効です！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "コマンドを実行する") {
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§cコマンドを入力してください！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "ランダムなアイテムをスポーンさせる") {
                                    let ui = new ModalFormData()
                                    ui.title("ランダムなアイテムのスポーン設定")
                                    ui.textField("オフセット\n§cX", "数値", "0")
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
                                            first.addTag(`${JSON.stringify(rule)}`)
                                            first.addTag(`${JSON.stringify(rule2)}`)
                                            sender.sendMessage(`§aルールを作成しました。`)
                                        }
                                        else {
                                            sender.sendMessage("§c数字で入力してください！")
                                        }
                                    })
                                }
                                else if (rule2[formValues[1]] === "時間を早送りにする") {
                                    let ui = new ModalFormData()
                                    ui.title("時間の設定")
                                    ui.slider("時間のスピード", 1, 2000, 1)
                                    ui.show(sender).then(({ formValues, canceled }) => {
                                        if (canceled) return;
                                        let rule2 = {
                                            time: formValues[0],
                                            id: rule.id
                                        }
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else if (rule2[formValues[1]] === "時間を巻き戻しにする") {
                                    let ui = new ModalFormData()
                                    ui.title("時間の設定")
                                    ui.slider("時間のスピード", 1, 2000, 1)
                                    ui.show(sender).then(({ formValues, canceled }) => {
                                        if (canceled) return;
                                        let rule2 = {
                                            time: formValues[0],
                                            id: rule.id
                                        }
                                        first.addTag(`${JSON.stringify(rule)}`)
                                        first.addTag(`${JSON.stringify(rule2)}`)
                                        sender.sendMessage(`§aルールを作成しました。`)
                                    })
                                }
                                else {
                                    first.addTag(`${JSON.stringify(rule)}`)
                                    sender.sendMessage(`§aルールを作成しました。`)
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
                                    let sub1 = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                    let sub2 = first.getTags().filter((tag, i) => tag.startsWith(`{"max`))
                                    let sub3 = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn`))
                                    let sub4 = first.getTags().filter((tag, i) => tag.startsWith(`{"damage`))
                                    let sub5 = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                    let sub6 = first.getTags().filter((tag, i) => tag.startsWith(`{"effectId`))
                                    let sub7 = first.getTags().filter((tag, i) => tag.startsWith(`{"imax`))
                                    let sub8 = first.getTags().filter((tag, i) => tag.startsWith(`{"hmax`))
                                    let sub9 = first.getTags().filter((tag, i) => tag.startsWith(`{"command`))
                                    rule1.forEach((tag, i) => {
                                        first.removeTag(tag)
                                    })
                                    sub1.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub2.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub3.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub4.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub5.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub6.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub7.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub8.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sub9.forEach(tag => {
                                        first.removeTag(tag)
                                    })
                                    sender.sendMessage("§aルールを全て削除しました。")
                                }
                                else {
                                    let parse = JSON.parse(rule1[formValues[0]])
                                    let dt = []
                                    if (parse.run === 0 || parse.run === 2 || parse.run === 4 || parse.run === 5 || parse.run === 6 || parse.run === 8 || parse.run === 9 || parse.run === 10 || parse.run === 12 || parse.run === 13 || parse.run === 15 || parse.run === 16 || parse.run === 17 || parse.run === 21 || parse.run === 22) {
                                        let subs;
                                        if (parse.run === 0) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"max`))
                                        if (parse.run === 2) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 4) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"block`))
                                        if (parse.run === 5) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"damage`))
                                        if (parse.run === 6) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn`))
                                        if (parse.run === 8) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"max`))
                                        if (parse.run === 9) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                        if (parse.run === 10) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"effectId`))
                                        if (parse.run === 12) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"imax`))
                                        if (parse.run === 13) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"hmax`))
                                        if (parse.run === 15) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 16) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn`))
                                        if (parse.run === 17) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"command`))
                                        if (parse.run === 18) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                        if (parse.run === 21) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                        if (parse.run === 22) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                        subs.forEach((tag) => {
                                            dt.push(JSON.parse(tag))
                                        })
                                        const sub = dt.find((tag) => tag.id === parse.id)
                                        first.removeTag(JSON.stringify(sub))
                                    }
                                    first.removeTag(rule1[formValues[0]])
                                    sender.sendMessage("§aルールを削除しました。")
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
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            if (formValues[1]) {
                                let sub1 = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                let sub2 = first.getTags().filter((tag, i) => tag.startsWith(`{"max`))
                                let sub3 = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn`))
                                let sub4 = first.getTags().filter((tag, i) => tag.startsWith(`{"damage`))
                                let sub5 = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                let sub6 = first.getTags().filter((tag, i) => tag.startsWith(`{"effectId`))
                                let sub7 = first.getTags().filter((tag, i) => tag.startsWith(`{"imax`))
                                let sub8 = first.getTags().filter((tag, i) => tag.startsWith(`{"hmax`))
                                let sub9 = first.getTags().filter((tag, i) => tag.startsWith(`{"command`))
                                rule1.forEach((tag, i) => {
                                    first.removeTag(tag)
                                })
                                sub1.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub2.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub3.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub4.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub5.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub6.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub7.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub8.forEach(tag => {
                                    first.removeTag(tag)
                                })
                                sub9.forEach(tag => {
                                    first.removeTag(tag)
                                })
                            }
                            for (let i = 0; i < formValues[0]; i++) {
                                let rule_obj = {
                                    if: getRandom(0, rule.length - 1),
                                    run: getRandom(0, rule2.length - 1),
                                    par: getRandom(1, 100),
                                    id: password(6)
                                }
                                if (rule2[rule_obj.run] === "重力を加える") {
                                    let rule2_obj = {
                                        x: getRandom(-200, 200),
                                        w: getRandom(-200, 200),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "ブロックを設置") {
                                    let rule2_obj = {
                                        block: random3[getRandom(0, random3.length - 1)],
                                        x: getRandom(-2, 2),
                                        y: getRandom(-2, 2),
                                        z: getRandom(-2, 2),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "エンティティをスポーン") {
                                    let rule2_obj = {
                                        spawn: random[getRandom(0, random.length - 1)],
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "ダメージを与える") {
                                    let rule2_obj = {
                                        damage: getRandom(1, 40),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "炎上させる") {
                                    let rule2_obj = {
                                        time: getRandom(1, 300),
                                        effect: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "エフェクトを付与する") {
                                    let rule2_obj = {
                                        effectId: random2[getRandom(0, random2.length - 1)],
                                        time: getRandom(1, 300),
                                        level: getRandom(1, 255),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "爆発") {
                                    let rule2_obj = {
                                        max: getRandom(6, 30),
                                        min: getRandom(0, 5),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "打ち上げる") {
                                    let rule2_obj = {
                                        max: getRandom(6, 30),
                                        min: getRandom(0, 5),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
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
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "ホーミングさせる(プレイヤー以外)") {
                                    let rule2_obj = {
                                        hmax: getRandom(6, 30),
                                        hmin: getRandom(0, 5),
                                        fire: getRandomBool(),
                                        water: getRandomBool(),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "ランダムなブロックを設置") {
                                    let rule2_obj = {
                                        x: getRandom(-2, 2),
                                        y: getRandom(-2, 2),
                                        z: getRandom(-2, 2),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "エンティティを置き換える") {
                                    let rule2_obj = {
                                        spawn: random[getRandom(0, random.length - 1)],
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "コマンドを実行する") {
                                    let rule2_obj = {
                                        command: `effect @s ${random2[getRandom(0, random2.length - 1)]} ${getRandom(1, 300)} ${getRandom(1, 255)}`,
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                }
                                else if (rule2[rule_obj.run] === "時間を早送りにする") {
                                    let rule2_obj = {
                                        time: getRandom(1, 10000, true),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                    sender.sendMessage(`§aルールを作成しました。`)
                                }
                                else if (rule2[rule_obj.run] === "時間を巻き戻しにする") {
                                    if (canceled) return;
                                    let rule2_obj = {
                                        time: getRandom(1, 10000, true),
                                        id: rule_obj.id
                                    }
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                    first.addTag(`${JSON.stringify(rule2_obj)}`)
                                    sender.sendMessage(`§aルールを作成しました。`)
                                }
                                else {
                                    first.addTag(`${JSON.stringify(rule_obj)}`)
                                }
                            }
                            sender.sendMessage(`§aルールを${formValues[0]}個作成しました。`)
                        })
                    }
                    else {
                        let ui = new ActionFormData()
                        ui.title(`ルール${selection - 2}`)
                        ui.body(`\nもし:${ruleNames[parse[selection - 3].if]}\n実行:${rule2[parse[selection - 3].run]}\n確率:${parse[selection - 3].par}パーセント\n\n\n\n\n`)
                        ui.button("gui.close")
                        ui.show(sender)
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
                                                                                                                                sender.addTag(ru.objectData)
                                                                                                                                if (ru.subData !== null) {
                                                                                                                                    sender.addTag(ru.subData)
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
                                                                                                                                        sender.addTag(ru.objectData)
                                                                                                                                        if (ru.subData !== null) {
                                                                                                                                            sender.addTag(ru.subData)
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
                        const rule1 = first.getTags().filter((tag, i) => tag.startsWith(`{"if`))
                        rule1.forEach((ru) => {
                            parse.push(JSON.parse(ru))
                        })
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
                                        if (rule.run === 0 || rule.run === 2 || rule.run === 4 || rule.run === 5 || rule.run === 6 || rule.run === 8 || rule.run === 9 || rule.run === 10 || rule.run === 12 || rule.run === 13 || rule.run === 15 || rule.run === 16 || rule.run === 17 || rule.run === 18 || rule.run === 21 || rule.run === 22) {
                                            let subs;
                                            if (rule.run === 0) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"max`))
                                            if (rule.run === 2) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                            if (rule.run === 4) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"block`))
                                            if (rule.run === 5) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"damage`))
                                            if (rule.run === 6) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn`))
                                            if (rule.run === 8) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"max`))
                                            if (rule.run === 9) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                            if (rule.run === 10) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"effectId`))
                                            if (rule.run === 12) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"imax`))
                                            if (rule.run === 13) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"hmax`))
                                            if (rule.run === 15) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                            if (rule.run === 16) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn`))
                                            if (rule.run === 17) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"command`))
                                            if (rule.run === 18) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x`))
                                            if (rule.run === 21) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
                                            if (rule.run === 22) subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time`))
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
                ui.button("ドロップアイテムのクリア")
                ui.button("Config設定")
                ui.show(sender).then(({ selection, canceled }) => {
                    if (canceled) return;
                    if (selection === 0) {
                        try {
                            const entity = world.getDimension(first.dimension.id).getEntities({ location: first.location, maxDistance: 200 }).filter(e => e.typeId === "minecraft:item")
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
                        ui.toggle("イベントの停止", world.getDynamicProperty("Stop"))
                        ui.show(sender).then(({ formValues, canceled }) => {
                            if (canceled) return;
                            world.setDynamicProperty("FallingBlock", formValues[0])
                            world.setDynamicProperty("Item", formValues[1])
                            world.setDynamicProperty("Xp", formValues[2])
                            world.setDynamicProperty("EntityKill", formValues[3])
                            world.setDynamicProperty("Stop", formValues[4])
                            sender.sendMessage("§a設定を保存しました")
                        })
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
    world.getPlayers().forEach(sender => {
        if (world.getAllPlayers().find(p => p.hasTag("owner"))) {
            const first = world.getAllPlayers().find(p => p.hasTag("owner"));
            const entity = sender.dimension.getEntities({ minDistance: PlayerMinDistance, maxDistance: PlayerMaxDistance, location: sender.location })
            world.getDimension(sender.dimension.id).getEntities().forEach((e) => {
                try {
                    const entities = world.getDimension(e.dimension.id).getEntities({ minDistance: EntityMinDistance, maxDistance: EntityMaxDistance, location: e.location })
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
            if (enableExpansionPack === true) {
                try {
                    pack.forEach((p, i) => {
                        p.ruleDetect(sender, first, rule.length + i)
                    })
                } catch (e) {
                    if (error === false) {
                        error = true;
                        sender.sendMessage(`§cエラー: ${e}`)
                    }
                }
            }
            else {

            }
        }
    })
}, 1.5)
system.runInterval(() => {
    for (const sender of world.getPlayers()) {
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        event(sender, first, rule.length - 3)
    }
}, 200)
system.runInterval(() => {
    for (const sender of world.getPlayers()) {
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        event(sender, first, rule.length - 2)
    }
}, 600)
system.runInterval(() => {
    for (const sender of world.getPlayers()) {
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        event(sender, first, rule.length - 1)
    }
}, 1200)
world.beforeEvents.explosion.subscribe(data => {
    if (data.source !== undefined) {
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        const sender = data.source
        event(sender, first, 0)
    }
})
world.afterEvents.entityHurt.subscribe(data => {
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    const sender = data.hurtEntity
    event(sender, first, 1)
})
world.beforeEvents.playerBreakBlock.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 5, undefined, undefined, data.block)
})
world.beforeEvents.playerPlaceBlock.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 6, undefined, undefined, data.block)
})
world.afterEvents.buttonPush.subscribe(data => {
    const sender = data.source
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 7, undefined, undefined, data.block)
})
world.afterEvents.chatSend.subscribe(data => {
    const sender = data.sender
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 8)
})
world.afterEvents.entityDie.subscribe(data => {
    const sender = data.deadEntity
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 9)
    event(data.damageSource, first, 38)
})
world.afterEvents.playerSpawn.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 10)
})
world.afterEvents.playerInteractWithEntity.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 11)
    event(data.target, first, 37)
})
world.afterEvents.playerInteractWithBlock.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 12, undefined, undefined, data.block)
})
world.afterEvents.leverAction.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 13)
})
world.afterEvents.entitySpawn.subscribe(data => {
    if (world.getDynamicProperty("Item") === true) {
        const sender = data.entity
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        event(sender, first, 14)
    }
    else {
        if (data.entity.typeId !== "minecraft:item") {
            const sender = data.entity
            const first = world.getAllPlayers().find(p => p.hasTag("owner"));
            event(sender, first, 14)
        }
    }
})
world.afterEvents.effectAdd.subscribe(data => {
    const sender = data.entity
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 15)
})
world.afterEvents.entityHurt.subscribe(data => {
    if (data.damageSource.damagingEntity !== undefined) {
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        const sender = data.damageSource.damagingEntity
        event(sender, first, 16)
    }
})
world.afterEvents.projectileHitEntity.subscribe(data => {
    const sender = data.projectile
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 17)
    event(data.source, first, 39)
})
world.afterEvents.projectileHitBlock.subscribe(data => {
    const sender = data.projectile
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 21, undefined, undefined, data.getBlockHit().block)
    event(data.source, first, 39)
})
world.afterEvents.weatherChange.subscribe(data => {
    const sender = world.getAllPlayers()[getRandom(0, world.getAllPlayers().length - 1, true)]
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 28)
})
world.afterEvents.itemUse.subscribe(data => {
    if (data.itemStack.typeId !== "minecraft:stick") {
        const sender = data.source
        const first = world.getAllPlayers().find(p => p.hasTag("owner"));
        event(sender, first, 29)
    }
})
world.afterEvents.itemStartUse.subscribe(data => {
    const sender = data.source
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 30)
})
world.afterEvents.itemStopUse.subscribe(data => {
    const sender = data.source
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 31)
})
world.afterEvents.itemReleaseUse.subscribe(data => {
    const sender = data.source
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 32)
})
world.afterEvents.itemCompleteUse.subscribe(data => {
    const sender = data.source
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 33)
})
world.afterEvents.playerDimensionChange.subscribe(data => {
    const sender = data.player
    const first = world.getAllPlayers().find(p => p.hasTag("owner"));
    event(sender, first, 34)
})
/**
*
* @param {Player} sender イベントのターゲット
* @param {Player} first オーナー
* @param {int} index イベントID 使用済: 0-31
* @param {String} variable データ比較用変数
* @param {any} variableData 固有データ変数
* @param {Entity | Block} data 検知別オブジェクト
*/
export function event(sender = Player.prototype, first = Player.prototype, index, variable = undefined, variableData = undefined, data = undefined) {
    if (first.getTags().find((tag, i) => tag.startsWith(`{"if":${index},`))) {
        const rules = first.getTags().filter((tag, i) => tag.startsWith(`{"if":${index},`))
        let datas = []
        rules.forEach((tag, i) => {
            datas.push(JSON.parse(tag))
        })
        if (world.getDimension(first.dimension.id).getEntities({ location: first.location, maxDistance: 100 }).length < mobLimit || !world.getDynamicProperty("EntityKill")) {
            if (world.getDynamicProperty("Stop") === false) {
                datas.forEach((rule => {
                    let v = false;
                    if (rule.hasOwnProperty(variable)) {
                        v = true;
                    }
                    let pars = getRandom(1, 100)
                    try {
                        if (rule[variable] === variableData || v === false) {
                            system.run(() => {
                                if (pars <= rule.par) {
                                    try {
                                        if (rule.run === 0) {
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"max":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            if (data === undefined) {
                                                sender.dimension.createExplosion({ x: sender.location.x, y: sender.location.y, z: sender.location.z }, getRandom(sub.min, sub.max), { causesFire: sub.fire, allowUnderwater: sub.water })
                                            }
                                            else {
                                                sender.dimension.createExplosion({ x: data.location.x, y: data.location.y, z: data.location.z }, getRandom(sub.min, sub.max), { causesFire: sub.fire, allowUnderwater: sub.water })
                                            }
                                        }
                                        else if (rule.run === 1) {
                                            sender.kill()
                                        }
                                        else if (rule.run === 2) {
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x":`))
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
                                            world.playSound("mob.endermen.portal", sender.location)
                                            sender.teleport(tagetLocation)
                                        }
                                        else if (rule.run === 4) {
                                            const { x, y, z } = sender.location
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"block":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            if (data === undefined) {
                                                sender.dimension.setBlockType({ x: x + sub.x, y: y + sub.y, z: z + sub.z }, sub.block)
                                            }
                                            else {
                                                sender.dimension.setBlockType({ x: data.location.x + sub.x, y: data.location.y + sub.y, z: data.location.z + sub.z }, sub.block)
                                            }
                                        }
                                        else if (rule.run === 5) {
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"damage":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            sender.applyDamage(sub.damage)
                                        }
                                        else if (rule.run === 6) {
                                            const { x, y, z } = sender.location
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            if (data === undefined) {
                                                sender.dimension.spawnEntity(sub.spawn, { x: x, y: y, z: z })
                                            }
                                            else {
                                                sender.dimension.spawnEntity(sub.spawn, { x: data.location.x, y: data.location.y, z: data.location.z })
                                            }
                                        }
                                        else if (rule.run === 7) {
                                            sender.teleport({ x: sender.location.x, y: sender.location.y + 300, z: sender.location.y })
                                        }
                                        else if (rule.run === 8) {
                                            try {
                                                const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"max":`))
                                                let subs2 = []
                                                subs.forEach((tag, i) => {
                                                    subs2.push(JSON.parse(tag))
                                                })
                                                const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                world.playSound("firework.launch", sender.location, { volume: 1, pitch: 0.5 })
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
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            sender.setOnFire(sub.time, sub.effect)
                                        }
                                        else if (rule.run === 10) {
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"effectId":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            sender.addEffect(sub.effectId, sub.time, { amplifier: sub.level })
                                        }
                                        else if (rule.run === 11) {
                                            const { x, y, z } = sender.location
                                            sender.dimension.spawnParticle(`minecraft:dragon_dying_explosion`, { x: x, y: y, z: z })
                                            world.playSound("random.pop", { x: x, y: y, z: z }, { volume: 1, pitch: 0.5 })
                                            sender.teleport({ x: x, y: y + 100, z: z })
                                            system.runTimeout(() => {
                                                try {
                                                    sender.kill()
                                                } catch (e) {

                                                }
                                            }, 10)
                                        }
                                        else if (rule.run === 12) {
                                            try {
                                                const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"imax":`))
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
                                                                    world.playSound("random.explode", inseki.location, { pitch: 0.5, volume: 100 })
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
                                                        const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"hmax":`))
                                                        let subs2 = []
                                                        subs.forEach((tag, i) => {
                                                            subs2.push(JSON.parse(tag))
                                                        })
                                                        const sub = subs2.find((sub, i) => sub.id === rule.id)
                                                        sender.applyImpulse({ x: 0, y: getRandom(1, 2.5), z: 0 })
                                                        world.playSound("firework.launch", sender.location, { volume: 1, pitch: 0.5 })
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
                                            const { x, y, z } = sender.location
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            if (data === undefined) {
                                                sender.dimension.setBlockType({ x: x + sub.x, y: y + sub.y, z: z + sub.z }, `${random3[getRandom(0, random3.length - 1)]}`)
                                            }
                                            else {
                                                sender.dimension.setBlockType({ x: data.location.x + sub.x, y: data.location.y + sub.y, z: data.location.z + sub.z }, `${random3[getRandom(0, random3.length - 1)]}`)
                                            }
                                        }
                                        else if (rule.run === 16) {
                                            const { x, y, z } = sender.location
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"spawn":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            // if (data === undefined) {
                                            sender.dimension.spawnParticle(`minecraft:huge_explosion_emitter`, { x: x, y: y, z: z })
                                            world.playSound("random.explode", { x: x, y: y, z: z }, { volume: 1, pitch: 0.5 })
                                            sender.teleport({ x: x, y: -64, z: z })
                                            system.runTimeout(() => {
                                                try {
                                                    sender.kill()
                                                } catch (e) {

                                                }
                                            }, 10)
                                            sender.dimension.spawnEntity(sub.spawn, { x: x, y: y, z: z })
                                            // }
                                            // else {
                                            //     sender.dimension.spawnParticle(`minecraft:huge_explosion_emitter`, { x: data.location.x, y: data.location.y, z: data.location.z })
                                            //     world.playSound("random.explode", { x: data.location.x, y: data.location.y, z: data.location.z }, { volume: 1, pitch: 0.5 })
                                            //     sender.dimension.spawnEntity(sub.spawn, { x: data.location.x + 0.5, y: data.location.y + 0.2, z: data.location.z + 0.5 })
                                            // }
                                        }
                                        else if (rule.run === 17) {
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"command":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            try {
                                                sender.runCommandAsync(`${sub.command}`)
                                            } catch (e) {

                                            }
                                        }
                                        else if (rule.run === 18) {
                                            const { x, y, z } = sender.location
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"x":`))
                                            let subs2 = []
                                            subs.forEach((tag, i) => {
                                                subs2.push(JSON.parse(tag))
                                            })
                                            const sub = subs2.find((sub, i) => sub.id === rule.id)
                                            sender.dimension.spawnItem(new ItemStack(`${random4[getRandom(0, random4.length - 1)]}`, getRandom(1, 64, true)), { x: x + getRandom(-sub.x, sub.x), y: y + sub.y, z: z + getRandom(-sub.z, sub.z) })
                                        }
                                        else if (rule.run === 19) {
                                            sender.setRotation({ x: getRandom(-180, 90, false), y: getRandom(-180, 180, false) })
                                        }
                                        else if (rule.run === 20) {
                                            const players = world.getPlayers({ gameMode: GameMode.survival }).filter(p => p.name !== sender.name)
                                            const target = players[getRandom(0, players.length - 1, true)]
                                            const location = sender.location
                                            const tagetLocation = target.location
                                            world.playSound("mob.endermen.portal", sender.location)
                                            sender.teleport(tagetLocation)
                                            world.playSound("mob.endermen.portal", target.location)
                                            target.teleport(location)
                                        }
                                        else if (rule.run === 21) {
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time":`))
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
                                            const subs = first.getTags().filter((tag, i) => tag.startsWith(`{"time":`))
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
                                        else {

                                        }
                                    } catch (e) {

                                    }
                                }
                                else {

                                }
                            })
                        }
                    } catch (e) {

                    }
                }))
            }
        }
        else {
            const entity = world.getDimension(first.dimension.id).getEntities({ location: first.location, maxDistance: 100 }).filter(e => e.typeId !== "minecraft:player")
            system.run(() => {
                entity[getRandom(0, entity.length - 1, true)].kill();
            })
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