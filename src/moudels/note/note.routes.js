import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as noteController from "./notes.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as noteValidation from "./note.validation.js";

const router = Router();

router
  .route("/")
  .post(
    auth(),
    validation(noteValidation.addSchema),
    asyncHandler(noteController.addNote)
  )
  .get(auth(), asyncHandler(noteController.getUserNotes));

router
  .route("/:noteId")
  .delete(
    auth(),
    validation(noteValidation.deleteSchema),
    asyncHandler(noteController.deleteNotes)
  )
  .put(
    auth(),
    validation(noteValidation.updateSchema),
    asyncHandler(noteController.updateNotes)
  );

export default router;
