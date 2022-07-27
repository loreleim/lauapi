const puppeteer = require('puppeteer');
const fs = require('fs');
const { title } = require('process');

(async () => {

  const jsonFile = "./ethnobotany.json";
  const theURL = 'http://data.bishopmuseum.org/ethnobotanydb/ethnobotany.php?b=d&ID=aalii';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  //network idle tells it to wait until all things have loaded on the page
  await page.goto(theURL, {waitUntil: 'networkidle2'});
  
  //.evaluate is like running a console command
  let data = await page.evaluate(()=> {

    //remove all br tags
    var brTags = document.getElementsByTagName('br');
    while (brTags.length) {
      brTags[0].parentNode.removeChild(brTags[0]);
    }

    //unwrap function
    function unwrap(selector) {
      var nodelist = document.querySelectorAll(selector);
      nodelist.forEach(function(item, i) {
        item.outerHTML = item.innerHTML;
      })
    }

    //remove italics
    unwrap('i');

    //camelCase function 
    var camelGoesMoo = function camalize(str) {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    //titles
    let allTitles = [...document.querySelectorAll('b')];
    let titleArrays =  allTitles.map((div) => div.textContent.trim());
    let descriptionArrays =  allTitles.map((div) => div.nextSibling.textContent.trim());
    let content = [];

    //loop through titles
    for(i = 0; titleArrays.length > i; i++) {
      var currentTitle = titleArrays[i];
      currentTitle = camelGoesMoo(currentTitle);
      var cleanedDescription = descriptionArrays[i].replace(/: /,'');
      content.push({ [currentTitle] : cleanedDescription});
    }

    return content;
  })
  
  //uncomment the line below when you're ready to write something
  fs.writeFileSync(jsonFile, JSON.stringify(data));
  
  //uncomment the line below when you need to debug
  //console.log(data);
  await browser.close();

  //in your terminal run 'node index.js'

})();