import { getContext } from '../../../../extensions.js';
import { generateRaw } from '../../../../generate.js'; 

const extensionName = 'meow-tavern'; // 對應你的資料夾名稱

jQuery(async () => {
    // 將 HTML 載入到 ST 的擴充套件面板中
    const html = await $.get(`scripts/extensions/third-party/${extensionName}/index.html`);
    $('#extension_settings').append(html);

    // 綁定生成按鈕的點擊事件
    $('#meow_btn_generate').on('click', async () => {
        const keyword = $('#meow_keyword_input').val();
        if (!keyword) {
            toastr.warning("請先輸入角色的關鍵字喔！");
            return;
        }

        const statusDiv = $('#meow_status_text');
        statusDiv.show().text("⏳ 喵喵努力生成中，請稍候...");
        $('#meow_btn_generate').prop('disabled', true);

        try {
            // 這裡放剛才的系統提示詞與生成邏輯
            const systemPrompt = `請根據使用者的描述生成角色卡，嚴格輸出 JSON 格式，包含 name, description, personality, first_mes 等欄位。`;
            const fullPrompt = `${systemPrompt}\n\n使用者描述：${keyword}\n請輸出 JSON：`;
            
            const response = await generateRaw(fullPrompt, true);
            console.log("AI 回應:", response);
            
            // 簡單的正則表達式提取 JSON (可利用你擅長的 Regex 進階處理)
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                const charData = JSON.parse(jsonMatch[0]);
                statusDiv.text(`✅ 生成成功！角色名稱：${charData.name}`);
                // 這裡後續可以串接寫入 ST 角色庫的 API
            } else {
                statusDiv.text("❌ AI 格式錯誤，請再試一次。");
            }
            
        } catch (error) {
            console.error("製卡機錯誤:", error);
            statusDiv.text("❌ 發生錯誤，請檢查終端機。");
        } finally {
            $('#meow_btn_generate').prop('disabled', false);
        }
    });
});
