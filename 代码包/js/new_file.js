<script type="text/javascript">
        
    //启用双击监听
        mui.init({
            gestureConfig:{
                doubletap:true
            },
            subpages:[{
                url:'view/templates/home/home.html',
                id:'MainViwe',
                styles:{
                    top: '0',
                    bottom: '51px'
                }
            }]
        });
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

//底部选项卡切换跳转
(function jumpPage(){
        //跳转页面
        var subpages = ['index.html','123.html', '456.html', '789.html'];
        var subpage_style = {
            top: '44px',
            bottom: '51px'
        };
        var aniShow = {};//动画显示
        //首次启动切滑效果
             //当前激活选项
            var activeTab = subpages[0];         
             //选项卡点击事件
            mui('.mui-bar-tab').on('tap', 'a', function(e) {
                var targetTab = this.getAttribute('href');
                $('#MainViwe').attr('src',targetTab);
            });
             //自定义事件，模拟点击“首页选项卡”
            document.addEventListener('gohome', function() {
                var defaultTab = document.getElementById("defaultTab");
                //模拟首页点击
                mui.trigger(defaultTab, 'tap');
                //切换选项卡高亮
                var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
                if (defaultTab !== current) {
                    current.classList.remove('mui-active');
                    defaultTab.classList.add('mui-active');
                }

    });
   

        })()

    </script>
    const timerDisplay = document.querySelector(".timer-display");
const toggleButton = document.querySelector(".toggle-timer");
const resetButton = document.querySelector(".reset-timer");

const maxTime = 35999;

let runningTimer;
let timerStatus = false;

function displayTime(decSeconds) {
  const minutes = Math.floor(decSeconds / 600);
  const restDecSecs = decSeconds % 600;
  const seconds = Math.floor(restDecSecs / 10);
  const deciSeconds = restDecSecs % 10;

  const displayMins = `${minutes < 10 ? "0" : ""}${minutes}`;
  const displaySecs = `${seconds < 10 ? "0" : ""}${seconds}`;
  const displayDecSecs = `${deciSeconds}`;

  const display = `${displayMins}:${displaySecs}.${displayDecSecs}`;

  timerDisplay.textContent = display;

  displayBinary("mt", Math.floor(minutes / 10));
  displayBinary("mo", minutes % 10);
  displayBinary("st", Math.floor(seconds / 10));
  displayBinary("so", seconds % 10);
  displayBinary("d", deciSeconds);
}

function runTimer() {
  clearInterval(runningTimer);
  let timer = 0;

  // start interval
  runningTimer = setInterval(() => {
    const runTimer = timer++;

    // if time is up (reached max of 59min59sec) stop timer
    if (runTimer > maxTime) {
      clearInterval(runningTimer);
      return;
    }

    // display timer
    displayTime(timer);
  }, 100);
}

function displayBinary(type, digit) {
  for (let i = 8; i >= 1; i = i / 2) {
    let binary = Math.floor(digit / i);

    binary
      ? document.getElementById(`${type}${i}`).classList.add("active")
      : document.getElementById(`${type}${i}`).classList.remove("active");

    digit = digit % i;
  }
}

function toggleTimer() {
  // stops timer
  if (timerStatus) {
    toggleButton.textContent = "Start";
    toggleButton.setAttribute("disabled", true);

    // stop running timer
    clearInterval(runningTimer);

    // starts timer
  } else if (!timerStatus) {
    runTimer();
    toggleButton.textContent = "Stop";
  }

  timerStatus = !timerStatus;
}

function resetTimer() {
  toggleButton.textContent = "Start";
  toggleButton.removeAttribute("disabled");
  timerStatus = false;
  displayTime(0);
  clearInterval(runningTimer);
}

toggleButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);