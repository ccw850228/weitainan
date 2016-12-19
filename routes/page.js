//首頁
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var mc = mongodb.MongoClient;

var a=[];
var b=[];


exports.index = function(req, res) {
    res.render('pages/index');
};
//列出資料
exports.list = function(req, res) {
    //res.render('pages/index');
    mc.connect('mongodb://tainan:tainan@ds139288.mlab.com:39288/tainan', (err,db) => {
        var collection = db.collection('info');

         collection.find().toArray((err, result) => {
            //console.log(123);
            if(!err){
                //console.log(123);
                for (var i = 0; i < result.length; i++) {
                    //console.log(result[i]);
                      //a[i]=result[i];
                      //console.log(a);
                }
                
                res.send(result);
                // res.render('pages/index', {
                //              listdata: 1
                // });
            }else{
                console.log(err);
            } 
            db.close()

        }); 
    });
};

//收藏 
exports.collect = function(req, res) {
    
    mc.connect('mongodb://tainan:tainan@ds139288.mlab.com:39288/tainan', (err,db) => {
        var collection = db.collection('info');
    // //新增資料

        var res_id = req.body.res_id.replace( /[\r\n\"]/g , '' );
        console.log(res_id);
        //var res_favorite = req.body.res_name.replace( /[\r\n\"]/g , '' );
    //     var res_address = req.body.res_address.replace( /[\r\n\"]/g , '' );
    //     var res_phone = req.body.res_phone.replace( /[\r\n\"]/g , '' );
    //     var res_time = req.body.res_time.replace( /[\r\n\"]/g , '' );
    //     //console.log(text);

        var condition = {"id": res_id};
        var new_str = {$set: {"favorite": true}};
        collection.update(condition, new_str, (err, result) => {
            if(!err){
                //console.log(result);
                res.send('success');
            }else{
                res.send('error');
            }
 
         db.close()
         });
    });
    //res.render('pages/success');
};
//取消
exports.remove = function(req, res) {
    
    mc.connect('mongodb://tainan:tainan@ds139288.mlab.com:39288/tainan', (err,db) => {
        var collection = db.collection('info');
    // //新增資料

        var res_id = req.body.res_id.replace( /[\r\n\"]/g , '' );
        console.log(res_id);
        //var res_favorite = req.body.res_name.replace( /[\r\n\"]/g , '' );
    //     var res_address = req.body.res_address.replace( /[\r\n\"]/g , '' );
    //     var res_phone = req.body.res_phone.replace( /[\r\n\"]/g , '' );
    //     var res_time = req.body.res_time.replace( /[\r\n\"]/g , '' );
    //     //console.log(text);

        var condition = {"id": res_id};
        var new_str = {$set: {"favorite": false}};
        collection.update(condition, new_str, (err, result) => {
            if(!err){
                //console.log(result);
                res.send('success');
            }else{
                res.send('error');
            }
 
        db.close()
        });
    });
    //res.render('pages/success');
};

//刪除
exports.delete = function(req, res) {
    
    // mc.connect('mongodb://zitim:999TIMTI@ds115738.mlab.com:15738/messageboard', (err,db) => {
    //     var collection = db.collection('test2');

    //     console.log(req.body.id);
    //     var condition = {"_id": ObjectId(req.body.id)};
    //     collection.remove(condition, (err, result) => {
    //         if(!err){
    //             res.send('success');
    //         }else{
    //             res.send('error');
    //         }
    //     db.close()
    //     });
    // });

}

//編輯
exports.edit = function(req, res) {
    
    // mc.connect('mongodb://zitim:999TIMTI@ds115738.mlab.com:15738/messageboard', (err,db) => {
    //     var collection = db.collection('test2');

        
    //     req.body.new_mess = req.body.new_mess.replace( /[\r\n\"]/g , '' );
    //     console.log(req.body.old_mess);
    //     console.log(req.body.new_mess);

    //     var condition = {"message": req.body.old_mess};
    //     var new_str = {$set: {"message": req.body.new_mess}};
    //     collection.update(condition, new_str, (err, result) => {
    //         if(!err){
    //             //console.log(result);
    //             res.send('success');
    //         }else{
    //             res.send('error');
    //         }
    //     db.close();
    //     });
    // });

}

exports.postAjax = function(req, res) {
    // ajax
    if (req.body.password == 1234) {
        res.send('success');
    } else(
        res.send('error')
    );
};

//get取得資料
exports.getAjax = function(req, res) {
    res.send([{
        name: '王小名',
        tel: '0922194720'
    }, {
        name: '李小花',
        tel: '0983026183'
    }, {
        name: '王大雄',
        tel: '0929735162'
    }]);
};


//get取得Json
exports.getJson = function(req, res){

    
};

