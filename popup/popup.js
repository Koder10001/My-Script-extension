window.onload = async ()=>
{
    await loadScripts();
    showBtn(false);
}
var adult = 0;
var reset;
document.body.onkeyup = (e)=>{
    if(e.which == 192){
        adult++;
    }
    if(adult == 7){
        showBtn(true);
    }
    reset = setTimeout(()=>{adult = 0}, 2000);
}

var files = {};
function showBtn(adult)
{
    let container = document.querySelector(".container");
    container.innerHTML = "";
    for(let script in files){
        if(adult && script.startsWith("[")){
            let btn = document.createElement("button");
            btn.classList.add("btnRunScript");
            btn.innerText = script;
            btn.addEventListener("click",function()
            {
                exe(script);
            })
            container.appendChild(btn);
        }
        else if(!adult && script.startsWith("[") == false){
            let btn = document.createElement("button");
            btn.classList.add("btnRunScript");
            btn.innerText = script;
            btn.addEventListener("click",function()
            {
                exe(script);
            })
            container.appendChild(btn);
        }
    }
}
async function loadScripts()
{
    let url = "https://api.github.com/repos/koder10001/myScript/contents?ref=master";
    let res = JSON.parse(await request(url));
    for ( let file of res )
    {
        files[file.name] = file.download_url;
    }
}
function request(url){
    return new Promise((resolve)=>{
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                resolve(xhr.response);
            }
        }
        xhr.open("GET",url,true);
        xhr.send();
    })
}

async function exe(name)
{
    let js = await request(files[name]);
    chrome.tabs.executeScript({code: js});
}