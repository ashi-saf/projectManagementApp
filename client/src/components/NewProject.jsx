import { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

export default function NewProject({ onAdd, onStop }) {
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const dialogRef = useRef();
  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredDate = dateRef.current.value;
    if (
      enteredTitle.trim() === '' ||
      enteredDesc.trim() === '' ||
      enteredDate.trim() === ''
    ) {
      dialogRef.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDesc,
      dueDate: enteredDate,
    });
  }
  return (
    <>
      <Modal ref={dialogRef} btnCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          OOps... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onStop}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" title="Title" ref={titleRef} />
          <Input title="Description" textarea ref={descRef} />
          <Input type="date" title="DueDate" ref={dateRef} />
        </div>
      </div>
    </>
  );
}
