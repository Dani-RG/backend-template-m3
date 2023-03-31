const router = require('express').Router();
const Project = require('../models/Project');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// @desc    Get all projects
// @route   GET /projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one project
// @route   GET /projects/:projectId
// @access  Public
router.get('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    res.status(200).json(project);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one project
// @route   POST /projects
// @access  Private - Admin
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    if (foundation === "" || animal === "") {
      res.status(400).json({ message: 'All fields are necessary' });
      return;
    }
    res.status(201).json(newProject);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one project
// @route   PUT /projects/:projectId
// @access  Private - Admin
router.put('/:projectId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const response = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    if (foundation === "" || animal === "") {
      res.status(400).json({ message: 'All fields are necessary' });
      return;
    }
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one project
// @route   DELETE /projects/:projectId
// @access  Private - Admin
router.delete('/:projectId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;