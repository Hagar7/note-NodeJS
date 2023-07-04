import noteModel from "../../../DB/models/note.model.js";

export const addNote = async (req, res, next) => {
  const { _id } = req.user;
  const { title, desc } = req.body;
  const note = new noteModel({ user: _id, title, desc });
  const result = await note.save();
  res.json({ message: "note addedd successfuly", result });
};

export const getUserNotes = async (req, res, next) => {
  const { _id } = req.user;
  const notes = await noteModel.find({ user: _id });
  if (notes.length) return res.json({ message: "Done", notes });
  next(Error("there is no notes"));
};

export const deleteNotes = async (req, res, next) => {
  const { _id } = req.user;
  const { noteId } = req.params;
  let result = await noteModel.findOneAndDelete({ user: _id, _id: noteId });
  if (!result)
    return next(new Error("Note not found or not authorized", { cause: 404 }));
  res.json({ message: "Done", result });
};

export const updateNotes = async (req, res, next) => {
  const { _id } = req.user;
  const { noteId } = req.params;
  const { title, desc } = req.body;
  const note = await noteModel.findOneAndUpdate(
    { _id: noteId, user: _id },
    { title, desc },
    { new: true }
  );
  if (!note)
    return next(new Error("Note not found or not authorized", { cause: 404 }));
  note && res.json({ message: "Done", note });
};
