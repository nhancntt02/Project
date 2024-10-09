import { useEffect, useState } from "react"

export default function Discount() {
    const [supplier, setSupplier] = useState([]);


    useEffect(() => {

    }, []);

    const getSupplier = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <div>
            <div>
                Header
            </div>
            <div>
                <div>

                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên nhà sản xuất</th>
                                <th>Địa chỉ</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}