const prefix = /^https:\/\//;
const countries = /^www\.amazon\.[a-z\.]+$/;
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
    if (countries.test(s) || itemKey.test(s) || s == dp) {
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
    if ((/www\.amazon\.[a-z]+/).test(currentUrl)) {
      let newUrl = urlShaving(currentUrl);
      var updating = browser.tabs.update({ url: newUrl });
      updating.then(onUpdated, onError);
    } else {
      throw Error("This is not Amazon's page.");
    }
  }
})
