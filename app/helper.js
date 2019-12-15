const url = function(link=false) {
    return process.env.APP_URL+'/'+link;
}

const css = function(link=false) {
    return process.env.APP_URL+'/css/'+link;
}

const js = function(link=false) {
    return process.env.APP_URL+'/js/'+link;
};

const img = function(link=false) {
    return process.env.APP_URL+'/img/'+link;
};

module.exports = {
    url : url,
    css:css,
    js:js,
    img:img
};