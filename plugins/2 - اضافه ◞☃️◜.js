import fs from 'fs';
import path from 'path';

let createFile = async (filename, data) => {
    let filePath = path.join('plugins', filename);

    try {
        await fs.promises.writeFile(filePath, data, 'utf8');
        console.log(`تم إنشاء الملف ${filename} بنجاح.`);
    } catch (err) {
        console.error(`فشل في إنشاء الملف ${filename}: ${err.message}`);
        throw err;
    }
};

let handler = async (m, { isROwner, usedPrefix, command, text }) => {
    await m.reply(global.wait);
    if (!isROwner) return;

    // التحقق من وجود اسم الملف والبيانات لإنشاء الملف
    if (!text) {
        throw `يرجى تحديد اسم الملف والبيانات لإنشاء الملف، مثال:\n${usedPrefix + command} example.js <البيانات>`;
    }

    // فصل اسم الملف والبيانات من النص المدخل
    let parts = text.split(' ');
    if (parts.length < 2) {
        throw `يرجى تحديد اسم الملف والبيانات، مثال:\n${usedPrefix + command} example.js <البيانات>`;
    }
    
    let filename = parts[0] + '.js';
    let data = parts.slice(1).join(' ');

    try {
        await createFile(filename, data);
        m.reply(`تم إنشاء الملف ${filename} بنجاح.`);
    } catch (e) {
        console.error(`حدث خطأ أثناء إنشاء الملف ${filename}: ${e.message}`);
        m.reply(`حدث خطأ أثناء إنشاء الملف ${filename}: ${e.message}`);
    }
};

handler.help = ['createplugin'];
handler.tags = ['owner'];
handler.command = ['2', 'باتش-اضافه']
handler.rowner = true;

export default handler;
