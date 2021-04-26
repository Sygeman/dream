import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { XIcon } from '@dream/icons/x';

export type ModalProps = {
  routerKey: string;
  title?: string;
  minimal?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  minimal = false,
  title = '',
  routerKey,
  children,
}) => {
  const router = useRouter();
  const open = router && !!router.query[routerKey];

  const closeModal = () =>
    router.push({
      pathname: router.asPath.split('?')[0],
    });

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto min-h-screen"
        static
        open={open}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-backgorud opacity-90" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-xl rounded-lg">
              <div className="m-auto z-30 bg-surface rounded-lg overflow-hidden">
                {!minimal && (
                  <div className="bg-surface-light px-4 py-2 flex items-center">
                    <div className="flex flex-1 text-white text-sm">
                      {title}
                    </div>
                    <div className="pl-2 cursor-pointer" onClick={closeModal}>
                      <XIcon />
                    </div>
                  </div>
                )}
                <div className={!minimal ? 'p-4' : undefined}>{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
