const goalControllers = {
  // @desc Get goal
  // @route Get /api/goal
  // @access Private
  getGoal: async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Get goal'
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
      res.status(200).json({
        success: true,
        message: 'Set goal'
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
