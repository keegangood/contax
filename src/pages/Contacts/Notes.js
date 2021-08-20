import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Button, Row, Col, FormGroup, Label, Input } from "reactstrap";
import {
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineDelete,
} from "react-icons/ai";

import {
  addNote,
  editNote,
  updateNote,
  deleteNote,
  setNewNoteText,
  setUpdatedNoteText,
} from "../../state/NoteSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, newNoteText, updatedNoteText } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (
      newNoteText === "Duplicate note!" ||
      newNoteText === "Notes cannot be blank!"
    ) {
      setTimeout(() => {
        dispatch(setNewNoteText(""));
      }, 2000);
    }
  }, [newNoteText]);

  return (
    <div>
      <Row className="g-0 mb-2">
        <div xs={12}>
          <FormGroup className="p-3 pt-0">
            <Label htmlFor="newNote" className="field-label py-2 lead">
              Notes
            </Label>

            {notes && notes.length > 0 && (
              <Col
                className="bg-primary-light p-2 rounded mb-2"
                id="notes-list"
              >
                <Row className="g-0 p-2 relative">
                  {notes.map((note, noteIndex) => (
                    <div key={noteIndex}>
                      <Col xs={12} className="note p-2">
                        {note.editing ? (
                          <Row className="g-0 d-flex justify-content-center">
                            <Col xs={12} className="position-relative">
                              <Input
                                tag={"textarea"}
                                value={updatedNoteText}
                                autoFocus={true}
                                onChange={(e) =>
                                  dispatch(setUpdatedNoteText(e.target.value))
                                }
                              />
                              <span className="p-2 position-absolute d-flex flex-column top-0 end-0">
                                {/* CANCEL EDIT NOTE */}
                                <AiOutlineCloseCircle
                                  className="crud-icon cancel-icon mb-2"
                                  onClick={() => {
                                    dispatch(setUpdatedNoteText({updatedNoteText:""}));
                                    dispatch(
                                      editNote({ noteIndex, editing: false })
                                    );
                                  }}
                                />
                                {/* SAVE EDIT NOTE */}
                                <AiOutlineSave
                                  className="crud-icon save-icon mb-2"
                                  onClick={() => {
                                    dispatch(
                                      updateNote({ noteIndex, updatedNoteText })
                                    );
                                  }}
                                />
                              </span>
                            </Col>
                          </Row>
                        ) : (
                          <Row className="g-0 d-flex align-items-center">
                            <Col
                              xs={12}
                              className="p-4 rounded bg-light position-relative"
                            >
                              {note.text}
                              <span className="position-absolute top-0 end-0 d-flex flex-column p-2">
                                {/* DELETE NOTE */}
                                <AiOutlineDelete
                                  className="mb-2 crud-icon delete-icon"
                                  onClick={() => {
                                    dispatch(deleteNote({ noteIndex }));
                                  }}
                                />
                                {/* EDIT NOTE */}
                                <AiOutlineEdit
                                  className="crud-icon edit-icon"
                                  onClick={() => {
                                    dispatch(setUpdatedNoteText(note.text));
                                    dispatch(
                                      editNote({ noteIndex, editing: true })
                                    );
                                  }}
                                />
                              </span>
                            </Col>
                          </Row>
                        )}
                      </Col>
                      <Col xs={2} className="d-flex align-items-center"></Col>
                    </div>
                  ))}
                </Row>
              </Col>
            )}

            <Input
              className="form-field"
              id="newNote"
              type="text"
              name="newNote"
              value={newNoteText}
              onChange={(e) => dispatch(setNewNoteText(e.target.value))}
            />
            <Button
              color="secondary"
              size="sm"
              className="text-light my-2"
              onClick={() => {
                if (newNoteText && newNoteText !== "Notes cannot be blank!") {
                  dispatch(setNewNoteText({newNoteText:''}));
                  dispatch(addNote({ newNoteText }));
                } else {
                  dispatch(setNewNoteText("Notes cannot be blank!"));
                }
              }}
            >
              Add
            </Button>
          </FormGroup>
        </div>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    newNoteText: state.notes.newNoteText,
    newUpdatedText: state.notes.newUpdatedText,
  };
};

export default connect(mapStateToProps)(Notes);
