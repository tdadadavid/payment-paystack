//@ts-ignore
const {Request, Response} = require('express');
const http =  require('node:https');


const paystack = {
    acceptPayment:  async (req: Request, res: Response) => {
        try{
            //@ts-ignore
            const { email, amount, } = req.body;


            const params = JSON.stringify({
                email,
                amount: 100 * amount,
            });

            const options = {
                hostname: 'api.paystack.co',
                port: 443,
                method: 'POST',
                path: '/transaction/initialize',
                headers: {
                    Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            };

            const clientRequest = http.request(options, (response: any) => {

                let data = '';

                response.on('data', (chunk: any) => {
                    data += chunk;
                })

                response.on('end', () => { 
                    //@ts-ignore
                    console.log(data)
                    // @ts-ignore
                    return res.status(200).json(data);
                });

            })
            .on('error', (err: any) => {
                console.log(err);
            })


            clientRequest.write(params);
            clientRequest.end();



        }catch(err: unknown){
            console.log(err);
            //@ts-ignore
            res.status(500).json("An error occurred");
        }
    }   
}


module.exports = {
    initializePayment: paystack.acceptPayment
}