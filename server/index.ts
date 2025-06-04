import PollApi, { type CacheElement } from "./PollApi/PollApi.ts";

const API_LIST = [
  "https://data--us-east.upscope.io/status?stats=1",
  "https://data--eu-west.upscope.io/status?stats=1",
  "https://data--eu-central.upscope.io/status?stats=1",
  "https://data--us-west.upscope.io/status?stats=1",
  "https://data--sa-east.upscope.io/status?stats=1",
  "https://data--ap-southeast.upscope.io/status?stats=1",
];

const INTERVAL = 1000;

function callback(update: CacheElement) {
  console.table(update);
}

const poller = new PollApi(callback);

API_LIST.forEach((url) => {
  poller.add(url, INTERVAL);
});
