import { task } from "@trigger.dev/sdk";

export const helloWorldTask = task({
  id: "hello-world",
  // Set an optional max duration in seconds. Default is 3600 (1 hour).
  maxDuration: 300,
  run: async (payload: { message: string }) => {
    console.log(`Hello World payload: ${payload.message}`);

    return {
      message: `Task Finished`,
    };
  },
});
