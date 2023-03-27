a = null;
fetch("https://ddragon.leagueoflegends.com/cdn/9.13.1/data/en_US/champion.json").then (b => a = b);
console.log("A:")
console.log(a);


let fetchedData;

fetch('https://ddragon.leagueoflegends.com/cdn/9.13.1/data/en_US/champion.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    fetchedData = data;
    console.log(fetchedData);
    // You can use the fetched data here or pass it to another function
    processData(fetchedData);
  })
  .catch(function(error) {
    console.error(error);
  });

function processData(data) {

    a = data;
}

console.log(a);