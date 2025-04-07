const express = require('express');
const PORT = 3000;
const app = express()

app.use(express.json()) // Applying middleware 

let employees= [
    {
        id: '1',
        firstName: 'Nalin',
        lastName:'Patel',
        position: 'Software developer',
        email: 'nalin45@gmail.com'
    }    
]
app.get('/employees', (req, res)=>{
   res.status(200).send({
    id: '1',
    firstName:"Vedaant",
    lastName: "Patel",
    position: "Freshy",
    email: "vpatel45@gmail.com"
   });
});
// POST Request
app.post('/employees/:id', (req, res)=>{
    const newEmp= {
        id: String(employees.length+1),
        ...req.body
    }
    employees.push(newEmp);
    res.status(201).json({message: 'New Employee Add', employees: newEmp})
})
// PUT Request
app.put('emoloyee/:id', (req, res)=>{
    const index= employees.findIndex(e=> e.id ===req.params.id) 
    if (index=== -1)
        return res.status(404).send({message: 'PAGE NOT FOUNd'})
    employees[index] = {id: res.params.id, ...req.body}
    res.status(202).json({message:'Employee Replaced', employees: employees[index]})
})
//  PATCH Update
app.patch('/employees/:id', (req,res)=>{
    const emp= employees.find(e=> e.id === req.params.id)
    if (!emp)
        return res.status(404).send({message:'NOT FOUND'})
    
    Object.assign(emp, res.body)
    res.status(203).json({message: 'Emplyee Updated', employees: emp})

})

//DELETE Request
app.delete('employees/:id', (req, res)=>{
    const index= employees.findIndex(e=> e.id === req.params.id)
    if (index=== -1)
        return res.status(404).send({message: 'PAGE NOT FOUND'})
    const deleted = employees.splice(index, 1)
    res.status(203).json({message: 'Employee deleted', employees: deleted[0] })
})

//HEAD employee
app.head('/employees/:id', (req, res)=>{
    const emp= employees.find(e=> e.id === req.params.id)
    if (!emp)
        return res.sendStatus(404)
    res.set('X-Employee-Exist', 'true')
    res.status(200).end()
})

//OPTION employee
app.options('/employees/:id', (req,res)=>{
    
})
app.listen(
    PORT,
    ()=> console.log(`Live on http://localhost:${PORT}`) // callback function
)