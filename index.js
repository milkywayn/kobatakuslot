        document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const loadButton = document.getElementById('load-button');

    // スタートボタンがクリックされた時の処理
    startButton.addEventListener('click', () => {
        let coins = 100000;
        let potato = 0;
        let c_buff = 1;
        let p_buff = 0;
        localStorage.setItem('coins',coins);
        localStorage.setItem('p_buff',p_buff);
        localStorage.setItem('potato',potato);
        localStorage.setItem('c_buff',c_buff);
        window.location.href = "slot.html";
    });
    loadButton.addEventListener('click', () => {
        window.location.href = "slot.html";
    });

    // オプションボタンなどの他のボタンの処理もここに追加できます。
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert(button.textContent + '画面へ遷移します。');
        });
    });
});
