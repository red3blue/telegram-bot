import axios from "axios";

async function start() {
  try {
    console.log("Hello World");
    return true
  } catch (error) {
    console.log(error);
  }
}

start();
