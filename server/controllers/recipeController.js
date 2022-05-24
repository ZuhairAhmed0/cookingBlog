require("../models/database");
const { versions } = require("process");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 *
 * GET /
 * HomePage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );
    const food = { latest, thai, american, chinese };

    res.render("index", { title: "Home", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * GET /categories
 * Categories
 *
 */
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * GET /categories/:id
 * Categories By Id
 *
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    console.log(categoryById);
    res.render("categories", { title: "categories", categoryById });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * GET /categories
 * Categories
 *
 */
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", { title: "recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * GET /explore-latest
 * Explore Latest
 *
 */
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).limit(limitNumber);

    res.render("explore-latest", { title: "explore latest", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * GET /explore-latest
 * Explore Latest
 *
 */
exports.exploreRandom = async (req, res) => {
  try {
    const count = await Recipe.find().countDocuments();
    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random).exec();
    res.render("explore-random", { title: "Explore Random", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * Post /search
 * Search
 *searchTerm
 */
exports.searchRecipe = async (req, res) => {
  try {
    let { searchTerm } = req.body;
    const recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "search", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * Get /submitRecipe
 * Submit Recipe
 *
 */
exports.submitRecipe = async (req, res) => {
  try {
    const infoErrorsObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");

    res.render("submit-recipe", {
      title: "Submit Recipe",
      infoErrorsObj,
      infoSubmitObj,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "error occured" });
  }
};

/**
 *
 * Post /submitRecipe
 * Submit Recipe
 *
 */
exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No file where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
    }
    const newRecipe = await Recipe.create({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });
    req.flash("infoSubmit", "Recipe been has added");
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoErrors", error.message);
    res.redirect("/submit-recipe");
  }
}