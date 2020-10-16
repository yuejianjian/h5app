const isNullOrEmpty =function(val){
    console.log(val)
    if(val==null || val=="" || typeof(val)==undefined){
        return true
    }else{
        return false
    }
}

export {
    isNullOrEmpty
}