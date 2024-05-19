import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import Avatar from "../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPlusCircle,
  faMicrophone,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export const Dashboard = () => {
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [newInputmessage, setNewInputMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [conversationMessages, setConversationMessages] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  console.log(userDetail, "details  ");
  console.log(conversationMessages, "messages");
  console.log(conversations, "cov");
  console.log(allUsers, "users");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/conversation/${userDetail.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const resData = await res.json();
        setConversations(resData);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [userDetail]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch Users");
        }

        const allFetchedUsers = await res.json();
        console.log(allFetchedUsers, "allUsers");

        const filteredLoggedInUser = allFetchedUsers.filter(
          (user) => user.user.recieverId !== userDetail.id
        );
        console.log(filteredLoggedInUser, "filteredUsers");

        const filteredUsersAlreadyHavingConversation =
          filteredLoggedInUser.filter((user) => {
            return !conversations.some(
              (conversation) =>
                conversation.user.recieverId === user.user.recieverId
            );
          });
        console.log(
          filteredUsersAlreadyHavingConversation,
          "filteredUsersWithoutExistingRecipients"
        );

        setAllUsers(filteredUsersAlreadyHavingConversation);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchAllUsers();
  }, [userDetail, conversations]); // Include userDetail in the dependency array

  const fetchConversationMessages = async (conversationId, user) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/message/${conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const resData = await res.json();
      setConversationMessages({
        messages: resData,
        reciever: user,
        conversationId: conversationId,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendNewMessage = async (e) => {
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: conversationMessages?.conversationId,
        senderId: userDetail?.id,
        message: newInputmessage,
        recieverId: conversationMessages?.reciever?.recieverId,
      }),
    });
    setNewInputMessage("");
  };

  return (
    <div className="w-full h-screen flex  ">
      <div className="w-[25%] border h-full bg-Light ">
        <div className="flex  items-center justify-center w-full h-[20%]  border-b-2 border-slate-300">
          <div className="border border-primary rounded-full">
            {" "}
            <img src={Avatar} alt="user-avatar" width={75} height={75} />{" "}
          </div>
          <div className="flex flex-col ml-3">
            <div className="text-lg font-medium">{userDetail?.Name}</div>
            <div className="">My Account</div>
          </div>
        </div>
        <div className="h-[80%] px-10 overflow-y-scroll">
          <div className="text-primary mt-4 font-semibold text-xl">Chats</div>
          <div className="">
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => (
                <div
                  className="p-4 my-4 flex itemscenter hover:bg-slate-200 border-b-2 hover:rounded-lg  cursor-pointer"
                  onClick={() =>
                    fetchConversationMessages(conversationId, user)
                  }
                  key={conversationId}
                >
                  <div className="border border-primary rounded-full">
                    <img src={Avatar} alt="user-img" width={60} height={60} />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{user?.Name}</p>
                    <p className="font-mute">{user?.Email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-[5rem] font-semibold text-center text-lg ">
                No Conversation
              </div>
            )}
          </div>
        </div>
      </div>
      {conversationMessages?.reciever?.Name ? (
        <div className="w-[50%] border h-full ">
          <div className="py-4 px-6 my-4 h-[10%] flex items-center bg-slate-200 rounded-[3rem]   w-[75%] mx-auto">
            <div className="border border-primary rounded-full">
              <img src={Avatar} alt="user-img" width={60} height={60} />
            </div>
            <div className="ml-4 cursor-pointer">
              <p className="font-medium">
                {conversationMessages.reciever.Name}
              </p>
              <p className="font-mute">Online</p>
            </div>
            <FontAwesomeIcon
              icon={faPhone}
              className="h-5 cursor-pointer ml-auto mr-2"
            />
          </div>
          <div className="overflow-y-scroll h-[70%] w-full">
            <div className="px-8 py-4">
              {conversationMessages.messages.length > 0 ? (
                conversationMessages.messages.map(
                  ({ user: { id } = {}, message }, index) => {
                    if (id === userDetail?.id) {
                      return (
                        <div
                          key={index}
                          className="bg-primary max-w-[40%] ml-auto min-h-[80px] rounded-xl rounded-tr-none p-4 my-3 text-white"
                        >
                          {message}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="bg-slate-300 max-w-[40%] min-h-[80px] rounded-xl rounded-tl-none p-4 my-3"
                        >
                          {message}
                        </div>
                      );
                    }
                  }
                )
              ) : (
                <div className="mt-[5rem] text-lg font-semibold text-center">
                  No Messages
                </div>
              )}
            </div>
          </div>
          <div className="p-8 h-[10%]">
            <Input
              type="text"
              placeholder="Type a message"
              className="w-[80%]"
              value={newInputmessage}
              onChange={(e) => setNewInputMessage(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="ml-6 h-5 cursor-pointer"
              onClick={() => sendNewMessage()}
            />
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="ml-6 h-5 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              className="ml-6 h-5 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="mt-[5rem] text-lg font-semibold text-center w-[50%]">
          No Conversation Selected
        </div>
      )}
      <div className="h-full w-[25%] border">
        <div className="my-8 text-lg font-bold">All Available users</div>
        <div className="overflow-y-scroll h-[85%] ">
          {allUsers.length > 0 ? (
            allUsers.map(({ user }) => (
              <div
                className="p-4 my-4 flex itemscenter hover:bg-slate-200 border-b-2 hover:rounded-lg  cursor-pointer"
                onClick={() => fetchConversationMessages("new", user)}
                key={user?.Email}
              >
                <div className="border border-primary rounded-full">
                  <img src={Avatar} alt="user-img" width={60} height={60} />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{user?.Name}</p>
                  <p className="font-mute">{user?.Email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-[5rem] font-semibold text-center text-lg ">
              No Registered Users
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
