  // ==============================
// 練習メニューのデータ
// ==============================

const menus = {

  "アップ": [
        "ストレッチ",
        "ランニング",
        "ラダー",
        "ダッシュ",
        "ラインダッシュ",
    ],

    "パス": [
        "肩慣らし",
        "アンダー",
        "オーバー",
        "9ｍパス",
        "壁パス",
        "直上パス",
        "低弾道パス",
        "対人",
        "ガチ対人",
        "ボールゲーム",
    ],

    "レセプション": [
        "対人キャッチ",
        "１枚キャッチ",
        "３枚キャッチ",
    ],

    "ディグ": [
        "地上ディグ",
        "対人ディグ",
        "１枚ディグ",
        "３枚ディグ",
        "６枚ディグ",
    ],

    "サーブ": [
        "サーブ",
        "プレッシャーサーブ",
    ],

    "スパイク": [
        "打ち込み",
        "バック打ち込み",
        "連続打ち込み",
        "１列スパイク",
        "クイック打ち込み",
        "２段打ち込み",
        "2段スパイク",
        "トス合わせ",
        "Ｂパスからトス合わせ",
        "レフトトス合わせ―Ａパスから",
        "レフトトス合わせ―Ｂパスから",
        "ライトトス合わせ―Ａパスから",
        "ライトトス合わせ―Ｂパスから",
        "コンビ",
    ],

    "ブロック": [
        "ブロックステップ",
        "空ブロック",
        "６ブロック",
        "その場左右",
        "１枚ブロック",
        "３枚ステップ",
        "ボールなし2枚",
        "２枚ブロック",
        "対クイックブロック",
        "生きたトスブロック",
    ],

     "複合練": [
        "キャッチからスパイク",
        "キャッチから切り返し",
        "ディグからの切り返し",
        "キャッチからの切り返し＋ディグからの切り返し",
        "ＡＢ戦",
        "紅白戦",
        "ＯＢ戦",
    ],
};
const savedMenus =
    localStorage.getItem("volleyballMenus");

if (savedMenus) {

    Object.assign(
        menus,
        JSON.parse(savedMenus)
    );

}

    // ==============================
// カテゴリーとメニューの選択
// ==============================

const categorySelect = document.getElementById("category");
const menuSelect = document.getElementById("menu");


// カテゴリーが変更されたとき
categorySelect.addEventListener("change", function() {

    const category = categorySelect.value;

    // メニュー欄を空にする
    menuSelect.innerHTML = "";


    // カテゴリーが選ばれていない場合
    if (category === "") {

        menuSelect.innerHTML =
            "<option value=''>カテゴリーを選択してください</option>";

        return;
    }


    // 「メニューを選択してください」を最初に表示
    const firstOption = document.createElement("option");

    firstOption.value = "";
    firstOption.textContent = "メニューを選択してください";

    menuSelect.appendChild(firstOption);


    // 選択したカテゴリーのメニューを表示
    menus[category].forEach(function(menu) {

        const option = document.createElement("option");

        option.value = menu;
        option.textContent = menu;

        menuSelect.appendChild(option);

    });

});


// ==============================
// 作成した練習メニューを保存
// ==============================

let trainingMenus = [];


// ==============================
// 「メニューを追加」ボタン
// ==============================

function addMenu() {

    const category = categorySelect.value;
    const menu = menuSelect.value;

    const time =
        Number(document.getElementById("time").value);

    const sets =
        Number(document.getElementById("sets").value);


    // カテゴリー・メニューが選ばれていない場合
    if (!category || !menu) {

        alert("カテゴリーとメニューを選択してください");

        return;
    }


    // 練習メニューを保存
    trainingMenus.push({

        category: category,
        menu: menu,
        time: time,
        sets: sets

    });


    // 画面に表示
    displayMenus();

}


// ==============================
// 練習メニューを画面に表示
// ==============================

// ==============================
// 練習メニューを画面に表示
// ==============================

function displayMenus() {

    const list =
        document.getElementById("menuList");

    list.innerHTML = "";

    let totalTime = 0;


    trainingMenus.forEach(function(item, index) {

        totalTime += item.time;


        const div =
            document.createElement("div");

        div.className = "menu-item";

        // ドラッグできるようにする
        div.draggable = true;

        // 並び替え用の番号
        div.dataset.index = index;


        div.innerHTML = `

            <strong class="menu-title">

                <span class="menu-number">
                    ${index + 1}
                </span>

                ${item.menu}

            </strong>

            <br>

            カテゴリー：${item.category}

            <br>

            時間：${item.time}分　
            セット：${item.sets}

            <br>

            <button onclick="editMenu(${index})">
                ✏️ 編集
            </button>

            <button
                class="delete-button"
                onclick="deleteMenu(${index})">

                🗑️ 削除

            </button>

        `;


        // ==============================
        // ドラッグ開始
        // ==============================

        div.addEventListener("dragstart", function() {

            div.classList.add("dragging");

        });


        // ==============================
        // ドラッグ終了
        // ==============================

        div.addEventListener("dragend", function() {

            div.classList.remove("dragging");

        });


        list.appendChild(div);

    });


    // ==============================
    // ドラッグ中の並び替え
    // ==============================

    list.addEventListener("dragover", function(e) {

        e.preventDefault();

        const dragging =
            document.querySelector(".dragging");

        if (!dragging) {
            return;
        }


        const cards =
            [...list.querySelectorAll(".menu-item:not(.dragging)")];


        const afterElement =
            cards.find(function(card) {

                const box =
                    card.getBoundingClientRect();

                return e.clientY <
                    box.top + box.height / 2;

            });


        if (afterElement) {

            list.insertBefore(
                dragging,
                afterElement
            );

        } else {

            list.appendChild(dragging);

        }

    });


    // ==============================
    // ドラッグ終了後にデータを更新
    // ==============================

    list.addEventListener("drop", function(e) {

        e.preventDefault();


        const newOrder = [];


        list.querySelectorAll(".menu-item")
            .forEach(function(card) {

                const index =
                    Number(card.dataset.index);

                newOrder.push(
                    trainingMenus[index]
                );

            });


        trainingMenus = newOrder;


        // もう一度表示して番号を更新
        displayMenus();

    });


    // ==============================
    // 合計時間
    // ==============================

    document.getElementById("totalTime").textContent =
        totalTime;


    // ==============================
    // 残り時間
    // ==============================

    const practiceTime =
        Number(
            document.getElementById("practiceTime").value
        );


    const remainingTime =
        practiceTime - totalTime;


    document.getElementById("remainingTime").textContent =
        remainingTime;

}


// ==============================
// メニューを削除
// ==============================

function deleteMenu(index) {

    trainingMenus.splice(index, 1);

    displayMenus();

}
// 上に移動
function moveUp(index) {

    if (index === 0) {
        return;
    }

    const temp = trainingMenus[index];

    trainingMenus[index] = trainingMenus[index - 1];

    trainingMenus[index - 1] = temp;

    displayMenus();

}


// 下に移動
function moveDown(index) {

    if (index === trainingMenus.length - 1) {
        return;
    }

    const temp = trainingMenus[index];

    trainingMenus[index] = trainingMenus[index + 1];

    trainingMenus[index + 1] = temp;

    displayMenus();

}
// メニューを編集
function editMenu(index) {

    const item = trainingMenus[index];

    const newTime = prompt(
        "時間を入力してください（分）",
        item.time
    );

    if (newTime === null) {
        return;
    }

    const newSets = prompt(
        "セット数を入力してください",
        item.sets
    );

    if (newSets === null) {
        return;
    }

    item.time = Number(newTime);

    item.sets = Number(newSets);

    displayMenus();

}
// ==============================
// 練習メニューをコピー
// ==============================

function copyTrainingMenu() {

    let text = "【今日の練習メニュー】\n\n";


    trainingMenus.forEach(function(item, index) {

        text +=
            (index + 1) + ". " +
            item.menu +
            "\n";

        text +=
            "時間：" +
            item.time +
            "分 × " +
            item.sets +
            "セット\n\n";

    });


    const totalTime =
        trainingMenus.reduce(function(total, item) {

            return total + item.time;

        }, 0);


    const practiceTime =
        Number(
            document.getElementById("practiceTime").value
        );


    const remainingTime =
        practiceTime - totalTime;


    text += "────────────\n";

    text +=
        "合計：" +
        totalTime +
        "分\n";

    text +=
        "残り：" +
        remainingTime +
        "分";


    navigator.clipboard.writeText(text);


    alert("練習メニューをコピーしました！");
}
// ==============================
// メニュー管理画面を開く
// ==============================

function openMenuManager() {

    const manager =
        document.getElementById("menuManager");

    if (manager.style.display === "none") {

        manager.style.display = "block";

    } else {

        manager.style.display = "none";

    }

}


// ==============================
// 新しいメニューを追加
// ==============================

function addNewMenu() {

    const category =
        document.getElementById("managerCategory").value;

    const newMenu =
        document.getElementById("newMenuName").value;


    // カテゴリーが選ばれていない
    if (!category) {

        alert("カテゴリーを選択してください");

        return;

    }


    // メニュー名が空
    if (!newMenu) {

        alert("メニュー名を入力してください");

        return;

    }


    // メニューを追加
    menus[category].push(newMenu);

    // メニューをブラウザに保存
    localStorage.setItem(
    "volleyballMenus",
    JSON.stringify(menus)
);

    // 入力欄を空にする
    document.getElementById("newMenuName").value = "";


    alert(
        "「" +
        newMenu +
        "」を追加しました！"
    );

}
// ==============================
// 登録メニューを表示
// ==============================

function displayManagerMenus() {

    const list =
        document.getElementById("managerMenuList");

    list.innerHTML = "";

    const category =
        document.getElementById("managerCategory").value;

    if (!category) {
        return;
    }

    menus[category].forEach(function(menu, index) {

        const div =
            document.createElement("div");

        div.innerHTML = `
            ${menu}
            <button onclick="deleteRegisteredMenu(${index})">
                🗑️ 削除
            </button>
        `;

        list.appendChild(div);

    });
}


// ==============================
// 登録メニューを削除
// ==============================

function deleteRegisteredMenu(index) {

    const category =
        document.getElementById("managerCategory").value;

    const answer =
        confirm(
            "「" +
            menus[category][index] +
            "」を削除しますか？"
        );

    if (!answer) {
        return;
    }

    menus[category].splice(index, 1);

    // 保存
    localStorage.setItem(
        "volleyballMenus",
        JSON.stringify(menus)
    );

    // 管理画面を更新
    displayManagerMenus();

    // 通常のメニュー選択欄も更新
    menuSelect.innerHTML =
        "<option value=''>メニューを選択してください</option>";

    menus[category].forEach(function(menu) {

        const option =
            document.createElement("option");

        option.value = menu;
        option.textContent = menu;

        menuSelect.appendChild(option);

    });

}
// ==============================
// 登録されているメニューを表示
// ==============================



// ==============================
// 登録されているメニューを削除
// ==============================


document.getElementById("managerCategory")
    .addEventListener("change", function() {

        displayManagerMenus();

    });

    
    // ==============================
// 練習メニューを全部クリア
// ==============================

function clearTrainingMenus() {

    const answer =
        confirm("作成した練習メニューを全部削除しますか？");

    if (!answer) {
        return;
    }

    trainingMenus = [];

    displayMenus();

}
