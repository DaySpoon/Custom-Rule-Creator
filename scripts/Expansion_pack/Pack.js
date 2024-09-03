import { Player, system, world } from "@minecraft/server"
import { event, random2, ruleData } from "../Mains"
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
            form: function (sender = Player.prototype, owner = undefined, formData, runData, rule) {
                let ui = new ModalFormData()
                ui.title("スロット設定")
                ui.slider("この値で検知", 0, 8, 1)
                ui.show(sender).then(({ formValues, canceled }) => {
                    if (canceled) return;
                    rule.Slot = formValues[0];
                    ruleData(sender, runData, rule)
                })
            }
        },
        ruleDetect: function (sender = Player.prototype, owner = undefined, CallID) {
            const rule = getRuleDatas(CallID);
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
            form: function (sender = Player.prototype, owner = undefined, formData, runData, rule) {
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
                            Score: formValues[1]
                        }
                        ruleData(sender, runData, rule)
                    }
                    else {
                        sender.sendMessage("§cスコアボード名を入力してください！")
                    }
                })
            }
        },
        ruleDetect: function (sender = Player.prototype, owner = undefined, CallID) {
            const rule = getRuleDatas(CallID);
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
* 指定したルールデータを取得します
* @param {Number} CallID 呼びだされたルールデータID 
* @param {Boolean} getRawData JSON形式のデータ 
*/
function getRuleDatas(CallID, getRawData = false) {
    if (world.getDynamicProperty("CRC:rules")) {
        const owner = JSON.parse(world.getDynamicProperty("CRC:rules"))
        if (owner.rule.find((tag, i) => tag.if === CallID)) {
            const rules = owner.rule.filter((tag, i) => tag.if === CallID)
            let datas = []
            if (!getRawData) {
                rules.forEach((tag, i) => {
                    datas.push(tag)
                })
                return datas;
            }
            else {
                rules.forEach((tag, i) => {
                    datas.push(JSON.stringify(tag))
                })
                return datas;
            }
        }
        else return undefined;
    }
    else return undefined;
}
export { pack }