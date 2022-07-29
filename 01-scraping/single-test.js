const puppeteer = require('puppeteer');
const fs = require('fs');
const { title } = require('process');


(async () => {

  let pageKeys = ["Abutilon_eremitopetalum"];

  for (let i = 0; i < pageKeys.length; i++) {
    const theURL = 'http://nativeplants.hawaii.edu/plant/view/' + pageKeys[i];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //network idle tells it to wait until all things have loaded on the page
    await page.goto(theURL, {waitUntil: 'networkidle2'});

    const jsonFile = "./single-test.json";

      //.evaluate is like running a console command
  let data = await page.evaluate(()=> {

    //unwrap function
    function unwrap(selector) {
      var nodelist = document.querySelectorAll(selector);
      nodelist.forEach(function(item, i) {
        item.outerHTML = item.innerHTML;
      })
    }

    //remove italics
    unwrap('li');
    unwrap('ul');

    //remove all p tags
    var emptyTags = document.getElementsByClassName("plantcontent");
    for(i = 0; emptyTags.length > i; i++) {
      if(emptyTags[i].textContent.trim() === '') {
        emptyTags[i].remove();
      }
    }

    let content = {};

    //titles
    let allTitles = [...document.getElementsByClassName("subheading")];
    let titleArrays =  allTitles.map((div) => div.textContent.trim());

    //descriptions
    let allContent = [...document.getElementsByClassName("plantcontent")];
    let contentArrays =  allContent.map((div) => div.textContent.trim());


    //loop through titles
    /*for(i = 0; titleArrays.length > i; i++) {
      var currentTitle = titleArrays[i];
      if (currentTitle === "Hawaiian Name(s)") { currentTitle = "Hawaiian Name"; }
      currentTitle = camelGoesMoo(currentTitle);
      var cleanedDescription = descriptionArrays[i].replace(/: /,'');
      content[currentTitle] = cleanedDescription;
    }*/

    return contentArrays;
    })
  
    //uncomment the line below when you're ready to write something
    //fs.writeFileSync(jsonFile, JSON.stringify(data));

    console.log(data);

    //uncomment the line below when you need to debug
    //console.log(data);
    await browser.close();
  }

  //in your terminal run 'node index.js'

})();