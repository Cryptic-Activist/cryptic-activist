import RabbitMQ from '@/utils/rabbitmq';
import { sendEmail } from '../email';

export const publishToQueue = async (
  queue: string,
  message: { [key: string]: any },
) => {
  try {
    const rabbitMQ = RabbitMQ.getInstance();
    const channel = rabbitMQ.getChannel();

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    return {
      sent: true,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export const startEmailConsumer = async (): Promise<void> => {
  try {
    const rabbitMQ = RabbitMQ.getInstance();
    await rabbitMQ.connect();
    const channel = rabbitMQ.getChannel();
    const queue = 'emails';

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        await sendEmail(content as any);
        channel.ack(msg);
      }
    });

    console.log(`Listening on queue: ${queue}`);
  } catch (error) {
    console.log(error);
  }
};
