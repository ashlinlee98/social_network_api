import mongoose from "mongoose";
import { createUser, getUserById } from "./social-network-api/controllers/userController.js";
import { createThought, getThoughtById } from "./social-network-api/controllers/thoughtController.js";

import("./social-network-api/config/connection.js").then(() => {
    console.log("Connected to MongoDB for CLI operations.");
    handleCLI();
});

function handleCLI() {
    const [,, command, ...args] = process.argv;

    switch (command) {
        case "addUser":
            createUserCommand(args);
            break;
        case "getUser":
            getUserByIdCommand(args[0]);
            break;
        case "addThought":
            createThoughtCommand(args);
            break;
        case "getThought":
            getThoughtByIdCommand(args[0]);
            break;
        default:
            console.log("Unknown command");
    }
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