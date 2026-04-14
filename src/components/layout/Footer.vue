<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <div class="qr-placeholder">
          <img src="../../assets/images/https___github.com_.png" alt="">
        </div>
        <p>华夏文明博物院微信公众号</p>
      </div>
      <div class="footer-center">
        <p>@2011-2026 华夏文明博物院 All Rights Reserved</p>
        <p>xICP备xxxxxxxx号</p>
        <p>纪检监察举报电话:0371-63850862</p>
        <p>政风行风建设热线:0371-63511063</p>
        <p>办公室信箱:3516619569a@gmail.com</p>
      </div>
      <div class="footer-right">
        <div class="qr-placeholder">
          <img src="../../assets/images/https___github.com_.png" alt="">
        </div>
        <p>华夏文明博物院官方微博</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #5a1016 0%, #3a0a0e 100%);
  padding: 40px 0;
  margin-top: 40px;
  color: #f1b1b1;
  font-size: 14px;
}

.footer-container {
  width: 1200px;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-left,
.footer-right {
  text-align: center;
  flex: 1;
  min-width: 120px;
}

.qr-placeholder {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  font-size: 24px;
}

.qr-placeholder img {
  width: 80px;
  height: 80px;
}


.footer-center {
  text-align: center;
  line-height: 1.8;
  flex: 2;
  min-width: 300px;
}

.footer-center p {
  margin: 4px 0;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }

  .footer-center {
    order: 2;
  }
}
</style>
