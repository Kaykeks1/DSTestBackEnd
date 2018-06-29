/**
 * HobbiesController
 *
 * @description :: Server-side logic for managing hobbies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // delete: function(req,res){
    //     Hobbies.destroy({id:req.body.HobbId}).exec(function(err){
    //         if (err){
    //             // console.log(err);
    //             alert("error");
    //             return res.send({
    //                 success:false
                    
    //             });
    //         }
    //         else{
    //             return res.send({
    //                 success:true, 
    //             }); 
    //         }
    //     })
    // },
    view: function(req,res){
        Hobbies.find({where:{UserId:req.body.UserId}}).exec(function(err, hobby){
            if (err){
                console.log(err);
                alert("error");
                return res.send({
                    success:false
                    
                });
            }
            else{
                console.log(hobby[1]);
                return res.send({
                    success:true, 
                    hobby:hobby
                }); 
            }
            
        })
    },
    add: function(req,res){
        var nodemailer=require("nodemailer");
        var transporter=nodemailer.createTransport({
            service:"gmail",
            secure: false,
            port: 25,
            auth: {
                user:"kayuskeks@gmail.com",
                pass:"123GBAVO"
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        var mailoptions={
            from:"ADDHOBBIES.COM <kayuskeks@gmail.com>",
            to:req.body.email,
            subject:"NEW HOBBY",
            text:"A new hobby has been added to your list: "+req.body.HobbyName
        };

        transporter.sendMail(mailoptions,function(error){
            if(error){
                console.log("email not sent");
                console.log(error);
         
            }
            console.log("success");
        });

        var telesignsdk = require("telesignsdk");
        var client = new telesignsdk("7446D94B-B815-4C66-BBD2-BA09740C1ACD","A70Xtks6v2y4lioI9+Lix6mIMMw3UWlXn1bFiSU4M4WGvGNubP6ub4yUlTmDMGQkvTY9FOPhH8rV2AS7YSCLKg==");

        callback = function(err, resBody){
            if(err){
                req.session.emailTextError +="and Text";
                console.error(err);
            }
            else{
                req.session.emailTextError +="and Text";
                console.log(resBody);
            }
        }
        console.log(req.body.UserId)
        client.sms.message(callback,2348075176592,'A new hobby has been added to your list: '+ req.body.HobbyName,'ARN');
        data ={
            UserId:req.body.UserId,
            HobbyName:req.body.HobbyName
        }
        
        Hobbies.create(data).exec(function(err,hobby){
            console.log(hobby.UserId);
            console.log(hobby.HobbyName);
            if (err){
                res.send(500, {error: 'Database Error', success: false});
                console.log("ok");
                return;
            }
            else{
                console.log("added");
                return res.send({
                    
                    message : "added hobby",
                    success : true
                });
            }
        })
        
    }
};

