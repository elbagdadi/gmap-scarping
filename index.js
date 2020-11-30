const newGetPlaces = require('./newGetPlaces');

async function main() {
    try {
         await newGetPlaces("https://www.google.com/maps/search/location+voiture/@33.5490803,-7.6437505,13z/data=!3m1!4b1");
        
        
    } catch(e) {
        console.log(e);
    }

}

main();