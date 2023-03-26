import React, { FC } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { AiFillCloseCircle } from 'react-icons/ai';

interface ModalPropsTypes {
  visible: boolean;
  setVisible(modal: boolean): void;
  children: React.ReactNode;
}

export const Modal: FC<ModalPropsTypes> = ({
  children,
  visible,
  setVisible,
}) => {
  const handleModal = () => {
    setVisible(false);
  };
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div
      className={classNames(styles.modal, { modal__active: visible })}
      onClick={handleModal}
    >
      <div className={classNames(styles.modal__content)} onClick={(e) => e.stopPropagation()}>
        <>
          <div className={classNames(styles.modal__close)} onClick={handleClose}>
            <AiFillCloseCircle className={classNames(styles.modal__icon)}/>
          </div>
          {children}
        </>
      </div>
    </div>
  );
};