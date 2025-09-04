
const readline = require("readline");
const cheerio = require('cheerio');
const axios = require('axios');
const { styleText } = require('node:util');
const PORT = 5000;


// const server = http.createServer((req, res) =>{
//     res.writeHead(200, {'Content-Type':'text/plain'});

//     if (req.method === 'GET' && req.url === 'http://localhost:5000/') {

//     }
//     res.end("Hello! World");
// });


// server.listen(PORT, ()=>{
//     // console.log(`server running at http://localhost:${PORT}`);
// })

// Create an interface for input and output

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];

rl.question('Enter a URL:',(firstline)=>{
    rl.question('Enter the CSS Selector:',(secondline)=>{
        lines.push(firstline);
        lines.push(secondline);
        console.log(`u entered URL:${firstline} and CSS Selector:${secondline}`);
        // console.log(lines);
        const URL = lines[0];
        const Selector = lines[1];
        Scrape(URL, Selector);
        rl.close();
    })
});


// axios.get("https://www.geeksforgeeks.org/node-js/rest-api-introduction/",{
//     headers: {
//         "Accept":"text/html"
//     }
// })
// .then((res) =>{
//     html =res.data;
//     const $ = cheerio.load(html);
//     console.log($('h1').text());
// }).catch((err) =>{
//     console.log(err);
// })


async function Scrape(URL, Selector) {
    try {
        const res = await axios.get(`${URL}`,{
            headers: {
                "Accept":"text/html"
    }})
    const $ = cheerio.load(res.data);
    
    // console.log(Array.isArray(text));
    $(`${Selector}`).each((index, value) =>{
        const text = $(value).text().replace(/\s\s+/g, ""); //.replace method to get rid of all the whitespaces
        console.log(styleText(['red','bold'],`${index}. Text: ${text}`));
    })

    } catch(err) {
        console.log("Error:",err);
    }
   
}













