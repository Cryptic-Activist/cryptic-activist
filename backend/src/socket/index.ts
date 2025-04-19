import { Chat, Message, Notification, Trade } from './handlers';
import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';

const socketHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  io.on('connection', (socket: SocketIO) => {
    const chat = new Chat(socket, io);
    const notification = new Notification(socket, io);
    const message = new Message(socket, io);
    const trade = new Trade(socket, io);

    // Join website
    chat.join();

    // Join Trade
    chat.joinRoom();

    // Notify the vendor about new trade
    notification.tradeStartSent();

    // Send message in trade room
    message.sendMessage();

    // Set trade as Paid
    trade.setAsPaid();

    // Set trade payment as received
    trade.setAsPaymentConfirmed();

    // Set trade as Canceled
    trade.setAsCanceled();

    // Leave trade room
    chat.leave();

    // Disconnection handling
    chat.disconnect();
  });
};

export default socketHandler;
