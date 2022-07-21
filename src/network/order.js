import {request} from "@/network/request";

//创建订单
export function createOrder(params){
    return request({
        url:'/api/orders',
        method:'post',
        params
    })
}
//获取订单预览视图
export function getOrderPreview(){
    return request({
        url:'/api/orders/preview'
    })
}
//支付订单，获取二维码
export function payOrder(order,params){
    return request({
        url:`/api/orders/${order}/pay`,
        params
    })
}
//查询订单支付状态
export function payOrderStatus(order){
    return request({
        url:`/api/orders/${order}/status`
    })
}
//获取订单列表 {page:1,status:2,include:'user,orderDetail.goods'}
export function getOrderList(params){
    return request({
        url:`/api/orders`,
        method:'get',
        params
    })
}
//订单详情
export function getOrderDetail(order){
    return request({
        url:`/api/orders/${order}`,
        params:{
            include:'user,orderDetails,goods'
        }
    })
}
//确认订单
export function confirmOrder(order){
    return request({
        url:`/api/orders/${order}/confirm`,
        method:'patch'
    })
}
//获取物流信息
export function viewExpress(order){
    return request({
        url:`/api/orders/${order}/express`,
        method:'get'
    })
}