
    const S_button = document.getElementById("start");
    const S_coins = document.getElementById("coins");
    const potato = document.getElementById("potato");
    const P_button = document.getElementById("takara");
    const shop_button = document.getElementById("shop");
    const resetButton = document.getElementById("reset");
    const p_buff_c = document.getElementById("p_buff");
    const c_buff_c = document.getElementById("c_buff");
    const streak = document.getElementById("streak");
    const save_button = document.getElementById("save"); 
    const delete_button = document.getElementById("delete");
    
    const slots = [];
    let shild = false;
    let coins = parseInt(localStorage.getItem('coins'));
    let loseStreak = 0; //連続外れ数
    let p_buff = parseInt(localStorage.getItem('p_buff')); //ポテト入手量
    let c_buff = parseInt(localStorage.getItem('c_buff')); //コイン入手倍率
    let potato_count = parseInt(localStorage.getItem('potato'));

    
    const PROBABILITY_TABLE = [
        { id: 0, name: "通常", weight: 20 },      // 20%
        { id: 1, name: "ご機嫌", weight: 15 },   // 15%
        { id: 2, name: "呪い", weight: 6 },       // 6%
        { id: 3, name: "もぐもぐ", weight: 10 },   // 10%
        { id: 4, name: "しのせん", weight: 8 },    // 8%
        { id: 5, name: "ポテト", weight: 15 },     // 15%
        { id: 6, name: "緑間アンチ", weight: 15 },    // 15%
        { id: 7, name: "たましーるど", weight: 11 }   // 11%
    ];
    //確率リセット用配列
    const PROBABILITY_RESET = [
        { id: 0, name: "通常", weight: 20 },      // 20%
        { id: 1, name: "ご機嫌", weight: 15 },   // 15%
        { id: 2, name: "呪い", weight: 6 },       // 6%
        { id: 3, name: "もぐもぐ", weight: 10 },   // 10%
        { id: 4, name: "しのせん", weight: 8 },    // 8%
        { id: 5, name: "ポテト", weight: 15 },     // 15%
        { id: 6, name: "緑間アンチ", weight: 15 },    // 15%
        { id: 7, name: "たましーるど", weight: 11 }   // 11%
    ];
    //バフ表示更新用関数
    function updatebuffDisplay() {
        c_buff_c.textContent = String(c_buff);
        p_buff_c.textContent = String(p_buff);
    }
    // 確率表示更新関数
    function updateProbabilityDisplay() {
        const totalWeight = PROBABILITY_TABLE.reduce((sum, item) => sum + item.weight, 0);
        let html = "<strong>各アイテム出現確率:</strong><br>";

        PROBABILITY_TABLE.forEach(item => {
            const percentage = ((item.weight / totalWeight) * 100).toFixed(1);
            html += `${item.name}: ${percentage}%<br>`;
        });

        document.getElementById("prob-text").innerHTML = html;
    }
    //コイン、ポテト表示更新
    function updateItems(){
        S_coins.textContent = String(coins);
        potato.textContent = String(potato_count);
        c_buff_c.textContent = String(c_buff);
        p_buff_c.textContent = String(p_buff);
    }

    //リセット関数
    function reset(){
        coins = 100000;
        potato_count = 0;
        p_buff = 0;
        c_buff = 1;
        loseStreak = 0;
        S_coins.textContent = String(coins);
        potato.textContent = String(potato_count);
        p_buff_c.textContent = String(p_buff);
        c_buff_c.textContent = String(c_buff);
        streak.textContent = String(loseStreak);
        for(let i = 0; i < 8; i++){
            PROBABILITY_TABLE[i].weight = PROBABILITY_RESET[i].weight
        }
        updateProbabilityDisplay();
    }
    //セーブ関数
    function save(){
        localStorage.setItem('coins',coins);
        localStorage.setItem('p_buff',p_buff);
        localStorage.setItem('potato',potato_count);
        localStorage.setItem('c_buff',c_buff);
    }
    
    // 初期表示
    updateProbabilityDisplay();
    updateItems();
    
    //確率入りランダム関数
    function getRandomSlot() {
        const totalWeight = PROBABILITY_TABLE.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        // 連続外れ数に応じてボーナス確率を減算（当選確率UP）
        random -= (loseStreak * 1.5); // 1外れ毎に確率が1.5%分進む

        for (let item of PROBABILITY_TABLE) {
            random -= item.weight;
            if (random <= 0) return item.id;
        }
        return 0;
    }
    hard.addEventListener("click", listener = () => {
        alert("呪い確率強化を購入しました！\nポテト入手量が増加します！");
        PROBABILITY_TABLE[2].weight += 4; //呪い確率+4%
        PROBABILITY_TABLE[0].weight -= 4; //外れ確率-4%
        p_buff += 2; //ポテト入手量増加値+2
        updateProbabilityDisplay();
        updatebuffDisplay();
    });
    item2.addEventListener("click", listener = () => {
        if ( potato_count >= 10 ) {
            potato_count = potato_count - 10;
            potato.textContent = String(potato_count);
            alert("しのせん出現確率上昇を購入しました！");
            PROBABILITY_TABLE[4].weight += 3; //しのせん確率+3%
            PROBABILITY_TABLE[0].weight -= 3; //外れ確率-3%
            updateProbabilityDisplay();
            updatebuffDisplay();
        } else {
            alert("ポテトが足りません！");
        }
    });

    //スロットスタートボタン
    S_button.addEventListener("click", listener = () => {
        if (coins <= 9) {
            alert("コインが足りません！\nチギュアアアアアアア！！！");
        }
        else {
            for (let i = 1; i <= 9; i++) {
                slots[i] = document.getElementById(`S${i}`);
                slots[i].alt = getRandomSlot();
                slots[i].src = `img/${slots[i].alt}.jpg`;
            }
            coins -= 10;
            S_coins.textContent = String(coins);
            slot();
        }
    });
    function slot() {
        //スロットの当たり判定
        if (slots[2].alt == slots[5].alt && slots[5].alt == slots[8].alt) {
            slot_reward(5, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[1].alt == slots[4].alt && slots[4].alt == slots[7].alt) {
            slot_reward(4, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[3].alt == slots[6].alt && slots[6].alt == slots[9].alt) {
            slot_reward(6, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[1].alt == slots[5].alt && slots[5].alt == slots[9].alt) {
            slot_reward(5, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[3].alt == slots[5].alt && slots[5].alt == slots[7].alt) {
            slot_reward(5, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[1].alt == slots[2].alt && slots[2].alt == slots[3].alt) {
            slot_reward(2, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[4].alt == slots[5].alt && slots[5].alt == slots[6].alt) {
            slot_reward(5, p_buff, c_buff);
            loseStreak = 0;
        }
        else if (slots[7].alt == slots[8].alt && slots[8].alt == slots[9].alt) {
            slot_reward(8, p_buff, c_buff);
            loseStreak = 0;
        }
        else {
            loseStreak++;
            streak.textContent = loseStreak;
        }
    }
    //スロットの報酬機能
    function slot_reward(a, p_buff, c_buff) {
        const s_ID = parseInt(slots[a].alt);
        if (s_ID == 2) {
            if (shild === true) {
                alert("タマシールドによって呪いが防がれた！");
                shild = false;
            }
            else {
                coins = 0;
                S_coins.textContent = String(coins);
                alert("こばたくの呪いによってコインが全て失われました\nチギュアアアアアアア！！！");
            }
        }
        else if (s_ID == 5) {
            potato_count += (1 + p_buff);
            potato.textContent = String(potato_count);
            alert(`ギターデブからポテトを${1 + p_buff}つもらいました`);
        }
        else if (s_ID == 4) {
            alert("しのせんパワーでコインの所持数が2倍！");
            coins = Math.floor(coins * 2);
            S_coins.textContent = String(coins);
        }
        else if (s_ID == 3) {
            alert(`こばたくに箸でコインを半分食べられた！`);
            coins = Math.floor(coins / 2);
            S_coins.textContent = String(coins);
        }
        else if (s_ID == 7) {
            coins += (150 * c_buff);
            S_coins.textContent = String(coins);
            shild = true;
            alert(`タマシールドによって呪いを一回防いでくれるようになった！\n${150 * c_buff}枚獲得しました！`);
        }
        else if (s_ID == 6) {
            coins += (500 * c_buff);
            S_coins.textContent = String(coins);
            alert(`緑間アンチからプレゼント！\n${500 * c_buff}枚獲得しました！`);
        }
        else if (s_ID == 1) {
            coins += (1000 * c_buff);
            S_coins.textContent = String(coins);
            alert(`こばたくはご機嫌だ！\n${1000 * c_buff}枚獲得しました！`);
        }
        else {
            coins += (100 * c_buff);
            S_coins.textContent = String(coins);
            alert(`コインを${100 * c_buff}枚獲得しました！`);
        }
    }
    resetButton.addEventListener("click", listener = () => {
        reset();
    });

shop_button.addEventListener('click', () => {
        localStorage.setItem('coins',coins);
        localStorage.setItem('p_buff',p_buff);
        localStorage.setItem('potato',potato_count);
        localStorage.setItem('c_buff',c_buff);
        window.location.href="shop.html";
});

save_button.addEventListener('click',() =>{
    save();
    alert('データを保存しました');
});

delete_button.addEventListener('click',()=>{
    var result = window.confirm("データを削除しますか?");
    if(result){
        localStorage.clear();
        alert('データを削除しました');
    }else{
        alert('キャンセルしました');
    } 
});