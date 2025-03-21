module.exports = function(req,res,next){
    res.locals._addAsset = function(type,file){
        this._assets[type][file] = true;
    }
    res.locals._assets ={
        javascript:{}
    }
    res.locals._alerts = [];

    res.locals._input = {};

    res.locals._setInput = function(field){
        this._input[field] = this._getInput(field); 
    }
    res.locals._setInputValue = function(field,value=''){
        this._setInput(field);
        this._input[field].value = value;
    }
    res.locals._setInputError = function(field,error=true){
        this._setInput(field);
        this._input[field].error = error;
    }
    res.locals._getInput = function(field){
    
        return this._get(['_input',field].join('.'),{value:'',error:null});
    
    }
    res.locals._getInputValue = function(field){
        return this._getInput(field).value;
    }
    res.locals._getInputError = function(field){
        return this._getInput(field).error;
    }


    res.locals._if = function(){
        let len = arguments.length
        let dec = len % 2 == 1?1:0;
        for(let i = 0;i < len-dec;i+=2){
            if(arguments[i]){
                return arguments[i+1];
            }
        }
        if(dec == 1)
            return arguments[len-1];
        return '';
    }
    
    
    res.locals._isNullOrUndefined = function(value){
        return this._isNull(value) || this._isUndefined(value);
    }
    res.locals._isNotNullOrUndefined = function(value){
        return !this._isNullOrUndefined(value);
    }
    res.locals._isNull = function(value) {
        return this._is(value,'null');
    }
    res.locals._isNotNull = function(value) {
        return !this._isNull(value);
    }
    res.locals._isUndefined = function(value){
        return this._is(value,'undefined');
    }
    res.locals._isNotUndefined = function(value){
        return !this._isUndefined(value);
    }

    res.locals._is = function(value,rule='falsy') {
        rule = rule.toLowerCase();
        switch(rule){
            case "undefined":
                return value === (void 0);
            case "null":
                return value === null;
            default:
                return value?true:false;
        }
    }

    res.locals._get = function() {
        let args = Array.prototype.slice.call(arguments, 0);
        let path = args[0].split('.');
        let root = this;
        for (var i = 0; i < path.length; i++) {
            if(this._isUndefined(root[path[i]])) {
                return this._is(args[1])?args[1]:undefined;
            } else {
                root = root[path[i]];
            }
        };
        return root;
    }
    // res.locals._set = function() {
    //     const args = Array.prototype.slice.call(arguments, 0);
    //     const path = args[0].split('.');
    //     let root = this;
    //     for (var i = 0; i < path.length-1; i++) {
    //         console.log(root);
    //         if(this._isUndefined(root[path[i]])) {
    //             root[path[i]] = {};
    //         }
    //         root = root[path[i]];
            
    //     };
    //     root = root[path[path.length-1]];
    //     root = args[1] ;
    // }
    next();
}