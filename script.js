const button = document.getElementById('button');
const input = document.getElementById("input").value;
const buttonClear = document.getElementById('buttonClear');

button.onclick = function() {
  if (input.value === "") {
    alert("Hello, Enter the word to find the Thesaurus!");
  } else {
    dataFetch();
  }
}

function dataFetch() {
  const input = document.getElementById("input").value;
  const xhr = new XMLHttpRequest();
  const xhrSynonyms = new XMLHttpRequest();
  const url1 = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${(input)}?key=32368642-f722-47f8-a2d0-685e8f4fff8b`;
  const url2 = `https://api.dictionaryapi.dev/api/v2/entries/en/${(input)}`;

  const meaning = document.getElementById("meaning");
  const synonyms = document.getElementById("synonyms");
  const antonyms = document.getElementById("antonyms");

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.response);
      console.log(response);
      meaning.innerHTML = "<b>MEANING</b>  <br> As a " + response[0].fl + " word, " + response[0].meta.id + " is " + response[0].shortdef;
    }

    xhrSynonyms.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const Response1 = JSON.parse(this.response);
        console.log(Response1);
        synonyms.innerHTML = "<b>SYNONYMS</b> <br> " + Response1[0].meanings[0].synonyms;
        antonyms.innerHTML = "<b>ANTONYMS</b> <br> " + Response1[0].meanings[0].antonyms;
      }
    };
    xhrSynonyms.open("GET", url2);
    xhrSynonyms.send();
  }

  xhr.open('GET', url1);
  xhr.send();
}