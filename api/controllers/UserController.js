/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // dashboard: function(req,res){
    //     req.session.loginError=" ";
    //     console.log(req.session.userId);
    //     data= {
    //         id:req.body.UserId//req.body.UserId
    //     }
    //     User.findOne(data).populateAll().exec(function(err, user){
    //         if (err){
    //             console.log(err);
    //             return;
    //         }  
    //         res.send( 
    //             {success:true, hobby:user.hobbies}); 
    //     })
        
    // },
    // register: function(req,res){
    //     req.session.loginError=" ";
    //     res.view();
        
    // },

	processregister:function(req, res){
        data = {
            name:req.body.name,
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone,
            email:req.body.email
        }
 
        User.create(data).exec(function(err, user){
            if (err){
                res.send(500, {error: 'Database Error', success:false});
                return;
            }
            else{
                req.session.userId=user.id;
                req.session.name=user.name;
                req.session.email=user.email;
                req.session.phone=user.phone;
                res.send({
                    user: user.id,
                    Uname: user.name,
                    Email: user.email,
                    success:true
                });
            }
            // if(!user.username){
            //     res.redirect('/user/register');
            //     return;
            // }
           
            // res.redirect('/user/dashboard');
            

            
        })
    },

    // login: function(req,res){
    //     res.view();

    // },
 


    processlogin:function(req,res){
        data = {
            username:req.body.username,
            password:req.body.password
        }
        User.findOne(data).then(function(user){
            if(user) {
                
                return res.send({
                    user: user.id,
                    Uname: user.name,
                    Email: user.email,
                    message: "logged in",
                    success: true
                });
            }
            else{
                return res.send({
                    message : "not logged in",
                    success : false
                });
            }
            req.session.userId=user.id;
            req.session.name=user.name;
            req.session.email=user.email;
            req.session.phone=user.phone;
            // return  res.send("working");
        })  

    },
    homepage: function(req,res){
        req.session.loginError=" ";
        res.view();
        

    }
 
};

