import service from "@/utils/request.js"


//获取经销商
export function GetGys(data){
    return service.request({
        method: "post",
        url: "/h5/kxdh/public/getOrgListByMobile.do",
        data
        
    })
}
//登录接口

export function Login(data){
    return service.request({
        method: "post",
        url: "/h5/kxdh/user/ajax/login.do",
        data
    })
}
//获取轮播图
export function getBannerList(data){
    return service.request({
        method: "post",
        url: "/api/kxdh/banner/getBannerList.do",
        data
    })
}
//获取热销商品列表
export function hotGoodList(data){
    return service.request({
        method: "post",
        url: "/h5/kxdh/goods/ajax/homeRecommendGoods.do",
        data
    })
}
//获取常购商品列表
export function userPurchaseGoods(data){
    return service.request({
        method: "post",
        url: "/h5/kxdh/goods/ajax/userPurchaseGoods.do",
        data
    })
}