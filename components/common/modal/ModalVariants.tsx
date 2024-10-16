import InviteMember from './InviteMember';
import useModalStore from '@/store/useModalStore';
import TaskListForm from '@/components/common/modal/TaskListForm';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import DeleteAccount from '@/components/common/modal/DeleteAccount';
import Logout from '@/components/common/modal/Logout';
import CopyEmail from '@/components/common/modal/CopyEmail';
import CreateTask from '@/components/common/modal/CreateTask';
import ChangePassword from '@/components/common/modal/ChangePassword';
import DatePicker from '@/components/common/modal/DatePicker';
import PasswordReset from '@/components/common/modal/PasswordReset';
import TeamForm from '@/components/common/modal/TeamForm';
import CustomInputModal from '@/components/common/modal/CustomInputModal';
import { useState } from 'react';

export default function ModalVariants() {
  /*  모달 기본 설정 */
  const openModal = useModalStore((state) => state.openModal);

  /* 모달 사용 예시 */

  // 회원 초대하기
  // const handleOpenInviteModal = () => {
  //   openModal((close) => <InviteMember close={close} />); // 각 컴포넌트 별로 전달할 props은 modal 폴더안의 해당 컴포넌트에서 각자 추가하시면 됩니다.
  // };

  // 할일 목록 만들기
  const handleOpenCreateListModal = () => {
    openModal((close) => <TaskListForm close={close} onAction={() => {}} />);
  };

  // 할일 만들기
  const handleOpenCreateTaskModal = () => {
    openModal((close) => <CreateTask close={close} />);
  };

  // 회원 탈퇴하기
  const handleOpenDeleteModal = () => {
    openModal((close) => <DeleteAccount close={close} />);
  };

  // 로그아웃
  const handleOpenLogoutModal = () => {
    openModal((close) => <Logout close={close} />);
  };

  // 이메일 복사하기
  const handleOpenCopyEmailModal = () => {
    openModal((close) => (
      <CopyEmail
        close={close}
        userImage={null}
        userName={'우지은'}
        userEmail="jieunn@codeit.com"
      />
    ));
  }; // 해당 props는 예시라서 CopyEmail 컴포넌트에서 원하시는 걸로 바꾸시면 됩니다

  // 비밀번호 변경하기
  const handleOpenChangePasswordModal = () => {
    openModal((close) => <ChangePassword close={close} />);
  };

  // 비밀번호 재설정

  const handleOpenPasswordResetModal = () => {
    openModal((close) => (
      <PasswordReset
        close={close}
        onAction={(value) => {
          toast(`${value} 해당 이메일로 링크를 보냈습니다!`);
          // value가 인풋으로 받은 이메일입니다. 이걸로 api 연동해서 처리하시면 됩니다.
        }}
      />
    ));
  };

  // 데이트 피커 예시
  const handleDatePickerModal = () => {
    openModal((close) => <DatePicker close={close} />);
  };

  // // 팀 생성하기
  // const handleCreateTeamrModal = () => {
  //   openModal((close) => <TeamForm close={close} />);
  // };

  // // 팀 수정하기
  // const handleEditTeamrModal = () => {
  //   openModal((close) => (
  //     <TeamForm
  //       close={close}
  //       image={
  //         'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg'
  //       }
  //       name={'팀 초기 네임'}
  //       isEditMode={true}
  //     />
  //   ));
  // };

  // 커스텀 인풋 모달 팀 참여하기 예시
  const handleCustomInputModal = () => {
    openModal((close) => (
      <CustomInputModal
        close={close}
        title={<div className="font-medium-24 mb-10">팀 참여하기</div>}
        buttonText={'참여하기'}
        // 작동 함수
        onAction={(data) => {
          toast.success(`${data} 팀에 참여되었습니다!`);
        }}
        // 설정 안할시 기본은 "내용을 입력해주세요"
        placeholder={'팀 링크를 입력해주세요.'}
        label={'팀 링크'}
        // 모달 전체 넓이 수정 원할 시 사용. 모달 기본적으로 모바일은 max-w-full
        className={'max-w-[400px] md:max-w-[350px]'}
        // 모달 안의 컨텐츠의 넓이 수정시 사용.
        childrenClassName={'w-[350px] sm:w-[300px] md:w-[300px]'}
        /*  텍스트말고 <div className="">내용</div> 이런 형태로 하면 스타일 변경 가능 */
        bottomDescription={'공유받은 팀 링크를 입력해 참여할 수 있어요.'}
      />
    ));
  };

  /* 커스텀 컨펌 모달 사용 예시  */
  const handleOpenConfirmModal = () => {
    openModal((close) => (
      <ConfirmModal
        title="삭제하시겠어요?"
        description={'삭제시 복구가 불가합니다.\n정말 삭제하시겠어요?'} // 생략 가능. 줄바꿈 필요시 꼭 {}안에 \n 포함
        close={close}
        isAlert={true} // true시 경고 icon 표시, 기본적으로 설정 안할시 미표시
        confirmText="삭제하기" // 닫는 버튼 기본 text는 닫기, 설정 필요시 cancelText추가
        onConfirm={() => toast.success('삭제되었습니다!')} // 컨펌 될시 작동할 함수 추가
        buttonType="danger" // 'solid' | 'danger' 두 종류 버튼 타입이 있고 solid가 기본입니다.
      />
    ));
  };

  return (
    // 버튼과 모달 연동 설정 예시
    // 연결 태그를 button 태그로 할 시 스페이스바와 엔터시 모달 지속 호출 이슈가 있어 button외 다른 태그 사용 권장
    <div className="flex-center mt-40 flex flex-col gap-4 text-white">
      {/* <div className="cursor-pointer" onClick={handleOpenInviteModal}>
        회원 초대하기
      </div> */}
      <div className="cursor-pointer" onClick={handleOpenCreateListModal}>
        할일 목록 만들기
      </div>
      <div className="cursor-pointer" onClick={handleOpenCreateTaskModal}>
        할일 만들기
      </div>
      <div className="cursor-pointer" onClick={handleOpenDeleteModal}>
        회원 탈퇴하기
      </div>
      <div className="cursor-pointer" onClick={handleOpenLogoutModal}>
        로그아웃
      </div>
      <div className="cursor-pointer" onClick={handleOpenCopyEmailModal}>
        이메일 복사하기
      </div>
      <div className="cursor-pointer" onClick={handleOpenChangePasswordModal}>
        비밀번호 변경하기
      </div>
      <div className="cursor-pointer" onClick={handleOpenPasswordResetModal}>
        비밀번호 재설정
      </div>
      <div className="cursor-pointer" onClick={handleDatePickerModal}>
        데이트 피커
      </div>
      {/* <div className="cursor-pointer" onClick={handleCreateTeamrModal}>
        팀 생성하기
      </div> */}
      {/* <div className="cursor-pointer" onClick={handleEditTeamrModal}>
        팀 수정하기
      </div> */}
      <div className="cursor-pointer" onClick={handleOpenConfirmModal}>
        컨펌 모달 예시
      </div>
      <div className="cursor-pointer" onClick={handleCustomInputModal}>
        커스텀 인풋 모달 예시
      </div>
    </div>
  );
}
