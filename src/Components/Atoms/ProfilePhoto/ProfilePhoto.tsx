import React from 'react'
import style from './profilePhoto.module.scss'

interface IProfilePhoto {
}

const ProfilePhoto: React.FC<IProfilePhoto> = () => {
  return (
    <div className={style.profilePhotoContainer}>
      <img className={style.profilePhotoContainer__img} src='https://scontent.fcor2-1.fna.fbcdn.net/v/t39.30808-6/306084389_397476092555025_4424015120267016550_n.png?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHE1Q-WZvkA_CNc9gn78ftqgMKvhiT11gSAwq-GJPXWBEu3NVjqeYz4PN5UScsp4xuuWTCVYWhn5HUChV9vBleQ&_nc_ohc=uJ70XJ43TlsAX9OqAM1&_nc_ht=scontent.fcor2-1.fna&oh=00_AfBkYT41A0gGB0j37xu-sSdYHzOdT5Ce14Y4LbUQRdWC6A&oe=64CC08E5'></img>
    </div>
  );
};

export default ProfilePhoto
