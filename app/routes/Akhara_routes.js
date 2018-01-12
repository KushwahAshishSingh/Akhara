
/*
Main routes
*/

const ObjectId = require('mongodb').ObjectID;
const email = require('mongodb').email;
const password = require('mongodb').password;
const firstName = require('mongodb').firstName;
const phone = require('mongodb').phone;
//var Dist = require('mongodb').address.pincode;
const multer = require('multer');

const storage = multer.diskStorage({             // upload where the data ll get saved
   destination: function(req, file, cb) {
       cb(null, './uploads/');
   },
    filename: function(req, file, cb) {
       cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);  // this ll reject the file
    }
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
    });





module.exports = function(app, db) {
    app.post('/Akhara',upload.single('productImage'), (req, res) => {
        console.log(req.file);
        const errors = validateLawyer(req);

    console.log(req.body);
    console.log(errors);
    if (errors.length) {
        return res.send({errors: errors});
    }

    const Akharas = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // address: {
        //     streetAddress: req.body.address.streetAddress,
        //     district: req.body.address.district,
        //     pincode: req.body.address.pincode
        // },
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        subscriptionStart: req.body.subscriptionStart,
        subscriptionEnd: req.body.subscriptionEnd,
        discount: req.body.discount,
        productImage: req.file.path
    };

    db.collection('Akhara').insert(Akharas, (err, result) => {
        if(err) {
            res.send({error: 'An error has occurred'});
        } else {
            res.send(result.ops[0]);
}
});
});

    app.post('/Update', (req, res, next) => {

        const Akharas = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: {
                streetAddress: req.body.address.streetAddress,
                district: req.body.address.district,
                pincode: req.body.address.pincode
            },
            phone: req.body.phone,
            password: req.body.password,
            email: req.body.email,
            agentId: req.body.agentId,
            subscriptionStart: req.body.subscriptionStart,
            subscriptionEnd: req.body.subscriptionEnd,
            discount: req.body.discount,
            productImage: req.file.path

        };
    var id = req.body.id;


    db.collection('Akhara').updateOne({"_id": ObjectId(id)}, {$set: Akharas}, function (err, result) {
        if (err) {
            res.send({error: 'An error has occurred'});
        } else {
            console.log('updated');
            res.send(result);
        }
    });
});

    app.post('/Find', (req, res) => {

        const resultArray = [];
    const firstName = req.body.firstName;
    const phone = req.body.phone;
    // const Districts = req.body.address.district;
    var Results = db.collection('Akhara').find(
        { $or : [ {phone: phone},
                {firstName : firstName},
                {email : email}
                // ,{Dist: Districts}
            ]});
    Results.toArray(function(error, docs) {
        resultArray.push(docs);

        if (docs) {
            res.send(resultArray);
        }
        else {
            res.send({error: 'not in our database'});
        }
    });
});

app.post('/Delete', (req, res) => {

    const Akharas = {
        id: req.body.id,
        firstName: req.body.firstName
    };
    var id = req.body.id;
    db.collection('Akhara').deleteOne({"_id": ObjectId(id)}, {$set: Akharas}, function (err, result) {
        if (err) {
            res.send({error: 'An error has occurred'});
        } else {
            console.log('deleted');
            res.send(result);
        }
    });
});

    app.post('/Login', (req, res) => {

        const resultArray = [];
    const email = req.body.email;
    const password = req.body.password;
    // const Districts = req.body.address.district;

    var Results = db.collection('Akhara').find(
        { $and : [ {email: email},
                {password : password}
                // ,{Dist: Districts}
            ]});
    Results.toArray(function(error, docs) {
        resultArray.push(docs);

        if (docs) {
            res.send(resultArray);
        }
        else {
            res.send({error: 'not in our database'});
        }
    });
});



};






function validateLawyer(req) {

    const errors = [];
    if (!req.body.firstName) {
        errors.push({
            field: 'firstName',
            message: 'First name is required'
        });
    }

    if (!req.body.lastName) {
        errors.push({
            field: 'lastName',
            message: 'Last Name is required'
        });
    }

    // if (!req.body.address) {
    //     errors.push({
    //         field: 'address',
    //         message: 'Address is required'
    //     });
    // } else {
    //     if (!req.body.address.streetAddress) {
    //         errors.push({
    //             field: 'streetAddress',
    //             message: 'Street Address is required'
    //         });
    //     }
    //     if (!req.body.address.district) {
    //         errors.push({
    //             field: 'district',
    //             message: 'District is required'
    //         });
    //     }
    //     if (!req.body.address.pincode) {
    //         errors.push({
    //             field: 'pincode',
    //             message: 'Pincode is required'
    //         });
    //     }
    // }


    if (!req.body.subscriptionStart) {
        errors.push({
            field: 'subscriptionStart',
            message: 'Subscription Start Year is required'
        });
    }
    if (!req.body.subscriptionEnd) {
        errors.push({
            field: 'subscriptionEnd',
            message: 'subscriptionEnd is required'
        });
    }

return errors;
}
