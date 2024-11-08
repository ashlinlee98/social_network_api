import mongoose from "mongoose";
import inquirer from "inquirer";
import { createUser, getUserById } from "./social-network-api/controllers/userController.js";
import { createThought, getThoughtById } from "./social-network-api/controllers/thoughtController.js";

import("./social-network-api/config/connection.js").then(() => {
    console.log("Connected to MongoDB for CLI operations.");
    showMenu();
});

async function showMenu() {
    const { command } = await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose an action:',
        choices: [
            'Add User',
            'Get User',
            'Add Thought',
            'Get Thought',
            'Exit'
        ],
    });

    switch (command) {
        case 'Add User':
            await addUserPrompt();
            break;
        case 'Get User':
            await getUserPrompt();
            break;
        case 'Add Thought':
            await addThoughtPrompt();
            break;
        case 'Get Thought':
            await getThoughtPrompt();
            break;
        case 'Exit':
            console.log("Exiting CLI.");
            process.exit();
    }

    showMenu();
}

async function addUserPrompt() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'username', message: 'Enter username:' },
        { type: 'input', name: 'email', message: 'Enter email:' },
    ]);
    await createUserCommand([answers.username, answers.email]);
}

async function getUserPrompt() {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter user ID:' },
    ]);
    await getUserByIdCommand(id);
}

async function addThoughtPrompt() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'thoughtText', message: 'Enter thought text:' },
        { type: 'input', name: 'username', message: 'Enter username for the thought:' },
    ]);
    await createThoughtCommand([answers.thoughtText, answers.username]);
}

async function getThoughtPrompt() {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter thought ID:' },
    ]);
    await getThoughtByIdCommand(id);
}

async function createUserCommand(args) {
    const [username, email] = args;
    try {
        const user = await createUser({ username, email });
        console.log("User added:", user);
    } catch (error) {
        console.error("Error adding user:", error);
    }
}

async function getUserByIdCommand(id) {
    try {
        const user = await getUserById(id);
        console.log("User details:", user);
    } catch (error) {
        console.error("Error retrieving user:", error);
    }
}

async function createThoughtCommand(args) {
    const [thoughtText, username] = args;
    try {
        const thought = await createThought({ thoughtText, username });
        console.log("Thought added:", thought);
    } catch (error) {
        console.error("Error adding thought:", error);
    }
}

async function getThoughtByIdCommand(id) {
    try {
        const thought = await getThoughtById(id);
        console.log("Thought details:", thought);
    } catch (error) {
        console.error("Error retrieving thought:", error);
    }
}
