Um <span style='color:blue'>produtor</span> é um aplicativo de usuário que envia mensagens.
<br>
Uma <span style='color:blue'>fila</span>  é um buffer que armazena mensagens.
<br>
Um <span style='color:blue'>consumidor</span> é um aplicativo de usuário que recebe mensagens.
<br>

# Exchanges
A ideia central do modelo de mensagens no RabbitMQ é que o produtor nunca envie nenhuma mensagem diretamente para uma fila. Em vez disso, o produtor só pode enviar mensagens para uma exchange .
<br>

Existem alguns tipos de troca disponíveis : **direct, topic, headers and fanout**