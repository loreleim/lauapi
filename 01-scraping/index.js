const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {

  let pageKeys = ["aliipoe","aloalo","amau","ape","auhuhu","awa","awapuhi","awikiwiki","hala","hala_pepe","hame","hao","hapuu","hau","hinahina","hoawa","hoi","holei","ieie","iliahi","iliee","ilima","ipu","kalia","kalo","kamani","kauila_A","kauila_C","kaunaoa","kawau","kawelu","ki","ki_nehe","ko","koa","koaia","koali_ai","koali_awa","kohekohe","kokio","kokio_keokeo","kolea","kolokolo_uahiwi","kookoolau","kopiko","kou","kukaenene","kukaepuaa","kukui","kupukupu","laamia","lama","lauae","laukahi_kuahiwi","lehua_papa","loulu","maaloa","maia","maia_polapola","maile","makaloa","mamaki","mamane","manono","mao_A","mao_G","maua","mauu_laili","mehamehame","milo","moa","mokihana","naenae","naio","nanu","naupaka_kahakai","naupaka_kuahiwi","nehe","nioi","niu","noni","nuku_iiwi","ohai","oha_wai","ohe","ohelo","ohe_makai","ohe_ohe","ohia_ai","ohia_ha","ohia_lehua","okaha","olapa","olena","olomea","olona","olopua","opuhe","paihi","painu","pala","palaa","palapalai","pamoho","papala","papala_kepau","pia_D","pia_T","pili","pilo","pohinahina","pohuehue","popolo","popolokumai","pua_kala","pukiawe","uala","uhaloa","uhi","uhiuhi","uki","ukiuki","ulei","ulu","uluhe","wauke","wiliwili"];

  for (let i = 0; i < pageKeys.length; i++) {
    const theURL = 'http://data.bishopmuseum.org/ethnobotanydb/ethnobotany.php?b=d&ID=' + pageKeys[i];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //network idle tells it to wait until all things have loaded on the page
    await page.goto(theURL, {waitUntil: 'networkidle2'});

    const jsonFile = "./ethnobotany.json";

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
    let content = {};

    //loop through titles
    for(i = 0; titleArrays.length > i; i++) {
      var currentTitle = titleArrays[i];
      if (currentTitle === "Hawaiian Name(s)") { currentTitle = "Hawaiian Name"; }
      currentTitle = camelGoesMoo(currentTitle);
      var cleanedDescription = descriptionArrays[i].replace(/: /,'');
      content[currentTitle] = cleanedDescription;
    }

    return content;
    })
  
    //uncomment the line below when you're ready to write something
    //fs.writeFileSync(jsonFile, JSON.stringify(data));

    fs.appendFile(jsonFile, JSON.stringify(data) + "," + "\r\n", function (err) {
      if (err) throw err;
      console.log('Saved ' + pageKeys[i] + " to file!");
    });

    //uncomment the line below when you need to debug
    //console.log(data);
    await browser.close();
  }

  //in your terminal run 'node index.js'

})();