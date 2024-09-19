import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { FaStar, FaArrowLeft } from "react-icons/fa";

export default function ListComment() {
    const product_id = useParams().product_id;
    const [comment, setComment] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getComment();
        getUser();
    }, [])

    const getUser = () => {
        axiosClient.get('/users').then(({ data }) => { setUsers(data.users) });
    }

    const getComment = async () => {
        try {
            const res = await axiosClient.get(`/rating/product/${product_id}`);
            setComment(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const goBackPage = () => {
        navigate(-1);
    }

    return (
        <div>
            <div className="container mx-auto p-4">
                <div onClick={goBackPage} className="flex gap-2 hover:cursor-pointer">
                    <div className="text-2xl mt-1">
                        <FaArrowLeft />
                    </div>
                    <div className="text-xl">
                        Trở về
                    </div>
                </div>
                {/* Tiêu đề */}
                <div className="text-2xl font-bold text-center mb-6">
                    Danh sách bình luận
                </div>

                {/* Bảng bình luận */}
                {
                    comment.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên người đánh giá</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung đánh giá</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số sao</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đánh giá</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        comment.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {users.find(u => u.id === item.user_id)?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.rate_comment}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, starIndex) => {
                                                            const starRating = starIndex + 1;
                                                            return (
                                                                <FaStar
                                                                    key={starIndex}
                                                                    className={`text-xl ${starRating <= item.rate_rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(item.rate_date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-2xl">
                            Sản phẩm không có đánh giá
                        </div>
                    )
                }

            </div>
        </div>
    )
}