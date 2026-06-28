import express from "express"

const app = express()
const port = 3000
app.use(express.json())

let teaData = []
let teaId = 1

// Add the tea
app.post("/teas" , (req , res)=>{
    const {name , price} = req.body
    const newTea = {id : teaId++ , name ,price}
    teaData.push(newTea)
    return res.status(201).send(newTea)
})

// Get all teas
app.get("/teas" , (req ,res)=>{
    return res.status(200).send(teaData)
})

//Get tea by id
app.get("/tea/:id" , (req ,res)=>{
    const tea = teaData.find((t)=> t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Tea not found")
    }

    return res.status(200).send(tea)
})

//Update tea
app.put("/tea/:id" , (req , res) =>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea){
        return res.status(404).send("Tea not found")
    }

    const {name , price} = req.body

    tea.name = name
    tea.price = price

    return res.status(200).send("updated")
})

//Delete the tea
app.delete("/tea/:id" , (req , res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    if (index === -1){
        return res.status(404).send("Tea not found")
    }

    teaData.splice(index , 1)

    return res.status(204).send("Deleted")


})
app.listen(port , () =>{
    console.log(`Server is running on port :${port}`);
})

