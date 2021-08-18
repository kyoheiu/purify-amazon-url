browser.contextMenus.create({
    id: "url-shaving",
    title: "url shaving",
    contexts: ["all"]
})

function onUpdated(tab) {
    console.log(`Updated tab: ${tab.id}`);
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  

browser.contextMenus.onClicked.addListener((info,tab) => {
    switch (info.menuItemId) {
        case "url-shaving":
            var updating = browser.tabs.update({url: "https://developer.mozilla.org"});
            updating.then(onUpdated, onError);
            break;
    }
})