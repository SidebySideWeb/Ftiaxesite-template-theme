module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      startServerCommand: "npm run start",
      startServerReadyPattern: "started server on|ready on|started on|Listening on|listening on|Ready on|ready at|started at|ready|listening",
      numberOfRuns: 3
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
