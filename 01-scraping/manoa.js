const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {

  let pageKeys = ["Abutilon_eremitopetalum","Abutilon_incanum","Abutilon_menziesii","Abutilon_sandwicense","Acacia_koa","Acacia_koaia","Achyranthes_splendens","Achyranthes_splendens_rotundata","Achyranthes_splendens_splendens","Adiantum_capillus-veneris","Alphitonia_ponderosa","Alyxia_stellata","Argemone_glauca","Artemisia_australis","Artemisia_mauiensis","Asplenium_nidus","Astelia_menziesiana","Bacopa_monnieri","Bidens_asymmetrica","Bidens_cosmoides","Bidens_hawaiensis","Bidens_micrantha","Bidens_micrantha_micrantha","Bolboschoenus_maritimus","Bonamia_menziesii","Brighamia_insignis","Brighamia_rockii","Canavalia_pubescens","Capparis_sandwichiana","Carex_alligata","Carex_meyenii","Carex_wahuensis_wahuensis",
  "Cenchrus_agrimonioides","Charpentiera_obovata","Charpentiera_ovata","Charpentiera_ovata_niuensis","Charpentiera_ovata_ovata","Chenopodium_oahuense","Pleomele_aurea","Pleomele_auwahiensis",
  "Pleomele_fernaldii","Pleomele_forbesii","Pleomele_halapepe","Pleomele_hawaiiensis","Cibotium_chamissoi","Cibotium_glaucum","Cibotium_menziesii","Cladium_jamaicense","Clermontia_arborescens","Clermontia_arborescens_waihiae",
  "Cocculus_orbiculatus","Colubrina_asiatica","Colubrina_oppositifolia","Coprosma_ernodeoides","Coprosma_montana","Coprosma_rhynchocarpa","Cordia_subcordata","Cyanea_angustifolia","Cyclosorus_hudsonianus","Cyclosorus_interruptus",
  "Cyperus_javanicus","Cyperus_laevigatus","Cyperus_trachysanthos","Delissea_kauaiensis","Delissea_rhytidosperma","Delissea_waianaeensis","Dianella_sandwicensis","Diospyros_hillebrandii","Diospyros_sandwicensis","Dodonaea_viscosa",
  "Dryopteris_fusco-atra","Eleocharis_erythropoda","Eleocharis_obtusa","Eragrostis_atropioides","Eragrostis_grandis","Eragrostis_paupera","Eragrostis_variabilis","Erythrina_sandwicensis","Eugenia_koolauensis","Eugenia_reinwardtiana",
  "Euphorbia_celastroides","Euphorbia_celastroides_amplectens","Euphorbia_celastroides_celastroides","Euphorbia_celastroides_kaenana","Euphorbia_celastroides_lorifolia","Euphorbia_celastroides_stokesii","Euphorbia_degeneri","Euphorbia_skottsbergii","Euphorbia_skottsbergii_skottsbergii","Fimbristylis_cymosa",
  "Fimbristylis_cymosa_umbellato-capitata","Fimbristylis_dichotoma","Freycinetia_arborea","Gardenia_brighamii","Gossypium_tomentosum","Gouania_vitifolia","Haplostachys_haplostachya","Heliotropium_anomalum_argenteum","Heteropogon_contortus","Hibiscus_arnottianus",
  "Hibiscus_arnottianus_arnottianus","Hibiscus_arnottianus_immaculatus","Hibiscus_arnottianus_punaluuensis","Hibiscus_brackenridgei","Hibiscus_brackenridgei_brackenridgei","Hibiscus_brackenridgei_mokuleianus","Hibiscus_brackenridgei_molokaiana","Hibiscus_clayi","Hibiscus_furcellatus","Hibiscus_kokio",
  "Hibiscus_kokio_kokio","Hibiscus_kokio_saintjohnianus","Hibiscus_waimeae","Hibiscus_waimeae_hannerae","Hibiscus_waimeae_waimeae","Ilex_anomala","Ipomoea_imperati","Ipomoea_pes-caprae_brasiliensis","Ipomoea_tuboides","Jacquemontia_sandwicensis",
  "Kadua_acuminata","Kadua_affinis","Kokia_drynarioides","Lepidium_bidentatum_o-waihiense","Leptecophylla_tameiameiae","Lipochaeta_connata_acris","Melanthera_integrifolia", "Lycium_sandwicense", "Lysimachia_glutinosa", "Lysimachia_mauritiana", 
  "Marsilea_villosa", "Metrosideros_polymorpha", "Metrosideros_tremuloides", "Mezoneuron_kavaiense", "Microlepia_speluncae", "Microlepia_strigosa_strigosa", "Myoporum_sandwicense", "Myoporum_stellatum", "Myrsine_lessertiana", 
  "Nephrolepis_cordifolia", "Nephrolepis_exaltata_hawaiiensis", "Nestegis_sandwicensis", "Nototrichium_divaricatum", "Nototrichium_humile", "Nototrichium_sandwicense", "Ochrosia_compta", "Ochrosia_haleakalae", "Osteomeles_anthyllidifolia", "Pandanus_tectorius", 
  "Peperomia_blanda_floribunda", "Peperomia_sandwicensis", "Peperomia_tetraphylla", "Phytolacca_sandwicensis", "Pipturus_albidus", "Pisonia_sandwicensis", "Pisonia_umbellifera", "Pittosporum_confertiflorum", "Pittosporum_glabrum", "Pittosporum_hosmeri", 
  "Planchonella_sandwicensis", "Plectranthus_parviflorus", "Plumbago_zeylanica", "Polyscias_hawaiensis", "Polyscias_racemosa", "Polyscias_sandwicensis", "Portulaca_lutea", "Portulaca_molokiniensis", "Portulaca_villosa", "Pritchardia_arecina", 
  "Pritchardia_beccariana", "Pritchardia_forbesiana", "Pritchardia_glabrata", "Pritchardia_hardyi", "Pritchardia_hillebrandii", "Pritchardia_lowreyana", "Pritchardia_martii", "Pritchardia_minor", "Pritchardia_munroi", "Pritchardia_remota", 
  "Pritchardia_schattaueri", "Psilotum_complanatum", "Psilotum_nudum", "Psychotria_mariniana", "Psydrax_odorata", "Pteridium_aquilinum_decompositum", "Rauvolfia_sandwicensis", "Rhus_sandwicensis", "Rubus_hawaiensis", "Santalum_ellipticum", 
  "Santalum_freycinetianum", "Santalum_haleakalae_haleakalae", "Santalum_paniculatum_paniculatum", "Santalum_paniculatum_pilgeri", "Santalum_pyrularium", "Sapindus_oahuensis", "Sapindus_saponaria", "Scaevola_chamissoniana", "Scaevola_coriacea", "Scaevola_gaudichaudiana", 
  "Scaevola_gaudichaudii", "Scaevola_sericea", "Schiedea_globosa", "Schiedea_hookeri", "Schiedea_kaalae", "Schiedea_membranacea", "Schoenoplectiella_juncoides", "Schoenoplectus_tabernaemontani", "Selaginella_arbuscula", "Senna_gaudichaudii", "Sesbania_tomentosa", "Sesuvium_portulacastrum", "Sida_fallax", "Sideroxylon_polynesicum", "Sisyrinchium_acre", "Solanum_americanum", "Solanum_nelsonii", "Sophora_chrysophylla", "Sphenomeris_chinensis", "Sporobolus_virginicus",
  "Syzygium_sandwicense", "Tetramolopium_filiforme", "Thespesia_populnea", "Tribulus_cistoides", "Vaccinium_calycinum", "Vigna_marina", "Vigna_o-wahuensis", "Vitex_rotundifolia", "Wikstroemia_monticola", "Wikstroemia_oahuensis", "Wikstroemia_phillyreifolia", "Wikstroemia_uva-ursi", "Wilkesia_gymnoxiphium"];

  for (let i = 0; i < pageKeys.length; i++) {
    const theURL = 'http://nativeplants.hawaii.edu/plant/view/' + pageKeys[i];
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