import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ ref, header, content, footer }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          modalRef.current.showModal();
        },
        close: () => {
          modalRef.current.close();
        },
      };
    },
    []
  );

  const handleBackdropClick = e => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();

      const isOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (isOutside) {
        modalRef.current.close();
      }
    }
  };

  return createPortal(
    <dialog
      ref={modalRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-slate-900/70 absolute z-50 w-1/2 h-1/2 text-green-900 rounded-xl"
    >
      <div ref={contentRef} className="h-full">
        {header}
        {content}
        {footer}
      </div>
    </dialog>,
    document.getElementById('modal-root')
  );
};
