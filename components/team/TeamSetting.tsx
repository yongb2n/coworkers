import Image from 'next/image';
import settingIcon from '@/assets/image/icon/gear.svg';
import thumbnailTeam from '@/assets/image/task/thumbnail-team.svg';
import groupData from '@/data/groupMockData';

export default function TeamSetting() {
  const { name } = groupData;
  return (
    <div className="relative flex h-16 items-center justify-between rounded-xl bg-bg-secondary px-6 py-5">
      <strong className="font-bold-20 text-white">{name}</strong>
      <Image
        src={thumbnailTeam}
        alt="팀 설정 배경"
        width={181}
        height={64}
        className="absolute right-20 top-0"
      />
      {/* TODO: 버튼 누르면 DropDown 나오게 해야 함 */}
      <button>
        <Image src={settingIcon} alt="설정" width={24} height={24} />
      </button>
    </div>
  );
}
