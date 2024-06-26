const amqp = require('amqplib/callback_api')

amqp.connect(`amqp://localhost`, function(error0, connection){
  if(error0){
    throw error0
  }
  connection.createChannel(function(error1, channel){
    if(error1){
      throw error1
    }

    const exchange = `log`
    const msg = process.argv.slice(2).join(' ') || "Hello World!"

    channel.assertExchange(exchange, 'fanout',{
      durable:false
    })

    channel.publish(exchange, '', Buffer.from(msg))

    console.log(`[x] Sent ${msg}`)

  })

  setTimeout(()=>{
    connection.close()
    process.exit(0)
  },500)


})