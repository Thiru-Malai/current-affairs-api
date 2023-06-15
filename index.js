const express = require("express");
const cherrio = require("cheerio");
const axios = require("axios");
const app = express();

app.listen("8000", () => {
  console.log("App Listenin To Port 8000");
});

app.get("/", (req, res) => {
  res.json("Welcome To Current Affairs API");
});

function isNumber(c) {
  switch (c) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return true;
  }
  return false;
}

app.get("/today", (req, res) => {
  var today = new Date();
  var month = today.toLocaleString("default", { month: "long" });
  var year = today.getFullYear();
  let day = today.getDate();

  let dayString = day.toString()

  if ((dayString).length == 1) {
    dayString = "0" + dayString;
  }

  axios
    .get(
      "https://www.bankersadda.com/daily-current-affairs-and-news-headlines-of-" +
        day +
        "th-" +
        month +
        "-" +
        year +
        "/"
    )
    .then((response) => {
      const html = response.data;
      const $ = cherrio.load(html);
      let titles = [];
      let description = [];
      let currentaffairs = [];
      $(".entry-content p strong", html).each(function () {
        const title = $(this).text();
        if (isNumber(title.charAt(0)) && title.includes(".")) {
          titles.push(title);
        }
      });

      $(".entry-content ul", html).each(function () {
        const desc = $(this).text();
        if (!desc.startsWith("Top 15") && !desc.startsWith("Check More")) {
          description.push(desc);
        }
      });

      for (let i = 0; i < titles.length; i++) {
        currentaffairs.push({
          title: titles[i],
          description: description[i],
        });
      }

      res.json(currentaffairs);
    
    });
});

// app.get("/today", (req, res) => {

//   axios
//     .get(
//       "https://www.bankersadda.com/daily-current-affairs-and-news-headlines-of-15th-june-2023/"
//     )
//     .then((response) => {
//       const html = response.data;
//       const $ = cherrio.load(html);

//       let titles = [];
//       let description = [];
//       let currentaffairs = [];
      
//       $(".entry-content p strong", html).each(function () {
//         const title = $(this).text();
//         if (isNumber(title.charAt(0)) && title.includes(".")) {
//           titles.push(title);
//         }
//       });
      
//       $(".entry-content ul", html).each(function () {
//         const desc = $(this).text();
//         if (!desc.startsWith("Top 15") && !desc.startsWith("Check More")) {
//           description.push(desc);
//         }
//       });
//       for (let i = 0; i < titles.length; i++) {
//         currentaffairs.push({
//           title: titles[i],
//           description: description[i],
//         });
//       }
//       res.json(currentaffairs);
//     });
// });

app.get("/today-quiz", (req, res) => {
  let todayques = [];
  let i = 1;
  axios.get("https://byjusexamprep.com/current-affairs").then((response) => {
    const html = response.data;
    const $ = cherrio.load(html);
    $("li", "ol").each(function () {
      const text = $(this).text();
      // let number = "question " + i
      todayques.push({
        question: text,
      });
    });
    res.json(todayques);
  });
});

