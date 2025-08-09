import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import "./BookmarkModal.css"; // 모달 스타일을 위한 CSS 파일

/**
 * React 모달 컴포넌트
 * 완전히 접근 가능하고 반응형이며 재사용 가능한 모달 시스템
 *
 * @param {Object} props - 모달 컴포넌트 속성
 * @param {boolean} isOpen - 모달 열림/닫힘 상태 (기본값: false)
 * @param {function} onClose - 모달이 닫힐 때 호출되는 함수
 * @param {string} title - 모달 제목 (선택사항)
 * @param {React.ReactNode} children - 모달 내용
 * @param {string} size - 모달 크기: 'small', 'default', 'large', 'full' (기본값: 'default')
 * @param {string} className - 추가 CSS 클래스 (기본값: '')
 * @param {boolean} showCloseButton - 닫기 버튼 표시 여부 (기본값: true)
 * @param {boolean} closeOnOverlayClick - 오버레이 클릭 시 닫기 (기본값: true)
 * @param {boolean} closeOnEscape - ESC 키로 닫기 (기본값: true)
 * @param {boolean} preventBodyScroll - 모달 열림 시 body 스크롤 방지 (기본값: true)
 * @param {string} ariaLabelledBy - ARIA labelledby 속성
 * @param {string} ariaDescribedBy - ARIA describedby 속성
 * @param {React.ReactNode} footer - 커스텀 푸터 요소
 * @param {React.ReactNode} header - 커스텀 헤더 요소
 * @param {number} zIndex - z-index 값 (기본값: 1000)
 * @param {number} animationDuration - 애니메이션 지속 시간 (기본값: 300ms)
 * @param {function} onOpen - 모달이 열릴 때 호출되는 콜백
 * @param {function} onAfterOpen - 모달이 완전히 열린 후 호출되는 콜백
 * @param {function} onAfterClose - 모달이 완전히 닫힌 후 호출되는 콜백
 */
const BookmarkModal = ({
  isOpen = false,
  onClose,
  title = "",
  children,
  size = "default",
  className = "",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  ariaLabelledBy,
  ariaDescribedBy,
  footer,
  header,
  zIndex = 1000,
  animationDuration = 300,
  onOpen,
  onAfterOpen,
  onAfterClose,
  ...props
}) => {
  // 모달 표시 상태 (애니메이션과 별개로 DOM에 렌더링 여부 결정)
  const [isVisible, setIsVisible] = useState(false);

  // 닫기 애니메이션 진행 상태 (닫기 애니메이션 중일 때 true)
  const [isClosing, setIsClosing] = useState(false);

  // 모달 컨테이너 DOM 요소 참조
  const modalRef = useRef(null);

  // 오버레이 DOM 요소 참조 (클릭 감지용)
  const overlayRef = useRef(null);

  // 모달이 열리기 전 포커스된 요소 저장 (모달 닫힐 때 복원용)
  const previousFocusRef = useRef(null);

  // 포커스 가능한 첫 번째 요소 참조
  const firstFocusableRef = useRef(null);

  // 포커스 가능한 마지막 요소 참조
  const lastFocusableRef = useRef(null);

  // 모달 열기 처리 효과
  useEffect(() => {
    if (isOpen && !isVisible) {
      // 현재 포커스된 요소 저장 (모달 닫힐 때 복원하기 위해)
      previousFocusRef.current = document.activeElement;

      // body 스크롤 방지 설정
      if (preventBodyScroll) {
        document.body.style.overflow = "hidden";
      }

      // 모달 표시 상태 설정
      setIsVisible(true);

      // onOpen 콜백 호출
      if (onOpen) {
        onOpen();
      }

      // 열기 애니메이션 완료 후 포커스 설정 및 onAfterOpen 콜백 호출
      const timer = setTimeout(() => {
        focusFirstElement();
        if (onAfterOpen) {
          onAfterOpen();
        }
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [
    isOpen,
    isVisible,
    preventBodyScroll,
    animationDuration,
    onOpen,
    onAfterOpen,
  ]);

  // 모달 닫기 처리 함수
  const handleClose = useCallback(() => {
    if (!isVisible) return;

    // 닫기 애니메이션 시작
    setIsClosing(true);

    const timer = setTimeout(() => {
      // 모달 숨기기
      setIsVisible(false);
      setIsClosing(false);

      // body 스크롤 복원
      if (preventBodyScroll) {
        document.body.style.overflow = "";
      }

      // 이전 포커스 복원
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      // 콜백 함수들 호출
      if (onClose) {
        onClose();
      }
      if (onAfterClose) {
        onAfterClose();
      }
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [isVisible, preventBodyScroll, animationDuration, onClose, onAfterClose]);

  // isOpen prop이 false로 변경될 때 모달 닫기
  useEffect(() => {
    if (!isOpen && isVisible) {
      handleClose();
    }
  }, [isOpen, isVisible, handleClose]);

  // ESC 키 처리 효과
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && closeOnEscape && isVisible && !isClosing) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isVisible, isClosing, closeOnEscape, handleClose]);

  // 포커스 가능한 요소들 찾기 함수
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];

    // 포커스 가능한 요소들의 CSS 선택자
    const focusableSelectors = [
      "button:not([disabled])",
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    const focusableElements = modalRef.current.querySelectorAll(
      focusableSelectors.join(", ")
    );

    // 실제로 보이는 요소들만 필터링
    return Array.from(focusableElements).filter((element) => {
      return element.offsetWidth > 0 && element.offsetHeight > 0;
    });
  }, []);

  // 첫 번째 포커스 가능한 요소에 포커스 설정
  const focusFirstElement = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current =
        focusableElements[focusableElements.length - 1];
    }
  }, [getFocusableElements]);

  // Tab 키 처리 (포커스 트래핑)
  const handleTabKey = useCallback(
    (event) => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: 역방향 탭
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: 정방향 탭
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements]
  );

  // 키보드 이벤트 처리
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Tab") {
        handleTabKey(event);
      }
    },
    [handleTabKey]
  );

  // 오버레이 클릭 처리
  const handleOverlayClick = useCallback(
    (event) => {
      if (closeOnOverlayClick && event.target === overlayRef.current) {
        handleClose();
      }
    },
    [closeOnOverlayClick, handleClose]
  );

  // 모달이 보이지 않으면 렌더링하지 않음
  if (!isVisible) {
    return null;
  }

  // 모달 콘텐츠 JSX
  const modalContent = (
    <div
      className={`react-modal ${
        isClosing ? "react-modal--animating" : ""
      } ${className}`}
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy || (title ? "modal-title" : undefined)}
      aria-describedby={ariaDescribedBy}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {/* 오버레이 (배경) */}
      <div
        ref={overlayRef}
        className="react-modal__overlay"
        onClick={handleOverlayClick}
      />

      {/* 모달 컨테이너 */}
      <div
        ref={modalRef}
        className={`react-modal__container react-modal__container--${size}`}
        role="document"
      >
        {/* 헤더 영역 */}
        {(header || title || showCloseButton) && (
          <div className="react-modal__header">
            {header || (
              <>
                {/* 제목 */}
                {title && (
                  <h2 id="modal-title" className="react-modal__title">
                    {title}
                  </h2>
                )}
                {/* 닫기 버튼 */}
                {showCloseButton && (
                  <button
                    type="button"
                    className="react-modal__close"
                    onClick={handleClose}
                    aria-label="모달 닫기"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* 본문 영역 */}
        <div className="react-modal__body">{children}</div>

        {/* 푸터 영역 */}
        {footer && <div className="react-modal__footer">{footer}</div>}
      </div>
    </div>
  );

  // 포털을 사용하여 body에 모달 렌더링
  return ReactDOM.createPortal(modalContent, document.body);
};

/**
 * 모달 상태 관리를 위한 커스텀 훅
 *
 * @param {boolean} initialState - 초기 열림 상태 (기본값: false)
 * @returns {Object} 모달 상태와 제어 함수들
 * @returns {boolean} isOpen - 현재 모달 열림 상태
 * @returns {function} openModal - 모달 열기 함수
 * @returns {function} closeModal - 모달 닫기 함수
 * @returns {function} toggleModal - 모달 토글 함수
 * @returns {function} setIsOpen - 모달 상태 직접 설정 함수
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  // 모달 열기 함수
  const openModal = useCallback(() => setIsOpen(true), []);

  // 모달 닫기 함수
  const closeModal = useCallback(() => setIsOpen(false), []);

  // 모달 토글 함수 (열려있으면 닫고, 닫혀있으면 열기)
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen,
  };
};

/**
 * 확인 모달 컴포넌트
 * 사용자의 확인이 필요한 작업에 사용
 *
 * @param {Object} props - 확인 모달 속성
 * @param {boolean} isOpen - 모달 열림 상태
 * @param {function} onClose - 모달 닫기 함수
 * @param {function} onConfirm - 확인 버튼 클릭 시 호출되는 함수
 * @param {string} title - 모달 제목 (기본값: '작업 확인')
 * @param {string} message - 확인 메시지 (기본값: '계속 진행하시겠습니까?')
 * @param {string} confirmText - 확인 버튼 텍스트 (기본값: '확인')
 * @param {string} cancelText - 취소 버튼 텍스트 (기본값: '취소')
 * @param {string} confirmButtonClass - 확인 버튼 CSS 클래스 (기본값: 'react-modal__btn--danger')
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "작업 확인",
  message = "계속 진행하시겠습니까?",
  confirmText = "확인",
  cancelText = "취소",
  confirmButtonClass = "react-modal__btn--danger",
  ...props
}) => {
  // 확인 버튼 클릭 처리
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  // 푸터 버튼들
  const footer = (
    <div className="react-modal__actions">
      <button
        type="button"
        className="react-modal__btn react-modal__btn--secondary"
        onClick={onClose}
      >
        {cancelText}
      </button>
      <button
        type="button"
        className={`react-modal__btn ${confirmButtonClass}`}
        onClick={handleConfirm}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <BookmarkModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      footer={footer}
      {...props}
    >
      <p>{message}</p>
    </BookmarkModal>
  );
};

/**
 * 알림 모달 컴포넌트
 * 단순한 정보 전달이나 알림에 사용
 *
 * @param {Object} props - 알림 모달 속성
 * @param {boolean} isOpen - 모달 열림 상태
 * @param {function} onClose - 모달 닫기 함수
 * @param {string} title - 모달 제목 (기본값: '알림')
 * @param {string} message - 알림 메시지 (기본값: '')
 * @param {string} buttonText - 버튼 텍스트 (기본값: '확인')
 */
export const AlertModal = ({
  isOpen,
  onClose,
  title = "알림",
  message = "",
  buttonText = "확인",
  ...props
}) => {
  // 푸터 버튼
  const footer = (
    <div className="react-modal__actions">
      <button
        type="button"
        className="react-modal__btn react-modal__btn--primary"
        onClick={onClose}
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <BookmarkModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      footer={footer}
      {...props}
    >
      <p>{message}</p>
    </BookmarkModal>
  );
};

export default BookmarkModal;
