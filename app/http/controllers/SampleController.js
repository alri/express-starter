//-----------------------------------------
//-----------------------------------------
//------------- HTTP SampleController
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs
//--------------------------



//--------------------------
//------- import Models
//--------------------------
const Sample = requiree('/models/SampleModel');

//--------------------------------------
//----------- Test Controller Functions
//---------------------------------------

function index(req, res) {
    res.render('index.html');
}


//------------------------------------------
//------------------------------------------
//----------------- Async Await
//------------------------------------------
//------------------------------------------
async function dbInsert(req, res, next) {

    try {
        const record = new Sample({
            'name': 'alireza',
            'familly': 'abyari'
        });
        let doc = await record.save()
        res.send(doc);

    } catch (err) {
        res.send(err);
    }

}


async function dbRead(req, res, next) {
    try {
        let doc = await Sample.find({
            name: 'alireza' // search query
        })
        res.send(doc);

    } catch (err) {
        res.send(err)
    }
}

async function dbReadAll(req, res, next) {
    try {
        let docs = await Sample.find()
        res.send(docs);

    } catch (err) {
        res.send(err)
    }
}


async function dbUpdate(re, res, next) {
    try {

        let doc = await Sample.findOneAndUpdate({
            id: 1 // search query
        }, {
            name: 'alri' // field:values to update
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        res.send(doc)

    } catch (err) {
        console.error(err)
    }

}



async function dbDelete(re, res, next) {
    try {
        let doc = await Sample.findOneAndRemove({
            name: 'alireza'
        })
        res.send(doc)

    } catch (err) {
        console.error(err)
    }

}

//------------------------------------------
//------------------------------------------
//----------------- Promise
//------------------------------------------
//------------------------------------------
function dbInsertPromise(req, res, next) {
    const record = new Sample({
        'name': 'alireza',
        'familly': 'abyari'
    });

    record.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.send(err);
        })
}


function dbReadPromise(req, res, next) {
    Sample
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

function dbUpdatePromise(re, res, next) {
    //---------- find one record
    Sample
        .findOneAndUpdate({
            name: 'alireza' // search query
        }, {
            name: 'alri' // field:values to update
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            console.error(err)
        })

}



function dbDeletePromise(re, res, next) {
    //----- find one record
    Sample
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
module.exports = {
    index,
    dbInsert,
    dbRead,
    dbReadAll,
    dbUpdate,
    dbDelete,
    dbInsertPromise,
    dbReadPromise,
    dbUpdatePromise,
    dbDeletePromise
}

//##########################################
//######################################
//####################### Use Service Model
//######################################
//###########################################

const SampleService = requiree("./app/services/SampleService");

 class SampleController{

    static async apiGetAllSamples(req, res, next){
        try {
          const samples = await SampleService.getAllArticles();
          if(!samples){
             res.status(404).json("There are no article published yet!")
          }
          res.json(samples);
        } catch (error) {
           res.status(500).json({error: error})
        }
 
    }
 
    static async apiGetSampleById(req, res, next){
       try {
          let id = req.params.id || {};
          const sample = await SampleService.getSamplebyId(id);
          res.json(sample);
       } catch (error) {
          res.status(500).json({error: error})
       }
    }
 
    static async apiCreateSample(req, res, next){
       try {
          const createdSample =  await SampleService.createSample(req.body);
          res.json(createdSample);
       } catch (error) {
          res.status(500).json({error: error});
       }
    }
 
    static async apiUpdateArticle(req, res, next){
       try {
          const comment = {}
          comment.title        = req.body.title;
          comment.body         = req.body.body;
          comment.articleImage = req.body.article_image
 
          const updatedSample = await SampleService.updateSample(comment);
 
          if(updatedSample.modifiedCount === 0){
             throw new Error("Unable to update article, error occord");
          }
 
          res.json(updatedSample);
 
       } catch (error) {
          res.status(500).json({error: error});
       }
    }
 
    static async apiDeleteSample(req, res, next){
          try {
             const sampleId = req.params.id;
             const deleteResponse =  await SampleService.deleteSample(sampleId)
             res.json(deleteResponse);
          } catch (error) {
             res.status(500).json({error: error})
          }
    }
 
 }
 
