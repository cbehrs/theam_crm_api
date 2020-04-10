// If this is the first time that the API is being deployed, then a default admin user will be created
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = async function () {
    const users = await User.find(); // Verify existance of any registered user
    if (users.length > 0) return;

    let user = new User({
        name: "Root User",
        email: "root@email.com",
        password: "admin",
        isAdmin: true
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
}