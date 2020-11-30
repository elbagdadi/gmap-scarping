const getReviews = require('./getReviews');

async function main() {
    try {
        const data = await getReviews("https://www.google.com/maps/place/Crystal+Cars+Casablanca/@33.5294435,-7.6429975,17z/data=!3m1!4b1!4m10!1m2!2m1!1slocation+voiture!3m6!1s0xda62cff628ba905:0x76dee186e0dc428c!8m2!3d33.5294435!4d-7.6408088!9m1!1b1");
        console.log(JSON.stringify(data.reviewAuthorNames[0]));
        console.log(JSON.stringify(data.dates[0]));
        console.log(JSON.stringify(data.ratings[0]));
        console.log(JSON.stringify(data.reviewsContent[0]));
    } catch(e) {
        console.log(e);
    }

}

main();