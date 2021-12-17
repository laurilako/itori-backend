const registerUser = async (req, res) => {
    const { name, password } = req.body;

    res.json({
        name
    })
}

module.exports = { registerUser }