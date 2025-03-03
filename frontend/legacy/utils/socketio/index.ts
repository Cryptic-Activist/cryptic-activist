import io from 'socket.io-client';

const ENDPOINT = process.env.CHAT_API;

const socket = io(ENDPOINT);

export function emit(type: string, data?: any) {
	// if (data) {
	//   socket.emit(type, data, (error) => {
	//     if (error) {
	//       alert(error);
	//     }
	//   });
	// } else {
	//   socket.emit(type);
	// }
}

export function on(type: string, callback: any) {
	// socket.on(type, callback);
}

export function off() {
	// socket.off();
}
