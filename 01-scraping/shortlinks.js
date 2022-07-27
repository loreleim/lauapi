const fs = require('fs');

const jsonFile = "./shortlinks.json";

var list = "aliipoe, aloalo, amau, ape, auhuhu, awa, awapuhi, awikiwiki, hala, hala_pepe, hame, hao, hapuu, hau, hinahina, hoawa, hoi, holei, ieie, iliahi, iliee, ilima, ipu, kalia, kalo, kamani, kauila_A, kauila_C, kaunaoa, kawau, kawelu, ki, ki_nehe, ko, koa, koaia, koali_ai, koali_awa, kohekohe, kokio, kokio_keokeo, kolea, kolokolo_uahiwi, kookoolau, kopiko, kou, kukaenene, kukaepuaa, kukui, kupukupu, laamia, lama, lauae, laukahi_kuahiwi, lehua_papa, loulu, maaloa, maia, maia_polapola, maile, makaloa, mamaki, mamane, manono, mao_A, mao_G, maua, mauu_laili, mehamehame, milo, moa, mokihana, naenae, naio, nanu, naupaka_kahakai, naupaka_kuahiwi, nehe, nioi, niu, noni, nuku_iiwi, ohai, oha_wai, ohe, ohelo, ohe_makai, ohe_ohe, ohia_ai, ohia_ha, ohia_lehua, okaha, olapa, olena, olomea, olona, olopua, opuhe, paihi, painu, pala, palaa, palapalai, pamoho, papala, papala_kepau, pia_D, pia_T, pili, pilo, pohinahina, pohuehue, popolo, popolokumai, pua_kala, pukiawe, uala, uhaloa, uhi, uhiuhi, uki, ukiuki, ulei, ulu, uluhe, wauke, wiliwili";
cleanedList = list.replace(/\s/g, '');
const arr = cleanedList.split(',');

fs.appendFile(jsonFile, JSON.stringify(arr), function (err) {
  if (err) throw err;
  console.log('Saved to File!');
});