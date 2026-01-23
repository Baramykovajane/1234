'use client';

import { useRouter } from 'next/navigation';
import css from "@/styles/Modal.module.css";

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={close}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

