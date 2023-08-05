import React from 'react'
import style from './profilePhoto.module.scss'
import img from '../../../../public/Assets/img.png'

interface IProfilePhoto {
}

const ProfilePhoto: React.FC<IProfilePhoto> = () => {
  return (
    <div className={style.profilePhotoContainer}>
      <img className={style.profilePhotoContainer__img} src="/Assets/img.png"></img>
    </div>
  );
};

export default ProfilePhoto
