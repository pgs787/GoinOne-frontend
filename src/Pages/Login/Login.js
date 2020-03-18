import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faLock, faCircle } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

import styled, { css } from "styled-components";
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";

import coin from "Img/coin.png";
import { KwangHoon } from "config";

const Login = props => {
  const [inputs, setInputs] = useState({
    email: "",
    pwd: ""
  });
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const count = setInterval(() => {
      if (number < 3) {
        setNumber(number + 1);
      }
      if (number === 2) {
        setNumber(0);
      }
    }, 2000);
    return () => {
      clearInterval(count);
    };
  }, [number]);

  const { email, pwd } = inputs;
  const onChange = e => {
    console.log(email, pwd);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const goToSignup = () => {
    props.history.push("/signup");
  };

  const handleLogin = () => {
    fetch(`${KwangHoon}/account/signin`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.access_token) {
          props.history.push("/exchange");
          localStorage.setItem("token", res.access_token);
        } else {
          swal("", "회원정보가 일치하지 않습니다", "error");
        }
      });
  };

  return (
    <>
      <Header />
      <Body>
        <Main>
          <Loginbox>
            <Title>로그인</Title>
            <Subtile>소중한 정보를 위해 주소창을 체크해주세요</Subtile>
            <Checkaddr>
              <Addrbox>
                <FontAwesomeIcon
                  icon={faLock}
                  size="sm"
                  color={number === 0 && "orange"}
                />
                &nbsp;http
                <Http change={number}>s</Http>
                ://
                <Url change={number}>coinone.co.kr &nbsp;</Url>
                {number === 0 && <Addrdesc>자물쇠를 확인하세요</Addrdesc>}
                {number === 1 && <Addrdesc>'s'를 확인하세요</Addrdesc>}
                {number === 2 && <Addrdesc>주소를 확인하세요</Addrdesc>}
              </Addrbox>
              <Dotbox>
                <Dotlist>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                      width: "7px",
                      color: number === 0 ? "orange" : "#c9ccd2"
                    }}
                  />
                </Dotlist>
                <Dotlist>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                      width: "7px",
                      color: number === 1 ? "orange" : "#c9ccd2"
                    }}
                  />
                </Dotlist>
                <Dotlist>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                      width: "7px",
                      color: number === 2 ? "orange" : "#c9ccd2"
                    }}
                  />
                </Dotlist>
              </Dotbox>
            </Checkaddr>
            <Infobox>
              <Userinfo
                onChange={onChange}
                value={email}
                name="email"
                placeholder="E-Mail"
                type="text"
              />
              <Userinfo
                onChange={onChange}
                value={pwd}
                name="pwd"
                placeholder="Password"
                type="password"
                onKeyPress={e => {
                  if (e.charCode === 13) {
                    e.preventDefault();
                    handleLogin();
                  }
                }}
              />
              <Loginbtn onClick={handleLogin}>로그인</Loginbtn>
            </Infobox>
            <Morelink>
              <More>비밀번호 찾기</More>
              <More signup onClick={goToSignup}>
                회원가입
              </More>
            </Morelink>
          </Loginbox>
          <Downbox>
            <Descbox>
              <Coinoneimg src={coin} />
              <Desc>
                <Top>코인원PASS</Top>
                <Bottom>안전하고 간편하게 본인인증을 진행하세요</Bottom>
              </Desc>
            </Descbox>
            <Iconbox>
              <Box>
                <FontAwesomeIcon icon={faApple} /> &nbsp; App Store
              </Box>
              <Box>
                <FontAwesomeIcon icon={faGooglePlay} /> &nbsp; Google Play
              </Box>
            </Iconbox>
          </Downbox>
          <Hackinfo>혹시 해킹이 의심되는 상황인가요? 계정잠금 ></Hackinfo>
        </Main>
      </Body>
      <Footer />
    </>
  );
};

export default Login;

const box = css`
  border: 1px solid #e4e5e8;
  border-radius: 6px;
`;
const Body = styled.div`
  margin-top: 68px;
`;
const Main = styled.div`
  padding: 80px 0;
`;
const Loginbox = styled.div`
  ${box}
  margin: 0 auto;
  padding: 16px 24px 32px;
  padding-top: 40px;
  max-width: 480px;
  width: 100%;
  background-color: #fff;
`;
const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;
const Subtile = styled.p`
  margin-top: 16px;
  font-size: 16px;
  color: #79818f;
  text-align: center;
`;
const Checkaddr = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
const Addrbox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 16px;
  height: 32px;
  border: 1px solid #c9ccd2;
  border-radius: 16px;
  background-color: #fff;
  font-weight: 700;
  font-size: 14px;
  color: #aeb3bb;
`;
const Http = styled.span`
  color: ${props => props.change === 1 && "orange"};
`;
const Url = styled.span`
  color: ${props => props.change === 2 && "orange"};
`;
const Addrdesc = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #79818f;
`;
const Dotbox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
const Dotlist = styled.li`
  list-style: none;
  margin: 0 2px;
`;
const Infobox = styled.div`
  margin-top: 32px;
`;

const Userinfo = styled.input`
  margin-bottom: 16px;
  padding: 0 16px;
  width: 100%;
  height: 48px;
  border: 1px solid #dedede;
  border-radius: 3px;
  background-color: #f7f8f9;
  font-size: 16px;
  line-height: normal;
  color: #18191c;
  box-shadow: none;
  -webkit-appearance: none;
`;

const Loginbtn = styled.div`
  background-color: #1772f8;
  margin-top: 8px;
  height: 48px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  &:hover {
    background-color: #093d8bf6;
    transition: background 0.25s, border 0.25s;
  }
`;

const Morelink = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const More = styled.div`
  margin-left: 15px;
  cursor: pointer;
  ${props =>
    props.signup &&
    css`
      color: #1772f8;
      font-weight: 700;
    `}
`;

const Downbox = styled.div`
  display: block;
  position: relative;
  margin: 24px auto 40px;
  padding: 32px 24px;
  width: 480px;
  ${box}
`;
const Descbox = styled.div`
  display: flex;
`;
const Coinoneimg = styled.img`
  width: 48px;
  border-radius: 5px;
  margin-right: 12px;
`;

const Desc = styled.div``;
const Top = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #18191c;
`;
const Bottom = styled.div`
  font-size: 12px;
  color: #79818f;
`;
const Iconbox = styled.div`
  margin-top: 24px;
  display: flex;
`;
const Box = styled.div`
  ${box}
  &:first-child {
    margin-right: 16px;
  }
  text-align: center;

  padding: 10px 30px;
  width: 200px;

  color: #79818f;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #5f5f5f32;
    transition: background 0.25s, border 0.25s;
  }
`;
const Hackinfo = styled.p`
  font-size: 14px;
  color: #aeb3bb;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin: 0 auto;
`;
