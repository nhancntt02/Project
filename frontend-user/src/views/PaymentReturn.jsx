import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function PaymentReturn() {
    const location = useLocation();
    const {products} = useStateContext();


    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return {
          resultCode: params.get('resultCode'),
          message: params.get('message'),
          orderId: params.get('orderId'),
          amount: params.get('amount')
          // Lấy thêm các tham số khác nếu cần
        };
      };
    
      // Lấy các tham số từ URL
    const queryParams = getQueryParams(location.search);
    const productOrder = JSON.parse(localStorage.getItem('cartData'));
    const order = JSON.parse(localStorage.getItem('order'));
    console.log(productOrder);
    console.log(order);
    const createOrder = async () => {
        const payload = {
            ...order
        }
        console.log(payload);
        try {
            const res = await axiosClient.post('/add/order', payload);
            const order_id = res.data.data.order_id;

            for(let i = 0; i < productOrder.length; i++){
                const payload2 = {
                    order_id: order_id,
                    product_id: productOrder[i].product_id,
                    io_quantity: productOrder[i].cart_quantity,
                    io_price: products.find(p => p.product_id == productOrder[i].product_id)?.product_price
                }
                console.log(payload2);
                const res = await axiosClient.post('/add/info/order', payload2);
            }
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        if(order && productOrder){
            createOrder();
        }
    }, [])
      
    return (
        <div className="container">
            {
                queryParams.resultCode == 0 ? (
                    <div>
                        <h2>Thanh toán thành công!</h2>
                    </div>
                ) : (
                    <div>
                        <h2>Thanh toán thất bại!
                        </h2>
                        </div>
                )
            }
        </div>  
    )
}

// partnerCode=MOMOBKUN20180529
// &orderId=1726216049
// &requestId=1726216049
// &amount=10000
// &orderInfo=Thanh+to%C3%A1n+qua+MoMo
// &orderType=momo_wallet&transId=4125393403
// &resultCode=0
// &message=Successful.
// &payType=napas
// &responseTime=1726216290992
// &extraData=
// &signature=e28e37ff2064ad5e8276b82c89e59ee64c17e9c2740ad537dd69dc8c951f93ca
// http://localhost:3001/payment-return?partnerCode=MOMOBKUN20180529&orderId=1726217371&requestId=1726217371&amount=17500&orderInfo=Thanh+to%C3%A1n+qua+MoMo&orderType=momo_wallet&transId=1726217383317&resultCode=1006&message=Giao+d%E1%BB%8Bch+b%E1%BB%8B+t%E1%BB%AB+ch%E1%BB%91i+b%E1%BB%9Fi+ng%C6%B0%E1%BB%9Di+d%C3%B9ng.&payType=&responseTime=1726217383323&extraData=&signature=f5888c527a12f217eb1d0b06f4e8a58949ab5f08cfc36f6b9b2384117463e32d
// http://localhost:3001/payment-return?partnerCode=MOMOBKUN20180529&orderId=1726217558&requestId=1726217558&amount=21500&orderInfo=Thanh+to%C3%A1n+qua+MoMo&orderType=momo_wallet&transId=4125398528&resultCode=1002&message=Transaction+rejected+by+the+issuers+of+the+payment+accounts.&payType=napas&responseTime=1726217599607&extraData=&signature=3de6f33f5d498e918d714eb4433f9883892b81f51133823d8ae9a62e6f3c921b