const messages = [
	{
		text: 'Hi there!',
		user: 'Alex',
		added: new Date(),
	},
	{
		text: 'Hello World!',
		user: 'Charles',
		added: new Date(),
	},
];

export function getAllMessages() {
	return messages.slice();
}

export function addNewMessageToMessages(newValue) {
	messages.push(newValue);
}
