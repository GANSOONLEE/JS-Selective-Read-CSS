class AutoStyle {
    constructor(name, url, id, start, end, priority){
        this.name = name;
        this.url = url;
        this.id = id;
        this.startDate = new Date(start);
        this.endDate = new Date(end);

        // 使用 XMLHttpRequest 檢查 URL 是否存在
        function checkFile(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            console.log(http.sta)
            return http.status;
        }
        
        // 如果該url不存在文件則終止整個程式
        if (checkFile(url) === 404) {
            throw new Error('位於 ' + url + ' 的文件不存在！');
        }

        // 定義優先級，0最低
        this.priority = priority;
    }
}

// 創建一個工廠函數
class StyleFactory {
    constructor() { }

    // 在工廠函數的原型上定義 createAutoStyle 方法
    createAutoStyle(name, url, id, start, end, priority = 0) {

        // 創建一個 AutoStyle 實例
        var autoStyle = new AutoStyle(name, url, id, start, end, priority);

        // 如果參數不符合，則不會創建實例
        if (autoStyle) {
            // 判斷是否有相同id的自動樣式
            if (!document.querySelector('#' + id)) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = url;
                link.id = id;

                document.head.appendChild(link);
            } else {
                throw new Error("已存在該id的自動樣式！");
            }
        }
    }
}

// 創建一個實例
new StyleFactory().createAutoStyle('name', 'url', 'id', '2023-02-20', '2023-02-25', 1);

// 導出工廠函數
module.exports = StyleFactory;