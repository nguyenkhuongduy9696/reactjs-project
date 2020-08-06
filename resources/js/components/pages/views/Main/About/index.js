import React from 'react'
import pig1 from '../../../../assets/Main/images/about/pic1.jpg'
const About = () => {
    return (
        <div>
            <h2 className="title text-center">Giới thiệu</h2>
            <div className="about">
                <p className='about-title'>VỀ CHÚNG TÔI</p>
                <p>Ra đời năm 1997, trải qua hơn 20 năm hình thành và phát triển, Công Ty TNHH Thời Trang Đan Châu đã phát triển mạnh mẽ với hệ thống cửa hàng tại các tuyến đường Nguyễn Đình Chiểu, Hai Bà Trưng, Quang Trung…thuộc thành phố Hồ Chí Minh ; chi nhánh tại thành phố Đà Nẵng, thành phố Cần Thơ và các chi nhánh khác tại hệ thống siêu thị Aeon, CoopMart khắp cả nước.</p>
                <img src={pig1} alt="" />
                <p> Website DANCHAU.com ra đời để phục vụ tốt hơn cho những đối tượng khách hàng có quỹ thời gian eo hẹp. Khách hàng có thể thoải mái mua sắm tại nhà hoặc tại nơi làm việc chỉ bằng vài thao tác đơn giản và nhanh chóng. </p>
                <p className="about-title">THẾ MẠNH</p>
                <p>Bên cạnh những bộ sưu tập áo kiểu, áo sơ mi, chân váy, vest và quần tây rất được lòng khách hàng, Đan Châu còn phát triển dòng sản phẩm đầm công sở, đầm dự tiệc, dạo phố với ưu thế đầy đủ size từ S đến 4XL.</p>
                <p className="about-title">CAM KẾT</p>
                <p>Nguyên vật liệu sản xuất được nhập khẩu đúng chất lượng nhằm đảm bảo an toàn sức khỏe cho khách hàng.</p>
                <p>Đến với Đan Châu quý khách luôn có được những sản phẩm chất lượng với giá thành phải chăng nhất cùng với dịch vụ chăm sóc khách hàng tận tâm. </p>
                <p className="about-title">SƯ MỆNH</p>
                <p>Sứ mệnh của Công ty TNHH Thời Trang Đan Châu là mang tới cho người phụ nữ Việt Nam những trang phục thanh lịch, sang trọng với chất lượng tốt và giá thành phải chăng.</p>
                <p className="about-title">Lời cảm ơn</p>
                <p>Danchau.com chân thành cảm ơn Quý khách hàng đã đồng hành cùng Đan Châu. Sự tin tưởng của Quý khách hàng là động lực để Đan Châu ngày một phát triển và phục vụ Quý khách tốt hơn.</p>


            </div>
        </div>
    );
}

export default About