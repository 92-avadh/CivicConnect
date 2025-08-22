import Issue from '../models/Issue.js';

export const createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const image = req.file ? req.file.filename : '';

    const issue = await Issue.create({
      title,
      description,
      location,
      image,
      user: req.user.id
    });

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('user', 'name email');
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Issue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
