export const sayHello = (name: string = "World"): string =>
  `Hello, ${name}! Current time is ${new Date().toLocaleTimeString()}`;

console.log(sayHello());
