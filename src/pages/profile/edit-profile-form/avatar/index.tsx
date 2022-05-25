import { Avatar, Button, message, Space, Spin, Upload } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useState } from "react";


const ProfileAvatar = ({ size, isAvatar, setIsAvatar}: any) => {

  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);
  const handleAvatarChange = (info: any) => {
      if (info.file.status === "uploading") {
          setUploadingAvatar(true);
          return;
      }
      if (info.file.status === "done") {
          setUploadingAvatar(false);
          setIsAvatar(info.file.response.data.url);
          return message.success("Your avatar has been changed!");
      }
      if (info.file.status === "error") {
          setUploadingAvatar(false);
          return message.error("Cannot change avatar, please try again!");
      }
  };

  return (
    <Space style={{position: "relative"}}>
    {isAvatar!=="" ? (
        <Avatar size={size > 0 ? size : 80} src={isAvatar} />
    ) : (
        <Avatar size={size > 0 ? size : 80} icon={<UserOutlined />} />
    )}
      <ImgCrop shape="round" zoom modalTitle="Edit your avatar" quality={0.4}>
            <Upload
                name="avatar"
                listType="picture"
                showUploadList={false}
                action={`${process.env.REACT_APP_BASE_URL}/uploads/avatar`}
                onChange={handleAvatarChange}
                headers={{Authorization: `Bearer ${localStorage.getItem("access_token")}`}}
                accept=".png,.jpg,.jpeg"
            >
                <Button
                    style={{position: "absolute", right: 2, bottom: 2}}
                    disabled={uploadingAvatar}
                    size="large"
                    type="primary"
                    shape="circle"
                    title="Change your avatar"
                >
                    {uploadingAvatar ? <Spin /> : <CameraOutlined />}
                </Button>
            </Upload>
        </ImgCrop>
</Space>
  )
}

export default ProfileAvatar;