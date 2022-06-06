import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layouts/navbar'
import Thumbnail from '../../components/UI/thumbnail'
import { toastError } from '../../helpers/toast'
import GetOfficeListProxy from '../../services/proxy/offices/office-list'
import { ProxyStatusEnum } from '../../types/http/proxy/ProxyStatus'
import { OfficeInterface } from '../../types/office'
import LoadingOffice from './LoadingOffice'
import { NewOffice } from './NewOffice'
import * as JsSearch from 'js-search';


const Lobby = () => {
    const [officeList, setOfficeList] = useState<OfficeInterface[]>()
    const [officeSearchList, setOfficeSearchList] = useState<OfficeInterface[]>()
    const [countGetOffices, setCountGetOffices] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        GetOfficeListProxy({ page: 1, size: 10 })
            .then((res) => {
                if (!isMounted) return

                if (res.status === ProxyStatusEnum.FAIL) {
                    return
                }

                if (res.status === ProxyStatusEnum.SUCCESS) {
                    setOfficeList(res.data.officeList)
                    setOfficeSearchList(res.data.officeList)

                }
            })
            .catch((err) => {
                console.log(err)
                toastError(err.message ?? 'Get offices fail')
            })

        return () => {
            isMounted = false
        }
    }, [countGetOffices])

    const handleSearch = (value: string) => {
        let search = new JsSearch.Search('id');

        search.addIndex('name');
        search.addDocuments(officeList);
        if (value.trim() != "")
            setOfficeSearchList(search.search(value));
        else
            setOfficeSearchList(officeList);
    }

    return (
        <section className="lobby">
            <Navbar onInsertOffice={() => setCountGetOffices((curr) => curr + 1)} onSubmit={handleSearch} />

            <div className="lobby__main">
                <div className="lobby__office-list">
                    <NewOffice onInsertOffice={() => setCountGetOffices((curr) => curr + 1)} />
                    {
                        officeSearchList ? officeSearchList.map((office) => {
                            return (
                                <Thumbnail
                                    key={office.id}
                                    office={office}
                                    alt={office.avatarUrl}
                                    src={office.avatarUrl}
                                    onClick={() => {
                                        navigate(`/office/${office.id}`)
                                    }}
                                />
                            )
                        })
                            : new Array(11).fill(0).map((_, index) => (
                                <LoadingOffice key={index} />
                            ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Lobby
