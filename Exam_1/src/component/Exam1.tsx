import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, Divider, Row, Col, Space } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import i18n from "../i18n";



const Page1: React.FC = () => {
    const { t } = useTranslation();
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
    };
    const { Option } = Select;
  
    const [images, setImages] = useState([
      "Square.png",
      "Circle.png",
      "Oval.png",
      "Trapezoid.png",
      "Rectangle.png",
      "Parallelogram.png",
    ]);
  
    const RightClick = () => {
      setImages((prevImages) => {
        const lastImages = prevImages.slice(-1);
        console.log("lastImages", lastImages);
        const newImages = prevImages.slice(0, -1);
        console.log("newImages", newImages);
        newImages.unshift(...lastImages);
        return newImages;
      });
    };
  
    const LeftClick = () => {
      setImages((prevImages) => {
        const firstImages = prevImages.slice(0, 1);
        console.log("firstImages", firstImages);
        const newImages = prevImages.slice(1, 6);
        console.log("newImages", newImages);
        newImages.push(...firstImages);
        return newImages;
      });
    };
  
    const UpDownClick = () => {
      setImages((prevImages) => {
        const firstImages = prevImages.slice(0, 3);
        console.log("firstImages", firstImages);
        const newImages = prevImages.slice(-3);
        console.log("newImages", newImages);
        newImages.push(...firstImages);
        return newImages;
      });
    };
  
    const RandomClick = () => {
      setImages((prevImages) => {
        let shuffledImages = prevImages.slice();
        const tempImages = prevImages.slice(); // ทำสำเนาของรายการรูปภาพทั้งหมด
        for (let i = shuffledImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImages[i], shuffledImages[j]] = [
            shuffledImages[j],
            shuffledImages[i],
          ];
        }
        // เช็คว่ารูปภาพในรายการที่สุ่มมาซ้ำกันหรือไม่
        const isSameImages = shuffledImages.some(
          (image, index) => image === prevImages[index]
        );
        // ถ้ารูปภาพในรายการที่สุ่มมาซ้ำกันให้สุ่มใหม่
        if (isSameImages) {
          shuffledImages = tempImages.slice(); // ใช้รายการรูปภาพที่สร้างไว้ตั้งต้น
          // สุ่มใหม่
          for (let i = shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledImages[i], shuffledImages[j]] = [
              shuffledImages[j],
              shuffledImages[i],
            ];
          }
        }
        return shuffledImages;
      });
    };
  
    const style: React.CSSProperties = {
      width: "350px",
      height: "200px",
    };
  
    const style2: React.CSSProperties = {
      width: "700px",
      height: "200px",
    };
  
    const style3: React.CSSProperties = {
      width: "320px",
      height: "200px",
    };
  
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <Space>
          <h2>{t("layout")}</h2>
          <div style={{ marginLeft: "1550px" }}>
            <Select
              defaultValue="en"
              style={{ width: 80 }}
              onChange={changeLanguage}
            >
              <Option value="en">EN</Option>
              <Option value="th">TH</Option>
            </Select>
          </div>
        </Space>
  
        <div>
          <Divider orientation="left"></Divider>
          <Row gutter={[16, 16]}>
            <Space size={20}>
              <Col className="gutter-row" span={8}>
                <button
                  onClick={LeftClick}
                  style={{ border: "none", padding: "0", borderRadius: "25px" }}
                >
                  <img
                    src="/Pic/Left.png"
                    style={{ ...style, borderRadius: "25px" }}
                    alt=""
                  />
                </button>
              </Col>
              <Col className="gutter-row" span={8}>
                <button
                  onClick={UpDownClick}
                  style={{ border: "none", padding: "0", borderRadius: "25px" }}
                >
                  <img
                    src="/Pic/UpAndDown.png"
                    style={{ ...style2, borderRadius: "25px" }}
                    alt=""
                  />
                </button>
              </Col>
              <Col className="gutter-row" span={8}>
                <button
                  onClick={RightClick}
                  style={{ border: "none", padding: "0", borderRadius: "25px" }}
                >
                  <img
                    src="/Pic/Right.png"
                    style={{ ...style, borderRadius: "25px" }}
                    alt=""
                  />
                </button>
              </Col>
            </Space>
          </Row>
        </div>
  
        <div style={{ width: "1650px", height: "800px", paddingLeft: "500px" }}>
          <Divider orientation="left"></Divider>
          <Row justify="start" gutter={[16, 16]}>
            {images.slice(0, 3).map((image, index) => (
              <Col span={5} key={index}>
                <button
                  onClick={RandomClick}
                  style={{ border: "none", padding: "0", borderRadius: "25px" }}
                >
                  <img
                    src={`/Pic/${image}`}
                    style={{ ...style3, borderRadius: "25px" }}
                    alt={`Image ${index}`}
                  />
                </button>
              </Col>
            ))}
          </Row>
  
          <Divider orientation="left"></Divider>
          <Row justify="center" gutter={[16, 16]}>
            {images.slice(3, 6).map((image, index) => (
              <Col span={5} key={index}>
                <button
                  onClick={RandomClick}
                  style={{ border: "none", padding: "0", borderRadius: "25px" }}
                >
                  <img
                    src={`/Pic/${image}`}
                    style={{ ...style3, borderRadius: "25px" }}
                    alt={`Image ${index + 4}`}
                  />
                </button>
              </Col>
            ))}
          </Row>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/">{t("goBackToHome")}</Link>
          </div>
        </div>
      </div>
    );
  };

  export default Page1;