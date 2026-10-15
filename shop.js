let coins = 0;
let potato_count = 0;
let c_buff = 1; 
let p_buff = 0;

const COINS_DISPLAY = document.getElementById("coins-count");
const POTATO_DISPLAY = document.getElementById("potato-count");
const p_buff_d = document.getElementById("p-buff-count");
const c_buff_d = document.getElementById("c-buff-count");
const BACK_BUTTON = document.getElementById("back-to-slot");
const c_buff_buy =document.getElementById("c-buff-buy");
const p_buff_buy = document.getElementById("p-buff-buy");
const c_buy = document.getElementById("c-buy");
const p_buy = document.getElementById("p-buy");

// --- データのロードと初期表示 ---
function loadGameData() {
    // localStorageからデータをロード (nullチェックと数値変換)
    coins = parseInt(localStorage.getItem('coins'));
    potato_count = parseInt(localStorage.getItem('potato'));
    c_buff = parseInt(localStorage.getItem('c_buff'));
    p_buff = parseInt(localStorage.getItem('p_buff'));

    // 表示を更新
    COINS_DISPLAY.textContent = String(coins);
    POTATO_DISPLAY.textContent = String(potato_count);
    c_buff_d.textContent = String(c_buff);
    p_buff_d.textContent = String(p_buff);
}
function updateItems(){
    COINS_DISPLAY.textContent = String(coins);
    POTATO_DISPLAY.textContent = String(potato_count);
    c_buff_d.textContent = String(c_buff);
    p_buff_d.textContent = String(p_buff);

}
// --- データの保存 ---
function saveGameData() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('potato', potato_count);
    localStorage.setItem('c_buff', c_buff);
    localStorage.setItem('p_buff', p_buff);
}
//アイテム購入処理
    c_buff_buy.addEventListener("click", listener = () => {
        if ( potato_count >= 1 ) {
            potato_count -= 1;
            POTATO_DISPLAY.textContent = String(potato_count);
            alert("コイン入手倍率強化を購入しました！\nコイン入手量が増加します！");
            c_buff += 1; //コイン入手倍率+1
            updateItems();
        } else {
            alert("ポテトが足りません！");
        }
    });

    p_buff_buy.addEventListener("click", listener = () => {
        if ( potato_count >= 5 ) {
            potato_count = potato_count - 5;
            POTATO_DISPLAY.textContent = String(potato_count);
            alert("ポテト入手量増加を購入しました！");
            p_buff += 1; //ポテト入手量増加値+1
            updateItems();
        } else {
            alert("ポテトが足りません！");
        }
    });

    c_buy.addEventListener("click", listener = () => {
        if ( potato_count >= 1 ) {
            potato_count = potato_count - 1;
            POTATO_DISPLAY.textContent = String(potato_count);
            alert("コインを1000枚購入しました");
            coins += 1000; //コイン枚数を1000追加
            updateItems();
        } else {
            alert("ポテトが足りません！");
        }
    });

    p_buy.addEventListener("click", listener = () => {
        if ( coins >= 1210 ) {
            coins = coins - 1200;
            COINS_DISPLAY.textContent = String(coins);
            alert("ポテトを1つ購入しました");
            potato_count += 1; //ポテトを追加
            updateItems();
        } else {
            alert("コインが足りません！");
        }
    });

// --- イベントリスナー ---
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();
    
    // タブ切り替え機能
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.item-card').forEach(item => {
                item.style.display = 'none';
                if (item.classList.contains(category)) {
                    item.style.display = 'block';
                }
            });
        });
    });
});
    // 初期表示として最初のタブをアクティブにする
    document.querySelector('.tab-button.active').click(); 

    // スロット画面へ戻るボタン
    BACK_BUTTON.addEventListener('click', () => {
        saveGameData(); // 戻る前にデータを保存
        window.location.href = "slot.html";
    });
