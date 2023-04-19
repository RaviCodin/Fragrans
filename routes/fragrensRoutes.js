const express = require("express");
const { createFragrensInfo } = require("../controlers/fragrensControler");

const router = express.Router();

router.route("/create").post(createFragrensInfo)
// router.route("/update/:id").put(updateTodo)
// router.route("/todo").get(getAlltodos)
// router.route("/delete/:id").delete(deleteTodo)


module.exports = router;
