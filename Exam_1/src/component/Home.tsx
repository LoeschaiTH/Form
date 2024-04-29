import { useTranslation } from "react-i18next";
import { Select, Divider, Row, Col, Space } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import i18n from "../i18n";


const Home: React.FC = () => {
    const { t } = useTranslation();
  
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
    };
    const { Option } = Select;
  
    return (

      <div style={{height:'100vh'}}>
        <Select
          defaultValue="en"
          style={{ width: 80 ,marginLeft: "1900px",marginTop:'20px'}}
          onChange={changeLanguage}
        >
          <Option value="en">EN</Option>
          <Option value="th">TH</Option>
        </Select>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "250px",
          }}
        >
          {t("home")}
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Space size={100}>
            <Link to="/page1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "400px",
                  height: "200px",
                  background: "white",
                  paddingLeft: "50px",
                  borderRadius: "25px",
                }}
              >
                <h2>{t("Test1")}</h2>
                <h2>{t("layout")}</h2>
              </div>
            </Link>
            <Link to="/page2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "400px",
                  height: "200px",
                  background: "white",
                  paddingLeft: "50px",
                  borderRadius: "25px",
                }}
              >
                <h2>{t("Test2")}</h2>
                <h2>{t("form")}</h2>
              </div>
            </Link>
          </Space>
        </div>
      </div>
    );
  };

  export default Home;