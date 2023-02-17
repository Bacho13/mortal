import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/MainPage.module.css";
import bg from "../public/images/background.jpg";
import chars from "../components/data";
import logo from "../public/images/logo.jpg";

function MainPage() {
  const [characters, setCharacters] = useState([]);
  const [firstId, setFirstId] = useState(-1);
  const [secondId, setSecondId] = useState(-1);
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);

  useEffect(() => {
    setCharacters(chars);
  }, []);

  const selectHero = (index) => {
    if (firstPlayerTurn) {
      setFirstId(index);
      setFirstPlayerTurn((prev) => !prev);
      console.log("pirvelm airchia: " + index);
    } else {
      setSecondId(index);
      setFirstPlayerTurn((prev) => !prev);
      console.log("meorem airchia: " + index);
    }
  };

  return (
    <>
      <div
        className={styles.main}
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100vw",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.left}>
          <div className={styles.frame}>
            <div
              className={
                firstPlayerTurn ? `${styles.choose}` : `${styles.mirror}`
              }
            ></div>
            <Image
              width={100}
              height={100}
              alt="."
              src={firstId == -1 ? logo : characters[firstId].image}
              className={styles.leftChar}
            />
          </div>
          <h1 className={styles.name}>
            {firstId == -1 ? "choose hero" : characters[firstId].name}
          </h1>
        </div>
        <div className={styles.center}>
          {characters.map(({ name, id, image }, index) => {
            return (
              <div
                className={styles.squarFrame}
                key={id}
                onClick={() => selectHero(index)}
              >
                <div className={styles.squarMirror}></div>
                <Image
                  width={100}
                  height={100}
                  alt={name}
                  src={image}
                  className={styles.squarChar}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.right}>
          <div className={styles.frame}>
            <div
              className={
                firstPlayerTurn ? `${styles.mirror}` : `${styles.choose}`
              }
            ></div>
            <Image
              width={100}
              height={100}
              alt="."
              src={secondId == -1 ? logo : characters[secondId].image}
              className={styles.leftChar}
            />
          </div>
          <h1 className={styles.name}>
            {secondId == -1 ? "choose hero" : characters[secondId].name}
          </h1>
        </div>
      </div>
    </>
  );
}

export default MainPage;
