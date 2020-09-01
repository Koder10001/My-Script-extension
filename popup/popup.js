window.onload = async ()=>
{
    await loadScripts();
}
async function loadScripts()
{
    console.log(("a"));
    let url = "https://api.github.com/repos/koder10001/myScript/contents?ref=master";
    let json = JSON.parse(await request(url));
    console.log(json);
}
function request(url){
    return new Promise((resolve)=>{
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                console.log(xhr.response);
                resolve(xhr.response);
            }
        }
        xhr.open("GET",url,true);
        xhr.send();
    })
}