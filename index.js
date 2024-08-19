const express = require('express')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

let user_list = [
    {   id:1,
        name:"nidh",
        age:19,
        gender:"female",
        uni:"PSGCT"
    }
];
let curr_id=2;

app.get("/user",(req,res)=>{
    res.json(user_list);
})

app.get("/user/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const user=user_list.find((user)=> id==user.id);
    res.json(user);
})

app.post("/user",(req,res)=>{
    const {name, age, gender, uni} =  req.body;
    if(name && age && gender && uni){
        let new_user={
            id:curr_id++,
            name:name,
            age:age,
            gender:gender,
            uni:uni
        }
        user_list.push(new_user);
        console.log(user_list);
        res.json({msg:`done adding {name}`})
    }
    else{
        res.status(400).json({error:"missing fields"});
    }
})

app.put("/user/:id",(req,res)=>{
    const id=req.params.id;
    const new_age = req.body.age;

    const user_ind = user_list.findIndex((new_user) => id==new_user.id);
    //console.log(user_list[user_ind].age)
    
    user_list[user_ind].age=new_age;
    console.log(user_list);
    
    res.json({msg:"done changing age"});
})

app.delete("/user/:id", (req,res)=>{
    const id=req.params.id;
    const user_ind=user_list.findIndex((new_user)=> new_user.id==id);
    user_list.splice(user_ind,1);

    console.log(user_list);
    res.json({msg:"done deleting"});

})

app.listen(3000,()=>{
    console.log("listening");
})