const appError=require('../utils/expressError');

module.exports=function (fn) {
    return function (req, res, next) {
        fn(req, res, next)
            .catch((err) => {
                return next(err);
            });
    }
}