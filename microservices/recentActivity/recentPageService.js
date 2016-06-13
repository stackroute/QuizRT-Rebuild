var seneca = require('seneca')();

  seneca
  .use('entity')
  .use('mongo-store',{
    name: "quizRT4",
    host: "127.0.0.1",
    port: 27017
  })
  .use('./recentPagePlugin')
  // .act('role:recentPage,action:retrive',function(err,result){
  //   if(err) return console.error(err)
  //   console.log(result)
  // })
  .use('mesh', { auto:true, pin:'role:recentPage' })