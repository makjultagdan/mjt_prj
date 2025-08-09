import React, { useState } from "react";
import Modal, {
  useModal,
  ConfirmModal,
  AlertModal,
} from "../components/bookmark/BookmarkModal";

/**
 * React 모달 컴포넌트 사용 예제
 * 다양한 모달 사용법을 보여주는 데모 컴포넌트
 */
const ModalExamples = () => {
  // useModal 훅을 사용한 모달 상태 관리
  const basicModal = useModal(); // 기본 모달
  const formModal = useModal(); // 폼 모달
  const largeModal = useModal(); // 큰 모달
  const customModal = useModal(); // 커스텀 모달

  // 확인 및 알림 모달 상태
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 폼 제출 처리 함수
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("폼 제출됨:", formData);
    formModal.closeModal();
    setShowAlert(true);
  };

  // 폼 입력 변경 처리 함수
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 확인 작업 처리 함수
  const handleConfirmAction = () => {
    console.log("작업이 확인되었습니다!");
    // 여기서 실제 작업을 수행합니다
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>React 모달 컴포넌트 사용 예제</h1>

      {/* 데모 버튼들 */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <button onClick={basicModal.openModal} style={buttonStyle}>
          기본 모달 열기
        </button>

        <button onClick={formModal.openModal} style={buttonStyle}>
          폼 모달 열기
        </button>

        <button onClick={largeModal.openModal} style={buttonStyle}>
          큰 모달 열기
        </button>

        <button onClick={customModal.openModal} style={buttonStyle}>
          커스텀 모달 열기
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          style={{ ...buttonStyle, backgroundColor: "#ef4444" }}
        >
          확인 모달 열기
        </button>

        <button
          onClick={() => setShowAlert(true)}
          style={{ ...buttonStyle, backgroundColor: "#10b981" }}
        >
          알림 모달 열기
        </button>
      </div>

      {/* 기본 모달 */}
      <Modal
        isOpen={basicModal.isOpen}
        onClose={basicModal.closeModal}
        title="기본 모달 예제"
        onAfterOpen={() => console.log("기본 모달이 열렸습니다")}
        onAfterClose={() => console.log("기본 모달이 닫혔습니다")}
      >
        <p>
          이것은 기본 모달의 예제입니다. 필요에 따라 이 내용을 사용자 정의할 수
          있습니다.
        </p>
        <p>
          모달은 완전히 접근 가능하고 반응형입니다. 키보드 네비게이션과 스크린
          리더를 지원합니다.
        </p>
        <p>모달 외부를 클릭하거나 ESC 키를 눌러 닫을 수 있습니다.</p>
      </Modal>

      {/* 폼 모달 */}
      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.closeModal}
        title="연락처 폼"
        size="default"
        footer={
          <div className="react-modal__actions">
            <button
              type="button"
              className="react-modal__btn react-modal__btn--secondary"
              onClick={formModal.closeModal}
            >
              취소
            </button>
            <button
              type="submit"
              form="contact-form"
              className="react-modal__btn react-modal__btn--primary"
            >
              메시지 보내기
            </button>
          </div>
        }
      >
        <form
          id="contact-form"
          className="react-modal__form"
          onSubmit={handleFormSubmit}
        >
          <div className="react-modal__form-group">
            <label htmlFor="name" className="react-modal__form-label">
              이름 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="react-modal__form-input"
              required
            />
          </div>

          <div className="react-modal__form-group">
            <label htmlFor="email" className="react-modal__form-label">
              이메일 *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="react-modal__form-input"
              required
            />
          </div>

          <div className="react-modal__form-group">
            <label htmlFor="message" className="react-modal__form-label">
              메시지 *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              className="react-modal__form-textarea"
              rows="4"
              required
            />
          </div>
        </form>
      </Modal>

      {/* 풍부한 내용이 있는 큰 모달 */}
      <Modal
        isOpen={largeModal.isOpen}
        onClose={largeModal.closeModal}
        title="풍부한 내용이 있는 큰 모달"
        size="large"
        footer={
          <div className="react-modal__actions">
            <button
              type="button"
              className="react-modal__btn react-modal__btn--secondary"
              onClick={largeModal.closeModal}
            >
              닫기
            </button>
            <button
              type="button"
              className="react-modal__btn react-modal__btn--primary"
            >
              확인했습니다!
            </button>
          </div>
        }
      >
        <h3>풍부한 내용 예제</h3>
        <p>
          이것은 광범위한 내용을 포함할 수 있는 큰 모달입니다. 내용이 사용
          가능한 공간을 초과하면 본문이 스크롤됩니다.
        </p>

        <h4>기능</h4>
        <ul>
          <li>완전한 반응형 디자인</li>
          <li>키보드 네비게이션 지원 (Tab, Shift+Tab, Escape)</li>
          <li>적절한 ARIA 속성으로 스크린 리더 접근 가능</li>
          <li>포커스 관리 및 포커스 트래핑</li>
          <li>CSS 커스텀 속성으로 사용자 정의 가능한 스타일링</li>
          <li>여러 크기 변형 (small, default, large, full)</li>
          <li>적절한 z-index 관리를 위한 포털 렌더링</li>
          <li>사용자 정의 가능한 지속 시간의 애니메이션 지원</li>
        </ul>

        <h4>사용 예제</h4>
        <p>다양한 props를 전달하여 이 모달을 쉽게 사용자 정의할 수 있습니다:</p>

        <div
          style={{
            background: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
            margin: "16px 0",
          }}
        >
          <h5>기본 사용법</h5>
          <pre style={{ margin: 0, fontSize: "12px" }}>
            {`const { isOpen, openModal, closeModal } = useModal()

<Modal
  isOpen={isOpen}
  onClose={closeModal}
  title="내 모달"
  size="large"
>
  <p>모달 내용이 여기에 들어갑니다</p>
</Modal>`}
          </pre>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </Modal>

      {/* 커스텀 헤더가 있는 모달 */}
      <Modal
        isOpen={customModal.isOpen}
        onClose={customModal.closeModal}
        size="default"
        className="custom-modal"
        header={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                ℹ
              </div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
                커스텀 헤더 모달
              </h2>
            </div>
            <button
              type="button"
              onClick={customModal.closeModal}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
              }}
              aria-label="모달 닫기"
            >
              ×
            </button>
          </div>
        }
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ color: "#6b7280", fontSize: "14px" }}>
              커스텀 푸터 내용
            </div>
            <div className="react-modal__actions">
              <button
                type="button"
                className="react-modal__btn react-modal__btn--primary"
                onClick={customModal.closeModal}
              >
                이해했습니다
              </button>
            </div>
          </div>
        }
      >
        <p>
          이 모달은 커스텀 React 요소를 전달하여 헤더와 푸터를 사용자 정의하는
          방법을 보여줍니다.
        </p>
        <p>
          헤더와 푸터 props에 모든 React 컴포넌트나 HTML 요소를 포함할 수
          있습니다.
        </p>
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "16px",
            margin: "16px 0",
          }}
        >
          <strong>프로 팁:</strong> 커스텀 헤더와 푸터를 사용하여 애플리케이션의
          UI와 일치하는 브랜드화되거나 전문화된 모달 디자인을 만드세요.
        </div>
      </Modal>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmAction}
        title="항목 삭제"
        message="이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
      />

      {/* 알림 모달 */}
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="성공!"
        message="메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다."
        buttonText="좋습니다!"
      />

      {/* 사용법 문서 */}
      <div
        style={{
          marginTop: "60px",
          padding: "24px",
          background: "#f9fafb",
          borderRadius: "8px",
        }}
      >
        <h2>사용법 문서</h2>

        <h3>기본 Props</h3>
        <ul>
          <li>
            <code>isOpen</code> - 모달 표시 여부를 제어하는 불린값
          </li>
          <li>
            <code>onClose</code> - 모달이 닫힐 때 호출되는 함수
          </li>
          <li>
            <code>title</code> - 모달 제목 (선택사항)
          </li>
          <li>
            <code>children</code> - 모달 내용
          </li>
          <li>
            <code>size</code> - 모달 크기: 'small', 'default', 'large', 'full'
          </li>
          <li>
            <code>className</code> - 추가 CSS 클래스
          </li>
        </ul>

        <h3>고급 Props</h3>
        <ul>
          <li>
            <code>header</code> - 커스텀 헤더 React 요소
          </li>
          <li>
            <code>footer</code> - 커스텀 푸터 React 요소
          </li>
          <li>
            <code>closeOnOverlayClick</code> - 오버레이 클릭 시 닫기 (기본값:
            true)
          </li>
          <li>
            <code>closeOnEscape</code> - Escape 키 누를 때 닫기 (기본값: true)
          </li>
          <li>
            <code>preventBodyScroll</code> - 열릴 때 body 스크롤 방지 (기본값:
            true)
          </li>
          <li>
            <code>showCloseButton</code> - 헤더에 닫기 버튼 표시 (기본값: true)
          </li>
        </ul>

        <h3>콜백 Props</h3>
        <ul>
          <li>
            <code>onOpen</code> - 모달이 열리기 시작할 때 호출
          </li>
          <li>
            <code>onAfterOpen</code> - 모달 애니메이션이 완료된 후 호출
          </li>
          <li>
            <code>onAfterClose</code> - 모달이 닫히고 애니메이션이 완료된 후
            호출
          </li>
        </ul>

        <h3>useModal 훅</h3>
        <p>
          <code>useModal</code> 훅은 편리한 상태 관리를 제공합니다:
        </p>
        <pre
          style={{
            background: "#1f2937",
            color: "#f3f4f6",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          {`const { isOpen, openModal, closeModal, toggleModal } = useModal()

// 컴포넌트에서 사용
<button onClick={openModal}>모달 열기</button>
<Modal isOpen={isOpen} onClose={closeModal}>
  여기에 내용
</Modal>`}
        </pre>
      </div>
    </div>
  );
};

// 데모용 버튼 스타일
const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s ease",
};

export default ModalExamples;
