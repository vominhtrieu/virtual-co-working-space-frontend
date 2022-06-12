import { Avatar, Button, message, Space, Spin, Upload } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { useTranslation } from 'react-i18next'


const ProfileAvatar = ({ size, isAvatar, setIsAvatar }: any) => {
    const { t } = useTranslation()
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
        <Space style={{ position: "relative" }}>
            {isAvatar !== "" ? (
                <Avatar size={size > 0 ? size : 80} src={isAvatar} />
            ) : (
                <Avatar size={size > 0 ? size : 80} icon={<UserOutlined />} />
            )}
            <ImgCrop shape="round" zoom modalTitle={t("pages.profile.editProfile.avatar.title")} quality={0.4}>
                <Upload
                    name="avatar"
                    listType="picture"
                    showUploadList={false}
                    action={`${process.env.REACT_APP_BASE_URL}/uploads/avatar`}
                    onChange={handleAvatarChange}
                    headers={{ Authorization: `Bearer ${localStorage.getItem("access_token")}` }}
                    accept=".png,.jpg,.jpeg"
                >
                    <Button
                        style={{ position: "absolute", right: 10, bottom: 10 }}
                        disabled={uploadingAvatar}
                        size="large"
                        type="primary"
                        shape="circle"
                        title={t("pages.profile.editProfile.avatar.change")}
                    >
                        {uploadingAvatar ? <Spin /> : <CameraOutlined />}
                    </Button>
                </Upload>
            </ImgCrop>
        </Space>
    )
}

export default ProfileAvatar;