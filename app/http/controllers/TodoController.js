//-----------------------------------------
//-----------------------------------------
//------------- Test Controller
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs
//--------------------------
const path = require('path');


//--------------------------
//------- import Models
//--------------------------
const Todo = requiree('./models/TodoModel')

//--------------------------------------
//----------- Todo Controller Functions
//---------------------------------------

//-------------------------HTTP
function index(req,res)
{
    res.render('index.njk');
}

function createForm(req,res)
{
    res.render('todo/create.njk');
}

async function create(req,res)
{
    const record= new Todo({
        'content':req.body.formContent
    })

    try{
        let doc = await record.save();
        req.flash('success','رکورد ایجاد شد');
        req.session.save(()=>{res.redirect('back');})
    }catch(er){
        //console.log(pe.render(err));
        //res.end("See Error In Console !")
        req.flash('error','عملیات انجام نشد');
        req.session.save(()=>{res.redirect('back');})
    }
}

async function read(req,res)
{
    //--------- check curent page and pages
    (req.params.page) ? curentPage=req.params.page : curentPage=1
    
    try{

        //--------------pagination
        const options = {
            page: curentPage,
            limit: 5,
          };
        let result = await Todo.paginate({},options);
         
        //console.log(result)
        
        //redirect if page not found
        if(curentPage > result.totalPages){
           return res.redirect('/todo/read');
        }
        

        //----------- create response
        let data={
            pagination:result,
            route:'todo/read'
        }
        
        res.render("todo/read.njk",data);
        
    }catch(err){
        console.log(pe.render(err));
        return res.end("See Error In Console !")
    }
    
}

async function updateForm(req,res)
{
    try{
        let doc = await Todo.findOne({id:req.params.id})
        let data={
            doc:doc
        }
        res.render("todo/update.njk",data)
    }catch(err){
        console.log(pe.render(err))
        res.end("See Error In Console !")
    }
}

async function update(req,res)
{
    
    try{
        let doc = await Todo.findOneAndUpdate({
                id:req.body.id
            },{
                content:req.body.formContent
            },{
                new: true, 
                runValidators: true,
                context: 'query'
            })

        data={
            doc:doc
        }
       
        req.flash('success','رکورد ویرایش شد');
        req.session.save(()=>{res.redirect('back');})

    }catch(err){
        //console.log(pe.render(err))
        //res.end("See Error In Console !")
        req.flash('error','این نام قبلا انتخاب شده است');
        req.session.save(()=>{res.redirect('back');})
    }
    
}

async function del(req,res)
{
    if (req.xhr) {

        const id = req.body.formId

        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let data={
                "code":"200",
                "status":"success",
                "message":"عملیات حذف انجام شد",
                "id":id
            }

            res.status(200).json(data)

        }catch(err){
             //console.log(pe.render(err))
             //res.end("See Error In Console !")
            let data={
                "code":"500",
                "status":"error",
                "message":"عملیات حذف انجام نشد",
            }
            res.status(500).json(data)
        }
       
    }
}


function uploadForm(req,res){
    res.render("todo/upload")
}

function upload(req,res){

    
    //--- check exist file
    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('error','فایلی برای آپلود یافت نشد');
        return req.session.save(()=>{res.redirect('back');})
    }

    let file = req.files.formFile;
    console.log(file)

    try{
        let uploadDir= path.join('public/files/') + file.name
        file.mv(uploadDir);

        req.flash('success','فایل آپلود شد');
        req.session.save(()=>{res.redirect('back');})

    }catch(err){
         console.log(pe.render(err))
         res.end("See Error In Console !")
        //req.flash('error','این نام قبلا انتخاب شده است');
       // req.session.save(()=>{res.redirect('back');})
    }

}

//-------------------------------------------------
//--------------------------------JQ
//-------------------------------------------------

function jqCreateForm(req,res)
{
    res.render('todo/jq/create.njk');
}

async function jqCreate(req,res)
{
    if (req.xhr) {
         /*
        //----- server side validation
        let errors=["خطای اول","خطای دوم"]
        let data={
            "code":"200",
            "status":"error",
            "type":"server side validation",
            "message":"عملیات ایجاد انجام نشد",
            "errors":errors
        }
        return res.status(200).json(data)
        */

        //----------- DB
        const record= new Todo({
            'content':req.body.formContent
        })
    
        try{
            let doc = await record.save();

            let data={
                "code":"200",
                "status":"success",
                "message":"رکورد جدید ایجاد شد",
            }
            res.status(200).json(data)
        }catch(er){
            let data={
                "code":"500",
                "status":"error",
                "type":"database error",
                "message":"رکورد قبلا ایجاد شده است",
            }
            res.status(500).json(data)
        }
    }

}

async function jqRead(req,res)
{
    //--------- check curent page and pages
    (req.query.page) ? curentPage=req.query.page : curentPage=1
       
    try{

        //--------------pagination
        const options = {
            page: curentPage,
            limit: 5
          };
        let result = await Todo.paginate({},options);
        
         //console.log(result)
        
        //redirect if page not found
        if(curentPage > result.totalPages){
           return res.redirect('/todo/jq/read');
        }
        
        //console.log(result)

        //----------- create response
        let data={
            pagination:result,
            route:'todo/jq/read'
        }
        
        if(req.xhr){
            res.status(200).send(data)
        }else{
            res.render("todo/jq/read.njk",data);
        }
        
    }catch(err){
        console.log(pe.render(err));
        return res.end("See Error In Console !")
    }

}

async function jqUpdateForm(req,res)
{
    try{
        let doc = await Todo.findOne({id:req.params.id})
        let data={
            doc:doc
        }
        res.render("todo/jq/update.njk",data)
    }catch(err){
        console.log(pe.render(err))
        res.end("See Error In Console !")
    }
}

async function jqUpdate(req,res)
{
    if (req.xhr) {
        /*
       //----- server side validation
       let errors=["خطای اول","خطای دوم"]
       let data={
           "code":"200",
           "status":"error",
           "type":"server side validation",
           "message":"عملیات ایجاد انجام نشد",
           "errors":errors
       }
       return res.status(200).json(data)
       */

       //----------- DB
   
       try{
            let doc = await Todo.findOneAndUpdate({
                id:req.body.id
            },{
                content:req.body.formContent
            },{
                new: true, 
                runValidators: true,
                context: 'query'
            })

           let data={
               "code":"200",
               "status":"success",
               "message":"رکورد ویرایش شد",
               "id":doc.id
           }
           res.status(200).json(data)
       }catch(err){
        //console.log(pe.render(err))
        //res.end("See Error In Console !")
           let data={
               "code":"500",
               "status":"error",
               "type":"database error",
               "message":"این نام قبلا رزرو شده است",
           }
           res.status(500).json(data)
       }
   }
}

async function jqDel(req,res)
{
    if (req.xhr) {

        const id = req.body.formId

        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let data={
                "code":"200",
                "status":"success",
                "message":"عملیات حذف انجام شد",
                "id":id
            }

            res.status(200).json(data)

        }catch(err){
            let data={
                "code":"500",
                "status":"error",
                "message":"عملیات حذف انجام نشد",
            }
            res.status(500).json(data)
        }
       
    }
}


async function vueCurd (req,res){

    //--- get contents
    try{
        let contents = await Todo.find()
        let data={
            contents:contents
        }
        res.render('todo/vue/curd.njk',data);

    }catch(err){
        console.log(pe.render(err))
        return res.end("See Error In Console !")
    }
}

async function vueCreate(req,res)
{
    if (req.xhr) {
         /*
        //----- server side validation
        let errors=["خطای اول","خطای دوم"]
        let data={
            "code":"200",
            "status":"error",
            "type":"server side validation",
            "message":"عملیات ایجاد انجام نشد",
            "errors":errors
        }
        return res.status(200).json(data)
        */

        //----------- DB
        const record= new Todo({
            'content':req.body.formContent
        })
    
        try{
            let doc = await record.save();
            let contents = await Todo.find();

            let data={
                "code":"200",
                "status":"success",
                "message":"رکورد جدید ایجاد شد",
                "contents":contents
            }
            res.status(200).json(data)
        }catch(er){
            let data={
                "code":"500",
                "status":"error",
                "type":"database error",
                "message":"رکورد قبلا ایجاد شده است",
            }
            res.status(200).json(data)
        }
    }

}


async function vueDelete(req,res)
{
    if (req.xhr) {

        const id = req.body.formId

        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let contents = await Todo.find();

            let data={
                "code":"200",
                "status":"success",
                "message":"عملیات حذف انجام شد",
                "contents":contents
            }

            res.status(200).json(data)

        }catch(err){
            let data={
                "code":"500",
                "status":"error",
                "message":"عملیات حذف انجام نشد",
            }
            res.status(500).json(data)
        }
       
    }
}

//---------------------------- Export Controller
module.exports={
    index,
    createForm,
    create,
    read,
    updateForm,
    update,
    del,
    uploadForm,
    upload,
    jqCreateForm,
    jqCreate,
    jqRead,
    jqUpdateForm,
    jqUpdate,
    jqDel,
    vueCurd,
    vueCreate,
    vueDelete
}