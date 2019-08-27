const Asset = require('../models/asset');
const random = require('randomstring');
exports.addAsset = (req,res,next) => {
    const string = random.generate({
        length: 10,
        charset: 'alphanumeric'
    }); 
    const assetName = req.body.a;
    const uploaderName = req.body.u;
    const description = req.body.description;
    const price = req.body.price;
    var mainFile = [];
    mainFile = req.files;
    //const Ofiles = req.files;
    const licence = req.body.licence;
    const rDate = req.body.date;
    console.log(req.body);
    console.log(mainFile);
    //console.log(Ofiles);
    const asset = new Asset({
        random: string,
        assetName: assetName,
        uploaderName: uploaderName,
        description:description,
        price:price,
        MainFile: mainFile,
        //files:Ofiles,
        lic:licence,
        spritesheet:'null',
        release:rDate
    });
    asset.save((err) => {
        console.log('added');
        res.redirect('/');
    });
};

exports.getAssetDetails = (req,res,next) => {
    const val = req.params.random;
    Asset.findOne({random: val})
    .then(asset => {
        res.render('store',{
            main:asset,
            count:asset.MainFile.length
        });
    })
    .catch(err => {
        console.log(err);
    });
};