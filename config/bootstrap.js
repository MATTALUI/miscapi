module.exports.bootstrap = async function() {
  // Users.destroy();
  // Vehicles.destroy();
  if (await Users.count() > 0) {
    return;
  }

  function randomFloat(floor, ceil){
    var float = 0.0;
    float += floor + (Math.random() * ceil);
    return +float.toFixed(2);
  }

  const matt = await Users.create({
    email: "matt@example.com",
    passwordHash: "####PASSWORD####",
    firstName: "Matthew",
    lastName: "Hummer",
    nickname: "MATTALUI",
    description: "I am Matt.",
  }).fetch();

  const vehicles = await Vehicles.createEach([
    {make: "Subaru", model: "Outback Impreza", year: "2006", nickname: "Matt's Car", owner: matt.id },
    {make: "Subaru", model: "Crosstrek", nickname: "Annie's Car", owner: matt.id },
    {make: "Harley-Davidson", model: "Street", year: "2015", nickname: "Matt's Bike", description: "It's super fly", owner: matt.id },
  ]).fetch();

  const logsToCreate = vehicles.map((v)=>({
      user: matt.id,
      vehicle: v.id,
      miles: randomFloat(1,5000),
      fillupAmount: randomFloat(1,20),
      fillupCost: randomFloat(1,50),
      coords: '40.5853° N, 105.0844° W',
      location: "gas station at fort collins"
    }));
    console.log("logs to create: ", logsToCreate);
  const logs = await AutoLogs.createEach(logsToCreate).fetch();

  
}
