
var RegionName = document.querySelector('#RegionName');
var RegionTime = document.querySelector('#RegionTime');

// 獲取路徑爲 Region.json 的文件
async function getData(){
    const response = await fetch('Region.json');
    const json = await response.json();
    return json;
}

// 讀取 Region.json 的内容並填入 <option>
async function setRegion(){
    const region = await getData();
    const regions = Object.entries(region.Region);
    regions.forEach( (region) => {
        const select = document.querySelector('#Region');
        const optionElement = document.createElement('option');
        select.append(optionElement);
        optionElement.innerHTML = region[0];
        optionElement.value = region[1];
    });
    
}

// 根據選擇的内容，輸出地區和時間給使用者確認
const select = document.querySelector('#Region');
select.addEventListener('change', ()=>{
    const selectedOption = select.selectedOptions[0];
    var Name = selectedOption.innerHTML;
    var Time = selectedOption.getAttribute('value');;
    RegionName.innerHTML = Name;
    RegionTime.innerHTML = Time;
})

getData()
setRegion()

class StyleFileSetting{
    constructor(dateBegin, dateEnd) {
      this.dateBegin = new Date(dateBegin);
      this.dateEnd = new Date(dateEnd);
    }
  
    checkTime(href, id) {
    const currentTime = new Date();
      if (currentTime >= this.dateBegin && currentTime <= this.dateEnd) {
        if(!document.querySelector('#'+id)){
            // 创建 link 元素
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.id = id;

            // 将 link 元素添加到 head 部分
            document.head.appendChild(link);
        }
      } else {
        var autoCSS = document.querySelector('#'+{id});
        document.head.removeChild(autoCSS);
      }
    }
  
    startChecking(href, id, interval = 5 * 1000) {
      setInterval(() => {
        this.checkTime(href, id);
      }, interval);
    }
  }
  
const myTimeChecker = new StyleFileSetting("2023-02-20", "2023-02-25");
myTimeChecker.startChecking(href="style.css",id="hello");