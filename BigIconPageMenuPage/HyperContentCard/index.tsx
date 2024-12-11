import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

interface HyperContentCardProps {
  type: "internal" | "external" | "pointer";
  to?: string;
  src: string;
  topText: string;
  atoppadding: string;
  apadding: string;
}

const HyperContentCard: React.FC<HyperContentCardProps> = ({
  type,
  to = "",
  src,
  topText,
  atoppadding,
  apadding,
}) => {
  const hyperContent = () => {
    return (
      <div className={styles.discover__content__box}>
        <img className={styles.discover__content__text__image} src={src} />
        <div
          className={styles.district__image__box__toptext}
          id='discover_content_toptext'
        >
          {topText}
        </div>
        <div className={styles.district__image__box__shadow}></div>
        <div
          className={styles.atoppadding}
          id='discover_content_atoppadding_webMap'
        >
          {atoppadding}
        </div>
        <div className={styles.apadding} id='discover_content_apadding_webMap'>
          {apadding}
        </div>
      </div>
    );
  };

  const pointerContent = () => {
    return (
      <div className={styles.discover__content__card__pointer}>
        <div className={styles.discover__content__box}>
          <img className={styles.discover__content__text__image} src={src} />
          <div className={styles.district__image__box__shadow}></div>
          <div
            className={styles.atoppadding}
            id='discover_content_atoppadding_areaMap'
          >
            {atoppadding}
          </div>
          <div
            className={styles.apadding}
            id='discover_content_apadding_areaMap'
          >
            {apadding}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.discover__content__card}>
      {type === "internal" ? (
        <Link to={to}>{hyperContent()}</Link>
      ) : type === "external" ? (
        <a href={to} target='_blank'>
          {hyperContent()}
        </a>
      ) : (
        pointerContent()
      )}
    </div>
  );
};

export default HyperContentCard;
