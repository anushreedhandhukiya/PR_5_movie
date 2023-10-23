const middleware = (req, res, next) => {
    const { title, description, releaseDate, category, actors, image, ratings, comments, addedBy } = req.body;
    if (title && description && releaseDate && category && actors && image && ratings && comments && addedBy) {
        next();
    }
    else {
        res.status(400).send("All fields are required.");
    }
};
module.exports = middleware;