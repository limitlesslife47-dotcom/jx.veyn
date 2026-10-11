const fs = require('fs');
const readline = require('readline');

// 1. Read the Veyn database
const rawData = fs.readFileSync('inventory.json');
const database = JSON.parse(rawData);

// 2. Setup the interactive terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runDailyVeyn(weatherCondition, timeOfDay, isSick) {
  console.log(`\n=== ⚡ VEYN OS BOOTING ⚡ ===`);
  console.log(`Status: ${isSick ? 'SICK MODE ACTIVATED 🤒' : 'Optimal Health 🟢'}`);
  console.log(`Time: ${timeOfDay} | Weather: ${weatherCondition}\n`);

  // --- STYLE MODULE ---
  console.log(`[ 👕 STYLE PROTOCOL ]`);
  if (isSick) {
    console.log(`Rest day. Wear your most comfortable clothes. No need to dress up.`);
  } else {
    const tops = database.wardrobe.filter(item => item.type === "Top" && (item.weather === weatherCondition || item.weather === "Any"));
    const bottoms = database.wardrobe.filter(item => item.type === "Bottom" && (item.weather === weatherCondition || item.weather === "Any"));
    
    // Safety check in case no clothes match
    if (tops.length > 0 && bottoms.length > 0) {
        const chosenTop = tops[Math.floor(Math.random() * tops.length)];
        const chosenBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
        console.log(`Top: ${chosenTop.item} (${chosenTop.style})`);
        console.log(`Bottom: ${chosenBottom.item} (${chosenBottom.style})`);
    } else {
        console.log(`No specific clothes found for this weather in your inventory. Grab your favorites.`);
    }
  }

  // --- HEALTH & SKIN MODULE ---
  console.log(`\n[ 🧴 HEALTH & SKIN PROTOCOL ]`);
  const routineSkin = database.skincare.filter(item => item.time.toLowerCase().includes(timeOfDay.toLowerCase()) || item.time === "Morning and Night");
  
  if (isSick) {
    console.log(`Skincare: Just wash with water and rest. Skip the complex stuff.`);
  } else {
    console.log(`Skincare Routine:`);
    routineSkin.length > 0 ? routineSkin.forEach(item => console.log(` - Use ${item.name}`)) : console.log(` - Nothing scheduled.`);
  }

  const routineSupps = database.supplements.filter(item => item.timing.toLowerCase().includes(timeOfDay.toLowerCase()));
  if (routineSupps.length > 0) {
    console.log(`Supplements:`);
    routineSupps.forEach(item => console.log(` - Take ${item.name} (${item.purpose})`));
  } else {
    console.log(`Supplements: None needed right now.`);
  }
  
  console.log(`=============================\n`);
}

// 3. Ask the user for current conditions
rl.question('What is the weather like? (Warm/Cold/Any): ', (weather) => {
  rl.question('What time of day is it? (Morning/Night): ', (time) => {
    rl.question('Are you feeling sick? (yes/no): ', (sickInput) => {
      const isSick = sickInput.toLowerCase() === 'yes';
      
      // Run the engine with the user's answers
      runDailyVeyn(weather, time, isSick);
      
      // Close the prompt
      rl.close();
    });
  });
});