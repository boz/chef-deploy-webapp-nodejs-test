var config  = require('config').load(),
       util = require('util');

var redis, redisClient;

if(config.redis) {
  redis = require('redis').createClient(config.redis.port,config.redis.host);
}

/*
 * GET home page.
 */

function renderIndex(req,res,config,redisInfo) {
  res.render('index', {
    title: 'chef-deploy test nodejs',
    config: util.inspect(config),
    redisInfo: redisInfo 
  });
}

exports.index = function(req, res){
  if(redis) {
    redis.info(function(err,info){
      renderIndex(req,res,config,info || err);
    });
  } else {
    renderIndex(req,res,config);
  }
};
