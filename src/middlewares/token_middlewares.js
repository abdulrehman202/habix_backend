export default ((req,res,next)=>
    {
        console.log('this always runs again');
        let tokenOk = true;//verfiyTokenScript(req.body);
        
        if(tokenOk)
        {
            next();
        }

        else{
            res.send({result:'Error'})
        }
    });