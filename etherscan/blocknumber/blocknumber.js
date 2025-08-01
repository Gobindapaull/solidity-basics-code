require("dotenv").config();

const url = `${process.env.URL}${process.env.API_KEY}`

const main = async () => {
    const data = await fetch(url);
    const res = await data.json();
    console.log(res.result); // 0x15fa1ba (hexadecimal format)
    const number = parseInt(res.result, 16);
    console.log(`Block number : ${number}`); // 23044543 (decimal format)
}

main();
