const { createCidade } = require("./create");
const { deleteCidade } = require("./deleteById");
const { getAllCidades } = require("./getAall");
const { getByIdBS } = require("./getById");
const { updateByIdBS } = require("./updateById");
const { count } = require("./countCidades");

module.exports = {
    createCidade,
    deleteCidade,
    getAllCidades,
    getByIdBS,
    updateByIdBS,
    count,
};
