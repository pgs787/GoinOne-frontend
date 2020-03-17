import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { chatStatus } from "Redux/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareDown,
  faCaretSquareUp,
  faCog
} from "@fortawesome/free-solid-svg-icons";

const Chat = ({ status, chatStatus }) => {
  // const [receive, setReceive] = useState("");
  // const OtherUser = () => {};
  // useEffect(() => {
  //   socket.on("chat-msg", obj => {
  //     const rev = receive;
  //     obj.key = "key_" + receive + 1;
  //     console.log(obj);
  //     rev.unshift(obj);
  //   });
  // }, [receive]);
  // const send = () => {
  //   window.socket.emit("init", { name: "bella" });
  // };
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
      <Chatlist status={status}>
        <Other>
          <Left>
            <Username>예시</Username>
            <Comment>하이</Comment>
          </Left>
          <Right>21:43</Right>
        </Other>
      </Chatlist>
      <InputWrapper status={status}>
        <Input
          status={status}
          placeholder="메세지를 입력하세요. (최대200자)"
        ></Input>
        <Inputbtn>전송</Inputbtn>
      </InputWrapper>
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return { status: state.ChatOption.status };
};

export default connect(mapStateToProps, { chatStatus })(Chat);

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
  display: flex;
  padding: 4px 10px;
  font-size: 12px;
`;
const Left = styled.div`
  display: flex;
  flex: auto;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
`;
const Right = styled.div`
  flex: none;
  width: 40px;
  text-align: right;

  color: #bdbdbd;
`;
const Username = styled.div`
  color: #12c0f9;
  font-weight: 700;
`;
const Comment = styled.span`
  padding-left: 8px;
  color: #424242;
`;

const Chatlist = styled.div`
  width: 100%;
  height: 165px;
  display: ${props => (props.status ? "none" : "block")};
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
