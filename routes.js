const express = require('express')
const routes = express.Router()



routes.get("/", function(req, res) {
    return res.render("teachers")
})

routes.get("/students/:id", function(req, res){
    const id = req.params.id;
    const course = courses.find(function(course) {
        if(course.id==id) {return true}
    })
        return res.render("course", { course }) //chave course
    
})

routes.use(function(req, res) {
    res.status(404).render("not-found");
  });

  module.exports = routes