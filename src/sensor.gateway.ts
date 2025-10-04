import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(SensorGateway.name);

  afterInit(server: Server) {
    this.logger.log('WebSocket сервер инициализирован');
    server.use((socket, next) => {
      try {
        const { address, query } = socket.handshake;
        this.logger.log(
          `Handshake: id=${socket.id} ip=${address} query=${JSON.stringify(
            query,
          )}`,
        );
      } catch (e) {
        this.logger.warn(`Ошибка при логировании handshake: ${String(e)}`);
      }
      next();
    });
  }

  handleConnection(client: Socket) {
    const ip = client.handshake?.address;
    this.logger.log(`Клиент подключён: id=${client.id} ip=${ip ?? 'unknown'}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Клиент отключён: ${client.id}`);
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
    this.logger.debug('Получены данные sensor_data');
    const position = calculateDronPosition([sensor1, sensor2, sensor3]);

    if (position) {
      this.logger.log(`Позиция дрона: ${JSON.stringify(position)}`);
    } else {
      this.logger.warn(
        `Ошибка при получении позиции: ${sensor1}, ${sensor2}, ${sensor3}`,
      );
    }

    this.logger.log('Данные от датчиков получены');
    this.logger.debug(`Датчик 1: ${sensor1}`);
    this.logger.debug(`Датчик 2: ${sensor2}`);
    this.logger.debug(`Датчик 3: ${sensor3}`);
  }
}
