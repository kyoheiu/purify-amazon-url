browser.contextMenus.create({
  id: "url-shaving",
  title: "url shaving",
  contexts: ["all"],
});

function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function urlShaving(str) {
  var removed = str.replace(/^https:\/\//, "");
  var splitUrl = removed.split("/");
  var resultArray = [];
  for (var i = 0; i < splitUrl.length; i++) {
    var s = splitUrl[i];
    if (s == "www.amazon.co.jp"
        || s == "www.amazon.com" 
        || s == "dp" 
        || /^[0-9A-Z]+$/.test(s)) {
      resultArray.push(s);
    } else {
      continue;
    }
  }
  return "https://" + resultArray.join("/");
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "url-shaving":
      let trueUrl = "https://developer.mozilla.org";
      let currentUrl = tab.url;
      let newUrl = urlShaving(currentUrl);
      console.log(newUrl);
      var updating = browser.tabs.update({ url: newUrl });
      updating.then(onUpdated, onError);
      break;
  }
});
