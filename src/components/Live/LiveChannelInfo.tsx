import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from 'apis';
import Channel from 'apis/Channel';
import { AxiosError, AxiosResponse } from 'axios';
import LiveChannelInfoSkeleton from 'components/Skeleton/LiveChannelInfo';
import ChannelInfo from 'components/Watch/ChannelInfo';
import { useEffect, useState } from 'react';
import { BsShare, BsStar, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const LiveChannelInfo = (props: {id: string}) => {
  const userid = props.id;
  const navigate = useNavigate();

  const { data, isSuccess, isFetching } = useQuery(['WatchLive', 'channelInfo'], {queryFn: () => User().channel(userid)});


  if(isFetching || !isSuccess) return <LiveChannelInfoSkeleton />

  return (
    <ChannelInfo>
      <ChannelInfo.Container onClick={() => navigate(`/@/${userid}`)}>
        <ChannelInfo.ProfileIcon profileColor={data?.data.profile || '#fff'} />
        <ChannelInfo.Detail>
          <ChannelInfo.Name>{data?.data.nickname}</ChannelInfo.Name>
          <ChannelInfo.Readership>구독자 {data?.data.readership}명</ChannelInfo.Readership>
        </ChannelInfo.Detail>
      </ChannelInfo.Container>
      <ChannelInfo.ButtonListContainer>
        <Subscribe active={data.data.subscribed} channelId={data?.data.id || 0} />
        <Share />
      </ChannelInfo.ButtonListContainer>
    </ChannelInfo>
  )
}


const Subscribe = (props: {active: boolean, channelId: number}) => {
  const [active, setActive] = useState<boolean>(props.active);
  const { mutate } = useMutation<AxiosResponse<{active: boolean}>, AxiosError<{active: boolean}>, {id: number}>(Channel().subscribe, {
    onSuccess: (data) => {
      setActive(data.data.active);
    },
    onError: (error) => {
      alert(error.response?.status);
    }
  });

  useEffect(() => {
    setActive(props.active);
  }, [props.active])

  return (
    <ChannelInfo.ButtonContainer active={active} onClick={() => mutate({id: props.channelId})}>
      <ChannelInfo.IconWrapper size={24}>
        <ChannelInfo.ButtonIcon show={active}>
          <BsStarFill size={24} />
        </ChannelInfo.ButtonIcon>
        <ChannelInfo.ButtonIcon show={!active}>
          <BsStar size={24} />
        </ChannelInfo.ButtonIcon>
      </ChannelInfo.IconWrapper>
      <ChannelInfo.ButtonName>구독</ChannelInfo.ButtonName>
    </ChannelInfo.ButtonContainer>
  )
}

const Share = () => {
  return (
    <ChannelInfo.ButtonContainer>
      <ChannelInfo.IconWrapper size={24}>
        <ChannelInfo.ButtonIcon show={true}>
          <BsShare style={{color: 'var(--main-text-color)'}} size={24} />
        </ChannelInfo.ButtonIcon>
      </ChannelInfo.IconWrapper>
      <ChannelInfo.ButtonName>공유</ChannelInfo.ButtonName>
    </ChannelInfo.ButtonContainer>
  )
}

export default LiveChannelInfo