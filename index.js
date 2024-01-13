const {Telegraf} = require("telegraf");
const Sentiment = require('sentiment')
const sentiment = new Sentiment()
require("dotenv").config();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`Hi, ${ctx.message.from.first_name}`);
});

bot.help((ctx) => {
    ctx.reply('This bot will detect sentiments of text')
})

bot.hears(/.*/, (ctx) => {
    const result = sentiment.analyze(ctx.message.text);
    const formattedScore = result.score.toFixed(2);
    const formattedComparative = result.comparative.toFixed(2);

    return ctx.replyWithMarkdown(`
Score:  *${formattedScore}*
Avg score:  *${formattedComparative}*
    `);
})

bot.launch().then(r => console.log('Started'))