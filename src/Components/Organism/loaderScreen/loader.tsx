import style from "./loader.module.scss";

const Loader = () => {
    return (
        <div className={style.loaderContainer}>
            <div className={style.loaderContainer__loader}></div>
        </div>
    );
};

export default Loader;
