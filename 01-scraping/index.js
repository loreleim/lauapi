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
    let allTitles = document.querySelector("b");
    for(i = 0; allTitles.length > i; i++) {
      
    }
    let image = document.querySelector('img').src;
    let chicken = document.querySelector('title').innerText;
    
    return {
      image, 
      chicken
    }
  })
  
  //console.log(await page.content());
  //console.log(data.image)
  
  fs.writeFileSync(jsonFile, JSON.stringify(data));
  
  await browser.close();

  //run 'node index.js'

})();