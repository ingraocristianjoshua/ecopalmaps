import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import Close from "../icons/Close";
import styled from "styled-components";

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
}

const ModalHeader = styled.div`
    display: flex;
    padding: 24px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

const ModalTitle = styled.div`
    display: block;
    font-weight: 700;
    color: #000000;
    font-size: inherit;
`;

const CloseModal = styled.div`
    display: block;
    cursor: pointer;
`;

const ModalContent = styled.div`
    padding-top: 0px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
    max-height: 65vh;
    overflow-y: auto;
`;

export const Modal: FunctionComponent<ModalProps> = ({
    isShown,
    hide,
    modalContent,
    headerText,
}) => {
    const modal = (
        <ReactModal
            isOpen={isShown}
            contentLabel={headerText}
            overlayClassName={"modal-overlay"}
            className={"modal"}
            bodyOpenClassName={"not-scrolling"}
            ariaHideApp={false}
            onRequestClose={hide}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <ModalHeader>
                <ModalTitle>{headerText}</ModalTitle>
                <CloseModal
                    role="button"
                    title="Close modal"
                    onClick={hide}
                    tabIndex={0}
                >
                    <Close type="normal" />
                </CloseModal>
            </ModalHeader>
            <ModalContent>{modalContent}</ModalContent>
        </ReactModal>
    );
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
