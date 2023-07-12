import React from 'react'
import style from './profilePhoto.module.scss'

interface IProfilePhoto {
}

const ProfilePhoto: React.FC<IProfilePhoto> = () => {
  return (
    <div className={style.profilePhotoContainer}>
      <img className={style.profilePhotoContainer__img} src='https://www.biginjap.com/50935-large_default/kagamine-rin-senbonzakura-ver.jpg'></img>
    </div>
  );
};

export default ProfilePhoto
