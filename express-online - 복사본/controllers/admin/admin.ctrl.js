const models = require('../../models');

exports.get_products = ( _ , res) => {
    // res.render( 'admin/products.html' , 
    //     { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
    // );
    
    //db조회하기
    models.Products.findAll({

    }).then((products)=>{
        res.render('admin/products.html',{productList : products});
    });
        //db조회하기
}

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}
//insert구문
exports.post_products_write = ( req , res ) => {
  
//    models.Products.create({
//     name : req.body.name,
//     price :req.body.price,
//     description :req.body.description
//    }).then( ()=>{
//         res.redirect('/admin/products');
//    });

//위의 코드를 아래처럼 바꿀수있음

        models.Products.create(req.body).then(()=>{
            res.redirect('/admin/products');
        })



}
//insert구문




//상세페이지보기
exports.get_products_detail = (req,res)=>{
    //req.params.id로 받을수있음
    models.Products.findByPk(req.params.id).then( (product) =>{
        //console.log(product);
        res.render('admin/detail.html',{product : product});
    });
}


exports.get_products_edit = (req,res)=>{
    models.Products.findByPk(req.params.id).then((product)=>{
        res.render('admin/write.html',{product});
    })
}

exports.post_products_edit = (req,res)=>{
    models.Products.update({
        name : req.body.name,
        price : req.body.price.redirect,
        description : req.body.description
    },{
        where : {id : req.params.id}  
    }
    ).then(()=>{
        res.redirect(`/admin/products/detail/${req.params.id}`);
    })
}


exports.get_products_delete = (req,res)=>{
    models.Products.destroy({
        where : {
            id : req.params.id
        }
    }).then(()=>{
        res.redirect('/admin/products');
    })
}