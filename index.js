// import files
const list = require('./data/lists')
let taskList, sorting;

// connecting mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongoose connected");
});

// npm requires
const express = require('express');
const app = express();
const ejs = require('ejs')
const methodOverride = require('method-override')

// middleware
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

// app methods
app.listen(3000, (req, res) => {
    console.log("listning on port 3000");
})

app.patch('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, priority, deadline, checked } = req.body;
        console.log(req.body);
        if (task) { await list.findByIdAndUpdate(id, { task: task }) }
        if (priority) { await list.findByIdAndUpdate(id, { priority: priority }) }
        if (deadline) { await list.findByIdAndUpdate(id, { deadline: deadline }) }
        if (checked) {
            if (checked == 'on') {
                await list.findByIdAndUpdate(id, { checked: true });
            }
            else {
                await list.findByIdAndUpdate(id, { checked: false });
            }
        }
        res.redirect('/');
    } catch (e) {
        res.send("Something went wrong");
    }

})

app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await list.findByIdAndDelete(id);
        res.redirect('/')
    } catch (e) {
        res.send("Something went wrong");
    }
})

app.post("/new", async (req, res) => {
    try {
        const { newtask, newpriority, newdeadline } = req.body;
        const item = new list({ task: newtask, priority: newpriority, deadline: newdeadline, dateCreated: new Date() });
        await item.save();
        res.redirect("/");
    } catch (e) {
        res.send("Something went wrong");
    }
})

app.get("/test", async (req, res) => {
    // let date = new Date();
    // try{
    //     await list.updateMany({},{dateCreated: date});
    // }
    // catch(e){
    //     console.log(e);
    // }

    const all = await list.find({});
    console.log(all);
})

app.get("/", async (req, res) => {
    try{
        const taskList = await list.find({});
        res.render("main.ejs", { taskList });
    } catch (e) {
        res.send("Something went wrong");
    }
})

