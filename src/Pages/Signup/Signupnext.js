import React, { useState, useEffect } from "react";
import { KwangHoon } from "config";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faExclamationCircle,
  faCheck,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

import { check_email, upper_case, lower_case, number_case } from "util/regexp";
import SignupLayout from "Components/Layout/SignupLayout";

const Signupnext = props => {
  const [inputs, setInputs] = useState({
    email: "",
    pwd: "",
    pwdcheck: "",
    correct_email: false
  });

  const [pwdvisible, setPwdvisible] = useState(false);
  const [pwdcheckvisible, setPwdcheckvisible] = useState(false);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [length, setLength] = useState(false);

  const { email, pwd, pwdcheck, correct_email } = inputs;

  const onChange = e => {
    if (check_email.test(email)) {
      setInputs({
        ...inputs,
        correct_email: true,
        [e.target.name]: e.target.value
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
        correct_email: false
      });
    }
  };
  useEffect(() => {
    if (upper_case.test(pwd)) {
      setUpper(true);
    } else {
      setUpper(false);
    }
    if (lower_case.test(pwd)) {
      setLower(true);
    } else {
      setLower(false);
    }
    if (number_case.test(pwd)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    if (pwd.length >= 10) {
      setLength(true);
    } else {
      setLength(false);
    }
  }, [inputs, pwd, correct_email, upper, lower, number, length]);

  const handleEmail = () => {
    console.log("확인");
    fetch(`${KwangHoon}/account/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "SUCCESS") {
          swal(
            "",
            "인증 메일이 발송되었습니다 확인하시고 로그인을 해주세요",
            "success"
          ).then(() => {
            props.history.push("/login");
          });
        } else if (res.message === "EXISTS_EMAIL") {
          swal("", "유효한 이메일입니다 이메일을 확인 해주세요", "warning");
        } else {
          swal(
            "",
            "가입 정보가 올바르지 않습니다 다시 확인해 주세요",
            "warning"
          );
        }
      });
  };
  return (
    <SignupLayout>
      <Title>회원가입</Title>
      <Flow>
        <Flowinner>
          <Flowcontent>
            <FontAwesomeIcon icon={faCheckCircle} size="lg" color="black" />
            &nbsp; <Alreadytext> 약관 동의</Alreadytext>
          </Flowcontent>
          <Flowcontent>
            <Numcircle active>2</Numcircle>
            <Circletext>정보입력</Circletext>
          </Flowcontent>
        </Flowinner>
      </Flow>
      <Userinfo>
        <Formwrapper>
          이메일
          <FormandIcon>
            <Formemail
              onChange={onChange}
              name="email"
              placeholder="아이디로 사용할 이메일 입력"
              status={inputs}
              autoFocus
            />
            <Inputicons email>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="lg"
                color="#ff5141"
                style={{
                  visibility: email ? "visible" : "hidden",
                  display: correct_email && email ? "none" : "block"
                }}
              />
              {correct_email && email && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#00cb6f"
                />
              )}
            </Inputicons>
          </FormandIcon>
          <Emailcheck status={inputs}>
            이메일 형식이 올바르지 않습니다
          </Emailcheck>
        </Formwrapper>
        <Formwrapper pwd>
          비밀번호
          <FormandIcon>
            <Formpwd
              type={pwdvisible ? "text" : "password"}
              onChange={onChange}
              name="pwd"
              placeholder="비밀번호 입력"
              upper={upper}
              lower={lower}
              number={number}
              length={length}
              status={inputs}
            />
            <Inputicons>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="lg"
                color="#ff5141"
                style={{
                  visibility: pwd ? "visible" : "hidden",
                  display:
                    upper && lower && number && length ? "none" : "inline-block"
                }}
              />
              {upper && lower && number && length && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#00cb6f"
                />
              )}
              <FontAwesomeIcon
                icon={pwdvisible ? faEye : faEyeSlash}
                size="lg"
                color="black"
                onClick={() => {
                  setPwdvisible(!pwdvisible);
                }}
              />
            </Inputicons>
          </FormandIcon>
          <Pwdcheckbox>
            <Checklist>
              <List one upper={upper}>
                <FontAwesomeIcon
                  style={{ display: upper ? "inline-block" : "none" }}
                  icon={faCheck}
                  size="lg"
                  color="#00cb6f"
                />
                &nbsp; 영문 대문자 포함
              </List>
              <List tw lower={lower}>
                <FontAwesomeIcon
                  style={{ display: lower ? "inline-block" : "none" }}
                  icon={faCheck}
                  size="lg"
                  color="#00cb6f"
                />
                &nbsp; 영문 소문자 포함
              </List>
              <List th number={number}>
                <FontAwesomeIcon
                  style={{ display: number ? "inline-block" : "none" }}
                  icon={faCheck}
                  size="lg"
                  color="#00cb6f"
                />
                &nbsp; 숫자 포함
              </List>
              <List fo length={length}>
                <FontAwesomeIcon
                  style={{ display: length ? "inline-block" : "none" }}
                  icon={faCheck}
                  size="lg"
                  color="#00cb6f"
                />
                &nbsp; 10자 이상
              </List>
            </Checklist>
          </Pwdcheckbox>
        </Formwrapper>
        <Formwrapper>
          <FormandIcon>
            <Formpwdcheck
              status={inputs}
              onChange={onChange}
              type={pwdcheckvisible ? "text" : "password"}
              name="pwdcheck"
              placeholder="비밀번호 확인"
            />
            <Inputicons>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="lg"
                color="#ff5141"
                style={{
                  visibility: pwdcheck ? "visible" : "hidden",
                  display: pwdcheck === pwd && pwd ? "none" : "inline-block"
                }}
              />
              {pwdcheck === pwd && pwdcheck && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color="#00cb6f"
                />
              )}
              <FontAwesomeIcon
                icon={pwdcheckvisible ? faEye : faEyeSlash}
                size="lg"
                color="black"
                onClick={() => {
                  console.log(pwdcheckvisible);
                  setPwdcheckvisible(!pwdcheckvisible);
                }}
              />
            </Inputicons>
          </FormandIcon>
          <Pwdcheck status={inputs}>비밀번호가 서로 맞지 않습니다</Pwdcheck>
        </Formwrapper>
        <Completebtn
          email={correct_email}
          upper={upper}
          lower={lower}
          number={number}
          length={length}
          pwd={pwd}
          pwdcheck={pwdcheck}
          onClick={() => {
            handleEmail();
          }}
        >
          완료
        </Completebtn>
      </Userinfo>
    </SignupLayout>
  );
};

export default withRouter(Signupnext);

const Title = styled.p`
  margin-bottom: 24px;
  font-size: 34px;
  text-align: center;
`;

const Flow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Flowinner = styled.ul`
  display: flex;
  list-style: none;
`;
const Flowcontent = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #aeb3bb;
  margin-bottom: 30px;
  &:last-child {
    ::before {
      content: "";
      display: block;
      margin: 0 12px;
      width: 80px;
      height: 1px;
      background-color: #c9ccd2;
    }
  }
`;

const Numcircle = styled.div`
  background-color: ${props => (props.active ? "#1772f8" : "#aeb3bb")};
  color: #fff;
  margin-right: 8px;
  width: 19px;
  height: 19px;
  font-size: 12px;
  border-radius: 10px;
  text-align: center;
`;
const infobox = css`
  margin-top: 8px;
  padding-right: 64px;
  height: 48px;
  border-radius: 6px;
  &::placeholder {
    color: #c9ccd2;
  }
  &:focus {
    outline: none;
    border-color: rgba(23, 114, 248, 0.4);
    box-shadow: 0 0 0 1px rgba(23, 114, 248, 0.4);
  }
`;

const Circletext = styled.span`
  color: #1772f8;
`;

const Alreadytext = styled.span`
  color: black;
`;

const Userinfo = styled.div``;
const Formemail = styled.input`
  ${infobox};
  border-color: ${props =>
    props.status.correct_email === false && props.status.email && "red"};
`;
const Formpwd = styled.input`
  ${infobox};
  border-color: ${props =>
    (!props.upper || !props.lower || !props.number || !props.length) &&
    props.status.pwd &&
    "red"};
`;
const Formpwdcheck = styled.input`
  ${infobox};
  border-color: ${props => props.status.pwd !== props.status.pwdcheck && "red"};
`;
const Completebtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  background-color: #c9ccd2;
  color: #79818f;
  opacity: 0.5;
  padding: 0 16px;
  height: 48px;
  font-size: 16px;
  cursor: not-allowed;
  ${props =>
    props.email &&
    props.upper &&
    props.lower &&
    props.length &&
    props.pwd === props.pwdcheck &&
    css`
      cursor: pointer;
      background-color: #1772f8;
      opacity: 1;
      color: white;
    `}
`;

const Formwrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #484d55;
  ${props =>
    props.pwd &&
    css`
      margin-top: 25px;
    `}
`;

const check = css`
  color: #ff5141;
  margin-top: 4px;
  font-size: 12px;
`;

const Emailcheck = styled.div`
  ${check};
  display: none;
  display: ${props =>
    props.status.correct_email === false && props.status.email && "block"};
`;

const Pwdcheck = styled.div`
  ${check};
  display: ${props =>
    props.status.pwd === props.status.pwdcheck ? "none" : "block"};
`;

const Pwdcheckbox = styled.div`
  margin: 8px 0 24px;
  padding: 12px 16px;
  border: 1px solid #e4e5e8;
  border-radius: 4px;
  background-color: #f8f8f9;
`;

const Checklist = styled.ul`
  list-style: none;
  color: #79818f;
`;

const list = css`
  padding-left: 17px;
  margin-bottom: 5px;
  font-size: 12px;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 0;
    width: 3px;
    height: 3px;
    background-color: #aeb3bb;
  }
`;

const List = styled.li`
  ${list} ::before {
    display: ${props => {
      if (
        (props.upper && props.one) ||
        (props.lower && props.tw) ||
        (props.number && props.th) ||
        (props.length && props.fo)
      )
        return "none";
    }};
  }
  padding-left: ${props => {
    if (
      (props.upper && props.one) ||
      (props.lower && props.tw) ||
      (props.number && props.th) ||
      (props.length && props.fo)
    )
      return "0";
  }};
`;

const FormandIcon = styled.div`
  display: flex;
  position: relative;
`;
const Inputicons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 22px;
  cursor: pointer;
  width: ${props => (props.email ? "10px" : "50px")};
  right: ${props => (props.email ? "20px" : "15px")};
`;
