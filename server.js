const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const pokemon = require("./models/pokemon.js");

// middleware
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

// get

app.get("/", (req, res)=> {
    res.redirect("/pokemon")
})

app.get("/pokemon", (req, res) => {
    res.render("index.ejs", { pokemon: pokemon });
});

app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/pokemon/:id", (req, res) => {
    const indexOfPokemonToDelete = req.params.id;
    const singlePokemon = pokemon[req.params.id];
    res.render("show.ejs", {
        pokemon: singlePokemon,
        indexOfPokemonToDelete: indexOfPokemonToDelete
    });
});

app.post("/pokemon", (req, res) => {
    const pokemonToAdd = {
        name: req.body.name,
        img: req.body.img
    };

    pokemon.push(pokemonToAdd);

    res.redirect("/pokemon");
});

app.delete("/pokemon/:id", (req, res) => {
    const indexOfPokemonToDelete = req.params.id;
    pokemon.splice(indexOfPokemonToDelete, 1);

    res.redirect("/pokemon");
});

app.get("/pokemon/:id/edit", (req, res) => {
    const pokemonToEdit = req.params.id;
    res.render("edit.ejs", {
        singlePokemon: pokemon,
        pokemonToEdit: pokemonToEdit
    });
});

app.put("/pokemon/:id", (req, res) => {
    const updatedPokemon = {
        name: req.body.name,
        img: req.body.img
    };

    pokemon[req.params.id] = updatedPokemon;

    res.redirect("/pokemon");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});