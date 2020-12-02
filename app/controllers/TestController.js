//-----------------------------------------
//-----------------------------------------
//------------- Test Controller
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs
//--------------------------
const createError = require('http-errors');


//--------------------------
//------- import Models
//--------------------------
const Test = require('$/app/models/TestModel');

//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function index(req,res)
{
    res.render('index.html');
}

function dbInsert(req,res,next)
{
    const record = new Test({
        'name':'alireza',
        'familly':'abyari'
    });

    record.save()
           .then(doc => {
               res.send(doc);
            })
          .catch(err => {
                res.send(err);
            })
}


function dbRead(req,res,next)
{
    Test
  .find({
    name: 'alireza' // search query
  })
  .then(doc => {
    res.send(doc)
  })
  .catch(err => {
   res.send(err)
  })

}

function dbUpdate(re,res,next)
{
    //---------- find one record
    Test
  .findOneAndUpdate(
    {
      name: 'alireza'  // search query
    }, 
    {
      name: 'alri'   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
  .then(doc => {
    res.send(doc)
  })
  .catch(err => {
    console.error(err)
  })

}



function dbDelete(re,res,next)
{
    //----- find one record
    Test
  .findOneAndRemove({
    name: 'alireza'
  })
  .then(doc => {
    res.send(doc)
  })
  .catch(err => {
    console.error(err)
  })

}

    



//---------------------------- Export Controller
module.exports={
    index,
    dbInsert,
    dbRead,
    dbUpdate,
    dbDelete
}