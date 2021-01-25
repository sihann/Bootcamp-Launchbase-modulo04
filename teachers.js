const fs = require('fs')
const data = require("./data.json")
const { age } = require('./utils')

// show
exports.show = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id

    })
    if (!foundTeacher) return res.send("Teacher nof found!")

    
     const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: "",
        classroom: "",
        subject: foundTeacher.subject.split(","),
        created_at: new Intl.DateTimeFormat("pt-Br").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", {teacher})
} 

// create
exports.post = function(req, res){
    
    // validação do campos do formulário
    const keys = Object.keys(req.body)
    for(key of keys) {
        if(req.body[key] == "") { 
            return res.send('Preencha todos os campos')
        }
    }
    
    //organizando os dados
    let { avatar_url, name, birth, level, classroom, subject} = req.body

    //tratamento de dados
    //transformar data de nascimento em ms
    birth = Date.parse(birth)
    //data de criaćão de dado "Desde"
    const created_at = Date.now()
    //criaćão de id
    const id = Number(data.teachers.length + 1)

    //adicionando dados dentro do array no data.json
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        level,
        classroom,
        subject,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("erro na leitura do arquivo")
        
        return res.redirect("/teachers")    
    })

}

// edit
exports.edit = function(req, res){
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id

    })
    if (!foundTeacher) return res.send("Teacher nof found!")

    return res.render('teachers/edit', {teacher: foundTeacher})
}


// delete