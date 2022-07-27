const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

  const jsonFile = "./ethnobotany.json";
  const theURL = 'http://data.bishopmuseum.org/ethnobotanydb/ethnobotany.php?b=d&ID=aalii';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  //network idle tells it to wait until all things have loaded on the page
  await page.goto(theURL, {waitUntil: 'networkidle2'});
  
  //.evaluate is like running a console command
  let data = await page.evaluate(()=> {

    //remove italics
    let grabItalics = [...document.querySelectorAll('i')];

    //titles
    let allTitles = [...document.querySelectorAll('b')];
    let titleArrays =  allTitles.map((div) => div.textContent.trim());
    let descriptionArrays =  allTitles.map((div) => div.nextSibling.textContent.trim());
    let content = [];

    //loop through titles
    for(i = 0; titleArrays.length > i; i++) {
      if(titleArrays[i] === "Medicines") {
        content.push(descriptionArrays[i]);
      }
    }

    return content;

    //pull image
    let image = document.querySelector('img').src;
    let chicken = document.querySelector('title').innerText;
  })
  
  //uncomment the line below when you're ready to write something
  //fs.writeFileSync(jsonFile, JSON.stringify(data));
  
  console.log(data);
  await browser.close();

  //run 'node index.js'

})();