const Event = require("../models/Event");
const Registration = require("../models/Registration");

const getEvents = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search)
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } },
      ];

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 6, 1), 20);
    const skip = (page - 1) * limit;
    const [events, total] = await Promise.all([
      Event.find(filter)
        .populate("category", "name")
        .populate("createdBy", "name")
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit),
      Event.countDocuments(filter),
    ]);

    const withCounts = await Promise.all(
      events.map(async (event) => {
        const registered = await Registration.countDocuments({
          event: event._id,
        });
        return { ...event.toObject(), registered };
      }),
    );

    res.json({
      success: true,
      events: withCounts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("category", "name")
      .populate("createdBy", "name email");
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    const registered = await Registration.countDocuments({ event: event._id });
    res.json({ success: true, event: { ...event.toObject(), registered } });
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, capacity, category } = req.body;
    if (new Date(date) <= new Date())
      return res
        .status(400)
        .json({ success: false, message: "Event date must be in the future" });
    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      category,
      createdBy: req.user._id,
    });
    const populated = await event.populate("category", "name");
    res
      .status(201)
      .json({ success: true, message: "Event created", event: populated });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    if (String(event.createdBy) !== String(req.user._id))
      return res
        .status(403)
        .json({ success: false, message: "You can only edit your own events" });

    const registered = await Registration.countDocuments({ event: event._id });
    if (req.body.capacity && Number(req.body.capacity) < registered)
      return res
        .status(400)
        .json({
          success: false,
          message: `Capacity cannot be less than ${registered}`,
        });
    if (req.body.date && new Date(req.body.date) <= new Date())
      return res
        .status(400)
        .json({ success: false, message: "Event date must be in the future" });

    Object.assign(event, req.body);
    await event.save();
    const updated = await Event.findById(event._id)
      .populate("category", "name")
      .populate("createdBy", "name");
    res.json({
      success: true,
      message: "Event updated",
      event: { ...updated.toObject(), registered },
    });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    if (String(event.createdBy) !== String(req.user._id))
      return res
        .status(403)
        .json({
          success: false,
          message: "You can only delete your own events",
        });
    await Registration.deleteMany({ event: event._id });
    await event.deleteOne();
    res.json({ success: true, message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};

const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ createdBy: req.user._id })
      .populate("category", "name")
      .sort({ date: 1 });
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
};
