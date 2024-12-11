import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import lottie from "lottie-web";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

import { useTranslation } from "react-i18next";

import useTime from "../../hook/useTIme";
import holidayData from "../../pageData/holidayData";
import majorEvents from "../../pageData/majorEvents";
import type { IMajorEventData } from "../../pageData/majorEvents";
import sunny from "../../image/lottie/sunny.json";
import rain from "../../image/lottie/rain.json";
import thunder from "../../image/lottie/thunder.json";
import { getEraName } from "../../utils/getEraName";

interface BigIconPageMenuPageProps {
  // pageTitle: string;
  // pageText: string;
  children?: React.ReactNode;
}

const BigIconPageMenuPage: React.FC<BigIconPageMenuPageProps> = ({
  // pageTitle,
  // pageText,
  children,
}) => {
  const weatherIcon = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const history = useHistory();
  const { today, gameToday } = useTime();

  const getWeatherIcon = (ramdomIndex) => {
    if (ramdomIndex === 1) {
      return sunny;
    }
    if (ramdomIndex === 2) {
      if (gameToday.hour > 19 && gameToday.hour < 7) {
        return thunder;
      }
      return rain;
    }
    return thunder;
  };

  useEffect(() => {
    const ramdomIndex = (today.timestamp % 10000) % 3;
    lottie.loadAnimation({
      container: weatherIcon.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: getWeatherIcon(ramdomIndex),
      name: "Weather",
    });
    lottie.setSpeed(5);
    return () => lottie.destroy();
  }, [gameToday.hour]);

  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getRow = (data: IMajorEventData, index: number) => {
    const rowElement: React.ReactElement = (
      <React.Fragment key={`row-${index}`}>
        <div
          className={`${
            data.type !== "pointer" &&
            styles["discover__news_display_table_row_arrow"]
          }`}
        ></div>
        <li
          className={`${styles["discover__news_display_table_col"]} ${styles["discover__news_display_table_col-bullet"]}`}
        >
          &bull;
        </li>
        <li
          className={`${styles["discover__news_display_table_col"]} ${styles["discover__news_display_table_col-first"]}`}
        >
          {`${getEraName(data.year, language)}\n${data.year}/${data.month}/${
            data.day
          }`}
        </li>
        <li
          className={`${styles["discover__news_display_table_col"]} ${styles["discover__news_display_table_col-second"]}`}
        >
          {language === "zh" && data.zh_name}
          {language === "en" && data.eng_name}
          {language === "jp" && data.jp_name}
        </li>
      </React.Fragment>
    );
    if (data.type === "internal") {
      return (
        <Link
          to={data.url || ""}
          className={`${styles["discover__news_display_table_row"]} ${styles["discover__news_display_table_row-hover"]}`}
        >
          {rowElement}
        </Link>
      );
    }
    if (data.type === "external") {
      return (
        <a
          href={data.url || ""}
          className={`${styles["discover__news_display_table_row"]} ${styles["discover__news_display_table_row-hover"]}`}
        >
          {rowElement}
        </a>
      );
    }
    return (
      <ul className={`${styles["discover__news_display_table_row"]}`}>
        {rowElement}
      </ul>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.discover}>
        <div className={styles.discover__news}>
          {/* <div className={styles.discover__title} id={pageTitle}>
            {t(pageTitle)}
          </div>
          <div className={styles.discover__text} id={pageText}>
            {t(pageText)}
          </div> */}
          <div className={styles.discover__news_dayContainer}>
            <div className={styles.discover__news__dayHeader}>
              <ul className={styles.discover__news__dayHeader_day}>
                <li>{today.day}</li>
                <li>{today.year}</li>
                <li>{monthList[today.month]}</li>
              </ul>
              <Link
                to='/page/basic/background'
                title={t("const_buddy_time_name")}
                className={styles.discover__news__dayHeader_weatherTime}
              >
                <div
                  ref={weatherIcon}
                  className={
                    styles.discover__news__dayHeader_weatherTime_weatherIcon
                  }
                ></div>
                <div className={styles.discover__news__dayHeader_time}>
                  <li>
                    {`${
                      gameToday.hour < 10
                        ? `0${gameToday.hour}`
                        : gameToday.hour
                    }`}
                    <sub>
                      {language === "en"
                        ? "BH"
                        : t("const_buddy_name") + t("const_hour")}
                    </sub>
                    {`${
                      gameToday.minute < 10
                        ? `0${gameToday.minute}`
                        : gameToday.minute
                    }`}
                    <sub>
                      {language === "en"
                        ? "BM"
                        : t("const_buddy_name") + t("const_mins")}
                    </sub>
                  </li>
                  <li>
                    {language === "en" ? "The " : "第 "}
                    {gameToday.day}
                    <sup>
                      {language === "en" &&
                        `${
                          gameToday.day % 10 == 1
                            ? "st"
                            : gameToday.day % 10 == 2
                            ? "nd"
                            : gameToday.day % 10 === 3
                            ? "rd"
                            : "th"
                        }`}
                    </sup>
                  </li>
                  <li>
                    {language === "en"
                      ? `BUDDY Day${gameToday.day !== 1 ? "s" : ""}`
                      : "友日"}
                  </li>
                </div>
              </Link>
            </div>

            <div className={styles.discover__news__dayHeader_holiday}>
              <Link
                to={
                  holidayData[`${today.month + 1}/${today.day}`] !== undefined
                    ? "/page/basic/legal-holiday"
                    : "/page/basic/calendar-system-and-city-song"
                }
                title={t("const_era")}
              >
                <span
                  className={styles.discover__news__dayHeader_holiday_first}
                >
                  {t("holiday_today_is")}
                </span>
                {holidayData[`${today.month + 1}/${today.day}`] !==
                undefined ? (
                  <span
                    className={styles.discover__news__dayHeader_holiday_second}
                  >
                    {t(holidayData[`${today.month + 1}/${today.day}`].name)}
                  </span>
                ) : (
                  <span
                    className={styles.discover__news__dayHeader_holiday_first}
                  >
                    {getEraName(today.year.toString(), language)}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className={styles.discover__news_display}>
            <div className={styles.discover__news_display_table}>
              {majorEvents.data
                .slice(0)
                .reverse()
                .map((data, index) => {
                  if (data.display) {
                    return getRow(data, index);
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
        <div className={styles.discover__content}>{children}</div>
      </div>
    </div>
  );
};

export default BigIconPageMenuPage;
