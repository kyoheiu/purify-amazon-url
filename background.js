const prefix = /^https:\/\//;
const countries = ["www.amazon.co.jp", "www.amazon.com", "www.amazon.fr"];
const dp = "dp";
const itemKey = /^[0-9A-Z]+$/;

browser.contextMenus.create({
  id: "pufiry-amazon-url",
  title: "purify Amazon URL",
  contexts: ["all"],
});

function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function urlShaving(str) {
  var splitUrl = str.replace(prefix, "").split("/");
  var resultArray = [];
  for (var i = 0; i < splitUrl.length; i++) {
    var s = splitUrl[i];
    if (countries.includes(s) || s == dp || itemKey.test(s)) {
      resultArray.push(s);
    } else {
      continue;
    }
  }
  return "https://" + resultArray.join("/");
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "pufiry-amazon-url") {
    let currentUrl = tab.url;
    var flag = false;
    for (var i = 0; i < countries.length; i++) {
      var c = countries[i];
      if (currentUrl.includes(c)) {
        flag = true;
        break;
      } else {
        continue;
      }
    }
    if (!flag) {
      throw Error("This is not Amazon's page.");
    } else {
      let newUrl = urlShaving(currentUrl);
      var updating = browser.tabs.update({ url: newUrl });
      updating.then(onUpdated, onError);
    }
  }
})
