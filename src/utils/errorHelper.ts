export class appError extends Error {
  constructor(name, message){
    super(message);
    this.name = name;
    this.message = message;
  }
}