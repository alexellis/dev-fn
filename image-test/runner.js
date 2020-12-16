'use strict'
let h = require("./handler")

class FunctionEvent {
    constructor(req) {
        this.body = req.body;
        this.headers = req.headers;
        this.method = req.method;
        this.query = req.query;
        this.path = req.path;
    }
}

class FunctionContext {
    constructor(cb) {
        this.value = 200;
        this.cb = cb;
        this.headerValues = {};
        this.cbCalled = 0;
    }

    status(value) {
        if(!value) {
            return this.value;
        }

        this.value = value;
        return this;
    }

    headers(value) {
        if(!value) {
            return this.headerValues;
        }

        this.headerValues = value;
        return this;    
    }

    succeed(value) {
        let err;
        this.cbCalled++;
        this.cb(err, value);
    }

    fail(value) {
        let message;
        this.cbCalled++;
        this.cb(value, message);
    }
}



async function run() {
    let e = new FunctionEvent({body: {}, headers:{}, method:"",query:""})
    
    let cb = (res, err) => {
        if(err) {
            return console.error(err)
        }
        console.log(res)
    }
    let c = new FunctionContext(cb)


    let res = await h(e, c)
    console.log()
}

run()