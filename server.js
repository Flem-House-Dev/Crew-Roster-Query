const express = require('express');
const promptMainMenu = require('./lib/promptMainMenu');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

console.log('---------------------');
console.log("You have initialized a Crew Roster Query. ");

promptMainMenu();

app.use((req,res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});