import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { addMorningRecord, addEveningRecord, getRecords } from "./reportingService.js";


Deno.test("Get Records ", async () => {
  const results = [
    {
      "completed_on": new Date("2020-12-07T08:38:30.754Z"),
      "id": 38,
      "name": "",
      "started_on": new Date("2020-12-07T08:38:27.869Z"),
    },
    {
      "completed_on": new Date("2020-12-07T07:12:58.549Z"),
      "id": 37,
      "name": "",
      "started_on": new Date("2020-12-07T07:12:57.570Z")
    },
    {
      "completed_on": new Date("2020-12-06T15:35:51.486Z"),
      "id": 36,
      "name": "Buy chocolate ice cream",
      "started_on": new Date("2020-12-06T15:35:46.391Z"),
    },
    {
      "completed_on": new Date("2020-12-06T15:36:07.407Z"),
      "id": 35,
      "name": "Eat pizza",
      "started_on": new Date("2020-12-06T15:36:06.296Z"),
    },
    {
      "completed_on": new Date("2020-12-06T15:35:56.467Z"),
      "id": 34,
      "name": "Bake pizza",
      "started_on": new Date("2020-12-06T15:35:55.549Z"),
    }
  ]
  assertEquals(await getRecords(), results);
});

Deno.test("Post Record ", async () => {
  assertEquals(await addMorningRecord(), 'Ok!');
});
