module.exports = function(router) {
    
    // Route to render the home page
    router.get("/", function(req, res){
        res.render("home");
    });

    router.get("/saved", function(req, res){
        res.render("saved");
    });
}