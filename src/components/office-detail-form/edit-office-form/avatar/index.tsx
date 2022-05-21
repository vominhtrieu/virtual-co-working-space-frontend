import { Avatar, Button, message, Space, Spin, Upload } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import axios from "axios";


const OfficeAvatar = ({ size, isAvatar, setIsAvatar}: any) => {

  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);

  return (
    <Space style={{position: "relative"}}>
    {isAvatar!=="" ? (
        <Avatar shape="square" size={size > 0 ? size : 80} src={isAvatar} />
    ) : (
        <Avatar shape="square" size={size > 0 ? size : 80} icon={<UserOutlined />} />
    )}
      <ImgCrop shape="rect" zoom modalTitle="Update office image" quality={0.4}>
            <Upload
                name="img"
                listType="picture"
                showUploadList={false}
                // onChange={handleAvatarChange}
                customRequest={(options) => {
                    const { file } = options;
                    const fmData = new FormData();
                    const config = {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'multipart/form-data',
                      },
                    };
        
                    fmData.append('image', file);
                    try {
                      axios
                        .post('https://api.vispace.tech/api/v1/uploads/image', fmData, config)
                        .then((res) => {
                          if (res?.data?.code && res?.data?.code ===200) {
                            setIsAvatar(res?.data?.data?.url ?? isAvatar);
                            message.success('Upload model success!');
                          } else {
                            message.error('Upload model failed!');
                          }
                        });
                    } catch (err) {
                    }
                  }}
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

export default OfficeAvatar;