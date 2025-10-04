import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { calculateDronPosition } from './positioning/calculateDronPosition';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SensorGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket сервер инициализирован');
  }

  handleConnection(client: Socket) {
    console.log(`Клиент подключён: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Клиент отключён: ${client.id}`);
  }

  @SubscribeMessage('sensor_data')
  handleSensorData(
    @MessageBody()
    data: {
      sensor1: number;
      sensor2: number;
      sensor3: number;
    },
  ): void {
    const { sensor1, sensor2, sensor3 } = data;

    const position = calculateDronPosition([sensor1, sensor2, sensor3]);

    position
      ? console.log('Позиция дрона:', position)
      : console.log('Ошибка при получении позиции: ', sensor1, sensor2, sensor3);

    console.log('Данные от датчиков получены:');
    console.log(`Датчик 1: ${sensor1}`);
    console.log(`Датчик 2: ${sensor2}`);
    console.log(`Датчик 3: ${sensor3}`);
  }
}
