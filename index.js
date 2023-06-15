const express = require("express")
const cherrio = require("cheerio")
const axios = require("axios")
const app = express()

app.listen("8000", ()=>{
    console.log("App Listenin To Port 8000")
})

app.get("/", (req, res)=>{
    res.json("Welcome To Current Affairs API")   
})

app.get("/news", (req, res)=>{
    axios.get("https://byjusexamprep.com/daily-gk-update-15th-June-2023-i")
    .then((response) =>{
        const html = response.data
        // console.log(html)
        const $ = cherrio.load(html)
        $('h3', html).each(function(){
            const title = $(this).text()
            console.log(title)
        })
        $('.content-container').each(function(){
            const desc = $(this).text()
            console.log(desc)
        })
    })
})


var todayques = []

app.get("/today-quiz", (req, res)=>{
    axios.get("https://byjusexamprep.com/current-affairs")
    .then((response)=>{
        const html = response.data
        const $ = cherrio.load(html)
        $("li", "ol").each(function(){
            const text = $(this).text()
            todayques.push({
                question: text
            })
            // console.log(text)
        })
        res.json(todayques)
    })
})