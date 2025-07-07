import { Chat, Message, Notification, Timer, Trade } from './handlers';
import { DefaultEventsMap, Server, Socket as SocketIO } from 'socket.io';

const socketHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  io.on('connection', (socket: SocketIO) => {
    const chat = new Chat(socket, io);
    const notification = new Notification(socket, io);
    const message = new Message(socket, io);
    const trade = new Trade(socket, io);
    const timer = new Timer(socket, io);

    // Join website
    chat.join();

    // Join Trade
    chat.joinRoom();

    // Notify the vendor about new trade
    notification.tradeStartSent();

    // Send message in trade room
    message.sendMessage();

    // Signals that initial funding was successful
    trade.fundTradeSuccess();

    trade.sellerFundedTrade();

    trade.buyerFundedTrade();

    // Set trade as Paid
    trade.setAsPaid();

    // Set trade payment as received
    trade.setAsPaymentConfirmed();

    // Set trade as Canceled
    trade.setAsCanceled();

    // Set trade as Disputed
    trade.setAsDisputed();

    // Leave trade room
    chat.leave();

    // Disconnection handling
    chat.disconnect();

    // Notify the user about the trade being updated
    timer.update();

    // Notify the user about the trade being expired
    timer.expired();
  });
};

export default socketHandler;
