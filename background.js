chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.download)
    {
        chrome.cookies.get(sender.tab.url,(cookie)=>{
            console.log(cookie);
        })
        chrome.downloads.download({
            url: request.download
        });
        sendResponse({status: "downloading ..."});
    }
    return true;
});