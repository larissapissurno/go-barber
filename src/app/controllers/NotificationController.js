import Notification from '../schemas/Notification';
import User from '../models/User';
import Appointment from '../models/Appointment';

class NotificationController {
  async index(req, res) {
    const limit = 20;
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(limit);

    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
