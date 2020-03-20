import React, { useState, useEffect, useRef } from "react";

import { withRouter } from "react-router-dom";

// 소켓 import
import socketio from "socket.io-client";
import styled from "styled-components";
import { connect } from "react-redux";
import { chatStatus } from "Redux/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareDown,
  faCaretSquareUp,
  faCog
} from "@fortawesome/free-solid-svg-icons";

// 웹 소켓 서버에 접속
const socket = socketio.connect("http://localhost:3001");

const Chat = props => {
  let token = localStorage.getItem("token");
  let nick = localStorage.getItem("nick");
  const [msg, setMsg] = useState("");
  const [res, setRes] = useState([]);
  const bottom = useRef(null);

  // 메세지 받기
  useEffect(() => {
    socket.on("update message", obj => {
      setRes(prev => [...prev, obj]);
      bottom.current.scrollTo({ top: bottom.current.scrollHeight });
    });
  }, []);

  const msgSend = e => {
    const day = new Date();
    const hour = day.getHours();
    const minutes = day.getMinutes();
    if (e.charCode === 13) {
      if (e.target.value) {
        // 메세지 보내기
        socket.emit("send message", {
          nickname: nick,
          message: msg,
          hour: hour,
          minutes: minutes
        });
        setMsg("");
      }
      e.preventDefault();
    }
  };
  const onChange = e => {
    setMsg(e.target.value);
  };
  const mapOfRes = item => {
    return item.map((ele, idx) => (
      <Other key={idx} status={status}>
        <Left status={status}>
          <Username>{ele.nickname}</Username>
          <Comment>{ele.message}</Comment>
        </Left>
        <Right status={status}>{`${ele.hour}:${ele.minutes}`}</Right>
      </Other>
    ));
  };

  const { status, chatStatus } = props;
  return (
    <Wrapper status={status}>
      <Header status={status}>
        <FontAwesomeIcon
          style={{
            cursor: "pointer",
            marginRight: "10px"
          }}
          icon={status ? faCaretSquareUp : faCaretSquareDown}
          color="skyblue"
          size="lg"
          onClick={() => {
            chatStatus(status);
          }}
        />
        <Text>채팅</Text>
        <Setting>
          {!status && (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faCog}
              color="gray"
            />
          )}
        </Setting>
      </Header>
      <Chatlist ref={bottom} status={status}>
        {res && mapOfRes(res)}
      </Chatlist>
      <InputWrapper status={status}>
        {token ? (
          <Input
            status={status}
            placeholder="메세지를 입력하세요. (최대200자)"
            onKeyPress={msgSend}
            token={token}
            onChange={onChange}
            value={msg}
          />
        ) : (
          <Input
            placeholder="로그인 후 계좌를 인증하면 채팅이 가능해요"
            readOnly
          />
        )}

        <Inputbtn
          onClick={() => {
            !token && props.history.push("/login");
          }}
        >
          {token ? "전송" : "로그인"}
        </Inputbtn>
      </InputWrapper>
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return { status: state.ChatOption.status };
};

export default withRouter(connect(mapStateToProps, { chatStatus })(Chat));

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
  background-color: white;
  height: ${props => (props.status ? "80px" : "260px")};
  transform: ${props => (props.status ? "translateY(10px)" : "")};
  transition: all 0.5s ease;
`;
const Header = styled.div`
  display: flex;
  position: relative;
  padding: 0 10px;
  width: 100%;
  padding-bottom: 10px;
  margin-top: ${props => props.status && "18px"};
  border-bottom: ${props => (props.status ? "none" : "1px solid #eee")};
`;
const Text = styled.div`
  color: ${props => (props.two ? "#9e9e9e" : "#424242")};
  font-size: ${props => (props.two ? "12px" : "15px")};
  font-weight: bold;
`;
const Setting = styled.div`
  position: absolute;
  right: 10px;
`;
const Other = styled.div`
  display: ${props => (props.status ? "none" : "flex")};

  padding: 4px 10px;
  font-size: 12px;
  transition: all 0.5s ease;
`;
const Left = styled.div`
  display: ${props => (props.status ? "none" : "inline")};
  flex: auto;
  word-wrap: break-word;
  word-break: break-all;
`;
const Right = styled.div`
  flex: ${props => (props.status ? "none" : "flex")};
  width: 40px;
  text-align: right;
  color: #bdbdbd;
  transition: all 0.5s ease;
`;
const Username = styled.span`
  display: inline !important;
  color: #12c0f9;

  font-weight: 700;
`;
const Comment = styled.span`
  padding-left: 8px;
  color: #424242;
`;
const Chatlist = styled.div`
  width: 100%;
  height: ${props => (props.status ? "0px" : "160px")};
  overflow: ${props => (props.status ? "hidden" : "auto")};
  display: ${props => (props.status ? "none" : "block")};

  transition: all 0.2s ease;
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c9ccd2;
    border-radius: 10px;
  }
`;
const InputWrapper = styled.div`
  display: ${props => (props.status ? "none" : "flex")};
  justify-content: space-between;
  align-items: center;
  padding-right: 4px;
  border-radius: 6px;
  background-color: #fafafa;
  font-size: 12px;
  height: 40px;
`;
const Input = styled.textarea`
  display: ${props => (props.status ? "none" : "block")};
  padding-top: 12px;
  padding-left: 5px;
  width: 90%;
  color: gray;
  outline: 0;
  caret-color: #1772f8;
  overflow: hidden;
  border: 0;
  background-color: transparent;
  font-size: 12px;
  font-weight: bold;
  resize: none;

  height: ${props => (props.status ? "0px" : "100%")};
  ::placeholder {
    color: #e0e0e0;
  }
`;
const Inputbtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff;
  color: #424242;
  font-size: 12px;
  width: 50px;
  cursor: pointer;
`;
