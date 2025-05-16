import type { Channel, Connection } from 'amqplib';

import amqp from 'amqplib';

class RabbitMQ {
  private static instance: RabbitMQ;
  private connection!: Connection;
  private channel!: Channel;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }
    return RabbitMQ.instance;
  }

  public async connect(url = 'amqp://root:root@rabbitmq:5672'): Promise<void> {
    if (this.isConnected) return;

    try {
      // @ts-ignore
      this.connection = await amqp.connect(url);
      // @ts-ignore
      this.channel = await this.connection.createChannel();
      this.isConnected = true;

      this.connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err);
        this.isConnected = false;
      });

      this.connection.on('close', () => {
        console.warn('RabbitMQ connection closed');
        this.isConnected = false;
      });

      console.log('RabbitMQ connected');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  public getChannel(): Channel {
    if (!this.isConnected) {
      throw new Error('RabbitMQ is not connected. Call connect() first.');
    }
    return this.channel;
  }

  public async close(): Promise<void> {
    if (this.isConnected) {
      await this.channel.close();
      // @ts-ignore
      await this.connection.close();
      this.isConnected = false;
      console.log('🔌 RabbitMQ connection closed');
    }
  }
}

export default RabbitMQ;

export const connectRabbitMQ = async () => {
  const rabbitMQ = RabbitMQ.getInstance();
  await rabbitMQ.connect();
};
