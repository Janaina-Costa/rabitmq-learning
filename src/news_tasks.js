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
    const msg = process.argv.slice(2).join(' ') || "Hello World!";
  
    //durable: true -> garante que a fila não será perdida quando o rabbitmq server for reiniciado. deve ser configurada no produtor e no consumidor
    channel.assertQueue(queue, {
      durable: true,
    })
    
    //persistent: true -> garante que a mensagem não será perdida quando o rabbitmq server for reiniciado. deve ser configurada no produtor
    channel.sendToQueue(queue, Buffer.from(msg),{
      persistent: true
    })

    console.log(`[x] Sent ${msg}`)
    
  })
  setTimeout(()=>{
    connection.close()
    process.exit(0)
  },500)
})
