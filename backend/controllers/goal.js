import Goal from '../models/goal.js';
import User from '../models/user.js';

const goalControllers = {
  // @desc Get goal
  // @route Get /api/goal
  // @access Private
  getGoal: async (req, res) => {
    try {
      const goals = await Goal.find({ user: req.user.id });

      res.status(200).json({
        success: true,
        goals
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        err: err.message || 'The goals not found'
      });
    }
  },
  // @desc Add goal
  // @route POST /api/goal
  // @access Private
  addGoal: async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(401).json({
          success: false,
          message: 'Please entered your goal'
        });
      }

      const goal = await Goal.create({
        text: text,
        user: req.user.id
      });
      res.status(200).json({
        success: true,
        message: 'Set goal',
        goal
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        err: err.message || 'Goal not added'
      });
    }
  },
  // @desc Update goal
  // @route PUT /api/goal/:id
  // @access Private
  updateGoal: async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;

      const goal = await Goal.findById(id);

      if (!goal) {
        return res.status(400).json({
          success: false,
          message: 'Goal not found'
        });
      }

      if (!req.user) {
        return res.status(400).json({
          success: false,
          message: 'User not found'
        });
      }

      if (goal.user.toString() !== req.user.body) {
        return res.status(400).json({
          success: false,
          message: 'User not authorization'
        });
      }

      const updatedGoal = await Goal.findByIdAndUpdate(
        { _id: id },
        { text },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: `Update goal ${id}`
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        err: err.message || 'Goal not updated'
      });
    }
  },
  // @desc Delete goal
  // @route Delete /api/goal/:id
  // @access Private
  deleteGoal: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteGaol = await Goal.findById({ _id: id });

      if (!deleteGaol) {
        return res.status(400).json({
          success: false,
          message: 'Goal not found'
        });
      }
      if (!req.user) {
        return res.status(400).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!deleteGaol.toString() !== req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'User not found'
        });
      }

      await deleteGaol.remove();

      res.status(200).json({
        success: true,
        message: `Delete goal ${id}`
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        err: err.message || 'Goal not deleted'
      });
    }
  }
};

export default goalControllers;
