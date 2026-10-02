const Event = require("../models/Event");
const Registration = require("../models/Registration");

const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    if (event.createdBy.equals(req.user._id))
      return res
        .status(400)
        .json({
          success: false,
          message: "You cannot register for your own event",
        });
    if (new Date(event.date) <= new Date())
      return res
        .status(400)
        .json({ success: false, message: "This event has already started" });

    const exists = await Registration.findOne({
      user: req.user._id,
      event: event._id,
    });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "You are already registered" });

    const count = await Registration.countDocuments({ event: event._id });
    if (count >= event.capacity)
      return res.status(400).json({ success: false, message: "Event is full" });

    const registration = await Registration.create({
      user: req.user._id,
      event: event._id,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Registration successful",
        registration,
      });
  } catch (error) {
    next(error);
  }
};

const cancelRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findOneAndDelete({
      user: req.user._id,
      event: req.params.id,
    });
    if (!registration)
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    res.json({ success: true, message: "Registration cancelled" });
  } catch (error) {
    next(error);
  }
};

const getEventRegistrations = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    if (!event.createdBy.equals(req.user._id))
      return res
        .status(403)
        .json({
          success: false,
          message: "Only the event owner can view registrations",
        });
    const registrations = await Registration.find({ event: event._id })
      .populate("user", "name email")
      .sort({ registeredAt: -1 });
    res.json({ success: true, registrations });
  } catch (error) {
    next(error);
  }
};

const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate({
        path: "event",
        populate: { path: "category", select: "name" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, registrations });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerForEvent,
  cancelRegistration,
  getEventRegistrations,
  getMyRegistrations,
};
