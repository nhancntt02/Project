import { Link} from "react-router-dom";
import ContactForm from "../components/ContactForm";

export default function Contact() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 p-6 ">
                <h1 className="text-3xl font-bold mb-4">Hỗ trợ khách hàng</h1>
                <p className="text-gray-700 mb-6">
                    Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng kiểm tra <Link to="/support" className="text-blue-500 hover:text-blue-700">Câu hỏi thường gặp</Link> hoặc liên hệ trực tiếp với chúng tôi qua form dưới đây.
                </p>
                <ContactForm />
            </div>
            <div className="col-span-1">
                <h1 className="mb-4 text-2xl font-semibold">Bản đồ</h1>
                <p>
                    <a href="#">
                        <iframe className="w-full h-[400px]" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62858.851024790325!2d105.75871999999995!3d10.043392000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1699085745539!5m2!1svi!2s" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe><br />
                    </a>
                    
                </p>
            </div>

        </div>
    );
}