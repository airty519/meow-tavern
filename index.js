// 暫時不使用 import，避免路徑錯誤導致崩潰
const extensionName = 'meow-tavern'; // 你的資料夾名稱
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

jQuery(async () => {
    try {
        // 嘗試載入 HTML
        const html = await $.get(`${extensionFolderPath}/index.html`);
        $('#extension_settings').append(html);

        // 綁定一個簡單的測試按鈕
        $('#meow_btn_generate').on('click', () => {
            alert("🐱 喵喵測試！按鈕可以正常運作啦！");
        });
        
        console.log("喵喵製卡機載入成功！");
    } catch (error) {
        console.error("喵喵製卡機載入 HTML 失敗:", error);
    }
});
