
import React from "react";
import styles from "./Section7.module.css";

export default function Section7() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* تصویر سمت چپ */}
        <img
          src="/imgi_24_instagram-icon.png"
          alt="Instagram"
          className={styles.image}
        />

        {/* متن */}
        <div className={styles.text}>
          <h2>اینستاگرام جواهرات وودمارت</h2>
          <p>
           ما هر روز کلی مطالب آموزشی جالب در اینستاگرام راز گالری منتشر می‌کنیم!
          </p>
        </div>

        {/* دکمه سمت راست */}
        <a href="https://instagram.com/" className={styles.button}>
          ما را دنبال کنید
        </a>
      </div>
    </div>
  );
}
