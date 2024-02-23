import Input from "./Input";
import Messages from "./Messages";
import { useAuthAndChatContext } from "../Context/Context";
import { FcVideoCall, FcMissedCall } from "react-icons/fc";
import { IoIosMore } from "react-icons/io";
const Chat = () => {
  const { data} = useAuthAndChatContext();
  return (
    <>
      <div className="flex-grow ">
        <div className="h-[50px] flex items-center justify-between p-[10px]">
          <span>{data.user.displayName}</span>
          {/* For future */}
          <div className="flex gap-[10px]">
            <button>
              <FcVideoCall size={25} />
            </button>
            <button>
              <FcMissedCall size={25} />
            </button>
            <button>
              {" "}
              <IoIosMore size={25} />
            </button>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </>
  );
};

export default Chat;
