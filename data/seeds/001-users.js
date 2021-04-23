exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("users")
    .truncate()
    .then(function () {
      return knex("hobbits").insert([
        {
          name: "bob",
          password:
            "$2a$08$knAQnpfNjwREhORuq2kuqu0OKcpnJHlgG35oQPGs/rEzEo4bNuM7i",
        },
      ]);
    });
};
