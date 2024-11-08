import mongoose from "mongoose";
import Thought from "../models/Thought.js";

export const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching thoughts' });
  }
};  

export const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching thought' });
  }
};

export const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ message: 'Error creating thought' });
  }
};

export const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
    res.json(updatedThought);
    } catch (error) {
    res.status(500).json({ message: 'Error updating thought' });
    }
}

export const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });
    res.json({ message: 'Thought deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting thought' });
  }
};  

export const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    const reaction = {
      username: req.body.username || '',
    };

    thought.reactions.push(reaction);
    await thought.save();

    const newReaction = thought.reactions[thought.reactions.length - 1];

    res.json({ message: 'Reaction added', reactionId: newReaction._id, thought });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error adding reaction' });
  }
};



export const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    res.json({ message: 'Reaction deleted', thought });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting reaction' });
  }
};

