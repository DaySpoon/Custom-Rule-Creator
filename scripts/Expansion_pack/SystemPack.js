import { Player, system, world } from "@minecraft/server"
import { event, loadOldSaveData, loadSaveData, ruleData, set, setter } from "../Mains"
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"
/*
§c※未完成機能です。正しく動作しない可能性があります。
ここでは拡張パックを導入することができます。ここで追加できるのは実行機能です。
作った拡張パックは配布することができます。ただしアドオン作成者のyoutubeリンクやこのアドオンを作った人などの明記をしてください。
By DaySpからぁげぇい
youtubeリンク:https://www.youtube.com/channel/UCK4Nbt4uT9L57PgM_euvnZQ
githubリンク:https://github.com/DaySpoon/Custom-Rule-Creator
wiki:https://github.com/DaySpoon/Custom-Rule-Creator/wiki/%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
ここに追加したいコードを書くか、コピペで持ってくることができます
*/

// Default Pack 
const system_pack = [
    // {
    //     displayName: {
    //         nameSpace: "既存の拡張パック",
    //         name: "テスト"
    //     },
    //     subData: {
    //         enable: true,
    //         form: function (sender = Player.prototype, runData, ruleData) {
    //             let ui = new ModalFormData()
    //             ui.title("テストの設定")
    //             ui.textField("a", "a")
    //             ui.show(sender).then(({ formValues, canceled }) => {
    //                 if (canceled) return
    //                 if (formValues[0]) {
    //                     let rule2 = {
    //                         test: formValues[0]
    //                     }
    //                     set(sender, ruleData, rule2)
    //                 }
    //             })
    //         },
    //         randomize: {
    //             IsRandomize: true,
    //             randomRule: function (rule_obj) {
    //                 let rule2_obj = {
    //                     test: "aaa"
    //                 }
    //                 setter(rule_obj, rule2_obj)
    //             }
    //         }
    //     },
    //     runAction: function (sender, rule) {
    //         const sub = getSubDataRule(rule, `test`)
    //         sender.sendMessage(sub.test)
    //     },
    //     ruleDataJSON: `test`
    // },
    //追加する場合は,(コンマ)をつけてから追加してください。
    // 追加したい場合はこの下に貼り付けるか、コードを書いてください。
]

function getSubDataRule(rule, ruleDataJSON) {
    const first = JSON.parse(world.getDynamicProperty("CRC:rules")) ?? undefined
    if (first !== undefined) {
        let se = [];
        first.subRule.forEach((s) => {
            se.push(JSON.stringify(s))
        })
        const subs = se.filter((tag, i) => tag.startsWith(`{"${ruleDataJSON}":`))
        let subs2 = []
        subs.forEach((tag, i) => {
            subs2.push(JSON.parse(tag))
        })
        const sub = subs2.find((sub, i) => sub.id === rule.id)
        return sub
    }
    else return undefined
}

export { system_pack }