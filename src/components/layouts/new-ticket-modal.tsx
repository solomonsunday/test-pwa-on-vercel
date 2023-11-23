import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const NewTicketModal = ({ isOpen, onClose, children } : ModalProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-end shadow-lg  h-screen"
        onClose={onClose}
      >
       
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <div className="bg-white rounded-lg h-screen p-6 w-1/4 right-0 flex flex-col">
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
  
  export default NewTicketModal;
  