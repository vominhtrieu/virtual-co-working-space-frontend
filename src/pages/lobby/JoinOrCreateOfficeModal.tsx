import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import Popup from "../../components/UI/popup"
import { CreateOfficeFormInputInterface, CreateOfficeFormDataInterface, JoinOfficeFormInputInterface, JoinOfficeFormDataInterface } from "./types";
import { toastError, toastSuccess } from "../../helpers/toast";
import JoinByCodeProxy from "../../services/proxy/office-invitation/join-invite-code";
import CreateOfficeProxy from "../../services/proxy/offices/create-office";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import NewButton from "../../components/UI/new-button";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import InputText from "../../components/UI/form-controls/input-text";

interface JoinOrCreateOfficeModalProps {
    onClose: () => void;
    onInsertOffice: (data: any) => void;
}

export default function JoinOrCreateOfficeModal({ onClose, onInsertOffice }: JoinOrCreateOfficeModalProps) {
    const [isCreating, setIsCreating] = useState<boolean>(true);
    const createOfficeSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
    });
    const joinOfficeSchema = yup.object().shape({
        code: yup.string().required('pode is required'),
    })

    const handleJoinOfficeSubmit = (data: JoinOfficeFormInputInterface) => {
        const formatData: JoinOfficeFormDataInterface = {
            id: data.code,
        }
        JoinByCodeProxy(formatData)
            .then((res) => {
                if (res.status === ProxyStatusEnum.FAIL) {
                    toastError(res.message ?? "Join office fail");
                    return;
                }

                if (res.status === ProxyStatusEnum.SUCCESS) {
                    toastSuccess("Join office success");
                    onInsertOffice(res.data.office);
                    onClose();
                    return;
                }
            })
            .catch((err) => {
                toastError(err.message ?? "Join office fail");
            });
    };
    const { control: joinOfficeControl, handleSubmit: joinOfficeHandleSubmit } = useForm<JoinOfficeFormInputInterface>({
        defaultValues: {
            code: '',
        },
        resolver: yupResolver(joinOfficeSchema),
    })
    const { control: createOfficeControl, handleSubmit: createOfficeHandleSubmit } = useForm<CreateOfficeFormInputInterface>({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(createOfficeSchema),
    })

    const handleCreateOfficeSubmit = (data: CreateOfficeFormInputInterface) => {
        const values: CreateOfficeFormDataInterface = {
            name: data.name,
        }
        CreateOfficeProxy(values)
            .then((res) => {
                if (res.status === ProxyStatusEnum.FAIL) {
                    toastError(res.message ?? "Create office fail");
                    return;
                }

                if (res.status === ProxyStatusEnum.SUCCESS) {
                    toastSuccess("Create office success");
                    console.log(data);
                    onInsertOffice(res.data.office);
                    onClose();
                    return;
                }
            })
            .catch((err) => {
                toastError(err.message ?? "Create office fail");
            });
    }

    return (
        <Popup
            onClose={onClose}
            title={(isCreating ? "Create" : "Join") + " Office"}
            type="dark"
            onSubmit={isCreating ? createOfficeHandleSubmit(handleCreateOfficeSubmit) : joinOfficeHandleSubmit(handleJoinOfficeSubmit)}
            hasFooter
            customButton={<NewButton variant="outlined" icon={<FaPlus />} onClick={() => setIsCreating(!isCreating)} content={isCreating ? "Join by code" : "Create new"} />}
        >
            {
                isCreating ? <form>
                    <div className="create-office-form__input-block">
                        <InputText
                            control={createOfficeControl}
                            name="name"
                            label="Name"
                            placeholder="Enter name..."
                        />
                        <InputText
                            control={createOfficeControl}
                            name="description"
                            label="Description"
                            placeholder="Enter description..."
                        />
                    </div>
                </form> : <form>
                    <InputText
                        control={joinOfficeControl}
                        name="code"
                        label="Code"
                        placeholder="Enter the code..."
                    />
                </form>
            }
        </Popup>
    )
}