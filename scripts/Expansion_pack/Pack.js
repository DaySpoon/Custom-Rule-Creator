import { Player, system, world } from "@minecraft/server"
import { event, random2 } from "../Main"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"
/*
標準プロパティ
   ruleDisplay: Object; //UIに表示したときのテキスト
        nameSpace: String; //名前空間
        name: String; //発動条件
    ruleForm: Object; //選んだ時のフォームの設定(本来の機能には無い。更に細かな発動条件を設定できる。)
        enable: Boolean; //フォームを有効にするか
        form: function (sender, owner, formData, runData, rule) void; // フォーム関連のコード(自分で細かく設定可。)
    ruleDetect: function (sender, owner, CallID) void; // 条件を感知するためのコード(こちらも自分で細かく設定可。)

使用可能関数
   ruleData() //ルールをデータに保存します(必須。これが無ければ設定されない)
   getRuleDatas() //指定したルールを取得します(場合によって使う。ruleFormで設定した変数を使う時は必須。返り値は配列。)
   event() //イベントを出力します(必須。これが無ければイベントが出力されない)
ここでは拡張パックを導入することができます。ただし、現時点で追加できるのは検知のみです。
もし実行関連を追加したい場合はこのアドオンの内部システム自体を改造する必要があります。
作った拡張パックは配布することができます。ただしアドオン作成者のyoutubeリンクやこのアドオンを作った人などの明記をしてください。
By DaySpからぁげぇい
youtubeリンク:https://www.youtube.com/channel/UCK4Nbt4uT9L57PgM_euvnZQ
githubリンク:https://github.com/DaySpoon/Custom-Rule-Creator
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
ここに追加したいコードを書くか、コピペで持ってくることができます
*/

// Default Pack 
const pack = [
    {
        ruleDisplay: {
            nameSpace: "既存の拡張パック",
            name: "スロットnを選んでいたら"
        },
        ruleForm: {
            enable: true,
            form: function (sender = Player.prototype, owner = Player.prototype, formData, runData, rule) {
                let ui = new ModalFormData()
                ui.title("スロット設定")
                ui.slider("この値で検知", 0, 8, 1)
                ui.show(sender).then(({ formValues, canceled }) => {
                    if (canceled) return;
                    rule.Slot = formValues[0];
                    ruleData(sender, owner, runData, rule)
                })
            }
        },
        ruleDetect: function (sender = Player.prototype, owner = Player.prototype, CallID) {
            const rule = getRuleDatas(owner, CallID);
            if (rule !== undefined) {
                rule.forEach(r => {
                    if (sender.selectedSlotIndex === r.Slot) {
                        event(sender, owner, CallID, `Slot`, r.Slot)
                    }
                })
            }
        }
    },
    {
        ruleDisplay: {
            nameSpace: "既存の拡張パック",
            name: "特定のスコアがnだったら"
        },
        ruleForm: {
            enable: true,
            form: function (sender = Player.prototype, owner = Player.prototype, formData, runData, rule) {
                let ui = new ModalFormData()
                ui.title("特定のスコア設定")
                ui.textField("このスコアで検知", "Scoreboard")
                ui.slider("この値で検知", 1, 1000, 1)
                ui.show(sender).then(({ formValues, canceled }) => {
                    if (canceled) return;
                    if (formValues[0] !== undefined) {
                        rule.Scoreboard = formValues[0];
                        rule.Score = formValues[1];
                        rule.Json = {
                            Scoreboard: formValues[0],
                            Score:formValues[1]
                        }
                        ruleData(sender, owner, runData, rule)
                    }
                    else {
                        sender.sendMessage("§cスコアボード名を入力してください！")
                    }
                })
            }
        },
        ruleDetect: function (sender = Player.prototype, owner = Player.prototype, CallID) {
            const rule = getRuleDatas(owner, CallID);
            if (rule !== undefined) {
                rule.forEach(r => {
                    if (world.scoreboard.getObjective(r.Scoreboard)) {
                        if (world.scoreboard.getObjective(r.Scoreboard).getScore(sender.scoreboardIdentity)) {
                            const score = world.scoreboard.getObjective(r.Scoreboard).getScore(sender.scoreboardIdentity)
                            if (score === r.Score) {
                                event(sender, owner, CallID, `Json`, r.Json)
                            }
                        }
                        else {
                            world.scoreboard.getObjective(r.Scoreboard).setScore(sender.scoreboardIdentity, 0)
                        }
                    }
                    else {
                        world.scoreboard.addObjective(r.Scoreboard);
                    }
                })
            }
        }
    }
    //追加する場合は,(コンマ)をつけてから追加してください。
    // 追加したい場合はこの下に貼り付けるか、コードを書いてください。
]





























// 既存の関数(弄らない方が良い)
/**
* ルールを保存します
* @param {Player} sender ターゲット
* @param {Player} first オーナー
* @param {String} runData 実行出力用変数
* @param {String} rule データ出力用変数
*/
function ruleData(sender, first, runData, rule) {
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
                first.addTag(`${JSON.stringify(rule)}`)
                first.addTag(`${JSON.stringify(rule2)}`)
                sender.sendMessage(`§aルールを作成しました。`)
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
                first.addTag(`${JSON.stringify(rule)}`)
                first.addTag(`${JSON.stringify(rule2)}`)
                sender.sendMessage(`§aルールを作成しました。`)
            }
            else {
                sender.sendMessage("§c数字で入力してください！")
            }
        })
    }
    else if (runData === "ダメージを与える") {
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
                first.addTag(`${JSON.stringify(rule)}`)
                first.addTag(`${JSON.stringify(rule2)}`)
                sender.sendMessage(`§aルールを作成しました。`)
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
            first.addTag(`${JSON.stringify(rule)}`)
            first.addTag(`${JSON.stringify(rule2)}`)
            sender.sendMessage(`§aルールを作成しました。`)
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
            first.addTag(`${JSON.stringify(rule)}`)
            first.addTag(`${JSON.stringify(rule2)}`)
            sender.sendMessage(`§aルールを作成しました。`)
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
            first.addTag(`${JSON.stringify(rule)}`)
            first.addTag(`${JSON.stringify(rule2)}`)
            sender.sendMessage(`§aルールを作成しました。`)
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
            first.addTag(`${JSON.stringify(rule)}`)
            first.addTag(`${JSON.stringify(rule2)}`)
            sender.sendMessage(`§aルールを作成しました。`)
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
                first.addTag(`${JSON.stringify(rule)}`)
                first.addTag(`${JSON.stringify(rule2)}`)
                sender.sendMessage(`§aルールを作成しました。`)
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
            first.addTag(`${JSON.stringify(rule)}`)
            first.addTag(`${JSON.stringify(rule2)}`)
            sender.sendMessage(`§aルールを作成しました。`)
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
                first.addTag(`${JSON.stringify(rule)}`)
                first.addTag(`${JSON.stringify(rule2)}`)
                sender.sendMessage(`§aルールを作成しました。`)
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
                first.addTag(`${JSON.stringify(rule)}`)
                first.addTag(`${JSON.stringify(rule2)}`)
                sender.sendMessage(`§aルールを作成しました。`)
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
            if (isNaN(formValues[0])) {
                let rule2 = {
                    command: formValues[0],
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
    else if (runData === "ランダムなアイテムをスポーンさせる") {
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
            first.addTag(`${JSON.stringify(rule)}`)
            first.addTag(`${JSON.stringify(rule2)}`)
            sender.sendMessage(`§aルールを作成しました。`)
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
/**
* 指定したルールデータを取得します
* @param {Player} owner オーナー
* @param {Number} CallID 呼びだされたルールデータID 
* @param {Boolean} getRawData JSON形式のデータ 
*/
function getRuleDatas(owner, CallID, getRawData = false) {
    if (owner.getTags().find((tag, i) => tag.startsWith(`{"if":${CallID},`))) {
        const rules = owner.getTags().filter((tag, i) => tag.startsWith(`{"if":${CallID},`))
        let datas = []
        if(!getRawData) {
            rules.forEach((tag, i) => {
                datas.push(JSON.parse(tag))
            })
            return datas;
        }
        else {
            rules.forEach((tag, i) => {
                datas.push(tag)
            })
            return datas;
        }
    }
    else return undefined;
}
export { pack }