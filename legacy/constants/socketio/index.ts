// Emits
export const JOIN = "join";
export const ADMIN_MESSAGE = "adminMessage";
export const MESSAGE = "message";
export const ROOM_DATA = "roomData";
export const ALERT_NEW_TRADE_STARTED = "alertNewTradeStarted";
export const GO_ONLINE = "goOnline";
export const DISCONNECT = "disconnect";
export const SEND_SYSTEM_MESSAGE = "sendSystemMessage";
export const END = "end";
export const SEND_CHAT_MESSAGE = "sendChatMessage";

// ROOMS
export const ONLINE_USERS = "onlineUsers";

// PAYLOAD
export const ALERT_NEW_TRADE_STARTED_PAYLOAD = (user) =>
	`${user.names.first_name} ${user.names.last_name} has started a new trade with you. Worry up, don't keep them waiting.`;

export const ADMIN_JOIN_MESSAGE = (trader, vendor) =>
	`Hi ${trader.names.first_name} ${trader.names.last_name}, a new trading alert was sent to ${vendor.names.first_name} ${vendor.names.last_name}, it will me arrive in a moment.`;

// OBJECTS
export const ADMIN_BOT_NAMES = {
	names: {
		first_name: "Cryptic",
		last_name: "Bot",
	},
};
