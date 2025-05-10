require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Usa el token desde .env
const token = process.env.BOT_TOKEN;

// Crea el bot con polling
const bot = new TelegramBot(token, {
    polling: {
        autoStart: true,
        interval: 300,
        params: {
            timeout: 10,
        },
    },
});

// Manejo de errores de polling para evitar que el bot se caiga
bot.on('polling_error', (err) => {
    console.error('[polling_error]', err.code, err.message);
});

// Comando /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '¡Hola! Soy tu bot Gomsaby 🤖. ¿En qué te ayudo hoy?');
});

// Comando /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Puedes usar los siguientes comandos:\n/start - Iniciar\n/help - Ayuda');
});

// Cualquier otro mensaje
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Ignorar comandos
    if (text.startsWith('/')) return;

    // Responder con eco
    bot.sendMessage(chatId, `Dijiste: "${text}"`);
});
