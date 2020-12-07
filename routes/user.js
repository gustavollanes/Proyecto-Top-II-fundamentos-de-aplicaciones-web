//Aqui vamos a empezar la funcion del registro
exports.register = function(req, res) {
        message = '';
    if (req.method == "POST"){
        var POST = req.body;
        var name = POST.name;
        var usuario = POST.usuario;
        var contrasena = POST.contrasena;

        var sql = "INSERT INTO `usuario`(`name`,`usuario`, `contrasena`) VALUES ('" + name + "','" + usuario + "','"+ contrasena + "')";
   
        var query = db.query(sql, function(err, results){
            message = 'usuario registrado exitosamente'
            res.render('register.ejs');
        });
   
    }else{
        res.render ('register')
    }


};


exports.login = function(req, res) {
    var  message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var POST = req.body;
        var usuario = POST.usuario;
        var contrasena = POST.contrasena;
        
var sql="SELECT id, name, usuario, contrasena FROM `usuario` WHERE `usuario`='"+usuario+"' and contrasena = '"+contrasena+"'";
        db.query(sql, function(err, results){
            if (results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/bienvenido')
            }else{
                res.render('index.ejs', )
            }
        });
    }else{
        res.render('index.ejs');
    }
};

exports.bienvenido = function(req, res, next) {
    var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }
 
   var sql="SELECT * FROM `usuario` WHERE `id`='"+userId+"'";
 
   db.query(sql, function(err, results){
      res.render('bienvenido.ejs', {user:user});    
   }); 

};

exports.cerrarsesion=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/login");
    })
 };



 exports.newnovel = function(req, res) {
var user = req.session.user;
userId = req.session.userId;
if(userId==null){
    res.redirect("/home/login");
    return; 
}


if (req.method == "POST"){
    var POST = req.body;
    var title = POST.title;
    var description = POST.description;

    var sql = "INSERT INTO `novels`(`title`, `description`) VALUES ('" + title + "','"+ description + "')";

    var query = db.query(sql, function(err, results){
        res.render('newnovel.ejs');
    });

}else{
    res.render ('newnovel')
}


};


exports.newnovel = function(req, res) {
    var user = req.session.user;
    userId = req.session.userId;
    if(userId==null){
        res.redirect("/home/login");
        return; 
    }
    
    
    if (req.method == "POST"){
        var POST = req.body;
        var title = POST.title;
        var description = POST.description;
    
        var sql = "INSERT INTO `novels`(`title`, `description`) VALUES ('" + title + "','"+ description + "')";
    
        var query = db.query(sql, function(err, results){
            res.render('newnovel.ejs');
        });
    
    }else{
        res.render ('newnovel')
    }
    
    
    };


    exports.viewnovel = function(req, res, next) {
        var user = req.session.user;
        userId = req.session.userId;
        if(userId==null){
            res.redirect("/");
            return; 
        }
        
        
        
        
            var sql = "SELECT * FROM `novels`";
        
            db.query(sql, function(err, result){
                
                res.render('viewnovel.ejs',{data:result})

                console.log(result);
                

            });
           
        };

