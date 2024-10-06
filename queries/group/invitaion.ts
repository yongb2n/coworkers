import { authAxiosInstance } from '@/libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

/**
 * 그룹에 초대 토큰 없이 유저를 추가하는 함수
 * @param id - 초대할 그룹의 ID
 */
const inviteMember = async (
  groupId: number,
  data: {
    userEmail: string;
  },
) => {
  const response = await authAxiosInstance.post(
    `groups/${groupId}/member`,
    data,
  );
  return response.data;
};

/**
 * @useInviteMemberQuery
 * 그룹에 유저를 초대하는 mutation 훅
 * 서버에 유저 초대 요청을 POST로 전송하고,
 * 성공 시 그룹 및 사용자 데이터를 무효화하고 다시 가져옴
 */
export const useInviteMemberQuery = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => inviteMember(groupId, { userEmail: email }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

/**
 * 초대 토큰으로 그룹에 유저를 참여시키는 함수
 * @param data - 유저 이메일과 초대 토큰을 포함한 데이터 객체
 * @returns 서버 응답 데이터 (그룹 참여 성공 여부)
 */
const acceptInvitation = async (data: { userEmail: string; token: string }) => {
  const response = await authAxiosInstance.post(
    `groups/accept-invitation`,
    data,
  );
  return response.data;
};

/**
 * @useJoinTeamQuery
 * 그룹 초대 토큰을 사용하여 유저를 그룹에 참여시키는 mutation 훅
 * - 서버에 초대 수락 요청을 POST로 전송함.
 * - 성공 시 그룹 및 사용자 데이터를 무효화하고 새로운 그룹 페이지로 이동.
 *
 * @param groupId - 참여할 그룹의 ID
 * @returns `useMutation` 훅 - 그룹 참여 요청을 처리하는 mutation
 */

export const useJoinTeamQuery = (groupId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { userEmail: string; token: string }) =>
      acceptInvitation(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      const joinGroupId = data.groupId;
      router.push(`/groups/${joinGroupId}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
