const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(error0, connection){
  if(error0){
    throw error0
  }

  connection.createChannel(function(error1, channel){
    if(error1){
      throw error1
    }

    const queue = 'task_queue'
    channel.assertQueue(queue,{
      durable: true,
    })
    channel.prefetch(1)
    console.log("[*] Waiting form message in %s. To exit press CTRL+C", queue) 
    channel.consume(queue, function(msg){
      let seconds = msg.content.toString().split('.').length - 1

      setTimeout(()=>{
        console.log("[x] done", msg.content.toString());

      },seconds * 1000)
      
    },{
      //confirmação manual de mensagem
      noAck: false
    });
  })
})

