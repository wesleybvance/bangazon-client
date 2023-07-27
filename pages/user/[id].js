import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../../utils/data/thredsUserData';
import UserProfile from '../../components/user/UserProfile';

export default function UserProfilePage() {
  const router = useRouter();
  const userId = router.query;

  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    getSingleUser(userId.id).then(setUserDetail);
  }, [userId.id]);
  return (
    <div><UserProfile id={userDetail.id} firstName={userDetail.first_name} lastName={userDetail.last_name} username={userDetail.username} imageUrl={userDetail.image_url} address={userDetail.address} uid={userDetail.uid} /></div>
  );
}
