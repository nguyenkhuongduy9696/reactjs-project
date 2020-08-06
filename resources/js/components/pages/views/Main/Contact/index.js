import React from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Contact = () => {
    const { handleSubmit, register, errors, reset } = useForm();
    const history = useHistory();
    const onHandleSubmit = (data) => {
        swal({
            title: "Bạn có đồng ý gửi phản hồi này?",
            icon: "info",
            buttons: true,
            buttons: ["Hủy", "Đồng ý"]
        }).then((willAdd) => {
            if (willAdd) {
                axios.post('/api/contact', data)
                    .then(res => {
                        swal("Gửi phản hồi thành công!", {
                            icon: "success",
                            timer: 2000
                        });
                        reset({})
                        history.push('/contact');
                    })
            }
        });
    }
    return (
        <div>
            <h2 className="title text-center">Liên hệ</h2>
            <p className="contact-title">Liên hệ với chúng tôi để nhận những thông tin mới nhất về quà tặng và sự kiện </p>
            <div className="row form-contact">
                <div className="col-md-6">
                    <p className="about-title">Địa chỉ</p>
                    <p className="contact-info">109/12 Bình Quới, Phường 27, Quận Bình Thạnh, TP.HCM.</p>
                    <p className="about-title">Email</p>
                    <p className="contact-info">Chamsockhachhang@danchau.com</p>
                    <p className="about-title">Điện thoại</p>
                    <p className="contact-info">0937371122</p>
                    <p className="about-title">Thời gian làm việc</p>
                    <p className="contact-info">Thứ 2 đến Chủ Nhật từ 8h đến 21h</p>
                </div>
                <div className="col-md-6">
                    <form id="main-contact-form" className="contact-form row"
                        onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className="form-group col-md-6">
                            <input type="text" name="name"
                                className="form-control"
                                placeholder="Họ và tên"
                                ref={register({ required: true, pattern: /^[\S][\S]/ })} />
                            <small className="form-err">
                                {errors.name?.type === "required" && "Họ và tên không được để trống!"}
                                {errors.name?.type === "pattern" && "Họ và tên không được để trống!"}
                            </small>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" name="email"
                                className="form-control"
                                placeholder="Email"
                                ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
                            <small className="form-err">
                                {errors.email?.type === "required" && "Email không được để trống!"}
                                {errors.email?.type === "pattern" && "Mời nhập email hợp lệ!"}
                            </small>
                        </div>
                        <div className="form-group col-md-12">
                            <input type="text" name="phone"
                                className="form-control"
                                placeholder="Điện thoại"
                                ref={register({ required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} />
                            <small className="form-err">
                                {errors.phone?.type === "required" && "Số điện thoại không được để trống!"}
                                {errors.phone?.type === "pattern" && "Mời nhập số điện thoại hợp lệ!"}
                            </small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea name="message" id="message"
                                className="form-control" rows={8}
                                placeholder="Nội dung"
                                ref={register({ required: true, pattern: /^[\S][\S]/ })} />
                            <small className="form-err">
                                {errors.message?.type === "required" && "Nội dung không được để trống!"}
                                {errors.message?.type === "pattern" && "Nội dung không được để trống!"}
                            </small>
                        </div>
                        <div className="form-group col-md-12">
                            <button type="submit" className="btn btn-primary pull-right">Gửi</button>
                        </div>
                    </form>

                </div>
            </div>
            <div className="row">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5266.515614291392!2d105.79609517772666!3d21.03312997264761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3d6f50d0f1%3A0x6c47e39f2b434013!2sTh%E1%BB%9Di%20trang%20Mando!5e0!3m2!1svi!2s!4v1596707789631!5m2!1svi!2s"
                    width={900} height={400}
                    frameBorder={0} style={{ border: 0 }} allowFullScreen
                    aria-hidden="false" tabIndex={0} />
            </div>
            <div className="row"></div>
        </div>
    );
}

export default Contact