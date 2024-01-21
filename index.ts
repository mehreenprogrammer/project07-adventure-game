
import chalk from "chalk";
import inquirer from "inquirer";

class Player {
  name: string;
  health: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 25;
  }

  increaseHealth() {
    this.health = 100;
  }
}

class Enemy {
  name: string;
  health: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 25;
  }
}

async function startGame() {
  console.log(chalk.yellow.bold("Welcome to KGF - The Game"));
  console.log(chalk.yellow("Fight to survive in the Kolar Gold Fields!\n"));

  const player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please enter your name (Rocky):",
  });

  const selectedEnemy = await inquirer.prompt({
    type: "list",
    name: "enemy",
    message: "Select your opponent:",
    choices: ["Garuda", "Suryavardhan", "Adheera"],
  });

  const player1 = new Player(player.name);
  const enemy1 = new Enemy(selectedEnemy.enemy);

  console.log(chalk.yellow.bold(`Get ready to fight against ${enemy1.name} in the KGF arena!\n`));

  console.log(chalk.yellow("You found a Kalashnikov gun! It's time to fight!\n"));

  while (true) {
    const action = await inquirer.prompt({
      type: "list",
      name: "choice",
      message: "Choose your action:",
      choices: ["Attack with Kalashnikov", "Drink health potion", "Retreat"],
    });

    if (action.choice === "Attack with Kalashnikov") {
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber > 0) {
        player1.decreaseHealth();
        console.log(chalk.red.bold(`${player1.name}'s health is ${player1.health}`));
        console.log(chalk.green.bold(`${enemy1.name}'s health is ${enemy1.health}`));
        if (player1.health <= 0) {
          console.log(chalk.red.bold.italic("You lose! Remember, Rocky, a king is never defeated!"));
          break;
        }
      } else {
        enemy1.decreaseHealth();
        console.log(chalk.green.bold(`${player1.name}'s health is ${player1.health}`));
        console.log(chalk.red.bold(`${enemy1.name}'s health is ${enemy1.health}`));
        if (enemy1.health <= 0) {
          console.log(chalk.green.bold.italic("You win! Victory belongs to Rocky!"));
          console.log(chalk.yellow.bold("Violence! Violence! Violence! I dont like, I Avoid.… but Violence likes me, I cant Avoid."));

          console.log(chalk.yellow.bold("Gang lekar aane wale hote hai gangster… mein akela aata hun… Monster."));
          break;
        }
      }
    } else if (action.choice === "Drink health potion") {
      player1.increaseHealth();
      console.log(chalk.bold.green(`${player1.name} drinks a health potion, health is restored! Health: ${player1.health}`));
    } else if (action.choice === "Retreat") {
      console.log(chalk.red.bold.italic("You retreat! But remember, Rocky never quits!"));
      break;
    }
  }
}

startGame();
