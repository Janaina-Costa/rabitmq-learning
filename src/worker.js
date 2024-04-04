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

    //durable: true -> garante que a fila não será perdida quando o rabbitmq server for reiniciado. deve ser configurada no produtor e no consumidor
    channel.assertQueue(queue,{
      durable: true,
    })
    //prefetch: 1 -> garante que o worker só receberá uma mensagem por vez. Caso o worker morra, a mensagem não será perdida porque o rabbitmq não a deletou e entenderá que a mensagem não foi processada
    channel.prefetch(1)

    console.log("[*] Waiting form message in %s. To exit press CTRL+C", queue) 

    channel.consume(queue, function(msg){
      let seconds = msg.content.toString().split('.').length - 1

      setTimeout(()=>{
        console.log("[x] done", msg.content.toString());
        channel.ack(msg)

      },seconds * 1000)
      
    },{
      //confirmação manual de mensagem recebida. Caso o worker morra, a mensagem não será perdida porque o rabbitmq não a deletou e entenderá que a mensagem não foi processada
      noAck: false
    });
  })
})

