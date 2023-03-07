class Message {
  sender;
  message;
  date;
  constructor(sender, message) {
    this.sender = sender;
    this.message = message;
    this.date = new Date();
  }
}
module.exports = {
  Message,
};
