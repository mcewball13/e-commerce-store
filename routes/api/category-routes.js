const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
    Category.findAll({
        attributes: ["id", "category_name"],
        include: [
            {
                model: Product,
                attributes: ["product_name"],
            },
        ],
    });
    // find all categories
    // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "category_name"],
        include: [
            {
                model: Product,
                attributes: ["product_name"],
            },
        ],
    });
    // find one category by its `id` value
    // be sure to include its associated Products
});

router.post("/", (req, res) => {
    Category.create({
        category_name: req.body.category_name,
    })
        .then((dbCatData) => {
            res.json(dbCatData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    // create a new category
});

router.put("/:id", (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((dbCatData) => {
            if (!dbCatData) {
                res.status(404).json({ message: "No User found with that ID" });
            }
            res.json(dbCatData);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;
