const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
    // find all tags
    Tag.findAll({
        include: [
            {
                model: Product,
                attributes: ["product_name", "price", "stock"],
            },
        ],
    })
        .then((dbTagData) => {
            res.status(200).json(dbTagData);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
    // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Product,
                attributes: ["product_name", "price", "stock"],
            },
        ],
    })
        .then((dbTagData) => {
            res.status(200).json(dbTagData);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });

    // be sure to include its associated Product data
});

router.post("/", (req, res) => {
    // create a new tag
    Tag.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put("/:id", (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
      .then((dbTagData) => {
        if (!dbTagData[0]) {
          res.status(400).json({ message: "That id doesn't exist" })
          return;

      }
        
            res.status(200).json(dbTagData);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

router.delete("/:id", (req, res) => {

    // delete on tag by its `id` value
    Tag.destroy({ where: { id: req.params.id } })
      .then((dbTagData) => {
        if (!dbTagData) {
          res.status(400).json({ message: "That tag doesn't exist" })
          return;

      }
            res.status(200).json({ message: "deleted" });
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

module.exports = router;
