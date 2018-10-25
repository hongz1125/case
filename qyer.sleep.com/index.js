let axios = require('axios');
let moment = require('moment');
let bed_param = {
    url: "http://open.4awork.com/api/bed/booking",
    method: "post",
    headers: {},
    transformRequest: [function(data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }],
    data: {
        'bed_id': 10,
        'start': +new Date(moment(+new Date()).format("YYYY-MM-DD 12:00:00")) / 1000,
        'end': +new Date(moment(+new Date()).format("YYYY-MM-DD 13:29:59")) / 1000
    },
};

let time, n = 0;

//抢票
function get_bed() {
    //console.log(`----船票请求：\n`,bed_param);
    time = setInterval(() => {
        n++;
        console.log('请求次数:', n);
        if (n > 1000) clearInterval(time);
        axios(bed_param)
            .then(res => {
                if (res.data.status_code == 0) {
                    console.log(`船票成功！！！`);
                    clearInterval(time)
                };
                console.log(`返回文本:`, res.data.status_code, res.data.message)
                //console.log(`----船票返回：\n`, res.data);
            })
            .catch(error => {
                //console.log(error);
            })
    }, 28);

}

//判断是否开始时间
function is_start() {
    setTimeout(() => {
        if (+new Date() > +new Date(moment(+new Date()).format("YYYY-MM-DD 11:59:50"))) {
            get_bed();
            console.log("船票 开始!");
        } else {
            is_start();
            console.log("船票 未开始");
        }
    }, 10)
}


//登陆
function do_login() {
    let param = {
        url: 'http://open.4awork.com/api/auth/login',
        method: "post",
        data: {
            "email": "zhi.hong@qyer.com",
            "password": "Hongz1126",
        }
    }
    //console.log(`----登陆请求：\n`,param);
    axios(param)
        .then(res => {
            //console.log('----登陆返回：\n', res.data,res.data.data.token);
            bed_param.headers.Cookie = res.headers['set-cookie'][0].split(';')[0];
            bed_param.url += `?token=${res.data.data.token}`;
            console.log("登陆成功！")
            get_bed();
        })
        .catch(error => {
            //console.log('login error')
        })
}

do_login();
