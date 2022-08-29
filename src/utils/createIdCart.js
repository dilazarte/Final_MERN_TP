const { createCart } = require("../services/cartServices");

async function cartID() {
    const data = await createCart()
    return data._id;
}

module.exports = {cartID}